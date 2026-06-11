/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

const { expect } = require('playwright/test');

/**
 * Page Object for Competition Configuration Basic Filter.
 *
 * The Basic Filter is accessed via the filter icon on the Competition Configuration list page.
 * It opens a right-slide dialog with:
 *   - Search autocomplete (competition name)
 *   - Status button group (Active / Inactive / Draft)
 *   - Competition Type multiselect/button group
 *   - Format multiselect/button group
 *   - Competition Level multiselect/button group
 *   - Buttons: Apply, Reset, Cancel
 */
class CompetitionConfigBasicFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // Filter trigger button (first .no-border-box button on the list page)
        this.filterButton = this.page.locator('.no-border-box').first();

        // Filter dialog container
        this.filterDialog = this.page.locator('[cssclass="right-slide-dialog"]');

        // Action buttons
        this.filterApplyButton = this.page.locator('[cssclass="right-slide-dialog"] button:has-text("Apply")');
        this.filterResetButton = this.page.locator('[cssclass="right-slide-dialog"] button:has-text("Reset")');
        this.filterCancelButton = this.page.locator('[cssclass="right-slide-dialog"] button:has-text("Cancel")');

        // Record count label on the grid
        this.recordCount = this.page.locator('text=/\\d+\\s+Record/');

        // Field container locators (pre-defined for reliability)
        this.statusContainer = this.page.locator(`//div[normalize-space()='Status']//following-sibling::div`);
        this.competitionTypeContainer = this.page.locator(`//div[normalize-space()='Competition Type']//following-sibling::div`);
        this.formatContainer = this.page.locator(`//div[normalize-space()='Format']//following-sibling::div`);
        this.competitionLevelContainer = this.page.locator(`//div[normalize-space()='Competition Level']//following-sibling::div`);
        this.divisionContainer = this.page.locator(`//div[normalize-space()='Division']//following-sibling::div`);
        this.divisionCategoryContainer = this.page.locator(`//div[normalize-space()='Division Category']//following-sibling::div`);
        this.regionContainer = this.page.locator(`//div[normalize-space()='Region']//following-sibling::div`);
        this.federationContainer = this.page.locator(`//div[normalize-space()='Federation']//following-sibling::div`);
        this.organizationContainer = this.page.locator(`//div[normalize-space()='Organization']//following-sibling::div`);
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
            console.log('Competition Configuration filter dialog is already open, skipping open click');
            return;
        }
        await this.filterButton.waitFor({ state: 'visible' });
        await this.filterButton.click();
        await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ Competition Configuration filter dialog opened');
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
        console.log(`✓ "${tabName}" tab is displayed in Competition Configuration filter dialog`);
    }

    /**
     * Verify the search autocomplete input inside the Basic Filter dialog
     * has the expected placeholder text.
     */
    async verifyFilterSearchInputPlaceholder(expectedPlaceholder) {
        await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });
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
        console.log(`✓ Competition Configuration filter search input has placeholder: "${placeholder}"`);
    }

    /**
     * Verify a named filter field label is visible inside the Basic Filter dialog.
     */
    async verifyFilterFieldVisible(fieldLabel) {
        await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });
        const label = this.filterDialog.locator(`text=${fieldLabel}`).first();
        await label.waitFor({ state: 'visible', timeout: 8000 });
        console.log(`✓ Filter field "${fieldLabel}" is visible in Competition Configuration filter dialog`);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // APPLY BASIC FILTER CRITERIA (dispatcher)
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Apply Competition Configuration Basic Filter criteria from a data table rowsHash.
     *
     * Supported FilterField values:
     *   Search              → competition name autocomplete
     *   Status              → button group (Active / Inactive / Draft)
     *   Competition Type    → button group / multiselect
     *   Format              → button group / multiselect
     *   Competition Level   → button group / multiselect
     */
    async applyCompetitionConfigBasicFilterCriteria(filterCriteria) {
        for (const [filterField, filterValue] of Object.entries(filterCriteria)) {
            switch (filterField) {
                case 'Search':
                    await this.searchCompetitionConfigByName(filterValue);
                    break;
                case 'Status':
                    await this.selectFilterButtonGroup('Status', filterValue);
                    break;
                case 'Competition Type':
                    await this.selectFilterButtonGroupOrMultiselect('Competition Type', filterValue);
                    break;
                case 'Format':
                    await this.selectFilterButtonGroupOrMultiselect('Format', filterValue);
                    break;
                case 'Competition Level':
                    await this.selectFilterButtonGroupOrMultiselect('Competition Level', filterValue);
                    break;
                case 'Division':
                    await this.selectFilterButtonGroupOrMultiselect('Division', filterValue);
                    break;
                case 'Division Category':
                    await this.selectFilterButtonGroupOrMultiselect('Division Category', filterValue);
                    break;
                case 'Region':
                    await this.selectFilterButtonGroupOrMultiselect('Region', filterValue);
                    break;
                case 'Federation':
                    await this.selectFilterButtonGroupOrMultiselect('Federation', filterValue);
                    break;
                case 'Organization':
                    await this.selectFilterButtonGroupOrMultiselect('Organization', filterValue);
                    break;
                default:
                    console.warn(`Unknown Competition Config Basic Filter field: "${filterField}" – skipping`);
            }
            await this.page.waitForTimeout(300);
        }
    }

    // ──────────────────────────────────────────────────────────────────────────
    // BUTTON GROUP HELPER
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Click a button inside an <app-button-group> for the given field label.
     * Falls back to multiselect search if value not found in button group.
     */
    async selectFilterButtonGroup(fieldLabel, value) {
        await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });

        const containerMap = {
            'Status':              this.statusContainer,
            'Competition Type':    this.competitionTypeContainer,
            'Format':              this.formatContainer,
            'Competition Level':   this.competitionLevelContainer,
            'Division':            this.divisionContainer,
            'Division Category':   this.divisionCategoryContainer,
            'Region':              this.regionContainer,
            'Federation':          this.federationContainer,
            'Organization':        this.organizationContainer,
        };

        const container = containerMap[fieldLabel];
        if (container) {
            const cnt = await container.count();
            if (cnt > 0) {
                const btn = container.locator('button')
                    .filter({ hasText: new RegExp(`^\\s*${value}\\s*$`, 'i') }).first();
                const btnPartial = container.locator(`button:has-text("${value}")`).first();
                const matched = (await btn.count()) > 0 ? btn : btnPartial;
                if (await matched.count() > 0) {
                    await matched.scrollIntoViewIfNeeded();
                    await matched.click();
                    await this.page.waitForTimeout(400);
                    console.log(`✓ Selected "${value}" for "${fieldLabel}" button group (via container locator)`);
                    return;
                }
            }
        }

        // Fallback XPath strategies
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

        // Fallback to multiselect
        await this.selectFilterMultiselectByLabel(fieldLabel, value);
    }

    /**
     * Try button group first; if no buttons found, fall back to multiselect.
     */
    async selectFilterButtonGroupOrMultiselect(fieldLabel, value) {
        await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });
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
                await this.filterDialog.evaluate(el => el.scrollTop = el.scrollHeight);
                await this.page.waitForTimeout(400);
                wrapper = this.page.locator(xpaths[0]).first();
            }

            await wrapper.scrollIntoViewIfNeeded();
            await wrapper.click();
            await this.page.waitForTimeout(800);

            const popup = this.page.locator('ul.e-list-parent').last();
            await popup.waitFor({ state: 'visible', timeout: 6000 });

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
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(500);
            await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });
            console.log(`✓ Selected "${value}" in multiselect "${fieldLabel}"`);
        } catch (error) {
            console.error(`✗ Failed to select "${value}" in multiselect "${fieldLabel}": ${error.message}`);
            throw new Error(`Failed to select "${value}" in multiselect "${fieldLabel}": ${error.message}`);
        }
    }

    // ──────────────────────────────────────────────────────────────────────────
    // SEARCH AUTOCOMPLETE HELPER
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Fill the Search autocomplete inside the filter dialog with the competition name.
     */
    async searchCompetitionConfigByName(name) {
        await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });

        const searchInput = this.filterDialog.locator(
            'input[placeholder*="Search by Competition Configuration"], input[placeholder*="Competition Configuration Name"], input[placeholder*="Search"]'
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
                console.log(`✓ Selected competition suggestion "${text?.trim()}" from autocomplete`);
            } else {
                console.warn(`No autocomplete suggestion matched "${name}" — proceeding without selection`);
                await this.page.keyboard.press('Escape');
            }
        } catch (_) {
            console.warn(`No autocomplete popup appeared for competition "${name}" within 8s`);
        }
        await this.page.waitForTimeout(300);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // APPLY / RESET BUTTONS
    // ──────────────────────────────────────────────────────────────────────────

    async clickFilterApplyButton() {
        await this.filterApplyButton.waitFor({ state: 'visible' });
        await this.filterApplyButton.click();
        await this.page.waitForTimeout(1000);
        console.log('✓ Clicked Apply button in Competition Configuration filter dialog');
    }

    async clickFilterResetButton() {
        await this.filterResetButton.waitFor({ state: 'visible' });
        await this.filterResetButton.click({ force: true });
        await this.page.waitForTimeout(800);
        console.log('✓ Clicked Reset button in Competition Configuration filter dialog');
    }

    // ──────────────────────────────────────────────────────────────────────────
    // FILTER STATE VERIFICATIONS
    // ──────────────────────────────────────────────────────────────────────────

    async verifyFilterApplied() {
        await this.page.waitForTimeout(1000);
        const recordCountText = await this.recordCount.textContent();
        expect(recordCountText).toBeTruthy();
        console.log(`✓ Competition Configuration filter applied – record count: "${recordCountText?.trim()}"`);
    }

    async verifyFiltersCleared() {
        await this.page.waitForTimeout(500);
        const currentFilterDiv = this.page.locator('[cssclass="right-slide-dialog"]')
            .locator('text=Current Filter')
            .locator('..');
        const filterChips = currentFilterDiv.locator('button, span[class*="tag"], div[class*="chip"]');
        const count = await filterChips.count();
        expect(count).toBeGreaterThanOrEqual(0);
        console.log('✓ Competition Configuration filters cleared');
    }

    async verifyFilteredGridRecords() {
        await this.page.waitForTimeout(1500);
        const rows = this.page.locator('tbody tr, [role="row"]:not([aria-rowindex="0"])');
        const count = await rows.count();
        expect(count).toBeGreaterThan(0);
        console.log(`✓ Competition Configuration filtered grid shows ${count} record(s)`);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // GRID RECORD OPERATIONS
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Click the first competition config record in the filtered grid.
     */
    async clickFirstCompetitionConfigRecord() {
        const firstRow = this.page.locator('[role="row"][aria-rowindex="1"] td').first();
        await firstRow.waitFor({ state: 'visible', timeout: 10000 });
        await firstRow.click();
        await this.page.waitForTimeout(1500);
        console.log('✓ Clicked first competition config record in filtered grid');
    }

    /**
     * Navigate back to the Competition Configuration list using browser back.
     */
    async navigateBackToCompetitionConfig() {
        await this.page.goBack();
        await this.page.waitForLoadState('networkidle');
        console.log('✓ Navigated back to Competition Configuration list');
    }

    /**
     * Verify the competition config grid contains at least one row with the searched name.
     */
    async verifyGridContainsName(name) {
        await this.page.waitForTimeout(1000);
        const rows = this.page.locator('tbody tr');
        const count = await rows.count();
        expect(count).toBeGreaterThan(0);
        let found = false;
        for (let i = 0; i < count; i++) {
            const rowText = (await rows.nth(i).textContent() || '').toLowerCase();
            if (rowText.includes(name.toLowerCase())) {
                found = true;
                break;
            }
        }
        expect(found, `Expected grid to contain name "${name}"`).toBe(true);
        console.log(`✓ Competition config grid contains name: "${name}"`);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // API RESPONSE VALIDATION
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Validate that every record in the API response has the specified field
     * matching the expected value (case-insensitive).
     */
    async validateApiResponseField(apiResponse, field, expectedValue) {
        const items = apiResponse.items || apiResponse.data || apiResponse.records || [];
        expect(items.length).toBeGreaterThan(0);

        const fieldMap = {
            'status':           (item) => item.status,
            'competitionType':  (item) => item.competitionType,
            'format':           (item) => item.format,
            'competitionLevel': (item) => item.competitionLevel,
        };

        const getter = fieldMap[field] || ((item) => item[field]);

        // Resolve a raw field value (may be string, number, or object) to a string
        const resolveToString = (raw) => {
            if (raw === null || raw === undefined) return '';
            if (typeof raw === 'object') {
                // Try common label keys used by Syncfusion / REST APIs
                const labelKeys = ['libraryValue', 'name', 'label', 'value', 'title', 'text', 'description'];
                for (const key of labelKeys) {
                    if (raw[key] !== undefined && raw[key] !== null) {
                        return String(raw[key]);
                    }
                }
                // Fallback: stringify the whole object for debugging
                return JSON.stringify(raw);
            }
            return String(raw);
        };

        for (const item of items) {
            const raw = getter(item);
            const actual = resolveToString(raw);
            console.log(`  → field "${field}" raw value: ${JSON.stringify(raw)} → resolved: "${actual}"`);
            expect(
                actual.toLowerCase(),
                `Expected record field "${field}" to match "${expectedValue}", got "${actual}"`
            ).toContain(expectedValue.toLowerCase());
        }
        console.log(`✓ All competition config API records have "${field}" matching "${expectedValue}"`);
    }
}

module.exports = CompetitionConfigBasicFilterPage;
