import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),
  route("timer", "./routes/timer.tsx"),
  route("performance", "./routes/performance.tsx"),
] satisfies RouteConfig;
