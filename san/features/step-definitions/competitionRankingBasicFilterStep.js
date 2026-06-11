const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// FILTER DIALOG – OPEN & VERIFY
// ======================================================================

Then(
    'User clicks the filter icon on Ranking page to open filter options',
    { timeout: 90000 },
    async function () {
        await this.pages.competitionRankingBasicFilterPage.openFilterDialog();
    }
);

Then(
    'User verifies {string} tab is displayed in Ranking filter dialog',
    { timeout: 30000 },
    async function (tabName) {
        await this.pages.competitionRankingBasicFilterPage.verifyBasicFilterTabVisible();
    }
);

// ======================================================================
// APPLY / RESET
// ======================================================================

Then(
    'User clicks the Apply button in Ranking filter dialog',
    { timeout: 90000 },
    async function () {
        await this.pages.competitionRankingBasicFilterPage.clickApply();
    }
);

Then(
    'User clicks the Reset button in Ranking filter dialog',
    { timeout: 90000 },
    async function () {
        await this.pages.competitionRankingBasicFilterPage.clickReset();
    }
);

// ======================================================================
// APPLY FILTER CRITERIA
// ======================================================================

/**
 * Apply Ranking Basic Filter criteria from a DataTable (rowsHash format).
 *
 * Supported filter fields:
 *   Template Name   – AutoComplete (placeholder: "Search by Template Name")
 *   Status          – Badge button (Active / Inactive)
 *   Ranking Criteria – Badge button (e.g. "Head-to-Head Goal Average")
 *
 * DataTable format (rowsHash):
 *   | FilterField   | FilterValue                   |
 *   | Template Name | RankingTemplate20260413145107  |
 */
Then(
    'User applies Ranking Basic Filter with following criteria',
    { timeout: 90000 },
    async function (dataTable) {
        const criteria = dataTable.rowsHash();
        await this.pages.competitionRankingBasicFilterPage.applyFilterCriteria(criteria);
    }
);

// ======================================================================
// API – CAPTURE & VALIDATE
// ======================================================================

Then(
    'User starts capturing the Ranking filter API response',
    { timeout: 10000 },
    async function () {
        this.pages.competitionRankingBasicFilterPage.startCapturingRankingFilterAPI();
    }
);

Then(
    'User prints the Ranking filter API response JSON',
    { timeout: 90000 },
    async function () {
        this.rankingFilterAPIResponse =
            await this.pages.competitionRankingBasicFilterPage.awaitAndPrintRankingFilterAPIResponse();
    }
);

Then(
    'User verifies the Ranking filter API total count is greater than zero',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingBasicFilterPage.verifyAPITotalGreaterThanZero(
            this.rankingFilterAPIResponse
        );
    }
);

Then(
    'User logs UI vs API record count for Ranking',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingBasicFilterPage.logUIvsAPICount(this.rankingFilterAPIResponse);
    }
);
