import Image from "next/image";
import { getPostBySlug } from "@/lib/posts";
import PostContent from "@/components/PostContent";
import { notFound } from "next/navigation";

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <article>
        <h1 className="text-3xl font-semibold tracking-tight mb-3">{post.title}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {new Date(post.createdAt).toLocaleString()}
        </p>
        {post.slug === "important-problems" && (
          <div className="mb-6 rounded-lg border bg-secondary/60 px-4 py-3 text-sm text-muted-foreground">
            Coming soon — this essay is in progress. I'm still writing and refining it.
          </div>
        )}
        {post.coverImageUrl && (
          <div className="relative w-full h-64 mb-6">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              unoptimized
              className="object-cover rounded-lg border"
            />
          </div>
        )}
        {post.slug === "important-problems" ? (
          <div className="prose prose-neutral dark:prose-invert text-muted-foreground">
            <p>
              Thanks for checking this out. I'm drafting thoughts and will publish the full piece soon.
            </p>
            <ul>
              <li>Context: why "important problems" matter</li>
              <li>Frameworks I'm exploring</li>
              <li>Examples and case studies</li>
            </ul>
          </div>
        ) : (
          <PostContent content={post.content} />
        )}
      </article>
    </main>
  );
}