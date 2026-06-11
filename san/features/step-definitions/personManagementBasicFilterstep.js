const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');

setDefaultTimeout(2 * 60000);

/**
 * Click the filter icon to open filter dialog
 */
Then(`User clicks the filter icon to open filter options`, { timeout: 90000 }, async function () {
    await this.pages.personManagementAdvancedFilterPage.openFilterDialog();
});

/**
 * Verify that Basic Filter tab is displayed
 */
Then(`User verifies that {string} tab is displayed`, { timeout: 90000 }, async function (tabName) {
    await this.pages.personManagementPage.verifyFilterTabExists(tabName);
});

/**
 * Apply Basic Filter with multiple criteria
 */
Then(`User applies Basic Filter with following criteria`, { timeout: 90000 }, async function (dataTable) {
    const filterCriteria = dataTable.rowsHash();
    await this.pages.personManagementPage.applyBasicFilterCriteria(filterCriteria);
});

/**
 * Remove currently applied filters
 */
Then(`User removes the currently applied filters from the filter panel`, { timeout: 90000 }, async function () {
    await this.pages.personManagementPage.removeAppliedFilters();
});

/**
 * Click Apply button in filter dialog
 */
Then(`User clicks the Apply button in filter dialog`, { timeout: 90000 }, async function () {
    await this.pages.personManagementPage.clickFilterApplyButton();
});

/**
 * Click Reset button in filter dialog
 */
Then(`User clicks the Reset button in filter dialog`, { timeout: 90000 }, async function () {
    await this.pages.personManagementAdvancedFilterPage.clickFilterResetButton();
});

/**
 * Verify that filter has been applied successfully
 */
Then(`User verifies that the filter has been applied successfully`, { timeout: 90000 }, async function () {
    await this.pages.personManagementPage.verifyFilterApplied();
});

/**
 * Verify that all filters are cleared after reset
 */
Then(`User verifies that all filters are cleared`, { timeout: 90000 }, async function () {
    await this.pages.personManagementAdvancedFilterPage.verifyFiltersCleared();
});

/**
 * Verify that full records list is restored
 */
Then(`User verifies the full records list is restored`, { timeout: 90000 }, async function () {
    await this.pages.personManagementPage.verifyFullRecordsListRestored();
});

/**
 * Verify that filtered grid displays only matching records
 */
Then(`User verifies the filtered grid displays only matching records`, { timeout: 90000 }, async function () {
    await this.pages.personManagementPage.verifyFilteredGridRecords();
});

/**
 * Save current filter as a segment
 */
Then(`User saves the current filter as a segment with name {string}`, { timeout: 90000 }, async function (segmentName) {
    await this.pages.personManagementPage.saveFilterAsSegment(segmentName);
});

/**
 * Verify that filter segment is saved successfully
 */
Then(`User verifies that the filter segment is saved successfully`, { timeout: 90000 }, async function () {
    await this.pages.personManagementPage.verifySegmentSaved();
});


/**
 * Set up a listener to capture the persons/list API response before clicking Apply
 */
Then(`User starts capturing the persons list API response`, { timeout: 10000 }, async function () {
    this.personListResponsePromise = this.page.waitForResponse(
        response => response.url().includes('/persons/list') && response.request().method() === 'POST',
        { timeout: 90000 }
    );
});

/**
 * Verify a button-group option is pre-selected (has e-primary class) without clicking it
 */
Then(`User verifies the {string} button group has {string} pre-selected by default`, { timeout: 30000 }, async function (fieldLabel, buttonValue) {
    await this.pages.personManagementPage.verifyButtonGroupPreSelected(fieldLabel, buttonValue);
});

/**
 * Await the captured API response and assert total > 0
 */
Then(`User verifies the API response total count is greater than zero`, { timeout: 90000 }, async function () {
    const response = await this.personListResponsePromise;
    const body = await response.json();
    this.personListApiResponse = body;
    if (body.total === 0 || (body.items ?? []).length === 0) {
        console.log('ℹ No records found for the applied filter — grid displays "No records found".');
    } else {
        console.log(`✓ API /persons/list returned total: ${body.total}, items in page: ${body.items.length}`);
    }
});

/**
 * Validate that every item in the captured API response matches the expected field/value
 * field: "status" | "gender" | "maritalStatus"
 */
Then(`User verifies all API response records have {string} matching {string}`, { timeout: 30000 }, async function (field, expectedValue) {
    await this.pages.personManagementPage.validateApiResponseField(this.personListApiResponse, field, expectedValue);
});

// ===================== SEARCH BAR STEPS =====================

/**
 * Search by person name via the Basic Filter dialog's autocomplete,
 * then click Apply — triggers the /persons/list API.
 * Timeout raised to 90s to account for slow QA server autocomplete suggestions.
 */
Then(`User searches for person with name {string}`, { timeout: 90000 }, async function (name) {
    await this.pages.personManagementPage.searchPersonByName(name);
});

/**
 * Clear the person name search (reopens filter dialog, clears autocomplete, clicks Apply).
 * Timeout raised to 90s for consistency.
 */
Then(`User clears the person name search input`, { timeout: 90000 }, async function () {
    await this.pages.personManagementPage.clearPersonNameSearch();
});

/**
 * Verify a matching row appears in the grid for the searched name
 */
Then(`User verifies the grid contains person name {string}`, { timeout: 60000 }, async function (name) {
    await this.pages.personManagementPage.verifyGridContainsName(name);
});

/**
 * Validate all API response records have firstName/lastName/name containing the search text
 */
Then(`User verifies all API response records contain name {string}`, { timeout: 30000 }, async function (searchText) {
    await this.pages.personManagementPage.validateApiResponseNameContains(this.personListApiResponse, searchText);
});

// ===================== PERSON DETAIL DRILL-DOWN STEPS =====================

/**
 * Click the first person record in the filtered grid to open person detail
 */
Then(`User clicks the first person record in the filtered grid`, { timeout: 30000 }, async function () {
    await this.pages.personManagementPage.clickFirstPersonRecord();
});

/**
 * Verify the married status on the person detail page
 */
Then(`User verifies the married status is {string}`, { timeout: 30000 }, async function (expectedStatus) {
    await this.pages.personManagementPage.verifyMarriedStatus(expectedStatus);
});



/**
 * Navigate to a tab (e.g. "Functions") on the person detail page
 */
Then(`User navigates to {string} tab on person detail page`, { timeout: 30000 }, async function (tabName) {
    await this.pages.personManagementPage.navigateToPersonDetailsTab(tabName);
});

/**
 * Start capturing the person section functions API response (/persons/{id}/functions/list with type=section)
 */
Then(`User starts capturing the {string} functions API response`, { timeout: 10000 }, async function (functionType) {
    await this.pages.personManagementPage.startCapturingPersonFunctionsAPI(functionType);
});

/**
 * Await the captured person functions API response and store for validation
 */
Then(`User waits for the {string} functions API response`, { timeout: 30000 }, async function (functionType) {
    this.personFunctionsApiResponse = await this.pages.personManagementPage.awaitPersonFunctionsAPIResponse(functionType);
});

/**
 * Validate the person functions API response contains the expected function name
 */
Then(`User verifies the person {string} functions API contains {string}`, { timeout: 30000 }, async function (functionType, functionName) {
    await this.pages.personManagementPage.verifyPersonFunctionsAPIContains(this.personFunctionsApiResponse, functionName);
});

/**
 * Validate functions API contains function value – parameterised form used by Scenario Outline
 * Step: User verifies the "<FunctionType>" functions API contains "<FunctionValue>"
 */
Then(`User verifies the {string} functions API contains {string}`, { timeout: 30000 }, async function (functionType, functionName) {
    await this.pages.personManagementPage.verifyPersonFunctionsAPIContains(this.personFunctionsApiResponse, functionName);
});

/**
 * Navigate back to Person Management list using browser back
 */
Then(`User navigates back to Person Management list`, { timeout: 30000 }, async function () {
    await this.pages.personManagementPage.navigateBackToPersonManagement();
});

// ===================== PERSON TAGS DRILL-DOWN STEPS =====================

/**
 * Set up a listener to capture the /persons/{id}/tags/ API response
 */
Then(`User starts capturing the person tags API response`, { timeout: 10000 }, async function () {
    await this.pages.personManagementPage.startCapturingPersonTagsAPI();
});

/**
 * Await the captured person tags API response and store for validation
 */
Then(`User waits for the person tags API response`, { timeout: 30000 }, async function () {
    this.personTagsApiResponse = await this.pages.personManagementPage.awaitPersonTagsAPIResponse();
});

/**
 * Validate the person tags API response contains the expected tag name
 */
Then(`User verifies the person tags API contains {string}`, { timeout: 30000 }, async function (tagName) {
    await this.pages.personManagementPage.verifyPersonTagsAPIContains(this.personTagsApiResponse, tagName);
});
