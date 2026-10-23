import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
  args: ["--no-sandbox"],
});
const base = process.env.SMOKE_URL || "http://localhost:3000";
const failures = [];

try {
  for (const width of [320, 390, 768, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: 850 },
      reducedMotion: "reduce",
    });
    await page.goto(`${base}/invite/sample-dara`, { waitUntil: "networkidle" });
    if (
      !(
        await page.locator('meta[name="robots"]').getAttribute("content")
      )?.includes("noindex")
    )
      failures.push(`${width}: missing noindex`);
    if (
      !(
        await page.locator(".personalized-greeting .guest-name").textContent()
      )?.includes("សុខ ដារ៉ា")
    )
      failures.push(`${width}: guest name missing`);
    await page.getByRole("button", { name: /បើកធៀប/ }).click();
    await page.locator(".envelope-overlay").waitFor({ state: "hidden" });
    if ((await page.locator("#guest-name").inputValue()) !== "លោក សុខ ដារ៉ា")
      failures.push(`${width}: RSVP prefill missing`);
    const layout = await page.evaluate(() => {
      const size = (selector) => {
        const element = document.querySelector(selector);
        const rect = element.getBoundingClientRect();
        const css = getComputedStyle(element);
        return {
          width: rect.width,
          height: rect.height,
          position: css.position,
          display: css.display,
        };
      };
      return {
        corner: size(".royal-corner"),
        monogram: size(".letter-monogram"),
        closing: size(".closing-photo"),
        frame: size(".invitation-paper"),
        overflow: document.documentElement.scrollWidth - innerWidth,
      };
    });
    console.log(width, layout);
    if (
      layout.corner.width < 40 ||
      layout.corner.height < 40 ||
      layout.corner.width > 100 ||
      layout.corner.height > 100
    )
      failures.push(`${width}: oversized corner ornament`);
    if (layout.monogram.width > 120 || layout.monogram.height > 120)
      failures.push(`${width}: oversized monogram`);
    if (layout.closing.width > 400 || layout.closing.height > 700)
      failures.push(`${width}: oversized closing photo`);
    if (layout.overflow > 1) failures.push(`${width}: horizontal overflow`);
    for (const image of await page.locator(".gallery-tile img").all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((element) => element.decode());
    }
    const galleryLayout = await page
      .locator(".gallery-reveal")
      .evaluateAll((slides) =>
        slides.map((slide) => {
          const photo = slide.querySelector(".gallery-tile");
          const caption = slide.querySelector(".gallery-caption");
          return {
            photoTop: photo.getBoundingClientRect().top,
            photoBottom: photo.getBoundingClientRect().bottom,
            photoHeight: photo.getBoundingClientRect().height,
            captionTop: caption.getBoundingClientRect().top,
            imageFit: getComputedStyle(photo.querySelector("img")).objectFit,
          };
        }),
      );
    if (
      galleryLayout.some(
        (slide) =>
          slide.captionTop < slide.photoBottom - 1 ||
          slide.imageFit !== "contain",
      )
    )
      failures.push(
        `${width}: gallery captions overlapped or a photo was cropped`,
      );
    const columns = await page
      .locator(".gallery-grid")
      .evaluate(
        (grid) => getComputedStyle(grid).gridTemplateColumns.split(" ").length,
      );
    if (columns !== (width < 600 ? 1 : width < 1000 ? 2 : 3))
      failures.push(`${width}: incorrect gallery grid column count`);
    if (galleryLayout.length !== 7)
      failures.push(`${width}: expected all seven supplied gallery photos`);
    if (width === 390 || width === 1440) {
      await page
        .locator("#gallery")
        .screenshot({ path: `/tmp/dy-len-editorial-gallery-${width}.png` });
    }
    await page.locator(".gallery-grid").scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () => !document.querySelector(".floating-controls"),
    );
    if (width === 390) {
      await page.locator(".gallery-tile").first().click();
      await page
        .locator(".lightbox")
        .screenshot({ path: "/tmp/dy-len-gallery-lightbox-390.png" });
      await page.keyboard.press("ArrowRight");
      if (!(await page.locator(".lightbox-meta").textContent())?.includes("02"))
        failures.push("lightbox keyboard navigation did not update counter");
      await page.keyboard.press("Escape");
      await page.waitForFunction(() =>
        document.activeElement?.classList.contains("gallery-tile"),
      );
    }
    if (width === 390)
      await page
        .locator(".blessing-inner")
        .screenshot({ path: "/tmp/dy-len-closing-upgrade-390.png" });
    if (width === 320)
      await page
        .locator(".invitation-paper")
        .screenshot({ path: "/tmp/dy-len-invitation-upgrade-320.png" });
    await page.locator(".invitation-paper").scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () => !document.querySelector(".floating-controls"),
    );
    await page.locator(".blessing-inner").scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () => !document.querySelector(".floating-controls"),
    );
    await page.close();
  }
  const page = await browser.newPage();
  await page.goto(`${base}/invite/sample-family`, { waitUntil: "networkidle" });
  if (
    !(
      await page.locator(".personalized-greeting .guest-name").textContent()
    )?.includes("គ្រួសារសំណាង")
  )
    failures.push("family invitation name missing");
  await page.goto(`${base}/invite/not-a-guest`, { waitUntil: "networkidle" });
  if (await page.locator(".personalized-greeting").count())
    failures.push("unknown slug showed personalized greeting");
  if ((await page.locator("main").count()) !== 1)
    failures.push("unknown slug did not render generic invitation");
  await page.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Upgrade route and layout checks passed.");
}
