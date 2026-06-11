const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');

setDefaultTimeout(2 * 60000);

// ======================================================================
// FILTER DIALOG – OPEN & TAB VERIFICATION
// ======================================================================

/**
 * Click the filter icon on the Competition Configuration list page to open the filter dialog.
 */
Then(
    `User clicks the filter icon in Competition Configuration to open filter options`,
    { timeout: 90000 },
    async function () {
        await this.pages.competitionConfigBasicFilterPage.openFilterDialog();
    }
);

/**
 * Verify that the given tab (e.g. "Basic Filter") is displayed in the filter dialog.
 */
Then(
    `User verifies {string} tab is displayed in Competition Configuration filter dialog`,
    { timeout: 90000 },
    async function (tabName) {
        await this.pages.competitionConfigBasicFilterPage.verifyFilterTabExists(tabName);
    }
);

/**
 * Verify the search input inside the filter dialog has the expected placeholder text.
 */
Then(
    `User verifies the Competition Configuration filter search input has placeholder {string}`,
    { timeout: 30000 },
    async function (expectedPlaceholder) {
        await this.pages.competitionConfigBasicFilterPage.verifyFilterSearchInputPlaceholder(expectedPlaceholder);
    }
);

/**
 * Verify a named filter field label is visible in the Competition Configuration filter dialog.
 */
Then(
    `User verifies the Competition Configuration filter field {string} is displayed`,
    { timeout: 30000 },
    async function (fieldLabel) {
        await this.pages.competitionConfigBasicFilterPage.verifyFilterFieldVisible(fieldLabel);
    }
);

// ======================================================================
// APPLY FILTER CRITERIA
// ======================================================================

/**
 * Apply Competition Configuration Basic Filter with criteria from a data table.
 *
 * Supported FilterField values:
 *   Search, Status, Competition Type, Format, Competition Level
 */
Then(
    `User applies Competition Config Basic Filter with following criteria`,
    { timeout: 90000 },
    async function (dataTable) {
        const filterCriteria = dataTable.rowsHash();
        await this.pages.competitionConfigBasicFilterPage.applyCompetitionConfigBasicFilterCriteria(filterCriteria);
    }
);

// ======================================================================
// APPLY / RESET BUTTONS
// ======================================================================

/**
 * Click the Apply button inside the Competition Configuration filter dialog.
 */
Then(
    `User clicks the Apply button in Competition Configuration filter dialog`,
    { timeout: 90000 },
    async function () {
        await this.pages.competitionConfigBasicFilterPage.clickFilterApplyButton();
    }
);

/**
 * Click the Reset button inside the Competition Configuration filter dialog.
 */
Then(
    `User clicks the Reset button in Competition Configuration filter dialog`,
    { timeout: 90000 },
    async function () {
        await this.pages.competitionConfigBasicFilterPage.clickFilterResetButton();
    }
);

// ======================================================================
// FILTER STATE VERIFICATION
// ======================================================================

/**
 * Verify the Competition Configuration filter has been applied (record count is visible).
 */
Then(
    `User verifies that the Competition Configuration filter has been applied successfully`,
    { timeout: 90000 },
    async function () {
        await this.pages.competitionConfigBasicFilterPage.verifyFilterApplied();
    }
);

/**
 * Verify all Competition Configuration filters are cleared after Reset.
 */
Then(
    `User verifies that all Competition Configuration filters are cleared`,
    { timeout: 90000 },
    async function () {
        await this.pages.competitionConfigBasicFilterPage.verifyFiltersCleared();
    }
);

/**
 * Verify the Competition Configuration filtered grid displays at least one matching record.
 */
Then(
    `User verifies the Competition Configuration filtered grid displays matching records`,
    { timeout: 90000 },
    async function () {
        await this.pages.competitionConfigBasicFilterPage.verifyFilteredGridRecords();
    }
);

// ======================================================================
// COMPETITION CONFIG LIST API – CAPTURE & VALIDATE
// ======================================================================

/**
 * Set up a listener to capture the competition config list API response before clicking Apply.
 */
Then(
    `User starts capturing the competition config list API response`,
    { timeout: 10000 },
    async function () {
        this.competitionConfigListResponsePromise = this.page.waitForResponse(
            (response) =>
                response.url().toLowerCase().includes('competition') &&
                response.request().method() === 'POST' &&
                response.status() === 200,
            { timeout: 90000 }
        );
        console.log('✓ Started capturing competition config list API response');
    }
);

/**
 * Await the captured competition config list API response and assert total > 0.
 */
Then(
    `User verifies the competition config API total count is greater than zero`,
    { timeout: 90000 },
    async function () {
        const response = await this.competitionConfigListResponsePromise;
        console.log(`✓ Captured competition config API URL: ${response.url()}`);
        const body = await response.json();
        this.competitionConfigListApiResponse = body;
        const total = body.total ?? body.count ?? body.totalCount ?? (body.items || body.data || body.records || []).length;
        expect(total).toBeGreaterThan(0);
        console.log(
            `✓ Competition config API returned total: ${total}, items in page: ${(body.items || body.data || body.records || []).length}`
        );
    }
);

/**
 * Validate that every record in the captured competition config list API response has the
 * specified field matching the expected value.
 */
Then(
    `User verifies all competition config API records have {string} matching {string}`,
    { timeout: 30000 },
    async function (field, expectedValue) {
        await this.pages.competitionConfigBasicFilterPage.validateApiResponseField(
            this.competitionConfigListApiResponse,
            field,
            expectedValue
        );
    }
);

// ======================================================================
// SEARCH BY COMPETITION NAME
// ======================================================================

/**
 * Search for a competition config by name via the filter dialog's autocomplete.
 */
Then(
    `User searches for competition config with name {string}`,
    { timeout: 90000 },
    async function (name) {
        await this.pages.competitionConfigBasicFilterPage.searchCompetitionConfigByName(name);
    }
);

/**
 * Verify the competition config grid contains at least one row with the searched name.
 */
Then(
    `User verifies the competition config grid contains name {string}`,
    { timeout: 60000 },
    async function (name) {
        await this.pages.competitionConfigBasicFilterPage.verifyGridContainsName(name);
    }
);

// ======================================================================
// RECORD DRILL-DOWN
// ======================================================================

/**
 * Click the first competition config record in the filtered grid.
 */
Then(
    `User clicks the first competition config record in the filtered grid`,
    { timeout: 30000 },
    async function () {
        await this.pages.competitionConfigBasicFilterPage.clickFirstCompetitionConfigRecord();
    }
);

/**
 * Navigate back to the Competition Configuration list using browser back.
 */
Then(
    `User navigates back to Competition Configuration list`,
    { timeout: 30000 },
    async function () {
        await this.pages.competitionConfigBasicFilterPage.navigateBackToCompetitionConfig();
    }
);
