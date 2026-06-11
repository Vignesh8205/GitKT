/**
 * Class Name: Club Person Function Basic Filter Step Definitions
 *
 * Description:
 * Step definitions for clubPersonFunctionBasicFilter.feature.
 * Each step corresponds to an individual filter scenario:
 * search text, status, level, club function, section,
 * section function, team, team function, date range.
 *
 * @author Prem Kumar
 * @version 1.0
 * @since 24-04-2026
 * @last update 24-04-2026
 */

const { Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');

setDefaultTimeout(2 * 60000);

// ─────────────────────────────────────────────────────────────────────────────
// CLUB MANAGEMENT NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

Then('User searches the club record with {string}', { timeout: 30000 }, async function (clubName) {
    await this.pages.clubPersonFunctionBasicFilterPage.searchClubRecord(clubName);
});

Then('User clicks the matched club record', { timeout: 30000 }, async function () {
    await this.pages.clubPersonFunctionBasicFilterPage.clickMatchedClubRecord();
});

Then('User navigates to the {string} tab on club detail page', { timeout: 30000 }, async function (tabName) {
    await this.pages.clubPersonFunctionBasicFilterPage.navigateToPersonFunctionTab(tabName);
});

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION (legacy)
// ─────────────────────────────────────────────────────────────────────────────

Then('User selects the first person from the listing', { timeout: 30000 }, async function () {
    await this.pages.clubPersonFunctionBasicFilterPage.selectFirstPersonRecord();
});

Then('User navigates to the Functions tab on the person detail page', { timeout: 30000 }, async function () {
    await this.pages.clubPersonFunctionBasicFilterPage.navigateToFunctionsTab();
});

// ─────────────────────────────────────────────────────────────────────────────
// OPEN FILTER DIALOG
// ─────────────────────────────────────────────────────────────────────────────

Then('User opens the {string} function filter', { timeout: 30000 }, async function (sectionName) {
    await this.pages.clubPersonFunctionBasicFilterPage.openFunctionFilterDialog(sectionName);
});

Then('User verifies the function filter dialog is open', { timeout: 15000 }, async function () {
    await this.pages.clubPersonFunctionBasicFilterPage.verifyFilterDialogVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO 1 – SEARCH TEXT
// ─────────────────────────────────────────────────────────────────────────────

Then('User searches person functions with search text {string}', { timeout: 60000 }, async function (text) {
    await this.pages.clubPersonFunctionBasicFilterPage.searchByText(text);
});

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO 2 – STATUS
// ─────────────────────────────────────────────────────────────────────────────

Then('User filters person functions by Status {string}', { timeout: 30000 }, async function (status) {
    await this.pages.clubPersonFunctionBasicFilterPage.filterByStatus(status);
});

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO 3 – LEVEL
// ─────────────────────────────────────────────────────────────────────────────

Then('User filters person functions by Level {string}', { timeout: 30000 }, async function (level) {
    await this.pages.clubPersonFunctionBasicFilterPage.filterByLevel(level);
});

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO 4 – CLUB FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

Then('User filters person functions by Club Function {string}', { timeout: 30000 }, async function (value) {
    await this.pages.clubPersonFunctionBasicFilterPage.filterByClubFunction(value);
});

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO 5 – SECTION VALUE
// ─────────────────────────────────────────────────────────────────────────────

Then('User filters person functions by Section {string}', { timeout: 60000 }, async function (value) {
    await this.pages.clubPersonFunctionBasicFilterPage.filterBySection(value);
});

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO 6 – SECTION FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

Then('User filters person functions by Section Function {string}', { timeout: 30000 }, async function (value) {
    await this.pages.clubPersonFunctionBasicFilterPage.filterBySectionFunction(value);
});

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO 7 – TEAM VALUE
// ─────────────────────────────────────────────────────────────────────────────

Then('User filters person functions by Team {string}', { timeout: 60000 }, async function (value) {
    await this.pages.clubPersonFunctionBasicFilterPage.filterByTeam(value);
});

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO 8 – TEAM FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

Then('User filters person functions by Team Function {string}', { timeout: 30000 }, async function (value) {
    await this.pages.clubPersonFunctionBasicFilterPage.filterByTeamFunction(value);
});

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO 9 – DATE RANGE
// ─────────────────────────────────────────────────────────────────────────────

Then('User filters person functions by Date Range {string}', { timeout: 30000 }, async function (range) {
    await this.pages.clubPersonFunctionBasicFilterPage.filterByDateRange(range);
});

// ─────────────────────────────────────────────────────────────────────────────
// APPLY / RESET
// ─────────────────────────────────────────────────────────────────────────────

Then('User clicks Apply on the person function filter', { timeout: 30000 }, async function () {
    await this.pages.clubPersonFunctionBasicFilterPage.clickApply();
});

Then('User clicks Reset on the person function filter', { timeout: 30000 }, async function () {
    await this.pages.clubPersonFunctionBasicFilterPage.clickReset();
});

// ─────────────────────────────────────────────────────────────────────────────
// VERIFICATION
// ─────────────────────────────────────────────────────────────────────────────

Then('User verifies the person function filtered grid has records', { timeout: 30000 }, async function () {
    await this.pages.clubPersonFunctionBasicFilterPage.verifyGridHasRecords();
});

Then('User verifies all person function filters have been cleared', { timeout: 15000 }, async function () {
    await this.pages.clubPersonFunctionBasicFilterPage.verifyFiltersCleared();
});

// ─────────────────────────────────────────────────────────────────────────────
// API CAPTURE & VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

Then('User starts capturing the person functions API', { timeout: 10000 }, async function () {
    this.pages.clubPersonFunctionBasicFilterPage.startCapturingFunctionsAPI();
});

Then('User awaits and verifies the person functions API total count is greater than zero', { timeout: 90000 }, async function () {
    const body = await this.pages.clubPersonFunctionBasicFilterPage.awaitFunctionsAPIResponse();
    await this.pages.clubPersonFunctionBasicFilterPage.verifyAPITotalGreaterThanZero(body);
});

Then('User prints the person functions API response as JSON', { timeout: 10000 }, async function () {
    this.pages.clubPersonFunctionBasicFilterPage.printAPIResponseAsJSON();
});
