const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – SECTION RECORD & COLLABORATION TAB
// ======================================================================

/**
 * Click the first section record inside the Sections tab grid to open the section detail page.
 */
Then(
    'User clicks the first section record in the sections grid',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionCollaborationBasicFilterPage.clickFirstSectionRecord();
    }
);

/**
 * Navigate to the Collaboration tab on the section detail page.
 */
Then(
    'User navigates to the Collaboration tab on section detail page',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionCollaborationBasicFilterPage.navigateToCollaborationTab();
    }
);

// ======================================================================
// FILTER DIALOG – OPEN
// ======================================================================

/**
 * Click the filter icon on the Collaboration grid to open the basic filter panel.
 */
Then(
    'User clicks the filter button on Collaboration tab',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionCollaborationBasicFilterPage.openFilterDialog();
    }
);

// ======================================================================
// APPLY FILTER CRITERIA
// ======================================================================

/**
 * Apply Collaboration Basic Filter criteria from a DataTable.
 *
 * Supported filter fields (DataTable key column):
 *   Search            – AutoComplete input (placeholder: "Search by Section Name or Registration Number")
 *   Status            – EJ2 MultiSelect  (e.g. "Pending Club")
 *   Division Category – EJ2 MultiSelect  (e.g. "RegeressioTest")
 *   Tags              – EJ2 MultiSelect  (e.g. "Tag002 (Administrative)")
 *
 * DataTable format (rowsHash):
 *   | FilterField | FilterValue |
 */
Then(
    'User applies Collaboration Basic Filter with following criteria',
    { timeout: 90000 },
    async function (dataTable) {
        const criteria = dataTable.rowsHash();
        await this.pages.clubSectionCollaborationBasicFilterPage.applyFilterCriteria(criteria);
    }
);

// ======================================================================
// APPLY BUTTON
// ======================================================================

/**
 * Click the Apply button inside the Collaboration filter dialog.
 */
Then(
    'User clicks the Apply button in Collaboration filter dialog',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionCollaborationBasicFilterPage.clickApply();
    }
);

/**
 * Click the Reset button inside the Collaboration filter dialog.
 */
Then(
    'User clicks the Reset button in Collaboration filter dialog',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionCollaborationBasicFilterPage.clickReset();
    }
);

// ======================================================================
// API – CAPTURE & PRINT
// ======================================================================

/**
 * Begin intercepting the collaboration list API response.
 * Must be called BEFORE clicking Apply so the listener is registered in time.
 */
Then(
    'User starts capturing the collaboration list API response',
    { timeout: 10000 },
    async function () {
        this.pages.clubSectionCollaborationBasicFilterPage.startCapturingCollaborationAPI();
    }
);

/**
 * Await the captured collaboration list API response and print it as formatted JSON to console.
 * Stores the response body on this.collaborationAPIResponse for further validation steps.
 */
Then(
    'User awaits and prints the collaboration API response as JSON',
    { timeout: 90000 },
    async function () {
        this.collaborationAPIResponse =
            await this.pages.clubSectionCollaborationBasicFilterPage.awaitAndPrintCollaborationAPIResponse();
    }
);

/**
 * Assert that the last captured collaboration API response has a total count greater than zero.
 */
Then(
    'User verifies the collaboration API total count is greater than zero',
    { timeout: 30000 },
    async function () {
        await this.pages.clubSectionCollaborationBasicFilterPage.verifyAPITotalGreaterThanZero(
            this.collaborationAPIResponse
        );
    }
);

// ======================================================================
// GRID VERIFICATION
// ======================================================================

/**
 * Verify the Collaboration grid displays at least one record after the filter is applied.
 */
Then(
    'User verifies the Collaboration grid displays matching records',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionCollaborationBasicFilterPage.verifyGridHasRecords();
    }
);
