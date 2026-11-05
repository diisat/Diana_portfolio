# Architecture and data model

## First-version architecture

The portfolio uses a **layered modular monolith**. One Node.js application serves the browser experience and the JSON API, so the first release stays easy to run and deploy while keeping responsibilities clear.

```text
Browser: HTML + CSS + JavaScript
        │  GET /api/portfolio?lang=en|fr|es
        ▼
Express route (presentation)
        ▼
PortfolioService (application rules and locale fallback)
        ▼
PortfolioRepository (data access port)
        ▼
JSON file (first-version adapter) ──► PostgreSQL adapter (future)
```

### Pattern

- **Layered architecture** separates HTTP, application rules and storage.
- **Repository pattern** keeps content retrieval behind `PortfolioRepository`.
- **Adapter approach** lets the JSON implementation be replaced by PostgreSQL without changing the route contract.
- **Modular monolith** keeps deployment and operations simple for a personal portfolio; there is no need for microservices.

The browser is plain JavaScript, HTML and CSS. The backend is Node.js with TypeScript and Express. TypeScript is a useful next step for a new portfolio/API project because it carries JavaScript knowledge across the whole stack with safer contracts. GitHub's 2025 Octoverse report found TypeScript became its most-used language by contributor count in August 2025; Stack Overflow's 2026 survey still places JavaScript first by reported usage, with TypeScript sixth, Java seventh and Python fourth. These are adoption signals, not a guarantee of hiring demand. Sources: [GitHub Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/) and [Stack Overflow Developer Survey 2026](https://survey.stackoverflow.co/2026/technology/).

## Database recommendation

Use **PostgreSQL** when the portfolio needs an editor, draft/published status, search, or a larger number of case studies. Projects, experience entries, and translations are naturally related and benefit from relational constraints and queries.

The MVP intentionally uses `data/portfolio.json` as its content store. A personal portfolio has a small amount of structured content and no visitor-generated data, so a database would add setup without improving the first release. The repository boundary in the code keeps migration straightforward.

### Suggested PostgreSQL tables

| Table | Key fields | Purpose |
| --- | --- | --- |
| `projects` | `id`, `category`, `status`, `year`, `visual_key`, `sort_order` | Language-independent project metadata |
| `project_translations` | `project_id`, `locale`, `title`, `summary`, `challenge`, `approach`, `outcome` | English, French and Spanish project copy |
| `experience` | `id`, `start_date`, `end_date`, `sort_order` | Career timeline metadata |
| `experience_translations` | `experience_id`, `locale`, `role`, `company`, `summary`, `learning` | Localized timeline copy |
| `tags` / `project_tags` | `id`, `label`, `project_id`, `tag_id` | Reusable skills and project filters |
| `profile_translations` | `locale`, `title`, `intro`, `contact_copy` | Localized profile and section text |

Use a unique constraint on `(project_id, locale)` and `(experience_id, locale)`. Keep supported locales explicit (`en`, `fr`, `es`) and fall back to English when a translation is missing. A hosted PostgreSQL service such as Supabase can provide managed hosting later; the application should access it through server-side credentials only.

## API contract

- `GET /api/health` → `{ "status": "ok" }`
- `GET /api/portfolio?lang=en` → localized profile, projects, experience, skills and UI labels
- Supported locales: `en`, `fr`, `es`; missing or invalid values use English

No contact form or visitor data is stored in this first version. Email and LinkedIn links open directly.

## Future evolution

1. Add validation for content and API response types.
2. Implement a PostgreSQL-backed repository if content editing or search requires it.
3. Add a private content editor only if Diana wants to manage portfolio updates without editing JSON.
4. Add image optimization and case-study media once project visuals are available.
