const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – TEAMS TAB
// ======================================================================

Then(
    'User opens the Teams filter in club section page',
    { timeout: 30000 },
    async function () {
        await this.pages.clubSectionTeamsAdvancedFilterPage.openTeamsFilter();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the club section teams advanced filter API response',
    { timeout: 10000 },
    async function () {
        this.pages.clubSectionTeamsAdvancedFilterPage.startCapturingAPI();
    }
);

// ======================================================================
// API – AWAIT + COUNT
// ======================================================================

Then(
    'User verifies the club section teams advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.clubSectionTeamsAdvancedFilterApiResponse =
            await this.pages.clubSectionTeamsAdvancedFilterPage.awaitAPI();
        await this.pages.clubSectionTeamsAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.clubSectionTeamsAdvancedFilterApiResponse,
            'Section Teams'
        );
    }
);

// ======================================================================
// API – PRINT
// ======================================================================

Then(
    'User prints the club section teams advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.clubSectionTeamsAdvancedFilterPage.printAPIResponseJSON(
            this.clubSectionTeamsAdvancedFilterApiResponse,
            'Section Teams'
        );
    }
);

// ======================================================================
// API – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club section teams advanced filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.clubSectionTeamsAdvancedFilterPage.validateApiResponseCondition(
            this.clubSectionTeamsAdvancedFilterApiResponse,
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
    'User verifies all club section teams advanced filter API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.clubSectionTeamsAdvancedFilterPage.validateApiResponseORConditions(
            this.clubSectionTeamsAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club section teams advanced filter API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.clubSectionTeamsAdvancedFilterPage.validateApiResponseANDConditions(
            this.clubSectionTeamsAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – BETWEEN / NOT BETWEEN VALIDATION
// ======================================================================

Then(
    'User verifies all club section teams advanced filter API records have {string} {string} values {string} and {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, fromValue, toValue) {
        const combinedValue = `${fromValue}|${toValue}`;
        await this.pages.clubSectionTeamsAdvancedFilterPage.validateApiResponseCondition(
            this.clubSectionTeamsAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            combinedValue
        );
    }
);
