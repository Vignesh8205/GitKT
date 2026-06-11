const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – SECTIONS TAB
// ======================================================================

Then(
    'User navigates to the Sections tab on club detail page',
    { timeout: 30000 },
    async function () {
        await this.pages.clubSectionPersonFunctionAdvancedFilterPage.navigateToSectionsTab();
    }
);

// ======================================================================
// FILTER DIALOG – OPEN
// ======================================================================

Then(
    'User opens the section person function filter in club section page',
    { timeout: 30000 },
    async function () {
        await this.pages.clubSectionPersonFunctionAdvancedFilterPage.openPersonFunctionFilter();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the club section person function advanced filter API response',
    { timeout: 10000 },
    async function () {
        this.pages.clubSectionPersonFunctionAdvancedFilterPage.startCapturingAPI();
    }
);

// ======================================================================
// API – AWAIT + COUNT
// ======================================================================

Then(
    'User verifies the club section person function advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.clubSectionPFAdvancedFilterApiResponse =
            await this.pages.clubSectionPersonFunctionAdvancedFilterPage.awaitAPI();
        await this.pages.clubSectionPersonFunctionAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.clubSectionPFAdvancedFilterApiResponse,
            'Section Person Function'
        );
    }
);

// ======================================================================
// API – PRINT
// ======================================================================

Then(
    'User prints the club section person function advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.clubSectionPersonFunctionAdvancedFilterPage.printAPIResponseJSON(
            this.clubSectionPFAdvancedFilterApiResponse,
            'Section Person Function'
        );
    }
);

// ======================================================================
// API – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club section person function advanced filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.clubSectionPersonFunctionAdvancedFilterPage.validateApiResponseCondition(
            this.clubSectionPFAdvancedFilterApiResponse,
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
    'User verifies all club section person function advanced filter API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.clubSectionPersonFunctionAdvancedFilterPage.validateApiResponseORConditions(
            this.clubSectionPFAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club section person function advanced filter API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.clubSectionPersonFunctionAdvancedFilterPage.validateApiResponseANDConditions(
            this.clubSectionPFAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – BETWEEN / NOT BETWEEN VALIDATION
// ======================================================================

Then(
    'User verifies all club section person function advanced filter API records have {string} {string} values {string} and {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, fromValue, toValue) {
        const combinedValue = `${fromValue}|${toValue}`;
        await this.pages.clubSectionPersonFunctionAdvancedFilterPage.validateApiResponseCondition(
            this.clubSectionPFAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            combinedValue
        );
    }
);
