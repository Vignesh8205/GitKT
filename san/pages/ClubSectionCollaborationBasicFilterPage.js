
/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

class ClubSectionCollaborationBasicFilterPage {
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

        // First row in sections grid (inside the Sections tab panel)
        this.firstSectionRow = page.locator(
            "//div[contains(@class,'e-gridcontent')]//table//tbody//tr[1]"
        ).first();

        // Collaboration tab on section detail page — tab text is " Collaborations "
        this.collaborationTab = page.locator(
            "//div[text()=' Collaborations ']"
        ).first();

        // Filter icon button on the Collaboration grid toolbar
        this.collaborationFilterBtn = page.locator(
            "button:has(span[style*='filter.svg']), " +
            "span[style*='filter.svg']"
        ).first();

        // Stored API capture
        this._collaborationResponsePromise = null;
        this._lastAPIResponse = null;
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION
    // ─────────────────────────────────────────────────────────────────

    /**
     * Click the first section record in the Sections tab grid to open its detail page.
     */
    async clickFirstSectionRecord() {
        await this.firstSectionRow.waitFor({ state: 'visible', timeout: 15000 });
        await this.firstSectionRow.click({ force: true });
        await this.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
        console.log('✓ Clicked first section record in the sections grid');
    }

    /**
     * Navigate to the Collaboration tab on the section detail page.
     */
    async navigateToCollaborationTab() {
        await this.collaborationTab.waitFor({ state: 'visible', timeout: 15000 });
        await this.collaborationTab.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1000);
        console.log('✓ Navigated to Collaboration tab');
    }

    // ─────────────────────────────────────────────────────────────────
    // OPEN FILTER DIALOG
    // ─────────────────────────────────────────────────────────────────

    /**
     * Click the filter icon on the Collaboration grid to open the basic filter panel.
     */
    async openFilterDialog() {
        const isOpen = await this.filterDialog.isVisible().catch(() => false);
        if (isOpen) {
            console.log('Filter dialog already open – skipping click');
            return;
        }

        // Strategy 1: filter icon near Collaboration heading
        const nearHeadingBtn = this.page.locator(
            "(//div[contains(normalize-space(),'Collaboration')]" +
            "/following::button[.//span[contains(@style,'filter.svg')]] | " +
            "//div[contains(normalize-space(),'Collaboration')]" +
            "/following::span[contains(@style,'filter.svg')])[1]"
        );
        const s1Visible = await nearHeadingBtn.isVisible().catch(() => false);
        if (s1Visible) {
            await nearHeadingBtn.click();
            await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
            console.log('✓ Opened filter dialog (strategy: near Collaboration heading)');
            return;
        }

        // Strategy 2: any visible filter icon on page
        await this.collaborationFilterBtn.waitFor({ state: 'visible', timeout: 10000 });
        await this.collaborationFilterBtn.click();
        await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ Opened filter dialog (strategy: first visible filter icon)');
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY FILTER CRITERIA
    // ─────────────────────────────────────────────────────────────────

    /**
     * Dispatch each filter field from the criteria map.
     * Supported keys: Search, Status, Division Category, Tags
     * @param {Record<string, string>} criteria
     */
    async applyFilterCriteria(criteria) {
        for (const [field, value] of Object.entries(criteria)) {
            if (!value || value.trim() === '') continue;
            switch (field) {
                case 'Search':
                    await this._fillSearchInput(value);
                    break;
                case 'Status':
                    await this._selectMultiSelect('Status', value);
                    break;
                case 'Division Category':
                    await this._selectMultiSelect('Division Category', value);
                    break;
                case 'Tags':
                    await this._selectMultiSelect('Tags', value);
                    break;
                default:
                    console.warn(`⚠ Unknown filter field: "${field}" – skipping`);
            }
        }
    }

    /**
     * Type into the AutoComplete search input inside the filter dialog,
     * wait for the suggestion dropdown, then click the first matching suggestion.
     * Placeholder: "Search by Section Name or Registration Number"
     * @param {string} value
     */
    async _fillSearchInput(value) {
        const input = this.filterDialog
            .locator(
                'input[placeholder="Search by Section Name or Registration Number"], ' +
                'ejs-autocomplete input, input[type="text"]'
            )
            .first();

        await input.waitFor({ state: 'visible', timeout: 10000 });
        await input.click();
        await input.clear();

        // Type character-by-character so the EJ2 AutoComplete debounce fires
        await input.pressSequentially(value, { delay: 80 });
        console.log(`✓ Typed search text: "${value}"`);

        // Poll up to 10 s for the EJ2 autocomplete popup to appear.
        // MUST use div.e-ddl.e-popup-open — sidebar navigation also uses e-list-item
        // and ul.e-list-parent, so without .e-ddl the locator matches the nav menu.
        const suggestionList = this.page.locator(
            'div.e-ddl.e-popup-open li.e-list-item:not(.e-disabled)'
        );
        let suggestionsVisible = false;
        for (let i = 0; i < 20; i++) {
            await this.page.waitForTimeout(500);
            suggestionsVisible = await suggestionList.first().isVisible().catch(() => false);
            if (suggestionsVisible) break;
        }

        if (!suggestionsVisible) {
            console.log(`⚠ No autocomplete suggestions appeared for "${value}" — using typed value as-is`);
            return;
        }

        // Prefer an item whose text contains the typed value
        const matchingItem = suggestionList.filter({ hasText: value }).first();

        const matchVisible = await matchingItem.isVisible().catch(() => false);
        if (matchVisible) {
            await matchingItem.click({ force: true });
            console.log(`✓ Clicked suggestion matching "${value}"`);
        } else {
            // Fallback: click the very first suggestion
            const firstText = await suggestionList.first().textContent().catch(() => '');
            await suggestionList.first().click({ force: true });
            console.log(`✓ Clicked first available suggestion: "${firstText.trim()}"`);
        }
    }

    /**
     * Generic EJ2 MultiSelect selector scoped to a filter field label inside the filter dialog.
     * @param {string} fieldLabel - visible label text (e.g. "Status", "Division Category", "Tags")
     * @param {string} value      - option text to select
     */
    async _selectMultiSelect(fieldLabel, value) {
        // Locate the multiselect wrapper following the label
        const wrapper = this.filterDialog.locator(
            `//*[normalize-space()='${fieldLabel}']/following-sibling::*//div[contains(@class,'e-multi-select-wrapper')] | ` +
            `//*[normalize-space()='${fieldLabel}']/parent::*/following-sibling::*//div[contains(@class,'e-multi-select-wrapper')]`
        ).first();

        await wrapper.waitFor({ state: 'visible', timeout: 10000 });

        // Click the dropdown icon to open the popup
        const ddlIcon = wrapper.locator('span.e-ddl-icon, span.e-input-group-icon').first();
        const iconVisible = await ddlIcon.isVisible().catch(() => false);
        if (iconVisible) {
            await ddlIcon.click();
        } else {
            await wrapper.click();
        }
        await this.page.waitForTimeout(600);

        // Get the popup
        const popup = this.page.locator('div.e-popup-open').first();

        // Type to filter inside popup if a filter input exists
        const filterInput = popup.locator('input.e-input-filter, input.e-filter-wrap-focus').first();
        const hasFilter = await filterInput.isVisible().catch(() => false);
        if (hasFilter) {
            await filterInput.fill(value);
            await this.page.waitForTimeout(500);
        }

        // Click the matching list item (exact first, then partial)
        const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const listItems = popup.locator('li.e-list-item');

        const exactItem = listItems
            .filter({ hasText: new RegExp(`^\\s*${escaped}\\s*$`) })
            .first();
        const exactVisible = await exactItem.isVisible().catch(() => false);

        if (exactVisible) {
            await exactItem.click({ force: true });
        } else {
            const partialItem = listItems.filter({ hasText: value }).first();
            await partialItem.waitFor({ state: 'visible', timeout: 8000 });
            await partialItem.click({ force: true });
        }

        // Close popup
        const stillOpen = await this.page.locator('div.e-popup-open').isVisible().catch(() => false);
        if (stillOpen) await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(300);

        console.log(`✓ Selected "${value}" for filter field "${fieldLabel}"`);
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY / RESET BUTTONS
    // ─────────────────────────────────────────────────────────────────

    async clickApply() {
        await this.filterApplyButton.waitFor({ state: 'visible', timeout: 8000 });
        await this.filterApplyButton.click();
        await this.page.waitForTimeout(1000);
        console.log('✓ Clicked Apply on Collaboration filter dialog');
    }

    async clickReset() {
        const isOpen = await this.filterDialog.isVisible().catch(() => false);
        if (!isOpen) return;
        await this.filterResetButton.waitFor({ state: 'visible', timeout: 8000 });
        await this.filterResetButton.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked Reset on Collaboration filter dialog');
    }

    // ─────────────────────────────────────────────────────────────────
    // API RESPONSE – CAPTURE & PRINT
    // ─────────────────────────────────────────────────────────────────

    /**
     * Begin listening for the collaboration list API response.
     * Call this BEFORE clicking Apply so the intercept is in place.
     */
    startCapturingCollaborationAPI() {
        this._collaborationResponsePromise = this.page.waitForResponse(
            (r) =>
                (r.url().toLowerCase().includes('collaboration') ||
                    r.url().toLowerCase().includes('section')) &&
                r.url().toLowerCase().includes('list') &&
                r.request().method() === 'POST' &&
                r.status() === 200,
            { timeout: 90000 }
        );
        console.log('✓ Listening for collaboration list API response');
    }

    /**
     * Await the captured API response, store it, and print it as formatted JSON.
     * @returns {Promise<object>} the parsed response body
     */
    async awaitAndPrintCollaborationAPIResponse() {
        const response = await this._collaborationResponsePromise;
        const body = await response.json();
        this._collaborationResponsePromise = null;
        this._lastAPIResponse = body;

        console.log('─────────────── COLLABORATION API RESPONSE (JSON) ───────────────');
        console.log(JSON.stringify(body, null, 2));
        console.log('─────────────────────────────────────────────────────────────────');
        return body;
    }

    /**
     * Assert that the last captured API response has a total count greater than zero.
     * @param {object} apiBody
     */
    async verifyAPITotalGreaterThanZero(apiBody) {
        const count = apiBody.total ?? apiBody.totalCount ?? apiBody.items?.length ?? 0;
        expect(count).toBeGreaterThan(0);
        console.log(`✓ API total count is ${count} (greater than zero)`);
    }

    // ─────────────────────────────────────────────────────────────────
    // GRID VERIFICATION
    // ─────────────────────────────────────────────────────────────────

    async verifyGridHasRecords() {
        const rows = this.page.locator(
            "//div[contains(@class,'e-gridcontent')]//table//tbody//tr"
        );
        await rows.first().waitFor({ state: 'visible', timeout: 15000 });
        const count = await rows.count();
        expect(count).toBeGreaterThan(0);
        console.log(`✓ Collaboration grid displays ${count} record(s) after filter`);
    }
}

module.exports = ClubSectionCollaborationBasicFilterPage;
