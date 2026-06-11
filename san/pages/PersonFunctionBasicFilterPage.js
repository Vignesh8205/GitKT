/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

class PersonFunctionFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // Filter dialog container (shared for all three function section dialogs)
        this.filterDialog = page.locator('[cssclass="right-slide-dialog"]');

        // Filter action buttons (scoped inside dialog)
        this.filterApplyButton = page.locator('[cssclass="right-slide-dialog"] button:has-text("Apply")');
        this.filterResetButton = page.locator('[cssclass="right-slide-dialog"] button:has-text("Reset")');

        // Person management listing – first row
        this.firstPersonRecord = page.locator(
            "//div[contains(@class,'e-gridcontent')]//table//tbody//tr[1]"
        ).first();

        // Functions tab on person detail
        this.functionsTab = page.locator(`//*[@role='tab'][.//*[normalize-space()='Functions']]`).first();

        // Grid content area inside each section
        this.clubFunctionGrid = page.locator(
            "//*[contains(normalize-space(),'Club Function')]/following::div[contains(@class,'e-gridcontent')][1]"
        );
        this.sectionFunctionGrid = page.locator(
            "//*[contains(normalize-space(),'Section Function')]/following::div[contains(@class,'e-gridcontent')][1]"
        );
        this.teamFunctionGrid = page.locator(
            "//*[contains(normalize-space(),'Team Function')]/following::div[contains(@class,'e-gridcontent')][1]"
        );

        // Stored API response promises (set at runtime)
        this.clubFunctionsResponsePromise = null;
        this.sectionFunctionsResponsePromise = null;
        this.teamFunctionsResponsePromise = null;
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION
    // ─────────────────────────────────────────────────────────────────

    async selectFirstPersonRecord() {
        await this.firstPersonRecord.waitFor({ state: 'visible', timeout: 15000 });
        await this.firstPersonRecord.click();
        console.log('✓ Selected first person record from listing page');
    }

    async navigateToFunctionsTab() {
        await this.functionsTab.waitFor({ state: 'visible', timeout: 15000 });
        await this.functionsTab.click();
        console.log('✓ Navigated to Functions tab');
    }

    // ─────────────────────────────────────────────────────────────────
    // FIND FILTER BUTTON – MULTI-STRATEGY
    // Tries each selector in order; returns first visible match.
    // ─────────────────────────────────────────────────────────────────

   async _findFilterButton(sectionName) {
    // Old selector (failing)
    // const filterBtn = this.page.locator(`...`);

    // New selector
    const filterBtn = this.page.locator('button:has(span[style*="filter.svg"])');
    
    if (await filterBtn.count() === 0) {
        throw new Error(`Cannot find filter button for section "${sectionName}"`);
    }
    return filterBtn;
}

    // ─────────────────────────────────────────────────────────────────
    // OPEN FILTER DIALOGS
    // ─────────────────────────────────────────────────────────────────

    async _openSectionFilter(regionName, sectionLabel) {
        const isOpen = await this.filterDialog.isVisible().catch(() => false);
        if (isOpen) {
            console.log(`${sectionLabel} filter dialog already open – skipping open click`);
            return;
        }
        const filterBtn = this.page
            .getByRole('region', { name: regionName })
            .locator('button:has(span[style*="filter.svg"])')
            .first();
        await filterBtn.waitFor({ state: 'visible', timeout: 10000 });
        await filterBtn.click();
        await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log(`✓ ${sectionLabel} filter dialog opened`);
    }

    async openClubFunctionFilter() {
        await this._openSectionFilter('Club Function(s)', 'Club Function');
    }

    async openSectionFunctionFilter() {
        await this._openSectionFilter('Section Function(s)', 'Section Function');
    }

    async openTeamFunctionFilter() {
        await this._openSectionFilter('Team Function(s)', 'Team Function');
    }

    // ─────────────────────────────────────────────────────────────────
    // VERIFY FILTER DIALOG VISIBLE
    // ─────────────────────────────────────────────────────────────────

    async verifyFilterDialogVisible(sectionLabel) {
        await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log(`✓ ${sectionLabel} filter dialog is displayed`);
    }

    // ─────────────────────────────────────────────────────────────────
    // SEARCH INSIDE FILTER DIALOG
    // ─────────────────────────────────────────────────────────────────

    async searchInFilterDialog(searchText) {
        const searchInput = this.filterDialog.locator('input[type="text"], ejs-autocomplete input').first();
        await searchInput.waitFor({ state: 'visible', timeout: 10000 });
        await searchInput.clear();
        await searchInput.click();
        await searchInput.pressSequentially(searchText, { delay: 80 });
        console.log(`✓ Entered search text "${searchText}" in filter dialog`);

        // Wait for the autocomplete suggestions popup to appear
        const suggestionList = this.page.locator([
            '.e-autocomplete-popup li.e-list-item',
            '.e-popup-open li.e-list-item',
            'div.e-dropdownbase li.e-list-item',
            'div[id$="_popup"] li.e-list-item'
        ].join(', '));

        let visible = false;
        for (let i = 0; i < 20; i++) {
            await this.page.waitForTimeout(500);
            visible = await suggestionList.first().isVisible().catch(() => false);
            if (visible) break;
        }

        if (visible) {
            const count = await suggestionList.count();
            console.log(`✓ Filter dialog search returned ${count} suggestion(s)`);
            
            // Prioritize matching text if available, otherwise click first
            const escaped = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const exactItem = suggestionList.filter({ hasText: new RegExp(`^\\s*${escaped}\\s*$`, 'i') }).first();
            
            if (await exactItem.isVisible().catch(() => false)) {
                await exactItem.click({ force: true, timeout: 5000 });
                console.log(`✓ Selected search suggestion exactly matching "${searchText}"`);
            } else {
                await suggestionList.first().click({ force: true, timeout: 5000 });
                console.log('✓ Selected first available suggestion from search dropdown');
            }
            
            // Wait for popup to close
            await this.page.waitForTimeout(500);
        } else {
            console.warn(`⚠ No autocomplete dropdown appeared for search text "${searchText}" — continuing without selection`);
        }
    }

    async selectFirstSectionFunctionSearchSuggestion() {
        const suggestionList = this.page.locator(
            '.e-autocomplete-popup .e-list-item, ' +
            '.e-popup-open .e-list-item, ' +
            '[id*="autocomplete"] .e-list-item, ' +
            'div.e-dropdownbase .e-list-item'
        );

        // Poll for suggestions — API-backed autocomplete may take several seconds
        let visible = false;
        for (let i = 0; i < 20; i++) {
            await this.page.waitForTimeout(500);
            visible = await suggestionList.first().isVisible().catch(() => false);
            if (visible) break;
        }
        if (!visible) {
            throw new Error('Autocomplete suggestion list did not appear after typing search text');
        }

        const count = await suggestionList.count();
        console.log(`✓ Section function search dropdown has ${count} suggestion(s)`);

        await suggestionList.first().click();
        console.log('✓ Selected first suggestion from section function search dropdown');
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY FILTER CRITERIA (DataTable driven)
    // ─────────────────────────────────────────────────────────────────

    async _clickStatusBadge(value) {
        const badge = this.filterDialog.locator(
            `button:has-text("${value}"), span:has-text("${value}")`
        ).first();
        await badge.waitFor({ state: 'visible', timeout: 8000 });
        await badge.click();
        console.log(`✓ Selected Status badge: ${value}`);
    }

    async _selectDropdownOption(fieldLabel, value) {
        // Locate the container scoped to the field label
        const container = this.filterDialog.locator(
            `//*[normalize-space()='${fieldLabel}']/following-sibling::*[1] | //*[normalize-space()='${fieldLabel}']/parent::*/following-sibling::*[1]`
        ).first();
        await container.waitFor({ state: 'visible', timeout: 8000 });

        // Click the input/wrapper to open the popup
        const inputArea = container.locator('input.e-input, .e-multi-select-wrapper, .e-dropdownlist, .e-control').first();
        const inputVisible = await inputArea.isVisible().catch(() => false);
        if (inputVisible) {
            await inputArea.click();
        } else {
            await container.click();
        }
        await this.page.waitForTimeout(400);

        // EJ2 MultiSelect popup
        const multiSelectPopup = this.page.locator('div.e-multi-select-list-wrapper.e-popup-open');
        // EJ2 DropDownList popup (any popup-open that has list items)
        const anyPopupItems = this.page.locator('div.e-popup-open .e-list-item');

        let popup = null;
        const isMultiSelect = await multiSelectPopup.isVisible().catch(() => false);
        if (isMultiSelect) {
            popup = multiSelectPopup;
        } else {
            // Wait for any EJ2 popup with list items
            await anyPopupItems.first().waitFor({ state: 'visible', timeout: 10000 });
            popup = this.page.locator('div.e-popup-open').first();
        }

        // Type in the search/filter box inside the popup if available
        const searchBox = popup.locator('input.e-input-filter, input.e-filter-wrap-focus');
        const hasSearch = await searchBox.isVisible().catch(() => false);
        if (hasSearch) {
            await searchBox.fill(value);
            await this.page.waitForTimeout(500);
        }

        // Escape special regex chars in value, then match exact list item text
        const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const listItems = popup.locator('.e-list-item');

        // Try exact match first (full text equals value)
        const exactOption = listItems.filter({ hasText: new RegExp(`^\\s*${escaped}\\s*$`) }).first();
        const exactVisible = await exactOption.isVisible().catch(() => false);
        if (exactVisible) {
            await exactOption.click();
        } else {
            // Fallback: first item whose text contains value (case-insensitive)
            const count = await listItems.count();
            let clicked = false;
            for (let i = 0; i < count; i++) {
                const item = listItems.nth(i);
                const text = (await item.innerText().catch(() => '')).trim();
                if (text.toLowerCase() === value.toLowerCase()) {
                    await item.click();
                    clicked = true;
                    break;
                }
            }
            if (!clicked) {
                await listItems.filter({ hasText: value }).first().click();
            }
        }

        // Close popup if still open
        const stillOpen = await this.page.locator('div.e-popup-open').isVisible().catch(() => false);
        if (stillOpen) await this.page.keyboard.press('Escape');

        console.log(`✓ Selected "${value}" for field "${fieldLabel}"`);
    }

    async _fillDateInput(fieldLabel, value) {
        const trimmedValue = value.trim();

        if (trimmedValue.includes(' - ')) {
            const [startVal, endVal] = trimmedValue.split(' - ').map(s => s.trim());
            // Check whether dialog has a combined range picker or two separate date inputs
            const hasRangePicker = await this.filterDialog.locator(
                'input[placeholder="DD/MM/YYYY - DD/MM/YYYY"], ' +
                'input[placeholder="Select Date Range"], ' +
                'ejs-daterangepicker input[placeholder*="DD"], ' +
                'input[placeholder*="DD/MM/YYYY"]'
            ).first().isVisible().catch(() => false);

            if (hasRangePicker) {
                await this._fillDateRangePickerInput(trimmedValue);
            } else {
                await this._fillSingleDateInput('from', startVal);
                await this._fillSingleDateInput('to', endVal);
            }
            console.log(`✓ Filled date range "${trimmedValue}" for field "${fieldLabel}"`);
        } else {
            const type = fieldLabel === 'End Date' ? 'to' : 'from';
            await this._fillSingleDateInput(type, trimmedValue);
            console.log(`✓ Filled date "${trimmedValue}" for field "${fieldLabel}"`);
        }
    }

    async _fillDateRangePickerInput(rangeValue) {
        const [startVal, endVal] = rangeValue.split(' - ').map(s => s.trim());

        const rangeInput = this.filterDialog.locator(
            'input[placeholder="DD/MM/YYYY - DD/MM/YYYY"], ' +
            'input[placeholder="Select Date Range"], ' +
            'ejs-daterangepicker input[placeholder*="DD"], ' +
            'input[placeholder*="DD/MM/YYYY"]'
        ).first();
        await rangeInput.waitFor({ state: 'visible', timeout: 12000 });

        // Step 1: Click to activate the component (opens calendar)
        await rangeInput.click();
        await this.page.waitForTimeout(500);

        // Step 2: Set value via EJ2 JS API AND trigger change event for Angular binding
        const result = await this.page.evaluate(({ start, end }) => {
            // Find EJ2 DateRangePicker instance (try all on page)
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

            // Trigger EJ2 change event so Angular wrapper picks up the new value
            try {
                inst.trigger('change', { value: [sDate, eDate], startDate: sDate, endDate: eDate });
            } catch (e) { /* ignore */ }

            const displayed = inst.element?.querySelector('input')?.value ?? '';
            return `ok|${displayed}`;
        }, { start: startVal, end: endVal });

        // Step 3: Tab out to close calendar and confirm — do NOT press Escape (it resets value)
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(400);

        // Step 4: Verify the input now shows the date — if not, fall back to keyboard
        const displayed = await rangeInput.inputValue().catch(() => '');
        const valid = displayed && !displayed.includes('DD') && !displayed.includes('MM') && displayed.trim() !== '';

        if (!valid) {
            console.warn(`⚠ JS API approach failed (result=${result}, displayed="${displayed}"), using keyboard fallback`);
            await rangeInput.click();
            await this.page.waitForTimeout(300);
            await this.page.keyboard.press('Control+A');
            await this.page.keyboard.press('Delete');
            await this.page.waitForTimeout(200);
            await rangeInput.pressSequentially(startVal, { delay: 80 });
            await this.page.waitForTimeout(200);
            await this.page.keyboard.press('Tab');
            await this.page.waitForTimeout(200);
            await rangeInput.pressSequentially(endVal, { delay: 80 });
            await this.page.keyboard.press('Tab');
            await this.page.waitForTimeout(400);
        }

        const finalVal = await rangeInput.inputValue().catch(() => '');
        console.log(`✓ Date range filled: "${startVal} - ${endVal}" | displayed: "${finalVal}" | result: ${result}`);
    }

    async _fillSingleDateInput(type, value) {
        let input = null;

        // Strategy 1: ejs-datepicker inputs inside the filter dialog
        const ejsInputs = this.filterDialog.locator('ejs-datepicker input, input.e-datepicker');
        const ejsCount = await ejsInputs.count().catch(() => 0);
        if (ejsCount > 0) {
            input = type === 'from' ? ejsInputs.first() : ejsInputs.last();
        }

        // Strategy 2: inputs with date placeholder inside the filter dialog
        if (!input) {
            const placeholderInputs = this.filterDialog.locator('input[placeholder*="DD"], input[placeholder*="YYYY"], input[placeholder*="yyyy"]');
            const phCount = await placeholderInputs.count().catch(() => 0);
            if (phCount > 0) {
                input = type === 'from' ? placeholderInputs.first() : placeholderInputs.last();
            }
        }

        // Strategy 3: page-level fallback
        if (!input) {
            const pageInputs = this.page.locator('input[placeholder*="DD"], input[placeholder*="YYYY"]');
            const pgCount = await pageInputs.count().catch(() => 0);
            if (pgCount > 0) {
                input = type === 'from' ? pageInputs.first() : pageInputs.last();
            }
        }

        if (!input) {
            throw new Error(`No date input found for type "${type}" with value "${value}"`);
        }

        await input.waitFor({ state: 'visible', timeout: 8000 });
        await input.scrollIntoViewIfNeeded();
        await input.click();
        await this.page.waitForTimeout(200);

        // Use evaluate to set value and trigger Syncfusion change events
        await input.evaluate((el, val) => {
            el.value = val;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            el.dispatchEvent(new Event('blur', { bubbles: true }));
        }, value);

        // Fallback: pressSequentially if evaluate didn't register
        const current = await input.inputValue().catch(() => '');
        if (!current || current === '') {
            await input.fill('');
            await input.pressSequentially(value, { delay: 60 });
        }

        await this.page.waitForTimeout(300);
    }

    async applyFilterCriteria(filterCriteria) {
        for (const [field, value] of Object.entries(filterCriteria)) {
            switch (field) {
                case 'Status':
                case 'Sportive Type':
                    await this._clickStatusBadge(value);
                    break;
                case 'Start Date':
                    await this._fillDateInput('Start Date', value);
                    break;
                case 'End Date':
                    await this._fillDateInput('End Date', value);
                    break;
                default:
                    await this._selectDropdownOption(field, value);
                    break;
            }
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY / RESET BUTTONS
    // ─────────────────────────────────────────────────────────────────

    async clickApply() {
        await this.filterApplyButton.waitFor({ state: 'visible', timeout: 8000 });
        await this.filterApplyButton.click();
        console.log('✓ Clicked Apply on filter dialog');
    }

    async clickReset() {
        const isOpen = await this.filterDialog.isVisible().catch(() => false);
        if (!isOpen) return;
        await this.filterResetButton.waitFor({ state: 'visible', timeout: 8000 });
        await this.filterResetButton.click();
        console.log('✓ Clicked Reset on filter dialog');
    }

    // ─────────────────────────────────────────────────────────────────
    // API RESPONSE CAPTURE
    // ─────────────────────────────────────────────────────────────────

    startCapturingClubFunctionsAPI() {
        this.clubFunctionsResponsePromise = this.page.waitForResponse(
            r => r.url().toLowerCase().includes('function') &&
                 (r.url().toLowerCase().includes('club') || r.url().toLowerCase().includes('list')) &&
                 r.request().method() === 'POST' &&
                 r.status() === 200,
            { timeout: 90000 }
        );
        console.log('✓ Listening for club functions API response');
    }

    startCapturingSectionFunctionsAPI() {
        this.sectionFunctionsResponsePromise = this.page.waitForResponse(
            r => r.url().toLowerCase().includes('function') &&
                 (r.url().toLowerCase().includes('section') || r.url().toLowerCase().includes('list')) &&
                 r.request().method() === 'POST' &&
                 r.status() === 200,
            { timeout: 90000 }
        );
        console.log('✓ Listening for section functions API response');
    }

    startCapturingTeamFunctionsAPI() {
        this.teamFunctionsResponsePromise = this.page.waitForResponse(
            r => r.url().toLowerCase().includes('function') &&
                 (r.url().toLowerCase().includes('team') || r.url().toLowerCase().includes('list')) &&
                 r.request().method() === 'POST' &&
                 r.status() === 200,
            { timeout: 90000 }
        );
        console.log('✓ Listening for team functions API response');
    }

    async awaitClubFunctionsAPIResponse() {
        const response = await this.clubFunctionsResponsePromise;
        const body = await response.json();
        console.log(`✓ Club functions API returned: ${JSON.stringify(body).slice(0, 100)}`);
        return body;
    }

    async awaitSectionFunctionsAPIResponse() {
        const response = await this.sectionFunctionsResponsePromise;
        const body = await response.json();
        console.log(`✓ Section functions API returned: ${JSON.stringify(body).slice(0, 100)}`);
        return body;
    }

    async awaitTeamFunctionsAPIResponse() {
        const response = await this.teamFunctionsResponsePromise;
        const body = await response.json();
        const items = body.items ?? body.data ?? [];
        const total = body.totalCount ?? body.total ?? items.length;
        console.log(`✓ Team functions API total: ${total}`);
        console.log(`✓ Team functions API records (JSON):\n${JSON.stringify(items, null, 2)}`);
        return body;
    }

    // ─────────────────────────────────────────────────────────────────
    // VALIDATION
    // ─────────────────────────────────────────────────────────────────

    async verifyAPITotalGreaterThanZero(apiBody) {
        const count = apiBody.totalCount ?? apiBody.total ?? apiBody.items?.length ?? 0;
        expect(count).toBeGreaterThan(0);
        console.log(`✓ API total count is ${count} (greater than zero)`);
    }

    async _verifyGridHasRecords(gridLocator, sectionLabel) {
        const rows = gridLocator.locator('tbody tr');
        await rows.first().waitFor({ state: 'visible', timeout: 15000 });
        const count = await rows.count();
        expect(count).toBeGreaterThan(0);
        console.log(`✓ ${sectionLabel} grid displays ${count} record(s)`);
    }

    async verifyClubFunctionGridHasRecords() {
        // Await the API response if it was captured before Apply was clicked
        let apiBody = null;
        if (this.clubFunctionsResponsePromise) {
            try {
                const response = await this.clubFunctionsResponsePromise;
                apiBody = await response.json();
            } catch (e) {
                console.warn(`⚠ Could not read club functions API response: ${e.message}`);
            }
        }

        // Print API records as JSON (source of truth)
        if (apiBody) {
            const items = apiBody.items ?? apiBody.data ?? [];
            const total = apiBody.total ?? items.length;
            console.log(`✓ Club functions API total: ${total}`);
            console.log(`✓ Club functions API records (JSON):\n${JSON.stringify(items, null, 2)}`);
            expect(total).toBeGreaterThan(0);
            console.log(`✓ Club functions API validation passed (${total} record(s) returned)`);
        } else {
            // Fallback to grid check when no API response is available
            const rows = this.clubFunctionGrid.locator('tbody tr:not(.e-emptyrow)');
            await rows.first().waitFor({ state: 'visible', timeout: 15000 });
            const gridCount = await rows.count();
            expect(gridCount).toBeGreaterThan(0);
            console.log(`✓ Club Function grid displays ${gridCount} record(s)`);
        }
    }

    // async verifyClubFunctionGridContainsName(searchText) {
    //     const rows = this.clubFunctionGrid.locator('tbody tr');
    //     await rows.first().waitFor({ state: 'visible', timeout: 15000 });
    //     const count = await rows.count();
    //     expect(count).toBeGreaterThan(0);
    //     const cellText = await this.clubFunctionGrid.locator('tbody tr td').allInnerTexts();
    //     const match = cellText.some(text => text.toLowerCase().includes(searchText.toLowerCase()));
    //     expect(match).toBeTruthy();
    //     console.log(`✓ Club Function grid contains "${searchText}"`);
    // }

    async verifyClubFunctionGridContainsName(searchText) {
        // Wait for at least one grid row to be visible (page-level, any grid)
        const anyRow = this.page.locator('.e-gridcontent tbody tr');
        await anyRow.first().waitFor({ state: 'visible', timeout: 20000 });

        // Only check the name column (first td) of each row
        // The grid splits "!!!!san1-34207" into name="!!!!san1" and RN="34207"
        // so we check if the search text contains (starts with) the name cell value
        const nameColumnCells = this.page.locator('.e-gridcontent tbody tr td:first-child');
        const nameCellTexts = await nameColumnCells.allInnerTexts();

        const match = nameCellTexts.some(cellText => {
            const normalized = cellText.trim();
            return normalized !== '' &&
                (searchText.toLowerCase().includes(normalized.toLowerCase()) ||
                 normalized.toLowerCase().includes(searchText.toLowerCase()));
        });

        if (!match) {
            throw new Error(`Expected name column to contain "${searchText}" but found: ${nameCellTexts.slice(0, 10).join(' | ')}`);
        }
        console.log(`✓ Club Function grid name column matched "${searchText}"`);
    }

    async verifyClubFunctionFiltersCleared() {
        const searchInput = this.filterDialog.locator('input[type="text"], ejs-autocomplete input').first();
        const isOpen = await this.filterDialog.isVisible().catch(() => false);
        if (isOpen) {
            const value = await searchInput.inputValue().catch(() => '');
            expect(value).toBe('');
        }
        console.log('✓ Club Function filters are cleared');
    }

    async verifySectionFunctionGridHasRecords() {
        // Await the API response if it was captured before Apply was clicked
        let apiBody = null;
        if (this.sectionFunctionsResponsePromise) {
            try {
                const response = await this.sectionFunctionsResponsePromise;
                apiBody = await response.json();
            } catch (e) {
                console.warn(`⚠ Could not read section functions API response: ${e.message}`);
            }
        }

        // Print API records as JSON (source of truth)
        if (apiBody) {
            const items = apiBody.items ?? apiBody.data ?? [];
            const total = apiBody.total ?? items.length;
            console.log(`✓ Section functions API total: ${total}`);
            console.log(`✓ Section functions API records (JSON):\n${JSON.stringify(items, null, 2)}`);
            expect(total).toBeGreaterThan(0);
            console.log(`✓ Section functions API validation passed (${total} record(s) returned)`);
        } else {
            // Fallback to grid check when no API response is available
            const rows = this.sectionFunctionGrid.locator(
                'tbody tr:not(.e-emptyrow)'
            );
            await rows.first().waitFor({ state: 'visible', timeout: 15000 });
            const gridCount = await rows.count();
            expect(gridCount).toBeGreaterThan(0);
            console.log(`✓ Section Function grid displays ${gridCount} record(s)`);
        }
    }

    async verifyTeamFunctionGridHasRecords() {
        // Await the API response if it was captured before Apply was clicked
        let apiBody = null;
        if (this.teamFunctionsResponsePromise) {
            try {
                const response = await this.teamFunctionsResponsePromise;
                apiBody = await response.json();
            } catch (e) {
                console.warn(`⚠ Could not read team functions API response: ${e.message}`);
            }
        }

        // Print API records as JSON (source of truth)
        if (apiBody) {
            const items = apiBody.items ?? apiBody.data ?? [];
            const total = apiBody.total ?? items.length;
            console.log(`✓ Team functions API total: ${total}`);
            console.log(`✓ Team functions API records (JSON):\n${JSON.stringify(items, null, 2)}`);
            expect(total).toBeGreaterThan(0);
            console.log(`✓ Team functions API validation passed (${total} record(s) returned)`);
        } else {
            // Fallback to grid check when no API response is available
            const rows = this.teamFunctionGrid.locator('tbody tr:not(.e-emptyrow)');
            await rows.first().waitFor({ state: 'visible', timeout: 15000 });
            const gridCount = await rows.count();
            expect(gridCount).toBeGreaterThan(0);
            console.log(`✓ Team Function grid displays ${gridCount} record(s)`);
        }
    }

    async selectFirstTeamFunctionSearchSuggestion() {
        // EJ2 AutoComplete popup can be appended to body with various container classes
        const suggestionList = this.page.locator([
            'div[id$="_popup"] li.e-list-item',
            'ul.e-ul li.e-list-item',
            '.e-autocomplete-popup li.e-list-item',
            '.e-popup-open li.e-list-item',
            'div.e-dropdownbase li.e-list-item'
        ].join(', '));

        // Wait up to 6 seconds — if no popup appears the field may be a plain text search
        const appeared = await suggestionList.first().waitFor({ state: 'visible', timeout: 6000 })
            .then(() => true)
            .catch(() => false);

        if (!appeared) {
            console.warn('⚠ No autocomplete dropdown appeared for team function search — continuing without selection');
            return;
        }

        const count = await suggestionList.count();
        console.log(`✓ Team function search dropdown has ${count} suggestion(s)`);

        // Use force:true to bypass actionability wait (popup items can be intercepted)
        const firstItem = suggestionList.first();
        await firstItem.click({ force: true, timeout: 10000 });
        await this.page.waitForTimeout(500);
        console.log('✓ Selected first suggestion from team function search dropdown');
    }
}

module.exports = PersonFunctionFilterPage;
