const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – ORGANIZATION TAB
// ======================================================================

Then(
    'User clicks the Organization tab',
    { timeout: 60000 },
    async function () {
        await this.pages.organizationAdvancedFilterPage.clickOrganizationTab();
    }
);

// ======================================================================
// NAVIGATION – HOME TAB (ORGANIZATION)
// ======================================================================

Then(
    'User clicks the Home tab in Organization',
    { timeout: 30000 },
    async function () {
        await this.pages.organizationAdvancedFilterPage.clickHomeTab();
    }
);

// ======================================================================
// PAGE TITLE
// ======================================================================

Then(
    'User verifies the Organization page title',
    { timeout: 30000 },
    async function () {
        await this.pages.organizationAdvancedFilterPage.verifyOrganizationPageTitle();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the organization advanced filter list API response',
    { timeout: 10000 },
    async function () {
        this.pages.organizationAdvancedFilterPage.startCapturingAPIResponse();
    }
);

// ======================================================================
// API – AWAIT + COUNT VERIFICATION
// ======================================================================

Then(
    'User verifies the organization advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.organizationAdvancedFilterApiResponse =
            await this.pages.organizationAdvancedFilterPage.awaitAPIResponse();
        await this.pages.organizationAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.organizationAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API – PRINT
// ======================================================================

Then(
    'User prints the organization advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.organizationAdvancedFilterPage.printAPIResponseJSON(
            this.organizationAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all organization advanced filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.organizationAdvancedFilterPage.validateApiResponseCondition(
            this.organizationAdvancedFilterApiResponse,
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
    'User verifies all organization advanced filter API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.organizationAdvancedFilterPage.validateApiResponseORConditions(
            this.organizationAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all organization advanced filter API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.organizationAdvancedFilterPage.validateApiResponseANDConditions(
            this.organizationAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);
