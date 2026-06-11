const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60 * 1000);

// ======================================================================
// NAVIGATION – SEASON TAB
// ======================================================================

/**
 * Click the "Season" tab inside Competition Management sidebar.
 */
Then(
    'User clicks the Season tab in Competition Management sidebar',
    { timeout: 60000 },
    async function () {
        await this.pages.seasonConfigBasicFilterPage.clickSeasonTab();
    }
);

// ======================================================================
// NAVIGATION – HOME TAB
// ======================================================================

/**
 * Click the "Home" sub-tab in Season management.
 */
Then(
    'User clicks the Home tab in Season management',
    { timeout: 60000 },
    async function () {
        await this.pages.seasonConfigBasicFilterPage.clickHomeTab();
    }
);

// ======================================================================
// NAVIGATION – QUICK SEARCH ICON
// ======================================================================

/**
 * Click the quick search icon on the Season listing page.
 */
Then(
    'User clicks the quick search icon on Season listing',
    { timeout: 30000 },
    async function () {
        await this.pages.seasonConfigBasicFilterPage.clickQuickSearchIcon();
    }
);

// ======================================================================
// NAVIGATION – SEARCH FOR SEASON
// ======================================================================

/**
 * Type the given season name into the season quick search popup.
 */
Then(
    'User searches for {string} in season quick search popup',
    { timeout: 30000 },
    async function (seasonName) {
        await this.pages.seasonConfigBasicFilterPage.searchForSeason(seasonName);
    }
);

// ======================================================================
// NAVIGATION – CLOSE SEARCH POPUP
// ======================================================================

/**
 * Close the season quick search popup.
 */
Then(
    'User closes the season quick search popup',
    { timeout: 15000 },
    async function () {
        await this.pages.seasonConfigBasicFilterPage.closeSearchPopup();
    }
);

// ======================================================================
// NAVIGATION – CLICK FIRST SEASON RECORD
// ======================================================================

/**
 * Click the first visible season record in the listing grid.
 */
Then(
    'User clicks on the first season record in listing',
    { timeout: 30000 },
    async function () {
        await this.pages.seasonConfigBasicFilterPage.clickFirstListedRecord();
    }
);

// ======================================================================
// NAVIGATION – CONFIGURATIONS TAB
// ======================================================================

/**
 * Click the "Configurations" tab in the season detail page.
 */
Then(
    'User clicks the Configurations tab in season detail page',
    { timeout: 30000 },
    async function () {
        await this.pages.seasonConfigBasicFilterPage.clickConfigurationsTab();
    }
);

// ======================================================================
// FILTER DIALOG – OPEN (FILTER ICON)
// ======================================================================

/**
 * Click the filter icon on the Season Configuration listing page to open the filter dialog.
 */
Then(
    'User clicks the Season Configuration filter icon',
    { timeout: 60000 },
    async function () {
        await this.pages.seasonConfigBasicFilterPage.clickFilterIcon();
    }
);

// ======================================================================
// FILTER DIALOG – TAB
// ======================================================================

/**
 * Click a specific tab (e.g. "Basic Filter") inside the Season Configuration filter dialog.
 */
Then(
    'User clicks the {string} tab in Season Configuration filter dialog',
    { timeout: 15000 },
    async function (tabName) {
        await this.pages.seasonConfigBasicFilterPage.clickBasicFilterTab();
    }
);

// ======================================================================
// APPLY FILTER CRITERIA (DataTable driven)
// ======================================================================

/**
 * Apply Season Configuration Basic Filter criteria from a DataTable.
 *
 * Supported FilterField values:
 *   Federation        – multiselect
 *   Format            – badge buttons (Football / Futsal / Mini-football)
 *   Region            – multiselect
 *   Type              – multiselect
 *   Competition Type  – multiselect
 *   Time Frame        – date range picker (DD/MM/YYYY - DD/MM/YYYY)
 */
Then(
    'User applies Season Configuration Basic Filter with following criteria',
    { timeout: 90000 },
    async function (dataTable) {
        const criteria = dataTable.rowsHash();
        await this.pages.seasonConfigBasicFilterPage.applySeasonConfigBasicFilterCriteria(criteria);
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

/**
 * Start listening for the Season Configuration /season/configuration/list API response.
 * Must be called BEFORE clicking Apply.
 */
Then(
    'User starts capturing the Season Configuration basic filter API response',
    { timeout: 15000 },
    async function () {
        this.pages.seasonConfigBasicFilterPage.startCapturingAPIResponse();
    }
);

// ======================================================================
// APPLY BUTTON
// ======================================================================

/**
 * Click the Apply button inside the Season Configuration filter dialog.
 */
Then(
    'User clicks the Apply button in Season Configuration filter dialog',
    { timeout: 30000 },
    async function () {
        await this.pages.seasonConfigBasicFilterPage.clickApplyButton();
    }
);

// ======================================================================
// API – AWAIT + COUNT VERIFICATION
// ======================================================================

/**
 * Await the captured API response and verify total count > 0.
 * Stores the body on `this.seasonConfigAPIBody` for subsequent steps.
 */
Then(
    'User verifies the Season Configuration basic filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.seasonConfigAPIBody = await this.pages.seasonConfigBasicFilterPage.awaitAPIResponse();
        await this.pages.seasonConfigBasicFilterPage.verifyAPITotalGreaterThanZero(this.seasonConfigAPIBody);
    }
);

// ======================================================================
// API – PRINT JSON
// ======================================================================

/**
 * Print the captured Season Configuration API response body as formatted JSON.
 */
Then(
    'User prints the Season Configuration basic filter API response JSON',
    { timeout: 10000 },
    async function () {
        this.pages.seasonConfigBasicFilterPage.printAPIResponseJSON(this.seasonConfigAPIBody);
    }
);

// ======================================================================
// RESET BUTTON
// ======================================================================

/**
 * Click the Reset button inside the Season Configuration filter dialog.
 */
Then(
    'User clicks the Reset button in Season Configuration filter dialog',
    { timeout: 30000 },
    async function () {
        await this.pages.seasonConfigBasicFilterPage.clickResetButton();
    }
);

// ======================================================================
// VERIFY FILTERS CLEARED
// ======================================================================

/**
 * Verify all Season Configuration filter inputs are cleared after Reset.
 */
Then(
    'User verifies that all Season Configuration filters are cleared',
    { timeout: 15000 },
    async function () {
        await this.pages.seasonConfigBasicFilterPage.verifyFiltersCleared();
    }
);
