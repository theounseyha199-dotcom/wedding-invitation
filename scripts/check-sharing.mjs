import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { request } from "playwright";

const baseURL = process.env.SHARE_CHECK_URL || "http://localhost:3000";
const agents = [
  "Googlebot",
  "TelegramBot",
  "TelegramBot (like TwitterBot)",
  "facebookexternalhit/1.1",
  "WhatsApp/2.24.0",
  "Mozilla/5.0",
];
const client = await request.newContext({ baseURL });
const productionOrigin = "https://wedding-invitation-three-jade.vercel.app";
const expectedImageURL = `${productionOrigin}/socail-share.png`;
const expected = await readFile(
  new URL("../public/socail-share.png", import.meta.url),
);
assert(
  expected
    .subarray(0, 8)
    .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
  "The supplied thumbnail must be a PNG",
);
const imageWidth = expected.readUInt32BE(16);
const imageHeight = expected.readUInt32BE(20);
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
    const name =
      attrs.rel === "canonical" ? "canonical" : attrs.property || attrs.name;
    if (
      [
        "canonical",
        "description",
        "robots",
        "googlebot",
        "og:title",
        "og:url",
        "og:image",
        "twitter:card",
        "twitter:image",
      ].includes(name)
    )
      assert(!tags.has(name), `Conflicting duplicate ${name} tags`);
    tags.set(name, attrs.rel === "canonical" ? attrs.href : attrs.content);
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
      const html = await response.text();
      const tags = headMetadata(html);
      const jsonLd = [
        ...html.matchAll(
          /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
        ),
      ].map((match) => JSON.parse(match[1]));
      assert.match(html, /<html\b[^>]*lang="km"/);
      assert.equal((html.match(/<h1\b/g) || []).length, 1);
      for (const field of [
        "og:title",
        "og:description",
        "og:site_name",
        "twitter:title",
        "twitter:description",
      ])
        assert(tags.get(field), `${path}: missing ${field} in initial head`);
      assert.equal(tags.get("og:type"), "website");
      assert.equal(tags.get("og:locale"), "km_KH");
      assert.equal(tags.get("description"), tags.get("og:description"));
      assert.equal(tags.get("twitter:title"), tags.get("og:title"));
      assert.equal(tags.get("twitter:description"), tags.get("og:description"));
      assert.equal(tags.get("twitter:card"), "summary_large_image");
      assert.equal(new URL(tags.get("og:url")).pathname, path);
      assert.equal(new URL(tags.get("og:url")).origin, productionOrigin);
      assert.equal(tags.get("canonical"), tags.get("og:url"));
      assert.match(tags.get("og:title"), /[\u1780-\u17ff]/);
      assert.match(tags.get("og:description"), /[\u1780-\u17ff]/);
      assert.equal(tags.get("og:image:type"), "image/png");
      assert.equal(tags.get("og:image:width"), String(imageWidth));
      assert.equal(tags.get("og:image:height"), String(imageHeight));
      assert(tags.get("og:image:alt"));
      imageURL = tags.get("og:image");
      assert.equal(imageURL, expectedImageURL);
      assert.equal(tags.get("twitter:image"), imageURL);
      assert.equal(new URL(imageURL).pathname, "/socail-share.png");
      if (path === "/") {
        assert.match(tags.get("robots"), /\bindex\b/);
        assert.doesNotMatch(tags.get("robots"), /\bnoindex\b/);
        assert.match(tags.get("googlebot"), /\bindex\b/);
        assert.doesNotMatch(
          response.headers()["x-robots-tag"] || "",
          /\bnoindex\b/,
        );
        assert.equal(jsonLd.length, 1);
        const data = jsonLd[0];
        assert.equal(data["@context"], "https://schema.org");
        const website = data["@graph"].find(
          (item) => item["@type"] === "WebSite",
        );
        const webpage = data["@graph"].find(
          (item) => item["@type"] === "WebPage",
        );
        const image = data["@graph"].find(
          (item) => item["@type"] === "ImageObject",
        );
        assert.equal(website.url, productionOrigin);
        assert.equal(webpage.url, productionOrigin);
        assert.equal(website.inLanguage, "km-KH");
        assert.equal(webpage.isPartOf["@id"], website["@id"]);
        assert.equal(webpage.primaryImageOfPage["@id"], image["@id"]);
        assert.equal(image.contentUrl, expectedImageURL);
        assert.equal(image.width, imageWidth);
        assert.equal(image.height, imageHeight);
        assert(!JSON.stringify(data).includes("/invite/"));
      } else {
        assert.match(tags.get("robots"), /\bnoindex\b/);
        assert.match(tags.get("googlebot"), /\bnoindex\b/);
        assert.equal(
          jsonLd.length,
          0,
          "Guest pages must not inherit homepage structured data",
        );
      }
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
      console.log(
        `${path} (${userAgent}): SEO policy and sharing metadata passed`,
      );
    }
  }
  const robotsResponse = await client.get("/robots.txt");
  assert.equal(robotsResponse.status(), 200);
  const robotsText = await robotsResponse.text();
  assert.match(robotsText, /^User-Agent:\s*\*\s*$/im);
  assert.match(robotsText, /^Allow:\s*\/\s*$/im);
  assert.doesNotMatch(robotsText, /^Disallow:\s*\/\s*$/im);
  assert(robotsText.includes(`Sitemap: ${productionOrigin}/sitemap.xml`));
  const sitemapResponse = await client.get("/sitemap.xml");
  assert.equal(sitemapResponse.status(), 200);
  const sitemap = await sitemapResponse.text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );
  assert.deepEqual(urls, [productionOrigin]);
  assert(sitemap.includes(expectedImageURL));
  assert(!sitemap.includes("/invite/"));
  console.log(
    "robots.txt allows crawling; sitemap contains only the public homepage.",
  );
  const response = await client.get(imageURL, {
    headers: { "User-Agent": agents[1] },
  });
  assert.equal(response.status(), 200);
  assert.match(response.headers()["content-type"], /^image\/png/);
  const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
  assert.equal(digest(await response.body()), digest(expected));
  console.log(
    `Public thumbnail matches socail-share.png exactly (${imageWidth} × ${imageHeight}).`,
  );
} finally {
  await client.dispose();
}
