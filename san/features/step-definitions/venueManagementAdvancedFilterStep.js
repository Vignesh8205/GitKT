const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – VENUE MANAGEMENT TAB
// ======================================================================

Then(
    'User clicks the Venue Management tab',
    { timeout: 60000 },
    async function () {
        await this.pages.venueManagementAdvancedFilterPage.clickVenueManagementTab();
    }
);

// ======================================================================
// NAVIGATION – HOME TAB
// ======================================================================

Then(
    'User clicks the Home tab in Venue Management',
    { timeout: 30000 },
    async function () {
        await this.pages.venueManagementAdvancedFilterPage.clickHomeTab();
    }
);

// ======================================================================
// PAGE TITLE
// ======================================================================

Then(
    'User verifies the Venue Management page title',
    { timeout: 30000 },
    async function () {
        await this.pages.venueManagementAdvancedFilterPage.verifyVenueManagementPageTitle();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the venue management advanced filter list API response',
    { timeout: 10000 },
    async function () {
        this.pages.venueManagementAdvancedFilterPage.startCapturingAPIResponse();
    }
);

// ======================================================================
// API – AWAIT + COUNT VERIFICATION
// ======================================================================

Then(
    'User verifies the venue management advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.venueManagementAdvancedFilterApiResponse =
            await this.pages.venueManagementAdvancedFilterPage.awaitAPIResponse();
        await this.pages.venueManagementAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.venueManagementAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API – PRINT
// ======================================================================

Then(
    'User prints the venue management advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.venueManagementAdvancedFilterPage.printAPIResponseJSON(
            this.venueManagementAdvancedFilterApiResponse
        );
    }
);

// ======================================================================
// API – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all venue management advanced filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.venueManagementAdvancedFilterPage.validateApiResponseCondition(
            this.venueManagementAdvancedFilterApiResponse,
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
    'User verifies all venue management advanced filter API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.venueManagementAdvancedFilterPage.validateApiResponseORConditions(
            this.venueManagementAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all venue management advanced filter API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.venueManagementAdvancedFilterPage.validateApiResponseANDConditions(
            this.venueManagementAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);
