const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// FILTER DIALOG – OPEN
// ======================================================================

Then(
    'User opens the Team Configuration filter in club section page',
    { timeout: 30000 },
    async function () {
        await this.pages.clubSectionTeamConfigAdvancedFilterPage.openTeamConfigFilter();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the club section team config advanced filter API response',
    { timeout: 10000 },
    async function () {
        this.pages.clubSectionTeamConfigAdvancedFilterPage.startCapturingAPI();
    }
);

// ======================================================================
// API – AWAIT + COUNT
// ======================================================================

Then(
    'User verifies the club section team config advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.clubSectionTeamConfigAdvancedFilterApiResponse =
            await this.pages.clubSectionTeamConfigAdvancedFilterPage.awaitAPI();
        await this.pages.clubSectionTeamConfigAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.clubSectionTeamConfigAdvancedFilterApiResponse,
            'Team Configuration'
        );
    }
);

// ======================================================================
// API – PRINT
// ======================================================================

Then(
    'User prints the club section team config advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.clubSectionTeamConfigAdvancedFilterPage.printAPIResponseJSON(
            this.clubSectionTeamConfigAdvancedFilterApiResponse,
            'Team Configuration'
        );
    }
);

// ======================================================================
// API – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club section team config advanced filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.clubSectionTeamConfigAdvancedFilterPage.validateApiResponseCondition(
            this.clubSectionTeamConfigAdvancedFilterApiResponse,
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
    'User verifies all club section team config advanced filter API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.clubSectionTeamConfigAdvancedFilterPage.validateApiResponseORConditions(
            this.clubSectionTeamConfigAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club section team config advanced filter API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.clubSectionTeamConfigAdvancedFilterPage.validateApiResponseANDConditions(
            this.clubSectionTeamConfigAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – BETWEEN / NOT BETWEEN VALIDATION
// ======================================================================

Then(
    'User verifies all club section team config advanced filter API records have {string} {string} values {string} and {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, fromValue, toValue) {
        const combinedValue = `${fromValue}|${toValue}`;
        await this.pages.clubSectionTeamConfigAdvancedFilterPage.validateApiResponseCondition(
            this.clubSectionTeamConfigAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            combinedValue
        );
    }
);
