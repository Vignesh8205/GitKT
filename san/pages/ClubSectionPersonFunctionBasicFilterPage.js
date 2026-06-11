
/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

class ClubSectionPersonFunctionBasicFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // Filter dialog (right-side slide panel)
        this.filterDialog = page.locator('[cssclass="right-slide-dialog"]');
        this.filterApplyButton = page.locator('[cssclass="right-slide-dialog"] button:has-text("Apply")');
        this.filterResetButton = page.locator('[cssclass="right-slide-dialog"] button:has-text("Reset")');

        // Person Function(s) tab on section detail page
        this.personFunctionTab = page.locator("//div[text()=' Person Function(s) ']");

        // Filter icon button on Person Function grid toolbar
        this.filterIconBtn = page.locator(
            "button:has(span[style*='filter.svg']), span[style*='filter.svg']"
        ).first();

        // Stored API capture
        this._apiResponsePromise = null;
        this._lastAPIResponse = null;
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION
    // ─────────────────────────────────────────────────────────────────

    /**
     * Navigate to the Person Function(s) tab on the section detail page.
     */
    async navigateToPersonFunctionTab() {
        await this.personFunctionTab.waitFor({ state: 'visible', timeout: 15000 });
        await this.personFunctionTab.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1000);
        console.log('✓ Navigated to Person Function(s) tab on section detail page');
    }

    // ─────────────────────────────────────────────────────────────────
    // OPEN FILTER DIALOG
    // ─────────────────────────────────────────────────────────────────

    async openFilterDialog() {
        const isOpen = await this.filterDialog.isVisible().catch(() => false);
        if (isOpen) {
            console.log('Filter dialog already open – skipping click');
            return;
        }

        // Strategy 1: filter icon near Person Function(s) heading
        const nearHeadingBtn = this.page.locator(
            "(//div[contains(normalize-space(),'Person Function')]" +
            "/following::button[.//span[contains(@style,'filter.svg')]] | " +
            "//div[contains(normalize-space(),'Person Function')]" +
            "/following::span[contains(@style,'filter.svg')])[1]"
        );
        const s1Visible = await nearHeadingBtn.isVisible().catch(() => false);
        if (s1Visible) {
            await nearHeadingBtn.click();
            await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
            console.log('✓ Opened filter dialog (near Person Function heading)');
            return;
        }

        // Fallback: first visible filter icon on page
        await this.filterIconBtn.waitFor({ state: 'visible', timeout: 10000 });
        await this.filterIconBtn.click();
        await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ Opened filter dialog (fallback first filter icon)');
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY FILTER CRITERIA
    // ─────────────────────────────────────────────────────────────────

    /**
     * Dispatch each filter field to the appropriate interaction method.
     * Supported keys: Search, Status, Level, Section Function, Team, Team Function, Date Range
     * @param {Record<string, string>} criteria
     */
    async applyFilterCriteria(criteria) {
        for (const [field, value] of Object.entries(criteria)) {
            if (!value || value.trim() === '') continue;
            switch (field) {
                case 'Search':
                    await this._fillSearchAutocomplete(value);
                    break;
                case 'Status':
                    await this._clickBadge(value);
                    break;
                case 'Level':
                    await this._clickBadge(value);
                    break;
                case 'Section Function':
                    await this._selectMultiSelect('Section Function', value);
                    break;
                case 'Team':
                    await this._selectMultiSelect('Team', value);
                    break;
                case 'Team Function':
                    await this._selectMultiSelect('Team Function', value);
                    break;
                case 'Date Range':
                    await this._fillDateRange(value);
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
     * Type into the AutoComplete search input (placeholder: "Search by person name"),
     * wait for the suggestion dropdown to appear, then click the matching item.
     * Uses force:true to click through the e-dlg-overlay that intercepts pointer events.
     * @param {string} value
     */
    async _fillSearchAutocomplete(value) {
        const input = this.filterDialog.locator(
            'input[placeholder="Search by person name"], ejs-autocomplete input'
        ).first();

        await input.waitFor({ state: 'visible', timeout: 10000 });
        await input.click();
        await input.clear();

        // Type character-by-character so EJ2 AutoComplete debounce fires
        await input.pressSequentially(value, { delay: 80 });
        console.log(`✓ Typed search text: "${value}"`);

        // Poll up to 10 s for suggestion popup to appear
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

        // Prefer item whose text contains the typed value; use force:true to bypass overlay
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
     * Click a badge button (Status or Level) inside the filter dialog.
     * Matches by visible text: "Active", "Inactive", "Section", "Team", etc.
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
     * Handles both CheckBox-mode multiselects and standard dropdowns.
     * Uses force:true to click through the dialog overlay if needed.
     * @param {string} fieldLabel  - visible label text (e.g. "Section Function", "Team")
     * @param {string} value       - option to select
     */
    async _selectMultiSelect(fieldLabel, value) {
        // Find the wrapper following the label inside the filter dialog
        const wrapper = this.filterDialog.locator(
            `//*[normalize-space()='${fieldLabel}']/following-sibling::*//div[contains(@class,'e-multi-select-wrapper')] | ` +
            `//*[normalize-space()='${fieldLabel}']/parent::*/following-sibling::*//div[contains(@class,'e-multi-select-wrapper')]`
        ).first();

        await wrapper.waitFor({ state: 'visible', timeout: 10000 });

        // Click the dropdown arrow icon to open popup
        const ddlIcon = wrapper.locator('span.e-ddl-icon, span.e-input-group-icon').first();
        const iconVisible = await ddlIcon.isVisible().catch(() => false);
        if (iconVisible) {
            await ddlIcon.click();
        } else {
            await wrapper.click();
        }
        await this.page.waitForTimeout(600);

        const popup = this.page.locator('div.e-popup-open').first();

        // Type in filter search box if available inside popup
        const filterInput = popup.locator('input.e-input-filter, input.e-filter-wrap-focus').first();
        const hasFilter = await filterInput.isVisible().catch(() => false);
        if (hasFilter) {
            await filterInput.fill(value);
        }

        // Poll for the matching item — API-backed dropdowns may take several seconds
        const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const listItems = popup.locator('li.e-list-item');

        let targetItem = null;
        for (let i = 0; i < 20; i++) {
            await this.page.waitForTimeout(500);
            const exactItem = listItems
                .filter({ hasText: new RegExp(`^\\s*${escaped}\\s*$`) })
                .first();
            if (await exactItem.isVisible().catch(() => false)) {
                targetItem = exactItem;
                break;
            }
            const partialItem = listItems.filter({ hasText: value }).first();
            if (await partialItem.isVisible().catch(() => false)) {
                targetItem = partialItem;
                break;
            }
        }

        if (!targetItem) {
            throw new Error(`Item "${value}" did not appear in "${fieldLabel}" dropdown after typing`);
        }
        await targetItem.click({ force: true });

        // Close popup if still open
        const stillOpen = await this.page.locator('div.e-popup-open').isVisible().catch(() => false);
        if (stillOpen) await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(300);

        console.log(`✓ Selected "${value}" for filter field "${fieldLabel}"`);
    }

    /**
     * Fill the EJ2 DateRangePicker via JS API with keyboard fallback.
     * Accepts format: "DD/MM/YYYY - DD/MM/YYYY" e.g. "01/04/2026 - 30/04/2026"
     * @param {string} rangeValue
     */
    async _fillDateRange(rangeValue) {
        const [startVal, endVal] = rangeValue.split(' - ').map(s => s.trim());

        const rangeInput = this.filterDialog.locator(
            'input[placeholder="DD/MM/YYYY - DD/MM/YYYY"], ' +
            'input[placeholder="Select Date Range"], ' +
            'ejs-daterangepicker input[placeholder*="DD"], ' +
            'input[placeholder*="DD/MM/YYYY"], ' +
            'ejs-daterangepicker input.e-input'
        ).first();
        await rangeInput.waitFor({ state: 'visible', timeout: 8000 });
        await rangeInput.click();
        await this.page.waitForTimeout(500);

        // Set dates via EJ2 JS API
        const result = await this.page.evaluate(({ start, end }) => {
            let inst = null;
            for (const host of document.querySelectorAll('ejs-daterangepicker')) {
                for (const i of (host.ej2_instances ?? [])) {
                    if (i && 'startDate' in i) { inst = i; break; }
                }
                if (inst) break;
            }
            if (!inst) return 'no-instance';

            const [sd, sm, sy] = start.split('/');
            const [ed, em, ey] = end.split('/');
            const sDate = new Date(+sy, +sm - 1, +sd);
            const eDate = new Date(+ey, +em - 1, +ed);

            inst.startDate = sDate;
            inst.endDate   = eDate;
            inst.value     = [sDate, eDate];
            inst.dataBind();
            try {
                inst.trigger('change', { value: [sDate, eDate], startDate: sDate, endDate: eDate });
            } catch (e) { /* ignore */ }
            return 'ok';
        }, { start: startVal, end: endVal });

        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(400);

        // Keyboard fallback if JS API did not populate the field
        const displayed = await rangeInput.inputValue().catch(() => '');
        const valid = displayed && !displayed.includes('DD') && displayed.trim() !== '';
        if (!valid) {
            console.warn(`⚠ JS API approach failed (result=${result}), using keyboard fallback`);
            await rangeInput.click();
            await this.page.keyboard.press('Control+A');
            await this.page.keyboard.press('Delete');
            await this.page.waitForTimeout(200);
            await rangeInput.pressSequentially(startVal, { delay: 80 });
            await this.page.keyboard.press('Tab');
            await this.page.waitForTimeout(200);
            await rangeInput.pressSequentially(endVal, { delay: 80 });
            await this.page.keyboard.press('Tab');
            await this.page.waitForTimeout(400);
        }

        const finalVal = await rangeInput.inputValue().catch(() => '');
        console.log(`✓ Date range set: "${rangeValue}" | displayed: "${finalVal}"`);
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY / RESET BUTTONS
    // ─────────────────────────────────────────────────────────────────

    async clickApply() {
        await this.filterApplyButton.waitFor({ state: 'visible', timeout: 8000 });
        await this.filterApplyButton.click();
        await this.page.waitForTimeout(1000);
        console.log('✓ Clicked Apply on Section Person Function filter dialog');
    }

    async clickReset() {
        await this.filterResetButton.waitFor({ state: 'visible', timeout: 8000 });
        await this.filterResetButton.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked Reset on Section Person Function filter dialog');
    }

    // ─────────────────────────────────────────────────────────────────
    // API – CAPTURE & PRINT
    // ─────────────────────────────────────────────────────────────────

    /**
     * Begin intercepting the section person function list API response.
     * Call BEFORE clicking Apply so the listener is registered in time.
     */
    startCapturingAPI() {
        this._apiResponsePromise = this.page.waitForResponse(
            (r) =>
                (r.url().toLowerCase().includes('function') ||
                    r.url().toLowerCase().includes('person')) &&
                r.url().toLowerCase().includes('list') &&
                r.request().method() === 'POST' &&
                r.status() === 200,
            { timeout: 90000 }
        );
        console.log('✓ Listening for section person function list API response');
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

        console.log('─────────────── SECTION PERSON FUNCTION API RESPONSE (JSON) ───────────────');
        console.log(JSON.stringify(body, null, 2));
        console.log('────────────────────────────────────────────────────────────────────────────');
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
        console.log(`✓ Section Person Function grid displays ${count} record(s) after filter`);
    }
}

module.exports = ClubSectionPersonFunctionBasicFilterPage;
