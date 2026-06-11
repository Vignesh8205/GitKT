const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// PAGE TITLE
// ======================================================================

Then(
    'User verifies the competition config page title',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionConfigAdvancedFilterPage.verifyPageTitle();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the competition config advanced filter list API response',
    { timeout: 10000 },
    async function () {
        this.pages.competitionConfigAdvancedFilterPage.startCapturingAPIResponse();
    }
);

// ======================================================================
// API – AWAIT + COUNT VERIFICATION
// ======================================================================

Then(
    'User verifies the competition config advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.competitionConfigAdvancedFilterApiResponse =
            await this.pages.competitionConfigAdvancedFilterPage.awaitAPIResponse();
        await this.pages.competitionConfigAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.competitionConfigAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API – PRINT
// ======================================================================

Then(
    'User prints the competition config advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.competitionConfigAdvancedFilterPage.printAPIResponseJSON(
            this.competitionConfigAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all competition config advanced filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.competitionConfigAdvancedFilterPage.validateApiResponseCondition(
            this.competitionConfigAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            value
        );
    }
);

// ======================================================================
// API – OR CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all competition config advanced filter API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.competitionConfigAdvancedFilterPage.validateApiResponseORConditions(
            this.competitionConfigAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all competition config advanced filter API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.competitionConfigAdvancedFilterPage.validateApiResponseANDConditions(
            this.competitionConfigAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);
