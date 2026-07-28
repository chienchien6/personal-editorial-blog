# Personal Editorial Blog Design System

## Product Context

This is a personal editorial blog for collecting, categorizing, and publishing long-form web article digests, notes, essays, research summaries, and future interest-based categories. The site should feel like a cohesive independent magazine rather than a generic personal homepage.

Primary jobs:
- Present the author as a curator and writer with a strong editorial point of view.
- Let visitors browse articles by category.
- Make featured article collections feel intentional and magazine-like.
- Support future expansion: new categories, new articles, highlighted series, and archive browsing.

Core pages to design:
- Home / magazine front page: featured editorial story, category rail, latest articles, topic collections, archive prompt.
- Category index: all categories, each with description, article count, featured post, and visual rhythm.
- Article detail: readable long-form article with title, dek, metadata, category label, table of contents, pull quote, related articles.

## Visual Direction

Primary style source: editorial magazine pitch-deck system adapted into a web blog.

The interface should read as a digital magazine printed on warm paper:
- Off-white / cream background with subtle film-grain texture.
- Near-black ink for primary text.
- Brick-red accent for labels, rules, active states, and select highlights.
- Strong typographic contrast: giant condensed all-caps display headlines, restrained sans body copy, elegant serif section breaks.
- Layouts should feel repeatable and systematic, like an editorial magazine issue.

Do not make it look like a SaaS landing page. Avoid glossy gradients, glassmorphism, dark cyber styling, rounded pill-heavy UI, and decorative floating blobs.

## Palette

Use this strict palette:
- Paper: `#f1ece1`
- Ink: `#1c1913`
- Brick red: `#b3401f`
- Muted ink: `#625c52`
- Hairline: `rgba(28, 25, 19, 0.18)`
- Soft red wash: `rgba(179, 64, 31, 0.08)`

Color rules:
- Background is almost always `#f1ece1`.
- Text is `#1c1913`.
- Brick red is used sparingly for labels, category chips, section markers, rules, hover states, and editorial accents.
- Do not introduce other accent colors.

## Typography

Use Google Fonts:
- Chinese editorial display: Noto Serif TC, high-contrast newspaper-like serif for hero titles, article titles, and section headlines.
- English editorial accent: Cormorant Garamond, elegant serif for issue marks, small editorial English phrases, pull quotes, and decorative numerals.
- Body/UI: Noto Sans TC for Traditional Chinese body copy, navigation, labels, excerpts, metadata, and forms. Public Sans may be used only for compact Latin metadata.

Do not use Anton. The blog should feel like a high-end independent newspaper or culture journal, not a poster deck.

Type behavior:
- Hero headline should use large serif editorial treatment, not a condensed word-stack. It can still be bold and dramatic, but the rhythm should be literary and readable.
- Labels are tracked all-caps in brick red, `letter-spacing: 0.18em` to `0.24em`.
- Body copy must be readable and calm, Noto Sans TC 17-19px with generous line-height.
- Article titles should use Noto Serif TC with refined weight contrast. Pull quotes can use Cormorant Garamond for English or Noto Serif TC for Chinese.
- Do not use negative letter spacing. Keep letter spacing at 0 except tracked labels.

## Layout System

Canvas target for design drafts: responsive web page, desktop-first but plausible on mobile.

Editorial grid:
- Use a 12-column desktop grid with wide margins.
- Keep content constrained but not card-heavy.
- Use full-width bands or unframed sections; do not nest cards inside cards.
- Use thin ink rules, column dividers, baseline-aligned metadata, and issue-like furniture.

Required magazine furniture:
- Every major section includes a top-margin tracked all-caps label in brick red.
- Repeated article teasers include category, date, title, excerpt, and reading time.
- Category navigation should feel like a table of contents, not app tabs.
- Use numbered index markers for categories or featured articles.

Homepage structure:
- Sticky or static masthead with blog name, categories, archive, about.
- First viewport: editorial cover-like hero with a concise serif title, one short supporting line, an image-led featured module, and a visible hint of the next section.
- Below hero: category table of contents, latest articles grid, featured series, archive section.

Hero / Featured rules:
- The cover hero must not become a wall of text. Keep hero text to a compact title, one short line, and one action or metadata row.
- The `今日推薦 / FEATURED` area should be primarily visual: use a photo, archival object, paper clipping, index-card composition, or strong editorial graphic device.
- Featured copy should be minimal: category/date/reading time, one short article title, and a small read-more link. Avoid paragraph summaries in the hero.
- Avoid repeated tracked eyebrow labels in the first viewport. One section label is enough.

Category structure:
- Page title uses Anton word-stack or large section title.
- Categories should be easy to add later; design them as repeatable modules.
- Each category module includes name, short description, article count, latest article, and optional featured tag.

Article structure:
- Calm reading page on cream paper.
- Top label line: category, date, reading time.
- Strong title, short dek, author note.
- Body width should be comfortable, roughly 680-780px.
- Include pull quote treatment in Playfair Display.
- Include related articles at the end using compact editorial teasers.

## Components

Design these as reusable patterns:
- Masthead navigation
- Category index row
- Featured article block
- Article teaser
- Issue note / editor note
- Pull quote
- Related article strip
- Archive list

Buttons and links:
- Prefer text links with underline/rule movement over pill buttons.
- Primary action may be a small brick-red outlined text button.
- Use familiar symbols sparingly, such as arrow marks for read-more links.

## Texture And Motion

Texture:
- Add a subtle film-grain overlay across the paper background.
- Use paper-like imperfection with very low opacity only.

Motion:
- Keep interactions editorial and restrained.
- Hover states can shift brick-red rules, reveal arrows, or underline text.
- No bouncy animations, no neon glow, no large animated gradients.

## Content Seed

Use Traditional Chinese interface copy with a personal editorial tone.

Suggested site name placeholders:
- `PERSONAL EDITORIAL`
- `筆記雜誌`
- `Reading / Notes / Essays`

Suggested categories:
- Skill 收藏
- 外語導遊口說
- 城市觀察
- AI 與工具
- 設計筆記
- 閱讀整理
- 生活方法
- 研究收藏

Example article titles:
- `為什麼我開始把網頁整理成自己的知識雜誌`
- `我覺得值得留下來的 Codex Skill 與使用情境`
- `外語導遊口說考試：景點介紹的英文開場模板`
- `用英文介紹台灣夜市時，可以避開哪些直翻句`
- `AI 工具不是捷徑，是新的工作桌面`
- `一座城市如何被路線、標示與等待塑形`
- `那些值得重讀的長文與它們留下的問題`

Content taxonomy notes:
- `Skill 收藏` is for saving useful agent skills, prompts, design utilities, workflows, setup notes, and personal usage reviews.
- `外語導遊口說` is for English-learning articles aimed at preparing foreign-language tour guide oral exams: attraction introduction scripts, guide opening remarks, visitor interaction phrases, Taiwan culture explanations, timed speaking practice, and exam preparation notes.
- These two categories should feel like first-class editorial sections, not miscellaneous tags.

## Fidelity Constraint

Use ONLY the fonts, colors, spacing, and component styles defined in this design system. Do not introduce any fonts, colors, or visual styles not in the design system.
