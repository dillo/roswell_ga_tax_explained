---
name: Roswell, explained
description: A vivid civic learning exhibit for understanding property taxes.
colors:
  blue: "#234ae5"
  ink: "#142449"
  paper: "#fff"
  pale: "#eef2ff"
  peach: "#ffd7bd"
  schools: "#cad7ff"
  green: "#bce6d6"
  border: "#d7deee"
  muted: "#4d5b79"
  math-surface: "#f0f4ff"
  calculator-controls: "#e1e9ff"
  focus: "#ee815d"
  county-chapter: "#fff4eb"
  schools-chapter: "#edf1ff"
  city-chapter: "#e7f5ef"
  chapter-copy: "#354766"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(3.1rem, 5.5vw, 5.5rem)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2.3rem, 4vw, 3.8rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-.035em"
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-.035em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    lineHeight: 1.7
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: ".85rem"
    fontWeight: 700
rounded:
  action: "8px"
  inset: "12px"
  card: "14px"
  calculator: "16px"
  hero: "20px"
  pill: "30px"
spacing:
  compact: "12px"
  related: "20px"
  card: "30px"
  calculator: "40px"
components:
  button-primary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    padding: "15px 22px"
  button-primary-hover:
    backgroundColor: "{colors.peach}"
  question-selected:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
    rounded: "{rounded.action}"
    padding: "23px 18px"
  authority-card:
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "30px"
  help-answer:
    backgroundColor: "{colors.pale}"
    textColor: "{colors.ink}"
    rounded: "{rounded.inset}"
    padding: "33px"
---

# Design System: Roswell, explained

## Overview

**Creative North Star: “The Civic Learning Exhibit.”**

This is an approachable, vivid guide built around large editorial headings, substantial explanatory prose, and diagrams that make public-service relationships tangible. Saturated cobalt marks the opening and final reassurance; quieter white and pastel surfaces give the reading and calculation room to breathe. The supplied generated house illustration contributes a tactile paper material, while the interface itself stays mostly flat.

This record describes the implementation in `app/page.tsx`, `app/globals.css`, and the font setup in `app/layout.tsx`. It records code evidence, not a claim of browser review. Educational examples retain their visible year, assumptions, and limitations as required by PRODUCT.md.

**Key Characteristics:**

- Bold, tightly set Archivo headings with calm Manrope reading text.
- Stable authority colors connecting explanations, bill tags, and numerical results.
- Generous section spacing with compact, purposeful interactive controls.
- Direct homeowner questions and visible links to official sources.

## Colors

The palette combines a confident civic blue with warm peach, cool periwinkle, and gentle green.

### Primary

**Blue** anchors the hero and closing panel, links, numbered steps, slider, and selected contact question. **Ink** supplies the reading color and the full calendar background.

### Secondary

**Peach** identifies the county, **schools** periwinkle identifies the school system, and **green** identifies the city. These assignments recur across the house caption, authority cards, bill tags, result dots, and stacked tax bar. Peach also emphasizes the hero phrase and payment deadline, and fills the unchanged-rate explanation.

### Neutral

**Paper** is the main page and calculator result surface. **Pale**, **math-surface**, and **calculator-controls** separate explanatory and interactive areas. **Muted** supports secondary prose; **border** separates rows and sections. **Focus** provides the visible keyboard outline.

**The Authority Continuity Rule.** Keep the same named authority color across explanations and math, and retain text labels so color is never the only identifier.

## Typography

**Display font:** Archivo, with sans-serif fallback. **Body font:** Manrope, with sans-serif fallback. Both are loaded through the application font setup.

Headings use tight tracking and short line heights to form decisive, conversational statements. Body text has a relaxed reading rhythm; small labels and explicit formulas provide detail without competing with headings.

The frontmatter records the base display, headline, title, body, and label roles. Introductions use slightly larger body text (1.15rem), usually limited to a readable width (670px). Main section headings cap their width (850px). Contextual headings range from compact timeline titles to larger contact-office names. Values use Archivo with tabular numerals: the home value is large (3rem), and the total scales fluidly. The smallest metadata stays supplementary, never the sole explanation of an interaction.

## Layout

The page opens with a shared orientation, then gives Fulton County, Fulton County Schools, and the City of Roswell parallel chapters before the shared calculation, rising-bill example, mortgage escrow payment paths, annual calendar, and contact help. Proposal-reading and district references follow the practical guide, with direct links from the authority chapters and overview. Each chapter gathers its rate-setting body, bill, records or exemption starting points, and official proposal and decision links. Inside each chapter, blocks fall into three tiers: Understand (who decides, then rate history), Act (what you can do, then who to contact), and Reference (the chapter's tax year, bills, and proposal links, with smaller headings). Blocks within a tier are separated by space alone (48px, 36px in Act); tiers are separated by a hairline and a larger interval (72px + 64px, reduced to 56px + 48px on mobile). Service-directory links sit directly beneath the chapter’s service introduction. The detail columns distinguish “Assessments, rates, and bills” from “Follow proposals and decisions,” keeping general services separate from tax administration. The page follows a long reading sequence with alternating full-width color fields and centered sections. Standard content has a maximum width (1280px) and generous vertical padding (100px), with horizontal padding (5%). The header has a wider maximum (1600px). The hero is inset from the viewport (24px), with two unequal columns (1.1fr / 1fr) and a minimum height (600px).

Three-column authority cards and numbered math steps become single columns on smaller screens. Authority chapters use a two-column detail and resource grid on desktop and a single reading column on mobile. Their pale peach, blue, and green backgrounds extend the established authority colors without making color the only identifier. The calculator pairs controls and results; bills use two panels separated by a plus sign. District explanations, the unchanged-rate example, and contextual help use two columns. The calendar combines a date column, marker rail, and explanatory text.

At the intermediate breakpoint (1000px), spacing tightens and the calendar heading stacks. At the main mobile breakpoint (800px), major grids stack, section padding becomes (65px 7%), the hero inset shrinks (12px), and the timeline narrows its date and marker columns. At the smallest breakpoint (480px), the hero heading becomes (3rem). At 800px and below, the site uses fixed mobile chrome modeled on a native tab-bar app. The header becomes a sticky translucent bar (60px, hairline underline) with the wordmark on the left and a current-section pill on the right. The pill takes that authority's color, or pale for shared sections, and reads “Now reading: …” to screen readers. A fixed bottom tab bar replaces the header nav and the quick-route strip. It has five equal slots, each an icon over a 13px label: County, Schools, City, Calculator, and More. The active tab fills its icon capsule with the authority color and carries `aria-current`. More opens a native modal `<dialog>` sheet above the bar, with Overview, State of Georgia, Paying through escrow, 2026 dates, and Find the right office. Rows are 58px with icon, label, and chevron over a dimmed ink scrim. The More tab is highlighted whenever the current section lives in the sheet. The bar respects safe-area insets (`viewport-fit=cover`), and the body reserves its height so the page footer stays visible. Anchors use a single 72px scroll-padding offset. Each chapter's Reference tier collapses behind a full-width toggle (“County dates and official links”); Understand and Act stay open. Tapping a help question scrolls its answer into view. Secondary prose has a 14px floor and metadata a 13px floor. On coarse pointers, links get 44px hit areas through invisible pseudo-elements, the slider thumb grows to 32px, and hover styles apply only where hover exists. Print expands every collapsed tier.

Printing hides navigation and interactive controls, reduces spacing, and uses light backgrounds for the hero, calendar, and closing panel. Timeline entries avoid internal page breaks.

## Elevation & Depth

Tonal fields and generous separation provide most depth. Shadows are reserved for the floating house label, calculator enclosure, and slider thumb. The house image supplies the tactile material; ordinary cards do not simulate lifted paper.

The image label uses a soft shadow (`0 7px 24px #102e8530`), the calculator uses a faint broad shadow (`0 15px 50px #19305d0a`), and the slider thumb uses a small control shadow (`0 3px 12px #14244935`). These extension tokens are also recorded in the sidecar.

## Shapes

The interface uses softly rounded rectangles with larger outer panels and smaller inner controls. Authority and bill cards share the card radius; question selection and primary actions use the action radius. Circular step counters and timeline dots establish sequence. Rounded pills label authorities and status.

The signature image has an arched top silhouette (140px 140px 16px 16px), reduced on mobile (90px 90px 12px 12px). The tax bar is a compact rounded strip (7px), with a small gap between authority segments. Simple outline icons reinforce labels, services, and actions.

## Components

### Buttons and links

The prominent call to action is a white, ink-text rounded link with a trailing or leading outline icon. Hover changes the fill to peach with a brief transition (.2s). Reset is a small underlined blue text button. Official-source links are blue and underlined with an outward arrow; within the dark calendar they use a light blue.

Keyboard focus on links, buttons, inputs, and summary elements uses a visible outline (3px) offset from the control (5px). Smooth anchor scrolling respects reduced-motion preferences; reduced-motion styling disables animations and transitions.

### Cards and tags

Authority cards are flat pastel containers with service icon, heading, prose, responsible decision-making body, and a separated bill label. Bill cards use paper with a thin border. Authority tags are noninteractive pills, not filters. The home label floats over the arch image, and three authority pills overlap its bottom edge.

### Calculator

A single controlled range slider changes the market value from $100,000 to $1,500,000 in $25,000 steps, initially $500,000. The pale blue controls panel shows market value and the 40% assessment step; the white result panel shows a live annual total, fixed proportional authority bar, component equations, and caveats. The slider has a blue track fill and a blue thumb with a thick white border. A reset restores the initial value.

The example explicitly uses adopted 2025 rates and excludes exemptions and additional charges. It is not presented as a personalized bill estimate. Output updates use a polite live region. Keep numbers, units, and formula labels visible alongside the graphic.

### Navigation and disclosure

The header pairs an outline-house wordmark with County, Schools, City, and shared-math in-page links. A quick-route strip provides direct calculator, calendar, and contact-help entry points on every screen size. The overview explains mills and the historical rate year before the chapter figures. Each chapter ends with overview and next-chapter links; City continues into the shared calculation. Internal reference links use right arrows, while official sources keep outward arrows. A keyboard skip link becomes visible on focus. District definitions and source notes use accordion rows with subtle dividers and blue chevrons; expanded content is smaller muted prose.

### Calendar

A dark ink section houses a vertical timeline. Completed entries use checked circles; the due entry uses peach text and a filled peach marker; future entries use outlined markers. Two explanatory notes below carry compact status pills. The annual timeline precedes the dated 2026 mailing example so the recurring process is explained first. Notices about exact dates and the example year remain visible context.

### Contextual help

A vertical group of four homeowner-question buttons updates one answer panel. The selected question fills blue with white text and reports its state through `aria-pressed`; unselected hover uses pale fill. The answer panel names the office, explains the next step, and shows a telephone link when applicable plus an official-source link. The panel announces changes politely and preserves a minimum mobile height (340px) to reduce layout movement.

## Do's and Don'ts

- **Do** maintain authority color continuity and explicit labels across every explanation and result.
- **Do** pair diagrams with plain-language explanations and visible formulas.
- **Do** retain source, date, proposal status, and illustrative-example context where users read or act on the information.
- **Do** preserve the tactile house asset, spacious editorial hierarchy, and visible keyboard focus.
- **Don't** imply the illustrative calculator produces an actual current bill.
- **Don't** assign meaning solely through color or replace explanatory text with decorative icons.
- **Don't** add persistent elevated shadows to ordinary cards; the current system uses flat tonal grouping.
- **Don't** make required reading depend on hover, animation, or a desktop-only arrangement.

## Mortgage escrow section

The shared escrow section follows the rising-bill example and precedes the calendar. A monthly-payment source leads to the escrow account and two bill destinations: Fulton (county peach and school periwinkle labels) and Roswell (city green). On narrow screens the destinations stack in reading order. Plain-language guidance covers annual escrow reviews, checking bill payments, and paying directly without escrow. A matching help question points back to the section.
