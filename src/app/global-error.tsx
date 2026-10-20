"use client";

import * as React from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "3rem", maxWidth: "40rem" }}>
        <h1>Something went wrong</h1>
        <p>The error has been reported. Try again, and if it keeps happening, reload the page.</p>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}
