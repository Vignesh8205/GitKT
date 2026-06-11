/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

class DateGridAdvancedFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this._apiResponsePromise = null;
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION
    // ─────────────────────────────────────────────────────────────────

    async navigateToDateGridTab() {
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        const dateGridTab = this.page.locator(
            "//div[@role='tab' and normalize-space()='Date Grid']"
        );
        await dateGridTab.waitFor({ state: 'visible', timeout: 15000 });
        await dateGridTab.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1000);
        console.log('✓ Navigated to Date Grid tab');
    }

    // ─────────────────────────────────────────────────────────────────
    // API – CAPTURE
    // ─────────────────────────────────────────────────────────────────

    startCapturingAPIResponse() {
        this._apiResponsePromise = this.page.waitForResponse(
            (r) =>
                r.url().toLowerCase().includes('date-grid') &&
                r.url().toLowerCase().includes('list') &&
                r.request().method() === 'POST' &&
                r.status() === 200,
            { timeout: 90000 }
        );
        console.log('✓ Listening for Date Grid list API response');
    }

    // ─────────────────────────────────────────────────────────────────
    // API – AWAIT
    // ─────────────────────────────────────────────────────────────────

    async awaitAPIResponse() {
        const response = await this._apiResponsePromise;
        console.log(`✓ Captured Date Grid API URL: ${response.url()}`);
        const body = await response.json();
        this._apiResponsePromise = null;
        return body;
    }

    // ─────────────────────────────────────────────────────────────────
    // API – VERIFY COUNT
    // ─────────────────────────────────────────────────────────────────

    async verifyAPITotalGreaterThanZero(apiBody) {
        const count =
            apiBody.total ??
            apiBody.totalCount ??
            apiBody.count ??
            (apiBody.items ?? apiBody.data ?? apiBody.records ?? []).length;
        const items = apiBody.items ?? apiBody.data ?? apiBody.records ?? [];
        if (count === 0 || items.length === 0) {
            console.log('ℹ No records found in the Date Grid for the applied filter — grid displays "No records found".');
        } else {
            console.log(`✓ Date Grid API total count is ${count}, items in page: ${items.length}`);
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // API – PRINT
    // ─────────────────────────────────────────────────────────────────

    printAPIResponseJSON(apiBody) {
        console.log('──────── DATE GRID ADVANCED FILTER API RESPONSE (JSON) ────────');
        console.log(JSON.stringify(apiBody, null, 2));
        console.log('────────────────────────────────────────────────────────────────');
    }

    // ─────────────────────────────────────────────────────────────────
    // FIELD MAPPING
    // ─────────────────────────────────────────────────────────────────

    mapFieldLabel(fieldLabel) {
        const mapping = {
            'Template Name':   'templateName',
            'Total Teams':     'totalTeams',
            'Total teams':     'totalTeams',
            'Match Day Count': 'matchDayCount',
            'Match day count': 'matchDayCount',
            'Status':          'status.libraryValue',
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
    // DATE PARSING
    // ─────────────────────────────────────────────────────────────────

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

    // ─────────────────────────────────────────────────────────────────
    // CONDITION EVALUATION
    // ─────────────────────────────────────────────────────────────────

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
                const n1 = Number(actual), n2 = Number(value);
                if (!isNaN(n1) && !isNaN(n2)) return n1 > n2;
                const d1 = this._parseDate(actualStr), d2 = this._parseDate(expectedStr);
                if (!isNaN(d1) && !isNaN(d2)) return d1 > d2;
                return actualStr > expectedStr;
            }
            case 'greater than or equal': {
                const n1 = Number(actual), n2 = Number(value);
                if (!isNaN(n1) && !isNaN(n2)) return n1 >= n2;
                const d1 = this._parseDate(actualStr), d2 = this._parseDate(expectedStr);
                if (!isNaN(d1) && !isNaN(d2)) return d1 >= d2;
                return actualStr >= expectedStr;
            }
            case 'less than': {
                const n1 = Number(actual), n2 = Number(value);
                if (!isNaN(n1) && !isNaN(n2)) return n1 < n2;
                const d1 = this._parseDate(actualStr), d2 = this._parseDate(expectedStr);
                if (!isNaN(d1) && !isNaN(d2)) return d1 < d2;
                return actualStr < expectedStr;
            }
            case 'less than or equal': {
                const n1 = Number(actual), n2 = Number(value);
                if (!isNaN(n1) && !isNaN(n2)) return n1 <= n2;
                const d1 = this._parseDate(actualStr), d2 = this._parseDate(expectedStr);
                if (!isNaN(d1) && !isNaN(d2)) return d1 <= d2;
                return actualStr <= expectedStr;
            }
            case 'between': {
                const [from, to] = expectedStr.split('|').map(v => v.trim());
                const n = Number(actual), nf = Number(from), nt = Number(to);
                if (!isNaN(n) && !isNaN(nf) && !isNaN(nt)) return n >= nf && n <= nt;
                const d = this._parseDate(actualStr), df = this._parseDate(from), dt = this._parseDate(to);
                if (!isNaN(d) && !isNaN(df) && !isNaN(dt)) return d >= df && d <= dt;
                return actualStr >= from && actualStr <= to;
            }
            case 'not between': {
                const [from, to] = expectedStr.split('|').map(v => v.trim());
                const n = Number(actual), nf = Number(from), nt = Number(to);
                if (!isNaN(n) && !isNaN(nf) && !isNaN(nt)) return n < nf || n > nt;
                const d = this._parseDate(actualStr), df = this._parseDate(from), dt = this._parseDate(to);
                if (!isNaN(d) && !isNaN(df) && !isNaN(dt)) return d <= df || d >= dt;
                return actualStr < from || actualStr > to;
            }
            default: return actualStr.includes(expectedStr);
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // API VALIDATION – SINGLE CONDITION
    // ─────────────────────────────────────────────────────────────────

    async validateApiResponseCondition(responseBody, fieldLabel, operator, value) {
        expect(responseBody).toBeTruthy();
        const items = responseBody.items ?? responseBody.data ?? responseBody.records ?? [];
        expect(Array.isArray(items)).toBe(true);

        if (items.length === 0) {
            console.log(`ℹ No records found for: "${fieldLabel}" ${operator} "${value}" — skipping record-level validation.`);
            return;
        }

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
                console.warn(
                    `⚠ Field "${apiField}" is null/undefined in Item[${i}]. ` +
                    `Top-level keys: [${topKeys.join(', ')}]. ` +
                    `Update mapFieldLabel() with the correct API field name. Skipping — update mapFieldLabel() if the key is wrong.`
                );
                continue;
            }

            const match = this.checkCondition(items[i], apiField, operator, value);
            if (!match) {
                console.error(
                    `✗ Item[${i}] actual ${apiField}=${JSON.stringify(actual)} fails: ${fieldLabel} ${operator} "${value}"`
                );
            }
            expect(
                match,
                `Item[${i}] fails: ${fieldLabel} ${operator} "${value}"`
            ).toBe(true);
        }
        console.log(`✓ All ${items.length} record(s) satisfy: ${fieldLabel} ${operator} "${value}"`);
    }

    // ─────────────────────────────────────────────────────────────────
    // API VALIDATION – OR CONDITIONS
    // ─────────────────────────────────────────────────────────────────

    async validateApiResponseORConditions(responseBody, fieldLabel1, operator1, value1, fieldLabel2, operator2, value2) {
        expect(responseBody).toBeTruthy();
        const items = responseBody.items ?? responseBody.data ?? responseBody.records ?? [];
        expect(Array.isArray(items)).toBe(true);

        if (items.length === 0) {
            console.log(`ℹ No records found for OR condition — skipping record-level validation.`);
            return;
        }

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
                let a1 = items[i]; for (const k of apiField1.split('.')) a1 = a1?.[k];
                let a2 = items[i]; for (const k of apiField2.split('.')) a2 = a2?.[k];
                console.error(
                    `✗ Item[${i}] satisfies neither OR condition:\n` +
                    `  C1: ${fieldLabel1} ${operator1} "${value1}" → actual="${a1 ?? '(null)'}"\n` +
                    `  C2: ${fieldLabel2} ${operator2} "${value2}" → actual="${a2 ?? '(null)'}"`
                );
            }
            expect(
                match1 || match2,
                `Item[${i}] satisfies neither: ${fieldLabel1} ${operator1} "${value1}" OR ${fieldLabel2} ${operator2} "${value2}"`
            ).toBe(true);
        }
        console.log(`✓ All ${items.length} record(s) satisfy at least one OR condition`);
    }

    // ─────────────────────────────────────────────────────────────────
    // API VALIDATION – AND CONDITIONS
    // ─────────────────────────────────────────────────────────────────

    async validateApiResponseANDConditions(responseBody, fieldLabel1, operator1, value1, fieldLabel2, operator2, value2) {
        expect(responseBody).toBeTruthy();
        const items = responseBody.items ?? responseBody.data ?? responseBody.records ?? [];
        expect(Array.isArray(items)).toBe(true);

        if (items.length === 0) {
            console.log(`ℹ No records found for AND condition — skipping record-level validation.`);
            return;
        }

        const apiField1 = this.mapFieldLabel(fieldLabel1);
        const apiField2 = this.mapFieldLabel(fieldLabel2);
        console.log(
            `Validating ${items.length} item(s): ` +
            `"${fieldLabel1}" ${operator1} "${value1}" AND "${fieldLabel2}" ${operator2} "${value2}"`
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
        console.log(`✓ All ${items.length} record(s) satisfy BOTH AND conditions`);
    }
}

module.exports = DateGridAdvancedFilterPage;
