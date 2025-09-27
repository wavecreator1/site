import fs from "fs";
import path from "path";

export type Post = {
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  coverImageUrl?: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  tags?: string[];
  category?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const POSTS_PATH = path.join(DATA_DIR, "posts.json");

function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(POSTS_PATH)) fs.writeFileSync(POSTS_PATH, "[]", "utf-8");
}

export function readAllPosts(): Post[] {
  ensureDataFiles();
  const raw = fs.readFileSync(POSTS_PATH, "utf-8");
  try {
    const parsed = JSON.parse(raw) as Post[];
    return parsed.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  } catch (e) {
    return [];
  }
}

export function writeAllPosts(posts: Post[]) {
  ensureDataFiles();
  fs.writeFileSync(POSTS_PATH, JSON.stringify(posts, null, 2), "utf-8");
}

export function getPostBySlug(slug: string): Post | null {
  const posts = readAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export function upsertPost(input: Omit<Post, "createdAt" | "updatedAt"> & Partial<Pick<Post, "createdAt" | "updatedAt">>): Post {
  const posts = readAllPosts();
  const now = new Date().toISOString();
  const idx = posts.findIndex((p) => p.slug === input.slug);
  if (idx >= 0) {
    const updated: Post = {
      ...posts[idx],
      ...input,
      updatedAt: now,
      createdAt: posts[idx].createdAt,
    };
    posts[idx] = updated;
    writeAllPosts(posts);
    return updated;
  }
  const created: Post = {
    slug: input.slug,
    title: input.title,
    content: input.content,
    excerpt: input.excerpt ?? deriveExcerpt(input.content),
    coverImageUrl: input.coverImageUrl,
    tags: input.tags ?? [],
    category: input.category,
    createdAt: input.createdAt ?? now,
    updatedAt: now,
  };
  posts.push(created);
  writeAllPosts(posts);
  return created;
}

export function deletePost(slug: string): boolean {
  const posts = readAllPosts();
  const next = posts.filter((p) => p.slug !== slug);
  if (next.length === posts.length) return false;
  writeAllPosts(next);
  return true;
}

export function deriveExcerpt(md: string, length = 180): string {
  const text = md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/[#>*_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.slice(0, length) + (text.length > length ? "…" : "");
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}