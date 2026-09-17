import { ROUTES, type RoutePath } from "./routes";

export interface NavItem {
  id: string;
  label: string;
  href: RoutePath;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: ROUTES.home,
  },
  {
    id: "about",
    label: "About",
    href: ROUTES.about,
  },
  {
    id: "experience",
    label: "Experience",
    href: ROUTES.experience,
  },
  {
    id: "socials",
    label: "Socials",
    href: ROUTES.socials,
  },
];

