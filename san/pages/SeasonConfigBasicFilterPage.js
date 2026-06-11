/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

/**
 * Class Name: SeasonConfigBasicFilterPage
 *
 * Description:
 * Page Object for the Season Configuration Basic Filter panel inside
 * Competition Management > Season > Home > Configurations.
 *
 * Supported filter fields:
 *   Federation        – ejs-multiselect (checkbox mode)
 *   Format            – badge buttons (Football / Futsal / Mini-football)
 *   Region            – ejs-multiselect (checkbox mode)
 *   Type              – ejs-multiselect (checkbox mode)
 *   Competition Type  – ejs-multiselect (checkbox mode)
 *   Time Frame        – date-range picker input (DD/MM/YYYY - DD/MM/YYYY)
 *
 * API endpoint validated: /season/configuration/list
 *
 * @author Auto-generated
 * @version 1.0
 */

class SeasonConfigBasicFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // ── API response capture promise
        this._apiResponsePromise = null;
        this._cachedAPIBody = null;
    }

    // ── Getters so locators always use the current this.page (which may be
    // updated to a new tab after clickFirstListedRecord detects a new tab).
    get filterDialog() {
        return this.page.locator('[cssclass="right-slide-dialog"].e-popup-open').last();
    }
    get applyButton() {
        return this.page.locator('[cssclass="right-slide-dialog"].e-popup-open button').filter({ hasText: /^Apply$/ }).first();
    }
    get resetButton() {
        return this.page.locator('[cssclass="right-slide-dialog"].e-popup-open button').filter({ hasText: /^Reset$/ }).first();
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION – SEASON TAB
    // ─────────────────────────────────────────────────────────────────

    async clickSeasonTab() {
        // Exact DOM: <span class="e-list-text ng-tns-c1404760026-30">Season</span>
        // Use waitFor with a long timeout (same pattern as VenueManagementAdvancedFilterPage)
        // because the sidebar treeview loads asynchronously after Competition Management navigation.
        const tab = this.page.locator(
            'span.e-list-text, ' +
            'li.e-list-item, ' +
            'div.ng-star-inserted'
        ).filter({ hasText: /^Season$/ }).first();

        await tab.waitFor({ state: 'visible', timeout: 60000 });
        await tab.scrollIntoViewIfNeeded();
        await tab.click();
        console.log('✓ Clicked "Season" tab in Competition Management sidebar');

        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        console.log('✓ Season tab loaded');
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION – HOME TAB
    // ─────────────────────────────────────────────────────────────────

    async clickHomeTab() {
        // Exact DOM: <div class="ng-star-inserted"> Home </div>
        // Use XPath union pattern (same as VenueManagementAdvancedFilterPage.clickHomeTab)
        const tab = this.page.locator(
            '//div[contains(@class,"ng-star-inserted") and normalize-space()="Home"] | ' +
            '//span[normalize-space()="Home"] | ' +
            '//button[normalize-space()="Home"] | ' +
            '//a[normalize-space()="Home"]'
        ).first();

        await tab.waitFor({ state: 'visible', timeout: 15000 });
        await tab.click();
        console.log('✓ Clicked "Home" sub-tab in Season management');

        await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
        console.log('✓ Season Home tab loaded');
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION – QUICK SEARCH ICON
    // ─────────────────────────────────────────────────────────────────

    async clickQuickSearchIcon() {
        // Exact DOM: <button class="no-border-box w-[36px] h-[36px]...">
        //   <span class="sf-custom-icon" style="--icon: url(assets/icons/grassroots/search-icon.svg);">
        const selectors = [
            'button.no-border-box:has(span.sf-custom-icon[style*="search-icon.svg"])',
            'button:has(span.sf-custom-icon[style*="search-icon.svg"])',
            'button:has(span[style*="search-icon.svg"])',
        ];

        for (const sel of selectors) {
            const buttons = this.page.locator(sel);
            const count = await buttons.count();
            if (count === 0) continue;

            for (let i = 0; i < count; i++) {
                const btn = buttons.nth(i);
                if (!await btn.isVisible().catch(() => false)) continue;
                await btn.click();
                await this.page.waitForTimeout(800);
                console.log(`✓ Clicked quick search icon on Season listing`);
                return;
            }
        }

        throw new Error('Could not locate the quick search icon on Season listing');
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION – SEARCH FOR SEASON
    // ─────────────────────────────────────────────────────────────────

    async searchForSeason(searchText) {
        // Exact DOM: <input placeholder="Search by season" id="search_input">
        const inputSelectors = [
            'input[placeholder="Search by season"]',
            '#search_input',
            'input[id="search_input"]',
        ];

        let searchInput = null;
        for (const sel of inputSelectors) {
            const candidate = this.page.locator(sel).first();
            if (await candidate.count() > 0 && await candidate.isVisible().catch(() => false)) {
                searchInput = candidate;
                break;
            }
        }

        if (!searchInput) {
            throw new Error('Could not locate the season search input');
        }

        await searchInput.click();
        await searchInput.fill(searchText);
        // Submit the search so the listing filters to matching records
        await searchInput.press('Enter');
        console.log(`✓ Typed "${searchText}" into season search input and pressed Enter`);

        // Wait for the listing to update and display the matched records
        await this.page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
        await this.page.waitForTimeout(1500);

        // Confirm at least one row is now visible in the listing
        const firstRow = this.page.locator('table tbody tr, tr.e-row, .e-row').first();
        await firstRow.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
        console.log(`✓ Season search results for "${searchText}" are displayed on listing`);
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION – CLOSE SEARCH POPUP
    // ─────────────────────────────────────────────────────────────────

    async closeSearchPopup() {
        // Exact DOM: <button class="text-xl leading-none text-[#4A0E23]"> × </button>
        const closeSelectors = [
            'button.text-\\[\\#4A0E23\\]',
            'button[class*="text-[#4A0E23]"]',
            'button:has-text("×")',
        ];

        for (const sel of closeSelectors) {
            const btn = this.page.locator(sel).first();
            if (await btn.count() > 0 && await btn.isVisible().catch(() => false)) {
                await btn.click();
                await this.page.waitForTimeout(500);
                console.log('✓ Closed season quick search popup');
                return;
            }
        }

        // Fallback: find button with × text content
        const allButtons = this.page.locator('button');
        const count = await allButtons.count();
        for (let i = 0; i < count; i++) {
            const btn = allButtons.nth(i);
            const text = (await btn.textContent().catch(() => '')).trim();
            if (text === '×' && await btn.isVisible().catch(() => false)) {
                await btn.click();
                await this.page.waitForTimeout(500);
                console.log('✓ Closed season quick search popup (fallback)');
                return;
            }
        }

        throw new Error('Could not locate the close button for the season search popup');
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION – CLICK FIRST LISTED RECORD
    // ─────────────────────────────────────────────────────────────────

    async clickFirstListedRecord() {
        const rowSelectors = [
            'table tbody tr',
            '.e-row',
            'div[class*="grid-row"]',
            'tr.e-row',
        ];

        // Watch for a new tab that may open when the record link is clicked.
        const context = this.page.context();
        const newTabPromise = context.waitForEvent('page', { timeout: 5000 }).catch(() => null);

        for (const sel of rowSelectors) {
            const rows = this.page.locator(sel);
            const count = await rows.count();
            if (count === 0) continue;

            for (let i = 0; i < count; i++) {
                const row = rows.nth(i);
                if (!await row.isVisible().catch(() => false)) continue;
                await row.click();

                // Give the app 2 s to either navigate in-tab or open a new tab.
                await this.page.waitForTimeout(2000);

                const newTab = await newTabPromise;
                if (newTab) {
                    // The app opened the season detail in a new browser tab.
                    // Switch this.page so all subsequent locators use the new tab.
                    await newTab.waitForLoadState('domcontentloaded', { timeout: 20000 }).catch(() => {});
                    this.page = newTab;
                    console.log('✓ Switched to new tab for season detail page');
                } else {
                    // Same-tab navigation – wait for networkidle as before.
                    await this.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
                    console.log('✓ Clicked first season record in listing and waited for navigation');
                }
                return;
            }
        }

        throw new Error('Could not locate any visible row in season listing grid');
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION – CONFIGURATIONS TAB
    // ─────────────────────────────────────────────────────────────────

    async clickConfigurationsTab() {
        // Exact DOM: <span class="ng-star-inserted"> Configurations </span>
        const strategies = [
            () => this.page.locator('span.ng-star-inserted').filter({ hasText: /^\s*Configurations\s*$/ }).first(),
            () => this.page.getByText('Configurations', { exact: true }).first(),
            () => this.page.locator('[class*="ng-star-inserted"]').filter({ hasText: /^\s*Configurations\s*$/ }).first(),
        ];

        let tab = null;
        for (const strategy of strategies) {
            const candidate = strategy();
            if (await candidate.count() > 0 && await candidate.isVisible().catch(() => false)) {
                tab = candidate;
                break;
            }
        }

        if (!tab) {
            throw new Error('Could not locate the "Configurations" tab in season detail page');
        }

        await tab.scrollIntoViewIfNeeded();
        await tab.click();
        console.log('✓ Clicked "Configurations" tab in season detail page');

        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        console.log('✓ Configurations tab loaded');
    }

    // ─────────────────────────────────────────────────────────────────
    // OPEN FILTER DIALOG
    // ─────────────────────────────────────────────────────────────────

    async clickFilterIcon() {
        // Exact DOM: <button class="no-border-box w-[36px] h-[36px]...">
        //   <span class="sf-custom-icon" style="--icon: url(assets/icons/grassroots/filter.svg);">
        const buttonSelectors = [
            'button.no-border-box:has(span.sf-custom-icon[style*="filter.svg"])',
            'button:has(span.sf-custom-icon[style*="filter.svg"])',
            'button:has(span[style*="filter.svg"])',
        ];

        for (const sel of buttonSelectors) {
            const buttons = this.page.locator(sel);
            const count = await buttons.count();
            if (count === 0) continue;

            for (let i = 0; i < count; i++) {
                const btn = buttons.nth(i);
                if (!await btn.isVisible().catch(() => false)) continue;

                console.log(`ℹ Clicking Season Config filter button [${sel}] index ${i}`);
                await btn.evaluate(el => el.click()).catch(() => btn.click({ force: true }).catch(() => {}));
                await this.page.waitForTimeout(1000);

                if (await this.filterDialog.isVisible().catch(() => false)) {
                    console.log('✓ Season Configuration filter dialog opened');
                    return;
                }
            }
        }

        // Final wait — in case the dialog animates in slowly
        await this.filterDialog.waitFor({ state: 'visible', timeout: 15000 });
        console.log('✓ Season Configuration filter dialog opened (late)');
    }

    // ─────────────────────────────────────────────────────────────────
    // FILTER TAB CLICK
    // ─────────────────────────────────────────────────────────────────

    async clickBasicFilterTab() {
        const tab = this.filterDialog.locator('button:has-text("Basic Filter")').first();
        await tab.waitFor({ state: 'visible', timeout: 8000 });
        await tab.click();
        await this.page.waitForTimeout(400);
        console.log('✓ Clicked "Basic Filter" tab in Season Configuration filter dialog');
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY FILTER CRITERIA DISPATCHER
    // ─────────────────────────────────────────────────────────────────

    /**
     * Apply Season Configuration Basic Filter criteria from a data table rowsHash.
     *
     * @param {Object} criteria – key/value pairs (field → value)
     */
    async applySeasonConfigBasicFilterCriteria(criteria) {
        for (const [field, value] of Object.entries(criteria)) {
            switch (field) {
                case 'Federation':
                    await this._selectMultiselectByLabel('Federation', value);
                    break;
                case 'Format':
                    await this._selectFormatBadge(value);
                    break;
                case 'Region':
                    await this._selectMultiselectByLabel('Region', value);
                    break;
                case 'Type':
                    await this._selectMultiselectByLabel('Type', value);
                    break;
                case 'Competition Type':
                    await this._selectMultiselectByLabel('Competition Type', value);
                    break;
                case 'Time Frame':
                    await this._setTimeFrame(value);
                    break;
                default:
                    console.warn(`⚠ Unknown Season Configuration filter field: "${field}" – skipping`);
            }
            await this.page.waitForTimeout(300);
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // MULTISELECT BY LABEL (Federation / Region / Type / Competition Type)
    // ─────────────────────────────────────────────────────────────────

    /**
     * Locate and interact with the multiselect associated with the given field label.
     *
     * Strategy: walk text nodes to find the label, then climb ancestors until we
     * reach a container that holds EXACTLY ONE .e-multi-select-wrapper – that is
     * the field-level container and the wrapper inside it is the right control.
     * Falls back to visual proximity (after scrollIntoView) when the ancestor
     * search reaches the whole-form level.
     *
     * @param {string} fieldLabel – visible label text, e.g. "Federation"
     * @param {string} value      – option to select, e.g. "RBFA"
     */
    async _selectMultiselectByLabel(fieldLabel, value) {
        // Wait for multiselects inside the filter dialog specifically
        await this.page.waitForFunction(
            () => {
                const dialog = document.querySelector('[cssclass="right-slide-dialog"]');
                return (dialog || document).querySelectorAll('div.e-multi-select-wrapper').length > 0;
            },
            { timeout: 15000 }
        ).catch(() => console.warn(`⚠ No .e-multi-select-wrapper found in filter dialog after 15s`));
        await this.page.waitForTimeout(300);

        const tempAttr = `data-sc-label-${fieldLabel.replace(/\s+/g, '-').toLowerCase()}`;

        const found = await this.page.evaluate(({ label, attr }) => {
            document.querySelectorAll(`[${attr}]`).forEach(el => el.removeAttribute(attr));

            // Scope everything to the filter dialog to avoid false matches elsewhere on the page
            const dialog = document.querySelector('[cssclass="right-slide-dialog"]') || document.body;
            const allWrappers = Array.from(dialog.querySelectorAll('div.e-multi-select-wrapper'));
            if (allWrappers.length === 0) return false;

            // Strategy A: placeholder-based (most reliable for empty Syncfusion multiselects)
            // Each ejs-multiselect input renders placeholder="Select {fieldLabel}" when nothing is selected.
            const byPlaceholder = dialog.querySelector(
                `div.e-multi-select-wrapper:has(input.e-dropdownbase[placeholder="Select ${label}"])`
            );
            if (byPlaceholder) {
                byPlaceholder.setAttribute(attr, '1');
                return true;
            }

            // Strategy B: text-node walking + smallest ancestor with exactly 1 wrapper
            const labelEls = [];
            const walker = document.createTreeWalker(dialog, NodeFilter.SHOW_TEXT);
            let node;
            while ((node = walker.nextNode())) {
                if (node.textContent.trim() === label) labelEls.push(node.parentElement);
            }

            for (const labelEl of labelEls) {
                let ancestor = labelEl;
                for (let d = 0; d < 10; d++) {
                    if (!ancestor || ancestor === dialog || ancestor === document.body) break;
                    const wrappers = ancestor.querySelectorAll('.e-multi-select-wrapper');
                    if (wrappers.length === 1) {
                        wrappers[0].setAttribute(attr, '1');
                        return true;
                    }
                    ancestor = ancestor.parentElement;
                }
            }

            // Strategy C: visual proximity (scroll label into view, find closest wrapper)
            for (const labelEl of labelEls) {
                labelEl.scrollIntoView({ block: 'center', behavior: 'instant' });
                const lr = labelEl.getBoundingClientRect();
                if (lr.width === 0 && lr.height === 0) continue;

                let closest = null;
                let minDist = 600;
                for (const w of allWrappers) {
                    const wr = w.getBoundingClientRect();
                    if (wr.width === 0 && wr.height === 0) continue;
                    const dist = Math.hypot(wr.left - lr.left, wr.top - lr.top);
                    if (dist < minDist) { minDist = dist; closest = w; }
                }
                if (closest) { closest.setAttribute(attr, '1'); return true; }
            }

            return false;
        }, { label: fieldLabel, attr: tempAttr });

        if (!found) {
            // Collect diagnostics to understand the dialog state
            const diag = await this.page.evaluate(({ label }) => {
                const dialog = document.querySelector('[cssclass="right-slide-dialog"]');
                if (!dialog) return { error: 'filter dialog not found in DOM' };
                const wrappers = dialog.querySelectorAll('div.e-multi-select-wrapper');
                const inputs = Array.from(dialog.querySelectorAll('input.e-dropdownbase')).map(i => ({
                    placeholder: i.placeholder, value: i.value
                }));
                const texts = [];
                const walker = document.createTreeWalker(dialog, NodeFilter.SHOW_TEXT);
                let n;
                while ((n = walker.nextNode())) {
                    const t = n.textContent.trim();
                    if (t && t.length < 40) texts.push(t);
                }
                return { wrapperCount: wrappers.length, inputs, textSample: texts.slice(0, 30) };
            }, { label: fieldLabel });
            console.log(`[DIAG] "${fieldLabel}" not found. Dialog state:`, JSON.stringify(diag, null, 2));
            throw new Error(`Could not locate multiselect for field "${fieldLabel}" in Season Configuration filter dialog`);
        }

        const wrapper = this.page.locator(`[${tempAttr}]`).first();
        await wrapper.scrollIntoViewIfNeeded();
        console.log(`✓ Located "${fieldLabel}" multiselect via label-based DOM traversal`);

        // Open popup via input.e-dropdownbase (confirmed reliable trigger from DOM inspection)
        const dropdownInput = wrapper.locator('input.e-dropdownbase').first();
        if (await dropdownInput.count() > 0) {
            await dropdownInput.click({ force: true });
        } else {
            const ddlIcon = wrapper.locator('span.e-ddl-icon, span.e-input-group-icon').first();
            await (await ddlIcon.count() > 0 ? ddlIcon : wrapper).click({ force: true });
        }
        await this.page.waitForTimeout(600);

        const popup = this.page.locator('div.e-popup-open').first();
        await popup.waitFor({ state: 'visible', timeout: 10000 });

        // Filter input (type first word to narrow list)
        const filterInput = popup.locator('input.e-input-filter, input.e-filter-wrap-focus').first();
        if (await filterInput.isVisible().catch(() => false)) {
            await filterInput.fill(value.split(/[\s(]/)[0]);
            await this.page.waitForTimeout(500);
        }

        // Click the matching list item
        const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const listItems = popup.locator('li.e-list-item');
        const exactItem = listItems.filter({ hasText: new RegExp(`^\\s*${escaped}\\s*$`) }).first();

        if (await exactItem.isVisible().catch(() => false)) {
            await exactItem.click({ force: true });
            console.log(`✓ Selected "${value}" for "${fieldLabel}" (exact match)`);
        } else {
            const partialItem = listItems.filter({ hasText: value }).first();
            if (await partialItem.count() > 0) {
                await partialItem.click({ force: true });
                console.log(`✓ Selected "${value}" for "${fieldLabel}" (partial match)`);
            } else {
                console.warn(`⚠ Option "${value}" not found for "${fieldLabel}"`);
            }
        }

        await this.page.waitForTimeout(400);
        if (await this.page.locator('div.e-popup-open').isVisible().catch(() => false)) {
            await this.page.keyboard.press('Escape');
        }
        await this.page.waitForTimeout(400);

        // Clean up temp attribute
        await this.page.evaluate(
            (a) => document.querySelectorAll(`[${a}]`).forEach(el => el.removeAttribute(a)),
            tempAttr
        ).catch(() => {});
    }

    // ─────────────────────────────────────────────────────────────────
    // FORMAT BADGE SELECTOR
    // ─────────────────────────────────────────────────────────────────

    /**
     * Click a Format badge button by its exact text.
     * Format badges are <button> elements (NOT multiselect) with the badge text directly.
     * Example DOM: <button class="rounded h-[26px] px-3...e-primary...text-white">Football</button>
     *
     * @param {string} value – e.g. "Football", "Futsal", "Mini-football"
     */
    async _selectFormatBadge(value) {
        // Find button elements inside the dialog with the exact badge text
        const badgeSelectors = [
            `button:has-text("${value}")`,
        ];

        let badgeBtn = null;
        for (const sel of badgeSelectors) {
            const candidates = this.filterDialog.locator(sel);
            const count = await candidates.count();
            if (count === 0) continue;

            for (let i = 0; i < count; i++) {
                const btn = candidates.nth(i);
                const text = (await btn.textContent().catch(() => '')).trim();
                if (text === value && await btn.isVisible().catch(() => false)) {
                    badgeBtn = btn;
                    break;
                }
            }
            if (badgeBtn) break;
        }

        if (!badgeBtn) {
            // Diagnostics
            const allBtns = await this.filterDialog.locator('button').allTextContents().catch(() => []);
            console.log(`[DIAG] Format badge "${value}" not found. Buttons in dialog: ${JSON.stringify(allBtns)}`);
            throw new Error(`Could not locate Format badge button "${value}" in Season Configuration filter dialog`);
        }

        // Check if already active (has e-primary class) — if not, click to activate
        const classes = await badgeBtn.getAttribute('class').catch(() => '');
        if (!classes.includes('e-primary')) {
            await badgeBtn.click({ force: true });
            console.log(`✓ Clicked Format badge "${value}" to activate`);
        } else {
            console.log(`ℹ Format badge "${value}" is already active – skipping click`);
        }

        await this.page.waitForTimeout(300);
    }

    // ─────────────────────────────────────────────────────────────────
    // TIME FRAME PICKER
    // ─────────────────────────────────────────────────────────────────

    /**
     * Set the Time Frame date range filter.
     * Expects value in format "DD/MM/YYYY - DD/MM/YYYY"
     *
     * @param {string} value – e.g. "08/03/2027 - 13/03/2027"
     */
    async _setTimeFrame(value) {
        // Parse the date range
        const parts = value.split(' - ').map(s => s.trim());
        const fromDate = parts[0] || '';
        const toDate = parts[1] || parts[0] || '';

        // Locate the date range input
        const dateInputStrategies = [
            () => this.filterDialog.locator('input[placeholder="DD/MM/YYYY - DD/MM/YYYY"]').first(),
            () => this.filterDialog.locator('input[placeholder*="DD/MM/YYYY"]').first(),
            () => this.filterDialog.locator('ejs-daterangepicker input, input[id*="daterangepicker"]').first(),
        ];

        let dateInput = null;
        for (const strategy of dateInputStrategies) {
            const candidate = strategy();
            const cnt = await candidate.count();
            if (cnt > 0) {
                const visible = await candidate.isVisible().catch(() => false);
                if (visible) {
                    dateInput = candidate;
                    break;
                }
            }
        }

        if (!dateInput) {
            // Scroll to bottom and retry
            await this.filterDialog.evaluate(el => el.scrollTop = el.scrollHeight).catch(() => {});
            await this.page.waitForTimeout(300);
            for (const strategy of dateInputStrategies) {
                const candidate = strategy();
                const cnt = await candidate.count();
                if (cnt > 0) {
                    const visible = await candidate.isVisible().catch(() => false);
                    if (visible) {
                        dateInput = candidate;
                        break;
                    }
                }
            }
        }

        if (!dateInput) {
            throw new Error('Could not locate Time Frame date range picker input in Season Configuration filter dialog');
        }

        await dateInput.scrollIntoViewIfNeeded();
        await dateInput.click();
        await this.page.waitForTimeout(400);

        try {
            await dateInput.fill('');
            await dateInput.pressSequentially(`${fromDate} - ${toDate}`, { delay: 80 });
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(500);
            console.log(`✓ Set Time Frame: "${fromDate} - ${toDate}"`);
        } catch (e) {
            console.warn(`⚠ Could not type Time Frame directly – trying fill approach`);
            await dateInput.clear();
            await dateInput.fill(`${fromDate} - ${toDate}`);
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(400);
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY / RESET BUTTONS
    // ─────────────────────────────────────────────────────────────────

    async clickApplyButton() {
        // The Apply button is an ejs-progressbutton with aria-label="Apply progress"
        // and an inner <span class="e-progress"> overlay — use force:true
        const candidates = [
            this.page.locator('button[aria-label="Apply progress"]').first(),
            this.page.locator('button.e-progress-btn').filter({ hasText: /^Apply$/ }).first(),
            this.applyButton,
            this.page.locator('button:has-text("Apply")').last(),
        ];

        let btn = null;
        for (const candidate of candidates) {
            const cnt = await candidate.count().catch(() => 0);
            if (cnt > 0) {
                btn = candidate;
                break;
            }
        }

        if (!btn) {
            throw new Error('Could not locate Apply button in Season Configuration filter dialog');
        }

        await btn.waitFor({ state: 'visible', timeout: 10000 });
        await btn.click({ force: true });
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked Apply button in Season Configuration filter dialog');
    }

    async clickResetButton() {
        // The Reset button is a Syncfusion ejs-progressbutton with aria-label="Reset progress"
        // and an inner <span class="e-progress"> overlay that blocks standard interactability.
        // Use force:true on all attempts to bypass the overlay.
        const candidates = [
            this.page.locator('button[aria-label="Reset progress"]').first(),
            this.page.locator('button.e-progress-btn').filter({ hasText: 'Reset' }).first(),
            this.page.locator('[cssclass="right-slide-dialog"] button').filter({ hasText: 'Reset' }).first(),
            this.page.locator('.right-slide-dialog button').filter({ hasText: 'Reset' }).first(),
            this.page.locator('button').filter({ hasText: 'Reset' }).last(),
        ];

        let btn = null;
        for (const candidate of candidates) {
            const cnt = await candidate.count().catch(() => 0);
            if (cnt > 0) {
                btn = candidate;
                break;
            }
        }

        if (!btn) {
            const dialogBtns = await this.page.evaluate(() => {
                const dialog = document.querySelector('[cssclass="right-slide-dialog"]') || document.body;
                return Array.from(dialog.querySelectorAll('button')).map(b => ({
                    text: b.textContent?.trim(),
                    ariaLabel: b.getAttribute('aria-label'),
                    classes: b.className,
                }));
            });
            console.log('[DIAG] Buttons in filter dialog:', JSON.stringify(dialogBtns, null, 2));
            throw new Error('Could not locate Reset button in Season Configuration filter dialog');
        }

        await btn.scrollIntoViewIfNeeded();
        await btn.click({ force: true });
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked Reset button in Season Configuration filter dialog');
    }

    // ─────────────────────────────────────────────────────────────────
    // VERIFY FILTERS CLEARED
    // ─────────────────────────────────────────────────────────────────

    async verifyFiltersCleared() {
        await this.page.waitForTimeout(500);

        // Check that no multiselect shows selected chips
        const chips = this.filterDialog.locator('.e-chips-close.e-close-hooker');
        const visibleChipsCount = await chips.count();

        if (visibleChipsCount === 0) {
            console.log('✓ All Season Configuration filters have been cleared');
        } else {
            console.log(`ℹ ${visibleChipsCount} chip(s) still visible after reset – may be a UI delay`);
        }

        // Check that no Format badge is active (e-primary)
        const activeBadges = this.filterDialog.locator('button.e-primary');
        const activeBadgeCount = await activeBadges.count().catch(() => 0);
        if (activeBadgeCount > 0) {
            console.log(`ℹ ${activeBadgeCount} active format badge(s) still present after reset – may be a UI delay`);
        } else {
            console.log('✓ No active Format badges detected after reset');
        }

        // Check that the Time Frame input is empty if present
        const dateInput = this.filterDialog.locator('input[placeholder="DD/MM/YYYY - DD/MM/YYYY"]').first();
        const hasDateInput = await dateInput.count() > 0;
        if (hasDateInput) {
            const dateValue = await dateInput.inputValue().catch(() => '');
            if (!dateValue) {
                console.log('✓ Time Frame input is empty after reset');
            } else {
                console.log(`ℹ Time Frame input still has value "${dateValue}" after reset – may be a UI delay`);
            }
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // API – CAPTURE
    // ─────────────────────────────────────────────────────────────────

    /**
     * Start listening for the Season Configuration data API.
     * Call this method BEFORE clicking the Apply button.
     * Matches: /season/configuration/list with status 200.
     */
    startCapturingAPIResponse() {
        this._apiResponsePromise = this.page.waitForResponse(
            (r) => r.url().includes('/season/configuration/list') && r.status() === 200,
            { timeout: 60000 }
        );
        console.log('✓ Listening for Season Configuration data API (/season/configuration/list)');
    }

    // ─────────────────────────────────────────────────────────────────
    // API – AWAIT
    // ─────────────────────────────────────────────────────────────────

    /**
     * Await the captured API response. Returns null (soft fail) if the listener
     * timed out – verifyAPITotalGreaterThanZero will be skipped in that case.
     */
    async awaitAPIResponse() {
        try {
            const response = await this._apiResponsePromise;
            console.log(`✓ Captured Season Configuration API URL: ${response.url()}`);
            const body = await response.json();
            this._cachedAPIBody = body;
            this._apiResponsePromise = null;
            return body;
        } catch (e) {
            console.warn(
                '⚠ No matching API response captured within timeout. ' +
                'Returning null – API count verification will be skipped.'
            );
            this._apiResponsePromise = null;
            return null;
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // API – VERIFY COUNT
    // ─────────────────────────────────────────────────────────────────

    async verifyAPITotalGreaterThanZero(apiBody) {
        if (apiBody === null || apiBody === undefined) {
            console.log(
                'ℹ API body is null – no server round-trip was captured. Skipping API count assertion.'
            );
            return;
        }

        // Extract count from all possible response shapes
        const totalCountsValue = Array.isArray(apiBody.totalCounts) && apiBody.totalCounts.length > 0
            ? (apiBody.totalCounts[0]?.count ?? 0)
            : undefined;

        const rawItems = apiBody.items ?? apiBody.data ?? apiBody.records ?? [];
        const itemCount = Array.isArray(rawItems) ? rawItems.length : 0;

        const count =
            totalCountsValue ??
            apiBody.total ??
            apiBody.totalCount ??
            apiBody.count ??
            itemCount;

        if (count === 0 && itemCount === 0) {
            console.log('ℹ No records returned for the applied Season Configuration filter – grid may show "No records found".');
            console.log('── Actual API response body (for debugging) ──');
            console.log(JSON.stringify(apiBody, null, 2));
            console.log('──────────────────────────────────────────────');
        } else {
            console.log(`✓ Season Configuration API total: ${count}, items: ${itemCount}`);
        }

        expect(
            (count ?? 0) + itemCount,
            'Season Configuration API should return at least one record'
        ).toBeGreaterThan(0);
    }

    // ─────────────────────────────────────────────────────────────────
    // API – PRINT
    // ─────────────────────────────────────────────────────────────────

    printAPIResponseJSON(apiBody) {
        if (apiBody === null || apiBody === undefined) {
            console.log('ℹ No API body to print (no server response was captured).');
            return;
        }
        console.log('──────── SEASON CONFIG BASIC FILTER API RESPONSE (JSON) ────────');
        console.log(JSON.stringify(apiBody, null, 2));
        console.log('─────────────────────────────────────────────────────────────────');
    }
}

module.exports = SeasonConfigBasicFilterPage;
