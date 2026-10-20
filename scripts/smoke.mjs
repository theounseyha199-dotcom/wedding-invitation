import { chromium } from "playwright";

const baseURL = process.env.SMOKE_URL || "http://localhost:3000";
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
const browser = await chromium.launch({
  headless: true,
  executablePath,
  args: ["--no-sandbox"],
});
const widths = [320, 375, 390, 430, 768, 1024, 1440];
const failures = [];

try {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: 850 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(baseURL, { waitUntil: "networkidle" });
    if (width === 390)
      await page.screenshot({ path: "/tmp/dy-len-envelope-390.png" });
    await page.getByRole("button", { name: /បើកធៀប/ }).click();
    await page.locator(".envelope-overlay").waitFor({ state: "hidden" });
    if (
      (await page
        .locator(".butterfly-stage-hero")
        .evaluate((element) => getComputedStyle(element).display)) !== "none"
    )
      failures.push(`${width}px butterflies were visible with reduced motion`);
    if (await page.locator(".floating-controls").count())
      failures.push(`${width}px controls were active over hero`);
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
    }));
    if (dimensions.document > dimensions.viewport + 1)
      failures.push(`${width}px horizontal overflow: ${dimensions.document}px`);
    if (errors.length)
      failures.push(`${width}px browser errors: ${errors.join("; ")}`);
    if (width === 320) {
      for (const section of await page.locator("main section").all())
        await section.scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: "/tmp/dy-len-320-playwright.png",
        fullPage: true,
      });
      for (const section of ["invitation", "schedule", "rsvp"]) {
        await page.locator(`#${section}`).screenshot({
          path: `/tmp/dy-len-${section}-320.png`,
        });
      }
    }
    if (width === 390) {
      if ((await page.locator("audio").count()) !== 1)
        failures.push("Expected exactly one wedding audio element");
      await page.waitForFunction(
        () => {
          const audio = document.querySelector("audio");
          return audio && !audio.paused;
        },
        null,
        { timeout: 5000 },
      );
      const music = await page.locator("audio").evaluate((element) => ({
        loop: element.loop,
        volume: element.volume,
        source: element.getAttribute("src"),
      }));
      if (!music.loop || music.source !== "/audio/wedding-music.mp3")
        failures.push("Music source or looping was incorrect");
      if (Math.abs(music.volume - 0.35) > 0.01)
        failures.push(`Music volume was ${music.volume}, expected 0.35`);
      const heroImage = await page.locator(".hero-art img").getAttribute("src");
      if (!heroImage?.includes("scene1.png"))
        failures.push("Selected photo missing from hero");
      await page.locator("#story img").scrollIntoViewIfNeeded();
      await page.waitForFunction(
        () => {
          const image = document.querySelector("#story img");
          return image && image.complete && image.naturalWidth > 0;
        },
        null,
        { timeout: 10000 },
      );
      if ((await page.locator("#gallery img").count()) !== 4)
        failures.push("Expected four sample gallery photos");
      const galleryLayout = await page
        .locator(".gallery-grid")
        .evaluate((gallery) => ({
          display: getComputedStyle(gallery).display,
          overflow: getComputedStyle(gallery).overflowX,
          scrollWidth: gallery.scrollWidth,
          clientWidth: gallery.clientWidth,
          imageFits: [...gallery.querySelectorAll("img")].every(
            (image) => getComputedStyle(image).objectFit === "contain",
          ),
        }));
      if (
        galleryLayout.display !== "flex" ||
        galleryLayout.overflow !== "auto" ||
        galleryLayout.scrollWidth <= galleryLayout.clientWidth ||
        !galleryLayout.imageFits
      )
        failures.push(
          "Gallery was not a horizontal strip with uncropped photos",
        );
      for (const [index, image] of (
        await page.locator("#gallery img").all()
      ).entries()) {
        await image.scrollIntoViewIfNeeded();
        await page.waitForFunction(
          (photoIndex) => {
            const element =
              document.querySelectorAll("#gallery img")[photoIndex];
            return element && element.complete && element.naturalWidth > 0;
          },
          index,
          { timeout: 10000 },
        );
      }
      await page.locator(".gallery-tile").first().click();
      if (
        !(await page.getByRole("dialog", { name: "កម្រងរូបភាព" }).isVisible())
      )
        failures.push("Gallery did not open");
      await page.keyboard.press("Escape");
      if (await page.getByRole("dialog", { name: "កម្រងរូបភាព" }).count())
        failures.push("Gallery did not close with Escape");
      await page.getByRole("button", { name: "បញ្ជាក់ទម្រង់គំរូ" }).click();
      if (!(await page.getByText(/យ៉ាងតិច ២/).isVisible()))
        failures.push("RSVP name validation missing");
      await page.getByLabel("ឈ្មោះភ្ញៀវ *").fill("ភ្ញៀវ គំរូ");
      await page.getByLabel("ចំនួនភ្ញៀវ *").fill("2");
      const controlsWhileTyping = await page
        .locator(".floating-controls")
        .count();
      if (controlsWhileTyping)
        failures.push("Controls covered the focused RSVP form");
      await page.getByRole("button", { name: "បញ្ជាក់ទម្រង់គំរូ" }).click();
      if (!(await page.getByText("បានបំពេញទម្រង់គំរូ").isVisible()))
        failures.push("RSVP demo confirmation missing");
      await page.locator("#schedule .ceremony-list").scrollIntoViewIfNeeded();
      await page.waitForFunction(
        () => Boolean(document.querySelector(".floating-controls")),
        null,
        { timeout: 3000 },
      );
      await page.getByRole("button", { name: "បិទតន្ត្រី" }).click();
      if (!(await page.locator("audio").evaluate((element) => element.paused)))
        failures.push("Music did not pause from the existing control");
      await page.getByRole("button", { name: "បើកតន្ត្រី" }).click();
      await page.waitForFunction(
        () => {
          const audio = document.querySelector("audio");
          return audio && !audio.paused;
        },
        null,
        { timeout: 5000 },
      );
      for (const section of await page.locator("main section").all())
        await section.scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: "/tmp/dy-len-390-playwright.png",
        fullPage: true,
      });
      await page.reload({ waitUntil: "networkidle" });
      if (!(await page.locator(".envelope-overlay").isVisible()))
        failures.push("Envelope opened without a guest click after reload");
      if (!(await page.locator("audio").evaluate((element) => element.paused)))
        failures.push("Music played before the guest opened the invitation");
    }
    if (width === 1440) {
      for (const section of await page.locator("main section").all())
        await section.scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: "/tmp/dy-len-1440-playwright.png",
        fullPage: true,
      });
    }
    console.log(
      `${width}px: viewport ${dimensions.viewport}px, document ${dimensions.document}px, browser errors ${errors.length}`,
    );
    await context.close();
  }

  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 850 },
    });
    const page = await context.newPage();
    if (width === 390)
      await page.addInitScript(() => {
        const createGain = AudioContext.prototype.createGain;
        AudioContext.prototype.createGain = function () {
          const node = createGain.call(this);
          window.__weddingGain = node.gain;
          return node;
        };
      });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(baseURL, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /បើកធៀប/ }).click();
    const initialMusicLevel =
      width === 390
        ? await page.evaluate(() => {
            const element = document.querySelector("audio");
            return element && window.__weddingGain
              ? element.volume * window.__weddingGain.value
              : null;
          })
        : null;
    await page.locator(".envelope-overlay").waitFor({ state: "hidden" });
    if (width === 390) {
      await page.waitForTimeout(1900);
      const settledMusicLevel = await page.evaluate(() => {
        const element = document.querySelector("audio");
        return element && window.__weddingGain
          ? element.volume * window.__weddingGain.value
          : null;
      });
      if (
        initialMusicLevel === null ||
        initialMusicLevel >= 0.15 ||
        settledMusicLevel === null ||
        Math.abs(settledMusicLevel - 0.35) > 0.03
      )
        failures.push("Music did not fade smoothly to 35% volume");
    }
    await page.waitForFunction(
      () =>
        document
          .querySelector(".butterfly-stage-hero")
          ?.getAttribute("data-active") === "true",
    );
    const flight = await page
      .locator(".butterfly-stage-hero .butterfly-flight-1")
      .evaluate((element) => ({
        display: getComputedStyle(element).display,
        state: getComputedStyle(element).animationPlayState,
      }));
    if (flight.display === "none" || flight.state !== "running")
      failures.push(`${width}px hero butterfly flight did not run`);
    await page.screenshot({ path: `/tmp/dy-len-motion-${width}.png` });
    await page.locator("#story").scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () =>
        document
          .querySelector(".butterfly-stage-story")
          ?.getAttribute("data-active") === "true",
    );
    if (width === 390) {
      await page.locator("#story .section-heading").scrollIntoViewIfNeeded();
      await page.waitForFunction(
        () =>
          getComputedStyle(document.querySelector("#story .section-heading"))
            .opacity === "1",
      );
      await page.locator("#story .story-copy").scrollIntoViewIfNeeded();
      await page.waitForFunction(
        () =>
          getComputedStyle(document.querySelector("#story .story-copy"))
            .opacity === "1",
      );
      await page
        .locator("#story")
        .screenshot({ path: "/tmp/dy-len-story-motion-390.png" });
      const timeline = await page
        .locator(".ceremony-list")
        .evaluate((element) => ({
          top: scrollY + element.getBoundingClientRect().top,
          height: element.offsetHeight,
        }));
      const lineScale = () =>
        page.locator(".timeline-stem").evaluate((element) => {
          const transform = getComputedStyle(element).transform;
          return transform === "none"
            ? 1
            : new DOMMatrixReadOnly(transform).m22;
        });
      await page.evaluate(
        (top) => scrollTo({ top, behavior: "instant" }),
        timeline.top - 700,
      );
      await page.waitForTimeout(100);
      const lineStart = await lineScale();
      await page.evaluate(
        (top) => scrollTo({ top, behavior: "instant" }),
        timeline.top + timeline.height / 2 - 425,
      );
      await page.waitForFunction(
        () => {
          const line = document.querySelector(".timeline-stem");
          if (!line) return false;
          const transform = getComputedStyle(line).transform;
          return (
            transform === "none" || new DOMMatrixReadOnly(transform).m22 > 0.35
          );
        },
        null,
        { timeout: 3000 },
      );
      const lineMiddle = await lineScale();
      await page.evaluate(
        (top) => scrollTo({ top, behavior: "instant" }),
        timeline.top + timeline.height - 170,
      );
      await page.waitForFunction(
        () =>
          getComputedStyle(document.querySelector(".timeline-stem"))
            .transform === "none",
        null,
        { timeout: 3000 },
      );
      await page.evaluate(
        (top) => scrollTo({ top, behavior: "instant" }),
        timeline.top - 700,
      );
      if (lineStart > 0.1 || lineMiddle < 0.35 || (await lineScale()) < 0.95)
        failures.push(
          "Gold timeline line did not draw once with scroll progress",
        );
    }
    await page.locator("#gallery").scrollIntoViewIfNeeded();
    if (width === 390) {
      await page.waitForFunction(
        () => document.querySelector(".gallery-grid")?.scrollLeft > 10,
        null,
        { timeout: 8500 },
      );
    }
    await page.waitForFunction(
      () =>
        document
          .querySelector(".butterfly-stage-gallery")
          ?.getAttribute("data-active") === "true",
    );
    if (
      (await page
        .locator(".butterfly-stage-hero")
        .getAttribute("data-active")) !== "false"
    )
      failures.push(`${width}px offscreen hero butterfly did not pause`);
    for (let index = 1; index <= 4; index++) {
      const selector = `.gallery-reveal-${index}`;
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForFunction(
        (target) =>
          getComputedStyle(document.querySelector(target)).opacity === "1",
        selector,
        { timeout: 3000 },
      );
    }
    if (width === 390)
      await page
        .locator("#gallery")
        .screenshot({ path: "/tmp/dy-len-gallery-motion-390.png" });
    const dimensions = await page.evaluate(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
    }));
    if (dimensions.document > dimensions.viewport + 1)
      failures.push(`${width}px horizontal overflow with motion`);
    if (errors.length)
      failures.push(
        `${width}px normal-motion browser errors: ${errors.join("; ")}`,
      );
    await context.close();
  }

  const missingAudioContext = await browser.newContext({
    viewport: { width: 390, height: 850 },
    reducedMotion: "reduce",
  });
  const missingAudioPage = await missingAudioContext.newPage();
  await missingAudioPage.route("**/audio/wedding-music.mp3", (route) =>
    route.fulfill({ status: 404, contentType: "audio/mpeg", body: "" }),
  );
  await missingAudioPage.goto(baseURL, { waitUntil: "networkidle" });
  await missingAudioPage.getByRole("button", { name: /បើកធៀប/ }).click();
  await missingAudioPage
    .locator(".envelope-overlay")
    .waitFor({ state: "hidden" });
  await missingAudioPage
    .locator("#schedule .ceremony-list")
    .scrollIntoViewIfNeeded();
  await missingAudioPage.waitForFunction(
    () =>
      document.querySelector(".floating-controls button")?.disabled === true,
    null,
    { timeout: 5000 },
  );
  if ((await missingAudioPage.locator("audio").count()) !== 1)
    failures.push("Missing audio created an extra player");
  await missingAudioContext.close();

  const noScriptContext = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 850 },
  });
  const noScriptPage = await noScriptContext.newPage();
  await noScriptPage.goto(baseURL, { waitUntil: "networkidle" });
  const noScriptContent = await noScriptPage.evaluate(() => ({
    envelope: getComputedStyle(document.querySelector(".envelope-overlay"))
      .display,
    invitation: document.querySelector("#invitation")?.textContent?.length ?? 0,
    story: document.querySelector("#story")?.textContent?.length ?? 0,
  }));
  if (
    noScriptContent.envelope !== "none" ||
    noScriptContent.invitation < 100 ||
    noScriptContent.story < 100
  )
    failures.push("Invitation content was blocked without JavaScript");
  await noScriptContext.close();
} finally {
  await browser.close();
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else console.log("Browser smoke checks passed.");
