/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

class UserManagementBasicFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // Filter dialog (slide-in panel) — same pattern as PersonFunctionBasicFilterPage
        this.filterDialog = page.locator('[cssclass="right-slide-dialog"]');

        // Apply / Reset buttons scoped inside the filter dialog
        this.filterApplyButton  = page.locator('[cssclass="right-slide-dialog"] button:has-text("Apply")');
        this.filterResetButton  = page.locator('[cssclass="right-slide-dialog"] button:has-text("Reset")');

        // API response promise
        this.userManagementResponsePromise = null;
        this._cachedAPIBody = null;
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION
    // ─────────────────────────────────────────────────────────────────

    async openUserManagementFilter() {
        // Filter icon button on the user management listing page
        const filterBtn = this.page.locator(
            'button:has(span[style*="filter.svg"]), button[aria-label*="filter" i], button.filter-button'
        ).first();
        await filterBtn.waitFor({ state: 'visible', timeout: 15000 });
        await filterBtn.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Opened User Management filter dialog');
    }

    async verifyFilterDialogVisible() {
        await this.filterApplyButton.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ User Management filter dialog is displayed');
    }

    // ─────────────────────────────────────────────────────────────────
    // SEARCH
    // ─────────────────────────────────────────────────────────────────

    async searchUserManagement(searchText) {
        // Scope to filter dialog to avoid matching other inputs on the page
        const searchInput = this.filterDialog
            .locator('input[type="text"], ejs-autocomplete input, input.e-input')
            .first();
        await searchInput.waitFor({ state: 'visible', timeout: 15000 });
        await searchInput.clear();
        // pressSequentially triggers autocomplete events that fill() bypasses
        await searchInput.pressSequentially(searchText, { delay: 80 });
        await this.page.waitForTimeout(600);
        console.log(`✓ Entered search text "${searchText}" in User Management filter`);
    }

    async selectFirstUserManagementSearchSuggestion() {
        // Wait for autocomplete suggestion list
        const suggestionList = this.page.locator(
            '.e-autocomplete-popup .e-list-item, ' +
            '.e-popup-open .e-list-item, ' +
            '[id*="autocomplete"] .e-list-item, ' +
            'div.e-dropdownbase .e-list-item'
        );
        try {
            await suggestionList.first().waitFor({ state: 'visible', timeout: 8000 });
            const count = await suggestionList.count();
            console.log(`✓ User Management search dropdown has ${count} suggestion(s)`);
            await suggestionList.first().click({ force: true });
            console.log('✓ Selected first suggestion from User Management search dropdown');
        } catch (e) {
            console.warn('⚠ No autocomplete suggestion popup appeared — continuing with typed text');
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // BADGE / STATUS CLICK
    // ─────────────────────────────────────────────────────────────────

    async _clickBadge(value) {
        const badge = this.page.locator(
            `button:has-text("${value}"), span.badge:has-text("${value}"), .filter-badge:has-text("${value}")`
        ).first();
        await badge.waitFor({ state: 'visible', timeout: 8000 });
        await badge.click();
        console.log(`✓ Selected badge: "${value}"`);
    }

    // ─────────────────────────────────────────────────────────────────
    // DROPDOWN SELECT
    // ─────────────────────────────────────────────────────────────────

    async _selectDropdownOption(fieldLabel, value) {
        // Scope to the dialog CONTENT area only (excludes overlay and grid behind it)
        const dialogContent = this.page.locator(
            '.e-dlg-container.right-slide-dialog .e-dlg-content, [cssclass="right-slide-dialog"] .e-dlg-content'
        ).first();
        await dialogContent.waitFor({ state: 'visible', timeout: 10000 });

        // Find the field label then its sibling control — scoped inside dialog content
        const container = dialogContent.locator(
            `xpath=.//*[normalize-space()='${fieldLabel}']/following-sibling::*[1] | .//*[normalize-space()='${fieldLabel}']/parent::*/following-sibling::*[1]`
        ).first();
        await container.waitFor({ state: 'visible', timeout: 8000 });

        const inputArea = container.locator('input.e-input, .e-multi-select-wrapper, .e-dropdownlist, .e-control').first();
        const inputVisible = await inputArea.isVisible().catch(() => false);
        if (inputVisible) {
            await inputArea.click();
        } else {
            await container.click();
        }
        await this.page.waitForTimeout(400);

        // Wait for popup — MultiSelect or DropDownList
        const multiSelectPopup = this.page.locator('div.e-multi-select-list-wrapper.e-popup-open');
        const anyPopupItems    = this.page.locator('div.e-popup-open .e-list-item');

        const isMultiSelect = await multiSelectPopup.isVisible().catch(() => false);
        let popup = null;
        if (isMultiSelect) {
            popup = multiSelectPopup;
        } else {
            await anyPopupItems.first().waitFor({ state: 'visible', timeout: 10000 });
            popup = this.page.locator('div.e-popup-open').first();
        }

        // Filter search within popup
        const searchBox = popup.locator('input.e-input-filter, input.e-filter-wrap-focus');
        const hasSearch = await searchBox.isVisible().catch(() => false);
        if (hasSearch) {
            await searchBox.fill(value);
            await this.page.waitForTimeout(400);
        }

        // Exact match first, then fallback
        const escaped    = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const listItems  = popup.locator('.e-list-item');
        const exactItem  = listItems.filter({ hasText: new RegExp(`^\\s*${escaped}\\s*$`) }).first();
        const exactVisible = await exactItem.isVisible().catch(() => false);

        if (exactVisible) {
            await exactItem.click();
        } else {
            const count = await listItems.count();
            let clicked = false;
            for (let i = 0; i < count; i++) {
                const text = (await listItems.nth(i).innerText().catch(() => '')).trim();
                if (text.toLowerCase() === value.toLowerCase()) {
                    await listItems.nth(i).click();
                    clicked = true;
                    break;
                }
            }
            if (!clicked) {
                await listItems.filter({ hasText: value }).first().click();
            }
        }

        const stillOpen = await this.page.locator('div.e-popup-open').isVisible().catch(() => false);
        if (stillOpen) await this.page.keyboard.press('Escape');

        console.log(`✓ Selected "${value}" for field "${fieldLabel}"`);
    }

    // ─────────────────────────────────────────────────────────────────
    // AGE RANGE (e-numerictextbox spinbutton inputs)
    // ─────────────────────────────────────────────────────────────────

    async applyAgeRangeFilter(minAge, maxAge) {
        // Use this.filterDialog directly — already scoped to the dialog
        await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });

        const minInput = this.filterDialog.locator('input[placeholder="Min Value"]').first();
        const maxInput = this.filterDialog.locator('input[placeholder="Max Value"]').first();

        await minInput.waitFor({ state: 'visible', timeout: 8000 });
        await minInput.click({ clickCount: 3 });
        await minInput.fill(String(minAge));
        await this.page.keyboard.press('Tab');

        await maxInput.waitFor({ state: 'visible', timeout: 8000 });
        await maxInput.click({ clickCount: 3 });
        await maxInput.fill(String(maxAge));
        await this.page.keyboard.press('Tab');

        console.log(`✓ Set Age Range: Min=${minAge}, Max=${maxAge}`);
    }

    // ─────────────────────────────────────────────────────────────────
    // STATUS FILTER (inline checkbox list inside the dialog)
    // Reset clears the default Active pre-selection. Then the
    // requested value is selected from the always-visible list.
    // ─────────────────────────────────────────────────────────────────

    async selectStatusFilter(value) {
        const dialogContent = this.page.locator(
            '.e-dlg-container.right-slide-dialog .e-dlg-content, [cssclass="right-slide-dialog"] .e-dlg-content'
        ).first();
        await dialogContent.waitFor({ state: 'visible', timeout: 10000 });

        // Status options may be an inline checkbox list (always visible) OR a popup dropdown.
        // Try inline first: look for checkbox items labelled Active / Inactive inside the dialog.
        const inlineItems = dialogContent.locator(
            'mat-checkbox, .e-checkbox-wrapper, label:has(input[type="checkbox"]), ' +
            '.e-list-item, li'
        );

        // Check if a popup opens after clicking the status field
        const statusContainer = dialogContent.locator(
            `xpath=.//*[normalize-space()='Status']/following-sibling::*[1] | .//*[normalize-space()='Status']/parent::*/following-sibling::*[1]`
        ).first();
        const containerExists = await statusContainer.isVisible().catch(() => false);
        if (containerExists) {
            const inputArea = statusContainer.locator('input.e-input, .e-multi-select-wrapper, .e-dropdownlist, .e-control').first();
            const inputVisible = await inputArea.isVisible().catch(() => false);
            if (inputVisible) await inputArea.click();
            else await statusContainer.click();
            await this.page.waitForTimeout(500);
        }

        // Check if a popup opened
        const popupVisible = await this.page.locator('div.e-popup-open').isVisible().catch(() => false);
        const itemsSource = popupVisible
            ? this.page.locator('div.e-popup-open .e-list-item')
            : inlineItems;

        // Click matching item by text
        const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const targetItem = itemsSource.filter({ hasText: new RegExp(`^\\s*${escaped}\\s*$`) }).first();
        const targetVisible = await targetItem.isVisible().catch(() => false);
        if (targetVisible) {
            await targetItem.click({ force: true });
        } else {
            const count = await itemsSource.count();
            for (let i = 0; i < count; i++) {
                const text = (await itemsSource.nth(i).innerText().catch(() => '')).trim();
                if (text.toLowerCase() === value.toLowerCase()) {
                    await itemsSource.nth(i).click({ force: true });
                    break;
                }
            }
        }

        if (popupVisible) await this.page.keyboard.press('Escape');
        console.log(`✓ Selected Status: "${value}"`);
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY FILTER CRITERIA (DataTable driven)
    // ─────────────────────────────────────────────────────────────────

    async applyFilterCriteria(filterCriteria) {
        for (const [field, value] of Object.entries(filterCriteria)) {
            switch (field) {
                case 'Status':
                    await this.selectStatusFilter(value);
                    break;
                case 'Gender':
                    // Gender uses badge buttons
                    await this._clickBadge(value);
                    break;
                default:
                    // Role, Region, Department, Tags — dropdowns
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
        console.log('✓ Clicked Apply on User Management filter dialog');
    }

    async clickReset() {
        const isOpen = await this.filterResetButton.isVisible().catch(() => false);
        if (!isOpen) return;
        await this.filterResetButton.click();
        console.log('✓ Clicked Reset on User Management filter dialog');
    }

    // ─────────────────────────────────────────────────────────────────
    // API CAPTURE
    // ─────────────────────────────────────────────────────────────────

    startCapturingUserManagementAPI() {
        this.userManagementResponsePromise = this.page.waitForResponse(
            r => r.url().toLowerCase().includes('user') &&
                 r.request().method() === 'POST' &&
                 r.status() === 200,
            { timeout: 90000 }
        );
        console.log('✓ Listening for User Management API response');
    }

    async awaitUserManagementAPIResponse() {
        const response = await this.userManagementResponsePromise;
        const body = await response.json();
        this._cachedAPIBody = body;
        const items = body.items ?? body.data ?? body.users ?? [];
        const total = body.total ?? body.totalCount ?? items.length;
        console.log(`\n========== User Management API Response ==========`);
        console.log(`Total: ${total}`);
        console.log(`Full Response Body (JSON):\n${JSON.stringify(body, null, 2)}`);
        console.log(`==================================================\n`);
        return body;
    }

    // ─────────────────────────────────────────────────────────────────
    // VALIDATION
    // ─────────────────────────────────────────────────────────────────

    async verifyAPITotalGreaterThanZero(apiBody) {
        const count = apiBody.total ?? apiBody.totalCount ?? apiBody.items?.length ?? apiBody.users?.length ?? 0;
        expect(count).toBeGreaterThan(0);
        console.log(`✓ User Management API total count is ${count} (greater than zero)`);
    }

    async verifyGridHasRecords() {
        let apiBody = this._cachedAPIBody;
        if (!apiBody && this.userManagementResponsePromise) {
            try {
                const response = await this.userManagementResponsePromise;
                apiBody = await response.json();
                this._cachedAPIBody = apiBody;
            } catch (e) {
                console.warn(`⚠ Could not read User Management API response: ${e.message}`);
            }
        }

        if (apiBody) {
            const items = apiBody.items ?? apiBody.data ?? apiBody.users ?? [];
            const total = apiBody.total ?? apiBody.totalCount ?? items.length;
            console.log(`\n========== User Management API Response ==========`);
            console.log(`Total: ${total}`);
            console.log(`Full Response Body (JSON):\n${JSON.stringify(apiBody, null, 2)}`);
            console.log(`==================================================\n`);
            expect(total).toBeGreaterThan(0);
            console.log(`✓ User Management API validation passed (${total} record(s) returned)`);
        } else {
            const rows = this.page.locator('.e-gridcontent tbody tr:not(.e-emptyrow)');
            await rows.first().waitFor({ state: 'visible', timeout: 15000 });
            const gridCount = await rows.count();
            expect(gridCount).toBeGreaterThan(0);
            console.log(`✓ User Management grid displays ${gridCount} record(s)`);
        }
    }
}

module.exports = UserManagementBasicFilterPage;
