import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getAllPosts, getPostBySlug } from "../../../lib/content";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title}｜Personal Editorial`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, 3);

  return (
    <main>
      <div className="grain" />
      <header className="masthead">
        <Link className="brand" href="/">
          <strong>PERSONAL EDITORIAL</strong>
          <span>Collected works and curated notes</span>
        </Link>
        <nav aria-label="文章頁導覽">
          <Link href="/categories">分類</Link>
          <Link href="/categories#Skill 收藏">Skill 收藏</Link>
          <Link href="/categories#外語導遊口說">導遊口說</Link>
          <Link href="/categories#作品介紹">作品介紹</Link>
          <Link href="/categories#音樂與跳舞">音樂與跳舞</Link>
        </nav>
      </header>

      <article className="article-page">
        <header className="article-header">
          <p className="label">{post.category}</p>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div className="article-meta">
            <span>{formatDate(post.date)}</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <div className="article-layout">
          <aside>
            <p className="label">Notes</p>
            <p>這篇文章收錄於「{post.category}」，之後可以持續延伸成同系列筆記。</p>
            {post.siteUrl || post.projectUrl ? (
              <div className="resource-links">
                {post.siteUrl ? (
                  <a href={post.siteUrl} target="_blank" rel="noreferrer">
                    開啟網站
                  </a>
                ) : null}
                {post.projectUrl ? (
                  <a href={post.projectUrl} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                ) : null}
              </div>
            ) : null}
            {post.tags.length ? (
              <div className="tag-list">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            ) : null}
          </aside>

          <div className="article-body" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </article>

      {related.length ? (
        <section className="related-section">
          <p className="label">Related</p>
          <h2>相關文章</h2>
          <div className="series-grid">
            {related.map((item) => (
              <article className="series-card" key={item.slug}>
                <span>{item.category}</span>
                <h3>
                  <Link href={`/posts/${item.slug}`}>{item.title}</Link>
                </h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
