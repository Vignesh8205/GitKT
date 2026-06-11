const { Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');

setDefaultTimeout(2 * 60000);

// ─────────────────────────────────────────────────────────────────────────────
// OPEN / VERIFY FILTER DIALOG
// ─────────────────────────────────────────────────────────────────────────────

Then(`User clicks the User Management filter icon`, { timeout: 30000 }, async function () {
    await this.pages.userManagementBasicFilterPage.openUserManagementFilter();
});

Then(`User verifies the User Management filter dialog is displayed`, { timeout: 15000 }, async function () {
    await this.pages.userManagementBasicFilterPage.verifyFilterDialogVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// SEARCH
// ─────────────────────────────────────────────────────────────────────────────

Then(`User searches user management with text {string}`, { timeout: 30000 }, async function (searchText) {
    await this.pages.userManagementBasicFilterPage.searchUserManagement(searchText);
});

Then(`User selects the first suggestion from user management search dropdown`, { timeout: 30000 }, async function () {
    await this.pages.userManagementBasicFilterPage.selectFirstUserManagementSearchSuggestion();
});

// ─────────────────────────────────────────────────────────────────────────────
// CRITERIA (DataTable driven)
// ─────────────────────────────────────────────────────────────────────────────

Then(`User applies User Management filter with following criteria`, { timeout: 60000 }, async function (dataTable) {
    const criteria = dataTable.rowsHash();
    await this.pages.userManagementBasicFilterPage.applyFilterCriteria(criteria);
});

// ─────────────────────────────────────────────────────────────────────────────
// AGE RANGE
// ─────────────────────────────────────────────────────────────────────────────

Then(`User applies User Management Age Range filter with min {string} and max {string}`, { timeout: 60000 }, async function (minAge, maxAge) {
    await this.pages.userManagementBasicFilterPage.applyAgeRangeFilter(minAge, maxAge);
});

// ─────────────────────────────────────────────────────────────────────────────
// APPLY / RESET
// ─────────────────────────────────────────────────────────────────────────────

Then(`User clicks Apply on User Management filter dialog`, { timeout: 30000 }, async function () {
    await this.pages.userManagementBasicFilterPage.clickApply();
});

Then(`User clicks Reset on User Management filter dialog`, { timeout: 15000 }, async function () {
    await this.pages.userManagementBasicFilterPage.clickReset();
});

// ─────────────────────────────────────────────────────────────────────────────
// API CAPTURE
// ─────────────────────────────────────────────────────────────────────────────

Then(`User starts capturing the user management API response`, { timeout: 10000 }, async function () {
    this.pages.userManagementBasicFilterPage.startCapturingUserManagementAPI();
});

Then(`User awaits and verifies the user management API total count is greater than zero`, { timeout: 90000 }, async function () {
    const body = await this.pages.userManagementBasicFilterPage.awaitUserManagementAPIResponse();
    await this.pages.userManagementBasicFilterPage.verifyAPITotalGreaterThanZero(body);
});

// ─────────────────────────────────────────────────────────────────────────────
// GRID VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

Then(`User verifies the user management filtered grid displays matching records`, { timeout: 30000 }, async function () {
    await this.pages.userManagementBasicFilterPage.verifyGridHasRecords();
});
