import Link from "next/link";
import { readAllPosts } from "@/lib/posts";

export default function WritingsIndexPage() {
  const posts = readAllPosts();
  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Writings</h1>
      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug} className="border rounded-lg p-4 hover:bg-accent/50">
              <Link href={`/writings/${post.slug}`} className="block">
                <h2 className="text-xl font-medium">{post.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                {post.excerpt && (
                  <p className="mt-3 text-foreground/80">{post.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}