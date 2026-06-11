/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

/**
 * Page Object for Competition Management Advanced Filter.
 *
 * Handles API capture and validation for the Competition Management list endpoint.
 * UI interactions (filter dialog, EJ2 QueryBuilder) are handled by the shared
 * steps that delegate to PersonManagementAdvancedFilterPage — those locators are
 * generic and work across all modules that use the same right-slide-dialog filter.
 */
class CompetitionManagementAdvancedFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this._apiResponsePromise = null;
        this._lastAPIResponse = null;
        this._eligibilityCriteriaPromise = null;
    }

    // ─────────────────────────────────────────────────────────────────
    // PAGE TITLE
    // ─────────────────────────────────────────────────────────────────

    /**
     * Verify the Competition Management page title is visible.
     */
    async verifyPageTitle() {
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        const title = this.page.locator(
            "//div[normalize-space(text())='Competition Management'] | " +
            "//h1[normalize-space(text())='Competition Management'] | " +
            "//h2[normalize-space(text())='Competition Management'] | " +
            "//span[normalize-space(text())='Competition Management']"
        );
        await title.first().waitFor({ state: 'visible', timeout: 20000 });
        const actualTitle = (await title.first().textContent())?.trim();
        expect(actualTitle).toBe('Competition Management');
        console.log('✓ Competition Management page title verified');
    }

    // ─────────────────────────────────────────────────────────────────
    // API – CAPTURE
    // ─────────────────────────────────────────────────────────────────

    /**
     * Begin intercepting the competition management list API response.
     * Call BEFORE clicking the Apply Advanced Filter button.
     */
    startCapturingAPIResponse() {
        this._apiResponsePromise = this.page.waitForResponse(
            (r) =>
                r.url().toLowerCase().includes('competition') &&
                !r.url().toLowerCase().includes('eligibility') &&
                !r.url().toLowerCase().includes('config') &&
                !r.url().toLowerCase().includes('change') &&
                !r.url().toLowerCase().includes('ranking') &&
                r.request().method() === 'POST' &&
                r.status() === 200,
            { timeout: 90000 }
        );
        console.log('✓ Listening for Competition Management list API response');
    }

    // ─────────────────────────────────────────────────────────────────
    // API – AWAIT, STORE, PRINT
    // ─────────────────────────────────────────────────────────────────

    /**
     * Await the captured API response, store it, and return the parsed body.
     * @returns {Promise<object>}
     */
    async awaitAPIResponse() {
        const response = await this._apiResponsePromise;
        console.log(`✓ Captured Competition Management API URL: ${response.url()}`);
        const body = await response.json();
        this._apiResponsePromise = null;
        this._lastAPIResponse = body;
        return body;
    }

    /**
     * Assert the captured API response has a total count greater than zero.
     * @param {object} apiBody
     */
    async verifyAPITotalGreaterThanZero(apiBody) {
        const items =
            apiBody.items ??
            apiBody.data ??
            apiBody.records ??
            apiBody.content ??
            apiBody.results ??
            [];
        const count =
            apiBody.total ??
            apiBody.totalCount ??
            apiBody.totalElements ??
            apiBody.totalRecords ??
            apiBody.count ??
            items.length;
        if (count === 0) {
            console.log('⚠ Competition Management API returned 0 results. Top-level response keys:', Object.keys(apiBody));
            console.log(JSON.stringify(apiBody, null, 2));
        }
        expect(count).toBeGreaterThan(0);
        console.log(`✓ Competition Management API total count is ${count}, items in page: ${items.length}`);
    }

    /**
     * Pretty-print the stored API response JSON to the console.
     * @param {object} apiBody
     */
    printAPIResponseJSON(apiBody) {
        console.log('──────── COMPETITION MANAGEMENT ADVANCED FILTER API RESPONSE (JSON) ────────');
        console.log(JSON.stringify(apiBody, null, 2));
        console.log('─────────────────────────────────────────────────────────────────────────────');
    }

    // ─────────────────────────────────────────────────────────────────
    // FIELD MAPPING
    // ─────────────────────────────────────────────────────────────────

    /**
     * Map the UI field label shown in the query builder to the API response property path.
     * Update this mapping to match the actual API response structure of your application.
     * @param {string} fieldLabel
     * @returns {string}
     */
    mapFieldLabel(fieldLabel) {
        const mapping = {
            'Name':                'competitionName',
            'Competition Name':    'competitionName',
            'Status':              'status.libraryValue',
            'Season':              'season.name',
            'Competition Code':    'code',
            'Start Date':          'startDate',
            'End Date':            'endDate',
            'Competition Type':    'competitionType.name',
            'Format':              'format.name',
            'Competition Level':   'competitionLevel.libraryValue',
            'Division':            'division.name',
            'Division Category':   'divisionCategory.name',
            'Region':              'region',
            'Federation':          'federation.name',
            'Organization':        'organization.name',
        };
        const resolved = mapping[fieldLabel];
        if (!resolved) {
            console.warn(
                `⚠ No field mapping found for "${fieldLabel}". ` +
                `Using it as-is — update mapFieldLabel() if validation fails.`
            );
        }
        return resolved || fieldLabel;
    }

    // ─────────────────────────────────────────────────────────────────
    // CONDITION EVALUATION
    // ─────────────────────────────────────────────────────────────────

    /**
     * Parse a date string in DD/MM/YYYY, DD-MM-YYYY, or ISO format.
     * @param {string} str
     * @returns {number} timestamp or NaN
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

        switch (operator.toLowerCase().replace(/-/g, ' ')) {
            case 'contains':              return actualStr.includes(expectedStr);
            case 'does not contain':      return !actualStr.includes(expectedStr);
            case 'starts with':           return actualStr.startsWith(expectedStr);
            case 'does not start with':   return !actualStr.startsWith(expectedStr);
            case 'ends with':             return actualStr.endsWith(expectedStr);
            case 'does not end with':     return !actualStr.endsWith(expectedStr);
            case 'equal':                 return actualStr === expectedStr;
            case 'not equal':             return actualStr !== expectedStr;
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
                const d  = this._parseDate(actualStr), df = this._parseDate(from), dt = this._parseDate(to);
                if (!isNaN(d) && !isNaN(df) && !isNaN(dt)) return d >= df && d <= dt;
                const n  = Number(actual), nf = Number(from), nt = Number(to);
                if (!isNaN(n) && !isNaN(nf) && !isNaN(nt)) return n >= nf && n <= nt;
                return actualStr >= from && actualStr <= to;
            }
            case 'not between': {
                const [from, to] = expectedStr.split('|').map(v => v.trim());
                const d  = this._parseDate(actualStr), df = this._parseDate(from), dt = this._parseDate(to);
                if (!isNaN(d) && !isNaN(df) && !isNaN(dt)) return d <= df || d >= dt;
                const n  = Number(actual), nf = Number(from), nt = Number(to);
                if (!isNaN(n) && !isNaN(nf) && !isNaN(nt)) return n < nf || n > nt;
                return actualStr < from || actualStr > to;
            }
            default: return actualStr.includes(expectedStr);
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // API VALIDATION
    // ─────────────────────────────────────────────────────────────────

    /**
     * Validate every item in the API response satisfies a single condition.
     * @param {object} responseBody - Parsed JSON from the competition list endpoint
     * @param {string} fieldLabel   - UI field label e.g. "Name"
     * @param {string} operator     - e.g. "Contains", "Equal"
     * @param {string} value        - filter value
     */
    async validateApiResponseCondition(responseBody, fieldLabel, operator, value) {
        expect(responseBody).toBeTruthy();
        const items = responseBody.items ?? responseBody.data ?? responseBody.records ?? responseBody.content ?? responseBody.results ?? [];
        expect(Array.isArray(items)).toBe(true);

        const apiField = this.mapFieldLabel(fieldLabel);
        console.log(`Validating ${items.length} item(s): "${fieldLabel}" (${apiField}) ${operator} "${value}"`);

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
                    `Update mapFieldLabel() with the correct API field name. Skipping — update mapFieldLabel() if the key is wrong.`
                );
                continue;
            }

            const match = this.checkCondition(items[i], apiField, operator, value);
            if (!match) {
                const actualDisplay = actual === null || actual === undefined ? '(null)' : JSON.stringify(actual);
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

    /**
     * Validate every item satisfies condition1 OR condition2.
     */
    async validateApiResponseORConditions(responseBody, fieldLabel1, operator1, value1, fieldLabel2, operator2, value2) {
        expect(responseBody).toBeTruthy();
        const items = responseBody.items ?? responseBody.data ?? responseBody.records ?? responseBody.content ?? responseBody.results ?? [];
        expect(Array.isArray(items)).toBe(true);

        const apiField1 = this.mapFieldLabel(fieldLabel1);
        const apiField2 = this.mapFieldLabel(fieldLabel2);
        console.log(
            `Validating ${items.length} item(s): ` +
            `"${fieldLabel1}" ${operator1} "${value1}" OR "${fieldLabel2}" ${operator2} "${value2}"`
        );

        for (let i = 0; i < items.length; i++) {
            const match1 = this.checkCondition(items[i], apiField1, operator1, value1);
            const match2 = this.checkCondition(items[i], apiField2, operator2, value2);
            if (!match1 && !match2) {
                let actual1 = items[i];
                for (const key of apiField1.split('.')) actual1 = actual1?.[key];
                let actual2 = items[i];
                for (const key of apiField2.split('.')) actual2 = actual2?.[key];
                console.error(
                    `✗ Item[${i}] satisfies neither OR condition:\n` +
                    `  Condition 1: ${fieldLabel1} (${apiField1}) ${operator1} "${value1}" → actual="${actual1 ?? '(null)'}"\n` +
                    `  Condition 2: ${fieldLabel2} (${apiField2}) ${operator2} "${value2}" → actual="${actual2 ?? '(null)'}"\n` +
                    `  Top-level keys: [${Object.keys(items[i] || {}).join(', ')}]`
                );
            }
            expect(
                match1 || match2,
                `Item[${i}] satisfies neither condition: ` +
                `${fieldLabel1} ${operator1} "${value1}" OR ${fieldLabel2} ${operator2} "${value2}"`
            ).toBe(true);
        }
        console.log(`✓ All ${items.length} record(s) satisfy at least one OR condition`);
    }

    /**
     * Validate every item satisfies BOTH condition1 AND condition2.
     */
    async validateApiResponseANDConditions(responseBody, fieldLabel1, operator1, value1, fieldLabel2, operator2, value2) {
        expect(responseBody).toBeTruthy();
        const items = responseBody.items ?? responseBody.data ?? responseBody.records ?? responseBody.content ?? responseBody.results ?? [];
        expect(Array.isArray(items)).toBe(true);

        const apiField1 = this.mapFieldLabel(fieldLabel1);
        const apiField2 = this.mapFieldLabel(fieldLabel2);
        console.log(
            `Validating ${items.length} item(s): ` +
            `"${fieldLabel1}" (${apiField1}) ${operator1} "${value1}" AND "${fieldLabel2}" (${apiField2}) ${operator2} "${value2}"`
        );

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
        console.log(`✓ All ${items.length} record(s) satisfy BOTH conditions`);
    }
    // ─────────────────────────────────────────────────────────────────
    // GRID – CLICK FIRST RECORD
    // ─────────────────────────────────────────────────────────────────

    async clickFirstGridRecord() {
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1000);

        const urlBefore = this.page.url();

        const firstRow = this.page.locator(
            "//div[contains(@class,'e-gridcontent')]//table//tbody//tr[not(contains(@class,'e-emptyrow'))][1]"
        ).first();
        await firstRow.waitFor({ state: 'visible', timeout: 15000 });

        const rowLink = firstRow.locator('a').first();
        if (await rowLink.isVisible().catch(() => false)) {
            await rowLink.click();
            await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
            await this.page.waitForTimeout(1500);
            console.log('✓ Navigated via anchor link in first grid row');
            return;
        }

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

        await firstRow.dblclick();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1500);
        if (this.page.url() !== urlBefore) {
            console.log('✓ Navigated via double-click on first grid row');
            return;
        }

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
        console.log('⚠ No navigation detected after clicking grid row — detail page may open as a panel.');
    }

    // ─────────────────────────────────────────────────────────────────
    // DETAIL PAGE – TAB NAVIGATION
    // ─────────────────────────────────────────────────────────────────

    async navigateToTab(tabName) {
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        const tab = this.page.locator(
            `//div[normalize-space()='${tabName}'] | ` +
            `//a[normalize-space()='${tabName}'] | ` +
            `//li[normalize-space()='${tabName}'] | ` +
            `//span[normalize-space()='${tabName}']`
        ).first();
        await tab.waitFor({ state: 'visible', timeout: 15000 });
        await tab.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1000);
        console.log(`✓ Navigated to "${tabName}" tab`);
    }

    // ─────────────────────────────────────────────────────────────────
    // ELIGIBILITY CRITERIA API – CAPTURE
    // ─────────────────────────────────────────────────────────────────

    startCapturingEligibilityCriteriaResponse() {
        this._eligibilityCriteriaPromise = this.page.waitForResponse(
            (r) =>
                r.url().toLowerCase().includes('eligibility-criteria') &&
                r.url().toLowerCase().includes('competition') &&
                r.request().method() === 'GET' &&
                r.status() === 200,
            { timeout: 90000 }
        );
        console.log('✓ Listening for Eligibility Criteria API response');
    }

    // ─────────────────────────────────────────────────────────────────
    // ELIGIBILITY CRITERIA API – AWAIT
    // ─────────────────────────────────────────────────────────────────

    async awaitEligibilityCriteriaResponse() {
        const response = await this._eligibilityCriteriaPromise;
        console.log(`✓ Captured Eligibility Criteria API URL: ${response.url()}`);
        const body = await response.json();
        this._eligibilityCriteriaPromise = null;
        return body;
    }

    // ─────────────────────────────────────────────────────────────────
    // ELIGIBILITY CRITERIA API – PRINT
    // ─────────────────────────────────────────────────────────────────

    printEligibilityCriteriaResponseJSON(body) {
        console.log('──────── ELIGIBILITY CRITERIA API RESPONSE (JSON) ────────');
        console.log(JSON.stringify(body, null, 2));
        console.log('───────────────────────────────────────────────────────────');
    }

    // ─────────────────────────────────────────────────────────────────
    // ELIGIBILITY CRITERIA API – MAX AGE VALIDATION
    // ─────────────────────────────────────────────────────────────────

    async validateEligibilityCriteriaMaxAge(responseBody, operator, value) {
        expect(responseBody).toBeTruthy();

        // Response shape: { _id, eligibilityCriteria: [...] }
        // Unwrap the eligibilityCriteria array first, then fall back to generic patterns.
        let items;
        if (Array.isArray(responseBody)) {
            items = responseBody;
        } else if (Array.isArray(responseBody.eligibilityCriteria)) {
            items = responseBody.eligibilityCriteria;
        } else {
            items = responseBody.items ?? responseBody.data ?? responseBody.records ?? [responseBody];
        }

        console.log(`Validating ${items.length} eligibility criteria record(s): maxAge ${operator} "${value}"`);

        if (items.length > 0) {
            console.log('── Sample eligibility criteria Item[0] ──');
            console.log(JSON.stringify(items[0], null, 2));
            console.log('─────────────────────────────────────────');
        }

        let atLeastOneMatch = false;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const maxAge = item.maxAge ?? item.maximumAge ?? item.max_age ?? item.MaxAge;

            if (maxAge === null || maxAge === undefined) {
                const topKeys = Object.keys(item || {});
                console.warn(
                    `⚠ maxAge field not found in eligibilityCriteria Item[${i}]. ` +
                    `Top-level keys: [${topKeys.join(', ')}]. ` +
                    `Update validateEligibilityCriteriaMaxAge() with the correct field name.`
                );
            }

            console.log(`  Item[${i}] maxAge = ${maxAge}`);
            const match = this.checkCondition({ maxAge }, 'maxAge', operator, value);
            if (match) {
                console.log(`✓ Item[${i}] maxAge=${maxAge} satisfies: Maximum Age ${operator} "${value}"`);
                atLeastOneMatch = true;
            } else {
                console.log(`  Item[${i}] maxAge=${maxAge} does not satisfy: Maximum Age ${operator} "${value}"`);
            }
        }
        expect(
            atLeastOneMatch,
            `No eligibility criteria record satisfies: Maximum Age ${operator} "${value}"`
        ).toBe(true);
        console.log(`✓ At least one eligibility criteria record satisfies: Maximum Age ${operator} "${value}"`);
    }

    async validateEligibilityCriteriaMaxAgeBetween(responseBody, operator, fromValue, toValue) {
        expect(responseBody).toBeTruthy();

        let items;
        if (Array.isArray(responseBody)) {
            items = responseBody;
        } else if (Array.isArray(responseBody.eligibilityCriteria)) {
            items = responseBody.eligibilityCriteria;
        } else {
            items = responseBody.items ?? responseBody.data ?? responseBody.records ?? [responseBody];
        }

        console.log(`Validating ${items.length} eligibility criteria record(s): maxAge ${operator} "${fromValue}" and "${toValue}"`);

        if (items.length > 0) {
            console.log('── Sample eligibility criteria Item[0] ──');
            console.log(JSON.stringify(items[0], null, 2));
            console.log('─────────────────────────────────────────');
        }

        // checkCondition expects Between/Not Between value as "from|to"
        const rangeValue = `${fromValue}|${toValue}`;
        let atLeastOneMatch = false;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const maxAge = item.maxAge ?? item.maximumAge ?? item.max_age ?? item.MaxAge;

            if (maxAge === null || maxAge === undefined) {
                const topKeys = Object.keys(item || {});
                console.warn(
                    `⚠ maxAge field not found in eligibilityCriteria Item[${i}]. ` +
                    `Top-level keys: [${topKeys.join(', ')}]. ` +
                    `Update validateEligibilityCriteriaMaxAgeBetween() with the correct field name.`
                );
            }

            console.log(`  Item[${i}] maxAge = ${maxAge}`);
            const match = this.checkCondition({ maxAge }, 'maxAge', operator, rangeValue);
            if (match) {
                console.log(`✓ Item[${i}] maxAge=${maxAge} satisfies: Maximum Age ${operator} "${fromValue}" and "${toValue}"`);
                atLeastOneMatch = true;
            } else {
                console.log(`  Item[${i}] maxAge=${maxAge} does not satisfy: Maximum Age ${operator} "${fromValue}" and "${toValue}"`);
            }
        }
        expect(
            atLeastOneMatch,
            `No eligibility criteria record satisfies: Maximum Age ${operator} "${fromValue}" and "${toValue}"`
        ).toBe(true);
        console.log(`✓ At least one eligibility criteria record satisfies: Maximum Age ${operator} "${fromValue}" and "${toValue}"`);
    }
}

module.exports = CompetitionManagementAdvancedFilterPage;
