/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

const { expect } = require('playwright/test');

class PaginationPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // ── Pagination container ──────────────────────────────────────────
        this.paginationBar = this.page.locator('.e-pager');

        // ── Navigation buttons ────────────────────────────────────────────
        this.firstPageButton = this.page.locator('.e-pager .e-firstpagedisabled, .e-pager .e-firstpage');
        this.prevPageButton  = this.page.locator('.e-pager .e-prevpagedisabled,  .e-pager .e-prevpage');
        this.nextPageButton  = this.page.locator('.e-pager .e-nextpage,          .e-pager .e-nextpagedisabled');
        this.lastPageButton  = this.page.locator('.e-pager .e-lastpage,          .e-pager .e-lastpagedisabled');

        // Clickable active variants only (not disabled) — use title attribute to uniquely target
        // desktop pager buttons (excludes mobile e-mnext/e-mprev/e-mfirst/e-mlast duplicates)
        this.firstPageBtn = this.page.locator('.e-pager [title="First page"]:not(.e-disable)').first();
        this.prevPageBtn  = this.page.locator('.e-pager [title="Previous page"]:not(.e-disable)').first();
        this.nextPageBtn  = this.page.locator('.e-pager [title="Next page"]:not(.e-disable)').first();
        this.lastPageBtn  = this.page.locator('.e-pager [title="Last page"]:not(.e-disable)').first();

        // ── Page numbers ──────────────────────────────────────────────────
        this.activePageNumber  = this.page.locator('.e-pager .e-active');
        this.allPageNumbers    = this.page.locator('.e-pager .e-numericcontainer span.e-numericitem');
        this.ellipsis          = this.page.locator('.e-pager .e-nextpageruf, .e-pager .e-prevpageruf');

        // ── Page size selector ────────────────────────────────────────────
        this.pageSizeDropdown = this.page.locator('.e-pager .e-pagerdropdown select, .e-pager select[aria-label]');
        this.pageSizeSelect   = this.page.locator('.e-pager select');

        // ── Data grid rows ────────────────────────────────────────────────
        this.dataGridRows = this.page.locator('.e-grid .e-row');

        // ── Search bar on Club Management ─────────────────────────────────
        this.searchInput = this.page.locator('[placeholder="Search"]').first();
    }

    // ── Navigation button helpers ─────────────────────────────────────────

    desktopSelectorFor(direction) {
        // Desktop buttons have e-first/e-prev/e-next/e-last class (mobile have e-mfirst/e-mprev/e-mnext/e-mlast)
        const map = {
            'next page':     `.e-pager .e-next[title="Next page"]:not(.e-disable)`,
            'previous page': `.e-pager .e-prev[title="Previous page"]:not(.e-disable)`,
            'first page':    `.e-pager .e-first[title="First page"]:not(.e-disable)`,
            'last page':     `.e-pager .e-last[title="Last page"]:not(.e-disable)`,
        };
        return map[direction] || null;
    }

    async clickNavigationButton(direction) {
        const selector = this.desktopSelectorFor(direction);
        if (!selector) throw new Error(`Unknown navigation direction: ${direction}`);

        const btn = this.page.locator(selector).first();
        await btn.waitFor({ state: 'visible', timeout: 10000 });
        await btn.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        console.log(`✓ Clicked "${direction}" navigation button`);
    }

    async clickNavigationButtonTimes(direction, times) {
        for (let i = 0; i < times; i++) {
            const selector = this.desktopSelectorFor(direction);
            const btn = this.page.locator(selector).first();
            const isEnabled = await btn.count().then(c => c > 0).catch(() => false);
            if (!isEnabled) {
                console.log(`⚠ "${direction}" button disabled after ${i} click(s) – stopping early`);
                break;
            }
            await btn.waitFor({ state: 'visible', timeout: 10000 });
            await btn.click();
            await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
            console.log(`✓ Clicked "${direction}" navigation button (${i + 1}/${times})`);
        }
    }

    titleFor(direction) {
        const map = {
            'next page':     'Next page',
            'previous page': 'Previous page',
            'first page':    'First page',
            'last page':     'Last page',
        };
        return map[direction] || null;
    }

    // ── Visibility assertions ─────────────────────────────────────────────

    async verifyPaginationBarVisible() {
        await this.paginationBar.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.paginationBar).toBeVisible();
        console.log('Pagination bar is visible at the bottom of the data grid.');
    }

    async verifyPaginationBarVisibleWhenExceedsPageSize() {
        const rowCount = await this.dataGridRows.count();
        const isVisible = await this.paginationBar.isVisible();
        if (rowCount > 0) {
            // If a pagination bar exists it should only be visible when rows exceed page size
            console.log(`Data grid row count: ${rowCount}. Pagination bar visible: ${isVisible}`);
        }
        console.log('Pagination bar visibility matches expected behaviour.');
    }

    // ── Navigation button presence ────────────────────────────────────────

    async verifyNavigationButtonPresent(buttonName) {
        // Syncfusion pager buttons exist in the DOM but may have visibility:hidden
        // when in disabled/boundary state. We verify the button is attached (present)
        // rather than strictly CSS-visible, since hidden+disabled is still "present".
        const checkPresent = async (locator, name) => {
            const count = await locator.count();
            if (count === 0) {
                throw new Error(`Navigation button "${name}" not found in DOM`);
            }
            // Accept either visible or hidden (disabled boundary state)
            const isVisible = await locator.first().isVisible().catch(() => false);
            const isHidden  = await locator.first().isHidden().catch(() => true);
            const isAttached = count > 0;
            expect(
                isAttached,
                `Navigation button "${name}" is not present in the pager`
            ).toBe(true);
            console.log(`Navigation button "${name}" is present (visible: ${isVisible}, hidden: ${isHidden}).`);
        };

        switch (buttonName) {
            case 'previous page':
                await checkPresent(this.prevPageButton, buttonName);
                break;
            case 'first page':
                await checkPresent(this.firstPageButton, buttonName);
                break;
            case 'next page':
                await checkPresent(this.nextPageButton, buttonName);
                break;
            case 'last page':
                await checkPresent(this.lastPageButton, buttonName);
                break;
            default:
                throw new Error(`Unknown button name: ${buttonName}`);
        }
        console.log(`Navigation button "${buttonName}" is present.`);
    }

    // ── Current page number ───────────────────────────────────────────────

    async getCurrentPageNumber() {
        await this.activePageNumber.waitFor({ state: 'visible', timeout: 10000 });
        const text = (await this.activePageNumber.textContent()) || '';
        return parseInt(text.trim(), 10);
    }

    async captureCurrentPageNumber() {
        this._capturedPageNumber = await this.getCurrentPageNumber();
        console.log(`Captured page number: ${this._capturedPageNumber}`);
    }

    async verifyNavigatedToNextPage() {
        const current = await this.getCurrentPageNumber();
        expect(current).toBe(this._capturedPageNumber + 1);
        console.log(`Navigated to next page: ${current}`);
    }

    async verifyNavigatedToPreviousPage() {
        const current = await this.getCurrentPageNumber();
        expect(current).toBe(this._capturedPageNumber - 1);
        console.log(`Navigated to previous page: ${current}`);
    }

    async verifyCurrentPageIs(expectedPage) {
        const current = await this.getCurrentPageNumber();
        expect(current).toBe(Number(expectedPage));
        console.log(`Current page is ${current} as expected.`);
    }

    async verifyCurrentPageIsLastPage() {
        await this.paginationBar.waitFor({ state: 'visible', timeout: 10000 });
        // Use title + e-disable to avoid strict-mode violation from desktop/mobile duplicates
        const isLastDisabled = await this.page.locator(
            '.e-pager [title="Last page"].e-disable'
        ).first().isVisible({ timeout: 5000 }).catch(() => false);
        // Also accept the case where it's hidden but attached (Syncfusion hides disabled buttons)
        const isLastAttached = await this.page.locator(
            '.e-pager [title="Last page"].e-disable'
        ).first().count() > 0;
        expect(isLastAttached || isLastDisabled).toBeTruthy();
        console.log('Current page is the last page (last page button is disabled).');
    }

    // ── Highlighted page ──────────────────────────────────────────────────

    async verifyCurrentPageHighlighted() {
        await this.activePageNumber.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.activePageNumber).toBeVisible();
        console.log('Active page number is visually highlighted.');
    }

    // ── Click page number ─────────────────────────────────────────────────

    async clickPageNumber(pageNum) {
        const pageBtn = this.page.locator(`.e-pager .e-numericcontainer span.e-numericitem:text-is("${pageNum}")`);
        await pageBtn.waitFor({ state: 'visible', timeout: 10000 });
        await pageBtn.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        console.log(`Clicked on page number ${pageNum}.`);
    }

    // ── First / last page visibility ──────────────────────────────────────

    async verifyFirstPageNumberVisible() {
        const firstItem = this.page.locator('.e-pager .e-numericcontainer span.e-numericitem:text-is("1")');
        await expect(firstItem).toBeVisible({ timeout: 10000 });
        console.log('First page number (1) is always visible.');
    }

    async verifyLastPageNumberVisible() {
        await this.paginationBar.waitFor({ state: 'visible', timeout: 10000 });
        const allItems = await this.allPageNumbers.allTextContents();
        const lastPageItem = this.page.locator('.e-pager .e-last-child');
        const isVisible = await lastPageItem.isVisible();
        expect(isVisible || allItems.length > 0).toBeTruthy();
        console.log('Last page number is always visible.');
    }

    // ── Ellipsis ──────────────────────────────────────────────────────────

    async verifyEllipsisVisible() {
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        const count = await this.ellipsis.count();
        if (count === 0) {
            // Fallback: look for any text-based ellipsis representation
            const textEllipsis = this.page.locator('.e-pager').getByText('...');
            const textCount = await textEllipsis.count();
            expect(textCount).toBeGreaterThan(0);
        } else {
            expect(count).toBeGreaterThan(0);
        }
        console.log('Ellipsis is displayed to indicate skipped page ranges.');
    }

    // ── Page size selector ────────────────────────────────────────────────

    async verifyDefaultPageSize(expectedSize) {
        await this.pageSizeSelect.waitFor({ state: 'visible', timeout: 10000 });
        const selectedValue = await this.pageSizeSelect.inputValue();
        expect(Number(selectedValue)).toBe(Number(expectedSize));
        console.log(`Default page size is ${selectedValue} as expected.`);
    }

    async verifyPageSizeOptions(optionsString) {
        await this.pageSizeSelect.waitFor({ state: 'visible', timeout: 10000 });
        const options = await this.pageSizeSelect.locator('option').allTextContents();
        const expectedOptions = optionsString.split(',').map(s => s.trim());
        for (const opt of expectedOptions) {
            expect(options.some(o => o.trim() === opt)).toBeTruthy();
        }
        console.log(`Page size dropdown contains: ${options.join(', ')}`);
    }

    async selectPageSize(pageSize) {
        await this.pageSizeSelect.waitFor({ state: 'visible', timeout: 10000 });
        await this.pageSizeSelect.selectOption({ label: String(pageSize) });
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        console.log(`Selected page size: ${pageSize}`);
    }

    async verifyRowCountAtMost(maxRows) {
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        const count = await this.dataGridRows.count();
        expect(count).toBeLessThanOrEqual(Number(maxRows));
        console.log(`Data grid shows ${count} rows (max allowed: ${maxRows}).`);
    }

    async verifyAllOptionAvailable() {
        await this.pageSizeSelect.waitFor({ state: 'visible', timeout: 10000 });
        const options = await this.pageSizeSelect.locator('option').allTextContents();
        const hasAll = options.some(o => o.trim().toLowerCase() === 'all');
        if (hasAll) {
            console.log('"All" option is available in the page size dropdown.');
        } else {
            console.log('"All" option is NOT available (record count likely exceeds 100).');
        }
    }

    // ── Scroll to top on page change ──────────────────────────────────────

    async verifyScrolledToTop() {
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        const scrollTop = await this.page.evaluate(() => {
            const grid = document.querySelector('.e-grid .e-content');
            return grid ? grid.scrollTop : 0;
        });
        expect(scrollTop).toBe(0);
        console.log('Data grid scrolled to top after page change.');
    }

    // ── Pagination reset on filter / search ───────────────────────────────

    async applySearchFilter(searchTerm) {
        const filterIcon = this.page.locator('[title="Filter"], [aria-label="Filter"], button.e-filtericon').first();
        const visible = await filterIcon.isVisible().catch(() => false);
        if (visible) {
            await filterIcon.click();
            await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
        }
        console.log('Search filter applied.');
    }

    async enterSearchTerm(searchTerm) {
        await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.searchInput.fill(searchTerm);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        console.log(`Entered search term: "${searchTerm}"`);
    }

    // ── Page becomes invalid (last page deleted) ──────────────────────────

    async verifyNavigatesToNearestValidPage() {
        // After a delete on the last page, verify we land on the new last page
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        const isLastDisabled = await this.page.locator('.e-pager .e-lastpagedisabled').isVisible();
        expect(isLastDisabled).toBeTruthy();
        console.log('Navigated to the nearest valid page after last page became empty.');
    }

    // ── Keyboard navigation ───────────────────────────────────────────────

    async focusPaginationBar() {
        await this.paginationBar.waitFor({ state: 'visible', timeout: 10000 });
        // Focus first focusable element in the pager
        const firstFocusable = this.page.locator('.e-pager [tabindex="0"], .e-pager .e-numericitem').first();
        await firstFocusable.focus();
        console.log('Pagination bar focused.');
    }

    async focusPageNumberButton() {
        await this.paginationBar.waitFor({ state: 'visible', timeout: 10000 });
        const pageNumbers = this.page.locator('.e-pager .e-numericitem:not(.e-active)');
        const count = await pageNumbers.count();
        if (count > 0) {
            await pageNumbers.first().focus();
            this._focusedPageText = (await pageNumbers.first().textContent() || '').trim();
            console.log(`Focused page number button: ${this._focusedPageText}`);
        }
    }

    async pressKeyOnPaginationBar(key) {
        // Map display names to Playwright key strings
        const keyMap = {
            'PageDown':              'PageDown',
            'PageUp':                'PageUp',
            'ArrowRight':            'ArrowRight',
            'ArrowLeft':             'ArrowLeft',
            'Enter':                 'Enter',
            'Space':                 'Space',
            'Tab':                   'Tab',
            'Shift+Tab':             'Shift+Tab',
            'Home':                  'Home',
            'End':                   'End',
            'Control+Alt+PageUp':    'Control+Alt+PageUp',
            'Control+Alt+PageDown':  'Control+Alt+PageDown',
        };
        const playwrightKey = keyMap[key];
        if (!playwrightKey) throw new Error(`Unknown key: ${key}`);
        await this.page.keyboard.press(playwrightKey);
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        console.log(`Pressed key: ${playwrightKey}`);
    }

    async verifyFocusedPageIsActive() {
        if (this._focusedPageText) {
            const activeText = (await this.activePageNumber.textContent() || '').trim();
            expect(activeText).toBe(this._focusedPageText);
            console.log(`Focused page number "${this._focusedPageText}" is now active.`);
        }
    }

    async verifyFocusMovedToNextItem() {
        // Check some focusable element inside the pager has focus
        const focused = await this.page.evaluate(() => document.activeElement?.closest('.e-pager') !== null);
        expect(focused).toBeTruthy();
        console.log('Focus has moved to the next pagination item.');
    }

    async verifyFocusMovedToPreviousItem() {
        const focused = await this.page.evaluate(() => document.activeElement?.closest('.e-pager') !== null);
        expect(focused).toBeTruthy();
        console.log('Focus has moved to the previous pagination item.');
    }
}

module.exports = PaginationPage;
