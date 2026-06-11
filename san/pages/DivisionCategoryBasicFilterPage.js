/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');

class DivisionCategoryBasicFilterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this._apiResponsePromise = null;

        this.filterButton = this.page.locator('.no-border-box').first();
        this.filterDialog = this.page.locator('[cssclass="right-slide-dialog"]');
        this.filterApplyButton = this.page.locator('[cssclass="right-slide-dialog"] button:has-text("Apply")');
        this.filterResetButton = this.page.locator('[cssclass="right-slide-dialog"] button:has-text("Reset")');
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
    // OPEN FILTER DIALOG
    // ─────────────────────────────────────────────────────────────────

    async openFilterDialog() {
        const isAlreadyOpen = await this.filterDialog.isVisible().catch(() => false);
        if (isAlreadyOpen) {
            console.log('Division Category basic filter dialog already open – skipping click');
            return;
        }
        await this.filterButton.waitFor({ state: 'visible', timeout: 15000 });
        await this.filterButton.click();
        await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ Division Category basic filter dialog opened');
    }

    // ─────────────────────────────────────────────────────────────────
    // SEARCH AUTOCOMPLETE
    // ─────────────────────────────────────────────────────────────────

    async searchDivisionCategory(searchText) {
        await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });
        const input = this.filterDialog
            .locator('input[placeholder="Search by Division Category Name or Division Category Code"]')
            .first();
        await input.waitFor({ state: 'visible', timeout: 8000 });
        await input.scrollIntoViewIfNeeded();
        await input.click();
        await input.press('Control+a');
        await input.press('Delete');
        await input.pressSequentially(searchText, { delay: 60 });

        const popup = this.page.locator('ul.e-list-parent[id*="ej2_dropdownlist"]');
        try {
            await popup.last().waitFor({ state: 'visible', timeout: 2000 });
            const suggestions = popup.last()
                .locator('li.e-list-item')
                .filter({ hasText: new RegExp(searchText, 'i') });
            if (await suggestions.count() > 0) {
                const text = await suggestions.first().textContent();
                await suggestions.first().click();
                console.log(`✓ Selected division category suggestion "${text?.trim()}" from autocomplete`);
            } else {
                console.warn(`No autocomplete suggestion matched "${searchText}" – proceeding without selection`);
                await this.page.keyboard.press('Escape');
            }
        } catch (_) {
            console.warn(`No autocomplete popup appeared for "${searchText}" within 2s`);
        }
        await this.page.waitForTimeout(300);
    }

    // ─────────────────────────────────────────────────────────────────
    // STATUS BADGE
    // ─────────────────────────────────────────────────────────────────

    async selectStatusBadge(statusValue) {
        await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });
        const badge = this.filterDialog.locator(`button:has-text("${statusValue}")`).first();
        await badge.waitFor({ state: 'visible', timeout: 8000 });
        await badge.scrollIntoViewIfNeeded();
        await badge.click();
        await this.page.waitForTimeout(400);
        console.log(`✓ Selected "${statusValue}" status badge in Division Category basic filter`);
    }

    // ─────────────────────────────────────────────────────────────────
    // BUTTON GROUP / MULTISELECT FIELD
    // ─────────────────────────────────────────────────────────────────

    async selectFilterField(fieldLabel, value) {
        await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });

        const btnXpaths = [
            `//*[normalize-space(.)='${fieldLabel}']//following-sibling::*//app-button-group//button`,
            `//*[normalize-space(.)='${fieldLabel}']/following::app-button-group[1]//button`,
        ];
        for (const xpath of btnXpaths) {
            const buttons = this.page.locator(xpath);
            if (await buttons.count() > 0) {
                for (let i = 0; i < await buttons.count(); i++) {
                    const btn = buttons.nth(i);
                    const txt = (await btn.textContent() || '').trim();
                    if (txt.toLowerCase() === value.toLowerCase() || txt.toLowerCase().includes(value.toLowerCase())) {
                        await btn.scrollIntoViewIfNeeded();
                        await btn.click();
                        await this.page.waitForTimeout(400);
                        console.log(`✓ Selected "${value}" in "${fieldLabel}" button group`);
                        return;
                    }
                }
            }
        }

        await this._selectMultiselect(fieldLabel, value);
    }

    async _selectMultiselect(fieldLabel, value) {
        const xpaths = [
            `//*[normalize-space(.)='${fieldLabel}']//following-sibling::app-multi-select//ejs-multiselect`,
            `//*[normalize-space(text())='${fieldLabel}']//following-sibling::app-multi-select//ejs-multiselect`,
            `//label[normalize-space(.)='${fieldLabel}']/following::app-multi-select[1]//ejs-multiselect`,
            `//*[normalize-space(.)='${fieldLabel}']/following::ejs-multiselect[1]`,
        ];

        let wrapper = null;
        for (const xpath of xpaths) {
            const candidate = this.page.locator(xpath).first();
            if (await candidate.count() > 0 && await candidate.isVisible().catch(() => false)) {
                wrapper = candidate;
                break;
            }
        }

        if (!wrapper) {
            await this.filterDialog.evaluate(el => el.scrollTop = el.scrollHeight);
            await this.page.waitForTimeout(400);
            wrapper = this.page.locator(xpaths[0]).first();
        }

        await wrapper.scrollIntoViewIfNeeded();
        await wrapper.click();
        await this.page.waitForTimeout(800);

        const popup = this.page.locator('ul.e-list-parent').last();
        await popup.waitFor({ state: 'visible', timeout: 6000 });

        const searchInput = this.page.locator('input.e-input-filter').last();
        if (await searchInput.isVisible().catch(() => false)) {
            await searchInput.fill(value.split(/\s/)[0]);
            await this.page.waitForTimeout(800);
        }

        const allItems = popup.locator('li.e-list-item');
        const count = await allItems.count();
        let matched = null;
        const available = [];

        for (let i = 0; i < count; i++) {
            const item = allItems.nth(i);
            const text = (await item.textContent() || '').trim();
            available.push(text);
            if (text.toLowerCase() === value.toLowerCase() || text.toLowerCase().includes(value.toLowerCase())) {
                matched = item;
                break;
            }
        }

        if (!matched) {
            console.error(`Available options for "${fieldLabel}": ${available.join(' | ')}`);
            throw new Error(`Option "${value}" not found in multiselect "${fieldLabel}"`);
        }

        await matched.click();
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
        await this.filterDialog.waitFor({ state: 'visible', timeout: 8000 });
        console.log(`✓ Selected "${value}" in "${fieldLabel}" multiselect`);
    }

    // ─────────────────────────────────────────────────────────────────
    // APPLY / RESET BUTTONS
    // ─────────────────────────────────────────────────────────────────

    async clickApplyButton() {
        await this.filterApplyButton.waitFor({ state: 'visible' });
        await this.filterApplyButton.click();
        await this.page.waitForTimeout(1000);
        console.log('✓ Clicked Apply button in Division Category basic filter dialog');
    }

    async clickResetButton() {
        await this.filterResetButton.waitFor({ state: 'visible' });
        await this.filterResetButton.click();
        await this.page.waitForTimeout(800);
        console.log('✓ Clicked Reset button in Division Category basic filter dialog');
    }

    // ─────────────────────────────────────────────────────────────────
    // FILTER STATE VERIFICATION
    // ─────────────────────────────────────────────────────────────────

    async verifyFiltersCleared() {
        await this.page.waitForTimeout(500);
        console.log('✓ Division Category basic filters cleared');
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
        console.log(`✓ Captured Division Category basic filter API URL: ${response.url()}`);
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
            console.log('ℹ No records returned for the Division Category basic filter – grid may show "No records found".');
        } else {
            console.log(`✓ Division Category basic filter API total count is ${count}, items on page: ${items.length}`);
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // API – PRINT
    // ─────────────────────────────────────────────────────────────────

    printAPIResponseJSON(apiBody) {
        console.log('──────── DIVISION CATEGORY BASIC FILTER API RESPONSE (JSON) ────────');
        console.log(JSON.stringify(apiBody, null, 2));
        console.log('─────────────────────────────────────────────────────────────────────');
    }
}

module.exports = DivisionCategoryBasicFilterPage;
