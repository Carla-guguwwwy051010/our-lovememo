// Prefix a root-relative asset path with Vite's configured base URL so that
// paths work both in dev ("/") and on GitHub Pages ("/our-lovememo/").
export function asset(path) {
  if (!path) return path;
  // Leave absolute URLs (http, data, blob) untouched.
  if (/^(https?:)?\/\//.test(path) || /^(data|blob):/.test(path)) return path;
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
