const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – HOME TAB (Person Management listing)
// ======================================================================

Then(
    'User clicks the Home tab in Person Management',
    { timeout: 30000 },
    async function () {
        await this.pages.personFunctionAdvancedFilterPage.clickHomeTab();
    }
);

// ======================================================================
// PAGE TITLE – FUNCTIONS
// ======================================================================

Then(
    'User verifies the Person Functions page title',
    { timeout: 30000 },
    async function () {
        await this.pages.personFunctionAdvancedFilterPage.verifyPersonFunctionsTitle();
    }
);

// ======================================================================
// CLUB FUNCTION – API CAPTURE
// ======================================================================

Then(
    'User starts capturing the club function advanced filter API response',
    { timeout: 10000 },
    async function () {
        this.pages.personFunctionAdvancedFilterPage.startCapturingClubFunctionAPIResponse();
    }
);

// ======================================================================
// CLUB FUNCTION – API AWAIT + COUNT
// ======================================================================

Then(
    'User verifies the club function advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.clubFunctionAdvancedFilterApiResponse =
            await this.pages.personFunctionAdvancedFilterPage.awaitClubFunctionAPIResponse();
        await this.pages.personFunctionAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.clubFunctionAdvancedFilterApiResponse,
            'Club Function'
        );
    }
);

// ======================================================================
// CLUB FUNCTION – API PRINT
// ======================================================================

Then(
    'User prints the club function advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.personFunctionAdvancedFilterPage.printAPIResponseJSON(
            this.clubFunctionAdvancedFilterApiResponse,
            'Club Function'
        );
    }
);

// ======================================================================
// CLUB FUNCTION – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club function advanced filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.personFunctionAdvancedFilterPage.validateApiResponseCondition(
            this.clubFunctionAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            value
        );
    }
);

// ======================================================================
// CLUB FUNCTION – OR CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club function advanced filter API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.personFunctionAdvancedFilterPage.validateApiResponseORConditions(
            this.clubFunctionAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// CLUB FUNCTION – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club function advanced filter API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.personFunctionAdvancedFilterPage.validateApiResponseANDConditions(
            this.clubFunctionAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// SECTION FUNCTION – API CAPTURE
// ======================================================================

Then(
    'User starts capturing the section function advanced filter API response',
    { timeout: 10000 },
    async function () {
        this.pages.personFunctionAdvancedFilterPage.startCapturingSectionFunctionAPIResponse();
    }
);

// ======================================================================
// SECTION FUNCTION – API AWAIT + COUNT
// ======================================================================

Then(
    'User verifies the section function advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.sectionFunctionAdvancedFilterApiResponse =
            await this.pages.personFunctionAdvancedFilterPage.awaitSectionFunctionAPIResponse();
        await this.pages.personFunctionAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.sectionFunctionAdvancedFilterApiResponse,
            'Section Function'
        );
    }
);

// ======================================================================
// SECTION FUNCTION – API PRINT
// ======================================================================

Then(
    'User prints the section function advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.personFunctionAdvancedFilterPage.printAPIResponseJSON(
            this.sectionFunctionAdvancedFilterApiResponse,
            'Section Function'
        );
    }
);

// ======================================================================
// SECTION FUNCTION – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all section function advanced filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.personFunctionAdvancedFilterPage.validateApiResponseCondition(
            this.sectionFunctionAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            value
        );
    }
);

// ======================================================================
// SECTION FUNCTION – OR CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all section function advanced filter API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.personFunctionAdvancedFilterPage.validateApiResponseORConditions(
            this.sectionFunctionAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// SECTION FUNCTION – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all section function advanced filter API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.personFunctionAdvancedFilterPage.validateApiResponseANDConditions(
            this.sectionFunctionAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// TEAM FUNCTION – API CAPTURE
// ======================================================================

Then(
    'User starts capturing the team function advanced filter API response',
    { timeout: 10000 },
    async function () {
        this.pages.personFunctionAdvancedFilterPage.startCapturingTeamFunctionAPIResponse();
    }
);

// ======================================================================
// TEAM FUNCTION – API AWAIT + COUNT
// ======================================================================

Then(
    'User verifies the team function advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.teamFunctionAdvancedFilterApiResponse =
            await this.pages.personFunctionAdvancedFilterPage.awaitTeamFunctionAPIResponse();
        await this.pages.personFunctionAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.teamFunctionAdvancedFilterApiResponse,
            'Team Function'
        );
    }
);

// ======================================================================
// TEAM FUNCTION – API PRINT
// ======================================================================

Then(
    'User prints the team function advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.personFunctionAdvancedFilterPage.printAPIResponseJSON(
            this.teamFunctionAdvancedFilterApiResponse,
            'Team Function'
        );
    }
);

// ======================================================================
// TEAM FUNCTION – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all team function advanced filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.personFunctionAdvancedFilterPage.validateApiResponseCondition(
            this.teamFunctionAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            value
        );
    }
);

// ======================================================================
// TEAM FUNCTION – OR CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all team function advanced filter API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.personFunctionAdvancedFilterPage.validateApiResponseORConditions(
            this.teamFunctionAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// TEAM FUNCTION – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all team function advanced filter API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.personFunctionAdvancedFilterPage.validateApiResponseANDConditions(
            this.teamFunctionAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// CLUB FUNCTION – BETWEEN / NOT BETWEEN VALIDATION
// ======================================================================

Then(
    'User verifies all club function advanced filter API records have {string} {string} values {string} and {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, fromValue, toValue) {
        const combinedValue = `${fromValue}|${toValue}`;
        await this.pages.personFunctionAdvancedFilterPage.validateApiResponseCondition(
            this.clubFunctionAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            combinedValue
        );
    }
);

// ======================================================================
// SECTION FUNCTION – BETWEEN / NOT BETWEEN VALIDATION
// ======================================================================

Then(
    'User verifies all section function advanced filter API records have {string} {string} values {string} and {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, fromValue, toValue) {
        const combinedValue = `${fromValue}|${toValue}`;
        await this.pages.personFunctionAdvancedFilterPage.validateApiResponseCondition(
            this.sectionFunctionAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            combinedValue
        );
    }
);

// ======================================================================
// TEAM FUNCTION – BETWEEN / NOT BETWEEN VALIDATION
// ======================================================================

Then(
    'User verifies all team function advanced filter API records have {string} {string} values {string} and {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, fromValue, toValue) {
        const combinedValue = `${fromValue}|${toValue}`;
        await this.pages.personFunctionAdvancedFilterPage.validateApiResponseCondition(
            this.teamFunctionAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            combinedValue
        );
    }
);
