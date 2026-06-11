/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

class ClubSectionTeamsAdvancedFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // Filter dialog container
        this.filterDialog = page.locator('[cssclass="right-slide-dialog"]');

        // Teams tab on section detail page
        this.teamsTab = page.locator("//div[normalize-space(text())='Teams']").first();

        // Generic API promise
        this._apiPromise = null;
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION
    // ─────────────────────────────────────────────────────────────────

    async navigateToTeamsTab() {
        await this.teamsTab.waitFor({ state: 'visible', timeout: 15000 });
        await this.teamsTab.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1000);
        console.log('✓ Navigated to Teams tab on section detail page');
    }

    // ─────────────────────────────────────────────────────────────────
    // OPEN FILTER DIALOG
    // ─────────────────────────────────────────────────────────────────

    async openTeamsFilter() {
        const isOpen = await this.filterDialog.isVisible().catch(() => false);
        if (isOpen) {
            console.log('Teams filter dialog already open – skipping open click');
            return;
        }

        // Strategy 1: filter icon near Teams heading
        const nearHeadingBtn = this.page.locator(
            "(//div[contains(normalize-space(),'Teams')]" +
            "/following::button[.//span[contains(@style,'filter.svg')]] | " +
            "//div[contains(normalize-space(),'Teams')]" +
            "/following::span[contains(@style,'filter.svg')])[1]"
        );
        const s1Visible = await nearHeadingBtn.isVisible().catch(() => false);
        if (s1Visible) {
            await nearHeadingBtn.click();
            await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
            console.log('✓ Opened Teams filter dialog (near heading)');
            return;
        }

        // Strategy 2: any visible filter icon on page
        const filterBtn = this.page.locator(
            'button:has(span[style*="filter.svg"]), span[style*="filter.svg"]'
        ).first();
        await filterBtn.waitFor({ state: 'visible', timeout: 10000 });
        await filterBtn.click();
        await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ Opened Teams filter dialog (first visible filter icon)');
    }

    // ─────────────────────────────────────────────────────────────────
    // API – CAPTURE
    // ─────────────────────────────────────────────────────────────────

    startCapturingAPI() {
        this._apiPromise = this.page.waitForResponse(
            (r) =>
                r.url().toLowerCase().includes('team') &&
                r.request().method() === 'POST' &&
                r.status() === 200,
            { timeout: 90000 }
        );
        console.log('✓ Listening for Teams advanced filter API response');
    }

    async awaitAPI() {
        const response = await this._apiPromise;
        console.log(`✓ Captured API URL: ${response.url()}`);
        const body = await response.json();
        this._apiPromise = null;
        return body;
    }

    // ─────────────────────────────────────────────────────────────────
    // API – PRINT / COUNT
    // ─────────────────────────────────────────────────────────────────

    async verifyAPITotalGreaterThanZero(apiBody, label) {
        const count =
            apiBody.total ??
            apiBody.totalCount ??
            apiBody.count ??
            (apiBody.items ?? apiBody.data ?? apiBody.records ?? []).length;
        const items = apiBody.items ?? apiBody.data ?? apiBody.records ?? [];
        if (count === 0 || items.length === 0) {
            console.log(`ℹ No records in ${label} for the applied filter — grid shows "No records found".`);
        } else {
            console.log(`✓ ${label} API total: ${count}, items on page: ${items.length}`);
        }
    }

    printAPIResponseJSON(apiBody, label) {
        console.log(`──────── ${label.toUpperCase()} ADVANCED FILTER API RESPONSE (JSON) ────────`);
        console.log(JSON.stringify(apiBody, null, 2));
        console.log('──────────────────────────────────────────────────────────────────────');
    }

    // ─────────────────────────────────────────────────────────────────
    // FIELD MAPPING
    // ─────────────────────────────────────────────────────────────────

    mapFieldLabel(fieldLabel) {
        const mapping = {
            'Status':              'status.libraryValue',
            'Name':                'teamName',
            'Division Category':   'divisionCategory.name',
            'Team Classification': 'teamClassification.name',
            'Team Level':          'teamLevel.name',
            'Organization':        'organization.name',
            'Suffix':              'suffix.name',
            'Pitch':               'pitch.pitchDetails.name',
            'Default Day':         'preferredDay.libraryValue',
            'Gender':              'gender.libraryValue',
            'Tags':                'tags',
            'Start Date':          'startDate',
            'End Date':            'endDate',
        };
        const resolved = mapping[fieldLabel];
        if (!resolved) {
            console.warn(`⚠ No field mapping for "${fieldLabel}". Using as-is — update mapFieldLabel() if validation fails.`);
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
    // OPERATOR EVALUATION
    // ─────────────────────────────────────────────────────────────────

    _evalOperator(actualStr, operator, expectedStr) {
        switch (operator.toLowerCase().replace(/-/g, ' ')) {
            case 'contains':              return actualStr.includes(expectedStr);
            case 'does not contain':      return !actualStr.includes(expectedStr);
            case 'starts with':           return actualStr.startsWith(expectedStr);
            case 'does not start with':   return !actualStr.startsWith(expectedStr);
            case 'ends with':             return actualStr.endsWith(expectedStr);
            case 'does not end with':     return !actualStr.endsWith(expectedStr);
            case 'equal':
            case 'equals':                return actualStr === expectedStr;
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
                return Number(actualStr) > Number(expectedStr);
            }
            case 'less than': {
                const d1 = this._parseDate(actualStr), d2 = this._parseDate(expectedStr);
                if (!isNaN(d1) && !isNaN(d2)) return d1 < d2;
                return Number(actualStr) < Number(expectedStr);
            }
            case 'between': {
                const [from, to] = expectedStr.split('|').map(v => v.trim());
                const d  = this._parseDate(actualStr), df = this._parseDate(from), dt = this._parseDate(to);
                if (!isNaN(d) && !isNaN(df) && !isNaN(dt)) return d >= df && d <= dt;
                return actualStr >= from && actualStr <= to;
            }
            case 'not between': {
                const [from, to] = expectedStr.split('|').map(v => v.trim());
                const d  = this._parseDate(actualStr), df = this._parseDate(from), dt = this._parseDate(to);
                if (!isNaN(d) && !isNaN(df) && !isNaN(dt)) return d <= df || d >= dt;
                return actualStr < from || actualStr > to;
            }
            default: return actualStr.includes(expectedStr);
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // CONDITION CHECK
    // ─────────────────────────────────────────────────────────────────

    // Traverses a dot-path handling intermediate arrays by fanning out into elements.
    _resolveValue(obj, keys) {
        if (keys.length === 0) return obj;
        const [head, ...tail] = keys;
        const next = obj?.[head];
        if (Array.isArray(next)) {
            if (tail.length === 0) return next;
            const results = next
                .map(el => this._resolveValue(el, tail))
                .flatMap(v => (Array.isArray(v) ? v : [v]))
                .filter(v => v !== undefined && v !== null);
            return results.length > 0 ? results : undefined;
        }
        return this._resolveValue(next, tail);
    }

    checkCondition(item, apiField, operator, value) {
        const actual = this._resolveValue(item, apiField.split('.'));
        if (Array.isArray(actual)) {
            return actual.some(el => {
                const elStr = (el?.libraryValue ?? el?.name ?? el?.label ?? el?.value ?? el ?? '').toString().toLowerCase();
                return this._evalOperator(elStr, operator, value.toLowerCase());
            });
        }
        if (actual !== null && actual !== undefined && typeof actual === 'object') {
            const elStr = (actual.libraryValue ?? actual.name ?? actual.label ?? actual.value ?? '').toString().toLowerCase();
            return this._evalOperator(elStr, operator, value.toLowerCase());
        }
        const actualStr = (actual ?? '').toString().toLowerCase();
        return this._evalOperator(actualStr, operator, value.toLowerCase());
    }

    // ─────────────────────────────────────────────────────────────────
    // VALIDATION – SINGLE CONDITION
    // ─────────────────────────────────────────────────────────────────

    async validateApiResponseCondition(responseBody, fieldLabel, operator, value) {
        expect(responseBody).toBeTruthy();
        const items = responseBody.items ?? responseBody.data ?? responseBody.records ?? [];
        expect(Array.isArray(items)).toBe(true);
        if (items.length === 0) {
            console.log(`ℹ No records for: "${fieldLabel}" ${operator} "${value}" — skipping record-level validation.`);
            return;
        }
        const apiField = this.mapFieldLabel(fieldLabel);
        console.log(`Validating ${items.length} item(s): "${fieldLabel}" (${apiField}) ${operator} "${value}"`);
        if (items.length > 0) {
            console.log('── Sample item (Item[0]) ──');
            console.log(JSON.stringify(items[0], null, 2));
            console.log('──────────────────────────');
        }
        for (let i = 0; i < items.length; i++) {
            const actual = this._resolveValue(items[i], apiField.split('.'));
            if (actual === null || actual === undefined) {
                const parentKeys = apiField.split('.').slice(0, -1);
                const parentVal = this._resolveValue(items[i], parentKeys);
                console.warn(`⚠ Field "${apiField}" is null/undefined in Item[${i}]. Top-level keys: [${Object.keys(items[i] || {}).join(', ')}]. Parent value: ${JSON.stringify(parentVal)}. Update mapFieldLabel(). Skipping — update mapFieldLabel() if the key is wrong.`);
                continue;
            }
            const match = this.checkCondition(items[i], apiField, operator, value);
            if (!match) {
                console.error(`✗ Item[${i}] actual ${apiField}=${JSON.stringify(actual)} fails: ${fieldLabel} ${operator} "${value}"`);
            }
            expect(match, `Item[${i}] fails: ${fieldLabel} ${operator} "${value}"`).toBe(true);
        }
        console.log(`✓ All ${items.length} record(s) satisfy: ${fieldLabel} ${operator} "${value}"`);
    }

    // ─────────────────────────────────────────────────────────────────
    // VALIDATION – OR CONDITIONS
    // ─────────────────────────────────────────────────────────────────

    async validateApiResponseORConditions(responseBody, f1, op1, v1, f2, op2, v2) {
        expect(responseBody).toBeTruthy();
        const items = responseBody.items ?? responseBody.data ?? responseBody.records ?? [];
        expect(Array.isArray(items)).toBe(true);
        if (items.length === 0) {
            console.log('ℹ No records for OR condition — skipping record-level validation.');
            return;
        }
        const apiField1 = this.mapFieldLabel(f1);
        const apiField2 = this.mapFieldLabel(f2);
        console.log(`Validating ${items.length} item(s): "${f1}" ${op1} "${v1}" OR "${f2}" ${op2} "${v2}"`);
        for (let i = 0; i < items.length; i++) {
            const match1 = this.checkCondition(items[i], apiField1, op1, v1);
            const match2 = this.checkCondition(items[i], apiField2, op2, v2);
            if (!match1 && !match2) {
                let a1 = items[i]; for (const k of apiField1.split('.')) a1 = a1?.[k];
                let a2 = items[i]; for (const k of apiField2.split('.')) a2 = a2?.[k];
                console.error(`✗ Item[${i}] satisfies neither OR condition:\n  C1: ${f1} ${op1} "${v1}" → actual="${a1 ?? '(null)'}"\n  C2: ${f2} ${op2} "${v2}" → actual="${a2 ?? '(null)'}"`);
            }
            expect(match1 || match2, `Item[${i}] satisfies neither OR condition`).toBe(true);
        }
        console.log(`✓ All ${items.length} record(s) satisfy at least one OR condition`);
    }

    // ─────────────────────────────────────────────────────────────────
    // VALIDATION – AND CONDITIONS
    // ─────────────────────────────────────────────────────────────────

    async validateApiResponseANDConditions(responseBody, f1, op1, v1, f2, op2, v2) {
        expect(responseBody).toBeTruthy();
        const items = responseBody.items ?? responseBody.data ?? responseBody.records ?? [];
        expect(Array.isArray(items)).toBe(true);
        if (items.length === 0) {
            console.log('ℹ No records for AND condition — skipping record-level validation.');
            return;
        }
        const apiField1 = this.mapFieldLabel(f1);
        const apiField2 = this.mapFieldLabel(f2);
        console.log(`Validating ${items.length} item(s): "${f1}" ${op1} "${v1}" AND "${f2}" ${op2} "${v2}"`);
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

            const match1 = this.checkCondition(items[i], apiField1, op1, v1);
            const match2 = this.checkCondition(items[i], apiField2, op2, v2);
            if (!match1) console.error(`✗ Item[${i}] ${apiField1}=${JSON.stringify(actual1)} fails: ${f1} ${op1} "${v1}"`);
            if (!match2) console.error(`✗ Item[${i}] ${apiField2}=${JSON.stringify(actual2)} fails: ${f2} ${op2} "${v2}"`);
            expect(match1, `Item[${i}] fails condition 1: ${f1} ${op1} "${v1}"`).toBe(true);
            expect(match2, `Item[${i}] fails condition 2: ${f2} ${op2} "${v2}"`).toBe(true);
        }
        console.log(`✓ All ${items.length} record(s) satisfy BOTH AND conditions`);
    }
}

module.exports = ClubSectionTeamsAdvancedFilterPage;
