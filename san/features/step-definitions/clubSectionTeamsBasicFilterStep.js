const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – TEAMS TAB
// ======================================================================

Then(
    'User navigates to the Teams tab on section detail page',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionTeamsBasicFilterPage.navigateToTeamsTab();
    }
);

// ======================================================================
// FILTER DIALOG – OPEN & VERIFY
// ======================================================================

Then(
    'User clicks the filter button on Teams tab to open filter options',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionTeamsBasicFilterPage.openFilterDialog();
    }
);

Then(
    'User verifies {string} tab is displayed in Teams filter dialog',
    { timeout: 90000 },
    async function (tabName) {
        await this.pages.clubSectionTeamsBasicFilterPage.verifyBasicFilterTabVisible();
    }
);

// ======================================================================
// APPLY / RESET
// ======================================================================

Then(
    'User clicks the Apply button in Teams filter dialog',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionTeamsBasicFilterPage.clickApply();
    }
);

Then(
    'User clicks the Reset button in Teams filter dialog',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionTeamsBasicFilterPage.clickReset();
    }
);

// ======================================================================
// APPLY FILTER CRITERIA
// ======================================================================

/**
 * Apply Teams Basic Filter criteria from a DataTable (rowsHash format).
 *
 * Supported filter fields:
 *   Search            – AutoComplete (placeholder: "Search by Division Category or Team Classification")
 *   Status            – Badge button (Active / Inactive)
 *   Gender            – Badge button (Female / Male)
 *   Division Category – Badge button or EJ2 MultiSelect
 *   Team Classification – Badge button or EJ2 MultiSelect
 *   Suffix            – Badge button
 *   Default Day       – EJ2 MultiSelect (checkbox mode)
 *   Pitch             – EJ2 MultiSelect (checkbox mode)
 *   Organization      – EJ2 MultiSelect (checkbox mode)
 *   Squad Size        – Numeric input
 *   Team Level        – EJ2 MultiSelect (checkbox mode)
 *   Tags              – EJ2 MultiSelect (checkbox mode)
 *
 * DataTable format (rowsHash):
 *   | FilterField | FilterValue |
 *   | Status      | Active      |
 */
Then(
    'User applies Teams Basic Filter with following criteria',
    { timeout: 90000 },
    async function (dataTable) {
        const criteria = dataTable.rowsHash();
        await this.pages.clubSectionTeamsBasicFilterPage.applyFilterCriteria(criteria);
    }
);

// ======================================================================
// API – CAPTURE & VALIDATE
// ======================================================================

Then(
    'User starts capturing the Teams list API response',
    { timeout: 10000 },
    async function () {
        this.pages.clubSectionTeamsBasicFilterPage.startCapturingTeamsAPI();
    }
);

Then(
    'User verifies the Teams API total count is greater than zero',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionTeamsBasicFilterPage.verifyAPITotalGreaterThanZero(
            this.teamsAPIResponse
        );
    }
);

Then(
    'User prints the Teams API response JSON',
    { timeout: 90000 },
    async function () {
        this.teamsAPIResponse =
            await this.pages.clubSectionTeamsBasicFilterPage.awaitAndPrintTeamsAPIResponse();
    }
);

Then(
    'User logs UI vs API record count for Teams',
    { timeout: 30000 },
    async function () {
        await this.pages.clubSectionTeamsBasicFilterPage.logUIvsAPICount(this.teamsAPIResponse);
    }
);
