import Image from "next/image";
import Link from "next/link";
import { formatDate, getAllPosts, getCategories } from "../lib/content";

const featuredSlugs = ["moveaware-introduction", "trip-sync-introduction", "superdesign-taste-skill"];

export default function Home() {
  const posts = getAllPosts();
  const categories = getCategories();
  const featured = posts.find((post) => post.slug === "moveaware-introduction") ?? posts[0];
  const recent = posts.filter((post) => post.slug !== featured?.slug);
  const heroCategories = categories.slice(0, 4);
  const featuredPosts = featuredSlugs
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter(Boolean);

  return (
    <main>
      <div className="grain" />
      <header className="masthead">
        <Link className="brand" href="/">
          <strong>PERSONAL EDITORIAL</strong>
          <span>Collected works and curated notes</span>
        </Link>
        <nav aria-label="主要分類">
          <Link href="/categories">分類</Link>
          <Link href="/categories#Skill 收藏">Skill 收藏</Link>
          <Link href="/categories#外語導遊口說">導遊口說</Link>
          <Link href="/categories#作品介紹">作品介紹</Link>
          <Link href="/categories#音樂與跳舞">音樂與跳舞</Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="label">Personal knowledge magazine</p>
          <h1>資訊策展的日常實踐</h1>
          <p>
            收集作品介紹、網頁設計 Skill、外語導遊口說與閱讀整理，把零散靈感整理成可以回頭查找的個人雜誌。
          </p>
          <div className="hero-actions" aria-label="首頁快速操作">
            <Link className="primary-link" href={featured ? `/posts/${featured.slug}` : "/categories"}>
              閱讀主打文章
            </Link>
            <Link className="text-link" href="/categories">
              瀏覽全部分類
            </Link>
          </div>
          <div className="hero-index" aria-label="主要內容分類">
            {heroCategories.map((category) => (
              <Link href={`/categories#${category.name}`} key={category.name}>
                <span>{category.name}</span>
                <small>{category.posts.length} 篇</small>
              </Link>
            ))}
          </div>
        </div>

        {featured ? (
          <article className="featured-card">
            <Image
              src="/editorial-featured-still-life.png"
              alt="紙張、鋼筆與磚紅標記構成的編輯靜物照"
              width={1200}
              height={900}
              priority
            />
            <div>
              <p className="label">Featured</p>
              <div className="meta-row">
                <span>{featured.category}</span>
                <span>{featured.readingTime}</span>
              </div>
              <h2>
                <Link href={`/posts/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <Link className="text-link" href={`/posts/${featured.slug}`}>
                開始閱讀
              </Link>
            </div>
          </article>
        ) : null}
      </section>

      <section className="category-band" aria-labelledby="category-heading">
        <div className="section-heading">
          <p className="label">Contents</p>
          <h2 id="category-heading">探索主題類別</h2>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link className="category-item" href={`/categories#${category.name}`} key={category.name}>
              <span>{String(index + 1).padStart(2, "0")}.</span>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <small>{category.posts.length} 篇文章</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="post-section" aria-labelledby="recent-heading">
        <aside className="section-heading sticky-heading">
          <p className="label">Recent posts</p>
          <h2 id="recent-heading">近期文章</h2>
          <p>從專案作品到工具收藏，這裡放的是最近整理好的筆記。</p>
        </aside>
        <div className="post-grid">
          {recent.map((post) => (
            <article className="post-card" key={post.slug}>
              <div className="post-thumb" />
              <div className="meta-row">
                <span>{post.category}</span>
                <span>{formatDate(post.date)}</span>
              </div>
              <h3>
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>{post.description}</p>
              <Link className="text-link" href={`/posts/${post.slug}`}>
                繼續閱讀
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="series-section" aria-labelledby="series-heading">
        <p className="label">Featured writing</p>
        <h2 id="series-heading">目前收錄</h2>
        <div className="series-grid">
          {featuredPosts.map((post, index) =>
            post ? (
              <article className={index === 0 ? "series-card dark" : "series-card"} key={post.slug}>
                <span>{post.category}</span>
                <h3>
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.description}</p>
              </article>
            ) : null,
          )}
        </div>
      </section>
    </main>
  );
}
