/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

class CompetitionChangeRequestAdvancedFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this._apiResponsePromise = null;
        this._lastAPIResponse = null;
    }

    // ─────────────────────────────────────────────────────────────────
    // API – CAPTURE & PRINT
    // ─────────────────────────────────────────────────────────────────

    /**
     * Begin intercepting the change request list API response triggered by
     * the Advanced Filter apply action. Call BEFORE clicking Apply.
     */
    startCapturingAPI() {
        this._apiResponsePromise = this.page.waitForResponse(
            (r) =>
                (r.url().toLowerCase().includes('change-request') ||
                    r.url().toLowerCase().includes('changerequest') ||
                    r.url().toLowerCase().includes('change_request')) &&
                r.url().toLowerCase().includes('list') &&
                r.request().method() === 'POST' &&
                r.status() === 200,
            { timeout: 90000 }
        );
        console.log('✓ Listening for change request advanced filter API response');
    }

    /**
     * Await the captured API response, store it, and pretty-print it.
     * @returns {Promise<object>}
     */
    async awaitAndPrintAPIResponse() {
        const response = await this._apiResponsePromise;
        const body = await response.json();
        this._apiResponsePromise = null;
        this._lastAPIResponse = body;

        console.log('──────── CHANGE REQUEST ADVANCED FILTER API RESPONSE (JSON) ────────');
        console.log(JSON.stringify(body, null, 2));
        console.log('─────────────────────────────────────────────────────────────────────');
        return body;
    }

    /**
     * Assert the captured API response has a total count greater than zero.
     * @param {object} apiBody
     */
    async verifyAPITotalGreaterThanZero(apiBody) {
        const count = apiBody.total ?? apiBody.totalCount ?? apiBody.items?.length ?? 0;
        expect(count).toBeGreaterThan(0);
        console.log(`✓ Change request advanced filter API total count is ${count} (greater than zero)`);
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY BUTTON
    // ─────────────────────────────────────────────────────────────────

    /**
     * Click the "Apply Advanced Filter" button.
     * Uses a contains selector to avoid sensitivity to extra whitespace in aria-label.
     */
    async clickApplyAdvancedFilterButton() {
        const btn = this.page.locator('button[aria-label*="Apply Advanced Filter"]');
        await btn.waitFor({ state: 'visible', timeout: 30000 });
        await btn.click();
        await this.page.waitForTimeout(1500);
        console.log('✓ Clicked Apply Advanced Filter button');
    }

    // ─────────────────────────────────────────────────────────────────
    // GRID – CLICK FIRST RECORD
    // ─────────────────────────────────────────────────────────────────

    /**
     * Click the first data row in the Change Request grid to open the detail page.
     */
    async clickFirstGridRecord() {
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1000);

        const urlBefore = this.page.url();

        const firstRow = this.page.locator(
            "//div[contains(@class,'e-gridcontent')]//table//tbody//tr[not(contains(@class,'e-emptyrow'))][1]"
        ).first();
        await firstRow.waitFor({ state: 'visible', timeout: 15000 });

        // Strategy 1: click an anchor/link inside the row (most common navigation target)
        const rowLink = firstRow.locator('a').first();
        if (await rowLink.isVisible().catch(() => false)) {
            await rowLink.click();
            await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
            await this.page.waitForTimeout(1500);
            console.log('✓ Navigated via anchor link in first grid row');
            return;
        }

        // Strategy 2: click a clickable cell with text (first non-empty td that acts as a link)
        const clickableCell = firstRow.locator(
            'td[class*="pointer"], td[class*="cursor"], td[class*="clickable"], td[class*="link"]'
        ).first();
        if (await clickableCell.isVisible().catch(() => false)) {
            await clickableCell.click();
            await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
            await this.page.waitForTimeout(1500);
            if (this.page.url() !== urlBefore) {
                console.log('✓ Navigated via clickable cell in first grid row');
                return;
            }
        }

        // Strategy 3: double-click the row
        await firstRow.dblclick();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1500);
        if (this.page.url() !== urlBefore) {
            console.log('✓ Navigated via double-click on first grid row');
            return;
        }

        // Strategy 4: click the first cell (td) in the row
        const firstCell = firstRow.locator('td').first();
        await firstCell.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1500);
        if (this.page.url() !== urlBefore) {
            console.log('✓ Navigated via first cell click in grid row');
            return;
        }

        console.log(`ℹ URL before: ${urlBefore}`);
        console.log(`ℹ URL after all strategies: ${this.page.url()}`);
        console.log('⚠ No navigation detected after clicking grid row — the detail page may open as a panel or modal.');
    }

    // ─────────────────────────────────────────────────────────────────
    // DETAIL PAGE – VERIFY FIELD VALUE
    // ─────────────────────────────────────────────────────────────────

    /**
     * On the Change Request detail page, find a labelled field and assert
     * its visible text satisfies the given operator + value condition.
     *
     * Tries multiple locator strategies to locate a label/value pair:
     *   1. Label element whose text is fieldLabel, then sibling/child value node
     *   2. Generic key-value row patterns used by Angular detail views
     *
     * @param {string} fieldLabel  - e.g. "Approved By"
     * @param {string} operator    - e.g. "Starts with", "Does not start with"
     * @param {string} value       - expected value fragment
     */
    async verifyDetailField(fieldLabel, operator, value) {
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1500);

        const _isJunk = (t) =>
            !t || ['press enter to sort', 'ascending', 'descending', 'sort'].some(
                s => t.toLowerCase().includes(s)
            );

        // Helper: get value from an input element (handles disabled/readonly via getAttribute)
        const _inputVal = async (loc) => {
            const v = await loc.inputValue().catch(() => '');
            if (v) return v;
            return await loc.getAttribute('value').catch(() => '') ?? '';
        };

        let fieldText = '';

        // ── Strategy 1 (EJ2 floating label): label comes AFTER input in DOM ──
        // Pattern: <div class="e-float-input"><input value="..."/><label>Field Name</label></div>
        // Use preceding-sibling or parent lookup to find the input before the label.
        if (!fieldText || _isJunk(fieldText)) {
            const precedingInput = this.page.locator(
                `//label[normalize-space()='${fieldLabel}']/preceding-sibling::input[1] | ` +
                `//label[normalize-space()='${fieldLabel}']/../input[1]`
            ).first();
            if (await precedingInput.isVisible().catch(() => false)) {
                fieldText = await _inputVal(precedingInput);
            }
        }

        // ── Strategy 2 (EJ2 floating label read-only span / e-float-text) ──
        // Some EJ2 read-only fields render value as a span sibling of the label's container
        if (!fieldText || _isJunk(fieldText)) {
            const floatContainer = this.page.locator(
                `//label[normalize-space()='${fieldLabel}']/parent::*`
            ).first();
            if (await floatContainer.isVisible().catch(() => false)) {
                // Value text is often the direct text node / first span inside the same container
                const containerText = (await floatContainer.textContent().catch(() => ''))?.trim() ?? '';
                // Strip the label text itself to get only the value part
                const stripped = containerText.replace(fieldLabel, '').trim();
                if (stripped && !_isJunk(stripped)) fieldText = stripped;
            }
        }

        // ── Strategy 3: <label> → following (not preceding) input ──
        if (!fieldText || _isJunk(fieldText)) {
            const followingInput = this.page.locator(
                `//label[normalize-space()='${fieldLabel}']/following::input[1]`
            ).first();
            if (await followingInput.isVisible().catch(() => false)) {
                fieldText = await _inputVal(followingInput);
            }
        }

        // ── Strategy 4: <label> → following sibling span/div text ──
        if (!fieldText || _isJunk(fieldText)) {
            const sib = this.page.locator(
                `//label[normalize-space()='${fieldLabel}']/following-sibling::*[self::div or self::span][1]`
            ).first();
            if (await sib.isVisible().catch(() => false)) {
                const t = (await sib.textContent().catch(() => ''))?.trim() ?? '';
                if (!_isJunk(t)) fieldText = t;
            }
        }

        // ── Strategy 5: non-header div/span label → parent's next sibling ──
        if (!fieldText || _isJunk(fieldText)) {
            const parentSib = this.page.locator(
                `//*[not(ancestor::thead) and ` +
                `not(ancestor::*[contains(@class,'e-headercell')]) and ` +
                `not(ancestor::*[contains(@class,'e-columnheader')]) and ` +
                `normalize-space()='${fieldLabel}' and ` +
                `(self::div or self::span or self::p)]/parent::*/following-sibling::*[1]`
            ).first();
            if (await parentSib.isVisible().catch(() => false)) {
                const t = (await parentSib.textContent().catch(() => ''))?.trim() ?? '';
                if (!_isJunk(t)) fieldText = t;
            }
        }

        // ── Strategy 6: <td> → following-sibling <td> ──
        if (!fieldText || _isJunk(fieldText)) {
            const td = this.page.locator(
                `//td[normalize-space()='${fieldLabel}']/following-sibling::td[1]`
            ).first();
            if (await td.isVisible().catch(() => false)) {
                const t = (await td.textContent().catch(() => ''))?.trim() ?? '';
                if (!_isJunk(t)) fieldText = t;
            }
        }

        // ── Strategy 7: input matched by id / placeholder / aria-label ──
        if (!fieldText || _isJunk(fieldText)) {
            const camel = fieldLabel.replace(/\s+(.)/g, (_, c) => c.toUpperCase())
                .replace(/^(.)/, c => c.toLowerCase()); // "Template Name" → "templateName"
            const ejsInput = this.page.locator(
                `input[id="${camel}"], ` +
                `input[id*="${fieldLabel.replace(/\s+/g, '').toLowerCase()}"], ` +
                `input[placeholder*="${fieldLabel}"], ` +
                `input[aria-label*="${fieldLabel}"]`
            ).first();
            if (await ejsInput.isVisible().catch(() => false)) {
                fieldText = await _inputVal(ejsInput);
            }
        }

        // ── Diagnostic: dump matching elements when all strategies fail ──
        if (!fieldText || _isJunk(fieldText)) {
            const allMatches = this.page.locator(`//*[contains(normalize-space(),'${fieldLabel}')]`);
            const cnt = await allMatches.count().catch(() => 0);
            console.warn(`⚠ All strategies failed for "${fieldLabel}" (${cnt} elements contain this text):`);
            for (let i = 0; i < Math.min(cnt, 6); i++) {
                const el = allMatches.nth(i);
                const tag = await el.evaluate(e => e.tagName).catch(() => '?');
                const cls = await el.evaluate(e => e.className).catch(() => '');
                const txt = (await el.textContent().catch(() => ''))?.trim().substring(0, 80) ?? '';
                const html = await el.evaluate(e => e.outerHTML.substring(0, 150)).catch(() => '');
                console.warn(`  [${i}] <${tag} class="${cls}"> text="${txt}" | html=${html}`);
            }
        }

        console.log(`Detail field "${fieldLabel}" actual value: "${fieldText}"`);


        const actualStr = fieldText.toLowerCase();
        const expectedStr = value.toLowerCase();
        let match = false;

        switch (operator.toLowerCase()) {
            case 'starts with':         match = actualStr.startsWith(expectedStr); break;
            case 'does not start with': match = !actualStr.startsWith(expectedStr); break;
            case 'ends with':           match = actualStr.endsWith(expectedStr); break;
            case 'does not end with':   match = !actualStr.endsWith(expectedStr); break;
            case 'contains':            match = actualStr.includes(expectedStr); break;
            case 'does not contain':    match = !actualStr.includes(expectedStr); break;
            case 'equal':               match = actualStr === expectedStr; break;
            case 'not equal':           match = actualStr !== expectedStr; break;
            default:                    match = actualStr.includes(expectedStr);
        }

        expect(
            match,
            `Detail field "${fieldLabel}" value "${fieldText}" does not satisfy: ${operator} "${value}"`
        ).toBe(true);
        console.log(`✓ Detail field "${fieldLabel}" "${fieldText}" satisfies: ${operator} "${value}"`);
    }

    // ─────────────────────────────────────────────────────────────────
    // FIELD MAPPING
    // ─────────────────────────────────────────────────────────────────

    /**
     * Map the UI field label to the API response property path.
     * Adjust values to match the actual API response structure.
     * @param {string} fieldLabel
     * @returns {string}
     */
    mapFieldLabel(fieldLabel) {
        const mapping = {
            'Approved By': 'approvedBy',
            'Template Name': 'templateName',
            'Status': 'status',
            'Season': 'season',
            'Federation': 'federation',
            'Region': 'region',
        };
        return mapping[fieldLabel] || fieldLabel;
    }

    // ─────────────────────────────────────────────────────────────────
    // CONDITION EVALUATION
    // ─────────────────────────────────────────────────────────────────

    /**
     * Evaluate one condition against a single API response item.
     * Supports dot-notation for nested fields (e.g. "status.libraryValue").
     * @param {object} item
     * @param {string} apiField   - dot-notation field path
     * @param {string} operator   - UI operator name
     * @param {string} value      - expected value
     * @returns {boolean}
     */
    checkCondition(item, apiField, operator, value) {
        let actual = item;
        for (const key of apiField.split('.')) {
            actual = actual?.[key];
        }
        const actualStr = (actual ?? '').toString().toLowerCase();
        const expectedStr = value.toLowerCase();

        switch (operator.toLowerCase()) {
            case 'contains':
                return actualStr.includes(expectedStr);
            case 'does not contain':
                return !actualStr.includes(expectedStr);
            case 'starts with':
                return actualStr.startsWith(expectedStr);
            case 'does not start with':
                return !actualStr.startsWith(expectedStr);
            case 'ends with':
                return actualStr.endsWith(expectedStr);
            case 'does not end with':
                return !actualStr.endsWith(expectedStr);
            case 'equal':
                return actualStr === expectedStr;
            case 'not equal':
                return actualStr !== expectedStr;
            case 'in': {
                const tokens = expectedStr.split(',').map(t => t.trim());
                return tokens.some(t => actualStr === t);
            }
            case 'not in': {
                const tokens = expectedStr.split(',').map(t => t.trim());
                return tokens.every(t => actualStr !== t);
            }
            default:
                return actualStr.includes(expectedStr);
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // API VALIDATION
    // ─────────────────────────────────────────────────────────────────

    /**
     * Validate every item in the API response satisfies a single condition.
     * @param {object} responseBody  - Parsed JSON response
     * @param {string} fieldLabel    - UI field label e.g. "Approved By"
     * @param {string} operator      - e.g. "Starts with", "Does not start with"
     * @param {string} value         - filter value
     */
    async validateApiResponseCondition(responseBody, fieldLabel, operator, value) {
        expect(responseBody).toBeTruthy();
        const items = responseBody.items ?? responseBody.data ?? [];
        expect(Array.isArray(items)).toBe(true);

        const apiField = this.mapFieldLabel(fieldLabel);
        console.log(`Validating ${items.length} item(s): "${fieldLabel}" (${apiField}) ${operator} "${value}"`);

        // Print the first item's full structure once to help identify correct field names
        if (items.length > 0) {
            console.log('── Sample API item (Item[0]) ──');
            console.log(JSON.stringify(items[0], null, 2));
            console.log('──────────────────────────────');
        }

        for (let i = 0; i < items.length; i++) {
            let actual = items[i];
            for (const key of apiField.split('.')) actual = actual?.[key];

            if (actual === null || actual === undefined) {
                const topKeys = Object.keys(items[i] || {});
                console.error(
                    `⚠ Field "${apiField}" is null/undefined in Item[${i}]. ` +
                    `Top-level keys: [${topKeys.join(', ')}]. ` +
                    `Update mapFieldLabel() with the correct API field name.`
                );
            }

            const match = this.checkCondition(items[i], apiField, operator, value);
            if (!match) {
                const actualDisplay = actual === null || actual === undefined
                    ? '(null)'
                    : JSON.stringify(actual);
                console.error(
                    `✗ Item[${i}] actual ${apiField}=${actualDisplay} fails: ${fieldLabel} ${operator} "${value}"`
                );
            }
            expect(
                match,
                `Item[${i}] actual ${apiField} fails: ${fieldLabel} ${operator} "${value}"`
            ).toBe(true);
        }
        console.log(`✓ All ${items.length} record(s) satisfy: ${fieldLabel} ${operator} "${value}"`);
    }
}

module.exports = CompetitionChangeRequestAdvancedFilterPage;
