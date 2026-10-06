import type { BlogPost } from "@/data/blogs";
import { blogPostsEl } from "@/data/blogs.el";

export type LocalizedBlogPost = BlogPost & {
  categoryLabel: string;
};

export function localizeBlogPost(
  post: BlogPost,
  locale: string,
  categoryLabel: string,
): LocalizedBlogPost {
  const greek = locale === "el" ? blogPostsEl[post.slug] : undefined;
  const readTime =
    locale === "el" ? post.readTime.replace("min read", "λεπτά ανάγνωσης") : post.readTime;

  return {
    ...post,
    title: greek?.title ?? post.title,
    excerpt: greek?.excerpt ?? post.excerpt,
    content: greek?.content ?? post.content,
    readTime,
    categoryLabel,
  };
}
