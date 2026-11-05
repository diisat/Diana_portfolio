import { readFile } from "node:fs/promises";

export type Locale = "en" | "fr" | "es";

export interface LocalizedPortfolio {
  locale: Locale;
  ui: Record<string, string>;
  profile: Record<string, string>;
  projects: Array<Record<string, unknown>>;
  experience: Array<Record<string, unknown>>;
  explorations: Array<Record<string, unknown>>;
  skills: Array<Record<string, unknown>>;
  hobbies: Array<Record<string, string>>;
  languages: Array<Record<string, string>>;
}

export interface PortfolioRepository {
  getByLocale(locale: Locale): Promise<LocalizedPortfolio>;
}

export class JsonPortfolioRepository implements PortfolioRepository {
  private readonly contentPath: string;

  constructor(contentPath: string) {
    this.contentPath = contentPath;
  }

  async getByLocale(locale: Locale): Promise<LocalizedPortfolio> {
    const file = await readFile(this.contentPath, "utf8");
    const content = JSON.parse(file) as Record<Locale, LocalizedPortfolio>;
    return content[locale];
  }
}
