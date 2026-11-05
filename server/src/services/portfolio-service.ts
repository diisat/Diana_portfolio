import {
  type Locale,
  type LocalizedPortfolio,
  type PortfolioRepository,
} from "../repositories/portfolio-repository.js";

const supportedLocales: Locale[] = ["en", "fr", "es"];

export class PortfolioService {
  constructor(private readonly repository: PortfolioRepository) {}

  async getPortfolio(localeInput: string | undefined): Promise<LocalizedPortfolio> {
    const locale = supportedLocales.includes(localeInput as Locale)
      ? (localeInput as Locale)
      : "en";

    return this.repository.getByLocale(locale);
  }
}
