const { Before, After, AfterAll, BeforeAll, setDefaultTimeout, BeforeStep, AfterStep } = require('@cucumber/cucumber');
const AllureReporter = require('../../utils/reporter');
const fs = require('fs');
const path = require('path');

let passedCount = 0;
let failedCount = 0;

BeforeAll(function () {
    // We no longer clear allure-results here because the user wants to merge 
    // results across multiple single test runs.
    // To clear the results manually, run `npm run allure:clean`.
    const allureResultsDir = path.resolve(process.cwd(), 'allure-results');
    if (!fs.existsSync(allureResultsDir)) {
        fs.mkdirSync(allureResultsDir, { recursive: true });
    }
    console.log('✓ allure-results directory is ready (not cleared, results will merge)');
});



Before({ tags: "@BulkDevices" }, function () {
    setDefaultTimeout(5 * 60 * 1000);
});


Before(async function () {
    const worldParams = this.parameters || {};
    if (worldParams.headless !== undefined) {
        this.headless = worldParams.headless;
    }
    if (worldParams.browserType !== undefined) {
        this.browserType = worldParams.browserType;
    }

    await this.init();
});


BeforeStep(function ({ pickleStep }) {
    console.log(`Starting Step: ${pickleStep.text}`);
});

AfterStep(async function ({ result, pickleStep }) {
    console.log(`Step Status: ${result?.status}`);
    if (result?.status === 'FAILED') {
        console.log(`Step Error: ${result?.message}`);
        // Capture screenshot and attach it to Allure report
        if (this.page) {
            try {
                const screenshot = await this.page.screenshot({ fullPage: true });
                this.attach(screenshot, 'image/png');
                console.log(`Attached screenshot for failed step: ${pickleStep?.text || 'Unknown Step'}`);
            } catch (error) {
                console.error('Failed to capture screenshot:', error.message);
            }
        }
    }
});


After(async function (scenario) {
    try {
        const scenarioName = scenario.pickle?.name || 'Unknown Scenario';
        const status = scenario.result?.status || 'UNKNOWN';

        // Log scenario result
        console.log(`\nScenario: ${scenarioName}`);
        console.log(`Status: ${status}`);

        // Count passed/failed scenarios
        if (status === 'PASSED') passedCount++;
        if (status === 'FAILED') {
            failedCount++;
            console.log(`Error: ${scenario.result?.message || 'No message available'}`);
        }

        // Pause browser if running in headful mode
        if (!this.headless) {
            console.log('Browser will stay open for 3 seconds...');
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        // Cleanup browser resources safely
        await Promise.race([
            this.cleanup(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Cleanup timeout')), 10000)
            )
        ]);

    } catch (error) {
        console.error('Error in After hook:', error.message);

        // Fallback cleanup
        const cleanupPromises = [];
        if (this.page) cleanupPromises.push(this.page.close().catch(() => { }));
        if (this.context) cleanupPromises.push(this.context.close().catch(() => { }));
        if (this.browser) cleanupPromises.push(this.browser.close().catch(() => { }));
        if (cleanupPromises.length) await Promise.race([Promise.all(cleanupPromises), new Promise(resolve => setTimeout(resolve, 5000))]);
    }
});


AfterAll(async function () {
    console.log('\nAll tests completed');
    console.log(`✅ Passed scenarios: ${passedCount}`);
    console.log(`❌ Failed scenarios: ${failedCount}`);
});

