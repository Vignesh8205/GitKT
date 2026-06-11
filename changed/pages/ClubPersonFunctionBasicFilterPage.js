
/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

class ClubPersonFunctionBasicFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // Filter dialog container
        this.filterDialog = page.locator('[cssclass="right-slide-dialog"]');

        // Filter action buttons (scoped inside dialog)
        this.filterApplyButton = page.locator('[cssclass="right-slide-dialog"] button:has-text("Apply")');
        this.filterResetButton = page.locator('[cssclass="right-slide-dialog"] button:has-text("Reset")');

        // Person management listing – first row
        this.firstPersonRecord = page.locator(
            "//div[contains(@class,'e-gridcontent')]//table//tbody//tr[1]"
        ).first();

        // Functions tab on person detail page
        this.functionsTab = page.locator("//div[text()=' Functions ']");

        // Stored API response promise
        this.functionsResponsePromise = null;

        // Club Management search locators
        this.clubSearchIcon    = page.locator("//span[contains(@style,'url(assets/icons/grassroots/search-icon.svg);')]");
        this.clubSearchInput   = page.locator("//input[@placeholder='Search by clubs']");
        this.clubSearchClose   = page.locator("//button[contains(@class,'text-xl')]");
        this.firstClubRecord   = page.locator("(//div[contains(@class,'font-[400] text-base text-[var(--secondary-text)] truncate')])[1]");

        // Person Function(s) tab on club detail page
        this.personFunctionTab = page.locator("//div[contains(@class,'e-tab-text')]//div[normalize-space()='Person Function(s)']");
        // Team multiselect wrapper (used in filterByTeam)
        this.teamMultiSelect = this.page.locator('div.e-multi-select-wrapper').filter({ has: this.page.locator('input[placeholder="Select Team"]') });
    }

    // ─────────────────────────────────────────────────────────────────
    // CLUB MANAGEMENT NAVIGATION
    // ─────────────────────────────────────────────────────────────────

    /**
     * Search for a club by name using the search icon on Club Management list.
     * @param {string} clubName
     */
    async searchClubRecord(clubName) {
        await this.clubSearchIcon.waitFor({ state: 'visible', timeout: 15000 });
        await this.clubSearchIcon.click();
        await this.clubSearchInput.waitFor({ state: 'visible', timeout: 15000 });
        await this.clubSearchInput.fill(clubName);
        await this.clubSearchInput.press('Enter');
        await this.page.waitForTimeout(1500);
        // Close the search overlay so the filtered club list becomes clickable
        const closeBtn = this.page.locator("//button[contains(@class,'text-xl')]");
        const closeVisible = await closeBtn.isVisible().catch(() => false);
        if (closeVisible) {
            await closeBtn.click();
            await this.page.waitForTimeout(800);
        }
        console.log(`✓ Searched club with: "${clubName}"`);
    }

    /**
     * Click the first matched club record from the search result grid.
     */
    async clickMatchedClubRecord() {
        await this.firstClubRecord.waitFor({ state: 'visible', timeout: 15000 });
        await this.firstClubRecord.click();
        console.log('✓ Clicked matched club record');
    }

    /**
     * Navigate to the Person Function(s) tab on the club detail page.
     */
    async navigateToPersonFunctionTab() {
        await this.personFunctionTab.waitFor({ state: 'visible', timeout: 15000 });
        await this.personFunctionTab.click();
        await this.page.waitForTimeout(1000);
        console.log('✓ Navigated to Person Function(s) tab');
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION (legacy – kept for backward compatibility)
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
    // OPEN FILTER DIALOG
    // ─────────────────────────────────────────────────────────────────

    /**
     * Opens the filter dialog for the given function section.
     * Tries three strategies in order:
     *   1. ARIA region scope (Person Management page)
     *   2. XPath: filter button/span near the section heading (Club Management page)
     *   3. Any visible filter button/span on the page
     * @param {string} sectionName - e.g. "Club Function(s)", "Section Function(s)", "Team Function(s)"
     */
    async openFunctionFilterDialog(sectionName) {
        const isOpen = await this.filterDialog.isVisible().catch(() => false);
        if (isOpen) {
            console.log(`${sectionName} filter dialog already open – skipping open click`);
            return;
        }

        // Strategy 1: ARIA region (works on Person Management page)
        const regionBtn = this.page
            .getByRole('region', { name: sectionName })
            .locator('button:has(span[style*="filter.svg"]), span[style*="filter.svg"]')
            .first();
        const s1Visible = await regionBtn.isVisible().catch(() => false);
        if (s1Visible) {
            await regionBtn.click();
            await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
            console.log(`✓ Opened filter dialog for "${sectionName}" (strategy: ARIA region)`);
            return;
        }

        // Strategy 2: XPath – find the heading that contains sectionName,
        //             then the nearest filter icon button/span after it
        const xpathBtn = this.page.locator(
            `(//div[contains(normalize-space(),'${sectionName}')]` +
            `/following::button[.//span[contains(@style,'filter.svg')]] | ` +
            `//div[contains(normalize-space(),'${sectionName}')]` +
            `/following::span[contains(@style,'filter.svg')])[1]`
        );
        const s2Visible = await xpathBtn.isVisible().catch(() => false);
        if (s2Visible) {
            await xpathBtn.click();
            await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
            console.log(`✓ Opened filter dialog for "${sectionName}" (strategy: XPath heading)`);
            return;
        }

        // Strategy 3: Fallback – first visible filter icon on page
        const fallbackBtn = this.page.locator(
            'button:has(span[style*="filter.svg"]), span[style*="filter.svg"]'
        ).first();
        await fallbackBtn.waitFor({ state: 'visible', timeout: 10000 });
        await fallbackBtn.click();
        await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log(`✓ Opened filter dialog for "${sectionName}" (strategy: fallback first filter icon)`);
    }

    async verifyFilterDialogVisible() {
        await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ Filter dialog is displayed');
    }

    // ─────────────────────────────────────────────────────────────────
    // FILTER INTERACTIONS
    // ─────────────────────────────────────────────────────────────────

    /**
     * Search by text inside the filter dialog search box.
     * @param {string} text
     */
    async searchByText(text) {
        // Locate the AutoComplete input inside the filter dialog
        const searchInput = this.filterDialog
            .locator('ejs-autocomplete input, input[type="text"]')
            .first();
        await searchInput.waitFor({ state: 'visible', timeout: 10000 });
        await searchInput.click();
        await searchInput.clear();

        // Type character-by-character so EJ2 AutoComplete debounce fires
        await searchInput.pressSequentially(text, { delay: 80 });
        console.log(`✓ Entered search text "${text}"`);

        // Wait for the suggestion popup to appear (up to 5 s)
        const suggestionLocator = this.page.locator(
            'div.e-popup-open .e-list-item, ul.e-list-parent li.e-list-item'
        );
        let suggestionsVisible = false;
        for (let i = 0; i < 10; i++) {
            await this.page.waitForTimeout(500);
            suggestionsVisible = await suggestionLocator.first().isVisible().catch(() => false);
            if (suggestionsVisible) break;
        }

        if (suggestionsVisible) {
            // Prefer the item whose text matches what was typed
            const exactMatch = this.page.locator(
                `div.e-popup-open .e-list-item:has-text("${text}"), ul.e-list-parent li.e-list-item:has-text("${text}")`
            ).first();
            const exactVisible = await exactMatch.isVisible().catch(() => false);
            if (exactVisible) {
                await exactMatch.click();
                console.log(`✓ Selected suggestion matching "${text}"`);
            } else {
                await suggestionLocator.first().click();
                console.log(`✓ Selected first available suggestion`);
            }
        } else {
            console.log(`ℹ No autocomplete suggestions appeared — using typed value as-is`);
        }
    }

    /**
     * Select a Status badge (e.g. "Active", "Inactive").
     * @param {string} status
     */
    async filterByStatus(status) {
        const badge = this.filterDialog
            .locator(`button:has-text("${status}"), span:has-text("${status}")`)
            .first();
        await badge.waitFor({ state: 'visible', timeout: 8000 });
        await badge.click();
        console.log(`✓ Selected Status badge: "${status}"`);
    }

    /**
     * Select the Level badge (e.g. "Section", "Club", "Team").
     * Level is rendered as clickable badge buttons inside the filter dialog.
     * @param {string} level
     */
    async filterByLevel(level) {
        const badge = this.filterDialog
            .locator(`button:has-text("${level}"), span:has-text("${level}")`)
            .first();
        await badge.waitFor({ state: 'visible', timeout: 8000 });
        await badge.click();
        console.log(`✓ Selected Level badge: "${level}"`);
    }

    /**
     * Select a Club Function type (e.g. "Club Clothing Admin").
     * @param {string} value
     */
    async filterByClubFunction(value) {
        await this._selectDropdownOption('Club Function', value);
    }

    /**
     * Select a Section value from the EJ2 CheckBox-mode MultiSelect.
     * The input is readonly so we click .e-ddl-icon to open, then type to trigger API search.
     * @param {string} value
     */
    async filterBySection(value) {
        // The Section field is the first multiselect wrapper in the Section Function dialog
        const sectionWrapper = this.filterDialog.locator('div.e-multi-select-wrapper').first();
        await sectionWrapper.waitFor({ state: 'visible', timeout: 8000 });

        // Click the dropdown icon to open the popup
        const ddlIcon = sectionWrapper.locator('span.e-ddl-icon, span.e-input-group-icon');
        const iconVisible = await ddlIcon.isVisible().catch(() => false);
        if (iconVisible) {
            await ddlIcon.click();
        } else {
            await sectionWrapper.click();
        }
        await this.page.waitForTimeout(600);

        // Find the filter input inside the popup
        const filterInput = this.page.locator(
            'div.e-popup-open input.e-input-filter, ' +
            'div.e-popup-open input.e-filter-wrap-focus, ' +
            'div.e-popup-open input[type="text"]'
        ).first();
        await filterInput.waitFor({ state: 'visible', timeout: 8000 });
        await filterInput.click();
        await filterInput.clear();
        // Use pressSequentially so EJ2 debounce fires and triggers the API search
        await filterInput.pressSequentially(value, { delay: 80 });

        // Poll for the list item — API search may take several seconds
        const listItem = this.page.locator(
            `//div[contains(@class,'e-popup-open')]//li[contains(normalize-space(.),'${value}')]`
        ).first();
        let itemVisible = false;
        for (let i = 0; i < 20; i++) {
            await this.page.waitForTimeout(500);
            itemVisible = await listItem.isVisible().catch(() => false);
            if (itemVisible) break;
        }
        if (itemVisible) {
            await listItem.click();
            console.log(`✓ Selected Section: "${value}"`);
        } else {
            console.warn(`⚠ Section item "${value}" did not appear in dropdown after typing. Falling back to first available item.`);
            const firstItem = this.page.locator('div.e-popup-open li.e-list-item').first();
            if (await firstItem.isVisible().catch(() => false)) {
                const text = await firstItem.textContent().catch(() => '');
                await firstItem.click();
                console.log(`✓ Selected fallback Section: "${text.trim()}"`);
            } else {
                throw new Error(`Section item "${value}" did not appear and no fallback items were available.`);
            }
        }

        // Close popup
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(300);
    }

    /**
     * Select a Section Function type (e.g. "Futsal Co-Ordinator").
     * @param {string} value
     */
    async filterBySectionFunction(value) {
        await this._selectDropdownOption('Section Function', value);
    }

    /**
     * Select a Team value from the EJ2 API-backed MultiSelect.
     * @param {string} value
     */
    // async filterByTeam(value) {
    //     // The Team field is the first multiselect wrapper in the Team Function dialog
    //     const teamWrapper = this.filterDialog.locator('div.e-multi-select-wrapper').first();
    //     await teamWrapper.waitFor({ state: 'visible', timeout: 8000 });
    //     await teamWrapper.scrollIntoViewIfNeeded();

    //     // Click the dropdown icon to open the EJ2 multiselect popup
    //     const ddlIcon = teamWrapper.locator('span.e-ddl-icon, span.e-input-group-icon');
    //     const iconVisible = await ddlIcon.isVisible().catch(() => false);
    //     if (iconVisible) {
    //         await ddlIcon.click({ force: true });
    //     } else {
    //         await teamWrapper.click({ force: true });
    //     }

    //     // Wait for the multiselect popup (items load immediately without needing a filter input)
    //     const popup = this.page.locator('div.e-multi-select-list-wrapper.e-popup-open');
    //     await popup.waitFor({ state: 'visible', timeout: 8000 });
    //     await this.page.waitForTimeout(500);

    //     // force:true bypasses checkbox overlay pointer interception
    //     const listItem = popup.locator('li.e-list-item').filter({ hasText: value }).first();
    //     await listItem.waitFor({ state: 'visible', timeout: 8000 });
    //     await listItem.click({ force: true });
    //     console.log(`✓ Selected Team: "${value}"`);

    //     await this.page.keyboard.press('Escape');
    //     await this.page.waitForTimeout(300);
    // }

    async filterByTeam(teamName) {
  // Click the multiselect to open dropdown
  await this.teamMultiSelect.click();

  // Wait for the popup wrapper to appear first
  const popupWrapper = this.page.locator('div.e-multi-select-list-wrapper.e-popup-open');
  await popupWrapper.waitFor({ state: 'visible', timeout: 10000 });

  // Wait for list items to be rendered inside the popup
  const listItems = popupWrapper.locator('li.e-list-item');
  await listItems.first().waitFor({ state: 'visible', timeout: 10000 });

  // Now search/type to filter if there are many items
  const searchInput = this.page.locator('div.e-multi-select-list-wrapper.e-popup-open input.e-input');
  if (await searchInput.isVisible()) {
    await searchInput.fill(teamName);
    await this.page.waitForTimeout(500); // wait for filter to apply
  }

  // Find and click the specific item
  const targetItem = popupWrapper
    .locator('li.e-list-item')
    .filter({ hasText: teamName })
    .first();

  await targetItem.waitFor({ state: 'visible', timeout: 10000 });
  await targetItem.click();
}

    /**
     * Select a Team Function type (e.g. "Head Coach").
     * @param {string} value
     */
    async filterByTeamFunction(value) {
        await this._selectDropdownOption('Team Function', value);
    }

    /**
     * Fill the date range picker using EJ2 JS API with keyboard fallback.
     * @param {string} rangeValue - e.g. "10/03/2026 - 27/03/2026"
     */
    async filterByDateRange(rangeValue) {
        const [startVal, endVal] = rangeValue.split(' - ').map(s => s.trim());

        const rangeInput = this.filterDialog
            .locator('input[placeholder="Select Date Range"]')
            .first();
        await rangeInput.waitFor({ state: 'visible', timeout: 8000 });
        await rangeInput.click();
        await this.page.waitForTimeout(500);

        // Use EJ2 JS API to set dates
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

        // Tab out to close calendar
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(400);

        // Keyboard fallback if JS API approach failed
        const displayed = await rangeInput.inputValue().catch(() => '');
        const valid = displayed && !displayed.includes('DD') && displayed.trim() !== '';

        if (!valid) {
            console.warn(`⚠ JS API approach failed (result=${result}), using keyboard fallback`);
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
        console.log(`✓ Date range filled: "${rangeValue}" | displayed: "${finalVal}"`);
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY / RESET
    // ─────────────────────────────────────────────────────────────────

    async clickApply() {
        await this.filterApplyButton.waitFor({ state: 'visible', timeout: 8000 });
        await this.filterApplyButton.click();
        await this.page.waitForTimeout(1000);
        console.log('✓ Clicked Apply on filter dialog');
    }

    async clickReset() {
        const isOpen = await this.filterDialog.isVisible().catch(() => false);
        if (!isOpen) return;
        await this.filterResetButton.waitFor({ state: 'visible', timeout: 8000 });
        await this.filterResetButton.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked Reset on filter dialog');
    }

    // ─────────────────────────────────────────────────────────────────
    // VERIFICATION
    // ─────────────────────────────────────────────────────────────────

    async verifyGridHasRecords() {
        const rows = this.page.locator(
            "//div[contains(@class,'e-gridcontent')]//table//tbody//tr"
        );
        await rows.first().waitFor({ state: 'visible', timeout: 15000 });
        const count = await rows.count();
        expect(count).toBeGreaterThan(0);
        console.log(`✓ Grid displays ${count} record(s)`);
    }

    async verifyFiltersCleared() {
        const isOpen = await this.filterDialog.isVisible().catch(() => false);
        if (isOpen) {
            const inputs = this.filterDialog.locator('input[type="text"], input.e-input');
            const count = await inputs.count();
            for (let i = 0; i < count; i++) {
                const val = await inputs.nth(i).inputValue().catch(() => '');
                if (val && val.trim() !== '') {
                    console.warn(`⚠ Filter input[${i}] still has value: "${val}"`);
                }
            }
        }
        console.log('✓ Filter cleared verification done');
    }

    // ─────────────────────────────────────────────────────────────────
    // API RESPONSE CAPTURE
    // ─────────────────────────────────────────────────────────────────

    startCapturingFunctionsAPI() {
        this.functionsResponsePromise = this.page.waitForResponse(
            r => r.url().toLowerCase().includes('function') &&
                 r.url().toLowerCase().includes('list') &&
                 r.request().method() === 'POST' &&
                 r.status() === 200,
            { timeout: 90000 }
        );
        console.log('✓ Listening for functions API response');
    }

    async awaitFunctionsAPIResponse() {
        const response = await this.functionsResponsePromise;
        const body = await response.json();
        this.functionsResponsePromise = null;
        this._lastAPIResponse = body;
        console.log(`✓ Functions API returned: ${JSON.stringify(body).slice(0, 120)}`);
        return body;
    }

    printAPIResponseAsJSON() {
        const body = this._lastAPIResponse;
        if (!body) {
            console.log('⚠ No API response captured yet');
            return;
        }
        console.log('─────────────── API RESPONSE (JSON) ───────────────');
        console.log(JSON.stringify(body, null, 2));
        console.log('────────────────────────────────────────────────────');
    }

    async verifyAPITotalGreaterThanZero(apiBody) {
        const count = apiBody.total ?? apiBody.totalCount ?? apiBody.items?.length ?? 0;
        expect(count).toBeGreaterThan(0);
        console.log(`✓ API total count is ${count} (greater than zero)`);
    }

    // ─────────────────────────────────────────────────────────────────
    // HELPER – SELECT DROPDOWN OPTION
    // ─────────────────────────────────────────────────────────────────

    /**
     * Generic EJ2 dropdown/multiselect selector scoped to a filter field label.
     * @param {string} fieldLabel - The visible label text (e.g. "Status", "Level", "Club Function")
     * @param {string} value      - The option text to select
     */
    async _selectDropdownOption(fieldLabel, value) {
        // Locate container following the label
        const container = this.filterDialog.locator(
            `//*[normalize-space()='${fieldLabel}']/following-sibling::*[1] | ` +
            `//*[normalize-space()='${fieldLabel}']/parent::*/following-sibling::*[1]`
        ).first();
        await container.waitFor({ state: 'visible', timeout: 8000 });

        // Click the input / wrapper to open dropdown popup
        const inputArea = container
            .locator('input.e-input, .e-multi-select-wrapper, .e-dropdownlist, .e-control')
            .first();
        const inputVisible = await inputArea.isVisible().catch(() => false);
        if (inputVisible) {
            await inputArea.click();
        } else {
            await container.click();
        }
        await this.page.waitForTimeout(400);

        // Detect EJ2 MultiSelect vs DropDownList popup
        const multiSelectPopup = this.page.locator('div.e-multi-select-list-wrapper.e-popup-open');
        const anyPopupItems    = this.page.locator('div.e-popup-open .e-list-item');

        let popup = null;
        const isMultiSelect = await multiSelectPopup.isVisible().catch(() => false);
        if (isMultiSelect) {
            popup = multiSelectPopup;
        } else {
            await anyPopupItems.first().waitFor({ state: 'visible', timeout: 10000 });
            popup = this.page.locator('div.e-popup-open').first();
        }

        // Type in the search / filter box if available
        const searchBox = popup.locator('input.e-input-filter, input.e-filter-wrap-focus');
        const hasSearch = await searchBox.isVisible().catch(() => false);
        if (hasSearch) {
            await searchBox.fill(value);
            await this.page.waitForTimeout(500);
        }

        // Click exact match first, then fallback to partial match
        const escaped   = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const listItems = popup.locator('.e-list-item');

        const exactOption = listItems
            .filter({ hasText: new RegExp(`^\\s*${escaped}\\s*$`) })
            .first();
        const exactVisible = await exactOption.isVisible().catch(() => false);

        if (exactVisible) {
            await exactOption.click();
        } else {
            // Fallback: partial text match without looping over all items
            const partialOption = listItems.filter({ hasText: value }).first();
            await partialOption.waitFor({ state: 'visible', timeout: 5000 });
            await partialOption.click();
        }

        // Close popup if still open
        const stillOpen = await this.page.locator('div.e-popup-open').isVisible().catch(() => false);
        if (stillOpen) await this.page.keyboard.press('Escape');

        console.log(`✓ Selected "${value}" for field "${fieldLabel}"`);
    }
}

module.exports = ClubPersonFunctionBasicFilterPage;
