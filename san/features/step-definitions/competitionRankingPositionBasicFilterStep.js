const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – RANKING POSITION SUB TAB
// ======================================================================

Then(
    'User navigates to the Ranking Position sub tab',
    { timeout: 90000 },
    async function () {
        await this.pages.competitionRankingPositionBasicFilterPage.navigateToRankingPositionTab();
    }
);

// ======================================================================
// FILTER DIALOG – OPEN & VERIFY
// ======================================================================

Then(
    'User clicks the filter icon on Ranking Position page to open filter options',
    { timeout: 90000 },
    async function () {
        await this.pages.competitionRankingPositionBasicFilterPage.openFilterDialog();
    }
);

Then(
    'User verifies "Basic Filter" tab is displayed in Ranking Position filter dialog',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingPositionBasicFilterPage.verifyBasicFilterTabVisible();
    }
);

// ======================================================================
// APPLY / RESET
// ======================================================================

Then(
    'User clicks the Apply button in Ranking Position filter dialog',
    { timeout: 90000 },
    async function () {
        await this.pages.competitionRankingPositionBasicFilterPage.clickApply();
    }
);

Then(
    'User clicks the Reset button in Ranking Position filter dialog',
    { timeout: 90000 },
    async function () {
        await this.pages.competitionRankingPositionBasicFilterPage.clickReset();
    }
);

// ======================================================================
// APPLY FILTER CRITERIA
// ======================================================================

/**
 * Apply Ranking Position Basic Filter criteria from a DataTable (rowsHash format).
 *
 * Supported filter fields:
 *   Template Name – AutoComplete (placeholder: "Search by Template Name")
 *   Status        – Badge button (Active / Inactive)
 *   Group Name    – AutoComplete (placeholder: "Search by Group Name")
 *   Total Teams   – AutoComplete (placeholder: "Search by Total Teams")
 *   Groups        – AutoComplete (placeholder: "Search by Groups")
 *
 * DataTable format (rowsHash):
 *   | FilterField   | FilterValue |
 *   | Template Name | AAAATest001 |
 */
Then(
    'User applies Ranking Position Basic Filter with following criteria',
    { timeout: 90000 },
    async function (dataTable) {
        const criteria = dataTable.rowsHash();
        await this.pages.competitionRankingPositionBasicFilterPage.applyFilterCriteria(criteria);
    }
);

// ======================================================================
// API – CAPTURE & VALIDATE
// ======================================================================

Then(
    'User starts capturing the Ranking Position filter API response',
    { timeout: 10000 },
    async function () {
        this.pages.competitionRankingPositionBasicFilterPage.startCapturingRankingPositionFilterAPI();
    }
);

Then(
    'User prints the Ranking Position filter API response JSON',
    { timeout: 90000 },
    async function () {
        this.rankingPositionFilterAPIResponse =
            await this.pages.competitionRankingPositionBasicFilterPage.awaitAndPrintRankingPositionFilterAPIResponse();
    }
);

Then(
    'User verifies the Ranking Position filter API total count is greater than zero',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingPositionBasicFilterPage.verifyAPITotalGreaterThanZero(
            this.rankingPositionFilterAPIResponse
        );
    }
);

Then(
    'User logs UI vs API record count for Ranking Position',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingPositionBasicFilterPage.logUIvsAPICount(
            this.rankingPositionFilterAPIResponse
        );
    }
);
