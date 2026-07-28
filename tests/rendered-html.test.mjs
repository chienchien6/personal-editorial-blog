import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the editorial blog homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Personal Editorial/i);
  assert.match(html, /資訊策展的日常實踐/);
  assert.match(html, /Skill 收藏/);
  assert.match(html, /外語導遊口說/);
  assert.match(html, /音樂與跳舞/);
  assert.match(html, /MoveAware/);
  assert.match(html, /TRIP SYNC/);
  assert.doesNotMatch(html, /react-loading-skeleton/);
});

test("server-renders category series groupings", async () => {
  const response = await render("/categories");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /景點導覽與主題口說/);
  assert.match(html, /文化習俗與節慶口說/);
  assert.match(html, /口試模板與即時應答/);
  assert.match(html, /Swing 舞步與節奏辨識/);
});
