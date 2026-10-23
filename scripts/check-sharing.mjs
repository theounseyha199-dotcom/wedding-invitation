import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { request } from "playwright";

const baseURL = process.env.SHARE_CHECK_URL || "http://localhost:3000";
const agents = [
  "TelegramBot",
  "TelegramBot (like TwitterBot)",
  "facebookexternalhit/1.1",
  "Mozilla/5.0",
];
const client = await request.newContext({ baseURL });
let imageURL;

function headMetadata(html) {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  assert(head, "Missing initial HTML head");
  const tags = new Map();
  for (const tag of head.match(/<(?:meta|link)\b[^>]*>/gi) || []) {
    const attrs = Object.fromEntries(
      [...tag.matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)].map((match) => [
        match[1],
        match[2],
      ]),
    );
    if (attrs.rel === "canonical") tags.set("canonical", attrs.href);
    else tags.set(attrs.property || attrs.name, attrs.content);
  }
  return tags;
}

try {
  for (const path of ["/", "/invite/sample-family"]) {
    for (const userAgent of agents) {
      const response = await client.get(path, {
        headers: { "User-Agent": userAgent },
      });
      assert.equal(response.status(), 200, `${path}: HTTP status`);
      const tags = headMetadata(await response.text());
      for (const field of [
        "og:title",
        "og:description",
        "og:site_name",
        "twitter:title",
        "twitter:description",
      ])
        assert(tags.get(field), `${path}: missing ${field} in initial head`);
      assert.equal(tags.get("og:type"), "website");
      assert.equal(tags.get("twitter:card"), "summary_large_image");
      assert.equal(new URL(tags.get("og:url")).pathname, path);
      assert.equal(tags.get("canonical"), tags.get("og:url"));
      assert.equal(tags.get("og:image:type"), "image/png");
      assert.equal(tags.get("og:image:width"), "2048");
      assert.equal(tags.get("og:image:height"), "1152");
      imageURL = tags.get("og:image");
      assert.equal(tags.get("twitter:image"), imageURL);
      assert.equal(new URL(imageURL).pathname, "/socail-share.png");
      if (new URL(baseURL).protocol === "https:") {
        for (const url of [imageURL, tags.get("og:url")]) {
          assert.equal(new URL(url).protocol, "https:");
          assert(
            !["localhost", "127.0.0.1", "[::1]"].includes(
              new URL(url).hostname,
            ),
          );
        }
      }
      console.log(`${path} (${userAgent}): complete sharing card in HTML head`);
    }
  }
  const response = await client.get(imageURL, {
    headers: { "User-Agent": agents[1] },
  });
  assert.equal(response.status(), 200);
  assert.match(response.headers()["content-type"], /^image\/png/);
  const expected = await readFile(
    new URL("../public/socail-share.png", import.meta.url),
  );
  const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
  assert.equal(digest(await response.body()), digest(expected));
  console.log("Public thumbnail matches socail-share.png exactly.");
} finally {
  await client.dispose();
}
