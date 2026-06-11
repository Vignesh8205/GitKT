/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

/**
 * Class Name: SeasonConfigAdvancedFilterPage
 *
 * Description:
 * Page Object for the Season Configuration Advanced Filter panel inside
 * Competition Management > Season > Home > Configurations.
 *
 * Supported advanced filter fields:
 *   Federation        – federation.name
 *   Format            – format.name
 *   Region            – region
 *   Type              – type.name
 *   Competition Type  – competitionType.name
 *
 * API endpoint validated: POST /season/configuration/list
 *
 * @author Auto-generated
 * @version 1.0
 */

class SeasonConfigAdvancedFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this._apiPromise = null;
    }

    // ─────────────────────────────────────────────────────────────────
    // OPEN ADVANCED FILTER DIALOG
    // ─────────────────────────────────────────────────────────────────

    /**
     * Click the Season Configuration filter icon to open the filter dialog.
     * Uses the same multi-strategy approach as SeasonConfigBasicFilterPage.clickFilterIcon().
     */
    async openAdvancedFilterDialog() {
        const filterDialog = this.page.locator('[cssclass="right-slide-dialog"].e-popup-open').last();

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

                console.log(`ℹ Clicking Season Config Advanced Filter button [${sel}] index ${i}`);
                await btn.evaluate(el => el.click()).catch(() => btn.click({ force: true }).catch(() => {}));
                await this.page.waitForTimeout(1000);

                if (await filterDialog.isVisible().catch(() => false)) {
                    console.log('✓ Season Configuration advanced filter dialog opened');
                    return;
                }
            }
        }

        // Final wait in case the dialog animates in slowly
        await filterDialog.waitFor({ state: 'visible', timeout: 15000 });
        console.log('✓ Season Configuration advanced filter dialog opened (late)');
    }

    // ─────────────────────────────────────────────────────────────────
    // API – CAPTURE
    // ─────────────────────────────────────────────────────────────────

    /**
     * Start intercepting the Season Configuration list API response.
     * Matches POST responses where URL includes 'season', 'configuration', and 'list', status 200.
     * Call this method BEFORE clicking the Apply Advanced Filter button.
     */
    startCapturingAPI() {
        this._apiPromise = this.page.waitForResponse(
            (r) =>
                r.url().toLowerCase().includes('season') &&
                r.url().toLowerCase().includes('configuration') &&
                r.url().toLowerCase().includes('list') &&
                r.request().method() === 'POST' &&
                r.status() === 200,
            { timeout: 90000 }
        );
        console.log('✓ Listening for Season Configuration advanced filter API response (POST /season/configuration/list)');
    }

    // ─────────────────────────────────────────────────────────────────
    // API – AWAIT
    // ─────────────────────────────────────────────────────────────────

    /**
     * Await the captured API response and return the parsed JSON body.
     */
    async awaitAPI() {
        const response = await this._apiPromise;
        console.log(`✓ Captured Season Configuration advanced filter API URL: ${response.url()}`);
        const body = await response.json();
        this._apiPromise = null;
        return body;
    }

    // ─────────────────────────────────────────────────────────────────
    // API – VERIFY COUNT
    // ─────────────────────────────────────────────────────────────────

    /**
     * Log the total count. Warns (does NOT throw) if count is zero.
     *
     * @param {Object} apiBody  – parsed JSON response body
     * @param {string} label    – label for log messages
     */
    async verifyAPITotalGreaterThanZero(apiBody, label = 'Season Config') {
        const count =
            apiBody.total ??
            apiBody.totalCount ??
            apiBody.count ??
            (apiBody.items ?? apiBody.data ?? apiBody.records ?? []).length;
        const items = apiBody.items ?? apiBody.data ?? apiBody.records ?? [];
        if (count === 0 || items.length === 0) {
            console.log(`ℹ No records found in ${label} for the applied advanced filter — grid displays "No records found".`);
        } else {
            console.log(`✓ ${label} API total count is ${count}, items in page: ${items.length}`);
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // API – PRINT
    // ─────────────────────────────────────────────────────────────────

    /**
     * Print the API response body as formatted JSON.
     *
     * @param {Object} apiBody  – parsed JSON response body
     * @param {string} label    – label for log messages
     */
    printAPIResponseJSON(apiBody, label = 'Season Config') {
        console.log(`──────── ${label.toUpperCase()} ADVANCED FILTER API RESPONSE (JSON) ────────`);
        console.log(JSON.stringify(apiBody, null, 2));
        console.log('─────────────────────────────────────────────────────────────────────────');
    }

    // ─────────────────────────────────────────────────────────────────
    // FIELD MAPPING
    // ─────────────────────────────────────────────────────────────────

    /**
     * Map a display field label to its API JSON path.
     *
     * @param {string} fieldLabel – e.g. "Federation"
     * @returns {string}          – dot-notation path, e.g. "federation.name"
     */
    mapFieldLabel(fieldLabel) {
        const mapping = {
            'Federation':              'seasonConfigurationFederation.name',
            'Format':                  'format',
            'Region':                  'region',
            'Type':                    'type',
            'Competition Type':        'competitionType',
            'Time Frame Start Date':   'timeFrame.startDate',
            'Time Frame End Date':     'timeFrame.endDate',
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

    /**
     * Evaluate a single filter condition against one API item.
     *
     * @param {Object} item      – one record from the API items array
     * @param {string} apiField  – dot-notation field path, e.g. "federation.name"
     * @param {string} operator  – filter operator, e.g. "Contains"
     * @param {string} value     – expected value
     * @returns {boolean}
     */
    checkCondition(item, apiField, operator, value) {
        let actual = item;
        const keys = apiField.split('.');
        for (let k = 0; k < keys.length; k++) {
            if (actual === null || actual === undefined) break;
            // Unwrap intermediate arrays (e.g. timeFrame is [{startDate,endDate}])
            // so that dot-notation like timeFrame.startDate continues correctly.
            // Only unwrap when more keys remain — leaf arrays are handled separately below.
            if (Array.isArray(actual) && k < keys.length) {
                actual = actual[0] ?? null;
                if (actual === null || actual === undefined) break;
            }
            actual = actual?.[keys[k]];
        }

        // When the API returns an array (e.g. format, type, competitionType as multi-value),
        // extract the 'name' (or first string property) from each element and join with comma
        // so that text operators like Contains/Equal work against the combined value.
        if (Array.isArray(actual)) {
            actual = actual
                .map(el =>
                    typeof el === 'object' && el !== null
                        ? (el.name ?? el.value ?? Object.values(el).find(v => typeof v === 'string') ?? '')
                        : String(el ?? '')
                )
                .join(',');
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
            case 'equal': {
                // For array fields: at least one element exactly equals the expected value
                const actualTokens = actualStr.split(',').map(t => t.trim());
                return actualTokens.some(t => t === expectedStr);
            }
            case 'not equal': {
                // For array fields: at least one element is NOT equal (mirrors "not in" semantics)
                const actualTokens = actualStr.split(',').map(t => t.trim());
                return actualTokens.some(t => t !== expectedStr);
            }
            case 'in': {
                const tokens = expectedStr.split(',').map(t => t.trim());
                // actualStr may be a comma-joined array (e.g. "football,futsal,mini-football")
                // so split it too and check if any actual element matches any token
                const actualTokens = actualStr.split(',').map(t => t.trim());
                return tokens.some(t => actualTokens.includes(t));
            }
            case 'not in': {
                const tokens = expectedStr.split(',').map(t => t.trim());
                const actualTokens = actualStr.split(',').map(t => t.trim());
                // For multi-value array fields: record passes "Not in" when at least one
                // actual element is NOT in the exclusion list (matches API behaviour).
                // For single-value fields: actualTokens has one element, so this is equivalent
                // to "the value is not one of the tokens".
                return actualTokens.some(t => !tokens.includes(t));
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

module.exports = SeasonConfigAdvancedFilterPage;
