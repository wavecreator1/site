import Link from "next/link";
import { readAllPosts } from "@/lib/posts";
import { Bookmark, Linkedin, Twitter } from "lucide-react";
import { Fragment } from "react";

export default function Home() {
  // Group writings by category and order chronologically (newest first)
  const posts = readAllPosts();
  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const groups = sorted.reduce<Record<string, typeof sorted>>((acc, p) => {
    const key = p.category || "Growth";
    (acc[key] ||= []).push(p);
    return acc;
  }, {});
  const orderedCategories = ["Personal", "Growth", "Venture", ...Object.keys(groups).filter((c) => !["Personal", "Growth", "Venture"].includes(c))];
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
      {/* Header */}
      <section className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Siddhant Sehgal</h1>
          <div className="mt-1 space-y-1">
            <div className="text-base font-semibold leading-tight text-foreground">outliering</div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-mono text-xs text-foreground/90">/ˈoutˌlī(ə)r,ing/</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="inline-flex items-center rounded bg-secondary/80 ring-1 ring-border px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">neologism</span>
            </div>
            <p className="text-sm leading-snug text-foreground/90 italic">— being different than the norm</p>
          </div>
        </div>
        <div className="mt-4 md:mt-6 self-start flex flex-col items-start gap-1 sm:gap-1 sm:pl-4 sm:ml-6 sm:border-l sm:border-border/70">
          <span className="mt-0 text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">ELSEWHERE</span>
          <div className="flex gap-2 sm:gap-3 sm:bg-secondary sm:ring-1 sm:ring-border sm:rounded-md sm:px-3.5 sm:py-2.5 sm:shadow-md">
            <a
              href="https://siddsehgal.substack.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded hover:bg-accent hover:ring-1 hover:ring-border no-underline text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Substack"
            >
              <Bookmark className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/siddhant-sehgal1/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded hover:bg-accent hover:ring-1 hover:ring-border no-underline text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://x.com/sidd_sehgal"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded hover:bg-accent hover:ring-1 hover:ring-border no-underline text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      <hr className="mb-[22.4px] border-border" />

      {/* About Me */}
      <section className="mb-12 space-y-4 leading-relaxed">
        <h2 className="text-lg font-medium">About Me</h2>
        <p className="text-foreground/90">
          I'm an Economics and Computer Science double major at Colby and you can probably find me at a coffee shop with a
          Celsius. My time is split researching, reading, and writing. I enjoy thinking about {" "}
          <a href="https://www.notion.so/Important-Problems-214109a6143a805f8008d824541eb9d0" target="_blank" rel="noreferrer">
            important problems
          </a>{" "}
          and am focused on learning everything growth.
        </p>
        <p className="text-foreground/90">
          Currently, I'm a senior research fellow at {" "}
          <a href="https://www.contrary.com/" target="_blank" rel="noreferrer">
            Contrary Capital
          </a>
          , where I publish in-depth analyses on the most influential startups, focusing on deeptech, crypto, and software for the physical world. I also work at {" "}
          <a href="https://www.keyhorse.vc/" target="_blank" rel="noreferrer">
            Keyhorse Capital
          </a>
          , investing in B2B SaaS and evaluating portfolio companies for follow-on investments.
        </p>
        <p className="text-foreground/90">
          Previously, I started Krank Consulting, a startup that paid high school students to create social content for local
          small businesses (before UGC blew up). I grew Krank to over $12,000 in recurring revenue before going to Colby.
        </p>
        <p className="text-foreground/90">
          Check out my {" "}
          <a href="https://www.notion.so/Tech-Investing-21b109a6143a80b69636f00c68d4ccc6" target="_blank" rel="noreferrer">
            investment thesis
          </a>{" "}
          or follow me on {" "}
          <a href="https://siddsehgal.substack.com/" target="_blank" rel="noreferrer">
            Substack
          </a>
          , {" "}
          <a href="https://www.linkedin.com/in/siddhant-sehgal1/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          , and {" "}
          <a href="https://x.com/sidd_sehgal" target="_blank" rel="noreferrer">
            Twitter
          </a>
          .
        </p>
        <p className="text-foreground/90">
          I read and respond to all of my emails.<span className="align-super text-xs">*</span>
        </p>
        <p className="text-muted-foreground text-sm">
          *I am a strong {" "}
          <a href="https://adamgrant.net/book/give-and-take/" target="_blank" rel="noreferrer">
            believer
          </a>{" "}
          in helping others, so feel free to reach {" "}
          <a href="https://calendly.com/snsehg27-colby/30min" target="_blank" rel="noreferrer">
            out
          </a>{" "}
          🤙
        </p>
      </section>

      {/* Writings */}
      <section>
        <div className="mb-4 flex items-baseline gap-2">
          <h2 className="text-lg font-medium">Writings</h2>
        </div>
        {/* Category groups with a timeline feel */}
        <div className="pl-3 border-l border-border/70">
          {orderedCategories.map((cat, i) => {
            const items = groups[cat] || [];
            return (
              <details key={cat} className="group mb-4" open={["Personal", "Growth", "Venture"].includes(cat)}>
                <summary className="flex items-center gap-2 cursor-pointer list-none marker:content-none -mx-1 rounded px-1 hover:bg-accent/50 transition-colors select-none">
                  <span className="text-muted-foreground transition-transform duration-200 group-open:rotate-90">▸</span>
                  <span className={["Personal", "Growth", "Venture"].includes(cat) ? "font-bold text-[color:var(--link)]" : "font-medium"}>{cat}</span>
                </summary>
                <div className="mt-2 pl-4 border-l border-border/60">
                  {items.length === 0 ? (
                    <div className="text-muted-foreground">— Coming Soon</div>
                  ) : (
                    <ul className="space-y-2">
                      {items.map((post, idx) => {
                        const year = new Date(post.createdAt).getFullYear();
                        const prevYear = idx > 0 ? new Date(items[idx - 1].createdAt).getFullYear() : null;
                        return (
                          <Fragment key={post.slug}>
                            {idx === 0 || year !== prevYear ? (
                              <li className="sticky top-0 z-10 -ml-2 pl-2 pt-3">
                                <span className="inline-block rounded-full bg-secondary/70 px-2 py-0.5 text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground/90">
                                  {year}
                                </span>
                              </li>
                            ) : null}
                            <li>
                              <Link
                                href={`/writings/${post.slug}`}
                                className="group relative -mx-2 flex items-baseline gap-2 rounded px-2 py-1 transition-colors hover:bg-accent/50 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/80" />
                                {(post.slug === "lessons-from-george-bonaci" || post.slug === "important-problems") ? (
                                  <span className="font-bold text-muted-foreground transition-colors group-hover:text-muted-foreground">
                                    {post.slug === "lessons-from-george-bonaci" ? post.title.toLowerCase() : post.title}
                                  </span>
                                ) : (
                                  <span className="font-bold text-[color:var(--link)] transition-colors group-hover:text-[color:var(--link-hover)]">
                                    {post.title}
                                  </span>
                                )}
                                <span className="text-muted-foreground text-xs md:text-sm">
                                  • {new Date(post.createdAt).toLocaleDateString(undefined, { month: "long" })}
                                </span>
                              </Link>
                            </li>
                          </Fragment>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </details>
            );
          })}
        </div>
      </section>
    </main>
  );
}