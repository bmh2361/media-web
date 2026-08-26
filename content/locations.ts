import type { LocalisedString } from "@/content/types";

export type ConnectionLocation = {
  id:
    | "beijing"
    | "shanghai"
    | "shenzhen"
    | "guangzhou"
    | "hangzhou"
    | "london"
    | "paris"
    | "berlin"
    | "brussels"
    | "rome"
    | "madrid"
    | "amsterdam"
    | "vienna";
  label: LocalisedString;
  latitude: number;
  longitude: number;
  type: "origin" | "primary-hub" | "europe-context";
  note: LocalisedString;
  labelPriority: "primary" | "secondary" | "legend";
  mobileRoute: boolean;
};

const location = (
  id: ConnectionLocation["id"],
  en: string,
  zh: string,
  latitude: number,
  longitude: number,
  type: ConnectionLocation["type"],
  labelPriority: ConnectionLocation["labelPriority"],
  mobileRoute = false
): ConnectionLocation => ({
  id,
  label: { en, zh },
  latitude,
  longitude,
  type,
  labelPriority,
  mobileRoute,
  note:
    type === "origin"
      ? { en: "Cross-border project origin", zh: "跨境项目起点" }
      : type === "primary-hub"
        ? { en: "Primary connection into the UK and Europe", zh: "连接英国及欧洲的主要节点" }
        : { en: "European market context", zh: "欧洲市场语境" }
});

// These points describe project geography and market context. They do not
// represent Venus Bridge offices, permanent teams or formal partners.
export const connectionLocations: ConnectionLocation[] = [
  location("beijing", "Beijing", "北京", 39.9042, 116.4074, "origin", "primary", true),
  location("shanghai", "Shanghai", "上海", 31.2304, 121.4737, "origin", "primary", true),
  location("shenzhen", "Shenzhen", "深圳", 22.5431, 114.0579, "origin", "legend", true),
  location("guangzhou", "Guangzhou", "广州", 23.1291, 113.2644, "origin", "legend"),
  location("hangzhou", "Hangzhou", "杭州", 30.2741, 120.1551, "origin", "legend"),
  location("london", "London", "伦敦", 51.5074, -0.1278, "primary-hub", "primary", true),
  location("paris", "Paris", "巴黎", 48.8566, 2.3522, "europe-context", "secondary", true),
  location("berlin", "Berlin", "柏林", 52.52, 13.405, "europe-context", "secondary", true),
  location("brussels", "Brussels", "布鲁塞尔", 50.8503, 4.3517, "europe-context", "legend"),
  location("rome", "Rome", "罗马", 41.9028, 12.4964, "europe-context", "secondary", true),
  location("madrid", "Madrid", "马德里", 40.4168, -3.7038, "europe-context", "secondary"),
  location("amsterdam", "Amsterdam", "阿姆斯特丹", 52.3676, 4.9041, "europe-context", "legend"),
  location("vienna", "Vienna", "维也纳", 48.2082, 16.3738, "europe-context", "legend")
];

export type ConnectionRoute = {
  from: ConnectionLocation["id"];
  to: ConnectionLocation["id"];
  hierarchy: "primary" | "secondary";
  mobile: boolean;
};

export const connectionRoutes: ConnectionRoute[] = [
  ...connectionLocations
    .filter((item) => item.type === "origin")
    .map((item) => ({
      from: item.id,
      to: "london" as const,
      hierarchy: "primary" as const,
      mobile: item.mobileRoute
    })),
  ...connectionLocations
    .filter((item) => item.type === "europe-context")
    .map((item) => ({
      from: "london" as const,
      to: item.id,
      hierarchy: "secondary" as const,
      mobile: item.mobileRoute
    }))
];
