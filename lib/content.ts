export type PostMeta = {
  title: string;
  slug: string;
  category: string;
  date: string;
  readingTime: string;
  description: string;
  projectUrl?: string;
  siteUrl?: string;
  tags: string[];
};

export type Post = PostMeta & {
  body: string;
  html: string;
};

export type Category = {
  name: string;
  description: string;
  posts: PostMeta[];
};

const markdownModules = import.meta.glob("../content/posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const categoryDescriptions: Record<string, string> = {
  "Skill 收藏": "保存好用的 agent skills、prompt、設計工具、工作流與實際使用心得。",
  "外語導遊口說": "整理英文導覽、景點介紹、文化表達、口說模板與考試練習。",
  "作品介紹": "記錄我做過的網站、產品雛形與每個專案背後想解決的問題。",
  "AI 與工具": "觀察 AI 工具如何改變工作桌面，以及我自己的使用方法。",
  "設計筆記": "排版、介面、視覺層級與網站設計過程中的判斷。",
  "閱讀整理": "長文摘要、書籍筆記與值得回頭查找的觀點收藏。",
  "城市觀察": "城市移動、公共空間、標示、交通與生活現場的紀錄。",
  "生活方法": "把日常整理成可以持續實踐的方法與小系統。",
  "研究收藏": "暫時還沒分類，但值得保存與延伸的研究線索。",
  "音樂與跳舞": "整理音樂感受、節奏辨識、Swing 舞步與 AI Prompt 的實用練習筆記。",
};

function parseFrontmatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("Post is missing frontmatter.");

  const [, rawFrontmatter, body] = match;
  const data: Record<string, string | string[]> = {};
  const lines = rawFrontmatter.split("\n");

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const keyValue = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!keyValue) continue;

    const [, key, rawValue] = keyValue;
    if (rawValue === "") {
      const values: string[] = [];
      index += 1;
      while (index < lines.length && lines[index].startsWith("  - ")) {
        values.push(lines[index].replace(/^  -\s*/, "").replace(/^"|"$/g, ""));
        index += 1;
      }
      index -= 1;
      data[key] = values;
      continue;
    }

    data[key] = rawValue.replace(/^"|"$/g, "");
  }

  return { data, body };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
    )
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function markdownToHtml(markdown: string) {
  const lines = markdown.split("\n");
  const blocks: string[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let code: string[] = [];
  let inCode = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    blocks.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
    list = [];
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        blocks.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
        code = [];
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      code.push(line);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith(":::zh ")) {
      flushParagraph();
      flushList();
      blocks.push(
        `<details class="translation-toggle"><summary>中文</summary><p>${inlineMarkdown(line.slice(6))}</p></details>`,
      );
      continue;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push(`<h2>${inlineMarkdown(line.slice(3))}</h2>`);
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push(`<h3>${inlineMarkdown(line.slice(4))}</h3>`);
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.slice(2));
      continue;
    }

    if (line.startsWith("|")) {
      flushParagraph();
      flushList();
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();

  return blocks.join("\n");
}

function readPost(source: string): Post {
  const { data, body } = parseFrontmatter(source);
  const tags = Array.isArray(data.tags) ? data.tags : [];

  return {
    title: String(data.title),
    slug: String(data.slug),
    category: String(data.category),
    date: String(data.date),
    readingTime: String(data.readingTime),
    description: String(data.description),
    projectUrl: data.projectUrl ? String(data.projectUrl) : undefined,
    siteUrl: data.siteUrl ? String(data.siteUrl) : undefined,
    tags,
    body,
    html: markdownToHtml(body),
  };
}

export function getAllPosts(): Post[] {
  return Object.values(markdownModules)
    .map(readPost)
    .sort((first, second) => second.date.localeCompare(first.date));
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getCategories(): Category[] {
  const groups = new Map<string, PostMeta[]>();

  for (const post of getAllPosts()) {
    const posts = groups.get(post.category) ?? [];
    posts.push(post);
    groups.set(post.category, posts);
  }

  return [...groups.entries()].map(([name, posts]) => ({
    name,
    description: categoryDescriptions[name] ?? "持續整理中的文章分類。",
    posts,
  }));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(`${date}T00:00:00+08:00`));
}
