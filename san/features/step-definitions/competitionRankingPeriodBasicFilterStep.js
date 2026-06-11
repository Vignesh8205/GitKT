const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – RANKING PERIOD SUB TAB
// ======================================================================

Then(
    'User navigates to the Ranking Period sub tab',
    { timeout: 90000 },
    async function () {
        await this.pages.competitionRankingPeriodBasicFilterPage.navigateToRankingPeriodTab();
    }
);

// ======================================================================
// FILTER DIALOG – OPEN & VERIFY
// ======================================================================

Then(
    'User clicks the filter icon on Ranking Period page to open filter options',
    { timeout: 90000 },
    async function () {
        await this.pages.competitionRankingPeriodBasicFilterPage.openFilterDialog();
    }
);

Then(
    'User verifies "Basic Filter" tab is displayed in Ranking Period filter dialog',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingPeriodBasicFilterPage.verifyBasicFilterTabVisible();
    }
);

// ======================================================================
// APPLY / RESET
// ======================================================================

Then(
    'User clicks the Apply button in Ranking Period filter dialog',
    { timeout: 90000 },
    async function () {
        await this.pages.competitionRankingPeriodBasicFilterPage.clickApply();
    }
);

Then(
    'User clicks the Reset button in Ranking Period filter dialog',
    { timeout: 90000 },
    async function () {
        await this.pages.competitionRankingPeriodBasicFilterPage.clickReset();
    }
);

// ======================================================================
// APPLY FILTER CRITERIA
// ======================================================================

/**
 * Apply Ranking Period Basic Filter criteria from a DataTable (rowsHash format).
 *
 * Supported filter fields:
 *   Template Name   – AutoComplete (placeholder: "Search by Template Name")
 *   Status          – Badge button (Active / Inactive)
 *   Group Name      – AutoComplete (placeholder: "Search by Group Name")
 *   Matchday Count  – AutoComplete (placeholder: "Search by Matchday Count")
 *   Groups          – AutoComplete (placeholder: "Search by Groups")
 *
 * DataTable format (rowsHash):
 *   | FilterField   | FilterValue                     |
 *   | Template Name | Business Template Main Template |
 */
Then(
    'User applies Ranking Period Basic Filter with following criteria',
    { timeout: 90000 },
    async function (dataTable) {
        const criteria = dataTable.rowsHash();
        await this.pages.competitionRankingPeriodBasicFilterPage.applyFilterCriteria(criteria);
    }
);

// ======================================================================
// API – CAPTURE & VALIDATE
// ======================================================================

Then(
    'User starts capturing the Ranking Period filter API response',
    { timeout: 10000 },
    async function () {
        this.pages.competitionRankingPeriodBasicFilterPage.startCapturingRankingPeriodFilterAPI();
    }
);

Then(
    'User prints the Ranking Period filter API response JSON',
    { timeout: 90000 },
    async function () {
        this.rankingPeriodFilterAPIResponse =
            await this.pages.competitionRankingPeriodBasicFilterPage.awaitAndPrintRankingPeriodFilterAPIResponse();
    }
);

Then(
    'User verifies the Ranking Period filter API total count is greater than zero',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingPeriodBasicFilterPage.verifyAPITotalGreaterThanZero(
            this.rankingPeriodFilterAPIResponse
        );
    }
);

Then(
    'User logs UI vs API record count for Ranking Period',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingPeriodBasicFilterPage.logUIvsAPICount(
            this.rankingPeriodFilterAPIResponse
        );
    }
);
