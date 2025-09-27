"use client";

// Minimal global error boundary to replace removed ErrorReporter
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen grid place-items-center p-6 text-center">
        <div className="max-w-md space-y-3">
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="text-muted-foreground text-sm break-words">
            {process.env.NODE_ENV === "development" ? error.message : "An unexpected error occurred."}
          </p>
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}