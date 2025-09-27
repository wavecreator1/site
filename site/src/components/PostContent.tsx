"use client";

import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

function isTweetUrl(href?: string) {
  if (!href) return false;
  try {
    const u = new URL(href);
    return (
      (u.hostname === "twitter.com" || u.hostname === "x.com" || u.hostname.endsWith(".twitter.com") || u.hostname.endsWith(".x.com")) &&
      /\/status\//.test(u.pathname)
    );
  } catch {
    return false;
  }
}

function TweetEmbed({ href }: { href: string }) {
  useEffect(() => {
    const id = "twitter-wjs";
    const existing = document.getElementById(id);
    if (!existing) {
      const s = document.createElement("script");
      s.id = id;
      s.async = true;
      s.src = "https://platform.twitter.com/widgets.js";
      document.body.appendChild(s);
      s.onload = () => {
        // @ts-ignore
        if (window.twttr?.widgets?.load) window.twttr.widgets.load();
      };
    } else {
      // @ts-ignore
      if (window.twttr?.widgets?.load) window.twttr.widgets.load();
    }
  }, [href]);

  return (
    <blockquote className="twitter-tweet">
      <a href={href}>{href}</a>
    </blockquote>
  );
}

export default function PostContent({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw as any, rehypeSlug as any]}
        components={{
          a(props) {
            const { href, children } = props;
            if (isTweetUrl(href)) {
              return <TweetEmbed href={href!} />;
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-[color:var(--link)] hover:text-[color:var(--link-hover)]">
                {children}
              </a>
            );
          },
          img(props) {
            const { src, alt } = props;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src ?? ""} alt={alt ?? ""} className="rounded-md border max-w-full mx-auto my-4" />
            );
          },
          blockquote(props) {
            return (
              <blockquote className="my-6 border-l-4 pl-4 italic bg-accent/60 dark:bg-accent/30 rounded-r">
                {props.children}
              </blockquote>
            );
          },
          h1(props) {
            return <h1 className="mt-8 mb-4 text-3xl font-semibold tracking-tight">{props.children}</h1>;
          },
          h2(props) {
            return <h2 className="mt-8 mb-3 text-2xl font-semibold tracking-tight">{props.children}</h2>;
          },
          h3(props) {
            return <h3 className="mt-6 mb-2 text-xl font-semibold tracking-tight">{props.children}</h3>;
          },
          ul(props) {
            return <ul className="my-4 list-disc pl-6 space-y-1">{props.children}</ul>;
          },
          ol(props) {
            return <ol className="my-4 list-decimal pl-6 space-y-1">{props.children}</ol>;
          },
          li(props) {
            return <li className="marker:text-muted-foreground">{props.children}</li>;
          },
          hr() {
            return <hr className="my-8 border-t" />;
          },
          pre(props) {
            return (
              <pre className="rounded-md border bg-muted p-4 overflow-x-auto text-sm">
                {props.children}
              </pre>
            );
          },
          code(props) {
            return <code className="px-1 py-0.5 rounded bg-muted" {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}