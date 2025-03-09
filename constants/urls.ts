// constants/urls.ts
export const ROUTES = {
  HOME: "/",
  INFLUENCERS: "/influencers",
  USERS: "/users",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  PROFILE: "/profile",
  INFLUENCERS_DETAIL: "/influencers/[username]",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];