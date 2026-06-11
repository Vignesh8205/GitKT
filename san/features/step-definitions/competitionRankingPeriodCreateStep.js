const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// PAGE TITLE
// ======================================================================

Then(
    'User verifies the Ranking Period page title',
    { timeout: 30000 },
    async function () {
        await this.pages.rankingPeriodCreatePage.verifyRankingPeriodPageTitle();
    }
);

// ======================================================================
// MATCHDAY CONFIGURATION
// ======================================================================

Then(
    'User navigate to the Matchday Configuration and fill the Total Matchdays and Number of Groups with {int} and {int}',
    { timeout: 60000 },
    async function (totalMatchdays, numberOfGroups) {
        await this.pages.rankingPeriodCreatePage.fillMatchdayConfiguration(totalMatchdays, numberOfGroups);
    }
);

// ======================================================================
// CONFIGURE GROUPS
// ======================================================================

Then(
    'User click the Configure Groups',
    { timeout: 30000 },
    async function () {
        await this.pages.rankingPeriodCreatePage.clickConfigureGroups();
    }
);

// ======================================================================
// AUTO ASSIGN MATCHDAYS TOGGLE
// ======================================================================

Then(
    'User choose the Auto Assign Matchdays',
    { timeout: 30000 },
    async function () {
        await this.pages.rankingPeriodCreatePage.toggleAutoAssignMatchdays();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the Ranking Period create API response',
    { timeout: 10000 },
    async function () {
        this.pages.rankingPeriodCreatePage.startCapturingAPIResponse();
    }
);

// ======================================================================
// API – AWAIT + VERIFY
// ======================================================================

Then(
    'User verifies the Ranking Period create API response is successful',
    { timeout: 90000 },
    async function () {
        this.rankingPeriodCreateApiResponse =
            await this.pages.rankingPeriodCreatePage.awaitAPIResponse();
        await this.pages.rankingPeriodCreatePage.verifyAPIResponseSuccessful(
            this.rankingPeriodCreateApiResponse
        );
    }
);

// ======================================================================
// API – PRINT
// ======================================================================

Then(
    'User prints the Ranking Period create API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.rankingPeriodCreatePage.printAPIResponseJSON(
            this.rankingPeriodCreateApiResponse
        );
    }
);
