const { Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');

setDefaultTimeout(2 * 60000);

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

Then(`User selects the first person record from the listing page`, { timeout: 30000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.selectFirstPersonRecord();
});

Then(`User navigates to the Functions tab on person detail page`, { timeout: 30000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.navigateToFunctionsTab();
});

// ─────────────────────────────────────────────────────────────────────────────
// CLUB FUNCTION FILTER – OPEN / VERIFY
// ─────────────────────────────────────────────────────────────────────────────

Then(`User clicks the Club Function filter icon`, { timeout: 30000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.openClubFunctionFilter();
});

Then(`User verifies the Club Function filter dialog is displayed`, { timeout: 15000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.verifyFilterDialogVisible('Club Function');
});

// ─────────────────────────────────────────────────────────────────────────────
// CLUB FUNCTION FILTER – SEARCH
// ─────────────────────────────────────────────────────────────────────────────

Then(`User searches club functions with text {string}`, { timeout: 30000 }, async function (searchText) {
    await this.pages.personFunctionBasicFilterPage.searchInFilterDialog(searchText);
});

// ─────────────────────────────────────────────────────────────────────────────
// CLUB FUNCTION FILTER – CRITERIA / APPLY / RESET
// ─────────────────────────────────────────────────────────────────────────────

Then(`User applies Club Function filter with following criteria`, { timeout: 60000 }, async function (dataTable) {
    const criteria = dataTable.rowsHash();
    await this.pages.personFunctionBasicFilterPage.applyFilterCriteria(criteria);
});

Then(`User starts capturing the club functions API response`, { timeout: 10000 }, async function () {
    this.pages.personFunctionBasicFilterPage.startCapturingClubFunctionsAPI();
});

Then(`User clicks Apply on Club Function filter dialog`, { timeout: 30000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.clickApply();
});

Then(`User awaits and verifies the club functions API total count is greater than zero`, { timeout: 90000 }, async function () {
    const body = await this.pages.personFunctionBasicFilterPage.awaitClubFunctionsAPIResponse();
    await this.pages.personFunctionBasicFilterPage.verifyAPITotalGreaterThanZero(body);
});

Then(`User verifies the club functions filtered grid displays matching records`, { timeout: 30000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.verifyClubFunctionGridHasRecords();
});

Then(`User clicks Reset on Club Function filter dialog`, { timeout: 15000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.clickReset();
});

Then(`User verifies the club functions grid contains name {string}`, { timeout: 30000 }, async function (searchText) {
    await this.pages.personFunctionBasicFilterPage.verifyClubFunctionGridContainsName(searchText);
});

Then(`User verifies that all Club Function filters are cleared`, { timeout: 15000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.verifyClubFunctionFiltersCleared();
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION FUNCTION FILTER – OPEN / VERIFY
// ─────────────────────────────────────────────────────────────────────────────

Then(`User clicks the Section Function filter icon`, { timeout: 30000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.openSectionFunctionFilter();
});

Then(`User verifies the Section Function filter dialog is displayed`, { timeout: 15000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.verifyFilterDialogVisible('Section Function');
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION FUNCTION FILTER – SEARCH
// ─────────────────────────────────────────────────────────────────────────────

Then(`User searches section functions with text {string}`, { timeout: 30000 }, async function (searchText) {
    await this.pages.personFunctionBasicFilterPage.searchInFilterDialog(searchText);
});

Then(`User selects the first suggestion from section function search dropdown`, { timeout: 30000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.selectFirstSectionFunctionSearchSuggestion();
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION FUNCTION FILTER – CRITERIA / APPLY / RESET
// ─────────────────────────────────────────────────────────────────────────────

Then(`User applies Section Function filter with following criteria`, { timeout: 60000 }, async function (dataTable) {
    const criteria = dataTable.rowsHash();
    await this.pages.personFunctionBasicFilterPage.applyFilterCriteria(criteria);
});

Then(`User starts capturing the section functions API response`, { timeout: 10000 }, async function () {
    this.pages.personFunctionBasicFilterPage.startCapturingSectionFunctionsAPI();
});

Then(`User clicks Apply on Section Function filter dialog`, { timeout: 30000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.clickApply();
});

Then(`User awaits and verifies the section functions API total count is greater than zero`, { timeout: 90000 }, async function () {
    const body = await this.pages.personFunctionBasicFilterPage.awaitSectionFunctionsAPIResponse();
    await this.pages.personFunctionBasicFilterPage.verifyAPITotalGreaterThanZero(body);
});

Then(`User verifies the section functions filtered grid displays matching records`, { timeout: 30000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.verifySectionFunctionGridHasRecords();
});

Then(`User clicks Reset on Section Function filter dialog`, { timeout: 15000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.clickReset();
});

// ─────────────────────────────────────────────────────────────────────────────
// TEAM FUNCTION FILTER – OPEN / VERIFY
// ─────────────────────────────────────────────────────────────────────────────

Then(`User clicks the Team Function filter icon`, { timeout: 30000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.openTeamFunctionFilter();
});

Then(`User verifies the Team Function filter dialog is displayed`, { timeout: 15000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.verifyFilterDialogVisible('Team Function');
});

// ─────────────────────────────────────────────────────────────────────────────
// TEAM FUNCTION FILTER – SEARCH
// ─────────────────────────────────────────────────────────────────────────────

Then(`User searches team functions with text {string}`, { timeout: 30000 }, async function (searchText) {
    await this.pages.personFunctionBasicFilterPage.searchInFilterDialog(searchText);
});

Then(`User selects the first suggestion from team function search dropdown`, { timeout: 60000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.selectFirstTeamFunctionSearchSuggestion();
});

// ─────────────────────────────────────────────────────────────────────────────
// TEAM FUNCTION FILTER – CRITERIA / APPLY / RESET
// ─────────────────────────────────────────────────────────────────────────────

Then(`User applies Team Function filter with following criteria`, { timeout: 60000 }, async function (dataTable) {
    const criteria = dataTable.rowsHash();
    await this.pages.personFunctionBasicFilterPage.applyFilterCriteria(criteria);
});

Then(`User starts capturing the team functions API response`, { timeout: 10000 }, async function () {
    this.pages.personFunctionBasicFilterPage.startCapturingTeamFunctionsAPI();
});

Then(`User clicks Apply on Team Function filter dialog`, { timeout: 30000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.clickApply();
});

Then(`User awaits and verifies the team functions API total count is greater than zero`, { timeout: 90000 }, async function () {
    const body = await this.pages.personFunctionBasicFilterPage.awaitTeamFunctionsAPIResponse();
    await this.pages.personFunctionBasicFilterPage.verifyAPITotalGreaterThanZero(body);
});

Then(`User verifies the team functions filtered grid displays matching records`, { timeout: 30000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.verifyTeamFunctionGridHasRecords();
});

Then(`User clicks Reset on Team Function filter dialog`, { timeout: 15000 }, async function () {
    await this.pages.personFunctionBasicFilterPage.clickReset();
});
