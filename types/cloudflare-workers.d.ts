declare module "cloudflare:workers" {
  const env: Record<string, any>;
  export { env };
}

declare interface Fetcher {
  fetch(request: Request | string, init?: RequestInit): Promise<Response>;
}

declare interface D1Database {
  prepare(query: string): unknown;
}
