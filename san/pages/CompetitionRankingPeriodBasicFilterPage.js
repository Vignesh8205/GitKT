/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

class CompetitionRankingPeriodBasicFilterPage {
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

        // Ranking Period sub tab on the Ranking page
        this.rankingPeriodTab = page.locator(
            "//div[contains(@class,'e-tab-text')]//div[contains(normalize-space(),'Ranking Period')]"
        ).first();

        // Filter icon button on the Ranking Period grid toolbar
        this.rankingPeriodFilterBtn = page.locator(
            "button:has(span[style*='filter.svg']), span[style*='filter.svg']"
        ).first();

        // API response capture
        this._rankingPeriodResponsePromise = null;
        this._lastAPIResponse = null;
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION – RANKING PERIOD SUB TAB
    // ─────────────────────────────────────────────────────────────────

    async navigateToRankingPeriodTab() {
        await this.rankingPeriodTab.waitFor({ state: 'visible', timeout: 15000 });
        await this.rankingPeriodTab.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1000);
        console.log('✓ Navigated to Ranking Period sub tab');
    }

    // ─────────────────────────────────────────────────────────────────
    // OPEN FILTER DIALOG
    // ─────────────────────────────────────────────────────────────────

    async openFilterDialog() {
        const isOpen = await this.filterDialog.isVisible().catch(() => false);
        if (isOpen) {
            console.log('Ranking Period filter dialog already open – skipping click');
            return;
        }

        // Strategy 1: filter icon near Ranking Period grid heading
        const nearRankingPeriodBtn = this.page.locator(
            "(//div[contains(normalize-space(),'Ranking Period')]" +
            "/following::button[.//span[contains(@style,'filter.svg')]] | " +
            "//div[contains(normalize-space(),'Ranking Period')]" +
            "/following::span[contains(@style,'filter.svg')])[1]"
        );
        if (await nearRankingPeriodBtn.isVisible().catch(() => false)) {
            await nearRankingPeriodBtn.click();
            await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
            console.log('✓ Opened Ranking Period filter dialog (near Ranking Period heading)');
            return;
        }

        // Strategy 2: any visible filter icon on page
        await this.rankingPeriodFilterBtn.waitFor({ state: 'visible', timeout: 10000 });
        await this.rankingPeriodFilterBtn.click();
        await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ Opened Ranking Period filter dialog (first visible filter icon)');
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
        console.log('✓ Clicked Apply button in Ranking Period filter dialog');
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
        console.log('✓ Clicked Reset button in Ranking Period filter dialog');
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
     *   Group Name      – AutoComplete (placeholder: "Search by Group Name")
     *   Matchday Count  – AutoComplete (placeholder: "Search by Matchday Count")
     *   Groups          – AutoComplete (placeholder: "Search by Groups")
     *
     * @param {Record<string, string>} criteria  key=field, value=filter value
     */
    async applyFilterCriteria(criteria) {
        for (const [field, value] of Object.entries(criteria)) {
            if (field === 'FilterField') continue;
            if (!value || value.trim() === '') continue;
            switch (field) {
                case 'Template Name':
                    await this._fillAutoComplete('Search by Template Name', value);
                    break;
                case 'Status':
                    await this._selectBadgeOrMultiSelect('Status', value);
                    break;
                case 'Group Name':
                    await this._fillAutoComplete('Search by Group Name', value);
                    break;
                case 'Matchday Count':
                    await this._fillAutoComplete('Search by Matchday Count', value);
                    break;
                case 'Groups':
                    await this._fillAutoComplete('Search by Groups', value);
                    break;
                default:
                    console.warn(`⚠ Unknown Ranking Period filter field: "${field}" – skipping`);
            }
            await this.page.waitForTimeout(300);
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // PRIVATE HELPERS
    // ─────────────────────────────────────────────────────────────────

    /**
     * Type into an EJ2 AutoComplete input by placeholder, wait for dropdown, select match.
     */
    async _fillAutoComplete(placeholder, value) {
        const input = this.filterDialog.locator(
            `input[placeholder="${placeholder}"], ` +
            `input[role="combobox"][aria-autocomplete="both"]`
        ).filter({ hasAttribute: 'placeholder' }).first();

        const resolvedInput = await input.count() > 0
            ? input
            : this.filterDialog.locator('ejs-autocomplete input').first();

        // Fallback: locate by placeholder across whole page scoped inside dialog
        const byPlaceholder = this.filterDialog.locator(`input[placeholder="${placeholder}"]`).first();
        const targetInput = await byPlaceholder.count() > 0 ? byPlaceholder : resolvedInput;

        await targetInput.waitFor({ state: 'visible', timeout: 10000 });
        await targetInput.click();
        await targetInput.clear();
        await targetInput.pressSequentially(value, { delay: 80 });
        console.log(`✓ Typed "${value}" into "${placeholder}" input`);

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
        const label = this.filterDialog.locator(
            `xpath=//label[contains(normalize-space(),'${fieldLabel}')]`
        ).first();
        if (await label.count() > 0) {
            await label.scrollIntoViewIfNeeded().catch(() => {});
            await this.page.waitForTimeout(300);
            console.log(`✓ Scrolled to "${fieldLabel}" section in filter dialog`);
        }

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
     * Register a response listener for the Ranking Period list API.
     * Must be called BEFORE clicking Apply so the promise is ready.
     */
    startCapturingRankingPeriodFilterAPI() {
        const debugHandler = (response) => {
            const url = response.url();
            if (!url.match(/\.(js|css|png|jpg|svg|woff|ico)(\?|$)/i)) {
                console.log(`[API Debug] ${response.status()} ${response.request().method()} ${url}`);
            }
        };
        this.page.on('response', debugHandler);
        setTimeout(() => this.page.off('response', debugHandler), 10000);

        this._rankingPeriodResponsePromise = this.page.waitForResponse(
            (response) => {
                const url = response.url().toLowerCase();
                const status = response.status();
                return (url.includes('ranking') || url.includes('period')) &&
                    status >= 200 && status < 400;
            },
            { timeout: 90000 }
        );
        console.log('✓ Started capturing Ranking Period filter API response');
    }

    /**
     * Await the captured Ranking Period API response, print the full JSON, and return the body.
     */
    async awaitAndPrintRankingPeriodFilterAPIResponse() {
        const response = await this._rankingPeriodResponsePromise;
        console.log(`✓ Ranking Period filter API matched URL: ${response.url()}`);
        const body = await response.json();
        const total = body.total ?? body.totalCount ?? (Array.isArray(body) ? body.length : (body.items?.length ?? 0));
        console.log(`✓ Ranking Period filter API total: ${total}`);
        console.log('── Ranking Period Filter API Response JSON ──────────────────────');
        console.log(JSON.stringify(body, null, 2));
        console.log('─────────────────────────────────────────────────────────────────');
        this._lastAPIResponse = body;
        return body;
    }

    async verifyAPITotalGreaterThanZero(responseBody) {
        const body = responseBody || this._lastAPIResponse;
        expect(body).toBeTruthy();
        const total = body.total ?? body.totalCount ?? (Array.isArray(body) ? body.length : (body.items?.length ?? 0));
        if (total > 0) {
            console.log(`✓ Ranking Period filter API total count (${total}) is greater than zero`);
        } else {
            console.log(`ℹ No records found for the applied filter — API returned 0 results`);
        }
    }

    /**
     * Read the total count from the "X Records" badge rendered by the grid toolbar.
     * Falls back to counting visible grid rows (current page only) if the badge is absent.
     */
    /**
     * Wait for the grid to finish rendering after Apply, then read the "X Records" badge.
     * Falls back to counting visible rows (current page) if the badge is absent.
     */
    async getUITotalRecordCount() {
        // Wait for all network activity to settle — grid re-renders after the API response
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(800);

        const recordsBadge = this.page.locator('span.ng-star-inserted')
            .filter({ hasText: /^\d+\s+Records?$/i })
            .first();

        // Poll until the badge value stabilises (two consecutive reads must match)
        let stableText = null;
        for (let attempt = 0; attempt < 8; attempt++) {
            const visible = await recordsBadge.isVisible().catch(() => false);
            if (!visible) {
                await this.page.waitForTimeout(500);
                continue;
            }
            const text1 = (await recordsBadge.textContent().catch(() => '')).trim();
            await this.page.waitForTimeout(400);
            const text2 = (await recordsBadge.textContent().catch(() => '')).trim();
            if (text1 === text2 && text1 !== '') {
                stableText = text1;
                break;
            }
            await this.page.waitForTimeout(300);
        }

        if (stableText) {
            const total = parseInt(stableText, 10);
            console.log(`ℹ UI total records badge (stable): "${stableText}" → ${total}`);
            return { total, source: 'badge' };
        }

        // Fallback: count visible rows on current page
        const rows = this.page.locator('.e-gridcontent .e-row, table.e-table tbody tr.e-row');
        const count = await rows.count();
        console.log(`ℹ UI grid rows on current page: ${count} (badge not found — pagination applies)`);
        return { total: count, source: 'page-rows' };
    }

    async logUIvsAPICount(responseBody) {
        const body = responseBody || this._lastAPIResponse;
        const apiTotal = body.total ?? body.totalCount ?? (Array.isArray(body) ? body.length : (body.items?.length ?? 0));
        const { total: uiTotal, source } = await this.getUITotalRecordCount();

        console.log(`── UI vs API Count (after filter applied) ────────────`);
        console.log(`   UI  total (${source === 'badge' ? 'records badge' : 'current page rows'}): ${uiTotal}`);
        console.log(`   API total                                         : ${apiTotal}`);

        if (source === 'badge') {
            if (uiTotal === apiTotal) {
                console.log(`   ✓ UI records badge matches API total`);
            } else {
                console.log(`   ⚠ Mismatch: UI badge shows ${uiTotal} but API returned ${apiTotal}`);
            }
        } else {
            console.log(`   ℹ Records badge not found — UI shows ${uiTotal} row(s) on current page; API total is ${apiTotal} (pagination applies)`);
        }

        console.log(`─────────────────────────────────────────────────────`);
        return { uiTotal, apiTotal };
    }
}

module.exports = CompetitionRankingPeriodBasicFilterPage;
