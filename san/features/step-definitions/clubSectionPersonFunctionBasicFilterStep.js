const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – PERSON FUNCTION(S) TAB ON SECTION DETAIL
// ======================================================================

/**
 * Navigate to the Person Function(s) tab on the section detail page.
 */
Then(
    /^User navigates to the Person Function\(s\) tab on section detail page$/,
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionPersonFunctionBasicFilterPage.navigateToPersonFunctionTab();
    }
);

// ======================================================================
// FILTER DIALOG – OPEN
// ======================================================================

/**
 * Click the filter icon on the Person Function grid to open the basic filter panel.
 */
Then(
    'User clicks the filter button on Section Person Function tab',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionPersonFunctionBasicFilterPage.openFilterDialog();
    }
);

// ======================================================================
// APPLY FILTER CRITERIA
// ======================================================================

/**
 * Apply Section Person Function Basic Filter criteria from a DataTable (rowsHash).
 *
 * Supported filter field keys:
 *   Search           – AutoComplete (placeholder: "Search by person name")
 *   Status           – Badge button (Active | Inactive)
 *   Level            – Badge button (Section | Team)
 *   Section Function – EJ2 MultiSelect
 *   Team             – EJ2 MultiSelect
 *   Team Function    – EJ2 MultiSelect
 *   Date Range       – EJ2 DateRangePicker ("DD/MM/YYYY - DD/MM/YYYY")
 */
Then(
    'User applies Section Person Function Basic Filter with following criteria',
    { timeout: 90000 },
    async function (dataTable) {
        const criteria = dataTable.rowsHash();
        await this.pages.clubSectionPersonFunctionBasicFilterPage.applyFilterCriteria(criteria);
    }
);

// ======================================================================
// APPLY / RESET BUTTONS
// ======================================================================

/**
 * Click the Apply button inside the Section Person Function filter dialog.
 */
Then(
    'User clicks the Apply button in Section Person Function filter dialog',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionPersonFunctionBasicFilterPage.clickApply();
    }
);

/**
 * Click the Reset button inside the Section Person Function filter dialog.
 * Used to clear previous filter state before selecting a new badge value (e.g. Status).
 */
Then(
    'User clicks the Reset button in Section Person Function filter dialog',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionPersonFunctionBasicFilterPage.clickReset();
    }
);

// ======================================================================
// API – CAPTURE & PRINT
// ======================================================================

/**
 * Begin intercepting the section person function list API response.
 * Must be called BEFORE clicking Apply so the listener is registered in time.
 */
Then(
    'User starts capturing the section person function list API response',
    { timeout: 10000 },
    async function () {
        this.pages.clubSectionPersonFunctionBasicFilterPage.startCapturingAPI();
    }
);

/**
 * Await the captured section person function list API response and print it as formatted JSON.
 * Stores the response body on this.sectionPersonFunctionAPIResponse for further assertions.
 */
Then(
    'User awaits and prints the section person function API response as JSON',
    { timeout: 90000 },
    async function () {
        this.sectionPersonFunctionAPIResponse =
            await this.pages.clubSectionPersonFunctionBasicFilterPage.awaitAndPrintAPIResponse();
    }
);

/**
 * Assert that the last captured API response has a total count greater than zero.
 */
Then(
    'User verifies the section person function API total count is greater than zero',
    { timeout: 30000 },
    async function () {
        await this.pages.clubSectionPersonFunctionBasicFilterPage.verifyAPITotalGreaterThanZero(
            this.sectionPersonFunctionAPIResponse
        );
    }
);

// ======================================================================
// GRID VERIFICATION
// ======================================================================

/**
 * Verify the Section Person Function grid displays at least one record after filter is applied.
 */
Then(
    'User verifies the Section Person Function grid displays matching records',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionPersonFunctionBasicFilterPage.verifyGridHasRecords();
    }
);
