const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// PAGE TITLE
// ======================================================================

Then(
    'User verifies the division category page title',
    { timeout: 30000 },
    async function () {
        await this.pages.divisionCategoryBasicFilterPage.verifyPageTitle();
    }
);

// ======================================================================
// FILTER DIALOG – OPEN
// ======================================================================

Then(
    'User clicks the filter icon to open Division Category basic filter',
    { timeout: 30000 },
    async function () {
        await this.pages.divisionCategoryBasicFilterPage.openFilterDialog();
    }
);

// ======================================================================
// SEARCH AUTOCOMPLETE
// ======================================================================

Then(
    'User searches for division category with {string} in Division Category basic filter',
    { timeout: 60000 },
    async function (searchText) {
        await this.pages.divisionCategoryBasicFilterPage.searchDivisionCategory(searchText);
    }
);

// ======================================================================
// STATUS BADGE
// ======================================================================

Then(
    'User selects the {string} status badge in Division Category basic filter',
    { timeout: 30000 },
    async function (statusValue) {
        await this.pages.divisionCategoryBasicFilterPage.selectStatusBadge(statusValue);
    }
);

// ======================================================================
// MULTISELECT / BUTTON-GROUP FIELDS
// ======================================================================

Then(
    'User selects {string} in Division Category basic filter Format field',
    { timeout: 30000 },
    async function (value) {
        await this.pages.divisionCategoryBasicFilterPage.selectFilterField('Format', value);
    }
);

Then(
    'User selects {string} in Division Category basic filter Division Category Type field',
    { timeout: 30000 },
    async function (value) {
        await this.pages.divisionCategoryBasicFilterPage.selectFilterField('Division Category Type', value);
    }
);

// ======================================================================
// APPLY / RESET BUTTONS
// ======================================================================

Then(
    'User clicks the Apply button in Division Category basic filter dialog',
    { timeout: 30000 },
    async function () {
        await this.pages.divisionCategoryBasicFilterPage.clickApplyButton();
    }
);

Then(
    'User clicks the Reset button in Division Category basic filter dialog',
    { timeout: 30000 },
    async function () {
        await this.pages.divisionCategoryBasicFilterPage.clickResetButton();
    }
);

// ======================================================================
// FILTER STATE VERIFICATION
// ======================================================================

Then(
    'User verifies that all Division Category basic filters are cleared',
    { timeout: 30000 },
    async function () {
        await this.pages.divisionCategoryBasicFilterPage.verifyFiltersCleared();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the Division Category basic filter list API response',
    { timeout: 10000 },
    async function () {
        this.pages.divisionCategoryBasicFilterPage.startCapturingAPIResponse();
    }
);

// ======================================================================
// API – AWAIT + COUNT VERIFICATION
// ======================================================================

Then(
    'User verifies the Division Category basic filter API total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.divisionCategoryBasicFilterApiResponse =
            await this.pages.divisionCategoryBasicFilterPage.awaitAPIResponse();
        await this.pages.divisionCategoryBasicFilterPage.verifyAPITotalGreaterThanZero(
            this.divisionCategoryBasicFilterApiResponse
        );
    }
);

// ======================================================================
// API – PRINT
// ======================================================================

Then(
    'User prints the Division Category basic filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.divisionCategoryBasicFilterPage.printAPIResponseJSON(
            this.divisionCategoryBasicFilterApiResponse
        );
    }
);
