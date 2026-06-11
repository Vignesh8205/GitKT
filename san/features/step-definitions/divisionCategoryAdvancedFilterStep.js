const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// OPEN ADVANCED FILTER DIALOG
// ======================================================================

Then(
    'User clicks the filter icon to open Division Category advanced filter',
    { timeout: 30000 },
    async function () {
        await this.pages.divisionCategoryAdvancedFilterPage.openAdvancedFilterDialog();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the Division Category advanced filter list API response',
    { timeout: 10000 },
    async function () {
        this.pages.divisionCategoryAdvancedFilterPage.startCapturingAPIResponse();
    }
);

// ======================================================================
// API – AWAIT + COUNT VERIFICATION
// ======================================================================

Then(
    'User verifies the Division Category advanced filter API total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.divisionCategoryAdvancedFilterApiResponse =
            await this.pages.divisionCategoryAdvancedFilterPage.awaitAPIResponse();
        await this.pages.divisionCategoryAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.divisionCategoryAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API – PRINT
// ======================================================================

Then(
    'User prints the Division Category advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.divisionCategoryAdvancedFilterPage.printAPIResponseJSON(
            this.divisionCategoryAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API VALIDATION – SINGLE CONDITION
// ======================================================================

Then(
    'User verifies all division category API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.divisionCategoryAdvancedFilterPage.validateApiResponseCondition(
            this.divisionCategoryAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            value
        );
    }
);

// ======================================================================
// API VALIDATION – OR CONDITIONS
// ======================================================================

Then(
    'User verifies all division category API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.divisionCategoryAdvancedFilterPage.validateApiResponseORConditions(
            this.divisionCategoryAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API VALIDATION – AND CONDITIONS
// ======================================================================

Then(
    'User verifies all division category API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.divisionCategoryAdvancedFilterPage.validateApiResponseANDConditions(
            this.divisionCategoryAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);
