const { Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');

setDefaultTimeout(2 * 60000);

// ======================================================================
// PAGE TITLE
// ======================================================================

Then(
    'User verifies the competition management page title',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionManagementAdvancedFilterPage.verifyPageTitle();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

/**
 * Arm the competition management list API listener BEFORE clicking Apply.
 */
Then(
    'User starts capturing the competition management list API response',
    { timeout: 10000 },
    async function () {
        this.pages.competitionManagementAdvancedFilterPage.startCapturingAPIResponse();
    }
);

// ======================================================================
// API – AWAIT, COUNT VERIFICATION
// ======================================================================

/**
 * Await the captured API response, store it, and assert total count > 0.
 */
Then(
    'User verifies the competition management API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.competitionManagementApiResponse =
            await this.pages.competitionManagementAdvancedFilterPage.awaitAPIResponse();
        await this.pages.competitionManagementAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.competitionManagementApiResponse
        );
    }
);

// ======================================================================
// API – PRINT
// ======================================================================

/**
 * Pretty-print the already-resolved competition management API response JSON.
 */
Then(
    'User prints the competition management API response JSON',
    { timeout: 30000 },
    async function () {
        console.log('=== Competition Management Advanced Filter API Response JSON ===');
        console.log(JSON.stringify(this.competitionManagementApiResponse, null, 2));
        console.log('=== End of Response ===');
    }
);

// ======================================================================
// API – SINGLE CONDITION VALIDATION
// ======================================================================

/**
 * Validate that every item in the captured API response satisfies field + operator + value.
 */
Then(
    'User verifies all competition management API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.competitionManagementAdvancedFilterPage.validateApiResponseCondition(
            this.competitionManagementApiResponse,
            fieldLabel,
            operator,
            value
        );
    }
);

// ======================================================================
// API – OR CONDITION VALIDATION
// ======================================================================

/**
 * Validate that every item satisfies condition1 OR condition2.
 */
Then(
    'User verifies all competition management API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.competitionManagementAdvancedFilterPage.validateApiResponseORConditions(
            this.competitionManagementApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – AND CONDITION VALIDATION
// ======================================================================

/**
 * Validate that every item satisfies BOTH condition1 AND condition2.
 */
Then(
    'User verifies all competition management API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.competitionManagementAdvancedFilterPage.validateApiResponseANDConditions(
            this.competitionManagementApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – BETWEEN / NOT BETWEEN VALIDATION
// ======================================================================

/**
 * Validate that every item satisfies a Between or Not between condition.
 * fromValue and toValue are combined as "fromValue|toValue" for checkCondition.
 */
Then(
    'User verifies all competition management API records have {string} {string} values {string} and {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, fromValue, toValue) {
        const combinedValue = `${fromValue}|${toValue}`;
        await this.pages.competitionManagementAdvancedFilterPage.validateApiResponseCondition(
            this.competitionManagementApiResponse,
            fieldLabel,
            operator,
            combinedValue
        );
    }
);

// ======================================================================
// GRID – CLICK FIRST RECORD
// ======================================================================

Then(
    'User clicks the first competition record in the filtered grid',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionManagementAdvancedFilterPage.clickFirstGridRecord();
    }
);

// ======================================================================
// DETAIL PAGE – TAB NAVIGATION
// ======================================================================

Then(
    'User navigates to the {string} tab on the competition detail page',
    { timeout: 30000 },
    async function (tabName) {
        await this.pages.competitionManagementAdvancedFilterPage.navigateToTab(tabName);
    }
);

// ======================================================================
// ELIGIBILITY CRITERIA API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the competition eligibility criteria API response',
    { timeout: 10000 },
    async function () {
        this.pages.competitionManagementAdvancedFilterPage.startCapturingEligibilityCriteriaResponse();
    }
);

// ======================================================================
// ELIGIBILITY CRITERIA API – AWAIT
// ======================================================================

Then(
    'User awaits the competition eligibility criteria API response',
    { timeout: 90000 },
    async function () {
        this.eligibilityCriteriaApiResponse =
            await this.pages.competitionManagementAdvancedFilterPage.awaitEligibilityCriteriaResponse();
    }
);

// ======================================================================
// ELIGIBILITY CRITERIA API – PRINT
// ======================================================================

Then(
    'User prints the competition eligibility criteria API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.competitionManagementAdvancedFilterPage.printEligibilityCriteriaResponseJSON(
            this.eligibilityCriteriaApiResponse
        );
    }
);

// ======================================================================
// ELIGIBILITY CRITERIA API – MAX AGE VALIDATION
// ======================================================================

Then(
    'User verifies the eligibility criteria maximum age {string} {string}',
    { timeout: 30000 },
    async function (operator, value) {
        await this.pages.competitionManagementAdvancedFilterPage.validateEligibilityCriteriaMaxAge(
            this.eligibilityCriteriaApiResponse,
            operator,
            value
        );
    }
);

Then(
    'User verifies the eligibility criteria maximum age {string} between {string} and {string}',
    { timeout: 30000 },
    async function (operator, fromValue, toValue) {
        await this.pages.competitionManagementAdvancedFilterPage.validateEligibilityCriteriaMaxAgeBetween(
            this.eligibilityCriteriaApiResponse,
            operator,
            fromValue,
            toValue
        );
    }
);
