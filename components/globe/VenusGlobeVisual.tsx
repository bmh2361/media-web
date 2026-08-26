"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Globe, Marker } from "cobe";
import { connectionLocations, connectionRoutes, type ConnectionLocation } from "@/content/locations";
import type { Language } from "@/lib/i18n";
import { globeView, projectLocation, routePath } from "@/components/globe/globeGeometry";
import { useHydratedReducedMotion } from "@/components/motion/useHydratedReducedMotion";

const stageNames = ["quiet", "origin", "primary", "europe", "settled"] as const;
const sequenceTimings = {
  desktop: { duration: 4200, origin: 80, primary: 360, europe: 2800, camera: 2900 },
  mobile: { duration: 3300, origin: 60, primary: 280, europe: 2150, camera: 2250 }
} as const;

const labelPlacement: Partial<Record<ConnectionLocation["id"], string>> = {
  beijing: "translate(14px, -30px)",
  shanghai: "translate(14px, 15px)",
  london: "translate(calc(-100% - 14px), -34px)",
  paris: "translate(calc(-100% - 12px), 16px)",
  berlin: "translate(13px, -24px)",
  rome: "translate(13px, 14px)",
  madrid: "translate(calc(-100% - 12px), 15px)"
};

const mobileLabelPlacement: Partial<Record<ConnectionLocation["id"], string>> = {
  london: "translate(12px, -28px)",
  beijing: "translate(calc(-100% - 12px), -28px)",
  shanghai: "translate(calc(-100% - 12px), 12px)"
};

const locationMap = new Map(connectionLocations.map((item) => [item.id, item]));

function stageForElapsed(elapsed: number, compact: boolean) {
  const timing = compact ? sequenceTimings.mobile : sequenceTimings.desktop;
  if (elapsed >= timing.duration) return 4;
  if (elapsed >= timing.europe) return 3;
  if (elapsed >= timing.primary) return 2;
  if (elapsed >= timing.origin) return 1;
  return 0;
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function VenusGlobeVisual({ language }: { language: Language }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<Globe | null>(null);
  const elapsedRef = useRef(0);
  const stageRef = useRef(0);
  const reducedMotion = useHydratedReducedMotion();
  const [shouldLoad, setShouldLoad] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [compactMotion, setCompactMotion] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const [stage, setStage] = useState(0);

  const projectedLocations = useMemo(
    () => new Map(connectionLocations.map((item) => [item.id, projectLocation(item)])),
    []
  );
  const paths = useMemo(
    () => connectionRoutes.map((route) => ({ route, path: routePath(route, locationMap) })),
    []
  );

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: "360px 0px" }
    );
    const sequenceObserver = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.22
    });
    loadObserver.observe(node);
    sequenceObserver.observe(node);
    return () => {
      loadObserver.disconnect();
      sequenceObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setCompactMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const timing = compactMotion ? sequenceTimings.mobile : sequenceTimings.desktop;
    if (reducedMotion) {
      elapsedRef.current = timing.duration;
      stageRef.current = 4;
      setStage(4);
      globeRef.current?.update({ phi: globeView.phi, theta: globeView.theta });
      return;
    }
    if (!inView || !pageVisible || stageRef.current === 4) return;

    let frame = 0;
    let previous = 0;
    const tick = (time: number) => {
      if (!previous) previous = time;
      const delta = Math.min(time - previous, 64);
      previous = time;
      elapsedRef.current = Math.min(timing.duration, elapsedRef.current + delta);
      const nextStage = stageForElapsed(elapsedRef.current, compactMotion);
      if (nextStage !== stageRef.current) {
        stageRef.current = nextStage;
        setStage(nextStage);
      }

      const cameraProgress = easeOutCubic(Math.min(elapsedRef.current / timing.camera, 1));
      globeRef.current?.update({
        phi: globeView.phi - (1 - cameraProgress) * 0.045,
        theta: globeView.theta + (1 - cameraProgress) * 0.012
      });

      if (elapsedRef.current < timing.duration) {
        frame = requestAnimationFrame(tick);
      } else {
        globeRef.current?.update({ phi: globeView.phi, theta: globeView.theta });
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [compactMotion, inView, pageVisible, reducedMotion]);

  useEffect(() => {
    if (stage < 4 || reducedMotion || !inView || !pageVisible) return;
    let frame = 0;
    const tick = (time: number) => {
      globeRef.current?.update({
        phi: globeView.phi + Math.sin(time / 22000) * 0.007,
        theta: globeView.theta + Math.sin(time / 31000) * 0.0025
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      globeRef.current?.update({ phi: globeView.phi, theta: globeView.theta });
    };
  }, [inView, pageVisible, reducedMotion, stage]);

  useEffect(() => {
    if (!shouldLoad) return;
    const host = canvasHostRef.current;
    if (!host) return;

    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    let globe: Globe | null = null;
    let textureUpdateTimer: number | null = null;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.dataset.cobeCanvas = "true";
    canvas.style.cssText = "display:block;width:100%;height:100%;opacity:1";
    host.replaceChildren(canvas);

    const contextOptions: WebGLContextAttributes = {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance"
    };
    const context = canvas.getContext("webgl2", contextOptions) ?? canvas.getContext("webgl", contextOptions);
    if (!context) {
      host.replaceChildren();
      return;
    }

    const onContextLost = (event: Event) => {
      event.preventDefault();
      setEnhanced(false);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    void import("cobe")
      .then(({ default: createGlobe }) => {
        if (cancelled) return;
        const mobile = window.matchMedia("(max-width: 767px)").matches;
        const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.6);
        const markers: Marker[] = connectionLocations.map((item) => ({
          location: [item.latitude, item.longitude],
          size: item.type === "primary-hub" ? 0.015 : item.type === "origin" ? 0.008 : 0.004,
          color: item.type === "europe-context" ? [0.53, 0.47, 0.38] : [0.72, 0.61, 0.44]
        }));
        const render = () => {
          const size = Math.max(1, Math.round(host.getBoundingClientRect().width));
          if (!globe) {
            globe = createGlobe(canvas, {
              width: size,
              height: size,
              devicePixelRatio: dpr,
              phi: globeView.phi - 0.045,
              theta: globeView.theta + 0.012,
              dark: 1,
              diffuse: 1.05,
              scale: globeView.scale,
              mapSamples: mobile ? 6200 : 11800,
              mapBrightness: mobile ? 1.85 : 1.7,
              mapBaseBrightness: 0.004,
              baseColor: [0.24, 0.225, 0.2],
              markerColor: [0.72, 0.61, 0.44],
              glowColor: [0.043, 0.041, 0.037],
              opacity: 0.97,
              markerElevation: 0.012,
              markers,
              arcs: [],
              arcColor: [0.79, 0.65, 0.42],
              arcWidth: 0.8,
              arcHeight: 0.18,
              context: contextOptions
            });
            globeRef.current = globe;
          } else {
            globe.update({ width: size, height: size });
          }
        };
        render();
        if (cancelled) {
          globe?.destroy();
          return;
        }
        setEnhanced(true);
        resizeObserver = new ResizeObserver(render);
        resizeObserver.observe(host);
        textureUpdateTimer = window.setTimeout(() => {
          if (!cancelled) globe?.update({});
        }, 120);
      })
      .catch(() => {
        if (cancelled) return;
        setEnhanced(false);
        host.replaceChildren();
      });

    return () => {
      cancelled = true;
      if (textureUpdateTimer !== null) window.clearTimeout(textureUpdateTimer);
      resizeObserver?.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      globe?.destroy();
      if (globeRef.current === globe) globeRef.current = null;
      host.replaceChildren();
    };
  }, [shouldLoad]);

  const networkVisible = stage >= 3 || reducedMotion;
  const primaryVisible = stage >= 2 || reducedMotion;
  const originVisible = stage >= 1 || reducedMotion;
  const paused = !reducedMotion && (!inView || !pageVisible);

  return (
    <div
      ref={rootRef}
      className="relative aspect-square w-full"
      data-connection-visual
      data-globe-stage={stageNames[stage]}
      data-globe-paused={paused ? "true" : "false"}
      data-reduced-motion={reducedMotion ? "true" : "false"}
    >
      <svg
        viewBox="0 0 1000 1000"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        data-globe-fallback
      >
        <defs>
          <radialGradient id="venus-fallback-field" cx="38%" cy="31%" r="69%">
            <stop offset="0" stopColor="#272a2b" />
            <stop offset="0.64" stopColor="#151819" />
            <stop offset="1" stopColor="#0b0d0e" />
          </radialGradient>
          <pattern
            id="venus-fallback-dots"
            width="29"
            height="23"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(11)"
          >
            <circle cx="3" cy="5" r=".9" fill="#eee7da" fillOpacity=".34" />
            <circle cx="18" cy="3" r=".55" fill="#c8a56a" fillOpacity=".28" />
            <circle cx="11" cy="17" r=".7" fill="#d8d1c4" fillOpacity=".24" />
            <circle cx="26" cy="14" r=".45" fill="#eee7da" fillOpacity=".2" />
          </pattern>
          <clipPath id="venus-fallback-clip">
            <circle cx="500" cy="500" r="448" />
          </clipPath>
          <clipPath id="venus-fallback-land">
            <path d="M178 292C215 222 291 184 376 202C453 158 551 166 625 206C728 207 824 253 884 319C849 355 807 374 746 376C690 416 626 423 557 399C509 441 445 435 399 394C343 417 286 391 257 348C221 347 191 324 178 292Z" />
            <path d="M294 383C349 354 416 369 462 418C489 474 475 541 456 606C430 697 388 771 342 736C311 684 287 624 268 556C248 486 252 421 294 383Z" />
            <path d="M151 274C160 255 177 249 190 261C191 278 181 292 164 296C152 291 147 284 151 274Z" />
          </clipPath>
          <radialGradient id="venus-fallback-vignette" cx="36%" cy="28%" r="72%">
            <stop offset="0" stopColor="#f3f0e9" stopOpacity=".05" />
            <stop offset=".72" stopColor="#0b0d0e" stopOpacity="0" />
            <stop offset="1" stopColor="#0b0d0e" stopOpacity=".58" />
          </radialGradient>
        </defs>
        <circle
          cx="500"
          cy="500"
          r="448"
          fill="url(#venus-fallback-field)"
          stroke="#f3f0e9"
          strokeOpacity=".075"
        />
        <g clipPath="url(#venus-fallback-clip)">
          <rect
            x="50"
            y="50"
            width="900"
            height="900"
            fill="#d8d1c4"
            fillOpacity=".055"
            clipPath="url(#venus-fallback-land)"
          />
          <rect
            x="50"
            y="50"
            width="900"
            height="900"
            fill="url(#venus-fallback-dots)"
            opacity=".72"
            clipPath="url(#venus-fallback-land)"
          />
        </g>
        <circle cx="500" cy="500" r="448" fill="url(#venus-fallback-vignette)" />
      </svg>

      <div
        ref={canvasHostRef}
        className={`absolute inset-0 transition-opacity duration-700 ${enhanced ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
        data-cobe-layer
        data-enhanced={enhanced ? "true" : "false"}
      />

      <svg
        viewBox="0 0 1000 1000"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {paths.map(({ route, path }) => {
            const visible = route.hierarchy === "primary" ? primaryVisible : networkVisible;
            return (
              <path
                key={`base-${route.from}-${route.to}`}
                d={path}
                className={route.mobile ? undefined : "hidden sm:block"}
                stroke="#c8a56a"
                strokeOpacity={visible ? (route.hierarchy === "primary" ? 0.14 : 0.075) : 0}
                strokeWidth={route.hierarchy === "primary" ? 0.72 : 0.58}
                vectorEffect="non-scaling-stroke"
                style={{
                  transition: reducedMotion ? "none" : "stroke-opacity .8s cubic-bezier(.22,1,.36,1)"
                }}
              />
            );
          })}
          {paths.map(({ route, path }, index) => {
            const primary = route.hierarchy === "primary";
            const visible = primary ? primaryVisible : networkVisible;
            const routeVisible = visible && (!compactMotion || route.mobile);
            return (
              <path
                key={`${route.from}-${route.to}`}
                d={path}
                className={route.mobile ? undefined : "hidden sm:block"}
                fill="none"
                stroke="#c8a56a"
                strokeOpacity={primary ? 0.72 : 0.44}
                strokeWidth={primary ? 1.05 : 0.74}
                vectorEffect="non-scaling-stroke"
                data-connection-route={route.hierarchy}
                data-route-from={route.from}
                data-route-to={route.to}
                data-route-mobile={route.mobile ? "true" : "false"}
                pathLength="1"
                style={{
                  strokeDasharray: primary ? "0.012 0.988" : "0.009 0.991",
                  strokeDashoffset: 1,
                  opacity: routeVisible && !reducedMotion ? 1 : 0,
                  animationName: routeVisible && !reducedMotion ? "venus-route-flow" : "none",
                  animationDuration: `${primary ? 8.4 + index * 0.55 : 10.5 + (index % 4) * 0.8}s`,
                  animationDelay: `${primary ? index * 0.42 : (index % 5) * 0.7}s`,
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationPlayState: inView && pageVisible ? "running" : "paused"
                }}
              />
            );
          })}
        </g>

        {connectionLocations.map((item) => {
          const point = projectedLocations.get(item.id);
          if (!point) return null;
          const visible =
            item.type === "origin"
              ? originVisible
              : item.type === "primary-hub"
                ? primaryVisible
                : networkVisible;
          const radius = item.type === "primary-hub" ? 4.2 : item.type === "origin" ? 3.6 : 2.1;
          const originIndex =
            item.type === "origin"
              ? connectionLocations
                  .filter((location) => location.type === "origin")
                  .findIndex((location) => location.id === item.id)
              : 0;
          return (
            <motion.g
              key={item.id}
              initial={false}
              animate={{ opacity: visible ? 1 : 0.16 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.5, delay: item.type === "origin" ? originIndex * 0.12 : 0 }
              }
              className={item.mobileRoute || item.type !== "europe-context" ? undefined : "hidden sm:block"}
              data-connection-node={item.id}
            >
              <circle
                cx={point.x}
                cy={point.y}
                r={radius + 7}
                fill="#c8a56a"
                fillOpacity={item.type === "primary-hub" ? 0.11 : 0.06}
              />
              {item.type === "primary-hub" ? (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={radius + 11}
                  fill="none"
                  stroke="#c8a56a"
                  strokeOpacity=".22"
                  strokeWidth=".7"
                  vectorEffect="non-scaling-stroke"
                />
              ) : null}
              <circle
                cx={point.x}
                cy={point.y}
                r={radius}
                fill="#f3f0e9"
                stroke="#c8a56a"
                strokeWidth="1.25"
                vectorEffect="non-scaling-stroke"
              />
            </motion.g>
          );
        })}
      </svg>

      {connectionLocations
        .filter((item) => item.labelPriority !== "legend")
        .map((item) => {
          const point = projectedLocations.get(item.id);
          if (!point) return null;
          const visible =
            item.type === "origin"
              ? originVisible
              : item.type === "primary-hub"
                ? primaryVisible
                : networkVisible;
          return (
            <span key={item.id}>
              <motion.span
                className="pointer-events-none absolute hidden whitespace-nowrap text-[11px] font-medium tracking-[0.04em] text-pearl sm:block"
                style={{
                  left: `${((point.x / globeView.viewBox) * 100).toFixed(4)}%`,
                  top: `${((point.y / globeView.viewBox) * 100).toFixed(4)}%`,
                  transform: labelPlacement[item.id]
                }}
                initial={false}
                animate={{ opacity: visible ? (item.type === "europe-context" ? 0.68 : 1) : 0 }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.48 }}
              >
                <span className={item.type === "primary-hub" ? "text-champagne" : undefined}>
                  {item.label[language]}
                </span>
              </motion.span>
              {item.type !== "europe-context" ? (
                <motion.span
                  className="pointer-events-none absolute whitespace-nowrap text-[11px] font-medium tracking-[0.04em] text-pearl sm:hidden"
                  style={{
                    left: `${((point.x / globeView.viewBox) * 100).toFixed(4)}%`,
                    top: `${((point.y / globeView.viewBox) * 100).toFixed(4)}%`,
                    transform: mobileLabelPlacement[item.id]
                  }}
                  initial={false}
                  animate={{ opacity: visible ? 1 : 0 }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.48 }}
                >
                  <span className={item.type === "primary-hub" ? "text-champagne" : undefined}>
                    {item.label[language]}
                  </span>
                </motion.span>
              ) : null}
            </span>
          );
        })}
    </div>
  );
}
