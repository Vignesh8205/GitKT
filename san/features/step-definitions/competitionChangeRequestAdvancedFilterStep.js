const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the change request advanced filter API response',
    { timeout: 10000 },
    async function () {
        this.pages.competitionChangeRequestAdvancedFilterPage.startCapturingAPI();
    }
);

// ======================================================================
// APPLY BUTTON
// ======================================================================

Then(
    'User clicks the Apply Advanced Filter button on Change Request',
    { timeout: 60000 },
    async function () {
        await this.pages.competitionChangeRequestAdvancedFilterPage.clickApplyAdvancedFilterButton();
    }
);

// ======================================================================
// API – AWAIT, PRINT, COUNT VERIFICATION
// ======================================================================

/**
 * Await the captured API response, store it, print it, and assert total count > 0.
 */
Then(
    'User verifies the change request advanced filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.changeRequestAdvancedFilterApiResponse =
            await this.pages.competitionChangeRequestAdvancedFilterPage.awaitAndPrintAPIResponse();
        await this.pages.competitionChangeRequestAdvancedFilterPage.verifyAPITotalGreaterThanZero(
            this.changeRequestAdvancedFilterApiResponse
        );
    }
);

/**
 * Print the already-resolved API response JSON a second time (optional step).
 */
Then(
    'User prints the change request advanced filter API response JSON',
    { timeout: 30000 },
    async function () {
        console.log('=== Change Request Advanced Filter API Response JSON ===');
        console.log(JSON.stringify(this.changeRequestAdvancedFilterApiResponse, null, 2));
        console.log('=== End of Response ===');
    }
);

// ======================================================================
// GRID – CLICK FIRST RECORD
// ======================================================================

/**
 * Click the first row in the Change Request filtered grid to open the detail page.
 */
Then(
    'User clicks the first record in the Change Request filtered grid',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionChangeRequestAdvancedFilterPage.clickFirstGridRecord();
    }
);

// ======================================================================
// DETAIL PAGE – VERIFY FIELD VALUE
// ======================================================================

/**
 * On the Change Request detail page verify that a labelled field satisfies
 * the given operator + value condition.
 *
 * Examples:
 *   Then  User verifies the change request detail field "Approved By" "Starts with" "Away"
 *   Then  User verifies the change request detail field "Approved By" "Does not start with" "Away"
 */
Then(
    'User verifies the change request detail field {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, value) {
        await this.pages.competitionChangeRequestAdvancedFilterPage.verifyDetailField(
            fieldLabel,
            operator,
            value
        );
    }
);
