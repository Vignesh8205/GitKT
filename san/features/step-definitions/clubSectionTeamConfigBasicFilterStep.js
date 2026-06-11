const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – TEAM CONFIGURATION TAB
// ======================================================================

Then(
    'User navigates to the Team Configuration tab on section detail page',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionTeamConfigBasicFilterPage.navigateToTeamConfigTab();
    }
);

// ======================================================================
// FILTER DIALOG – OPEN & VERIFY
// ======================================================================

Then(
    'User clicks the filter button on Team Configuration tab to open filter options',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionTeamConfigBasicFilterPage.openFilterDialog();
    }
);

Then(
    'User verifies {string} tab is displayed in Team Config filter dialog',
    { timeout: 90000 },
    async function (tabName) {
        await this.pages.clubSectionTeamConfigBasicFilterPage.verifyBasicFilterTabVisible();
    }
);

// ======================================================================
// APPLY / RESET
// ======================================================================

Then(
    'User clicks the Apply button in Team Config filter dialog',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionTeamConfigBasicFilterPage.clickApply();
    }
);

Then(
    'User clicks the Reset button in Team Config filter dialog',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionTeamConfigBasicFilterPage.clickReset();
    }
);

// ======================================================================
// APPLY FILTER CRITERIA
// ======================================================================

Then(
    'User applies Team Config Basic Filter with following criteria',
    { timeout: 90000 },
    async function (dataTable) {
        const criteria = dataTable.rowsHash();
        await this.pages.clubSectionTeamConfigBasicFilterPage.applyFilterCriteria(criteria);
    }
);

// ======================================================================
// API – CAPTURE & VALIDATE
// ======================================================================

Then(
    'User starts capturing the Team Config list API response',
    { timeout: 10000 },
    async function () {
        this.pages.clubSectionTeamConfigBasicFilterPage.startCapturingTeamConfigAPI();
    }
);

Then(
    'User prints the Team Config API response JSON',
    { timeout: 90000 },
    async function () {
        this.teamConfigAPIResponse =
            await this.pages.clubSectionTeamConfigBasicFilterPage.awaitAndPrintTeamConfigAPIResponse();
    }
);

Then(
    'User logs UI vs API record count for Team Config',
    { timeout: 30000 },
    async function () {
        await this.pages.clubSectionTeamConfigBasicFilterPage.logUIvsAPICount(this.teamConfigAPIResponse);
    }
);

Then(
    'User verifies the Team Config API total count is greater than zero',
    { timeout: 90000 },
    async function () {
        await this.pages.clubSectionTeamConfigBasicFilterPage.verifyAPITotalGreaterThanZero(
            this.teamConfigAPIResponse
        );
    }
);
