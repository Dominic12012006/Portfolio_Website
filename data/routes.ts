export const ROUTES = {
  home: "/",
  build: "/build",
  about: "/about",
  experience: "/experience",
  socials: "/socials",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

