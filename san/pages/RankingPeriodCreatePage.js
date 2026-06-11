/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');
const DataUtil = require('../utils/dataUtil');

class RankingPeriodCreatePage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this._apiResponsePromise = null;
        this._lastAPIResponse = null;

        // Page title for Ranking Period
        this.rankingPeriodTitle = page.locator(
            "//div[contains(@class,'e-tab-text') and contains(normalize-space(),'Ranking Period')] | " +
            "//span[normalize-space()='Ranking Period'] | " +
            "//div[normalize-space()='Ranking Period']"
        ).first();

        // Matchday Configuration inputs
        this.totalMatchdaysInput = page.locator(
            'input[placeholder*="Total Matchday"], input[name*="totalMatchday"], ' +
            'input[formcontrolname*="totalMatchday"], input[id*="totalMatchday"]'
        ).first();

        this.numberOfGroupsInput = page.locator(
            'input[placeholder*="Number of Group"], input[name*="numberOfGroup"], ' +
            'input[formcontrolname*="numberOfGroup"], input[id*="numberOfGroup"]'
        ).first();

        // Configure Groups progress button
        this.configureGroupsBtn = page.locator(
            'button[aria-label="Configure Groups progress"], ' +
            'button:has(span.e-btn-content:has-text("Configure Groups")), ' +
            'button:has-text("Configure Groups")'
        ).first();

        // Auto Assign Matchdays toggle switch label/wrapper
        this.autoAssignMatchdaysSwitch = page.locator(
            '//label[contains(normalize-space(),"Auto Assign")]/following::span[contains(@class,"e-switch-inner")][1] | ' +
            '//span[contains(normalize-space(),"Auto Assign")]/following::span[contains(@class,"e-switch-inner")][1] | ' +
            '(//span[contains(@class,"e-switch-inner")])[1]'
        ).first();

        // Create button (final submit for Ranking Period)
        this.createBtn = page.locator('[aria-label="Create progress"]'
        ).first();
    }

    // ─────────────────────────────────────────────────────────────────
    // PAGE TITLE
    // ─────────────────────────────────────────────────────────────────

    async verifyRankingPeriodPageTitle() {
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        const title = this.page.locator(
            "//div[contains(@class,'e-tab-text') and contains(normalize-space(),'Ranking Period')] | " +
            "//h1[contains(normalize-space(),'Ranking Period')] | " +
            "//h2[contains(normalize-space(),'Ranking Period')] | " +
            "//span[normalize-space()='Ranking Period']"
        );
        await title.first().waitFor({ state: 'visible', timeout: 20000 });
        console.log('✓ Ranking Period page title verified');
    }

    // ─────────────────────────────────────────────────────────────────
    // MATCHDAY CONFIGURATION
    // ─────────────────────────────────────────────────────────────────

    async fillMatchdayConfiguration(totalMatchdays, numberOfGroups) {
        await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});

        // Try to find inputs by label proximity when placeholder-based locators fail
        const totalInput = await this._findInputByLabel('Total Matchday', this.totalMatchdaysInput);
        await totalInput.waitFor({ state: 'visible', timeout: 10000 });
        await totalInput.scrollIntoViewIfNeeded();
        await totalInput.click({ clickCount: 3 });
        await totalInput.fill(String(totalMatchdays));
        console.log(`✓ Filled Total Matchdays: ${totalMatchdays}`);

        const groupsInput = await this._findInputByLabel('Number of Group', this.numberOfGroupsInput);
        await groupsInput.waitFor({ state: 'visible', timeout: 10000 });
        await groupsInput.scrollIntoViewIfNeeded();
        await groupsInput.click({ clickCount: 3 });
        await groupsInput.fill(String(numberOfGroups));
        console.log(`✓ Filled Number of Groups: ${numberOfGroups}`);

        await this.page.waitForTimeout(500);
    }

    async _findInputByLabel(labelText, fallback) {
        const xpathBased = this.page.locator(
            `//*[contains(normalize-space(),'${labelText}')]/following::input[1]`
        ).first();
        if (await xpathBased.count() > 0 && await xpathBased.isVisible().catch(() => false)) {
            return xpathBased;
        }
        return fallback;
    }

    // ─────────────────────────────────────────────────────────────────
    // CONFIGURE GROUPS BUTTON
    // ─────────────────────────────────────────────────────────────────

    async clickConfigureGroups() {
        await this.configureGroupsBtn.waitFor({ state: 'visible', timeout: 15000 });
        await this.configureGroupsBtn.scrollIntoViewIfNeeded();
        await this.configureGroupsBtn.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1000);
        console.log('✓ Clicked Configure Groups button');
    }

    // ─────────────────────────────────────────────────────────────────
    // AUTO ASSIGN MATCHDAYS TOGGLE
    // ─────────────────────────────────────────────────────────────────

    async toggleAutoAssignMatchdays() {
        // Try the label-proximity locator first, then fall back to the switch wrapper
        let switchEl = this.page.locator(
            '//label[contains(normalize-space(),"Auto Assign")]/following::label[contains(@class,"e-switch")][1] | ' +
            '//span[contains(normalize-space(),"Auto Assign Matchdays")]/following::label[contains(@class,"e-switch")][1]'
        ).first();

        if (!(await switchEl.isVisible().catch(() => false))) {
            switchEl = this.autoAssignMatchdaysSwitch;
        }

        await switchEl.waitFor({ state: 'visible', timeout: 10000 });
        await switchEl.scrollIntoViewIfNeeded();
        await switchEl.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Toggled Auto Assign Matchdays');
    }

    // ─────────────────────────────────────────────────────────────────
    // CREATE BUTTON
    // ─────────────────────────────────────────────────────────────────

    async clickCreateButton() {
        await this.createBtn.waitFor({ state: 'visible', timeout: 10000 });
        await this.createBtn.scrollIntoViewIfNeeded();
        await this.createBtn.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked Create button for Ranking Period');
    }

    // ─────────────────────────────────────────────────────────────────
    // API – CAPTURE
    // ─────────────────────────────────────────────────────────────────

    startCapturingAPIResponse() {
        this._apiResponsePromise = this.page.waitForResponse(
            (r) => {
                const url = r.url().toLowerCase();
                const method = r.request().method();
                const status = r.status();
                return (
                    url.includes('ranking') &&
                    (url.includes('period') || url.includes('template') || url.includes('create')) &&
                    (method === 'POST' || method === 'PUT') &&
                    status >= 200 && status < 300
                );
            },
            { timeout: 90000 }
        );
        console.log('✓ Listening for Ranking Period create API response');
    }

    // ─────────────────────────────────────────────────────────────────
    // API – AWAIT
    // ─────────────────────────────────────────────────────────────────

    async awaitAPIResponse() {
        const response = await this._apiResponsePromise;
        console.log(`✓ Captured Ranking Period create API URL: ${response.url()}`);
        console.log(`✓ Method: ${response.request().method()}`);
        const body = await response.json();
        this._apiResponsePromise = null;
        this._lastAPIResponse = body;
        return body;
    }

    // ─────────────────────────────────────────────────────────────────
    // API – VERIFY
    // ─────────────────────────────────────────────────────────────────

    async verifyAPIResponseSuccessful(apiBody) {
        expect(apiBody).toBeTruthy();
        const id = apiBody._id || apiBody.id || apiBody.data?._id || apiBody.data?.id;
        if (id) {
            console.log(`✓ Ranking Period created successfully — ID: ${id}`);
        } else {
            console.log('✓ Ranking Period API response received (no ID field found in root)');
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // API – PRINT
    // ─────────────────────────────────────────────────────────────────

    printAPIResponseJSON(apiBody) {
        console.log('──────── RANKING PERIOD CREATE API RESPONSE (JSON) ────────');
        console.log(JSON.stringify(apiBody, null, 2));
        console.log('────────────────────────────────────────────────────────────');
    }
}

module.exports = RankingPeriodCreatePage;
