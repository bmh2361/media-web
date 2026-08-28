import type { ConnectionLocation, ConnectionRoute } from "@/content/locations";

const radians = Math.PI / 180;

export const globeView = {
  centreLatitude: 34,
  centreLongitude: 52,
  phi: -Math.PI / 2 - 52 * radians,
  theta: 34 * radians,
  scale: 0.94,
  viewBox: 1000
} as const;

type Vector = [number, number, number];

export type ProjectedPoint = {
  x: number;
  y: number;
  visible: boolean;
};

function toVector(latitude: number, longitude: number): Vector {
  const lat = latitude * radians;
  const lng = longitude * radians - Math.PI;
  const cosLat = Math.cos(lat);
  return [-cosLat * Math.cos(lng), Math.sin(lat), cosLat * Math.sin(lng)];
}

function projectVector([x, y, z]: Vector): ProjectedPoint {
  const { phi, theta, scale, viewBox } = globeView;
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);
  const horizontal = cosPhi * x + sinPhi * z;
  const vertical = sinPhi * sinTheta * x + cosTheta * y - cosPhi * sinTheta * z;
  const depth = -sinPhi * cosTheta * x + sinTheta * y + cosPhi * cosTheta * z;
  return {
    x: Number(((0.5 + (horizontal * scale) / 2) * viewBox).toFixed(4)),
    y: Number(((0.5 - (vertical * scale) / 2) * viewBox).toFixed(4)),
    visible: depth >= 0
  };
}

export function projectLocation(
  location: Pick<ConnectionLocation, "latitude" | "longitude">
): ProjectedPoint {
  return projectVector(toVector(location.latitude, location.longitude));
}

function normalise([x, y, z]: Vector): Vector {
  const length = Math.hypot(x, y, z) || 1;
  return [x / length, y / length, z / length];
}

function slerp(from: Vector, to: Vector, progress: number): Vector {
  const dot = Math.max(-1, Math.min(1, from[0] * to[0] + from[1] * to[1] + from[2] * to[2]));
  const angle = Math.acos(dot);
  if (angle < 0.0001) return from;
  const denominator = Math.sin(angle);
  const a = Math.sin((1 - progress) * angle) / denominator;
  const b = Math.sin(progress * angle) / denominator;
  return normalise([from[0] * a + to[0] * b, from[1] * a + to[1] * b, from[2] * a + to[2] * b]);
}

export function routePath(
  route: ConnectionRoute,
  locations: Map<ConnectionLocation["id"], ConnectionLocation>
): string {
  const from = locations.get(route.from);
  const to = locations.get(route.to);
  if (!from || !to) return "";
  const fromVector = toVector(from.latitude, from.longitude);
  const toVectorValue = toVector(to.latitude, to.longitude);
  const steps = route.hierarchy === "primary" ? 56 : 24;
  const variation = (route.from.charCodeAt(0) + route.to.charCodeAt(route.to.length - 1)) % 5;
  const lift = route.hierarchy === "primary" ? 88 + variation * 8 : 14 + variation * 4;
  const points = Array.from({ length: steps + 1 }, (_, index) => {
    const progress = index / steps;
    const point = projectVector(slerp(fromVector, toVectorValue, progress));
    return `${point.x.toFixed(1)} ${(point.y - Math.sin(Math.PI * progress) * lift).toFixed(1)}`;
  });
  return `M ${points.join(" L ")}`;
}
