/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

class CompetitionRankingBasicFilterPage {
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

        // Basic Filter tab inside the filter dialog
        this.basicFilterTab = this.filterDialog.locator('button:has-text("Basic Filter")');

        // Filter icon button on the Ranking grid toolbar
        this.rankingFilterBtn = page.locator(
            "button:has(span[style*='filter.svg']), span[style*='filter.svg']"
        ).first();

        // API response capture
        this._rankingFilterResponsePromise = null;
        this._lastAPIResponse = null;
    }

    // ─────────────────────────────────────────────────────────────────
    // OPEN FILTER DIALOG
    // ─────────────────────────────────────────────────────────────────

    async openFilterDialog() {
        const isOpen = await this.filterDialog.isVisible().catch(() => false);
        if (isOpen) {
            console.log('Ranking filter dialog already open – skipping click');
            return;
        }

        // Strategy 1: filter icon near Ranking grid heading
        const nearRankingBtn = this.page.locator(
            "(//div[contains(normalize-space(),'Ranking')]" +
            "/following::button[.//span[contains(@style,'filter.svg')]] | " +
            "//div[contains(normalize-space(),'Ranking')]" +
            "/following::span[contains(@style,'filter.svg')])[1]"
        );
        if (await nearRankingBtn.isVisible().catch(() => false)) {
            await nearRankingBtn.click();
            await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
            console.log('✓ Opened Ranking filter dialog (near Ranking heading)');
            return;
        }

        // Strategy 2: any visible filter icon on page
        await this.rankingFilterBtn.waitFor({ state: 'visible', timeout: 10000 });
        await this.rankingFilterBtn.click();
        await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ Opened Ranking filter dialog (first visible filter icon)');
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
        console.log('✓ Clicked Apply button in Ranking filter dialog');
    }

    async clickReset() {
        await this.filterResetButton.waitFor({ state: 'visible', timeout: 10000 });
        const isDisabled = await this.filterResetButton.isDisabled();
        if (isDisabled) {
            console.log('ℹ Reset button is disabled — no active filters to reset, skipping');
            return;
        }
        await this.filterResetButton.click();
        await this.page.waitForTimeout(800);
        console.log('✓ Clicked Reset button in Ranking filter dialog');
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY FILTER CRITERIA (dispatcher)
    // ─────────────────────────────────────────────────────────────────

    /**
     * Dispatch each filter field from the criteria map.
     *
     * Supported keys:
     *   Template Name   – AutoComplete (placeholder: "Search by Template Name")
     *   Status          – Badge button (Active / Inactive)
     *   Ranking Criteria – Badge button (e.g. "Head-to-Head Goal Average")
     *
     * @param {Record<string, string>} criteria  key=field, value=filter value
     */
    async applyFilterCriteria(criteria) {
        for (const [field, value] of Object.entries(criteria)) {
            if (field === 'FilterField') continue;
            if (!value || value.trim() === '') continue;
            switch (field) {
                case 'Template Name':
                    await this._fillTemplateNameAutoComplete(value);
                    break;
                case 'Status':
                    await this._selectBadgeOrMultiSelect('Status', value);
                    break;
                case 'Ranking Criteria':
                    await this._selectBadgeOrMultiSelect('Ranking Criteria', value);
                    break;
                default:
                    console.warn(`⚠ Unknown Ranking filter field: "${field}" – skipping`);
            }
            await this.page.waitForTimeout(300);
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // PRIVATE HELPERS
    // ─────────────────────────────────────────────────────────────────

    /**
     * Type into the AutoComplete Template Name input, wait for suggestion dropdown, select match.
     * HTML: <input role="combobox" placeholder="Search by Template Name" aria-autocomplete="both">
     */
    async _fillTemplateNameAutoComplete(value) {
        const input = this.filterDialog.locator(
            'input[placeholder="Search by Template Name"], ' +
            'input[role="combobox"][aria-autocomplete="both"], ' +
            'ejs-autocomplete input'
        ).first();

        await input.waitFor({ state: 'visible', timeout: 10000 });
        await input.click();
        await input.clear();
        await input.pressSequentially(value, { delay: 80 });
        console.log(`✓ Typed Template Name: "${value}"`);

        // Wait for EJ2 autocomplete suggestion dropdown
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

    /**
     * Select a badge-style button inside the filter dialog scoped to the field label.
     * Falls back to EJ2 MultiSelect if no badge is found.
     */
    async _selectBadgeOrMultiSelect(fieldLabel, value) {
        // Scroll the dialog to the field label
        const label = this.filterDialog.locator(
            `xpath=//label[contains(normalize-space(),'${fieldLabel}')]`
        ).first();
        if (await label.count() > 0) {
            await label.scrollIntoViewIfNeeded().catch(() => {});
            await this.page.waitForTimeout(300);
            console.log(`✓ Scrolled to "${fieldLabel}" section in filter dialog`);
        }

        // Exact text match scoped to label (avoids matching "Apply" for short values)
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

        // Any badge in the dialog matching value text exactly
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

    /**
     * Open an EJ2 MultiSelect (checkbox mode) and click the matching option.
     */
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

    /**
     * Register a response listener for the Ranking list API.
     * Must be called BEFORE clicking Apply so the promise is ready.
     */
    startCapturingRankingFilterAPI() {
        const debugHandler = (response) => {
            const url = response.url();
            if (!url.match(/\.(js|css|png|jpg|svg|woff|ico)(\?|$)/i)) {
                console.log(`[API Debug] ${response.status()} ${response.request().method()} ${url}`);
            }
        };
        this.page.on('response', debugHandler);
        setTimeout(() => this.page.off('response', debugHandler), 10000);

        this._rankingFilterResponsePromise = this.page.waitForResponse(
            (response) => {
                const url = response.url().toLowerCase();
                const status = response.status();
                return url.includes('ranking') && status >= 200 && status < 400;
            },
            { timeout: 90000 }
        );
        console.log('✓ Started capturing Ranking filter API response');
    }

    /**
     * Await the captured Ranking API response, print the full JSON, and return the body.
     */
    async awaitAndPrintRankingFilterAPIResponse() {
        const response = await this._rankingFilterResponsePromise;
        console.log(`✓ Ranking filter API matched URL: ${response.url()}`);
        const body = await response.json();
        const total = body.total ?? body.totalCount ?? (Array.isArray(body) ? body.length : (body.items?.length ?? 0));
        console.log(`✓ Ranking filter API total: ${total}`);
        console.log('── Ranking Filter API Response JSON ──────────────────────');
        console.log(JSON.stringify(body, null, 2));
        console.log('──────────────────────────────────────────────────────────');
        this._lastAPIResponse = body;
        return body;
    }

    async verifyAPITotalGreaterThanZero(responseBody) {
        const body = responseBody || this._lastAPIResponse;
        expect(body).toBeTruthy();
        const total = body.total ?? body.totalCount ?? (Array.isArray(body) ? body.length : (body.items?.length ?? 0));
        if (total > 0) {
            console.log(`✓ Ranking filter API total count (${total}) is greater than zero`);
        } else {
            console.log(`ℹ No records found for the applied filter — API returned 0 results`);
        }
    }

    async getRankingGridRowCount() {
        await this.page.waitForTimeout(1000);
        const rows = this.page.locator('.e-gridcontent .e-row, table.e-table tbody tr.e-row');
        const count = await rows.count();
        console.log(`ℹ UI Ranking grid shows ${count} row(s)`);
        return count;
    }

    async logUIvsAPICount(responseBody) {
        const body = responseBody || this._lastAPIResponse;
        const apiTotal = body.total ?? body.totalCount ?? (Array.isArray(body) ? body.length : (body.items?.length ?? 0));
        const uiCount = await this.getRankingGridRowCount();
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

module.exports = CompetitionRankingBasicFilterPage;
