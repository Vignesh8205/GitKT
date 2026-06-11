const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// FILTER DIALOG – OPEN (single filter covers all person functions)
// ======================================================================

Then(
    'User opens the person function filter in club page',
    { timeout: 30000 },
    async function () {
        await this.pages.clubPersonFunctionAdvancedFilterPage.openPersonFunctionFilter();
    }
);

// ======================================================================
// GENERIC API – CAPTURE (one filter for all function types)
// ======================================================================

Then(
    'User starts capturing the club page person function advanced filter API response',
    { timeout: 10000 },
    async function () {
        this.pages.clubPersonFunctionAdvancedFilterPage.startCapturingPersonFunctionAPI();
    }
);

// ======================================================================
// GENERIC API – AWAIT + COUNT
// ======================================================================

Then(
    'User verifies the club page person function advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.clubPFAdvancedFilterApiResponse =
            await this.pages.clubPersonFunctionAdvancedFilterPage.awaitPersonFunctionAPI();
        await this.pages.clubPersonFunctionAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.clubPFAdvancedFilterApiResponse,
            'Person Function'
        );
    }
);

// ======================================================================
// GENERIC API – PRINT
// ======================================================================

Then(
    'User prints the club page person function advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.clubPersonFunctionAdvancedFilterPage.printAPIResponseJSON(
            this.clubPFAdvancedFilterApiResponse,
            'Person Function'
        );
    }
);

// ======================================================================
// GENERIC API – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club page person function advanced filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.clubPersonFunctionAdvancedFilterPage.validateApiResponseCondition(
            this.clubPFAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            value
        );
    }
);

// ======================================================================
// GENERIC API – OR CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club page person function advanced filter API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.clubPersonFunctionAdvancedFilterPage.validateApiResponseORConditions(
            this.clubPFAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// GENERIC API – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club page person function advanced filter API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.clubPersonFunctionAdvancedFilterPage.validateApiResponseANDConditions(
            this.clubPFAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// GENERIC API – BETWEEN / NOT BETWEEN VALIDATION
// ======================================================================

Then(
    'User verifies all club page person function advanced filter API records have {string} {string} values {string} and {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, fromValue, toValue) {
        const combinedValue = `${fromValue}|${toValue}`;
        await this.pages.clubPersonFunctionAdvancedFilterPage.validateApiResponseCondition(
            this.clubPFAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            combinedValue
        );
    }
);

// ======================================================================
// CLUB FUNCTION – API CAPTURE
// ======================================================================

Then(
    'User starts capturing the club page club function advanced filter API response',
    { timeout: 10000 },
    async function () {
        this.pages.clubPersonFunctionAdvancedFilterPage.startCapturingClubFunctionAPI();
    }
);

// ======================================================================
// CLUB FUNCTION – API AWAIT + COUNT
// ======================================================================

Then(
    'User verifies the club page club function advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.clubPFClubAdvancedFilterApiResponse =
            await this.pages.clubPersonFunctionAdvancedFilterPage.awaitClubFunctionAPI();
        await this.pages.clubPersonFunctionAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.clubPFClubAdvancedFilterApiResponse,
            'Club Function'
        );
    }
);

// ======================================================================
// CLUB FUNCTION – API PRINT
// ======================================================================

Then(
    'User prints the club page club function advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.clubPersonFunctionAdvancedFilterPage.printAPIResponseJSON(
            this.clubPFClubAdvancedFilterApiResponse,
            'Club Function'
        );
    }
);

// ======================================================================
// CLUB FUNCTION – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club page club function advanced filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.clubPersonFunctionAdvancedFilterPage.validateApiResponseCondition(
            this.clubPFClubAdvancedFilterApiResponse,
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
    'User verifies all club page club function advanced filter API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.clubPersonFunctionAdvancedFilterPage.validateApiResponseORConditions(
            this.clubPFClubAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// CLUB FUNCTION – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club page club function advanced filter API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.clubPersonFunctionAdvancedFilterPage.validateApiResponseANDConditions(
            this.clubPFClubAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// CLUB FUNCTION – BETWEEN / NOT BETWEEN VALIDATION
// ======================================================================

Then(
    'User verifies all club page club function advanced filter API records have {string} {string} values {string} and {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, fromValue, toValue) {
        const combinedValue = `${fromValue}|${toValue}`;
        await this.pages.clubPersonFunctionAdvancedFilterPage.validateApiResponseCondition(
            this.clubPFClubAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            combinedValue
        );
    }
);

// ======================================================================
// SECTION FUNCTION – API CAPTURE
// ======================================================================

Then(
    'User starts capturing the club page section function advanced filter API response',
    { timeout: 10000 },
    async function () {
        this.pages.clubPersonFunctionAdvancedFilterPage.startCapturingSectionFunctionAPI();
    }
);

// ======================================================================
// SECTION FUNCTION – API AWAIT + COUNT
// ======================================================================

Then(
    'User verifies the club page section function advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.clubPFSectionAdvancedFilterApiResponse =
            await this.pages.clubPersonFunctionAdvancedFilterPage.awaitSectionFunctionAPI();
        await this.pages.clubPersonFunctionAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.clubPFSectionAdvancedFilterApiResponse,
            'Section Function'
        );
    }
);

// ======================================================================
// SECTION FUNCTION – API PRINT
// ======================================================================

Then(
    'User prints the club page section function advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.clubPersonFunctionAdvancedFilterPage.printAPIResponseJSON(
            this.clubPFSectionAdvancedFilterApiResponse,
            'Section Function'
        );
    }
);

// ======================================================================
// SECTION FUNCTION – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club page section function advanced filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.clubPersonFunctionAdvancedFilterPage.validateApiResponseCondition(
            this.clubPFSectionAdvancedFilterApiResponse,
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
    'User verifies all club page section function advanced filter API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.clubPersonFunctionAdvancedFilterPage.validateApiResponseORConditions(
            this.clubPFSectionAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// SECTION FUNCTION – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club page section function advanced filter API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.clubPersonFunctionAdvancedFilterPage.validateApiResponseANDConditions(
            this.clubPFSectionAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// SECTION FUNCTION – BETWEEN / NOT BETWEEN VALIDATION
// ======================================================================

Then(
    'User verifies all club page section function advanced filter API records have {string} {string} values {string} and {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, fromValue, toValue) {
        const combinedValue = `${fromValue}|${toValue}`;
        await this.pages.clubPersonFunctionAdvancedFilterPage.validateApiResponseCondition(
            this.clubPFSectionAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            combinedValue
        );
    }
);

// ======================================================================
// TEAM FUNCTION – API CAPTURE
// ======================================================================

Then(
    'User starts capturing the club page team function advanced filter API response',
    { timeout: 10000 },
    async function () {
        this.pages.clubPersonFunctionAdvancedFilterPage.startCapturingTeamFunctionAPI();
    }
);

// ======================================================================
// TEAM FUNCTION – API AWAIT + COUNT
// ======================================================================

Then(
    'User verifies the club page team function advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.clubPFTeamAdvancedFilterApiResponse =
            await this.pages.clubPersonFunctionAdvancedFilterPage.awaitTeamFunctionAPI();
        await this.pages.clubPersonFunctionAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.clubPFTeamAdvancedFilterApiResponse,
            'Team Function'
        );
    }
);

// ======================================================================
// TEAM FUNCTION – API PRINT
// ======================================================================

Then(
    'User prints the club page team function advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.clubPersonFunctionAdvancedFilterPage.printAPIResponseJSON(
            this.clubPFTeamAdvancedFilterApiResponse,
            'Team Function'
        );
    }
);

// ======================================================================
// TEAM FUNCTION – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club page team function advanced filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.clubPersonFunctionAdvancedFilterPage.validateApiResponseCondition(
            this.clubPFTeamAdvancedFilterApiResponse,
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
    'User verifies all club page team function advanced filter API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.clubPersonFunctionAdvancedFilterPage.validateApiResponseORConditions(
            this.clubPFTeamAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// TEAM FUNCTION – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club page team function advanced filter API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.clubPersonFunctionAdvancedFilterPage.validateApiResponseANDConditions(
            this.clubPFTeamAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// TEAM FUNCTION – BETWEEN / NOT BETWEEN VALIDATION
// ======================================================================

Then(
    'User verifies all club page team function advanced filter API records have {string} {string} values {string} and {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, fromValue, toValue) {
        const combinedValue = `${fromValue}|${toValue}`;
        await this.pages.clubPersonFunctionAdvancedFilterPage.validateApiResponseCondition(
            this.clubPFTeamAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            combinedValue
        );
    }
);
