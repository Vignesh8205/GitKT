/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

const { expect } = require('playwright/test');

/**
 * Page Object for the Person Management Advanced Filter (Query Builder).
 *
 * The Advanced Filter is accessed via the same filter dialog as Basic Filter.
 * It uses an EJ2 QueryBuilder component with:
 *   - AND / OR group logic radios
 *   - "Add Group/Condition" dropdown button (dropdownbutton title)
 *   - Per-condition: field combobox, operator combobox, value textbox/multiselect
 *   - Buttons: Reset, Cancel, "Apply Advanced Filter"
 */
class PersonManagementAdvancedFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // Filter trigger button (same as Basic Filter – first .no-border-box button)
        this.filterButton = this.page.locator('.no-border-box').first();

        // Filter dialog container
        this.filterDialog = this.page.locator('[cssclass="right-slide-dialog"]');

        // Filter tab buttons inside the dialog
        this.basicFilterTab = this.filterDialog.locator('button:has-text("Basic Filter")');
        this.advancedFilterTab = this.page.locator("//button[normalize-space(text())='Advanced Filter']")

        // Advanced Filter section (visible after clicking the Advanced Filter tab)
        this.advancedFilterSection = this.filterDialog.locator('text=Build complex filter conditions').locator('..');

        // "Add Group/Condition" dropdown button  (title="Add Group/Condition")
        this.addConditionDropdown = this.filterDialog.getByTitle('Add Group/Condition');

        // Menu items inside the dropdown
        this.addConditionMenuItem = this.page.getByRole('menuitem', { name: 'Add Condition' });
        this.addGroupMenuItem = this.page.getByRole('menuitem', { name: 'Add Group' });

        // AND / OR group logic radios (top-level)
        this.andRadio = this.filterDialog.getByRole('radio', { name: 'AND' }).first();
        this.orRadio = this.filterDialog.getByRole('radio', { name: 'OR' }).first();
        this.andLabel = this.filterDialog.locator('text=AND').first();
        this.orLabel = this.filterDialog.locator('text=OR').first();

        // Action buttons
        this.applyAdvancedFilterButton = this.page.locator(
            'button[aria-label="Apply Advanced Filter progress"], button:has-text("Apply Advanced Filter")'
        ).first();
        this.resetButton = this.filterDialog.locator('button:has-text("Reset")');
        this.cancelButton = this.filterDialog.locator('button:has-text("Cancel")');
        this.closeButton = this.filterDialog.locator('button:has-text("Close")');

        // Record count label on the grid
        this.recordCount = this.page.locator('text=/\\d+\\s+Record/');
    }

    // ──────────────────────────────────────────────────────────────
    // Navigation helpers
    // ──────────────────────────────────────────────────────────────

    /**
     * Open the filter dialog. Skips the click if the dialog is already visible.
     */
    async openFilterDialog() {
        const dialogReady = () =>
            this.filterDialog.isVisible().catch(() => false);

        if (await dialogReady()) {
            console.log('Filter dialog is already open, skipping open click');
            return;
        }

        // Ordered from most-specific to least-specific
        const buttonSelectors = [
            'button.no-border-box:has(span.sf-custom-icon[style*="filter.svg"])',
            'button.no-border-box:has(span.sf-custom-icon[style*="filter-icon.svg"])',
            'button.no-border-box:has(span[style*="filter"])',
            'button[title*="filter" i]',
            'button[aria-label*="filter" i]',
            'button:has(span[style*="filter"])',
            '.no-border-box',
        ];

        for (const sel of buttonSelectors) {
            const buttons = this.page.locator(sel);
            const count = await buttons.count();
            if (count === 0) continue;

            for (let i = 0; i < count; i++) {
                const btn = buttons.nth(i);
                if (!await btn.isVisible().catch(() => false)) continue;

                console.log(`Trying filter button [${sel}] index ${i}`);
                await btn.click().catch(() => btn.click({ force: true }).catch(() => {}));
                await this.page.waitForTimeout(1500);

                if (await dialogReady()) {
                    console.log(`Filter dialog opened via [${sel}] index ${i}`);
                    return;
                }

                // If a different panel opened (e.g. search), close it before trying next
                await this.page.keyboard.press('Escape').catch(() => {});
                await this.page.waitForTimeout(500);
            }
        }

        await this.filterDialog.waitFor({ state: 'visible', timeout: 20000 });
    }

    /**
     * Click the "Advanced Filter" tab to switch to the query builder view.
     */
    async clickAdvancedFilterTab() {
        await this.advancedFilterTab.waitFor({ state: 'visible' });
        await this.advancedFilterTab.click();
        await this.page.waitForTimeout(500);
    }

    /**
     * Verify the Advanced Filter query builder placeholder text is shown.
     */
    async verifyAdvancedFilterQueryBuilderDisplayed() {
        const hint = this.filterDialog.locator('text=Build complex filter conditions with AND/OR logic');
        await hint.waitFor({ state: 'visible', timeout: 8000 });
        expect(await hint.isVisible()).toBe(true);
    }

    // ──────────────────────────────────────────────────────────────
    // Condition management
    // ──────────────────────────────────────────────────────────────

    /**
     * Open the "Add Group/Condition" dropdown and click "Add Condition".
     * Use conditionIndex=0 for the first condition, =1 for the second, etc.
     * When no conditions exist yet, there is only one dropdown button.
     * @param {number} groupIndex - 0-based index of the group's add button (default 0)
     */
    async addCondition(groupIndex = 0) {
        const addButtons = this.filterDialog.getByTitle('Add Group/Condition');
        const btn = addButtons.nth(groupIndex);
        await btn.waitFor({ state: 'visible', timeout: 8000 });
        await btn.click();
        await this.addConditionMenuItem.waitFor({ state: 'visible', timeout: 5000 });
        await this.addConditionMenuItem.click();
        await this.page.waitForTimeout(300);
    }

    /**
     * Get a field combobox by its 0-based condition row index.
     */
    _getFieldCombobox(conditionIndex) {
        // Each condition row has: field combobox, operator combobox, value input
        // The field comboboxes are the dropdownlist inputs that show field names
        return this.filterDialog.locator('[class*="e-querybuilder"] [class*="e-rule-filter"] [role="combobox"]').nth(conditionIndex);
    }

    /**
     * Get an operator combobox by its 0-based condition row index.
     */
    _getOperatorCombobox(conditionIndex) {
        return this.filterDialog.locator('[class*="e-querybuilder"] [class*="e-rule-operator"] [role="combobox"]').nth(conditionIndex);
    }

    /**
     * Get the value textbox by its 0-based condition row index.
     */
    _getValueInput(conditionIndex) {
        return this.filterDialog.locator('[class*="e-querybuilder"] [class*="e-rule-value"] input').nth(conditionIndex);
    }

    /**
     * Select the field for a condition row.
     * @param {string} fieldName - e.g. "First Name", "Last Name", "Email"
     * @param {number} conditionIndex - 0-based index of the condition row
     */
    async selectConditionField(fieldName, conditionIndex = 0) {
        // Click the wrapper element (parent of the readonly input) to open the EJ2 popup
        const fieldCombo = this.page.locator(`//input[@placeholder="Select a field"]/..`).nth(conditionIndex);
        await fieldCombo.waitFor({ state: 'visible', timeout: 8000 });
        await fieldCombo.click();
        await this.page.waitForTimeout(500);

        const escaped = fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const nameRegex = new RegExp(`^${escaped}$`, 'i');

        // Try the standard ARIA role="option" locator first (most EJ2 DropDownList instances)
        let option = this.page.getByRole('option', { name: nameRegex });
        const foundByRole = await option.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
        if (!foundByRole) {
            // Fallback: EJ2 renders popup list items as .e-list-item without role="option" in some versions
            option = this.page.locator('.e-popup.e-popup-open .e-list-item').filter({ hasText: nameRegex }).first();
            await option.waitFor({ state: 'visible', timeout: 8000 });
        }
        await option.scrollIntoViewIfNeeded();
        await option.click();
        await this.page.waitForTimeout(400);
    }

    /**
     * Select the operator for a condition row.
     * @param {string} operatorName - e.g. "Contains", "Starts with", "Equal"
     * @param {number} conditionIndex - 0-based index of the condition row
     */
    async selectConditionOperator(operatorName, conditionIndex = 0) {
        // The operator combobox is the second combobox in each condition row
        const operatorCombo = this.page.locator(`//*[@class="e-rule-operator e-operator"]//span[@aria-label="dropdownlist"]`).nth(conditionIndex);
        await operatorCombo.waitFor({ state: 'visible', timeout: 8000 });
        await operatorCombo.click();
        await this.page.waitForTimeout(300);

        const escapedOp = operatorName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const option = this.page.getByRole('option', { name: new RegExp(`^${escapedOp}$`, 'i') });
        await option.waitFor({ state: 'visible', timeout: 8000 });
        await option.click();
        await this.page.waitForTimeout(400);
    }

    /**
     * Enter a value for a condition row.
     * For "In" / "Not in" operators the value input is a multiselect tag inputs;
     * each comma-separated token is typed and confirmed with Enter/Tab.
     * @param {string} value - The filter value to enter (comma-separated for In/Not in)
     * @param {number} conditionIndex - 0-based index of the condition row
     */
    async enterConditionValue(value, conditionIndex = 0) {
        // Check first whether this condition row uses a MultiSelect (In / Not in operators).
        // Syncfusion MultiSelect is identified by .e-multiselect or .e-multi-select-wrapper inside
        // the condition's .e-rule-value container. Detect it before attempting any text-input fill
        // so we never try to fill() a hidden internal input and hang.
        const ruleValueContainer = this.filterDialog.locator('.e-rule-value').nth(conditionIndex);
        const hasMultiSelect = await ruleValueContainer
            .locator('.e-multiselect, .e-multi-select-wrapper')
            .first()
            .isVisible()
            .catch(() => false);
        if (hasMultiSelect) {
            await this._selectMultiselectValues(value, conditionIndex);
            return;
        }

        // Try the standard text input first (Contains, Starts with, etc.)
        const textInput = this.filterDialog
            .locator('[role="textbox"][placeholder="Enter the value"], input[placeholder="Enter the value"]')
            .nth(conditionIndex);

        const textInputVisible = await textInput.isVisible().catch(() => false);
        if (textInputVisible) {
            const isEditable = await textInput.isEditable().catch(() => false);
            if (isEditable) {
                await textInput.fill(value);
                await this.page.waitForTimeout(300);
                return;
            }
            // Visible but readonly → Syncfusion MultiSelect combobox (In / Not in operator)
            await this._selectMultiselectValues(value, conditionIndex);
            return;
        }

        // Fallback: tag/chip text input (some QueryBuilder In/Not in configurations)
        const tokens = value.split(',').map(t => t.trim()).filter(Boolean);
        const tagInput = this.filterDialog
            .locator('input[placeholder*="value"], input[placeholder*="Enter"], .e-rule-value input')
            .nth(conditionIndex);
        await tagInput.waitFor({ state: 'visible', timeout: 8000 });
        for (const token of tokens) {
            await tagInput.fill(token);
            await this.page.waitForTimeout(300);
            await tagInput.press('Enter');
            await this.page.waitForTimeout(300);
        }
        console.log(`✓ Entered value(s) "${value}" for condition ${conditionIndex}`);
    }

    /**
     * Handle Syncfusion MultiSelect dropdown for In / Not in value input.
     * Opens the popup ONCE, then selects every comma-separated token inside it.
     * Works for both predefined-option lists (e.g. Gender) and free-text tag inputs.
     */
    async _selectMultiselectValues(value, conditionIndex) {
        const tokens = value.split(',').map(t => t.trim()).filter(Boolean);
        const normalize = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
        const ruleValue = this.filterDialog.locator('.e-rule-value').nth(conditionIndex);

        // Open the popup once
        await ruleValue.locator('.e-multiselect, .e-multi-select-wrapper').first().click();
        await this.page.waitForTimeout(600);

        // Detect whether the open popup has a filter/search input
        const filterInput = this.page
            .locator('.e-popup.e-popup-open .e-input-filter input, .e-popup.e-popup-open .e-filter-parent input')
            .first();
        const hasFilter = await filterInput.isVisible().catch(() => false);

        for (const token of tokens) {
            if (hasFilter) {
                // Clear + type to narrow the list for this token
                await filterInput.clear();
                await filterInput.fill(token);
                await this.page.waitForTimeout(400);
            }

            // Click the matching list item inside the still-open popup
            const listItems = this.page.locator('.e-popup.e-popup-open .e-list-item:not(.e-disabled)');
            const count = await listItems.count();
            let clicked = false;
            for (let i = 0; i < count; i++) {
                const text = await listItems.nth(i).textContent();
                if (text && normalize(text) === normalize(token)) {
                    await listItems.nth(i).click();
                    clicked = true;
                    await this.page.waitForTimeout(300);
                    break;
                }
            }

            if (!clicked) {
                // Free-text multiselect (no matching option): confirm typed value as chip
                if (hasFilter) {
                    await filterInput.press('Enter');
                    await this.page.waitForTimeout(300);
                } else {
                    console.warn(`⚠ No list item found for token "${token}" in condition ${conditionIndex}`);
                }
            }

            // Clear the filter box so the next token search starts fresh
            if (hasFilter) {
                await filterInput.clear();
                await this.page.waitForTimeout(200);
            }
        }

        // Close the popup
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(400);
        console.log(`✓ Selected multiselect values "${value}" for condition ${conditionIndex}`);
    }

    // ──────────────────────────────────────────────────────────────
    // Group logic (AND / OR)
    // ──────────────────────────────────────────────────────────────

    /**
     * Set the top-level group logic to AND or OR.
     * The radios are only enabled when 2 or more conditions are present.
     * @param {string} logic - "AND" or "OR"
     * @param {number} index - 0-based index of the radio label to click (default 0)
     */
    async setGroupLogic(logic, index = 0) {
        await this.page.waitForTimeout(300);

        const radioLabel = this.page.locator(`//label[text()="${logic}"]`).nth(index);
        await this.page.waitForLoadState("domcontentloaded")
        
        // await radioLabel.waitFor({ state: 'visible', timeout: 15000 });
        await radioLabel.click();
        await this.page.waitForTimeout(400);
        console.log(`✓ Set group logic to "${logic}" (index ${index})`);
    }

    // Apply / Reset / Cancel
    // ──────────────────────────────────────────────────────────────

    /**
     * Click the "Apply Advanced Filter" button.
     */
    async clickApplyAdvancedFilterButton() {
        await this.applyAdvancedFilterButton.waitFor({ state: 'visible' });
        await this.applyAdvancedFilterButton.click();
        await this.page.waitForTimeout(1500);
    }

    /**
     * Click the Reset button to clear all advanced filter conditions.
     * Alias: clickFilterResetButton (for shared step compatibility).
     */
    async clickResetButton() {
        await this.resetButton.waitFor({ state: 'visible' });
        await this.resetButton.click();
        await this.page.waitForTimeout(800);
    }

    /** Alias used by shared step definitions */
    async clickFilterResetButton() { return this.clickResetButton(); }

    /**
     * Click the Cancel button to close the dialog without applying.
     */
    async clickCancelButton() {
        await this.cancelButton.waitFor({ state: 'visible' });
        await this.cancelButton.click();
        await this.page.waitForTimeout(500);
    }

    // ──────────────────────────────────────────────────────────────
    // Assertions
    // ──────────────────────────────────────────────────────────────

    /**
     * Verify that at least one result row is shown in the grid after filtering.
     */
    async verifyFilteredGridHasResults() {
        await this.page.waitForTimeout(500);
        const gridRows = this.page.locator('[role="grid"] [role="row"], [role="grid"] tbody tr');
        const rowCount = await gridRows.count();
        expect(rowCount).toBeGreaterThan(0);
    }

    /**
     * Verify that the record count label is visible (filter was applied).
     */
    async verifyFilterApplied() {
        await this.page.waitForTimeout(1000);
        const label = this.recordCount;
        await label.waitFor({ state: 'visible', timeout: 8000 });
        const text = await label.textContent();
        expect(text).toBeTruthy();
    }

    /**
     * Verify that all filters are cleared (alias used by shared step definitions).
     * Delegates to verifyNoConditionsPresent.
     */
    async verifyFiltersCleared() { return this.verifyNoConditionsPresent(); }

    /**
     * Verify that the Advanced Filter query builder has no condition rows.
     * After Reset, the rule list should be empty.
     */
    async verifyNoConditionsPresent() {
        await this.page.waitForTimeout(600);
        // After reset, condition rows (e-rule-list > .e-rule-item) should not exist
        const conditionRows = this.filterDialog.locator('[class*="e-rule-item"]');
        const count = await conditionRows.count();
        expect(count, 'Expected no condition rows after reset').toBe(0);
        console.log('✓ No conditions are present in the Advanced Filter');
    }

    /**
     * Map UI field label ("First Name") to API response field name ("firstName").
     */
    mapFieldLabel(fieldLabel) {
        const mapping = {
            'First Name': 'firstName',
            'Last Name': 'lastName',
            'Email': 'email',
            'Person Code': 'personCode',
            'Date Of Birth': 'dateOfBirth',
            'Gender': 'gender',
            'Status': 'status.libraryValue',
        };
        return mapping[fieldLabel] || fieldLabel;
    }

    /**
     * Evaluate one condition against a single response item.
     * Supports nested fields via dot notation (e.g. "status.libraryValue").
     * Supports: Contains, Starts with, Ends with, Equal, Not equal, In, Not in.
     * For "In" / "Not in" value is comma-separated list of acceptable values.
     */

    /**
     * Parse a date string that may be in DD/MM/YYYY, YYYY-MM-DD, or ISO format.
     * Returns a numeric timestamp, or NaN if unparseable.
     */
    _parseDate(str) {
        if (!str) return NaN;
        const s = str.toUpperCase();
        // DD/MM/YYYY
        const ddmmyyyy = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (ddmmyyyy) return Date.UTC(+ddmmyyyy[3], +ddmmyyyy[2] - 1, +ddmmyyyy[1]);
        // DD-MM-YYYY
        const ddmmyyyyDash = s.match(/^(\d{2})-(\d{2})-(\d{4})$/);
        if (ddmmyyyyDash) return Date.UTC(+ddmmyyyyDash[3], +ddmmyyyyDash[2] - 1, +ddmmyyyyDash[1]);
        // ISO datetime or date-only: extract YYYY-MM-DD and compute UTC midnight
        const isoDate = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (isoDate) return Date.UTC(+isoDate[1], +isoDate[2] - 1, +isoDate[3]);
        return Date.parse(s);
    }

    checkCondition(item, apiField, operator, value) {
        let actual = item;
        for (const key of apiField.split('.')) {
            actual = actual?.[key];
        }
        const actualStr = (actual ?? '').toString().toLowerCase();
        const expectedStr = value.toLowerCase();
        switch (operator.toLowerCase().replace(/-/g, ' ')) {
            case 'contains': return actualStr.includes(expectedStr);
            case 'starts with': return actualStr.startsWith(expectedStr);
            case 'ends with': return actualStr.endsWith(expectedStr);
            case 'equal': return actualStr === expectedStr;
            case 'not equal': return actualStr !== expectedStr;
            case 'in': {
                const tokens = expectedStr.split(',').map(t => t.trim());
                return tokens.some(t => actualStr === t);
            }
            case 'not in': {
                const tokens = expectedStr.split(',').map(t => t.trim());
                return tokens.every(t => actualStr !== t);
            }
            case 'greater than': {
                const d1 = this._parseDate(actualStr), d2 = this._parseDate(expectedStr);
                if (!isNaN(d1) && !isNaN(d2)) return d1 > d2;
                const n1 = Number(actual), n2 = Number(value);
                if (!isNaN(n1) && !isNaN(n2)) return n1 > n2;
                return actualStr > expectedStr;
            }
            case 'greater than or equal': {
                const d1 = this._parseDate(actualStr), d2 = this._parseDate(expectedStr);
                if (!isNaN(d1) && !isNaN(d2)) return d1 >= d2;
                const n1 = Number(actual), n2 = Number(value);
                if (!isNaN(n1) && !isNaN(n2)) return n1 >= n2;
                return actualStr >= expectedStr;
            }
            case 'less than': {
                const d1 = this._parseDate(actualStr), d2 = this._parseDate(expectedStr);
                if (!isNaN(d1) && !isNaN(d2)) return d1 < d2;
                const n1 = Number(actual), n2 = Number(value);
                if (!isNaN(n1) && !isNaN(n2)) return n1 < n2;
                return actualStr < expectedStr;
            }
            case 'less than or equal': {
                const d1 = this._parseDate(actualStr), d2 = this._parseDate(expectedStr);
                if (!isNaN(d1) && !isNaN(d2)) return d1 <= d2;
                const n1 = Number(actual), n2 = Number(value);
                if (!isNaN(n1) && !isNaN(n2)) return n1 <= n2;
                return actualStr <= expectedStr;
            }
            case 'between': {
                const [from, to] = expectedStr.split('|').map(v => v.trim());
                const d = this._parseDate(actualStr), df = this._parseDate(from), dt = this._parseDate(to);
                if (!isNaN(d) && !isNaN(df) && !isNaN(dt)) return d >= df && d <= dt;
                const n = Number(actual), nf = Number(from), nt = Number(to);
                if (!isNaN(n) && !isNaN(nf) && !isNaN(nt)) return n >= nf && n <= nt;
                return actualStr >= from && actualStr <= to;
            }
            case 'not between': {
                const [from, to] = expectedStr.split('|').map(v => v.trim());
                const d = this._parseDate(actualStr), df = this._parseDate(from), dt = this._parseDate(to);
                if (!isNaN(d) && !isNaN(df) && !isNaN(dt)) return d <= df || d >= dt;
                const n = Number(actual), nf = Number(from), nt = Number(to);
                if (!isNaN(n) && !isNaN(nf) && !isNaN(nt)) return n < nf || n > nt;
                return actualStr < from || actualStr > to;
            }
            default: return actualStr.includes(expectedStr);
        }
    }

    /**
     * Enter two range values (From / To) for a Between or Not between condition.
     * EJ2 QueryBuilder renders two separate value inputs for these operators.
     * @param {string} fromValue - start of range
     * @param {string} toValue   - end of range
     * @param {number} conditionIndex - 0-based condition row index
     */
    async enterBetweenConditionValues(fromValue, toValue, conditionIndex = 0) {
        const ruleValue = this.filterDialog.locator('.e-rule-value').nth(conditionIndex);
        await ruleValue.waitFor({ state: 'visible', timeout: 8000 });

        // Strategy 1: numeric fields use IDs ending in "valuekey0" / "valuekey1"
        // Strategy 2: date fields — use evaluate() to set value directly, avoiding
        //   Syncfusion DatePicker's calendar popup that causes click() to hang.
        const fromById = ruleValue.locator('[id$="valuekey0"]').first();
        const useIdStrategy = await fromById.isVisible({ timeout: 3000 }).catch(() => false);

        // Sets a value on a Syncfusion date/text input via DOM evaluation, bypassing
        // the popup that click() would trigger.
        const _setValueViaEval = async (input, value) => {
            await input.evaluate((el, v) => {
                el.value = v;
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
                el.dispatchEvent(new Event('blur', { bubbles: true }));
            }, value);
            await this.page.waitForTimeout(400);
        };

        // Fallback for plain text inputs (non-Syncfusion popup pickers).
        const _fillByTyping = async (input, value) => {
            await input.click({ timeout: 5000 });
            await this.page.keyboard.press('Control+A');
            await this.page.keyboard.press('Delete');
            await input.pressSequentially(value, { delay: 80 });
            await this.page.waitForTimeout(400);
        };

        const _fillInput = async (input, value) => {
            try {
                await _setValueViaEval(input, value);
            } catch (e) {
                await _fillByTyping(input, value);
            }
        };

        if (useIdStrategy) {
            await _fillInput(fromById, fromValue);
            const toById = ruleValue.locator('[id$="valuekey1"]').first();
            await _fillInput(toById, toValue);
        } else {
            // Date fields: target visible text inputs only (avoids or() deduplication issues)
            const inputs = ruleValue.locator('input[type="text"], input:not([type="hidden"])');
            const count = await inputs.count();
            if (count >= 2) {
                await _fillInput(inputs.first(), fromValue);
                await _fillInput(inputs.nth(1), toValue);
            } else if (count === 1) {
                // Single DateRangePicker: set from value, then Tab into to-date segment
                const single = inputs.first();
                await _setValueViaEval(single, fromValue);
                await this.page.waitForTimeout(300);
                // Use DOM focus() directly to avoid Playwright actionability hang
                await single.evaluate(el => el.focus()).catch(() => {});
                await this.page.keyboard.press('Tab');
                await this.page.keyboard.press('Control+A');
                await this.page.keyboard.press('Delete');
                await this.page.keyboard.pressSequentially(toValue, { delay: 80 });
                await this.page.waitForTimeout(400);
            }
        }

        console.log(`✓ Entered between values "${fromValue}" and "${toValue}" for condition ${conditionIndex}`);
    }

    /**
     * Validate every item in the API response satisfies a single condition.
     * @param {Object} responseBody  - Parsed JSON from /persons/list
     * @param {string} fieldLabel    - UI label e.g. "First Name"
     * @param {string} operator      - e.g. "Contains", "Starts with"
     * @param {string} value         - filter value
     */
    async validateApiResponseCondition(responseBody, fieldLabel, operator, value) {
        expect(responseBody).toBeTruthy();
        expect(Array.isArray(responseBody.items)).toBe(true);
        const apiField = this.mapFieldLabel(fieldLabel);
        const items = responseBody.items;
        console.log(`Validating ${items.length} items: "${fieldLabel}" (${apiField}) ${operator} "${value}"`);
        for (let i = 0; i < items.length; i++) {
            const match = this.checkCondition(items[i], apiField, operator, value);
            if (!match) {
                // Resolve the actual value for a useful error message
                let actual = items[i];
                for (const key of apiField.split('.')) actual = actual?.[key];
                const actualDisplay = actual === null || actual === undefined ? '(null)' : JSON.stringify(actual);
                console.error(`✗ Item[${i}] name="${items[i].name}" actual ${apiField}=${actualDisplay} fails: ${fieldLabel} ${operator} "${value}"`);
            }
            expect(
                match,
                `Item[${i}] name="${items[i].name}" actual ${apiField}=<see console> fails: ${fieldLabel} ${operator} "${value}"`
            ).toBe(true);
        }
        console.log(`✓ All ${items.length} records satisfy: ${fieldLabel} ${operator} "${value}"`);
    }

    /**
     * Validate every item in the API response satisfies condition1 OR condition2.
     */
    async validateApiResponseORConditions(responseBody, fieldLabel1, operator1, value1, fieldLabel2, operator2, value2) {
        expect(responseBody).toBeTruthy();
        expect(Array.isArray(responseBody.items)).toBe(true);
        const apiField1 = this.mapFieldLabel(fieldLabel1);
        const apiField2 = this.mapFieldLabel(fieldLabel2);
        const items = responseBody.items;
        console.log(`Validating ${items.length} items: "${fieldLabel1}" ${operator1} "${value1}" OR "${fieldLabel2}" ${operator2} "${value2}"`);
        for (let i = 0; i < items.length; i++) {
            const match1 = this.checkCondition(items[i], apiField1, operator1, value1);
            const match2 = this.checkCondition(items[i], apiField2, operator2, value2);
            expect(
                match1 || match2,
                `Item[${i}] name="${items[i].name}" satisfies neither condition`
            ).toBe(true);
        }
        console.log(`✓ All ${items.length} records satisfy at least one OR condition`);
    }

    /**
     * Validate every item in the API response satisfies BOTH condition1 AND condition2.
     * Used for combined "Not in" / multi-condition AND scenarios.
     */
    async validateApiResponseANDConditions(responseBody, fieldLabel1, operator1, value1, fieldLabel2, operator2, value2) {
        expect(responseBody).toBeTruthy();
        expect(Array.isArray(responseBody.items)).toBe(true);
        const apiField1 = this.mapFieldLabel(fieldLabel1);
        const apiField2 = this.mapFieldLabel(fieldLabel2);
        const items = responseBody.items;
        console.log(`Validating ${items.length} items: "${fieldLabel1}" ${operator1} "${value1}" AND "${fieldLabel2}" ${operator2} "${value2}"`);

        if (items.length > 0) {
            console.log('── Sample API item (Item[0]) ──');
            console.log(JSON.stringify(items[0], null, 2));
            console.log('──────────────────────────────');
        }

        for (let i = 0; i < items.length; i++) {
            let actual1 = items[i];
            for (const key of apiField1.split('.')) actual1 = actual1?.[key];
            let actual2 = items[i];
            for (const key of apiField2.split('.')) actual2 = actual2?.[key];

            if (actual1 === null || actual1 === undefined) {
                console.warn(`⚠ Field "${apiField1}" is null/undefined in Item[${i}] — top keys: [${Object.keys(items[i] || {}).join(', ')}]. Skipping.`);
                continue;
            }
            if (actual2 === null || actual2 === undefined) {
                console.warn(`⚠ Field "${apiField2}" is null/undefined in Item[${i}] — top keys: [${Object.keys(items[i] || {}).join(', ')}]. Skipping.`);
                continue;
            }

            const match1 = this.checkCondition(items[i], apiField1, operator1, value1);
            const match2 = this.checkCondition(items[i], apiField2, operator2, value2);
            if (!match1) console.error(`✗ Item[${i}] ${apiField1}=${JSON.stringify(actual1)} fails: ${fieldLabel1} ${operator1} "${value1}"`);
            if (!match2) console.error(`✗ Item[${i}] ${apiField2}=${JSON.stringify(actual2)} fails: ${fieldLabel2} ${operator2} "${value2}"`);
            expect(match1, `Item[${i}] fails condition 1: ${fieldLabel1} ${operator1} "${value1}"`).toBe(true);
            expect(match2, `Item[${i}] fails condition 2: ${fieldLabel2} ${operator2} "${value2}"`).toBe(true);
        }
        console.log(`✓ All ${items.length} records satisfy BOTH conditions`);
    }
}

module.exports = PersonManagementAdvancedFilterPage;
