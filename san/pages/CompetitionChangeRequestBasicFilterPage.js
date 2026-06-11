
/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

class CompetitionChangeRequestBasicFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // Templates tree/menu item — <span class="e-list-text">Templates</span>
        this.templatesMenuItem = page.locator(
            "//span[contains(@class,'e-list-text') and normalize-space()='Templates']"
        ).first();

        // Change Request tree/menu item — <span class="e-list-text">Change Request</span>
        this.changeRequestTab = page.locator(
            "//span[contains(@class,'e-list-text') and normalize-space()='Change Request']"
        ).first();

        // Page title locator for "Change Request"
        this.changeRequestTitle = page.locator(
            "//h1[normalize-space()='Change Request'] | " +
            "//h2[normalize-space()='Change Request'] | " +
            "//div[contains(@class,'title') and normalize-space()='Change Request'] | " +
            "//span[contains(@class,'title') and normalize-space()='Change Request'] | " +
            "//*[contains(@class,'page-title') and normalize-space()='Change Request']"
        ).first();

        // Filter dialog (right-side slide panel)
        this.filterDialog = page.locator('[cssclass="right-slide-dialog"]');
        this.filterApplyButton = page.locator('[cssclass="right-slide-dialog"] button:has-text("Apply")');
        this.filterResetButton = page.locator('[cssclass="right-slide-dialog"] button:has-text("Reset")');

        // Stored API capture
        this._apiResponsePromise = null;
        this._lastAPIResponse = null;
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION
    // ─────────────────────────────────────────────────────────────────

    /**
     * Click the Templates tree menu item inside Competition Management.
     */
    async navigateToTemplatesMenuItem() {
        await this.templatesMenuItem.waitFor({ state: 'visible', timeout: 15000 });
        await this.templatesMenuItem.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1000);
        console.log('✓ Navigated to Templates menu item');
    }

    /**
     * Click the Change Request sub-tab inside Competition Management.
     */
    async navigateToChangeRequestTab() {
        await this.changeRequestTab.waitFor({ state: 'visible', timeout: 15000 });
        await this.changeRequestTab.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1000);
        console.log('✓ Navigated to Change Request sub tab');
    }

    /**
     * Verify the Change Request page title is visible.
     */
    async verifyChangeRequestTitle() {
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        // Flexible title check – accept any heading/label containing "Change Request"
        const titleLocator = this.page.locator(
            "//*[contains(normalize-space(),'Change Request') and (" +
            "self::h1 or self::h2 or self::h3 or " +
            "contains(@class,'title') or contains(@class,'heading') or contains(@class,'page-title')" +
            ")]"
        ).first();
        const titleVisible = await titleLocator.isVisible().catch(() => false);
        if (titleVisible) {
            console.log('✓ Change Request page title is visible');
        } else {
            // Fallback: just check any visible text containing "Change Request"
            const fallback = this.page.locator("//div[normalize-space()='Change Request']").first();
            await fallback.waitFor({ state: 'visible', timeout: 10000 });
            console.log('✓ Change Request title found (fallback locator)');
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // OPEN FILTER DIALOG
    // ─────────────────────────────────────────────────────────────────

    /**
     * Click the filter icon on the Change Request grid to open the filter panel.
     */
    async openFilterDialog() {
        const isOpen = await this.filterDialog.isVisible().catch(() => false);
        if (isOpen) {
            console.log('Filter dialog already open – skipping click');
            return;
        }

        // Strategy 1: filter icon near Change Request heading
        const nearHeading = this.page.locator(
            "(//div[contains(normalize-space(),'Change Request')]" +
            "/following::button[.//span[contains(@style,'filter.svg')]] | " +
            "//div[contains(normalize-space(),'Change Request')]" +
            "/following::span[contains(@style,'filter.svg')])[1]"
        );
        const s1Visible = await nearHeading.isVisible().catch(() => false);
        if (s1Visible) {
            await nearHeading.click();
            await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
            console.log('✓ Opened filter dialog (near Change Request heading)');
            return;
        }

        // Strategy 2: .no-border-box button (same as CompetitionConfigBasicFilterPage)
        const noBorderBtn = this.page.locator('.no-border-box').first();
        const s2Visible = await noBorderBtn.isVisible().catch(() => false);
        if (s2Visible) {
            await noBorderBtn.click();
            await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
            console.log('✓ Opened filter dialog (.no-border-box button)');
            return;
        }

        // Strategy 3: any visible filter icon
        const filterBtn = this.page.locator(
            'button:has(span[style*="filter.svg"]), span[style*="filter.svg"]'
        ).first();
        await filterBtn.waitFor({ state: 'visible', timeout: 10000 });
        await filterBtn.click();
        await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ Opened filter dialog (first visible filter icon)');
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY FILTER CRITERIA
    // ─────────────────────────────────────────────────────────────────

    /**
     * Dispatch each filter field to the appropriate interaction method.
     * Supported keys: Template Name, Status, Season, Federation, Region
     * @param {Record<string, string>} criteria
     */
    async applyFilterCriteria(criteria) {
        for (const [field, value] of Object.entries(criteria)) {
            if (!value || value.trim() === '') continue;
            switch (field) {
                case 'Template Name':
                    await this._fillSearchAutocomplete(value);
                    break;
                case 'Status':
                    await this._clickBadge(value);
                    break;
                case 'Season':
                    await this._selectMultiSelect('Season', value);
                    break;
                case 'Federation':
                    await this._selectMultiSelect('Federation', value);
                    break;
                case 'Region':
                    await this._selectMultiSelect('Region', value);
                    break;
                default:
                    console.warn(`⚠ Unknown filter field: "${field}" – skipping`);
            }
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // FILTER INTERACTIONS
    // ─────────────────────────────────────────────────────────────────

    /**
     * Type into the AutoComplete search input (placeholder: "Search by Template Name"),
     * wait for the suggestion dropdown, then click the matching item.
     * Uses force:true to bypass the e-dlg-overlay that intercepts pointer events.
     * @param {string} value
     */
    async _fillSearchAutocomplete(value) {
        const input = this.filterDialog.locator(
            'input[placeholder="Search by Template Name"], ejs-autocomplete input'
        ).first();

        await input.waitFor({ state: 'visible', timeout: 10000 });
        await input.click();
        await input.clear();

        // Type character-by-character to trigger EJ2 AutoComplete debounce
        await input.pressSequentially(value, { delay: 80 });
        console.log(`✓ Typed template name search: "${value}"`);

        // Poll up to 10 s for suggestion popup
        const suggestionList = this.page.locator(
            'div.e-popup-open .e-list-item, ul.e-list-parent li.e-list-item'
        );
        let suggestionsVisible = false;
        for (let i = 0; i < 20; i++) {
            await this.page.waitForTimeout(500);
            suggestionsVisible = await suggestionList.first().isVisible().catch(() => false);
            if (suggestionsVisible) break;
        }

        if (!suggestionsVisible) {
            console.log(`⚠ No suggestions appeared for "${value}" – using typed value as-is`);
            return;
        }

        // Click matching suggestion (force:true bypasses overlay)
        const matchingItem = suggestionList.filter({ hasText: value }).first();
        const matchVisible = await matchingItem.isVisible().catch(() => false);
        if (matchVisible) {
            await matchingItem.click({ force: true });
            console.log(`✓ Clicked suggestion matching "${value}"`);
        } else {
            const firstText = await suggestionList.first().textContent().catch(() => '');
            await suggestionList.first().click({ force: true });
            console.log(`✓ Clicked first suggestion: "${firstText.trim()}"`);
        }
    }

    /**
     * Click a Status badge button (Active | Inactive) inside the filter dialog.
     * @param {string} value
     */
    async _clickBadge(value) {
        const badge = this.filterDialog.locator(
            `button:has-text("${value}"), span.e-btn:has-text("${value}"), ` +
            `label:has-text("${value}"), div[class*="badge"]:has-text("${value}")`
        ).first();
        await badge.waitFor({ state: 'visible', timeout: 8000 });
        await badge.click();
        console.log(`✓ Clicked badge: "${value}"`);
    }

    /**
     * Generic EJ2 MultiSelect selector scoped to a filter field label.
     * Handles Season, Federation and Region multiselects.
     * Uses force:true to click through the dialog overlay if needed.
     * @param {string} fieldLabel  - visible label (e.g. "Season", "Federation", "Region")
     * @param {string} value       - option to select
     */
    async _selectMultiSelect(fieldLabel, value) {
        const wrapper = this.filterDialog.locator(
            `//*[normalize-space()='${fieldLabel}']/following-sibling::*//div[contains(@class,'e-multi-select-wrapper')] | ` +
            `//*[normalize-space()='${fieldLabel}']/parent::*/following-sibling::*//div[contains(@class,'e-multi-select-wrapper')]`
        ).first();

        await wrapper.waitFor({ state: 'visible', timeout: 10000 });

        // Open popup via dropdown icon
        const ddlIcon = wrapper.locator('span.e-ddl-icon, span.e-input-group-icon').first();
        const iconVisible = await ddlIcon.isVisible().catch(() => false);
        if (iconVisible) {
            await ddlIcon.click();
        } else {
            await wrapper.click();
        }
        await this.page.waitForTimeout(600);

        const popup = this.page.locator('div.e-popup-open').first();

        // Type in filter search box if available
        const filterInput = popup.locator('input.e-input-filter, input.e-filter-wrap-focus').first();
        const hasFilter = await filterInput.isVisible().catch(() => false);
        if (hasFilter) {
            await filterInput.fill(value);
            await this.page.waitForTimeout(500);
        }

        // Click exact match first, partial as fallback; force:true bypasses overlay
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
        console.log('✓ Clicked Apply on Change Request filter dialog');
    }

    async clickReset() {
        await this.filterResetButton.waitFor({ state: 'visible', timeout: 8000 });
        await this.filterResetButton.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked Reset on Change Request filter dialog');
    }

    // ─────────────────────────────────────────────────────────────────
    // API – CAPTURE & PRINT
    // ─────────────────────────────────────────────────────────────────

    /**
     * Begin intercepting the change request list API response.
     * Call BEFORE clicking Apply so the listener is registered in time.
     */
    startCapturingAPI() {
        this._apiResponsePromise = this.page.waitForResponse(
            (r) =>
                (r.url().toLowerCase().includes('change-request') ||
                    r.url().toLowerCase().includes('changerequest') ||
                    r.url().toLowerCase().includes('change_request')) &&
                r.url().toLowerCase().includes('list') &&
                r.request().method() === 'POST' &&
                r.status() === 200,
            { timeout: 90000 }
        );
        console.log('✓ Listening for change request list API response');
    }

    /**
     * Await the captured API response, store it, and pretty-print it as JSON.
     * @returns {Promise<object>}
     */
    async awaitAndPrintAPIResponse() {
        const response = await this._apiResponsePromise;
        const body = await response.json();
        this._apiResponsePromise = null;
        this._lastAPIResponse = body;

        console.log('─────────────── CHANGE REQUEST API RESPONSE (JSON) ───────────────');
        console.log(JSON.stringify(body, null, 2));
        console.log('──────────────────────────────────────────────────────────────────');
        return body;
    }

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
        console.log(`✓ Change Request grid displays ${count} record(s) after filter`);
    }
}

module.exports = CompetitionChangeRequestBasicFilterPage;
