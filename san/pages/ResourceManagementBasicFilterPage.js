/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

class ResourceManagementBasicFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // Navigation
        this.mainMenuButton        = page.locator('[data-mat-icon-name="gr_portal"]');
        this.resourceManagementTab = page.locator('[id="Resource Management"]');

        // Filter dialog — same slide-in pattern as other filter pages
        this.filterDialog      = page.locator('[cssclass="right-slide-dialog"]');
        this.filterApplyButton = page.locator('[cssclass="right-slide-dialog"] button:has-text("Apply")');
        this.filterResetButton = page.locator('[cssclass="right-slide-dialog"] button:has-text("Reset")');

        // API response promise
        this.resourceManagementResponsePromise = null;
        this._cachedAPIBody = null;
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION
    // ─────────────────────────────────────────────────────────────────

    async navigateToResourceManagement() {
        await this.resourceManagementTab.waitFor({ state: 'visible', timeout: 30000 });
        await this.resourceManagementTab.click();
        await this.page.waitForLoadState('networkidle');
        console.log('✓ Navigated to Resource Management page');
    }

    // ─────────────────────────────────────────────────────────────────
    // OPEN FILTER DIALOG
    // ─────────────────────────────────────────────────────────────────

    async openResourceManagementFilter() {
        const filterBtn = this.page.locator(
            'button:has(span[style*="filter.svg"]), button[aria-label*="filter" i], button.filter-button'
        ).first();
        await filterBtn.waitFor({ state: 'visible', timeout: 15000 });
        await filterBtn.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Opened Resource Management filter dialog');
    }

    async verifyFilterDialogVisible() {
        await this.filterApplyButton.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ Resource Management filter dialog is displayed');
    }

    // ─────────────────────────────────────────────────────────────────
    // SEARCH (autocomplete)
    // ─────────────────────────────────────────────────────────────────

    async searchResourceManagement(searchText) {
        const searchInput = this.filterDialog
            .locator('input[type="text"], ejs-autocomplete input, input.e-input')
            .first();
        await searchInput.waitFor({ state: 'visible', timeout: 15000 });
        await searchInput.clear();
        await searchInput.pressSequentially(searchText, { delay: 80 });
        await this.page.waitForTimeout(600);
        console.log(`✓ Entered search text "${searchText}" in Resource Management filter`);
    }

    async selectFirstResourceManagementSearchSuggestion() {
        const suggestionList = this.page.locator(
            '.e-autocomplete-popup .e-list-item, ' +
            '.e-popup-open .e-list-item, ' +
            '[id*="autocomplete"] .e-list-item, ' +
            'div.e-dropdownbase .e-list-item'
        );
        try {
            await suggestionList.first().waitFor({ state: 'visible', timeout: 8000 });
            const count = await suggestionList.count();
            console.log(`✓ Resource Management search dropdown has ${count} suggestion(s)`);
            await suggestionList.first().click({ force: true });
            console.log('✓ Selected first suggestion from Resource Management search dropdown');
        } catch (e) {
            console.warn('⚠ No autocomplete suggestion popup appeared — continuing with typed text');
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // BADGE CLICK (Status, Format)
    // ─────────────────────────────────────────────────────────────────

    async _clickBadge(value) {
        const badge = this.filterDialog.locator(
            `button:has-text("${value}"), span:has-text("${value}")`
        ).first();
        await badge.waitFor({ state: 'visible', timeout: 8000 });
        await badge.click();
        console.log(`✓ Selected badge: "${value}"`);
    }

    // ─────────────────────────────────────────────────────────────────
    // DROPDOWN SELECT (Venue Type, Federation, Surface Type, Pitch Type, Owner, Tags)
    // ─────────────────────────────────────────────────────────────────

    async _selectDropdownOption(fieldLabel, value) {
        await this.page.waitForTimeout(300);

        // Try multiple XPath strategies to find the field's control wrapper
        const xpathStrategies = [
            // multiselect (Owner, Tags)
            `//*[normalize-space(.)='${fieldLabel}']//following-sibling::app-multi-select//ejs-multiselect`,
            `//*[normalize-space(text())='${fieldLabel}']//following-sibling::app-multi-select//ejs-multiselect`,
            `//*[contains(text(),'${fieldLabel}')]//following-sibling::app-multi-select//ejs-multiselect`,
            `//label[normalize-space(.)='${fieldLabel}']/following::app-multi-select[1]//ejs-multiselect`,
            // single dropdownlist (Venue Type, Federation, Surface Type, Pitch Type)
            `//*[normalize-space(.)='${fieldLabel}']//following-sibling::*//ejs-dropdownlist`,
            `//*[normalize-space(text())='${fieldLabel}']//following-sibling::*//ejs-dropdownlist`,
            `//*[contains(text(),'${fieldLabel}')]//following-sibling::*//ejs-dropdownlist`,
            // generic: any control after the label
            `//*[normalize-space()='${fieldLabel}']/following-sibling::*[1]`,
            `//*[normalize-space()='${fieldLabel}']/parent::*/following-sibling::*[1]`,
        ];

        let wrapper = null;
        for (const xpath of xpathStrategies) {
            const candidate = this.page.locator(`xpath=${xpath}`).first();
            const cnt = await candidate.count();
            if (cnt > 0) {
                const visible = await candidate.isVisible().catch(() => false);
                if (visible) {
                    wrapper = candidate;
                    console.log(`✓ Found "${fieldLabel}" control with strategy: ${xpath}`);
                    break;
                }
            }
        }

        if (!wrapper) {
            // Scroll filter dialog down and retry
            const dialog = this.filterDialog;
            await dialog.evaluate(el => el.scrollTop = el.scrollHeight).catch(() => {});
            await this.page.waitForTimeout(400);
            for (const xpath of xpathStrategies) {
                const candidate = this.page.locator(`xpath=${xpath}`).first();
                const cnt = await candidate.count();
                if (cnt > 0) {
                    const visible = await candidate.isVisible().catch(() => false);
                    if (visible) {
                        wrapper = candidate;
                        break;
                    }
                }
            }
        }

        if (!wrapper) {
            throw new Error(`Could not locate control for field "${fieldLabel}" in Resource Management filter dialog`);
        }

        await wrapper.scrollIntoViewIfNeeded();
        // For Syncfusion multiselect, click on the inner wrapper input to open popup
        const msWrapper = wrapper.locator('.e-multi-select-wrapper, input.e-multiselect').first();
        const msWrapperVisible = await msWrapper.isVisible().catch(() => false);
        if (msWrapperVisible) {
            await msWrapper.click();
        } else {
            await wrapper.click();
        }
        await this.page.waitForTimeout(500);

        // Wait for popup to open
        const popup = this.page.locator('div.e-popup-open, ul.e-list-parent').last();
        await popup.waitFor({ state: 'visible', timeout: 10000 });

        // Filter using search box if present
        const searchBox = this.page.locator('input.e-input-filter, input.e-filter-wrap-focus').last();
        const hasSearch = await searchBox.isVisible().catch(() => false);
        if (hasSearch) {
            const firstWord = value.split(/[\s(]/)[0];
            await searchBox.fill(firstWord);
            await this.page.waitForTimeout(500);
        }

        // Find and click the matching item
        const listItems = popup.locator('li.e-list-item, .e-list-item');
        const count = await listItems.count();
        const normalizedTarget = value.trim().toLowerCase();
        let matched = false;

        for (let i = 0; i < count; i++) {
            const text = ((await listItems.nth(i).textContent()) ?? '').trim().toLowerCase();
            if (text === normalizedTarget || text.includes(normalizedTarget)) {
                await listItems.nth(i).click();
                matched = true;
                break;
            }
        }

        if (!matched) {
            // Fallback: hasText filter
            await listItems.filter({ hasText: value }).first().click();
        }

        // Allow Syncfusion to register the selection before closing
        await this.page.waitForTimeout(400);

        // Close the popup by clicking the multiselect wrapper itself (outside the list)
        // This is the most reliable way to commit a Syncfusion multiselect selection
        const popupStillOpen = await this.page.locator('div.e-popup-open').isVisible().catch(() => false);
        if (popupStillOpen) {
            const msInnerWrapper = wrapper.locator('.e-multi-select-wrapper').first();
            const msWrapperOk = await msInnerWrapper.isVisible().catch(() => false);
            if (msWrapperOk) {
                await msInnerWrapper.click();
            } else {
                await wrapper.click();
            }
        }
        await this.page.waitForTimeout(400);

        console.log(`✓ Selected "${value}" for field "${fieldLabel}"`);
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY FILTER CRITERIA (DataTable driven)
    // ─────────────────────────────────────────────────────────────────

    async applyFilterCriteria(filterCriteria) {
        for (const [field, value] of Object.entries(filterCriteria)) {
            switch (field) {
                case 'Status':
                case 'Format':
                    // Badge button selections
                    await this._clickBadge(value);
                    break;
                default:
                    // Venue Type, Federation, Surface Type, Pitch Type, Owner, Tags — dropdowns
                    await this._selectDropdownOption(field, value);
                    break;
            }
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY / RESET
    // ─────────────────────────────────────────────────────────────────

    async clickApply() {
        await this.filterApplyButton.waitFor({ state: 'visible', timeout: 8000 });
        await this.filterApplyButton.click();
        console.log('✓ Clicked Apply on Resource Management filter dialog');
    }

    async clickReset() {
        const isVisible = await this.filterResetButton.isVisible().catch(() => false);
        if (!isVisible) return;
        await this.filterResetButton.click();
        // Wait for Apply button to confirm dialog is still open and reset complete
        await this.filterApplyButton.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});
        await this.page.waitForTimeout(300);
        console.log('✓ Clicked Reset on Resource Management filter dialog');
    }

    // ─────────────────────────────────────────────────────────────────
    // API CAPTURE
    // ─────────────────────────────────────────────────────────────────

    startCapturingResourceManagementAPI() {
        this.resourceManagementResponsePromise = this.page.waitForResponse(
            r => r.url().toLowerCase().includes('/venue/get-venue') &&
                 r.request().method() === 'POST' &&
                 r.status() === 200,
            { timeout: 90000 }
        );
        console.log('✓ Listening for Resource Management API response');
    }

    async awaitResourceManagementAPIResponse() {
        const response = await this.resourceManagementResponsePromise;
        const body = await response.json();
        this._cachedAPIBody = body;
        const items = body.items ?? body.data ?? body.venues ?? [];
        const total = body.total ?? body.totalCount ?? items.length;
        console.log(`\n${'='.repeat(60)}`);
        console.log(`  RESOURCE MANAGEMENT API RESPONSE`);
        console.log(`${'='.repeat(60)}`);
        console.log(`  Total Count : ${total}`);
        console.log(`  URL         : ${response.url()}`);
        console.log(`  Status      : ${response.status()}`);
        console.log(`${'─'.repeat(60)}`);
        console.log(`  Full JSON Body:\n`);
        console.log(JSON.stringify(body, null, 2));
        console.log(`${'='.repeat(60)}\n`);
        return body;
    }

    // ─────────────────────────────────────────────────────────────────
    // VALIDATION
    // ─────────────────────────────────────────────────────────────────

    async verifyAPITotalGreaterThanZero(apiBody) {
        const count = apiBody.total ?? apiBody.totalCount ?? apiBody.items?.length ?? apiBody.venues?.length ?? 0;
        expect(count).toBeGreaterThan(0);
        console.log(`✓ Resource Management API total count is ${count} (greater than zero)`);
    }

    async verifyGridHasRecords() {
        let apiBody = this._cachedAPIBody;
        if (!apiBody && this.resourceManagementResponsePromise) {
            try {
                const response = await this.resourceManagementResponsePromise;
                apiBody = await response.json();
                this._cachedAPIBody = apiBody;
            } catch (e) {
                console.warn(`⚠ Could not read Resource Management API response: ${e.message}`);
            }
        }

        if (apiBody) {
            const items = apiBody.items ?? apiBody.data ?? apiBody.venues ?? [];
            const total = apiBody.total ?? apiBody.totalCount ?? items.length;
            console.log(`\n${'='.repeat(60)}`);
            console.log(`  RESOURCE MANAGEMENT API RESPONSE`);
            console.log(`${'='.repeat(60)}`);
            console.log(`  Total Count : ${total}`);
            console.log(`${'─'.repeat(60)}`);
            console.log(`  Full JSON Body:\n`);
            console.log(JSON.stringify(apiBody, null, 2));
            console.log(`${'='.repeat(60)}\n`);
            if (total === 0) {
                throw new Error(`Filter returned 0 records — expected matching records for the applied criteria`);
            } else {
                console.log(`✓ Resource Management API validation passed (${total} record(s) returned)`);
            }
        } else {
            const rows = this.page.locator('.e-gridcontent tbody tr:not(.e-emptyrow)');
            const gridCount = await rows.count();
            if (gridCount === 0) {
                throw new Error(`Filter returned 0 grid rows — expected matching records for the applied criteria`);
            } else {
                console.log(`✓ Resource Management grid displays ${gridCount} record(s)`);
            }
        }
    }
}

module.exports = ResourceManagementBasicFilterPage;
