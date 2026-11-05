# Design direction

## Portfolio concept

**Portfolio in Motion** presents Diana's career as a sequence of deliberate transitions: from quality engineering into product exploration, from Colombia to France, and from systems thinking into more expressive forms of making.

The page leads with a clear, human introduction, then lets visitors choose how to explore: browse selected work, open a project story, unfold an experience chapter, or jump to the current exploration. Future ideas are visibly labelled as questions or experiments rather than finished case studies.

## Reference mapping

- [Gianluca Boccia](https://www.gianlucaboccia.me/) — story-first introduction, a concise one-line point of view, selected work and a direct route to experience/CV.
- [Mike's CV](https://www.mikes.cv/) — a compact portfolio/CV reference for making a profile easy to scan. The site did not load in the research browser, so no specific visual details were copied.
- [Zesiger.net](https://zesiger.net/) — playful, interactive exploration with a clear fallback path. Diana's version keeps the experience lightweight and accessible with filters, expandable chapters and project dialogs instead of a 3D-only interface.

These references informed the structure and interaction approach; the visual identity is original to Diana's interests and career story.

## Visual system

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#F7F3ED` | Main background |
| Ink | `#262331` | Primary text and contrast section |
| Iris | `#7452AE` | Buttons, labels and navigation emphasis |
| Deep iris | `#4E367C` | Contact section |
| Coral | `#EF8977` | Motion accents and highlights |
| Chartreuse | `#D9E87B` | Small high-contrast signals |
| Lilac | `#D9C9EE` | Exploration surfaces |
| Blue | `#B9DDE3` | Research and data surfaces |

The serif heading style gives the page an editorial/art connection; a simple sans-serif carries navigation and technical detail. Illustrations use route lines, a mobile interface, and a monitoring chart to make engineering work feel approachable without relying on stock imagery.

## Interaction and accessibility

- Language selector for English, French and Spanish
- Project-category filters and dialog-based case-study details
- Keyboard-friendly navigation and native `details` disclosures for experience
- Responsive desktop/mobile layouts
- Reduced-motion preference support; no auto-playing animation or 3D requirement

The current Figma file includes editable desktop and mobile mockups and a local color-token collection. The code prototype is implemented separately in HTML, CSS, JavaScript and a Node.js API.
