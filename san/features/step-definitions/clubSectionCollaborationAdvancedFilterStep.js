const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – COLLABORATIONS TAB
// ======================================================================

Then(
    'User navigates to the Collaborations tab on section detail',
    { timeout: 30000 },
    async function () {
        await this.pages.clubSectionCollaborationAdvancedFilterPage.navigateToCollaborationsTab();
    }
);

// ======================================================================
// FILTER DIALOG – OPEN
// ======================================================================

Then(
    'User opens the Collaborations filter in club section page',
    { timeout: 30000 },
    async function () {
        await this.pages.clubSectionCollaborationAdvancedFilterPage.openCollaborationsFilter();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the club section collaboration advanced filter API response',
    { timeout: 10000 },
    async function () {
        this.pages.clubSectionCollaborationAdvancedFilterPage.startCapturingAPI();
    }
);

// ======================================================================
// API – AWAIT + COUNT
// ======================================================================

Then(
    'User verifies the club section collaboration advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.clubSectionCollabAdvancedFilterApiResponse =
            await this.pages.clubSectionCollaborationAdvancedFilterPage.awaitAPI();
        await this.pages.clubSectionCollaborationAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.clubSectionCollabAdvancedFilterApiResponse,
            'Section Collaboration'
        );
    }
);

// ======================================================================
// API – PRINT
// ======================================================================

Then(
    'User prints the club section collaboration advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.clubSectionCollaborationAdvancedFilterPage.printAPIResponseJSON(
            this.clubSectionCollabAdvancedFilterApiResponse,
            'Section Collaboration'
        );
    }
);

// ======================================================================
// API – SINGLE CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club section collaboration advanced filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.clubSectionCollaborationAdvancedFilterPage.validateApiResponseCondition(
            this.clubSectionCollabAdvancedFilterApiResponse,
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
    'User verifies all club section collaboration advanced filter API records satisfy {string} {string} {string} or {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.clubSectionCollaborationAdvancedFilterPage.validateApiResponseORConditions(
            this.clubSectionCollabAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – AND CONDITION VALIDATION
// ======================================================================

Then(
    'User verifies all club section collaboration advanced filter API records satisfy {string} {string} {string} and {string} {string} {string}',
    { timeout: 30000 },
    async function (f1, op1, v1, f2, op2, v2) {
        await this.pages.clubSectionCollaborationAdvancedFilterPage.validateApiResponseANDConditions(
            this.clubSectionCollabAdvancedFilterApiResponse,
            f1, op1, v1,
            f2, op2, v2
        );
    }
);

// ======================================================================
// API – BETWEEN / NOT BETWEEN VALIDATION
// ======================================================================

Then(
    'User verifies all club section collaboration advanced filter API records have {string} {string} values {string} and {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, fromValue, toValue) {
        const combinedValue = `${fromValue}|${toValue}`;
        await this.pages.clubSectionCollaborationAdvancedFilterPage.validateApiResponseCondition(
            this.clubSectionCollabAdvancedFilterApiResponse,
            fieldLabel,
            operator,
            combinedValue
        );
    }
);
