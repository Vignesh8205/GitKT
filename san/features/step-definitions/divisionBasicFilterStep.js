const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// FILTER DIALOG – OPEN
// ======================================================================

Then(
    'User clicks the filter icon to open Division basic filter',
    { timeout: 30000 },
    async function () {
        await this.pages.divisionBasicFilterPage.openFilterDialog();
    }
);

// ======================================================================
// SEARCH AUTOCOMPLETE
// ======================================================================

Then(
    'User searches for division with {string} in Division basic filter',
    { timeout: 60000 },
    async function (searchText) {
        await this.pages.divisionBasicFilterPage.searchDivision(searchText);
    }
);

// ======================================================================
// STATUS BADGE
// ======================================================================

Then(
    'User selects the {string} status badge in Division basic filter',
    { timeout: 30000 },
    async function (statusValue) {
        await this.pages.divisionBasicFilterPage.selectStatusBadge(statusValue);
    }
);

// ======================================================================
// MULTISELECT FIELDS
// ======================================================================

Then(
    'User selects {string} in Division basic filter Format field',
    { timeout: 30000 },
    async function (value) {
        await this.pages.divisionBasicFilterPage.selectFilterField('Format', value);
    }
);

Then(
    'User selects {string} in Division basic filter Division Category field',
    { timeout: 30000 },
    async function (value) {
        await this.pages.divisionBasicFilterPage.selectFilterField('Division Category', value);
    }
);

Then(
    'User selects {string} in Division basic filter Federation field',
    { timeout: 30000 },
    async function (value) {
        await this.pages.divisionBasicFilterPage.selectFilterField('Federation', value);
    }
);

Then(
    'User selects {string} in Division basic filter Region field',
    { timeout: 30000 },
    async function (value) {
        await this.pages.divisionBasicFilterPage.selectFilterField('Region', value);
    }
);

Then(
    'User selects {string} in Division basic filter Organization field',
    { timeout: 30000 },
    async function (value) {
        await this.pages.divisionBasicFilterPage.selectFilterField('Organization', value);
    }
);

Then(
    'User selects {string} in Division basic filter Tags field',
    { timeout: 30000 },
    async function (value) {
        await this.pages.divisionBasicFilterPage.selectFilterField('Tags', value);
    }
);

// ======================================================================
// APPLY / RESET BUTTONS
// ======================================================================

Then(
    'User clicks the Apply button in Division basic filter dialog',
    { timeout: 30000 },
    async function () {
        await this.pages.divisionBasicFilterPage.clickApplyButton();
    }
);

Then(
    'User clicks the Reset button in Division basic filter dialog',
    { timeout: 30000 },
    async function () {
        await this.pages.divisionBasicFilterPage.clickResetButton();
    }
);

// ======================================================================
// FILTER STATE VERIFICATION
// ======================================================================

Then(
    'User verifies that all Division basic filters are cleared',
    { timeout: 30000 },
    async function () {
        await this.pages.divisionBasicFilterPage.verifyFiltersCleared();
    }
);

// ======================================================================
// API – CAPTURE
// ======================================================================

Then(
    'User starts capturing the Division basic filter list API response',
    { timeout: 10000 },
    async function () {
        this.pages.divisionBasicFilterPage.startCapturingAPIResponse();
    }
);

// ======================================================================
// API – AWAIT + COUNT VERIFICATION
// ======================================================================

Then(
    'User verifies the Division basic filter API total count is greater than zero',
    { timeout: 90000 },
    async function () {
        this.divisionBasicFilterApiResponse =
            await this.pages.divisionBasicFilterPage.awaitAPIResponse();
        await this.pages.divisionBasicFilterPage.verifyAPITotalGreaterThanZero(
            this.divisionBasicFilterApiResponse
        );
    }
);

// ======================================================================
// API – PRINT
// ======================================================================

Then(
    'User prints the Division basic filter API response JSON',
    { timeout: 30000 },
    async function () {
        this.pages.divisionBasicFilterPage.printAPIResponseJSON(
            this.divisionBasicFilterApiResponse
        );
    }
);
