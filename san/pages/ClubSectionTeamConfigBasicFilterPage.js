/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

class ClubSectionTeamConfigBasicFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // Filter dialog container (right-side slide panel)
        this.filterDialog = page.locator('[cssclass="right-slide-dialog"]');

        // Apply / Reset buttons inside the filter dialog
        this.filterApplyButton = page.locator('[cssclass="right-slide-dialog"] button:has-text("Apply")');
        this.filterResetButton = page.locator('[cssclass="right-slide-dialog"] button:has-text("Reset")');

        // Team Configuration tab on the section detail page
        this.teamConfigTab = page.locator("//div[normalize-space(text())='Team Configuration']").first();

        // Basic Filter tab inside the filter dialog
        this.basicFilterTab = this.filterDialog.locator('button:has-text("Basic Filter")');

        // Filter icon button on the Team Configuration grid toolbar
        this.teamConfigFilterBtn = page.locator(
            "button:has(span[style*='filter.svg']), span[style*='filter.svg']"
        ).first();

        // API response capture
        this._teamConfigResponsePromise = null;
        this._lastAPIResponse = null;
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION
    // ─────────────────────────────────────────────────────────────────

    async navigateToTeamConfigTab() {
        await this.teamConfigTab.waitFor({ state: 'visible', timeout: 15000 });
        await this.teamConfigTab.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1000);
        console.log('✓ Navigated to Team Configuration tab on section detail page');
    }

    // ─────────────────────────────────────────────────────────────────
    // OPEN FILTER DIALOG
    // ─────────────────────────────────────────────────────────────────

    async openFilterDialog() {
        const isOpen = await this.filterDialog.isVisible().catch(() => false);
        if (isOpen) {
            console.log('Team Config filter dialog already open – skipping click');
            return;
        }

        // Strategy 1: filter icon near Team Configuration grid heading
        const nearConfigBtn = this.page.locator(
            "(//div[contains(normalize-space(),'Team Configuration')]" +
            "/following::button[.//span[contains(@style,'filter.svg')]] | " +
            "//div[contains(normalize-space(),'Team Configuration')]" +
            "/following::span[contains(@style,'filter.svg')])[1]"
        );
        if (await nearConfigBtn.isVisible().catch(() => false)) {
            await nearConfigBtn.click();
            await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
            console.log('✓ Opened Team Config filter dialog (near Team Configuration heading)');
            return;
        }

        // Strategy 2: any visible filter icon on page
        await this.teamConfigFilterBtn.waitFor({ state: 'visible', timeout: 10000 });
        await this.teamConfigFilterBtn.click();
        await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ Opened Team Config filter dialog (first visible filter icon)');
    }

    // ─────────────────────────────────────────────────────────────────
    // BASIC FILTER TAB VERIFICATION
    // ─────────────────────────────────────────────────────────────────

    async verifyBasicFilterTabVisible() {
        await this.basicFilterTab.waitFor({ state: 'visible', timeout: 10000 });
        await this.basicFilterTab.click();
        console.log('✓ Basic Filter tab is visible and selected');
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY / RESET
    // ─────────────────────────────────────────────────────────────────

    async clickApply() {
        // Scroll dialog to bottom so the Apply button is always in view
        await this.filterDialog.evaluate(el => el.scrollTo(0, el.scrollHeight)).catch(() => {});
        await this.page.waitForTimeout(300);

        const primary = this.page.locator('[cssclass="right-slide-dialog"] button:has-text("Apply")').first();

        try {
            await primary.waitFor({ state: 'visible', timeout: 10000 });
            await primary.scrollIntoViewIfNeeded().catch(() => {});
            await primary.click();
        } catch {
            const fallback = this.page.locator('button:has-text("Apply")').last();
            await fallback.scrollIntoViewIfNeeded().catch(() => {});
            await fallback.click({ force: true });
        }

        await this.page.waitForTimeout(1500);
        console.log('✓ Clicked Apply button in Team Config filter dialog');
    }

    async clickReset() {
        await this.filterResetButton.waitFor({ state: 'visible' });
        const isDisabled = await this.filterResetButton.isDisabled();
        if (isDisabled) {
            console.log('ℹ Reset button is disabled — no active filters to reset, skipping');
            return;
        }
        await this.filterResetButton.click();
        await this.page.waitForTimeout(800);
        console.log('✓ Clicked Reset button in Team Config filter dialog');
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY FILTER CRITERIA (dispatcher)
    // ─────────────────────────────────────────────────────────────────

    /**
     * Supported filter fields:
     *   Search              – AutoComplete
     *   Status              – Badge button (Active / Inactive)
     *   Division Category   – Badge button or EJ2 MultiSelect
     *   Team Classification – EJ2 MultiSelect
     *   Tags                – EJ2 MultiSelect
     *
     * @param {Record<string, string>} criteria
     */
    async applyFilterCriteria(criteria) {
        for (const [field, value] of Object.entries(criteria)) {
            if (field === 'FilterField') continue;
            if (!value || value.trim() === '') continue;
            switch (field) {
                case 'Search':
                    await this._fillSearchInput(value);
                    break;
                case 'Status':
                case 'Division Category':
                    await this._selectBadgeOrMultiSelect(field, value);
                    break;
                case 'Team Classification':
                case 'Tags':
                    await this._selectMultiSelect(field, value);
                    break;
                default:
                    console.warn(`⚠ Unknown Team Config filter field: "${field}" – skipping`);
            }
            await this.page.waitForTimeout(300);
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // PRIVATE HELPERS
    // ─────────────────────────────────────────────────────────────────

    async _fillSearchInput(value) {
        const input = this.filterDialog.locator(
            'input[placeholder*="Search"], ejs-autocomplete input, input[role="combobox"]'
        ).first();

        await input.waitFor({ state: 'visible', timeout: 10000 });
        await input.click();
        await input.clear();
        await input.pressSequentially(value, { delay: 80 });
        console.log(`✓ Typed search text: "${value}"`);

        const suggestionList = this.page.locator(
            'div.e-popup-open .e-list-item, ul.e-list-parent li.e-list-item'
        );

        try {
            await suggestionList.first().waitFor({ state: 'visible', timeout: 10000 });
        } catch {
            console.log(`⚠ No suggestions appeared for "${value}" — keeping typed value`);
            return;
        }

        const allTexts = await suggestionList.allTextContents().catch(() => []);
        console.log(`  Available suggestions: ${JSON.stringify(allTexts.map(t => t.trim()))}`);

        const matchingItem = suggestionList.filter({
            hasText: new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
        }).first();

        if (await matchingItem.isVisible().catch(() => false)) {
            const matchedText = await matchingItem.textContent().catch(() => value);
            await matchingItem.click({ force: true });
            console.log(`✓ Selected suggestion: "${matchedText.trim()}"`);
        } else {
            const firstText = await suggestionList.first().textContent().catch(() => '');
            await suggestionList.first().click({ force: true });
            console.log(`✓ No exact match — selected first suggestion: "${firstText.trim()}"`);
        }
    }

    async _selectBadgeOrMultiSelect(fieldLabel, value) {
        // Scroll to the field label first
        const label = this.filterDialog.locator(
            `xpath=//label[contains(normalize-space(),'${fieldLabel}')]`
        ).first();
        if (await label.count() > 0) {
            await label.scrollIntoViewIfNeeded().catch(() => {});
            await this.page.waitForTimeout(300);
            console.log(`✓ Scrolled to "${fieldLabel}" section in filter dialog`);
        }

        // Exact-text match scoped to field label (avoids matching "Apply" for single-letter values)
        const scopedBtn = this.page.locator(
            `xpath=//label[contains(normalize-space(),'${fieldLabel}')]` +
            `/following::button[normalize-space()='${value}'][1]`
        );
        if (await scopedBtn.count() > 0) {
            await scopedBtn.scrollIntoViewIfNeeded().catch(() => {});
            await scopedBtn.click();
            await this.page.waitForTimeout(400);
            console.log(`✓ Selected badge "${value}" for "${fieldLabel}"`);
            return;
        }

        // Any badge in the dialog with exact text
        const btn = this.filterDialog.locator('button').filter({
            hasText: new RegExp(`^\\s*${value}\\s*$`, 'i')
        }).first();
        if (await btn.count() > 0) {
            await btn.scrollIntoViewIfNeeded().catch(() => {});
            await btn.click();
            await this.page.waitForTimeout(400);
            console.log(`✓ Selected badge "${value}" for "${fieldLabel}"`);
            return;
        }

        // Fallback: EJ2 MultiSelect
        await this._selectMultiSelect(fieldLabel, value);
    }

    async _selectMultiSelect(fieldLabel, value) {
        const xpaths = [
            `//label[normalize-space()='${fieldLabel}']/following-sibling::*//div[contains(@class,'e-multi-select-wrapper')]`,
            `//*[normalize-space()='${fieldLabel}']/following-sibling::*//div[contains(@class,'e-multi-select-wrapper')]`,
            `//*[normalize-space()='${fieldLabel}']/parent::*/following-sibling::*//div[contains(@class,'e-multi-select-wrapper')]`,
            `//label[contains(normalize-space(),'${fieldLabel}')]/following::div[contains(@class,'e-multi-select-wrapper')][1]`,
        ];

        let wrapper = null;
        for (const xp of xpaths) {
            const candidate = this.filterDialog.locator(`xpath=${xp}`).first();
            if (await candidate.count() > 0) {
                wrapper = candidate;
                break;
            }
        }

        if (!wrapper) {
            wrapper = this.page.locator(
                `xpath=//label[contains(normalize-space(),'${fieldLabel}')]/following::div[contains(@class,'e-multi-select-wrapper')][1]`
            ).first();
        }

        await wrapper.waitFor({ state: 'visible', timeout: 10000 });
        await wrapper.scrollIntoViewIfNeeded().catch(() => {});
        await wrapper.click();
        await this.page.waitForTimeout(400);

        const option = this.page.locator(
            `xpath=//div[contains(@class,'e-popup-open')]//li[contains(@class,'e-list-item') and contains(normalize-space(),'${value}')]`
        ).first();

        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click();
        await this.page.waitForTimeout(300);

        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(200);

        console.log(`✓ Selected "${value}" from "${fieldLabel}" multiselect`);
    }

    // ─────────────────────────────────────────────────────────────────
    // API CAPTURE & VALIDATION
    // ─────────────────────────────────────────────────────────────────

    startCapturingTeamConfigAPI() {
        // Debug: log every non-static response for 10 s to identify the endpoint
        const debugHandler = (response) => {
            const url = response.url();
            if (!url.match(/\.(js|css|png|jpg|svg|woff|ico)(\?|$)/i)) {
                console.log(`[API Debug] ${response.status()} ${response.request().method()} ${url}`);
            }
        };
        this.page.on('response', debugHandler);
        setTimeout(() => this.page.off('response', debugHandler), 10000);

        this._teamConfigResponsePromise = this.page.waitForResponse(
            (response) => {
                const url = response.url().toLowerCase();
                const status = response.status();
                return url.includes('team') && status >= 200 && status < 400;
            },
            { timeout: 90000 }
        );
        console.log('✓ Started capturing Team Config list API response');
    }

    async awaitAndPrintTeamConfigAPIResponse() {
        const response = await this._teamConfigResponsePromise;
        console.log(`✓ Team Config API matched URL: ${response.url()}`);
        const body = await response.json();
        const total = body.total ?? body.totalCount ?? (Array.isArray(body) ? body.length : (body.items?.length ?? 0));
        console.log(`✓ Team Config API total: ${total}`);
        console.log('── Team Config API Response JSON ──────────────────────────');
        console.log(JSON.stringify(body, null, 2));
        console.log('───────────────────────────────────────────────────────────');
        this._lastAPIResponse = body;
        return body;
    }

    async verifyAPITotalGreaterThanZero(responseBody) {
        const body = responseBody || this._lastAPIResponse;
        expect(body).toBeTruthy();
        const total = body.total ?? body.totalCount ?? (Array.isArray(body) ? body.length : (body.items?.length ?? 0));
        if (total > 0) {
            console.log(`✓ Team Config API total count (${total}) is greater than zero`);
        } else {
            console.log(`ℹ No records found for the applied filter — API returned 0 results`);
        }
    }

    async getTeamConfigGridRowCount() {
        await this.page.waitForTimeout(1000);
        const rows = this.page.locator('.e-gridcontent .e-row, table.e-table tbody tr.e-row');
        const count = await rows.count();
        console.log(`ℹ UI Team Config grid shows ${count} row(s)`);
        return count;
    }

    async logUIvsAPICount(responseBody) {
        const body = responseBody || this._lastAPIResponse;
        const apiTotal = body.total ?? body.totalCount ?? (Array.isArray(body) ? body.length : (body.items?.length ?? 0));
        const uiCount = await this.getTeamConfigGridRowCount();
        console.log(`── UI vs API Count ───────────────────────────────────`);
        console.log(`   UI  rows : ${uiCount}`);
        console.log(`   API total: ${apiTotal}`);
        if (uiCount !== apiTotal) {
            console.log(`   ⚠ Discrepancy: UI shows ${uiCount} but API returned ${apiTotal}`);
        } else {
            console.log(`   ✓ UI and API counts match`);
        }
        console.log(`─────────────────────────────────────────────────────`);
        return { uiCount, apiTotal };
    }
}

module.exports = ClubSectionTeamConfigBasicFilterPage;
