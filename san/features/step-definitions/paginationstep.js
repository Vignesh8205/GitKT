const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');

setDefaultTimeout(2 * 60000);

// ── Pagination Bar Visibility ─────────────────────────────────────────────────

Then('verify the pagination bar is displayed at the bottom of the data grid', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.verifyPaginationBarVisible();
});

Then('verify the pagination bar is only visible when records exceed the page size', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.verifyPaginationBarVisibleWhenExceedsPageSize();
});

// ── Navigation Button Presence ────────────────────────────────────────────────

Then('verify the {string} navigation button is present', { timeout: 90000 }, async function (buttonName) {
    await this.pages.paginationPage.verifyNavigationButtonPresent(buttonName);
});

// ── Click Navigation Buttons ──────────────────────────────────────────────────

Then('user clicks the {string} navigation button', { timeout: 90000 }, async function (direction) {
    await this.pages.paginationPage.clickNavigationButton(direction);
});

Then('user clicks the {string} navigation button {int} times', { timeout: 90000 }, async function (direction, times) {
    await this.pages.paginationPage.clickNavigationButtonTimes(direction, times);
});

// ── Capture / Verify Page Numbers ─────────────────────────────────────────────

Then('user captures the current page number from the pagination bar', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.captureCurrentPageNumber();
});

Then('verify the page has navigated to the next page', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.verifyNavigatedToNextPage();
});

Then('verify the page has navigated to the previous page', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.verifyNavigatedToPreviousPage();
});

Then('verify the current page number is {int}', { timeout: 90000 }, async function (expectedPage) {
    await this.pages.paginationPage.verifyCurrentPageIs(expectedPage);
});

Then('verify the current page is the last page', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.verifyCurrentPageIsLastPage();
});

// ── Highlighted Active Page ───────────────────────────────────────────────────

Then('verify the current page number is highlighted in the pagination bar', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.verifyCurrentPageHighlighted();
});

// ── Click a Specific Page Number ──────────────────────────────────────────────

Then('user clicks on page number {int} in the pagination bar', { timeout: 90000 }, async function (pageNumber) {
    await this.pages.paginationPage.clickPageNumber(pageNumber);
});

// ── First / Last Page Always Visible ─────────────────────────────────────────

Then('verify the first page number is always visible in the pagination bar', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.verifyFirstPageNumberVisible();
});

Then('verify the last page number is always visible in the pagination bar', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.verifyLastPageNumberVisible();
});

// ── Ellipsis ──────────────────────────────────────────────────────────────────

Then('verify an ellipsis is displayed in the pagination bar to indicate skipped pages', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.verifyEllipsisVisible();
});

// ── Page Size Selector ────────────────────────────────────────────────────────

Then('verify the default selected page size is {int}', { timeout: 90000 }, async function (expectedSize) {
    await this.pages.paginationPage.verifyDefaultPageSize(expectedSize);
});

Then('verify the page size dropdown contains options {string}', { timeout: 90000 }, async function (optionsString) {
    await this.pages.paginationPage.verifyPageSizeOptions(optionsString);
});

Then('user selects page size {string} from the page size selector', { timeout: 90000 }, async function (pageSize) {
    await this.pages.paginationPage.selectPageSize(pageSize);
});

Then('verify the data grid shows at most {int} records per page', { timeout: 90000 }, async function (maxRows) {
    await this.pages.paginationPage.verifyRowCountAtMost(maxRows);
});

Then('verify the {string} option is available in the page size dropdown for grids with 100 or fewer records', { timeout: 90000 }, async function (optionLabel) {
    await this.pages.paginationPage.verifyAllOptionAvailable();
});

// ── Scroll to Top ─────────────────────────────────────────────────────────────

Then('verify the data grid is scrolled to the top after page change', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.verifyScrolledToTop();
});

// ── Page Resets on Filter / Search ───────────────────────────────────────────

Then('user applies a search filter on the Club Management grid', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.applySearchFilter('Test');
});

Then('user enters a search term in the Club Management search bar', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.enterSearchTerm('Club');
});

// ── Navigate to Nearest Valid Page ────────────────────────────────────────────

Then('verify that if the last page has only one record, deleting it navigates to the previous valid page', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.verifyNavigatesToNearestValidPage();
});

// ── Keyboard Navigation ───────────────────────────────────────────────────────

Then('user focuses the pagination bar', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.focusPaginationBar();
});

Then('user focuses a page number button in the pagination bar', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.focusPageNumberButton();
});

Then('user presses the {string} key on the pagination bar', { timeout: 90000 }, async function (key) {
    await this.pages.paginationPage.pressKeyOnPaginationBar(key);
});

Then('verify the focused page number is now the current active page', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.verifyFocusedPageIsActive();
});

Then('verify focus has moved to the next pagination item', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.verifyFocusMovedToNextItem();
});

Then('verify focus has moved to the previous pagination item', { timeout: 90000 }, async function () {
    await this.pages.paginationPage.verifyFocusMovedToPreviousItem();
});
