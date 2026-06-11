const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');

setDefaultTimeout(2 * 60000);

/**
 * Click the "Advanced Filter" tab (or any named tab) inside the filter dialog
 */
Then(`User clicks the {string} tab in filter dialog`, { timeout: 90000 }, async function (tabName) {
    await this.pages.personManagementAdvancedFilterPage.clickAdvancedFilterTab();
});

/**
 * Verify that the Advanced Filter query builder UI is displayed
 */
Then(`User verifies the Advanced Filter query builder is displayed`, { timeout: 90000 }, async function () {
    await this.pages.personManagementAdvancedFilterPage.verifyAdvancedFilterQueryBuilderDisplayed();
});

/**
 * Add a new condition row (first condition in the default group)
 */
Then(`User adds a new condition in the Advanced Filter`, { timeout: 90000 }, async function () {
    await this.pages.personManagementAdvancedFilterPage.addCondition(0);
});

/**
 * Add a second (or subsequent) condition row in the existing group
 */
Then(`User adds another condition in the Advanced Filter`, { timeout: 90000 }, async function () {
    await this.pages.personManagementAdvancedFilterPage.addCondition(0);
});

/**
 * Select the field for the FIRST condition row
 */
Then(`User selects {string} as the condition field`, { timeout: 90000 }, async function (fieldName) {
    await this.pages.personManagementAdvancedFilterPage.selectConditionField(fieldName, 0);
});

/**
 * Select the operator for the FIRST condition row
 */
Then(`User selects {string} as the condition operator`, { timeout: 90000 }, async function (operatorName) {
    await this.pages.personManagementAdvancedFilterPage.selectConditionOperator(operatorName, 0);
});

/**
 * Enter a value for the FIRST condition row
 */
Then(`User enters {string} as the condition value`, { timeout: 90000 }, async function (value) {
    await this.pages.personManagementAdvancedFilterPage.enterConditionValue(value, 0);
});

/**
 * Select the field for any condition row by 1-based index (e.g. "for condition 1", "for condition 2")
 */
Then(`User selects {string} as the condition field for condition {int}`, { timeout: 90000 }, async function (fieldName, conditionNumber) {
    await this.pages.personManagementAdvancedFilterPage.selectConditionField(fieldName, conditionNumber-1);
});

/**
 * Select the operator for any condition row by 1-based index
 */
Then(`User selects {string} as the condition operator for condition {int}`, { timeout: 90000 }, async function (operatorName, conditionNumber) {
    await this.pages.personManagementAdvancedFilterPage.selectConditionOperator(operatorName, conditionNumber-1);
});

/**
 * Enter a value for any condition row by 1-based index
 */
Then(`User enters {string} as the condition value for condition {int}`, { timeout: 90000 }, async function (value, conditionNumber) {
    await this.pages.personManagementAdvancedFilterPage.enterConditionValue(value, conditionNumber - 1);
});

/**
 * Set the top-level group logic to "AND" or "OR"
 */
Then(`User sets the group logic to {string} at index {int}`, { timeout: 90000 }, async function (logic, index) {
    await this.pages.personManagementAdvancedFilterPage.setGroupLogic(logic, index);
});

/**
 * Click "Apply Advanced Filter" button
 */
Then(`User clicks the Apply Advanced Filter button`, { timeout: 90000 }, async function () {
    await this.pages.personManagementAdvancedFilterPage.clickApplyAdvancedFilterButton();
});

/**
 * Verify the Advanced Filter query builder has no conditions (after Reset)
 */
Then(`User verifies the Advanced Filter query builder has no conditions`, { timeout: 90000 }, async function () {
    await this.pages.personManagementAdvancedFilterPage.verifyNoConditionsPresent();
});

/**
 * Print the captured persons list API response JSON to the console.
 */
Then(`User prints the persons list API response JSON`, { timeout: 30000 }, async function () {
    console.log('=== Persons List API Response JSON ===');
    console.log(JSON.stringify(this.personListApiResponse, null, 2));
    console.log('=== End of Response ===');
});

/**
 * Validate API response: persons' firstName contains the expected string
 */
Then(`User verifies the Advanced Filter API response has persons with first name containing {string}`, { timeout: 45000 }, async function (expectedValue) {
    const response = await this.personListResponsePromise;
    const body = await response.json();
    this.personListApiResponse = body;
    await this.pages.personManagementAdvancedFilterPage.validateApiResponseCondition(body, 'First Name', 'Contains', expectedValue);
});

/**
 * Validate that every item in the captured API response satisfies field + operator + value.
 * Uses the already-resolved this.personListApiResponse (set by "verifies the API response total count is greater than zero").
 */
Then(`User verifies all API response records have {string} {string} {string}`, { timeout: 30000 }, async function (fieldLabel, operator, value) {
    await this.pages.personManagementAdvancedFilterPage.validateApiResponseCondition(this.personListApiResponse, fieldLabel, operator, value);
});

/**
 * Validate that every item satisfies condition1 OR condition2 (for OR-logic filter results).
 */
Then(`User verifies all API response records satisfy {string} {string} {string} or {string} {string} {string}`, { timeout: 30000 }, async function (f1, op1, v1, f2, op2, v2) {
    await this.pages.personManagementAdvancedFilterPage.validateApiResponseORConditions(this.personListApiResponse, f1, op1, v1, f2, op2, v2);
});

/**
 * Validate that every item satisfies condition1 AND condition2 (for combined Not in filter results).
 */
Then(`User verifies all API response records satisfy {string} {string} {string} and {string} {string} {string}`, { timeout: 30000 }, async function (f1, op1, v1, f2, op2, v2) {
    await this.pages.personManagementAdvancedFilterPage.validateApiResponseANDConditions(this.personListApiResponse, f1, op1, v1, f2, op2, v2);
});

/**
 * Enter the two range values for a Between / Not between condition.
 */
Then(`User enters between values {string} and {string} as the condition value`, { timeout: 30000 }, async function (fromValue, toValue) {
    await this.pages.personManagementAdvancedFilterPage.enterBetweenConditionValues(fromValue, toValue, 0);
});

/**
 * Validate every item satisfies a Between / Not between condition.
 * The two boundary values are combined as "fromValue|toValue" and passed to checkCondition.
 */
Then(`User verifies all API response records have {string} {string} values {string} and {string}`, { timeout: 30000 }, async function (fieldLabel, operator, fromValue, toValue) {
    const combinedValue = `${fromValue}|${toValue}`;
    await this.pages.personManagementAdvancedFilterPage.validateApiResponseCondition(
        this.personListApiResponse, fieldLabel, operator, combinedValue
    );
});
