<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the DevEvent Next.js App Router project. Here is a summary of every change made:

- **`instrumentation-client.ts`** (new): Initializes `posthog-js` on the client side using Next.js 15.3+ `instrumentation-client` convention. Configured with a reverse proxy (`/ingest`), `capture_exceptions: true` for automatic error tracking, and debug mode in development.
- **`lib/posthog-server.ts`** (new): Singleton server-side PostHog client using `posthog-node`, configured with `flushAt: 1` and `flushInterval: 0` for immediate event flushing (required in short-lived Next.js server functions).
- **`next.config.ts`** (edited): Added reverse proxy rewrites routing `/ingest/*` to PostHog US servers (`us.i.posthog.com` and `us-assets.i.posthog.com`), and `skipTrailingSlashRedirect: true`.
- **`.env.local`** (new): Added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.
- **`components/ExploreBtn.tsx`** (edited): Added `posthog.capture("explore_events_clicked")` in the existing `onClick` handler.
- **`components/Navbar.tsx`** (edited): Converted to a client component and added `posthog.capture("nav_link_clicked", { label, href })` on each nav link click.
- **`app/api/books/route.ts`** (edited): Added server-side `posthog.capture("book_added", { title, author, year })` in the `POST` handler using the `posthog-node` client.
- **`app/error.tsx`** (edited): Added `posthog.captureException(error)` inside the existing `useEffect` to forward unhandled errors to PostHog Error Tracking.

## Events tracked

| Event | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicked the "Explore Events" button on the home page | `components/ExploreBtn.tsx` |
| `nav_link_clicked` | User clicked a navigation link (with `label` and `href` properties) | `components/Navbar.tsx` |
| `book_added` | A new book was added via the POST /api/books endpoint | `app/api/books/route.ts` |
| `$exception` | Unhandled error captured automatically via `capture_exceptions: true` and `posthog.captureException()` | `instrumentation-client.ts`, `app/error.tsx` |

## Next steps

We've built a dashboard and five insights to monitor user behavior from day one:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/401396/dashboard/1520561
- **Explore Events Clicks Over Time**: https://us.posthog.com/project/401396/insights/ZHRYEv00
- **Nav Link Clicks by Destination**: https://us.posthog.com/project/401396/insights/Ug3J6CMC
- **Books Added Over Time**: https://us.posthog.com/project/401396/insights/NjB0WSz8
- **Home → Explore Events Funnel**: https://us.posthog.com/project/401396/insights/EMAw6ip9
- **Errors Captured**: https://us.posthog.com/project/401396/insights/VZPFCrYq

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
