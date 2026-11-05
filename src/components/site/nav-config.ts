export interface NavItem {
  label: string;
  view: ViewKey;
}

export type ViewKey =
  | "home"
  | "innovation"
  | "intellectual-property"
  | "intelligence"
  | "rd"
  | "capabilities"
  | "news"
  | "careers"
  | "contact"
  | "vision"
  | "vocal"
  | "vital";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", view: "home" },
  { label: "Innovation", view: "innovation" },
  { label: "Research & Development", view: "rd" },
  { label: "Capabilities", view: "capabilities" },
  { label: "Intelligence", view: "intelligence" },
  { label: "Insights", view: "news" },
  { label: "Careers", view: "careers" },
  { label: "Contact", view: "contact" },
];

export const FOOTER_EXPLORE: NavItem[] = [
  { label: "About Us", view: "home" },
  { label: "Innovation", view: "innovation" },
  { label: "Research & Development", view: "rd" },
  { label: "Our Capabilities", view: "capabilities" },
  { label: "Intelligence", view: "intelligence" },
];

export const FOOTER_DISCOVER: NavItem[] = [
  { label: "Vision Intelligence", view: "vision" },
  { label: "Vocal Intelligence", view: "vocal" },
  { label: "Vital Intelligence", view: "vital" },
  { label: "News & Insights", view: "news" },
  { label: "Careers", view: "careers" },
];

export const FOOTER_CONNECT: NavItem[] = [
  { label: "Contact Us", view: "contact" },
  { label: "Research Enquiries", view: "contact" },
  { label: "Professional Collaboration", view: "contact" },
];
