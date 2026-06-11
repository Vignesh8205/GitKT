const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// PAGE TITLE
// ======================================================================

Then(
    'User verifies the division page title',
    { timeout: 30000 },
    async function () {
        await this.pages.divisionAdvancedFilterPage.verifyPageTitle();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the division list API response',
    { timeout: 10000 },
    async function () {
        this.pages.divisionAdvancedFilterPage.startCapturingAPIResponse();
    }
);

// ======================================================================
// API – AWAIT + COUNT VERIFICATION
// ======================================================================

Then(
    'User verifies the division API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.divisionAdvancedFilterApiResponse =
            await this.pages.divisionAdvancedFilterPage.awaitAPIResponse();
        await this.pages.divisionAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.divisionAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API – PRINT
// ======================================================================

Then(
    'User prints the division API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.divisionAdvancedFilterPage.printAPIResponseJSON(
            this.divisionAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all division API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.divisionAdvancedFilterPage.validateApiResponseCondition(
            this.divisionAdvancedFilterApiResponse,
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
    'User verifies all division API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.divisionAdvancedFilterPage.validateApiResponseORConditions(
            this.divisionAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all division API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.divisionAdvancedFilterPage.validateApiResponseANDConditions(
            this.divisionAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// GRID – CLICK FIRST RECORD
// ======================================================================

Then(
    'User clicks the first division record in the filtered grid',
    { timeout: 30000 },
    async function () {
        await this.pages.divisionAdvancedFilterPage.clickFirstGridRecord();
    }
);

// ======================================================================
// ELIGIBILITY CRITERIA API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the division eligibility criteria API response',
    { timeout: 10000 },
    async function () {
        this.pages.divisionAdvancedFilterPage.startCapturingEligibilityCriteriaResponse();
    }
);

// ======================================================================
// ELIGIBILITY CRITERIA API – AWAIT
// ======================================================================

Then(
    'User awaits the division eligibility criteria API response',
    { timeout: 90000 },
    async function () {
        this.divisionEligibilityCriteriaApiResponse =
            await this.pages.divisionAdvancedFilterPage.awaitEligibilityCriteriaResponse();
    }
);

// ======================================================================
// ELIGIBILITY CRITERIA API – PRINT
// ======================================================================

Then(
    'User prints the division eligibility criteria API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.divisionAdvancedFilterPage.printEligibilityCriteriaResponseJSON(
            this.divisionEligibilityCriteriaApiResponse
        );
    }
);

// ======================================================================
// ELIGIBILITY CRITERIA – OR CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies the division eligibility criteria satisfies {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.divisionAdvancedFilterPage.validateEligibilityCriteriaORConditions(
            this.divisionEligibilityCriteriaApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// ELIGIBILITY CRITERIA – BETWEEN / NOT BETWEEN VALIDATION
// ======================================================================

Then(
    'User verifies the division eligibility criteria {string} {string} between {string} and {string}',
    { timeout: 30000 },
    async function (field, operator, fromValue, toValue) {
        await this.pages.divisionAdvancedFilterPage.validateEligibilityCriteriaAgeBetween(
            this.divisionEligibilityCriteriaApiResponse,
            field,
            operator,
            fromValue,
            toValue
        );
    }
);
