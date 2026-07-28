import Link from "next/link";
import { formatDate, getCategories } from "../../lib/content";

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <main>
      <div className="grain" />
      <header className="masthead">
        <Link className="brand" href="/">
          <strong>PERSONAL EDITORIAL</strong>
          <span>Category index</span>
        </Link>
        <nav aria-label="分類頁導覽">
          <Link href="/">首頁</Link>
          <Link href="/categories#Skill 收藏">Skill 收藏</Link>
          <Link href="/categories#外語導遊口說">導遊口說</Link>
          <Link href="/categories#作品介紹">作品介紹</Link>
        </nav>
      </header>

      <section className="archive-hero">
        <div>
          <p className="label">Contents archive</p>
          <h1>分類索引</h1>
          <p>這裡是整個筆記雜誌的目錄。每個分類都可以繼續新增文章，慢慢長成自己的資料庫。</p>
        </div>
        <div className="category-jump-grid" aria-label="分類快速入口">
          {categories.map((category) => (
            <Link href={`/categories#${category.name}`} key={category.name}>
              <span>{category.name}</span>
              <small>{category.posts.length} 篇文章</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="category-list">
        {categories.map((category, index) => (
          <article className="category-row" id={category.name} key={category.name}>
            <span className="category-number">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
            </div>
            <div className="category-posts">
              {category.posts.map((post) => (
                <Link href={`/posts/${post.slug}`} key={post.slug}>
                  <span>{post.title}</span>
                  <small>{formatDate(post.date)} / {post.readingTime}</small>
                  <strong>閱讀</strong>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
