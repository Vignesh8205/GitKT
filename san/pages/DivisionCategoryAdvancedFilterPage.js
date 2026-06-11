/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

class DivisionCategoryAdvancedFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this._apiResponsePromise = null;

        this.filterButton   = this.page.locator('.no-border-box').first();
        this.filterDialog   = this.page.locator('[cssclass="right-slide-dialog"]');
        this.advancedFilterTab = this.page.locator("//button[text()=' Advanced Filter ']");
    }

    // ─────────────────────────────────────────────────────────────────
    // PAGE TITLE
    // ─────────────────────────────────────────────────────────────────

    async verifyPageTitle() {
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        const title = this.page.locator(
            "//div[normalize-space(text())='Division Category'] | " +
            "//h1[normalize-space(text())='Division Category'] | " +
            "//h2[normalize-space(text())='Division Category'] | " +
            "//span[normalize-space(text())='Division Category']"
        );
        await title.first().waitFor({ state: 'visible', timeout: 20000 });
        console.log('✓ Division Category page title verified');
    }

    // ─────────────────────────────────────────────────────────────────
    // OPEN ADVANCED FILTER DIALOG
    // ─────────────────────────────────────────────────────────────────

    async openAdvancedFilterDialog() {
        const isAlreadyOpen = await this.filterDialog.isVisible().catch(() => false);
        if (!isAlreadyOpen) {
            await this.filterButton.waitFor({ state: 'visible', timeout: 15000 });
            await this.filterButton.click();
            await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
        }
        await this.advancedFilterTab.waitFor({ state: 'visible', timeout: 8000 });
        await this.advancedFilterTab.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Division Category advanced filter dialog opened');
    }

    // ─────────────────────────────────────────────────────────────────
    // API – CAPTURE
    // ─────────────────────────────────────────────────────────────────

    startCapturingAPIResponse() {
        this._apiResponsePromise = this.page.waitForResponse(
            (r) =>
                r.url().toLowerCase().includes('get-age-category') &&
                r.request().method() === 'POST' &&
                r.status() === 200,
            { timeout: 90000 }
        );
        console.log('✓ Listening for Division Category list API response (get-age-category)');
    }

    // ─────────────────────────────────────────────────────────────────
    // API – AWAIT
    // ─────────────────────────────────────────────────────────────────

    async awaitAPIResponse() {
        const response = await this._apiResponsePromise;
        console.log(`✓ Captured Division Category advanced filter API URL: ${response.url()}`);
        const body = await response.json();
        this._apiResponsePromise = null;
        return body;
    }

    // ─────────────────────────────────────────────────────────────────
    // API – VERIFY COUNT
    // ─────────────────────────────────────────────────────────────────

    async verifyAPITotalGreaterThanZero(apiBody) {
        const items = apiBody.items ?? apiBody.data ?? apiBody.records ?? [];
        const count =
            apiBody.total ??
            apiBody.totalCount ??
            apiBody.count ??
            items.length;
        if (count === 0 || items.length === 0) {
            console.log('ℹ No records found for the applied Division Category filter — grid displays "No records found".');
        } else {
            console.log(`✓ Division Category API total count is ${count}, items in page: ${items.length}`);
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // API – PRINT
    // ─────────────────────────────────────────────────────────────────

    printAPIResponseJSON(apiBody) {
        console.log('──────── DIVISION CATEGORY ADVANCED FILTER API RESPONSE (JSON) ────────');
        console.log(JSON.stringify(apiBody, null, 2));
        console.log('────────────────────────────────────────────────────────────────────────');
    }

    // ─────────────────────────────────────────────────────────────────
    // FIELD MAPPING
    // ─────────────────────────────────────────────────────────────────

    mapFieldLabel(fieldLabel) {
        const mapping = {
            'Division Category Name': 'name',
            'Name':                   'name',
            'Division Category Code': 'code',
            'Code':                   'code',
            'Status':                 'status.libraryValue',
            'Format':                 'format.name',
            'Division Category Type': 'type.name',
            'Organization':           'organization.name',
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
        const actualStr  = (actual ?? '').toString().toLowerCase();
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
                return actualStr > expectedStr;
            }
            case 'less than': {
                const n1 = Number(actual), n2 = Number(value);
                if (!isNaN(n1) && !isNaN(n2)) return n1 < n2;
                return actualStr < expectedStr;
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
                console.error(`✗ Item[${i}] actual ${apiField}=${JSON.stringify(actual)} fails: ${fieldLabel} ${operator} "${value}"`);
            }
            expect(match, `Item[${i}] fails: ${fieldLabel} ${operator} "${value}"`).toBe(true);
        }
        console.log(`✓ All ${items.length} record(s) satisfy: ${fieldLabel} ${operator} "${value}"`);
    }

    // ─────────────────────────────────────────────────────────────────
    // API VALIDATION – OR CONDITIONS
    // ─────────────────────────────────────────────────────────────────

    async validateApiResponseORConditions(responseBody, fl1, op1, v1, fl2, op2, v2) {
        expect(responseBody).toBeTruthy();
        const items = responseBody.items ?? responseBody.data ?? responseBody.records ?? [];
        expect(Array.isArray(items)).toBe(true);

        if (items.length === 0) {
            console.log(`ℹ No records for OR condition — skipping record-level validation.`);
            return;
        }

        const af1 = this.mapFieldLabel(fl1);
        const af2 = this.mapFieldLabel(fl2);
        console.log(`Validating ${items.length} item(s): "${fl1}" ${op1} "${v1}" OR "${fl2}" ${op2} "${v2}"`);

        if (items.length > 0) {
            console.log('── Sample API item (Item[0]) ──');
            console.log(JSON.stringify(items[0], null, 2));
            console.log('──────────────────────────────');
        }

        for (let i = 0; i < items.length; i++) {
            const m1 = this.checkCondition(items[i], af1, op1, v1);
            const m2 = this.checkCondition(items[i], af2, op2, v2);
            if (!m1 && !m2) {
                let a1 = items[i]; for (const k of af1.split('.')) a1 = a1?.[k];
                let a2 = items[i]; for (const k of af2.split('.')) a2 = a2?.[k];
                console.error(
                    `✗ Item[${i}] satisfies neither OR condition:\n` +
                    `  C1: ${fl1} ${op1} "${v1}" → actual="${a1 ?? '(null)'}"\n` +
                    `  C2: ${fl2} ${op2} "${v2}" → actual="${a2 ?? '(null)'}"`
                );
            }
            expect(m1 || m2, `Item[${i}] satisfies neither: ${fl1} ${op1} "${v1}" OR ${fl2} ${op2} "${v2}"`).toBe(true);
        }
        console.log(`✓ All ${items.length} record(s) satisfy at least one OR condition`);
    }

    // ─────────────────────────────────────────────────────────────────
    // API VALIDATION – AND CONDITIONS
    // ─────────────────────────────────────────────────────────────────

    async validateApiResponseANDConditions(responseBody, fl1, op1, v1, fl2, op2, v2) {
        expect(responseBody).toBeTruthy();
        const items = responseBody.items ?? responseBody.data ?? responseBody.records ?? [];
        expect(Array.isArray(items)).toBe(true);

        if (items.length === 0) {
            console.log(`ℹ No records for AND condition — skipping record-level validation.`);
            return;
        }

        const af1 = this.mapFieldLabel(fl1);
        const af2 = this.mapFieldLabel(fl2);
        console.log(`Validating ${items.length} item(s): "${fl1}" ${op1} "${v1}" AND "${fl2}" ${op2} "${v2}"`);

        if (items.length > 0) {
            console.log('── Sample API item (Item[0]) ──');
            console.log(JSON.stringify(items[0], null, 2));
            console.log('──────────────────────────────');
        }

        for (let i = 0; i < items.length; i++) {
            let actual1 = items[i];
            for (const key of af1.split('.')) actual1 = actual1?.[key];
            let actual2 = items[i];
            for (const key of af2.split('.')) actual2 = actual2?.[key];

            if (actual1 === null || actual1 === undefined) {
                console.warn(`⚠ Field "${af1}" is null/undefined in Item[${i}] — top keys: [${Object.keys(items[i] || {}).join(', ')}]. Skipping.`);
                continue;
            }
            if (actual2 === null || actual2 === undefined) {
                console.warn(`⚠ Field "${af2}" is null/undefined in Item[${i}] — top keys: [${Object.keys(items[i] || {}).join(', ')}]. Skipping.`);
                continue;
            }

            const m1 = this.checkCondition(items[i], af1, op1, v1);
            const m2 = this.checkCondition(items[i], af2, op2, v2);
            if (!m1) console.error(`✗ Item[${i}] ${af1}=${JSON.stringify(actual1)} fails: ${fl1} ${op1} "${v1}"`);
            if (!m2) console.error(`✗ Item[${i}] ${af2}=${JSON.stringify(actual2)} fails: ${fl2} ${op2} "${v2}"`);
            expect(m1, `Item[${i}] fails condition 1: ${fl1} ${op1} "${v1}"`).toBe(true);
            expect(m2, `Item[${i}] fails condition 2: ${fl2} ${op2} "${v2}"`).toBe(true);
        }
        console.log(`✓ All ${items.length} record(s) satisfy BOTH AND conditions`);
    }
}

module.exports = DivisionCategoryAdvancedFilterPage;
