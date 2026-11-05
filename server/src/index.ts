import express from "express";
import path from "node:path";
import { JsonPortfolioRepository } from "./repositories/portfolio-repository.js";
import { createPortfolioRouter } from "./routes/portfolio.js";
import { PortfolioService } from "./services/portfolio-service.js";

const app = express();
const projectRoot = process.cwd();
const repository = new JsonPortfolioRepository(
  path.join(projectRoot, "data", "portfolio.json"),
);
const portfolioService = new PortfolioService(repository);

app.disable("x-powered-by");
app.use(express.static(path.join(projectRoot, "public")));
app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});
app.use("/api/portfolio", createPortfolioRouter(portfolioService));

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({ error: "Portfolio content is temporarily unavailable." });
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`Diana's portfolio is available at http://localhost:${port}`);
});
