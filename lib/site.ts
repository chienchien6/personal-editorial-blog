export function getBasePath() {
  return process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === "production" ? "/personal-editorial-blog" : "");
}

export function withBasePath(path: string) {
  if (!path) return path;
  if (/^(https?:|mailto:|tel:|data:)/.test(path)) return path;

  const basePath = getBasePath();
  if (!basePath) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const withoutBase = normalizedPath.startsWith(basePath)
    ? normalizedPath
    : normalizedPath;

  return `${basePath}${withoutBase.replace(/^\//, "")}`;
}

export function routeHref(path: string) {
  const [pathname, hash = ""] = path.split("#");
  const normalizedPath = pathname === "/" ? "/" : `${pathname.replace(/\/+$/, "")}/`;

  return hash ? `${normalizedPath}#${hash}` : normalizedPath;
}
