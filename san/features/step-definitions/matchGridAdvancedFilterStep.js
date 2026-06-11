const { Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION
// ======================================================================

Then(
    'User navigates to the Match Grid tab',
    { timeout: 30000 },
    async function () {
        await this.pages.matchGridAdvancedFilterPage.navigateToMatchGridTab();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the match grid list API response',
    { timeout: 10000 },
    async function () {
        this.pages.matchGridAdvancedFilterPage.startCapturingAPIResponse();
    }
);

// ======================================================================
// API – AWAIT + COUNT VERIFICATION
// ======================================================================

Then(
    'User verifies the match grid API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.matchGridAdvancedFilterApiResponse =
            await this.pages.matchGridAdvancedFilterPage.awaitAPIResponse();
        await this.pages.matchGridAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.matchGridAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API – PRINT
// ======================================================================

Then(
    'User prints the match grid API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.matchGridAdvancedFilterPage.printAPIResponseJSON(
            this.matchGridAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all match grid API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.matchGridAdvancedFilterPage.validateApiResponseCondition(
            this.matchGridAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            value
        );
    }
);

// ======================================================================
// API – BETWEEN / NOT BETWEEN VALIDATION
// ======================================================================

Then(
    'User verifies all match grid API records have {string} {string} values {string} and {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, fromValue, toValue) {
        const combinedValue = `${fromValue}|${toValue}`;
        await this.pages.matchGridAdvancedFilterPage.validateApiResponseCondition(
            this.matchGridAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            combinedValue
        );
    }
);

// ======================================================================
// API – OR CONDITIONS VALIDATION
// ======================================================================

Then(
    'User verifies all match grid API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel1, operator1, value1, fieldLabel2, operator2, value2) {
        await this.pages.matchGridAdvancedFilterPage.validateApiResponseORConditions(
            this.matchGridAdvancedFilterApiResponse,
            fieldLabel1,
            operator1,
            value1,
            fieldLabel2,
            operator2,
            value2
        );
    }
);
