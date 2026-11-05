import { Router } from "express";
import type { PortfolioService } from "../services/portfolio-service.js";

export function createPortfolioRouter(service: PortfolioService): Router {
  const router = Router();

  router.get("/", async (request, response, next) => {
    try {
      const portfolio = await service.getPortfolio(request.query.lang?.toString());
      response.json(portfolio);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
