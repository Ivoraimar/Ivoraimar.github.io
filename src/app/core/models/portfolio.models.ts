export type Language = 'en' | 'es';

export type ProjectTheme = 'oakestra' | 'truco' | 'rover' | 'lander';

export type LocalizedText = Readonly<Record<Language, string>>;

export interface PortfolioLink {
  readonly label: LocalizedText;
  readonly url: string;
}

export interface Project {
  readonly title: string;
  readonly eyebrow: LocalizedText;
  readonly description: LocalizedText;
  readonly highlights: readonly LocalizedText[];
  readonly technologies: readonly string[];
  readonly theme: ProjectTheme;
  readonly links: readonly PortfolioLink[];
}

export interface ProjectPanelLabels {
  readonly highlights: string;
  readonly technologies: string;
  readonly opensNewTab: string;
}
