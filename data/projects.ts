export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  video?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  year?: number | string;
}

/**
 * Projects list architecture for Dominic Thomas.
 * Prepared for future project entries without fabricating placeholders.
 */
export const PROJECTS: Project[] = [];

