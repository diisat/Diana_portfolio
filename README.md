# Diana Torres — Portfolio in Motion

An interactive, multilingual portfolio for Diana Torres. The first version tells the story of an experienced software and quality engineer who is exploring creative product roles through the Draw My Future programme.

The interface is written in English by default and can be switched to French or Spanish. It brings together selected engineering and research work, an expandable experience timeline, and clearly labelled ideas for future projects.

## Run locally

Requirements: Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. To build the server for a production-style run:

```bash
npm run build
npm start
```

## What is included

- Responsive portfolio homepage with project filters and case-study dialogs
- English, French and Spanish content with a persistent language selector
- Expandable experience chapters and a career-transition section
- Node.js and Express REST API with a small layered architecture
- JSON content store for the first version
- PostgreSQL migration recommendation in [`docs/architecture.md`](docs/architecture.md)

## Update the portfolio content

Edit [`data/portfolio.json`](data/portfolio.json). Keep the `en`, `fr` and `es` objects aligned, and use the same project IDs in each locale. Add future work with `status: "now"` or `status: "exploring"` so ongoing ideas stay distinct from completed work. Use `public/images/diana-profile.jpeg` to replace the portrait.

## Product and visual direction

The page uses an editorial story-first structure, compact case-study cards, and a gentle sense of movement. Parchment, ink, iris purple, soft coral and a small chartreuse accent balance analytical clarity with Diana's interests in ballet, Monet and tennis. The interactions stay lightweight: language selection, category filters, project details and an expandable career timeline.

The editable desktop and mobile mockups are in [Figma](https://www.figma.com/design/SQLzgpklAZnGuwwRCUAzgt). See [`docs/design-direction.md`](docs/design-direction.md) for the reference mapping, and [`docs/architecture.md`](docs/architecture.md) for architecture and database decisions.
