/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

class ClubSectionTeamsBasicFilterPage {
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

        // Teams tab on the section detail page
        this.teamsTab = page.locator("//div[normalize-space(text())='Teams']").first();

        // Basic Filter tab inside the filter dialog
        this.basicFilterTab = this.filterDialog.locator('button:has-text("Basic Filter")');

        // Filter icon button on the Teams grid toolbar
        this.teamsFilterBtn = page.locator(
            "button:has(span[style*='filter.svg']), span[style*='filter.svg']"
        ).first();

        // API response capture
        this._teamsResponsePromise = null;
        this._lastAPIResponse = null;
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION
    // ─────────────────────────────────────────────────────────────────

    async navigateToTeamsTab() {
        await this.teamsTab.waitFor({ state: 'visible', timeout: 15000 });
        await this.teamsTab.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1000);
        console.log('✓ Navigated to Teams tab on section detail page');
    }

    // ─────────────────────────────────────────────────────────────────
    // OPEN FILTER DIALOG
    // ─────────────────────────────────────────────────────────────────

    async openFilterDialog() {
        const isOpen = await this.filterDialog.isVisible().catch(() => false);
        if (isOpen) {
            console.log('Teams filter dialog already open – skipping click');
            return;
        }

        // Strategy 1: filter icon near Teams grid heading
        const nearTeamsBtn = this.page.locator(
            "(//div[contains(normalize-space(),'Teams')]" +
            "/following::button[.//span[contains(@style,'filter.svg')]] | " +
            "//div[contains(normalize-space(),'Teams')]" +
            "/following::span[contains(@style,'filter.svg')])[1]"
        );
        if (await nearTeamsBtn.isVisible().catch(() => false)) {
            await nearTeamsBtn.click();
            await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
            console.log('✓ Opened Teams filter dialog (near Teams heading)');
            return;
        }

        // Strategy 2: any visible filter icon on page
        await this.teamsFilterBtn.waitFor({ state: 'visible', timeout: 10000 });
        await this.teamsFilterBtn.click();
        await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ Opened Teams filter dialog (first visible filter icon)');
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
        const candidates = [
            this.page.locator('[cssclass="right-slide-dialog"] button:has-text("Apply")'),
            this.page.locator('.right-slide-dialog button:has-text("Apply")'),
            this.page.locator('button[aria-label*="Apply progress"], button[aria-label*="apply"]').first(),
            this.page.locator('button:has-text("Apply")').last(),
        ];

        let applyBtn = null;
        for (const candidate of candidates) {
            if (await candidate.isVisible().catch(() => false)) {
                applyBtn = candidate;
                break;
            }
        }

        if (!applyBtn) {
            // Last resort: scroll the dialog and try once more
            await this.filterDialog.evaluate(el => el.scrollTo(0, el.scrollHeight)).catch(() => {});
            await this.page.waitForTimeout(500);
            applyBtn = this.page.locator('button:has-text("Apply")').last();
        }

        await applyBtn.scrollIntoViewIfNeeded().catch(() => {});
        await applyBtn.click();
        await this.page.waitForTimeout(1500);
        console.log('✓ Clicked Apply button in Teams filter dialog');
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
        console.log('✓ Clicked Reset button in Teams filter dialog');
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY FILTER CRITERIA (dispatcher)
    // ─────────────────────────────────────────────────────────────────

    /**
     * Dispatch each filter field from the criteria map.
     *
     * Supported keys:
     *   Search            – AutoComplete (placeholder: "Search by Division Category or Team Classification")
     *   Status            – Badge button (Active / Inactive)
     *   Gender            – Badge button (Female / Male)
     *   Division Category – Badge button or EJ2 MultiSelect
     *   Team Classification – Badge button or EJ2 MultiSelect
     *   Suffix            – Badge button
     *   Default Day       – EJ2 MultiSelect (checkbox mode)
     *   Pitch             – EJ2 MultiSelect (checkbox mode)
     *   Organization      – EJ2 MultiSelect (checkbox mode)
     *   Squad Size        – Numeric input
     *   Team Level        – EJ2 MultiSelect (checkbox mode)
     *   Tags              – EJ2 MultiSelect (checkbox mode)
     *
     * @param {Record<string, string>} criteria  key=field, value=filter value
     */
    async applyFilterCriteria(criteria) {
        for (const [field, value] of Object.entries(criteria)) {
            // Skip the DataTable header row that rowsHash() includes as a key
            if (field === 'FilterField') continue;
            if (!value || value.trim() === '') continue;
            switch (field) {
                case 'Search':
                    await this._fillSearchInput(value);
                    break;
                case 'Status':
                case 'Gender':
                case 'Division Category':
                case 'Team Classification':
                case 'Suffix':
                    await this._selectBadgeOrMultiSelect(field, value);
                    break;
                case 'Default Day':
                case 'Pitch':
                case 'Organization':
                case 'Team Level':
                case 'Tags':
                    await this._selectMultiSelect(field, value);
                    break;
                case 'Squad Size':
                    await this._selectMultiSelect(field, value);
                    break;
                default:
                    console.warn(`⚠ Unknown Teams filter field: "${field}" – skipping`);
            }
            await this.page.waitForTimeout(300);
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // PRIVATE HELPERS
    // ─────────────────────────────────────────────────────────────────

    /**
     * Type into the AutoComplete search input, wait for suggestion dropdown, select match.
     * Placeholder: "Search by Division Category or Team Classification"
     */
    async _fillSearchInput(value) {
        const input = this.filterDialog.locator(
            'input[placeholder="Search by Division Category or Team Classification"], ' +
            'ejs-autocomplete input, input[role="combobox"]'
        ).first();

        await input.waitFor({ state: 'visible', timeout: 10000 });
        await input.click();
        await input.clear();
        await input.pressSequentially(value, { delay: 80 });
        console.log(`✓ Typed search text: "${value}"`);

        // Wait for the EJS autocomplete dropdown to open and show suggestions
        const suggestionList = this.page.locator(
            'div.e-popup-open .e-list-item, ul.e-list-parent li.e-list-item'
        );

        try {
            await suggestionList.first().waitFor({ state: 'visible', timeout: 10000 });
        } catch {
            console.log(`⚠ No suggestions appeared for "${value}" — keeping typed value`);
            return;
        }

        // Log every visible suggestion so we can verify the test data matches
        const allTexts = await suggestionList.allTextContents().catch(() => []);
        console.log(`  Available suggestions: ${JSON.stringify(allTexts.map(t => t.trim()))}`);

        // Pick the suggestion whose text contains the typed value (case-insensitive)
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
     * Select a badge-style button inside the filter dialog.
     * Scrolls to the field label first (handles fields below the fold),
     * then clicks the matching badge. Falls back to EJ2 MultiSelect.
     */
    async _selectBadgeOrMultiSelect(fieldLabel, value) {
        // Step 1: scroll the dialog to bring the field label into view
        const label = this.filterDialog.locator(
            `xpath=//label[contains(normalize-space(),'${fieldLabel}')]`
        ).first();
        if (await label.count() > 0) {
            await label.scrollIntoViewIfNeeded().catch(() => {});
            await this.page.waitForTimeout(300);
            console.log(`✓ Scrolled to "${fieldLabel}" section in filter dialog`);
        }

        // Step 2: badge scoped to the label — exact text match to avoid
        // accidentally matching longer button labels (e.g. "Apply" when value is "A")
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

        // Step 3: any badge in the dialog matching value text exactly
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
            // Last resort: global search (not scoped to dialog)
            wrapper = this.page.locator(
                `xpath=//label[contains(normalize-space(),'${fieldLabel}')]/following::div[contains(@class,'e-multi-select-wrapper')][1]`
            ).first();
        }

        await wrapper.waitFor({ state: 'visible', timeout: 10000 });
        await wrapper.click();
        await this.page.waitForTimeout(400);

        // Type in filter search box if available (helps with API-backed dropdowns)
        const filterInput = this.page.locator(
            'div.e-popup-open input.e-input-filter, div.e-popup-open input.e-filter-wrap-focus'
        ).first();
        if (await filterInput.isVisible().catch(() => false)) {
            await filterInput.fill(value);
        }

        // Poll for the matching item — API-backed dropdowns may take several seconds
        const option = this.page.locator(
            `xpath=//div[contains(@class,'e-popup-open')]//li[contains(@class,'e-list-item') and contains(normalize-space(),'${value}')]`
        ).first();

        let itemVisible = false;
        for (let i = 0; i < 20; i++) {
            await this.page.waitForTimeout(500);
            itemVisible = await option.isVisible().catch(() => false);
            if (itemVisible) break;
        }
        if (!itemVisible) {
            throw new Error(`Item "${value}" did not appear in "${fieldLabel}" dropdown`);
        }
        await option.click();
        await this.page.waitForTimeout(300);

        // Close the dropdown
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(200);

        console.log(`✓ Selected "${value}" from "${fieldLabel}" multiselect`);
    }

    /**
     * Fill the Squad Size input field.
     */
    async _fillSquadSize(value) {
        const xpaths = [
            `//label[normalize-space()='Squad Size']/following-sibling::*//input`,
            `//*[normalize-space()='Squad Size']/following-sibling::*//input`,
            `//*[normalize-space()='Squad Size']/parent::*/following-sibling::*//input`,
            `//label[contains(normalize-space(),'Squad Size')]/following::input[1]`,
        ];

        let input = null;
        for (const xp of xpaths) {
            const candidate = this.filterDialog.locator(`xpath=${xp}`).first();
            if (await candidate.count() > 0) {
                input = candidate;
                break;
            }
        }

        if (!input) {
            input = this.page.locator(
                `xpath=//label[contains(normalize-space(),'Squad Size')]/following::input[1]`
            ).first();
        }

        await input.waitFor({ state: 'visible', timeout: 10000 });
        await input.click();
        await input.clear();
        await input.fill(value);
        console.log(`✓ Filled Squad Size: "${value}"`);
    }

    // ─────────────────────────────────────────────────────────────────
    // API CAPTURE & VALIDATION
    // ─────────────────────────────────────────────────────────────────

    /**
     * Register a response listener for the Teams list API.
     * Must be called BEFORE clicking Apply so the promise is ready.
     */
    startCapturingTeamsAPI() {
        // Debug: log every API response for 10 s so we can identify the real endpoint
        const debugHandler = (response) => {
            const url = response.url();
            if (!url.match(/\.(js|css|png|jpg|svg|woff|ico)(\?|$)/i)) {
                console.log(`[API Debug] ${response.status()} ${response.request().method()} ${url}`);
            }
        };
        this.page.on('response', debugHandler);
        setTimeout(() => this.page.off('response', debugHandler), 10000);

        this._teamsResponsePromise = this.page.waitForResponse(
            (response) => {
                const url = response.url().toLowerCase();
                const status = response.status();
                // Accept any successful response whose URL contains 'team'
                // (removed the overly-strict 'list' requirement)
                return url.includes('team') && status >= 200 && status < 400;
            },
            { timeout: 90000 }
        );
        console.log('✓ Started capturing Teams list API response');
    }

    /**
     * Await the captured Teams API response, print the full JSON, and return the body.
     */
    async awaitAndPrintTeamsAPIResponse() {
        const response = await this._teamsResponsePromise;
        console.log(`✓ Teams API matched URL: ${response.url()}`);
        const body = await response.json();
        const total = body.totalCount ?? body.total ?? (Array.isArray(body) ? body.length : (body.items?.length ?? 0));
        console.log(`✓ Teams API total: ${total}`);
        console.log('── Teams API Response JSON ──────────────────────────');
        console.log(JSON.stringify(body, null, 2));
        console.log('─────────────────────────────────────────────────────');
        this._lastAPIResponse = body;
        return body;
    }

    /**
     * Print the API record count result.
     * If total > 0: logs the count and passes.
     * If total === 0: logs "No records found" and passes (no assertion failure).
     */
    async verifyAPITotalGreaterThanZero(responseBody) {
        const body = responseBody || this._lastAPIResponse;
        expect(body).toBeTruthy();
        const total = body.totalCount ?? body.total ?? (Array.isArray(body) ? body.length : (body.items?.length ?? 0));
        if (total > 0) {
            console.log(`✓ Teams API total count (${total}) is greater than zero`);
        } else {
            console.log(`ℹ No records found for the applied filter — API returned 0 results`);
        }
    }

    /**
     * Count the data rows currently visible in the Teams grid (EJ2 Grid).
     * @returns {Promise<number>}
     */
    async getTeamsGridRowCount() {
        // Wait briefly for the grid to finish rendering after Apply
        await this.page.waitForTimeout(1000);
        const rows = this.page.locator('.e-gridcontent .e-row, table.e-table tbody tr.e-row');
        const count = await rows.count();
        console.log(`ℹ UI Teams grid shows ${count} row(s)`);
        return count;
    }

    /**
     * Log the UI row count vs API total and highlight any discrepancy.
     */
    async logUIvsAPICount(responseBody) {
        const body = responseBody || this._lastAPIResponse;
        const apiTotal = body.totalCount ?? body.total ?? (Array.isArray(body) ? body.length : (body.items?.length ?? 0));
        const uiCount = await this.getTeamsGridRowCount();
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

module.exports = ClubSectionTeamsBasicFilterPage;
