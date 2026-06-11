const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60 * 1000);

// ======================================================================
// OPEN ADVANCED FILTER DIALOG
// ======================================================================

/**
 * Click the Season Configuration filter icon to open the advanced filter dialog.
 * This is a distinct step name from the basic filter icon to clearly convey
 * that it opens the advanced filter dialog.
 */
Then(
    'User clicks the Season Configuration Advanced Filter icon',
    { timeout: 60000 },
    async function () {
        await this.pages.seasonConfigAdvancedFilterPage.openAdvancedFilterDialog();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

/**
 * Start intercepting the Season Configuration list API response.
 * Must be called BEFORE clicking the Apply Advanced Filter button.
 */
Then(
    'User starts capturing the Season Configuration advanced filter API response',
    { timeout: 15000 },
    async function () {
        this.pages.seasonConfigAdvancedFilterPage.startCapturingAPI();
    }
);

// ======================================================================
// API – AWAIT + COUNT VERIFICATION
// ======================================================================

/**
 * Await the captured API response and verify total count > 0.
 * Stores the body on `this.seasonConfigAdvancedFilterApiResponse` for subsequent steps.
 */
Then(
    'User verifies the Season Configuration advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.seasonConfigAdvancedFilterApiResponse =
            await this.pages.seasonConfigAdvancedFilterPage.awaitAPI();
        await this.pages.seasonConfigAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.seasonConfigAdvancedFilterApiResponse,
            'Season Config'
        );
    }
);

// ======================================================================
// API – PRINT JSON
// ======================================================================

/**
 * Print the captured Season Configuration advanced filter API response as formatted JSON.
 */
Then(
    'User prints the Season Configuration advanced filter API response JSON',
    { timeout: 10000 },
    async function () {
        this.pages.seasonConfigAdvancedFilterPage.printAPIResponseJSON(
            this.seasonConfigAdvancedFilterApiResponse,
            'Season Config'
        );
    }
);

// ======================================================================
// API – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all Season Config advanced filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.seasonConfigAdvancedFilterPage.validateApiResponseCondition(
            this.seasonConfigAdvancedFilterApiResponse,
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
    'User verifies all Season Config advanced filter API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.seasonConfigAdvancedFilterPage.validateApiResponseORConditions(
            this.seasonConfigAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all Season Config advanced filter API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.seasonConfigAdvancedFilterPage.validateApiResponseANDConditions(
            this.seasonConfigAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – BETWEEN / NOT BETWEEN VALIDATION
// ======================================================================

Then(
    'User verifies all Season Config advanced filter API records have {string} {string} values {string} and {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, fromValue, toValue) {
        const combinedValue = `${fromValue}|${toValue}`;
        await this.pages.seasonConfigAdvancedFilterPage.validateApiResponseCondition(
            this.seasonConfigAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            combinedValue
        );
    }
);
