const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60 * 1000);

// ======================================================================
// NAVIGATION – RESOURCES CALENDAR TAB
// ======================================================================

/**
 * Click the "Resources Calendar" tab inside Venue Management.
 */
Then(
    'User navigates to the Resources Calendar tab',
    { timeout: 60000 },
    async function () {
        await this.pages.resourceCalendarBasicFilterPage.clickResourcesCalendarTab();
    }
);

// ======================================================================
// FILTER DIALOG – OPEN
// ======================================================================

/**
 * Click the filter icon on the Resources Calendar view to open the filter dialog.
 */
Then(
    'User clicks the Resource Calendar filter icon',
    { timeout: 60000 },
    async function () {
        await this.pages.resourceCalendarBasicFilterPage.openFilterDialog();
    }
);

// ======================================================================
// FILTER DIALOG – TAB
// ======================================================================

/**
 * Click a specific tab (e.g. "Basic Filter") inside the Resource Calendar filter dialog.
 */
Then(
    'User clicks the {string} tab in Resource Calendar filter dialog',
    { timeout: 15000 },
    async function (tabName) {
        await this.pages.resourceCalendarBasicFilterPage.clickFilterTab(tabName);
    }
);

// ======================================================================
// APPLY FILTER CRITERIA (DataTable driven)
// ======================================================================

/**
 * Apply Resource Calendar Basic Filter criteria from a DataTable.
 *
 * Supported FilterField values:
 *   Search By Event Name  – autocomplete
 *   Event Type            – multiselect
 *   Location              – multiselect
 *   Visibility            – multiselect
 *   All Day Event         – ejs-switch (On / Off)
 *   Resources             – multiselect
 *   Date Range            – date range picker (DD/MM/YYYY - DD/MM/YYYY)
 *   Tags                  – multiselect
 */
Then(
    'User applies Resource Calendar Basic Filter with following criteria',
    { timeout: 90000 },
    async function (dataTable) {
        const criteria = dataTable.rowsHash();
        await this.pages.resourceCalendarBasicFilterPage.applyResourceCalendarBasicFilterCriteria(criteria);
    }
);

// ======================================================================
// APPLY BUTTON
// ======================================================================

/**
 * Click the Apply button inside the Resource Calendar filter dialog.
 */
Then(
    'User clicks the Apply button in Resource Calendar filter dialog',
    { timeout: 30000 },
    async function () {
        await this.pages.resourceCalendarBasicFilterPage.clickApplyButton();
    }
);

// ======================================================================
// RESET BUTTON
// ======================================================================

/**
 * Click the Reset button inside the Resource Calendar filter dialog.
 */
Then(
    'User clicks the Reset button in Resource Calendar filter dialog',
    { timeout: 30000 },
    async function () {
        await this.pages.resourceCalendarBasicFilterPage.clickResetButton();
    }
);

// ======================================================================
// VERIFY FILTERS CLEARED
// ======================================================================

/**
 * Verify all Resource Calendar filter inputs are cleared after Reset.
 */
Then(
    'User verifies that all Resource Calendar filters are cleared',
    { timeout: 15000 },
    async function () {
        await this.pages.resourceCalendarBasicFilterPage.verifyFiltersCleared();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

/**
 * Start listening for the Resource Calendar /venue/events/resource/list API response.
 * Must be called BEFORE clicking Apply.
 */
Then(
    'User starts capturing the Resource Calendar basic filter API response',
    { timeout: 10000 },
    async function () {
        this.pages.resourceCalendarBasicFilterPage.startCapturingAPIResponse();
    }
);

// ======================================================================
// API – AWAIT + COUNT VERIFICATION
// ======================================================================

/**
 * Await the captured API response and verify total count > 0.
 * Stores the body on `this.resourceCalendarAPIBody` for subsequent validation steps.
 */
Then(
    'User verifies the Resource Calendar basic filter API response total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.resourceCalendarAPIBody = await this.pages.resourceCalendarBasicFilterPage.awaitAPIResponse();
        await this.pages.resourceCalendarBasicFilterPage.verifyAPITotalGreaterThanZero(this.resourceCalendarAPIBody);
    }
);

// ======================================================================
// API – PRINT JSON
// ======================================================================

/**
 * Print the captured Resource Calendar API response body as formatted JSON.
 */
Then(
    'User prints the Resource Calendar basic filter API response JSON',
    { timeout: 10000 },
    async function () {
        this.pages.resourceCalendarBasicFilterPage.printAPIResponseJSON(this.resourceCalendarAPIBody);
    }
);

// ======================================================================
// CALENDAR EVENT CLICK
// ======================================================================

Then(
    'User clicks the first event on the Resources Calendar',
    { timeout: 30000 },
    async function () {
        await this.pages.resourceCalendarBasicFilterPage.clickFirstCalendarEvent();
    }
);

Then(
    'User clicks the calendar event {string} on the Resources Calendar',
    { timeout: 30000 },
    async function (subjectText) {
        await this.pages.resourceCalendarBasicFilterPage.clickFirstCalendarEvent(subjectText);
    }
);

// ======================================================================
// EVENT DETAIL API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the Resource Calendar event detail API response',
    { timeout: 10000 },
    async function () {
        this.pages.resourceCalendarBasicFilterPage.startCapturingEventDetailAPI();
    }
);

// ======================================================================
// EVENT DETAIL API – AWAIT + VERIFY
// ======================================================================

Then(
    'User verifies the Resource Calendar event detail API response is valid',
    { timeout: 30000 },
    async function () {
        this.resourceCalendarEventDetailAPIBody =
            await this.pages.resourceCalendarBasicFilterPage.awaitEventDetailAPIResponse();
        await this.pages.resourceCalendarBasicFilterPage.verifyEventDetailAPIResponse(
            this.resourceCalendarEventDetailAPIBody
        );
    }
);

// ======================================================================
// EVENT DETAIL API – PRINT
// ======================================================================

Then(
    'User prints the Resource Calendar event detail API response JSON',
    { timeout: 10000 },
    async function () {
        this.pages.resourceCalendarBasicFilterPage.printEventDetailAPIResponseJSON(
            this.resourceCalendarEventDetailAPIBody
        );
    }
);

// ======================================================================
// API – FIELD VALIDATION
// ======================================================================

/**
 * Validate that all items in the Resource Calendar API response satisfy:
 *   <fieldLabel> <operator> <expectedValue>
 *
 * Examples:
 *   "eventName"  "Contains"   "Pawan Nikkil"
 *   "eventType"  "Contains"   "Competition"
 *   "location"   "Contains"   "Chennai Orion"
 *   "visibility" "Contains"   "Everyone"
 *   "allDay"     "Equal"      "On"
 *   "resources"  "Contains"   "1A"
 *   "dateRange"  "Contains"   "21/05/2026 - 21/05/2026"
 *   "tags"       "Contains"   "Tag002 (Administrative)"
 */
Then(
    'User verifies all Resource Calendar basic filter API records have {string} {string} {string}',
    { timeout: 30000 },
    async function (fieldLabel, operator, expectedValue) {
        console.log(
            `\n[API Validation] Resource Calendar – field: "${fieldLabel}", ` +
            `operator: "${operator}", value: "${expectedValue}"`
        );
        console.log(this.resourceCalendarAPIBody);
        await this.pages.resourceCalendarBasicFilterPage.validateAPIRecords(
            this.resourceCalendarAPIBody,
            fieldLabel,
            operator,
            expectedValue
        );
    }
);
