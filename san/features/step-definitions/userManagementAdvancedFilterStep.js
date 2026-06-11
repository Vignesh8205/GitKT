const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – SETTINGS TAB
// ======================================================================

Then(
    'User clicks the Settings tab',
    { timeout: 30000 },
    async function () {
        await this.pages.userManagementAdvancedFilterPage.clickSettingsTab();
    }
);

// ======================================================================
// NAVIGATION – USER MANAGEMENT TAB
// ======================================================================

Then(
    'User clicks the User Management tab',
    { timeout: 60000 },
    async function () {
        await this.pages.userManagementAdvancedFilterPage.clickUserManagementTab();
    }
);

// ======================================================================
// PAGE TITLE
// ======================================================================

Then(
    'User verifies the User Management page title',
    { timeout: 30000 },
    async function () {
        await this.pages.userManagementAdvancedFilterPage.verifyUserManagementPageTitle();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the user management advanced filter list API response',
    { timeout: 10000 },
    async function () {
        this.pages.userManagementAdvancedFilterPage.startCapturingAPIResponse();
    }
);

// ======================================================================
// API – AWAIT + COUNT VERIFICATION
// ======================================================================

Then(
    'User verifies the user management advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.userManagementAdvancedFilterApiResponse =
            await this.pages.userManagementAdvancedFilterPage.awaitAPIResponse();
        await this.pages.userManagementAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.userManagementAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API – PRINT
// ======================================================================

Then(
    'User prints the user management advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.userManagementAdvancedFilterPage.printAPIResponseJSON(
            this.userManagementAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all user management advanced filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.userManagementAdvancedFilterPage.validateApiResponseCondition(
            this.userManagementAdvancedFilterApiResponse,
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
    'User verifies all user management advanced filter API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.userManagementAdvancedFilterPage.validateApiResponseORConditions(
            this.userManagementAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all user management advanced filter API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.userManagementAdvancedFilterPage.validateApiResponseANDConditions(
            this.userManagementAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);
