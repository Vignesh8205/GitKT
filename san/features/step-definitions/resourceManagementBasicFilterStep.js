const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

Then(`User can able to navigate to Resource Management page`, { timeout: 30000 }, async function () {
    await this.pages.resourceManagementBasicFilterPage.navigateToResourceManagement();
});

// ─────────────────────────────────────────────────────────────────────────────
// OPEN / VERIFY FILTER DIALOG
// ─────────────────────────────────────────────────────────────────────────────

Then(`User clicks the Resource Management filter icon`, { timeout: 30000 }, async function () {
    await this.pages.resourceManagementBasicFilterPage.openResourceManagementFilter();
});

Then(`User verifies the Resource Management filter dialog is displayed`, { timeout: 15000 }, async function () {
    await this.pages.resourceManagementBasicFilterPage.verifyFilterDialogVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// SEARCH
// ─────────────────────────────────────────────────────────────────────────────

Then(`User searches resource management with text {string}`, { timeout: 30000 }, async function (searchText) {
    await this.pages.resourceManagementBasicFilterPage.searchResourceManagement(searchText);
});

Then(`User selects the first suggestion from resource management search dropdown`, { timeout: 30000 }, async function () {
    await this.pages.resourceManagementBasicFilterPage.selectFirstResourceManagementSearchSuggestion();
});

// ─────────────────────────────────────────────────────────────────────────────
// CRITERIA (DataTable driven)
// ─────────────────────────────────────────────────────────────────────────────

Then(`User applies Resource Management filter with following criteria`, { timeout: 60000 }, async function (dataTable) {
    const criteria = dataTable.rowsHash();
    await this.pages.resourceManagementBasicFilterPage.applyFilterCriteria(criteria);
});

// ─────────────────────────────────────────────────────────────────────────────
// APPLY / RESET
// ─────────────────────────────────────────────────────────────────────────────

Then(`User clicks Apply on Resource Management filter dialog`, { timeout: 30000 }, async function () {
    await this.pages.resourceManagementBasicFilterPage.clickApply();
});

Then(`User clicks Reset on Resource Management filter dialog`, { timeout: 15000 }, async function () {
    await this.pages.resourceManagementBasicFilterPage.clickReset();
});

// ─────────────────────────────────────────────────────────────────────────────
// API CAPTURE
// ─────────────────────────────────────────────────────────────────────────────

Then(`User starts capturing the resource management API response`, { timeout: 10000 }, async function () {
    this.pages.resourceManagementBasicFilterPage.startCapturingResourceManagementAPI();
});

Then(`User awaits and verifies the resource management API total count is greater than zero`, { timeout: 90000 }, async function () {
    const body = await this.pages.resourceManagementBasicFilterPage.awaitResourceManagementAPIResponse();
    await this.pages.resourceManagementBasicFilterPage.verifyAPITotalGreaterThanZero(body);
});

// ─────────────────────────────────────────────────────────────────────────────
// GRID VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

Then(`User verifies the resource management filtered grid displays matching records`, { timeout: 30000 }, async function () {
    await this.pages.resourceManagementBasicFilterPage.verifyGridHasRecords();
});
