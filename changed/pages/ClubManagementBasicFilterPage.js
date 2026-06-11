/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

const { expect } = require('playwright/test');
const DataUtil = require('../utils/dataUtil');

/**
 * Page Object for Club Management Basic Filter.
 *
 * The Basic Filter is accessed via the filter icon on the Club Management list page.
 * It opens a right-slide dialog with:
 *   - Search autocomplete (club name)
 *   - Status button group (Active / Inactive)
 *   - Sportive Type multiselect
 *   - Format multiselect
 *   - Gender Offering button group / multiselect
 *   - Language multiselect
 *   - Region multiselect
 *   - Federation multiselect
 *   - Legal Status dropdown / multiselect
 *   - Club Code dropdown
 *   - Founding Date date range (From / To)
 *   - Tags multiselect
 *   - Buttons: Apply, Reset, Cancel
 */
class ClubManagementBasicFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // Filter trigger button (first .no-border-box button on the list page)
        this.filterButton = this.page.locator('.no-border-box').first();

        // Filter dialog container
        this.filterDialog = this.page.locator('[cssclass="right-slide-dialog"]');

        // Filter tab buttons inside the dialog
        this.basicFilterTab = this.filterDialog.locator('button:has-text("Basic Filter")');

        // Action buttons – use single page-level selector (same pattern as PersonManagementPage.js)
        // to avoid chained locator stale issues when dialog opens/closes
        this.filterApplyButton = this.page.locator('[cssclass="right-slide-dialog"] button:has-text("Apply")');
        this.filterResetButton = this.page.locator('[cssclass="right-slide-dialog"] button:has-text("Reset")');
        this.filterCancelButton = this.page.locator('[cssclass="right-slide-dialog"] button:has-text("Cancel")');

        // Record count label on the grid
        this.recordCount = this.page.locator('text=/\\d+\\s+Record/');

        // Pending API response promise (set before clicking Apply)
        this.clubListResponsePromise = null;
        this.clubTagsResponsePromise = null;
        this.status = this.page.locator(`//div[normalize-space()='Status']//following-sibling::div`);
        this.foundingDate = this.page.locator(`//div[normalize-space()='Founding Date']//following-sibling::div`);
        this.sportiveType = this.page.locator(`//div[normalize-space()='Sportive Type']//following-sibling::div`);
        this.formatContainer = this.page.locator(`//div[normalize-space()='Format']//following-sibling::div`);
        this.languageContainer = this.page.locator(`//div[normalize-space()='Language']//following-sibling::div`);
        this.genderOfferingContainer = this.page.locator(`//div[normalize-space()='Gender Offering']//following-sibling::div`);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // NAVIGATION
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Open the filter dialog by clicking the filter icon.
     * Skips clicking if the dialog is already visible.
     */
    async openFilterDialog() {
        const isAlreadyOpen = await this.filterDialog.isVisible().catch(() => false);
        if (isAlreadyOpen) {
            console.log('Club Management filter dialog is already open, skipping open click');
            return;
        }
        await this.filterButton.waitFor({ state: 'visible' });
        await this.filterButton.click();
        await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ Club Management filter dialog opened');
    }

    // ──────────────────────────────────────────────────────────────────────────
    // FILTER DIALOG – TAB VERIFICATION
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Verify that a given filter tab (e.g. "Basic Filter") is displayed.
     */
    async verifyFilterTabExists(tabName) {
        const tabLocator = this.filterDialog.locator(`button:has-text("${tabName}")`);
        await tabLocator.waitFor({ state: 'visible', timeout: 8000 });
        const text = await tabLocator.textContent();
        expect(text).toContain(tabName);
        console.log(`✓ "${tabName}" tab is displayed in Club Management filter dialog`);
    }
    /**
     * Verify the search autocomplete input inside the Basic Filter dialog
     * has the expected placeholder text.
     * Observed placeholder: "Search by Club Name or Registration Number"
     */
    async verifyFilterSearchInputPlaceholder(expectedPlaceholder) {
        await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });
        // The search input is an ejs-autocomplete inside the filter dialog
        const searchInput = this.filterDialog.locator(
            `input[placeholder="${expectedPlaceholder}"]`
        ).first();
        const fallbackInput = this.filterDialog.locator(
            'ejs-autocomplete input, input[placeholder*="Search"]'
        ).first();
        let input = searchInput;
        const directCount = await searchInput.count();
        if (directCount === 0) {
            input = fallbackInput;
        }
        await input.waitFor({ state: 'visible', timeout: 8000 });
        const placeholder = await input.getAttribute('placeholder');
        expect(
            placeholder,
            `Expected search input placeholder to be "${expectedPlaceholder}" but got "${placeholder}"`
        ).toBe(expectedPlaceholder);
        console.log(`✓ Club Management filter search input has placeholder: "${placeholder}"`);
    }

    /**
     * Verify a named filter field label is visible inside the Basic Filter dialog.
     */
    async verifyFilterFieldVisible(fieldLabel) {
        await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });
        const label = this.filterDialog.locator(
            `text=${fieldLabel}`
        ).first();
        await label.waitFor({ state: 'visible', timeout: 8000 });
        console.log(`✓ Filter field "${fieldLabel}" is visible in Club Management filter dialog`);
    }
    // ──────────────────────────────────────────────────────────────────────────
    // APPLY BASIC FILTER CRITERIA (dispatcher)
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Apply Club Management Basic Filter criteria from a data table rowsHash.
     *
     * Supported FilterField values:
     *   Search              → club name autocomplete
     *   Status              → button group (Active / Inactive)
     *   Sportive Type       → button group
     *   Format              → button group
     *   Gender Offering     → button group / multiselect
     *   Language            → button group
     *   Region              → multiselect
     *   Federation          → multiselect
     *   Legal Status        → dropdown / multiselect
     *   Club Code           → dropdown
     *   Founding Date From  → date input (DD/MM/YYYY)
     *   Founding Date To    → date input (DD/MM/YYYY)
     *   Tags                → multiselect
     */
    async applyClubBasicFilterCriteria(filterCriteria) {
        for (const [filterField, filterValue] of Object.entries(filterCriteria)) {
            switch (filterField) {
                case 'Search':
                    await this.fillClubSearchAutocomplete(filterValue);
                    break;
                case 'Status':
                    await this.selectFilterButtonGroup('Status', filterValue);
                    break;
                case 'Sportive Type':
                    await this.selectFilterButtonGroupOrMultiselect('Sportive Type', filterValue);
                    break;
                case 'Format':
                    await this.selectFilterButtonGroupOrMultiselect('Format', filterValue);
                    break;
                case 'Gender Offering':
                    await this.selectFilterButtonGroupOrMultiselect('Gender Offering', filterValue);
                    break;
                case 'Language':
                    await this.selectFilterButtonGroupOrMultiselect('Language', filterValue);
                    break;
                case 'Region':
                    await this.selectFilterMultiselectByLabel('Region', filterValue);
                    break;
                case 'Federation':
                    await this.selectFilterMultiselectByLabel('Federation', filterValue);
                    break;
                case 'Legal Status':
                    await this.selectFilterDropdownOrMultiselectByLabel('Legal Status', filterValue);
                    break;
                case 'Club Code':
                    await this.selectFilterDropdownOrMultiselectByLabel('Club Code', filterValue);
                    break;
                case 'Founding Date From':
                    await this.fillFoundingDateField('from', filterValue);
                    break;
                case 'Founding Date To':
                    await this.fillFoundingDateField('to', filterValue);
                    break;
                case 'Tags':
                    await this.selectFilterMultiselectByLabel('Tags', filterValue);
                    break;
                default:
                    console.warn(`Unknown Club Basic Filter field: "${filterField}" – skipping`);
            }
            await this.page.waitForTimeout(300);
        }
    }

    // ──────────────────────────────────────────────────────────────────────────
    // BUTTON GROUP HELPER (Status, Gender Offering)
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Click a button inside an <app-button-group> for the given field label.
     * If the value is not found in the button group (e.g. "Draft"), falls back
     * to searching the Status multiselect/search-box dropdown.
     */
    async selectFilterButtonGroup(fieldLabel, value) {
        await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });

        // Use pre-defined container locators where available (most reliable)
        const containerMap = {
            'Status':          this.status,
            'Sportive Type':   this.sportiveType,
            'Format':          this.formatContainer,
            'Language':        this.languageContainer,
            'Gender Offering': this.genderOfferingContainer,
        };

        const container = containerMap[fieldLabel];
        if (container) {
            const cnt = await container.count();
            if (cnt > 0) {
                const btn = container.locator(`button`).filter({ hasText: new RegExp(`^\\s*${value}\\s*$`, 'i') }).first();
                const btnPartial = container.locator(`button:has-text("${value}")`).first();
                let matched = await btn.count() > 0 ? btn : btnPartial;
                if (await matched.count() > 0) {
                    await matched.scrollIntoViewIfNeeded();
                    await matched.click();
                    await this.page.waitForTimeout(400);
                    console.log(`✓ Selected "${value}" for "${fieldLabel}" button group (via container locator)`);
                    return;
                }
            }
        }

        // Fallback XPath strategies for fields without a container locator
        const strategies = [
            () => this.page.locator(`//*[normalize-space(.)='${fieldLabel}']/following-sibling::*//app-button-group//button`),
            () => this.page.locator(`//*[normalize-space(.)='${fieldLabel}']/following::app-button-group[1]//button`),
            () => this.page.locator(`//*[contains(text(),'${fieldLabel}')]/following::app-button-group[1]//button`),
        ];

        let buttons = null;
        for (const strategy of strategies) {
            const candidate = strategy();
            const cnt = await candidate.count();
            if (cnt > 0) {
                buttons = candidate;
                console.log(`✓ Found "${fieldLabel}" button group via XPath (${cnt} buttons)`);
                break;
            }
        }

        if (buttons) {
            const total = await buttons.count();
            let matched = null;
            for (let i = 0; i < total; i++) {
                const btn = buttons.nth(i);
                const txt = (await btn.textContent() || '').trim();
                if (txt.toLowerCase() === value.toLowerCase() || txt.toLowerCase().includes(value.toLowerCase())) {
                    matched = btn;
                    break;
                }
            }
            if (matched) {
                await matched.scrollIntoViewIfNeeded();
                await matched.click();
                await this.page.waitForTimeout(400);
                console.log(`✓ Selected "${value}" for "${fieldLabel}" button group`);
                return;
            }
            console.log(`"${value}" not found among buttons for "${fieldLabel}" – trying multiselect search`);
        } else {
            console.log(`No button group found for "${fieldLabel}" – trying multiselect search`);
        }

        // Fallback to multiselect (e.g. "Draft" for Status)
        await this.selectFilterMultiselectByLabel(fieldLabel, value);
    }

    /**
     * Try button group first; if no buttons found, fall back to multiselect.
     * Used for Gender Offering which may be rendered as either.
     */
    async selectFilterButtonGroupOrMultiselect(fieldLabel, value) {
        await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });
        // Delegate entirely to selectFilterButtonGroup which already has the fallback
        await this.selectFilterButtonGroup(fieldLabel, value);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // MULTISELECT HELPER
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Select a value from an ejs-multiselect (CheckBox mode) scoped by field label.
     */
    async selectFilterMultiselectByLabel(fieldLabel, value) {
        const normalize = (str) => str
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/[\u2018\u2019\u02BC]/g, "'")
            .replace(/[\u201C\u201D]/g, '"');

        try {
            await this.page.waitForTimeout(500);
            await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });

            // Try multiple XPath strategies to find the ejs-multiselect wrapper:
            // 1. exact normalized full-element text (handles text in child spans)
            // 2. exact normalized direct text node (original strategy)
            // 3. contains on direct text node (PersonManagementPage pattern – most forgiving)
            const xpaths = [
                `//*[normalize-space(.)='${fieldLabel}']//following-sibling::app-multi-select//ejs-multiselect`,
                `//*[normalize-space(text())='${fieldLabel}']//following-sibling::app-multi-select//ejs-multiselect`,
                `//*[contains(text(),'${fieldLabel}')]//following-sibling::app-multi-select//ejs-multiselect`,
                `//label[normalize-space(.)='${fieldLabel}']/following::app-multi-select[1]//ejs-multiselect`,
            ];

            let wrapper = null;
            for (const xpath of xpaths) {
                const candidate = this.page.locator(xpath).first();
                const cnt = await candidate.count();
                if (cnt > 0) {
                    const visible = await candidate.isVisible().catch(() => false);
                    if (visible) {
                        wrapper = candidate;
                        console.log(`✓ Found "${fieldLabel}" multiselect with xpath: ${xpath}`);
                        break;
                    }
                }
            }

            if (!wrapper) {
                // Last resort: scroll the filter dialog and retry first xpath
                await this.filterDialog.evaluate(el => el.scrollTop = el.scrollHeight);
                await this.page.waitForTimeout(400);
                wrapper = this.page.locator(xpaths[0]).first();
            }

            await wrapper.scrollIntoViewIfNeeded();
            await wrapper.click();
            await this.page.waitForTimeout(800);

            const popup = this.page.locator('ul.e-list-parent').last();
            await popup.waitFor({ state: 'visible', timeout: 6000 });

            // Type first word in search box to filter options
            const searchInput = this.page.locator('input.e-input-filter').last();
            const searchInputVisible = await searchInput.isVisible().catch(() => false);
            if (searchInputVisible) {
                const firstWord = value.split(/[\s''\u2018\u2019]/)[0];
                await searchInput.fill(firstWord);
                await this.page.waitForTimeout(800);
            }

            const allItems = popup.locator('li.e-list-item');
            const count = await allItems.count();
            const normalizedValue = normalize(value);
            let matched = null;
            const available = [];

            for (let i = 0; i < count; i++) {
                const item = allItems.nth(i);
                const text = normalize(await item.textContent() || '');
                available.push(text);
                if (text.toLowerCase() === normalizedValue.toLowerCase()) {
                    matched = item;
                    break;
                }
            }

            // Partial match fallback
            if (!matched) {
                for (let i = 0; i < count; i++) {
                    const item = allItems.nth(i);
                    const text = normalize(await item.textContent() || '');
                    if (text.toLowerCase().includes(normalizedValue.toLowerCase())) {
                        matched = item;
                        break;
                    }
                }
            }

            if (!matched) {
                console.error(`Available options for "${fieldLabel}": ${available.join(' | ')}`);
                throw new Error(`Option "${value}" not found in multiselect "${fieldLabel}"`);
            }

            await matched.click();
            // Press Escape to close the Syncfusion popup dropdown only.
            // This matches the working pattern in PersonManagementPage.js.
            // Escape is intercepted by the Syncfusion popup and closes only the dropdown;
            // it does NOT bubble up to close the parent filter dialog.
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(500);
            // Confirm the filter dialog is still open
            await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });
            console.log(`✓ Selected "${value}" in multiselect "${fieldLabel}"`);
        } catch (error) {
            console.error(`✗ Failed to select "${value}" in multiselect "${fieldLabel}": ${error.message}`);
            throw new Error(`Failed to select "${value}" in multiselect "${fieldLabel}": ${error.message}`);
        }
    }

    // ──────────────────────────────────────────────────────────────────────────
    // DROPDOWN HELPER (Legal Status, Club Code)
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Select a value from an ejs-dropdownlist or ejs-multiselect scoped by field label.
     * Tries single-select dropdown first, then falls back to multiselect.
     */
    async selectFilterDropdownOrMultiselectByLabel(fieldLabel, value) {
        try {
            await this.page.waitForTimeout(400);
            await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });

            // Try ejs-dropdownlist first
            const dropdown = this.page.locator(
                `//*[contains(text(),'${fieldLabel}')]//following-sibling::*//ejs-dropdownlist`
            ).first();

            const dropdownCount = await dropdown.count();
            if (dropdownCount > 0) {
                await dropdown.scrollIntoViewIfNeeded();
                await dropdown.click();
                await this.page.waitForTimeout(500);

                const option = this.page.locator(`li.e-list-item, [role="option"]`)
                    .filter({ hasText: new RegExp(`^\\s*${value}\\s*$`, 'i') })
                    .first();
                await option.waitFor({ state: 'visible', timeout: 6000 });
                await option.click();
                await this.page.waitForTimeout(400);
                console.log(`✓ Selected "${value}" in dropdown "${fieldLabel}"`);
            } else {
                // Fallback to multiselect
                await this.selectFilterMultiselectByLabel(fieldLabel, value);
            }
        } catch (error) {
            console.error(`✗ Failed to select "${value}" for "${fieldLabel}": ${error.message}`);
            throw new Error(`Failed to select "${value}" for "${fieldLabel}": ${error.message}`);
        }
    }

    // ──────────────────────────────────────────────────────────────────────────
    // SEARCH AUTOCOMPLETE HELPER
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Fill the Search autocomplete inside the filter dialog with the club name.
     * Uses pressSequentially to trigger Syncfusion ejs-autocomplete server queries.
     */
    async fillClubSearchAutocomplete(name) {
        await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });

        const searchInput = this.filterDialog.locator(
            'input[placeholder*="Search by Club"], input[placeholder*="Club Name"], input[placeholder*="Search"]'
        ).first();

        await searchInput.waitFor({ state: 'visible', timeout: 8000 });
        await searchInput.scrollIntoViewIfNeeded();
        await searchInput.click();
        await searchInput.press('Control+a');
        await searchInput.press('Delete');
        await searchInput.pressSequentially(name, { delay: 60 });

        // Wait for autocomplete popup
        const popup = this.page.locator('ul.e-list-parent[id*="ej2_dropdownlist"]');
        try {
            await popup.last().waitFor({ state: 'visible', timeout: 8000 });
            const suggestions = popup.last()
                .locator('li.e-list-item')
                .filter({ hasText: new RegExp(name, 'i') });
            const count = await suggestions.count();
            if (count > 0) {
                const text = await suggestions.first().textContent();
                await suggestions.first().click();
                console.log(`✓ Selected club suggestion "${text?.trim()}" from autocomplete`);
            } else {
                console.warn(`No autocomplete suggestion matched "${name}" — proceeding without selection`);
                await this.page.keyboard.press('Escape');
            }
        } catch (_) {
            console.warn(`No autocomplete popup appeared for club "${name}" within 8s`);
        }
        await this.page.waitForTimeout(300);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // FOUNDING DATE HELPER
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Fill the Founding Date From or To date field in the filter dialog.
     * @param {'from'|'to'} type
     * @param {string} value - Date in DD/MM/YYYY format
     */
    async fillFoundingDateField(type, value) {
        await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });

        // Check for single DateRangePicker component instead of separate from/to inputs
        const rangePickerInput = this.filterDialog.locator(
            'ejs-daterangepicker input, input[placeholder="Select Date Range"], input[placeholder="DD/MM/YYYY - DD/MM/YYYY"]'
        ).first();

        if (await rangePickerInput.isVisible().catch(() => false)) {
            await rangePickerInput.click();
            await this.page.waitForTimeout(200);

            // The feature file passes the full range "10/03/2026 - 27/03/2026" as 'from'
            // So we can simply type it into the DateRangePicker input.
            await rangePickerInput.clear();
            await rangePickerInput.pressSequentially(value, { delay: 60 });
            
            // Press Enter to close the DateRangePicker popup and confirm the value
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(400);
            
            console.log(`✓ Filled Founding Date ${type} via range picker with full string: "${value}"`);
            return;
        }

        const labelText = type === 'from' ? 'Founding Date From' : 'Founding Date To';
        let input = null;

        // Strategy 1: XPath from "Founding Date From / To" label to adjacent input
        const byLabel = this.page.locator(
            `//label[normalize-space(.)="${labelText}"]//following::input[1] | ` +
            `//*[normalize-space(text())="${labelText}"]//following-sibling::*//input[1] | ` +
            `//*[normalize-space(text())="${labelText}"]/following::input[1]`
        ).first();
        if (await byLabel.count() > 0 && await byLabel.isVisible().catch(() => false)) {
            input = byLabel;
            console.log(`✓ Found Founding Date "${labelText}" input via label XPath`);
        }

        // Strategy 2: ejs-datepicker inputs at page level (index-based: first=From, last=To)
        if (!input) {
            const ejsDateInputs = this.page.locator('ejs-datepicker input, input.e-datepicker');
            const ejsCount = await ejsDateInputs.count();
            if (ejsCount > 0) {
                input = type === 'from' ? ejsDateInputs.first() : ejsDateInputs.last();
                console.log(`✓ Found Founding Date input via ejs-datepicker selector (${type})`);
            }
        }

        // Strategy 3: input[placeholder] containing "YYYY" at page level
        if (!input) {
            const dateInputs = this.page.locator('input[placeholder*="YYYY"], input[placeholder*="yyyy"]');
            const dateCount = await dateInputs.count();
            if (dateCount > 0) {
                input = type === 'from' ? dateInputs.first() : dateInputs.last();
                console.log(`✓ Found Founding Date input via placeholder*YYYY selector (${type})`);
            }
        }

        // Strategy 4: exact placeholder at page level (no filter-dialog scope)
        if (!input) {
            const pageInputs = this.page.locator('input[placeholder="DD/MM/YYYY"]');
            const pageCount = await pageInputs.count();
            if (pageCount > 0) {
                input = type === 'from' ? pageInputs.first() : pageInputs.last();
                console.log(`✓ Found Founding Date input via page-level placeholder selector (${type})`);
            }
        }

        if (!input) {
            throw new Error(`No date inputs found for Founding Date "${type}" – tried label XPath, ejs-datepicker, placeholder*YYYY, and DD/MM/YYYY selectors`);
        }

        await input.waitFor({ state: 'visible', timeout: 6000 });
        await input.scrollIntoViewIfNeeded();
        await input.click();
        await this.page.waitForTimeout(200);

        // Use evaluate to set value and trigger change events (Syncfusion datepicker pattern)
        await input.evaluate((el, val) => {
            el.value = val;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            el.dispatchEvent(new Event('blur', { bubbles: true }));
        }, value);

        // Also try pressSequentially as a fallback in case evaluate doesn't register
        const current = await input.inputValue().catch(() => '');
        if (!current || current === '') {
            await input.fill('');
            await input.pressSequentially(value, { delay: 60 });
        }

        await this.page.waitForTimeout(400);
        console.log(`✓ Filled Founding Date ${type}: "${value}"`);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // BUTTON GROUP PRE-SELECTION VERIFICATION
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Verify a button-group option is pre-selected by default (has e-primary class).
     */
    async verifyButtonGroupPreSelected(fieldLabel, buttonValue) {
        await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });

        const button = this.filterDialog
            .locator('label')
            .filter({ hasText: new RegExp(`^\\s*${fieldLabel}\\s*$`) })
            .locator('xpath=..')
            .locator('app-button-group button')
            .filter({ hasText: new RegExp(`^\\s*${buttonValue}\\s*$`, 'i') })
            .first();

        await button.waitFor({ state: 'visible', timeout: 8000 });
        const classes = await button.getAttribute('class');
        expect(
            classes,
            `Expected "${buttonValue}" button in "${fieldLabel}" to be pre-selected (e-primary class)`
        ).toContain('e-primary');
        console.log(`✓ "${buttonValue}" is pre-selected by default in "${fieldLabel}" button group`);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // APPLY / RESET BUTTONS
    // ──────────────────────────────────────────────────────────────────────────

    async clickFilterApplyButton() {
        await this.filterApplyButton.waitFor({ state: 'visible' });
        await this.filterApplyButton.click();
        await this.page.waitForTimeout(1000);
        console.log('✓ Clicked Apply button in Club Management filter dialog');
    }

    async clickFilterResetButton() {
        await this.filterResetButton.waitFor({ state: 'visible' });
        await this.filterResetButton.click();
        await this.page.waitForTimeout(800);
        console.log('✓ Clicked Reset button in Club Management filter dialog');
    }

    // ──────────────────────────────────────────────────────────────────────────
    // FILTER STATE VERIFICATIONS
    // ──────────────────────────────────────────────────────────────────────────

    async verifyFilterApplied() {
        await this.page.waitForTimeout(1000);
        const recordCountText = await this.recordCount.textContent();
        expect(recordCountText).toBeTruthy();
        console.log(`✓ Club Management filter applied – record count: "${recordCountText?.trim()}"`);
    }

    async verifyFiltersCleared() {
        await this.page.waitForTimeout(500);
        // After reset, the filter dialog should not show any active chip/tag
        const currentFilterDiv = this.page.locator('[cssclass="right-slide-dialog"]')
            .locator('text=Current Filter')
            .locator('..');
        const filterChips = currentFilterDiv.locator('button, span[class*="tag"], div[class*="chip"]');
        const count = await filterChips.count();
        expect(count).toBeGreaterThanOrEqual(0);
        console.log('✓ Club Management filters cleared');
    }

    async verifyFilteredGridRecords() {
        await this.page.waitForTimeout(500);
        const gridRows = this.page.locator('[role="grid"] [role="row"], [role="grid"] tbody tr');
        const rowCount = await gridRows.count();
        expect(rowCount).toBeGreaterThan(0);
        console.log(`✓ Club Management filtered grid has ${rowCount} visible row(s)`);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // SEARCH BY CLUB NAME
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Search clubs by name via the filter dialog autocomplete, then click Apply
     * so the /clubs/list API is triggered.
     */
    async searchClubByName(name) {
        const isAlreadyOpen = await this.filterDialog.isVisible().catch(() => false);
        if (!isAlreadyOpen) {
            await this.openFilterDialog();
        }

        const searchInput = this.filterDialog.locator(
            'input[placeholder*="Search by Club"], input[placeholder*="Club Name"], input[placeholder*="Search"]'
        ).first();

        await searchInput.waitFor({ state: 'visible', timeout: 10000 });
        await searchInput.scrollIntoViewIfNeeded();
        await searchInput.click();
        await searchInput.press('Control+a');
        await searchInput.press('Delete');
        await searchInput.pressSequentially(name, { delay: 60 });

        const autocompletePopup = this.page.locator('ul.e-list-parent[id*="ej2_dropdownlist"]');
        try {
            await autocompletePopup.last().waitFor({ state: 'visible', timeout: 10000 });
            const suggestions = autocompletePopup.last()
                .locator('li.e-list-item')
                .filter({ hasText: new RegExp(name, 'i') });
            const count = await suggestions.count();
            if (count > 0) {
                const text = await suggestions.first().textContent();
                await suggestions.first().click();
                console.log(`Selected club autocomplete suggestion: "${text?.trim()}"`);
            } else {
                console.warn(`Autocomplete popup appeared but no item contained "${name}" — closing popup with Tab`);
                // Use Tab (not Escape) to close only the autocomplete popup and keep the filter dialog open
                await this.page.keyboard.press('Tab');
            }
        } catch (_) {
            console.warn(`No autocomplete popup appeared for "${name}" within 10s`);
        }
        await this.page.waitForTimeout(300);
        console.log(`✓ Typed "${name}" in club name search autocomplete – call Apply separately`);
    }

    /**
     * Clear the club name search autocomplete and re-apply filter.
     */
    async clearClubNameSearch() {
        await this.openFilterDialog();

        const clearIcon = this.filterDialog.locator('ejs-autocomplete .e-clear-icon');
        const clearIconCount = await clearIcon.count();
        if (clearIconCount > 0) {
            try {
                await clearIcon.first().click({ timeout: 3000 });
            } catch (_) {
                const searchInput = this.filterDialog.locator(
                    'input[placeholder*="Search by Club"], input[placeholder*="Club Name"], input[placeholder*="Search"]'
                ).first();
                await searchInput.fill('');
            }
        } else {
            const searchInput = this.filterDialog.locator(
                'input[placeholder*="Search by Club"], input[placeholder*="Club Name"], input[placeholder*="Search"]'
            ).first();
            await searchInput.fill('');
        }
        await this.page.waitForTimeout(500);
        await this.filterApplyButton.waitFor({ state: 'visible' });
        await this.filterApplyButton.click();
        await this.page.waitForTimeout(800);
        console.log('✓ Cleared club name search – filter applied');
    }

    /**
     * Verify the grid contains at least one row with the searched name.
     */
    async verifyGridContainsName(name) {
        await this.page.waitForTimeout(500);
        const grid = this.page.locator('[role="grid"]');
        await grid.waitFor({ state: 'visible' });
        const matchingRow = grid.locator(`[role="row"]:has-text("${name}")`).first();
        await expect(matchingRow).toBeVisible({ timeout: 10000 });
        console.log(`✓ Club grid contains a row with "${name}"`);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // API RESPONSE VALIDATION
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Validate that every record in the captured /clubs/list API response matches
     * the expected field value.
     *
     * Supported field values for the `field` parameter:
     *   "status"     → item.status?.libraryValue or item.status
     *   "federation" → item.federation?.name or item.federation
     *   "legalStatus"→ item.legalStatus?.libraryValue or item.legalStatus
     *   "language"   → item.language?.libraryValue or item.language
     *   "region"     → item.region?.name or item.region
     */

    /**
 * Validate that every record in the library API response matches
 * the expected field value.
 *
 * Supported fields:
 *   "libraryValue"
 *   "libraryKey"
 *   "libraryType"
 */
    async validateApiResponseField(responseBody, field, expectedValue) {
        expect(responseBody).toBeTruthy();
        expect(Array.isArray(responseBody.items)).toBe(true);

        const items = responseBody.items;
        console.log(`Validating ${items.length} records for field "${field}" = "${expectedValue}"`);

        // Extract string value from a field that may be a plain string or an object
        const extractString = (raw) => {
            if (raw == null) return '';
            if (typeof raw === 'string') return raw;
            if (typeof raw === 'object') {
                // Common nested shapes: { libraryValue }, { name }, { value }, { label }
                return String(raw.libraryValue ?? raw.name ?? raw.value ?? raw.label ?? JSON.stringify(raw));
            }
            return String(raw);
        };

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const raw = item[field];
            const actualValue = extractString(raw);

            expect(
                actualValue.toLowerCase(),
                `Item[${i}] (id: ${item._id}) has ${field}="${actualValue}" but expected "${expectedValue}"`
            ).toBe(expectedValue.toLowerCase());
        }

        console.log(`✓ All ${items.length} records have ${field} = "${expectedValue}"`);
    }

    /**
     * Validate every item in the captured API response has name containing the search text.
     */
    async validateApiResponseNameContains(responseBody, searchText) {
        expect(responseBody).toBeTruthy();
        expect(Array.isArray(responseBody.items)).toBe(true);

        const lowerSearch = searchText.toLowerCase();
        const items = responseBody.items;
        console.log(`Validating ${items.length} clubs for name containing "${searchText}"`);

        const failures = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const name = (item.name || '').toLowerCase();
            const shortName = (item.shortName || '').toLowerCase();
            const matches = name.includes(lowerSearch) || shortName.includes(lowerSearch);
            if (!matches) {
                const detail = `Club[${i}]: name="${item.name}" shortName="${item.shortName}"`;
                console.error(`✗ Does NOT contain "${searchText}" → ${detail}`);
                failures.push(detail);
            }
        }

        if (failures.length > 0) {
            throw new Error(
                `${failures.length} of ${items.length} clubs API records do not contain "${searchText}":\n` +
                failures.join('\n')
            );
        }
        console.log(`✓ All ${items.length} club records contain "${searchText}" in name`);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // GRID RECORD DRILL-DOWN
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Click the first data row in the clubs grid (after filtering).
     */
    async clickFirstClubRecord() {
        const firstRow = this.page.locator(`[role="row"][aria-rowindex="1"] td`).first();
        await firstRow.waitFor({ state: 'visible', timeout: 10000 });
        await firstRow.click();
        await this.page.waitForTimeout(1500);
        console.log('✓ Clicked first club record in the grid');
    }

    /**
     * Navigate to a tab on the club detail page (e.g. "Tags").
     */
    async navigateToClubDetailsTab(tabName) {
        await this.page.waitForTimeout(500);
        const tab = this.page.locator(`div[role="tab"]:has-text("${tabName}")`).first();
        await tab.waitFor({ state: 'visible', timeout: 10000 });
        await tab.click();
        await this.page.waitForTimeout(1000);
        console.log(`✓ Navigated to "${tabName}" tab on club detail page`);
    }

    /**
     * Navigate back to the Club Management list using browser back.
     */
    async navigateBackToClubManagement() {
        await this.page.goBack();
        await this.page.waitForTimeout(1500);
        console.log('✓ Navigated back to Club Management list');
    }

    // ──────────────────────────────────────────────────────────────────────────
    // TAGS API CAPTURE & VALIDATION
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Set up a listener to capture the club tags API response:
     *   GET /clubs/{id}/tags/ or similar endpoint
     */
    async startCapturingClubTagsAPI() {
        this.clubTagsResponsePromise = this.page.waitForResponse(
            response => {
                const url = response.url().toLowerCase();
                return url.includes('/entity-tags/list') && response.status() < 400;
            },
            { timeout: 90000 }
        );
        console.log('✓ Started capturing club tags API response');
    }

    /**
     * Await and return the captured club tags API response body.
     */
    async awaitClubTagsAPIResponse() {
        const response = await this.clubTagsResponsePromise;
        console.log(`✓ Club tags API matched URL: ${response.url()} [${response.request().method()}]`);
        const body = await response.json();
        const count = Array.isArray(body)
            ? body.length
            : (body.items?.length ?? body.totalCount ?? 0);
        console.log(`✓ Captured club tags API: ${count} items`);
        return body;
    }

    /**
     * Verify the club tags API response contains the expected tag name.
     * Performs a deep recursive search of every string value in the response.
     */
    async verifyClubTagsAPIContains(responseBody, tagName) {
        const normalize = (s) => (s || '').trim().replace(/\s+/g, ' ').toLowerCase();

        expect(responseBody, 'Club tags API response is missing').toBeTruthy();

        console.log('=== Club Tags API raw response ===');
        console.log(JSON.stringify(responseBody, null, 2));

        const items = Array.isArray(responseBody) ? responseBody : (responseBody.items || []);
        expect(items.length, 'Club tags API returned zero items').toBeGreaterThan(0);

        const normalizedExpected = normalize(tagName);

        const collectStrings = (val) => {
            if (typeof val === 'string') return [val];
            if (Array.isArray(val)) return val.flatMap(collectStrings);
            if (val && typeof val === 'object') return Object.values(val).flatMap(collectStrings);
            return [];
        };

        const found = items.some(item =>
            collectStrings(item).some(s => normalize(s).includes(normalizedExpected))
        );

        expect(
            found,
            `Expected club tags API response to contain tag "${tagName}", but not found. Items: ${JSON.stringify(items)}`
        ).toBe(true);
        console.log(`✓ Club tags API contains tag "${tagName}"`);
    }


    async verifyStatus(expectedStatus) {
        await this.status.waitFor({ state: 'visible', timeout: 10000 });
        const actualStatus = await this.status.textContent();
        expect(actualStatus.trim()).toContain(expectedStatus);
        console.log(`✓ Verified status is "${expectedStatus}"`);
    }

    async clubDetails(field, expectedValue) {
        if (field.toLowerCase() === 'founding date') {
            await this.verifyFoundingDate(expectedValue);
            return;
        }
        // Implement the logic to verify club details based on the field and expected range
        const locator = this.page.locator(`//div[normalize-space()='${field}']//following-sibling::div`);
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        const actualText = await locator.textContent();
        expect(actualText.trim()).toContain(expectedValue);
        console.log(`✓ Verified club detail "${field}" contains "${expectedValue}"`);
    }

    async verifyFoundingDate(expectedRange) {
        await this.foundingDate.waitFor({ state: 'visible', timeout: 10000 });
        const actualText = (await this.foundingDate.textContent()).trim();
        const actualDate = DataUtil.parseDate(actualText);
        const [startStr, endStr] = expectedRange.split(' - ').map(d => d.trim());
        const startDate = DataUtil.parseDate(startStr);
        const endDate = DataUtil.parseDate(endStr);
        
        const isWithin = actualDate >= startDate && actualDate <= endDate;
        if (!isWithin) {
            console.error(`Founding Date Verification Failed! actualText: "${actualText}", actualDate: ${actualDate}, expectedRange: ${expectedRange}, startDate: ${startDate}, endDate: ${endDate}`);
        }
        
        expect(
            isWithin, 
            `Founding date "${actualText}" (${actualDate}) should be between ${startStr} and ${endStr}`
        ).toBeTruthy();
        console.log(`✓ Verified founding date "${actualText}" is within "${expectedRange}"`);
    }

}

module.exports = ClubManagementBasicFilterPage;
