// Public origin of the deployed site. Set SITE_URL in the hosting environment
// (for example https://yourdomain.com). The localhost fallback keeps development
// and local builds working, but production metadata, the sitemap and canonical
// URLs need the real value.
export const siteUrl = (process.env.SITE_URL ?? "http://localhost:3000").replace(
  /\/+$/,
  "",
);

export const isSiteUrlConfigured = Boolean(process.env.SITE_URL);
