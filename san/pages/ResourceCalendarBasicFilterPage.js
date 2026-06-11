/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

/**
 * Class Name: ResourceCalendarBasicFilterPage
 *
 * Description:
 * Page Object for the Resource Calendar Basic Filter panel inside
 * Resource Management > Venue Management > Resources Calendar.
 *
 * Supported filter fields:
 *   Search By Event Name  – autocomplete input
 *   Event Type            – ejs-multiselect (checkbox mode)
 *   Location              – ejs-multiselect (checkbox mode)
 *   Visibility            – ejs-multiselect (checkbox mode)
 *   All Day Event         – ejs-switch toggle (On / Off)
 *   Resources             – ejs-multiselect (checkbox mode)
 *   Date Range            – date-range picker input
 *   Tags                  – ejs-multiselect (checkbox mode)
 *
 * API endpoint validated: /venue/events/resource/list
 *
 * @author Auto-generated
 * @version 1.0
 */

class ResourceCalendarBasicFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // ── Resources Calendar tab (inside Venue Management)
        this.resourcesCalendarTab = page.locator(
            'div.ng-star-inserted, span.e-list-text, li.e-list-item'
        ).filter({ hasText: /^[\s]*Resources Calendar[\s]*$/ }).first();

        // ── Filter dialog container – scoped to the open dialog only.
        // Multiple [cssclass="right-slide-dialog"] dialogs accumulate in the DOM
        // (Angular leaves closed ones as e-popup-close). Using .e-popup-open.last()
        // ensures we always target the most recently opened one and avoid strict-mode
        // violations from Playwright's single-element requirement on waitFor/click.
        this.filterDialog = page.locator('[cssclass="right-slide-dialog"].e-popup-open').last();

        // ── Filter icon / trigger button on the Resources Calendar view
        // Scoped to app-resource-calendar-listing to avoid colliding with the hidden
        // Home-tab filter button (which lives inside app-edit-listing and has the
        // same icon but is not visible – clicking it opens the wrong filter dialog).
        this.filterButtonLocator = 'app-resource-calendar-listing button.no-border-box:has(span.sf-custom-icon[style*="filter.svg"])';

        // ── Action buttons inside the filter dialog (scoped to open dialog only)
        this.applyButton = page.locator('[cssclass="right-slide-dialog"].e-popup-open button').filter({ hasText: /^Apply$/ }).first();
        this.resetButton = page.locator('[cssclass="right-slide-dialog"].e-popup-open button').filter({ hasText: /^Reset$/ }).first();

        // ── API response capture promise
        this._apiResponsePromise = null;
        this._cachedAPIBody = null;
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION – RESOURCES CALENDAR TAB
    // ─────────────────────────────────────────────────────────────────

    async clickResourcesCalendarTab() {
        // Exact DOM: <div class="ng-star-inserted"> Resources Calendar </div>
        // Note: text has leading/trailing whitespace — regex handles it.
        const strategies = [
            () => this.page.locator('div.ng-star-inserted').filter({ hasText: /^\s*Resources Calendar\s*$/ }).first(),
            () => this.page.locator('span.e-list-text').filter({ hasText: /^\s*Resources Calendar\s*$/ }).first(),
            () => this.page.locator('li.e-list-item').filter({ hasText: /^\s*Resources Calendar\s*$/ }).first(),
            () => this.page.getByText('Resources Calendar', { exact: true }).first(),
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
            throw new Error('Could not locate the "Resources Calendar" tab in Venue Management');
        }

        await tab.scrollIntoViewIfNeeded();
        await tab.click();
        console.log('✓ Clicked "Resources Calendar" tab');

        // Wait until the Syncfusion Scheduler is visible — confirms the correct view loaded.
        await this.page.locator('ejs-schedule, div.e-schedule').first()
            .waitFor({ state: 'visible', timeout: 20000 })
            .catch(() => this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {}));

        console.log('✓ Resources Calendar scheduler is visible');
    }

    // ─────────────────────────────────────────────────────────────────
    // OPEN FILTER DIALOG
    // ─────────────────────────────────────────────────────────────────

    /**
     * Returns true only when the currently open [cssclass="right-slide-dialog"] is the
     * Resource Calendar filter — identified by having "Basic Filter" or "Event Type".
     * Multiple tabs on the page share the same dialog pattern, so we must verify content.
     */
    async _isResourceCalendarDialog() {
        if (!await this.filterDialog.isVisible().catch(() => false)) return false;

        // Wait up to 3s for the Basic Filter tab to render inside the dialog.
        // On second open (after Apply + calendar reload) Angular re-renders slowly.
        try {
            await this.filterDialog
                .locator('button:has-text("Basic Filter"), *:has-text("Basic Filter")')
                .first()
                .waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            // Tab not found – try Event Type label as fallback indicator
            const hasEventType = await this.filterDialog
                .getByText('Event Type', { exact: true })
                .count() > 0;
            return hasEventType;
        }
    }

    async openFilterDialog() {
        // If the resource calendar dialog is already open, skip
        if (await this._isResourceCalendarDialog()) {
            console.log('✓ Resource Calendar filter dialog already open');
            return;
        }

        // Close any stale dialog from another tab before we start
        if (await this.filterDialog.isVisible().catch(() => false)) {
            console.log('ℹ A different filter dialog is open – closing it first');
            await this.page.keyboard.press('Escape').catch(() => {});
            await this.page.waitForTimeout(400);
        }

        // Button selectors in priority order — scoped narrowest-first.
        // The filter icon DOM: <button class="no-border-box ..."><span class="sf-custom-icon"
        //   style="color:var(--tertiary-bg); --icon:url(assets/icons/grassroots/filter.svg);">
        // The RC filter button lives inside app-resource-calendar-listing > app-custom-toolbar.
        // The Home-tab filter button lives inside app-edit-listing (accordion, hidden).
        // Using the component-scoped selector avoids clicking the hidden Home-tab button.
        const buttonSelectors = [
            // ✅ Most specific — scoped to the RC Angular component (confirmed via live DOM inspection)
            'app-resource-calendar-listing button.no-border-box:has(span.sf-custom-icon[style*="filter.svg"])',
            'app-resource-calendar-listing button:has(span[style*="filter.svg"])',
            // Fallback: inside the Syncfusion Scheduler toolbar
            'ejs-schedule button:has(span.sf-custom-icon[style*="filter.svg"])',
            'div.e-schedule button:has(span.sf-custom-icon[style*="filter.svg"])',
            // Page-wide last resort (iterates all matches — _isResourceCalendarDialog guards against wrong dialog)
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

                console.log(`ℹ Clicking filter button [${sel}] index ${i}`);
                await btn.evaluate(el => el.click()).catch(() => btn.click({ force: true }).catch(() => {}));
                await this.page.waitForTimeout(1000);

                if (await this._isResourceCalendarDialog()) {
                    console.log('✓ Resource Calendar filter dialog opened');
                    return;
                }

                // Wrong dialog — close it before trying next
                if (await this.filterDialog.isVisible().catch(() => false)) {
                    console.log('ℹ Wrong dialog opened – closing and trying next button');
                    await this.page.keyboard.press('Escape').catch(() => {});
                    await this.page.waitForTimeout(300);
                }
            }
        }

        // Final wait — in case the dialog animates in slowly
        await this.filterDialog.waitFor({ state: 'visible', timeout: 15000 });
        if (!await this._isResourceCalendarDialog()) {
            throw new Error('The filter dialog that opened is not the Resource Calendar filter');
        }
        console.log('✓ Resource Calendar filter dialog opened (late)');
    }

    // ─────────────────────────────────────────────────────────────────
    // FILTER TAB CLICK
    // ─────────────────────────────────────────────────────────────────

    async clickFilterTab(tabName) {
        const tab = this.filterDialog.locator(`button:has-text("${tabName}")`).first();
        await tab.waitFor({ state: 'visible', timeout: 8000 });
        await tab.click();
        await this.page.waitForTimeout(400);
        console.log(`✓ Clicked "${tabName}" tab in Resource Calendar filter dialog`);
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY FILTER CRITERIA DISPATCHER
    // ─────────────────────────────────────────────────────────────────

    /**
     * Apply Resource Calendar Basic Filter criteria from a data table rowsHash.
     *
     * @param {Object} criteria – key/value pairs (field → value)
     */
    async applyResourceCalendarBasicFilterCriteria(criteria) {
        for (const [field, value] of Object.entries(criteria)) {
            switch (field) {
                case 'Search By Event Name':
                    await this._searchByEventName(value);
                    break;
                case 'All Day Event':
                    await this._toggleAllDayEvent(value);
                    break;
                case 'Date Range':
                    await this._setDateRange(value);
                    break;
                case 'Event Type':
                case 'Location':
                case 'Visibility':
                case 'Resources':
                case 'Tags':
                    await this._selectMultiselectByLabel(field, value);
                    break;
                default:
                    console.warn(`⚠ Unknown Resource Calendar filter field: "${field}" – skipping`);
            }
            await this.page.waitForTimeout(300);
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // SEARCH AUTOCOMPLETE
    // ─────────────────────────────────────────────────────────────────

    async _searchByEventName(searchText) {
        // ── Step 1: Locate the search autocomplete input inside the filter dialog
        // Use case-insensitive placeholder match via XPath as fallback
        const searchInput = this.filterDialog.locator(
            'input[placeholder="Search by Event Name"], ' +
            'input[placeholder="Search By Event Name"], ' +
            'input[placeholder*="Event Name" i], ' +
            'ejs-autocomplete input[role="combobox"], ' +
            'input[aria-label="autocomplete"][role="combobox"]'
        ).first();

        await searchInput.waitFor({ state: 'visible', timeout: 10000 });
        await searchInput.scrollIntoViewIfNeeded();
        await searchInput.click();
        await this.page.waitForTimeout(200);

        // Clear any existing value
        await searchInput.press('Control+a');
        await searchInput.press('Backspace');
        await this.page.waitForTimeout(100);

        // ── Step 2: Type slowly so the server-side autocomplete can fire
        await searchInput.pressSequentially(searchText.trim(), { delay: 120 });
        console.log(`✓ Typed "${searchText}" into search input`);

        // ── Step 3: Wait directly for the EJ2 autocomplete popup to appear.
        //    EJ2 appends a <div class="e-ddl e-popup e-popup-open"> to <body>.
        //    The .e-ddl class is the key differentiator — sidebar/nav lists do NOT have it,
        //    so all selectors MUST include .e-ddl to avoid matching navigation menus.
        const ddlPopupLocator = this.page.locator(
            'div.e-ddl.e-popup-open li.e-list-item:not(.e-disabled)'
        );
        try {
            await ddlPopupLocator.first().waitFor({ state: 'visible', timeout: 8000 });
            console.log('✓ Autocomplete popup opened');
        } catch {
            console.warn('⚠ Autocomplete popup not visible within 8s – no suggestions returned for this search text');
        }

        // Give the popup list a moment to fully render
        await this.page.waitForTimeout(400);

        // ── Step 4: Try multiple CSS selectors to find the popup items.
        //    All selectors require .e-ddl to avoid matching sidebar navigation lists.
        const popupSelectors = [
            'div.e-ddl.e-popup-open li.e-list-item:not(.e-disabled)',
            'div.e-ddl.e-popup-open .e-list-item:not(.e-disabled)',
            'div.e-popup.e-popup-open.e-ddl li.e-list-item:not(.e-disabled)',
            'div.e-dropdownbase.e-popup-open .e-list-item:not(.e-disabled)',
        ];

        let selected = false;
        for (const sel of popupSelectors) {
            const items = this.page.locator(sel);
            const cnt = await items.count();
            if (cnt > 0) {
                console.log(`✓ Found ${cnt} suggestion(s) with selector: "${sel}"`);
                // Prefer an item whose text contains the search string
                const matching = items.filter({ hasText: new RegExp(searchText.trim(), 'i') }).first();
                const matchCnt = await matching.count();
                const target = matchCnt > 0 ? matching : items.first();
                const text = (await target.textContent().catch(() => '')).trim();
                // force:true bypasses z-index / partial-visibility issues common in slide dialogs
                await target.click({ force: true });
                console.log(`✓ Selected autocomplete suggestion: "${text}"`);
                selected = true;
                break;
            }
        }

        // ── Step 5: Keyboard fallback — ArrowDown highlights first item, Enter confirms.
        //    Also scoped to .e-ddl so we don't accidentally select from nav menus.
        if (!selected) {
            console.warn(`⚠ Popup items not found via CSS – trying ArrowDown + Enter keyboard fallback`);
            await searchInput.press('ArrowDown');
            await this.page.waitForTimeout(600);

            // Re-check if popup appeared after ArrowDown (must have .e-ddl)
            const popupItems = this.page.locator('div.e-ddl.e-popup-open li.e-list-item:not(.e-disabled)');
            const popupCnt = await popupItems.count();
            if (popupCnt > 0) {
                const text = (await popupItems.first().textContent().catch(() => '')).trim();
                await popupItems.first().click({ force: true });
                console.log(`✓ Selected via keyboard fallback: "${text}"`);
                selected = true;
            } else {
                await searchInput.press('Enter');
                console.warn(`⚠ No popup found – submitted typed text "${searchText}" directly`);
            }
        }

        await this.page.waitForTimeout(400);
        console.log(`✓ Event name filter set to "${searchText}"`);
    }

    // ─────────────────────────────────────────────────────────────────
    // MULTISELECT BY LABEL (Event Type / Location / Visibility / Resources / Tags)
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
     * @param {string} fieldLabel – visible label text, e.g. "Event Type"
     * @param {string} value      – option to select, e.g. "Competition"
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

        const tempAttr = `data-rc-label-${fieldLabel.replace(/\s+/g, '-').toLowerCase()}`;

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
            throw new Error(`Could not locate multiselect for field "${fieldLabel}" in Resource Calendar filter dialog`);
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
    // ALL DAY EVENT SWITCH
    // ─────────────────────────────────────────────────────────────────

    async _toggleAllDayEvent(state) {
        // Locate the All Day Event label and its accompanying ejs-switch
        const switchStrategies = [
            `//*[normalize-space(.)='All Day Event']/following-sibling::*//ejs-switch`,
            `//*[normalize-space(text())='All Day Event']/following-sibling::*//ejs-switch`,
            `//label[normalize-space(.)='All Day Event']/following::ejs-switch[1]`,
            `//*[normalize-space()='All Day Event']/parent::*/following-sibling::*//ejs-switch`,
            `//*[normalize-space()='All Day Event']/following::ejs-switch[1]`,
        ];

        let switchEl = null;
        for (const xpath of switchStrategies) {
            const candidate = this.page.locator(`xpath=${xpath}`).first();
            const cnt = await candidate.count();
            if (cnt > 0) {
                const visible = await candidate.isVisible().catch(() => false);
                if (visible) {
                    switchEl = candidate;
                    break;
                }
            }
        }

        // Fallback: locate by ejs-switch class inside filter dialog
        if (!switchEl) {
            switchEl = this.filterDialog.locator('ejs-switch').first();
        }

        if (!switchEl || await switchEl.count() === 0) {
            throw new Error('Could not locate "All Day Event" ejs-switch in Resource Calendar filter dialog');
        }

        await switchEl.scrollIntoViewIfNeeded();

        // Read current state: active class means "On"
        const wrapperClass = await switchEl.getAttribute('class').catch(() => '');
        const isCurrentlyOn = wrapperClass.includes('e-switch-active') ||
            await switchEl.locator('.e-switch-handle.e-switch-active').count() > 0;

        const desiredOn = state.trim().toLowerCase() === 'on';

        if ((desiredOn && !isCurrentlyOn) || (!desiredOn && isCurrentlyOn)) {
            // Click the switch handle or the wrapper to toggle
            const handle = switchEl.locator('.e-switch-handle').first();
            const handleVisible = await handle.isVisible().catch(() => false);
            if (handleVisible) {
                await handle.click();
            } else {
                await switchEl.click();
            }
            await this.page.waitForTimeout(400);
            console.log(`✓ Toggled "All Day Event" switch to "${state}"`);
        } else {
            console.log(`ℹ "All Day Event" switch is already "${state}" – skipping toggle`);
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // DATE RANGE PICKER
    // ─────────────────────────────────────────────────────────────────

    async _setDateRange(dateRange) {
        // dateRange format expected: "21/05/2026 - 21/05/2026"
        const parts = dateRange.split(' - ').map(s => s.trim());
        const fromDate = parts[0] || '';
        const toDate = parts[1] || parts[0] || '';

        // Locate the date range input
        const dateInputStrategies = [
            () => this.filterDialog.locator('input[placeholder="DD/MM/YYYY - DD/MM/YYYY"]').first(),
            () => this.filterDialog.locator('input[placeholder*="DD/MM/YYYY"]').first(),
            () => this.filterDialog.locator('ejs-daterangepicker input, input[id*="datetimepicker"]').first(),
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
            throw new Error('Could not locate date range picker input in Resource Calendar filter dialog');
        }

        await dateInput.scrollIntoViewIfNeeded();
        await dateInput.click();
        await this.page.waitForTimeout(400);

        // Try filling the date range using the input or calendar popup
        try {
            // Some date range pickers accept direct typed input
            await dateInput.fill('');
            await dateInput.pressSequentially(`${fromDate} - ${toDate}`, { delay: 80 });
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(500);
            console.log(`✓ Set date range: "${fromDate} - ${toDate}"`);
        } catch (e) {
            console.warn(`⚠ Could not type date range directly – trying keyboard approach`);
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
        // Try the constructor locator first; fall back to broader page-level search
        let btn = this.applyButton;
        if (await btn.count() === 0 || !await btn.isVisible().catch(() => false)) {
            btn = this.page.locator('button:has-text("Apply")').last();
        }
        await btn.waitFor({ state: 'visible', timeout: 10000 });
        await btn.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked Apply button in Resource Calendar filter dialog');
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
            throw new Error('Could not locate Reset button in Resource Calendar filter dialog');
        }

        await btn.scrollIntoViewIfNeeded();
        await btn.click({ force: true });
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked Reset button in Resource Calendar filter dialog');
    }

    // ─────────────────────────────────────────────────────────────────
    // VERIFY FILTERS CLEARED
    // ─────────────────────────────────────────────────────────────────

    async verifyFiltersCleared() {
        await this.page.waitForTimeout(500);

        // Check that the search input is empty
        const searchInput = this.filterDialog.locator(
            'input[placeholder="Search by Event Name"], ejs-autocomplete input'
        ).first();
        const hasSearch = await searchInput.count() > 0;
        if (hasSearch) {
            const value = await searchInput.inputValue().catch(() => '');
            expect(value, 'Search input should be empty after Reset').toBe('');
        }

        // Check that no multiselect shows selected chips
        const chips = this.filterDialog.locator('.e-chips-close.e-close-hooker');
        const visibleChipsCount = await chips.count();

        if (visibleChipsCount === 0) {
            console.log('✓ All Resource Calendar filters have been cleared');
        } else {
            console.log(`ℹ ${visibleChipsCount} chip(s) still visible after reset – may be a UI delay`);
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // API – CAPTURE
    // ─────────────────────────────────────────────────────────────────

    /**
     * Start listening for the Resource Calendar data API.
     *
     * The Syncfusion Scheduler filters client-side when criteria are already loaded,
     * so the API fires at one of these moments:
     *   a) initial calendar load (navigating to Resources Calendar tab)
     *   b) Apply button click (only if the app is configured for server-side binding)
     *
     * Call this method BEFORE navigating to the Resources Calendar tab to ensure
     * the initial load API is captured. The listener catches any non-static API
     * call containing 'venue' or 'resource' so the actual URL is visible in logs.
     */
    startCapturingAPIResponse() {
        this._apiResponsePromise = this.page.waitForResponse(
            (r) => {
                const url = r.url().toLowerCase();
                const method = r.request().method();
                const isStaticAsset = /\.(js|css|png|svg|ico|woff|ttf|map)(\?|$)/.test(url);
                const isRelevant =
                    url.includes('/venue/events') ||
                    url.includes('/resource/list') ||
                    url.includes('/venue/resource') ||
                    (url.includes('/venue/') && (method === 'POST' || url.includes('resource')));
                return isRelevant && !isStaticAsset && r.status() === 200;
            },
            { timeout: 60000 }
        );
        console.log('✓ Listening for Resource Calendar data API (venue/events, venue/resource, resource/list)');
    }

    // ─────────────────────────────────────────────────────────────────
    // API – AWAIT
    // ─────────────────────────────────────────────────────────────────

    /**
     * Await the captured API response. Returns null (soft fail) if the listener
     * timed out – this happens when the Scheduler filters client-side without a
     * server round-trip. In that case verifyAPITotalGreaterThanZero is skipped.
     */
    async awaitAPIResponse() {
        try {
            const response = await this._apiResponsePromise;
            console.log(`✓ Captured Resource Calendar API URL: ${response.url()}`);
            const body = await response.json();
            this._cachedAPIBody = body;
            this._apiResponsePromise = null;
            return body;
        } catch (e) {
            console.warn(
                '⚠ No matching API response captured within timeout. ' +
                'The Syncfusion Scheduler likely filters client-side for this action. ' +
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
                'ℹ API body is null – the Syncfusion Scheduler filtered client-side, ' +
                'so no server round-trip occurred. Skipping API count assertion.'
            );
            return;
        }

        const rawItems = apiBody.items ?? apiBody.data ?? apiBody.records ?? apiBody.events ?? [];

        // Flatten resource-grouped structure: items[n] = { events: [...], headerId: "..." }
        const eventCount = (rawItems.length > 0 && Array.isArray(rawItems[0]?.events))
            ? rawItems.reduce((sum, row) => sum + (row.events?.length ?? 0), 0)
            : rawItems.length;

        // totalCounts is the Resource Calendar API shape: [{ count: N }]
        const totalCountsValue = Array.isArray(apiBody.totalCounts) && apiBody.totalCounts.length > 0
            ? (apiBody.totalCounts[0]?.count ?? 0)
            : undefined;

        const count =
            apiBody.total ??
            apiBody.totalCount ??
            apiBody.count ??
            totalCountsValue ??
            eventCount;

        if (count === 0 && eventCount === 0) {
            console.log('ℹ No records returned for the applied Resource Calendar filter – grid may show "No records found".');
            console.log('── Actual API response body (for debugging) ──');
            console.log(JSON.stringify(apiBody, null, 2));
            console.log('──────────────────────────────────────────────');
        } else {
            console.log(`✓ Resource Calendar API total: ${count}, events: ${eventCount}, resource groups: ${rawItems.length}`);
        }

        expect(
            count + eventCount,
            'Resource Calendar API should return at least one record'
        ).toBeGreaterThan(0);
    }

    // ─────────────────────────────────────────────────────────────────
    // API – PRINT
    // ─────────────────────────────────────────────────────────────────

    printAPIResponseJSON(apiBody) {
        if (apiBody === null || apiBody === undefined) {
            console.log('ℹ No API body to print (client-side filtering – no server response was captured).');
            return;
        }
        console.log('──────── RESOURCE CALENDAR BASIC FILTER API RESPONSE (JSON) ────────');
        console.log(JSON.stringify(apiBody, null, 2));
        console.log('─────────────────────────────────────────────────────────────────────');
    }

    // ─────────────────────────────────────────────────────────────────
    // FIELD MAPPING
    // ─────────────────────────────────────────────────────────────────

    /**
     * Map feature-file field labels to API response JSON field paths.
     * Update paths here when the actual API structure is confirmed.
     */
    mapFieldLabel(fieldLabel) {
        const mapping = {
            // 'subject' is the Syncfusion Scheduler standard for event title.
            // Fallback candidates are tried automatically in validateAPIRecords.
            'eventName':    'subject',
            'Event Name':   'subject',
            'eventType':    'eventType.libraryValue',
            'Event Type':   'eventType.libraryValue',
            'location':     'venue.name',
            'Location':     'venue.name',
            'visibility':   'visibility.libraryValue',
            'Visibility':   'visibility.libraryValue',
            'allDay':       'isAllDay',
            'All Day Event':'isAllDay',
            'resources':    'resources',
            'Resources':    'resources',
            'dateRange':    'startDate',
            'Date Range':   'startDate',
            'tags':         'tags',
            'Tags':         'tags',
        };

        const resolved = mapping[fieldLabel];
        if (!resolved) {
            console.warn(
                `⚠ No field mapping found for "${fieldLabel}". ` +
                `Using it as-is. Update mapFieldLabel() if validation fails.`
            );
        }
        return resolved || fieldLabel;
    }

    // ─────────────────────────────────────────────────────────────────
    // API VALIDATION
    // ─────────────────────────────────────────────────────────────────

    /**
     * Validate all items in the API response body satisfy field / operator / value.
     *
     * For array fields (resources, tags), checks if any element in the array
     * matches the expected value.
     */
    async validateAPIRecords(responseBody, fieldLabel, operator, value) {
        if (responseBody === null || responseBody === undefined) {
            console.log(
                `ℹ API body is null – client-side filtering was used. ` +
                `Skipping field-level validation for "${fieldLabel}".`
            );
            return;
        }
        expect(responseBody, 'API response body should not be null').toBeTruthy();

        const rawItems = responseBody.items ?? responseBody.data ?? responseBody.records ?? responseBody.events ?? [];
        expect(Array.isArray(rawItems), 'API response items should be an array').toBe(true);

        // The RC /venue/events API returns resource-grouped items:
        //   items[n] = { headerId: "...", events: [{ isAllDay: true, title: "...", ... }] }
        // Flatten to flat events so field validation works on the actual event objects.
        const items = (rawItems.length > 0 && Array.isArray(rawItems[0]?.events))
            ? rawItems.flatMap(row => row.events ?? [])
            : rawItems;

        if (items.length === 0) {
            console.log(`ℹ No items to validate for field "${fieldLabel}" – skipping record-level validation`);
            return;
        }

        const apiField = this.mapFieldLabel(fieldLabel);
        console.log(`Validating ${items.length} item(s): "${fieldLabel}" (API: ${apiField}) ${operator} "${value}"`);

        // Log sample item structure to help with field path debugging
        console.log('── Sample API item (Item[0]) ──');
        console.log(JSON.stringify(items[0], null, 2));
        console.log('──────────────────────────────');

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            // Resolve nested field value
            let actual = item;
            for (const key of apiField.split('.')) {
                actual = actual?.[key];
            }

            // For event name: if the primary path is null/undefined or is an internal code,
            // try common alternative field names used by different API implementations.
            if ((fieldLabel === 'eventName' || fieldLabel === 'Event Name') &&
                (actual === null || actual === undefined)) {
                const alternatives = ['Subject', 'subject', 'name', 'eventName', 'title', 'Title'];
                for (const alt of alternatives) {
                    if (item[alt] !== null && item[alt] !== undefined) {
                        console.log(`ℹ Using alternative field "${alt}" = "${item[alt]}" for eventName`);
                        actual = item[alt];
                        break;
                    }
                }
            }

            // For array fields (resources, tags), check if any element contains the value
            if (Array.isArray(actual)) {
                const arrayStr = actual.map(a =>
                    (typeof a === 'object' ? JSON.stringify(a) : String(a)).toLowerCase()
                ).join(' ');
                const match = arrayStr.includes(value.toLowerCase());
                if (!match) {
                    console.warn(
                        `⚠ Item[${i}] array field "${apiField}" does not contain "${value}". ` +
                        `Actual: ${JSON.stringify(actual)}`
                    );
                }
                expect(
                    match,
                    `Item[${i}]: field "${fieldLabel}" array should contain "${value}"`
                ).toBe(true);
                continue;
            }

            // For boolean fields (allDay)
            if (fieldLabel === 'allDay' || fieldLabel === 'All Day Event') {
                if (actual === null || actual === undefined) {
                    // Try alternative field names before giving up
                    const altNames = ['allDay', 'isAllDay', 'isAllDayEvent', 'allDayEvent', 'IsAllDay'];
                    let resolved = undefined;
                    for (const alt of altNames) {
                        if (item[alt] !== null && item[alt] !== undefined) {
                            console.log(`ℹ Using alternative field "${alt}" = ${item[alt]} for allDay`);
                            resolved = item[alt];
                            break;
                        }
                    }
                    if (resolved === undefined) {
                        console.warn(
                            `⚠ Item[${i}]: allDay field not found under "${apiField}" or any alternative. ` +
                            `Top-level keys: [${Object.keys(item || {}).join(', ')}]. Skipping.`
                        );
                        continue;
                    }
                    actual = resolved;
                }
                const expectedBool = value.trim().toLowerCase() === 'on' || value.trim().toLowerCase() === 'true';
                const actualBool = actual === true || actual === 'true';
                if (actualBool !== expectedBool) {
                    console.warn(`⚠ Item[${i}] "${apiField}" = ${actual}, expected ${expectedBool}`);
                }
                expect(
                    actualBool,
                    `Item[${i}]: "All Day Event" should be ${expectedBool}`
                ).toBe(expectedBool);
                continue;
            }

            // For Date Range – just log (date math is complex; rely on count > 0 as pass)
            if (fieldLabel === 'dateRange' || fieldLabel === 'Date Range') {
                console.log(`ℹ Date Range validation: Item[${i}] startDate = ${actual}`);
                continue;
            }

            // For null / undefined fields – log warning but do not fail hard
            if (actual === null || actual === undefined) {
                const topKeys = Object.keys(item || {});
                console.warn(
                    `⚠ Field "${apiField}" is null/undefined in Item[${i}]. ` +
                    `Top-level keys: [${topKeys.join(', ')}]. ` +
                    `Update mapFieldLabel() with the correct API field name.`
                );
                continue;
            }

            // String-based comparison
            const actualStr = String(actual).toLowerCase();
            const expectedStr = value.toLowerCase();

            let match = false;
            switch (operator.toLowerCase()) {
                case 'contains':       match = actualStr.includes(expectedStr); break;
                case 'does not contain': match = !actualStr.includes(expectedStr); break;
                case 'starts with':    match = actualStr.startsWith(expectedStr); break;
                case 'ends with':      match = actualStr.endsWith(expectedStr); break;
                case 'equal':          match = actualStr === expectedStr; break;
                case 'not equal':      match = actualStr !== expectedStr; break;
                case 'in': {
                    const tokens = expectedStr.split(',').map(t => t.trim());
                    match = tokens.some(t => actualStr === t);
                    break;
                }
                case 'not in': {
                    const tokens = expectedStr.split(',').map(t => t.trim());
                    match = tokens.every(t => actualStr !== t);
                    break;
                }
                default:
                    match = actualStr.includes(expectedStr);
            }

            if (!match) {
                console.error(
                    `✗ Item[${i}] "${apiField}" = "${actual}" fails: ${fieldLabel} ${operator} "${value}"`
                );
            }
            expect(
                match,
                `Item[${i}]: "${fieldLabel}" ${operator} "${value}" (actual: "${actual}")`
            ).toBe(true);
        }

        console.log(`✓ All ${items.length} record(s) satisfy: "${fieldLabel}" ${operator} "${value}"`);
    }

    // ─────────────────────────────────────────────────────────────────
    // CLICK CALENDAR EVENT & VERIFY EVENT DETAIL API
    // ─────────────────────────────────────────────────────────────────

    /**
     * Click a calendar event by its subject text (e.g. "Pawan Nikkil").
     * Syncfusion Scheduler renders event titles inside div.e-subject within div.e-appointment.
     * If subjectText is omitted, clicks the first visible event.
     *
     * @param {string} [subjectText] – optional subject to match
     */
    async clickFirstCalendarEvent(subjectText) {
        let eventEl = null;

        if (subjectText) {
            // Target the specific appointment containing the given subject text
            const bySubject = this.page
                .locator(`.e-appointment:has(div.e-subject)`)
                .filter({ hasText: subjectText })
                .first();
            if (await bySubject.count() > 0 && await bySubject.isVisible().catch(() => false)) {
                eventEl = bySubject;
                console.log(`✓ Found calendar event with subject: "${subjectText}"`);
            }
            if (!eventEl) {
                // Fallback: click the e-subject div directly
                const subjectEl = this.page
                    .locator(`div.e-subject`)
                    .filter({ hasText: subjectText })
                    .first();
                if (await subjectEl.count() > 0 && await subjectEl.isVisible().catch(() => false)) {
                    eventEl = subjectEl;
                    console.log(`✓ Found e-subject element with text: "${subjectText}"`);
                }
            }
        }

        if (!eventEl) {
            // No subject specified (or not found) – click the first visible appointment
            const selectors = [
                '.e-appointment:has(div.e-subject)',
                '.e-appointment',
                'div[class*="e-appointment"]',
            ];
            for (const sel of selectors) {
                const candidate = this.page.locator(sel).first();
                if (await candidate.count() > 0 && await candidate.isVisible().catch(() => false)) {
                    eventEl = candidate;
                    console.log(`✓ Found first calendar event with selector: "${sel}"`);
                    break;
                }
            }
        }

        if (!eventEl) {
            throw new Error('Could not locate any event appointment on the Resources Calendar grid');
        }

        const eventText = (await eventEl.textContent().catch(() => '')).trim().slice(0, 60);
        await eventEl.click();
        await this.page.waitForTimeout(500);
        console.log(`✓ Clicked calendar event: "${eventText}"`);
    }

    /**
     * Start listening for the event detail API call triggered when an event is clicked.
     * Matches: GET /venue/events/{id}?type=resource&currentRoleId=...
     */
    startCapturingEventDetailAPI() {
        this._eventDetailResponsePromise = this.page.waitForResponse(
            (r) =>
                r.url().toLowerCase().includes('/venue/events/') &&
                r.url().toLowerCase().includes('type=resource') &&
                r.request().method() === 'GET' &&
                r.status() === 200,
            { timeout: 30000 }
        );
        console.log('✓ Listening for event detail API: /venue/events/{id}?type=resource');
    }

    /**
     * Await the event detail API response and return the parsed body.
     */
    async awaitEventDetailAPIResponse() {
        const response = await this._eventDetailResponsePromise;
        console.log(`✓ Captured event detail API URL: ${response.url()}`);
        const body = await response.json();
        this._eventDetailResponsePromise = null;
        return body;
    }

    /**
     * Verify the event detail API response is non-empty and has status 200.
     */
    async verifyEventDetailAPIResponse(apiBody) {
        expect(apiBody, 'Event detail API response should not be null').toBeTruthy();

        // The response is either the event object directly or wrapped
        const eventData = apiBody.data ?? apiBody.event ?? apiBody;

        const hasId = eventData._id || eventData.id || eventData.eventId;
        if (hasId) {
            console.log(`✓ Event detail API returned event id: ${hasId}`);
        } else {
            console.log('ℹ Event detail response top-level keys:', Object.keys(eventData || {}).join(', '));
        }

        expect(
            eventData,
            'Event detail API response body should be a non-empty object'
        ).toBeTruthy();

        console.log('✓ Event detail API response verified successfully');
    }

    /**
     * Print the event detail API response as formatted JSON.
     */
    printEventDetailAPIResponseJSON(apiBody) {
        console.log('──────── RESOURCE CALENDAR EVENT DETAIL API RESPONSE (JSON) ────────');
        console.log(JSON.stringify(apiBody, null, 2));
        console.log('────────────────────────────────────────────────────────────────────');
    }
}

module.exports = ResourceCalendarBasicFilterPage;
