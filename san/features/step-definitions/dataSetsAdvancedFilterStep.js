const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – HOME TAB (DATA SETS)
// ======================================================================

Then(
    'User clicks the Home tab in Data Sets',
    { timeout: 30000 },
    async function () {
        await this.pages.dataSetsAdvancedFilterPage.clickHomeTab();
    }
);

// ======================================================================
// PAGE TITLE
// ======================================================================

Then(
    'User verifies the Data Sets page title',
    { timeout: 30000 },
    async function () {
        await this.pages.dataSetsAdvancedFilterPage.verifyDataSetsPageTitle();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the DataSets advanced filter list API response',
    { timeout: 10000 },
    async function () {
        this.pages.dataSetsAdvancedFilterPage.startCapturingAPIResponse();
    }
);

// ======================================================================
// API – AWAIT + COUNT VERIFICATION
// ======================================================================

Then(
    'User verifies the DataSets advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.dataSetsAdvancedFilterApiResponse =
            await this.pages.dataSetsAdvancedFilterPage.awaitAPIResponse();
        await this.pages.dataSetsAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.dataSetsAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API – PRINT
// ======================================================================

Then(
    'User prints the DataSets advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.dataSetsAdvancedFilterPage.printAPIResponseJSON(
            this.dataSetsAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all DataSets advanced filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.dataSetsAdvancedFilterPage.validateApiResponseCondition(
            this.dataSetsAdvancedFilterApiResponse,
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
    'User verifies all DataSets advanced filter API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.dataSetsAdvancedFilterPage.validateApiResponseORConditions(
            this.dataSetsAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all DataSets advanced filter API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.dataSetsAdvancedFilterPage.validateApiResponseANDConditions(
            this.dataSetsAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);
