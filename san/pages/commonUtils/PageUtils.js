// utils/PageUtilClassName.js
class PageUtil {


    static async scrollBottomThenUp(page, opts = {}) {
        const { step = 400, downDelay = 150, upDelay = 220, bottomPause = 1000 } = opts;

        // Scroll down until bottom
        while (true) {
            const { top, height, scrollHeight } = await page.evaluate(() => {
                const el = document.scrollingElement || document.documentElement;
                return { top: el.scrollTop, height: el.clientHeight, scrollHeight: el.scrollHeight };
            });
            if (top + height >= scrollHeight - 2) break;

            await page.mouse.wheel(0, step); // natural scroll
            await page.waitForTimeout(downDelay);
        }

        // Pause at bottom
        await page.waitForTimeout(bottomPause);

        // Scroll up slowly
        while (true) {
            const top = await page.evaluate(() => (document.scrollingElement || document.documentElement).scrollTop);
            if (top <= 0) break;

            await page.mouse.wheel(0, -Math.max(120, Math.floor(step * 0.75)));
            await page.waitForTimeout(upDelay);
        }
    }


    static async waitForPageLoad(page) {
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000); // small buffer if UI heavy
        console.log("✅ Page fully loaded");
    }


    static async waitForElementToBeStable(locator, page) {
        let prevBox = await locator.boundingBox();
        await page.waitForTimeout(100);
        let newBox = await locator.boundingBox();
        console.log("prevBox", prevBox);
        console.log("newBox", newBox);
        try {
            while (
                prevBox &&
                newBox &&
                (prevBox.x !== newBox.x || prevBox.y !== newBox.y)
            ) {
                prevBox = newBox;
                await page.waitForTimeout(100);
                newBox = await locator.boundingBox();
            }

            console.log("✅ Element is stable");
        } catch (error) {
            console.log("❌ Element is not stable", error);
        }


    }



    // Scroll slowly from top to bottom
    static async slowScrollUseBody(page) {
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 100; // pixels per scroll step
                const delay = 200;    // time gap in ms between steps

                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, delay);
            });
        });
    }




    static async slowScroll(page, elementLocator = null) {
        console.log("📜 Starting slow scroll...");
      
        const step = 200;   // pixels per scroll step
        const delay = 300;  // ms delay between steps
      
        if (elementLocator) {
          console.log("🔎 Scrolling to specific element...");
      
          const element = await elementLocator.elementHandle();
          if (!element) throw new Error("❌ Element not found for slow scrolling.");
      
          const box = await element.boundingBox();
          if (!box) throw new Error("❌ Could not determine element bounding box.");
      
          let scrolled = 0;
          while (scrolled < box.y) {
            await page.mouse.wheel(0, step);   // simulate mouse scroll down
            await page.waitForTimeout(delay);
            scrolled += step;
          }
      
          await element.scrollIntoViewIfNeeded();
          console.log("✅ Finished slow scroll to element.");
        } else {
          console.log("🔎 Scrolling full page...");
      
          const height = await page.evaluate(() => document.body.scrollHeight);
      
          let scrolled = 0;
          while (scrolled < height) {
            await page.mouse.wheel(0, step);   // simulate mouse scroll down
            await page.waitForTimeout(delay);
            scrolled += step;
          }
      
          console.log("✅ Finished slow scroll of full page.");
        }
      }






      static async uploadFileViaButton(buttonLocator, filePath,page) {
        try {
          console.log("📂 Waiting for file chooser...");
      
          // Wait for file chooser when clicking the button
          const [fileChooser] = await Promise.all([
            page.waitForEvent('filechooser'),
            buttonLocator.click()  // the Attach button
          ]);
      
          // Set the file
          await fileChooser.setFiles(filePath);
      
          console.log(`✅ File "${filePath}" uploaded successfully via button.`);
        } catch (error) {
          console.error("❌ File upload failed:", error);
          throw error;
        }
      }
      

}

module.exports = PageUtil;
