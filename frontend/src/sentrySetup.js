import * as Sentry from "@sentry/react";
import {BrowserTracing} from "@sentry/tracing";

Sentry.init({
    dsn: "https://df94093b059449e0965c679bf8234ded@o4504735869304832.ingest.sentry.io/4504735870615552",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});
