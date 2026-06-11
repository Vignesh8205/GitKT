const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION
// ======================================================================

Then(
    'User navigates to the Date Grid tab',
    { timeout: 30000 },
    async function () {
        await this.pages.dateGridAdvancedFilterPage.navigateToDateGridTab();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the date grid list API response',
    { timeout: 10000 },
    async function () {
        this.pages.dateGridAdvancedFilterPage.startCapturingAPIResponse();
    }
);

// ======================================================================
// API – AWAIT + COUNT VERIFICATION
// ======================================================================

Then(
    'User verifies the date grid API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.dateGridAdvancedFilterApiResponse =
            await this.pages.dateGridAdvancedFilterPage.awaitAPIResponse();
        await this.pages.dateGridAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.dateGridAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API – PRINT
// ======================================================================

Then(
    'User prints the date grid API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.dateGridAdvancedFilterPage.printAPIResponseJSON(
            this.dateGridAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all date grid API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.dateGridAdvancedFilterPage.validateApiResponseCondition(
            this.dateGridAdvancedFilterApiResponse,
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
    'User verifies all date grid API records have {string} {string} values {string} and {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, fromValue, toValue) {
        const combinedValue = `${fromValue}|${toValue}`;
        await this.pages.dateGridAdvancedFilterPage.validateApiResponseCondition(
            this.dateGridAdvancedFilterApiResponse,
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
    'User verifies all date grid API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel1, operator1, value1, fieldLabel2, operator2, value2) {
        await this.pages.dateGridAdvancedFilterPage.validateApiResponseORConditions(
            this.dateGridAdvancedFilterApiResponse,
            fieldLabel1,
            operator1,
            value1,
            fieldLabel2,
            operator2,
            value2
        );
    }
);
