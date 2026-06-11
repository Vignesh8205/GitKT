const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');

setDefaultTimeout(2 * 60000);

// ======================================================================
// FILTER DIALOG – OPEN & TAB VERIFICATION
// ======================================================================

/**
 * Click the filter icon on the Club Management list page to open the filter dialog.
 */
Then(
    `User clicks the filter icon in Club Management to open filter options`,
    { timeout: 90000 },
    async function () {
        await this.pages.clubManagementBasicFilterPage.openFilterDialog();
    }
);

/**
 * Verify that the given tab (e.g. "Basic Filter") is displayed in the filter dialog.
 */
Then(
    `User verifies {string} tab is displayed in Club Management filter dialog`,
    { timeout: 90000 },
    async function (tabName) {
        await this.pages.clubManagementBasicFilterPage.verifyFilterTabExists(tabName);
    }
);

/**
 * Verify the search input inside the filter dialog has the expected placeholder text.
 * e.g. "Search by Club Name or Registration Number"
 */
Then(
    `User verifies the Club Management filter search input has placeholder {string}`,
    { timeout: 30000 },
    async function (expectedPlaceholder) {
        await this.pages.clubManagementBasicFilterPage.verifyFilterSearchInputPlaceholder(expectedPlaceholder);
    }
);

/**
 * Verify a named filter field label is visible in the Club Management filter dialog.
 */
Then(
    `User verifies the Club Management filter field {string} is displayed`,
    { timeout: 30000 },
    async function (fieldLabel) {
        await this.pages.clubManagementBasicFilterPage.verifyFilterFieldVisible(fieldLabel);
    }
);

// ======================================================================
// APPLY FILTER CRITERIA
// ======================================================================

/**
 * Apply Club Management Basic Filter with criteria from a data table.
 *
 * Supported FilterField column values:
 *   Search, Status, Sportive Type, Format, Gender Offering,
 *   Language, Region, Federation, Legal Status, Club Code,
 *   Founding Date From, Founding Date To, Tags
 */
Then(
    `User applies Club Basic Filter with following criteria`,
    { timeout: 90000 },
    async function (dataTable) {
        const filterCriteria = dataTable.rowsHash();
        await this.pages.clubManagementBasicFilterPage.applyClubBasicFilterCriteria(filterCriteria);
    }
);

// ======================================================================
// APPLY / RESET BUTTONS
// ======================================================================

/**
 * Click the Apply button inside the Club Management filter dialog.
 */
Then(
    `User clicks the Apply button in Club Management filter dialog`,
    { timeout: 90000 },
    async function () {
        await this.pages.clubManagementBasicFilterPage.clickFilterApplyButton();
    }
);

/**
 * Click the Reset button inside the Club Management filter dialog.
 */
Then(
    `User clicks the Reset button in Club Management filter dialog`,
    { timeout: 90000 },
    async function () {
        await this.pages.clubManagementBasicFilterPage.clickFilterResetButton();
    }
);

// ======================================================================
// FILTER STATE VERIFICATION
// ======================================================================

/**
 * Verify the Club Management filter has been applied (record count is visible).
 */
Then(
    `User verifies that the Club Management filter has been applied successfully`,
    { timeout: 90000 },
    async function () {
        await this.pages.clubManagementBasicFilterPage.verifyFilterApplied();
    }
);

/**
 * Verify all Club Management filters are cleared after Reset.
 */
Then(
    `User verifies that all Club Management filters are cleared`,
    { timeout: 90000 },
    async function () {
        await this.pages.clubManagementBasicFilterPage.verifyFiltersCleared();
    }
);

/**
 * Verify the Club Management filtered grid displays at least one matching record.
 */
Then(
    `User verifies the Club Management filtered grid displays matching records`,
    { timeout: 90000 },
    async function () {
        await this.pages.clubManagementBasicFilterPage.verifyFilteredGridRecords();
    }
);

// ======================================================================
// BUTTON GROUP PRE-SELECTION
// ======================================================================

/**
 * Verify a button-group option is pre-selected (has e-primary class) in the
 * Club Management filter dialog without clicking it.
 *
 * Example: User verifies the Club Management "Status" filter has "Active" pre-selected by default
 */
Then(
    `User verifies the Club Management {string} filter has {string} pre-selected by default`,
    { timeout: 30000 },
    async function (fieldLabel, buttonValue) {
        await this.pages.clubManagementBasicFilterPage.verifyButtonGroupPreSelected(fieldLabel, buttonValue);
    }
);

// ======================================================================
// CLUBS LIST API – CAPTURE & VALIDATE
// ======================================================================

/**
 * Set up a listener to capture the /clubs/list API response before clicking Apply.
 */
Then(
    `User starts capturing the clubs list API response`,
    { timeout: 10000 },
    async function () {
        this.clubListResponsePromise = this.page.waitForResponse(
            (response) => response.url().includes('/club-management/club-list'),
            { timeout: 90000 }
        );
        console.log('✓ Started capturing /club-management/club-list API response');
    }
);

/**
 * Await the captured /clubs/list API response and assert total > 0.
 */
Then(
    `User verifies the clubs API total count is greater than zero`,
    { timeout: 90000 },
    async function () {
        const response = await this.clubListResponsePromise;
        const body = await response.json();
        this.clubListApiResponse = body;
        expect(body.total).toBeGreaterThan(0);
        console.log(
            `✓ /club-management/club-list API returned total: ${body.total}, items in page: ${body.items.length}`
        );
    }
);

/**
 * Validate that every record in the captured /club-management/club-list API response has the
 * specified field matching the expected value.
 *
 * Supported field names: "status", "federation", "legalStatus", "language", "region"
 */
Then(
    `User verifies all clubs API records have {string} matching {string}`,
    { timeout: 30000 },
    async function (field, expectedValue) {
        console.log(await this.clubListApiResponse,"\n Validating field:", field, "expected value:", expectedValue);
        await this.pages.clubManagementBasicFilterPage.validateApiResponseField(
            this.clubListApiResponse,
            field,
            expectedValue
        );
    }
);

// ======================================================================
// SEARCH BY CLUB NAME
// ======================================================================

/**
 * Search for a club by name via the filter dialog's autocomplete, then click Apply
 * to trigger the /clubs/list API.
 */
Then(
    `User searches for club with name {string}`,
    { timeout: 90000 },
    async function (name) {
        await this.pages.clubManagementBasicFilterPage.searchClubByName(name);
    }
);

/**
 * Search for the recently created club using the 'RBFAclubUI' prefix via quick search,
 * selects the first matching record and navigates to its detail page.
 */
Then(
    `User searches for the recently created club`,
    { timeout: 90000 },
    async function () {
        await this.pages.clubManagementPage.searchByQuickSearch('RBFAclubUI');
        await this.pages.clubManagementPage.clickFirstClubRecordInGrid();
    }
);

/**
 * Clear the club name search autocomplete and re-apply the filter.
 */
Then(
    `User clears the club name search input`,
    { timeout: 90000 },
    async function () {
        await this.pages.clubManagementBasicFilterPage.clearClubNameSearch();
    }
);

/**
 * Verify the club grid contains at least one row with the searched name.
 */
Then(
    `User verifies the club grid contains name {string}`,
    { timeout: 60000 },
    async function (name) {
        await this.pages.clubManagementBasicFilterPage.verifyGridContainsName(name);
    }
);

/**
 * Validate all captured /clubs/list API response records contain the name search text.
 */
Then(
    `User verifies all clubs API records contain name {string}`,
    { timeout: 30000 },
    async function (searchText) {
        await this.pages.clubManagementBasicFilterPage.validateApiResponseNameContains(
            this.clubListApiResponse,
            searchText
        );
    }
);

// ======================================================================
// CLUB RECORD DRILL-DOWN
// ======================================================================

/**
 * Click the first club record in the filtered grid to open the club detail page.
 */
Then(
    `User clicks the first club record in the filtered grid`,
    { timeout: 60000 },
    async function () {
        await this.pages.clubManagementPage.clickFirstClubRecordInGrid();
    }
);

/**
 * Navigate to a tab on the club detail page (e.g. "Tags").
 */
Then(
    `User navigates to {string} tab on club detail page`,
    { timeout: 30000 },
    async function (tabName) {
        await this.pages.clubManagementBasicFilterPage.navigateToClubDetailsTab(tabName);
    }
);

/**
 * Navigate back to the Club Management list using browser back.
 */
Then(
    `User navigates back to Club Management list`,
    { timeout: 30000 },
    async function () {
        await this.pages.clubManagementBasicFilterPage.navigateBackToClubManagement();
    }
);

// ======================================================================
// CLUB TAGS API – CAPTURE & VALIDATE
// ======================================================================

/**
 * Set up a listener to capture the club tags API response.
 */
Then(
    `User starts capturing the club tags API response`,
    { timeout: 10000 },
    async function () {
        await this.pages.clubManagementBasicFilterPage.startCapturingClubTagsAPI();
    }
);

/**
 * Await the captured club tags API response and store it for validation.
 */
Then(
    `User waits for the club tags API response`,
    { timeout: 30000 },
    async function () {
        this.clubTagsApiResponse =
            await this.pages.clubManagementBasicFilterPage.awaitClubTagsAPIResponse();
    }
);

/**
 * Validate the club tags API response contains the expected tag name.
 */
Then(
    `User verifies the club tags API contains {string}`,
    { timeout: 30000 },
    async function (tagName) {
        await this.pages.clubManagementBasicFilterPage.verifyClubTagsAPIContains(
            this.clubTagsApiResponse,
            tagName
        );
    }
);

/**
 * Verify the status on the club detail page
 */
Then(`User verifies the status is {string}`, { timeout: 30000 }, async function (expectedStatus) {
    await this.pages.clubManagementBasicFilterPage.verifyStatus(expectedStatus);
});

//FoundingDate

/**
 * Verify the founding date on the club detail page
 */
Then(`User verifies the founding date is within {string}`, { timeout: 30000 }, async function (expectedRange) {
    await this.pages.clubManagementBasicFilterPage.verifyFoundingDate(expectedRange);
});

Then(`User verifies the {string} is within {string}`, { timeout: 30000 }, async function (field, expectedRange) {
    await this.pages.clubManagementBasicFilterPage.clubDetails(field, expectedRange);
});

 
Then(`user go back to club management list page`, { timeout: 30000 }, async function () {
    await this.pages.clubManagementBasicFilterPage.navigateBackToClubManagement();
});

