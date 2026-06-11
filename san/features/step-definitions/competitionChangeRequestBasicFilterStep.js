const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – TEMPLATES MENU ITEM & CHANGE REQUEST SUB TAB
// ======================================================================

/**
 * Click the Templates tree menu item inside Competition Management.
 */
Then(
    'User navigates to the Templates option',
    { timeout: 90000 },
    async function () {
        await this.pages.competitionChangeRequestBasicFilterPage.navigateToTemplatesMenuItem();
    }
);

/**
 * Click the Change Request sub-tab inside Competition Management.
 */
Then(
    'User navigates to the Change Request sub tab',
    { timeout: 90000 },
    async function () {
        await this.pages.competitionChangeRequestBasicFilterPage.navigateToChangeRequestTab();
    }
);

/**
 * Verify the Change Request page title is visible.
 */
Then(
    'User verifies the Change Request page title',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionChangeRequestBasicFilterPage.verifyChangeRequestTitle();
    }
);

// ======================================================================
// FILTER DIALOG – OPEN
// ======================================================================

/**
 * Click the filter icon on the Change Request grid to open the filter panel.
 */
Then(
    'User clicks the filter icon on Change Request tab',
    { timeout: 90000 },
    async function () {
        await this.pages.competitionChangeRequestBasicFilterPage.openFilterDialog();
    }
);

// ======================================================================
// APPLY FILTER CRITERIA
// ======================================================================

/**
 * Apply Change Request Basic Filter criteria from a DataTable (rowsHash).
 *
 * Supported filter field keys:
 *   Template Name  – AutoComplete (placeholder: "Search by Template Name")
 *   Status         – Badge button (Active | Inactive)
 *   Season         – EJ2 MultiSelect
 *   Federation     – EJ2 MultiSelect
 *   Region         – EJ2 MultiSelect
 */
Then(
    'User applies Change Request Basic Filter with following criteria',
    { timeout: 90000 },
    async function (dataTable) {
        const criteria = dataTable.rowsHash();
        await this.pages.competitionChangeRequestBasicFilterPage.applyFilterCriteria(criteria);
    }
);

// ======================================================================
// APPLY / RESET BUTTONS
// ======================================================================

/**
 * Click the Apply button inside the Change Request filter dialog.
 */
Then(
    'User clicks the Apply button in Change Request filter dialog',
    { timeout: 90000 },
    async function () {
        await this.pages.competitionChangeRequestBasicFilterPage.clickApply();
    }
);

/**
 * Click the Reset button inside the Change Request filter dialog.
 * Used before selecting a badge (Status) to clear any pre-selected state.
 */
Then(
    'User clicks the Reset button in Change Request filter dialog',
    { timeout: 90000 },
    async function () {
        await this.pages.competitionChangeRequestBasicFilterPage.clickReset();
    }
);

// ======================================================================
// API – CAPTURE & PRINT
// ======================================================================

/**
 * Begin intercepting the change request list API response.
 * Must be called BEFORE clicking Apply so the listener is registered in time.
 */
Then(
    'User starts capturing the change request list API response',
    { timeout: 10000 },
    async function () {
        this.pages.competitionChangeRequestBasicFilterPage.startCapturingAPI();
    }
);

/**
 * Await the captured change request list API response and print it as formatted JSON.
 * Stores the body on this.changeRequestAPIResponse for further assertions.
 */
Then(
    'User awaits and prints the change request API response as JSON',
    { timeout: 90000 },
    async function () {
        this.changeRequestAPIResponse =
            await this.pages.competitionChangeRequestBasicFilterPage.awaitAndPrintAPIResponse();
    }
);

/**
 * Assert the last captured API response has a total count greater than zero.
 */
Then(
    'User verifies the change request API total count is greater than zero',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionChangeRequestBasicFilterPage.verifyAPITotalGreaterThanZero(
            this.changeRequestAPIResponse
        );
    }
);

// ======================================================================
// GRID VERIFICATION
// ======================================================================

/**
 * Verify the Change Request grid displays at least one record after filter is applied.
 */
Then(
    'User verifies the Change Request grid displays matching records',
    { timeout: 90000 },
    async function () {
        await this.pages.competitionChangeRequestBasicFilterPage.verifyGridHasRecords();
    }
);
