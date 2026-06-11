const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – RANKING SUB TAB
// ======================================================================

Then(
    'User navigates to the Ranking sub tab',
    { timeout: 120000 },
    async function () {
        await this.pages.competitionRankingCreatePage.navigateToRankingMenuItem();
    }
);

Then(
    'User verifies the Ranking page title',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.verifyRankingTitle();
    }
);

Then(
    'User clicks the Edit mode button on Ranking page',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.clickEditMode();
    }
);

Then(
    'User clicks the View mode button on Ranking page',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.clickViewMode();
    }
);

Then(
    'User clicks the Create Template button',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.clickCreateTemplate();
    }
);

// ======================================================================
// TEMPLATE FORM – DETAILS
// ======================================================================

Then(
    'User fills the Ranking Template Name with auto-generated name',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.fillTemplateName();
    }
);

Then(
    'User fills the Ranking Description with {string}',
    { timeout: 30000 },
    async function (text) {
        await this.pages.competitionRankingCreatePage.fillDescription(text);
    }
);

// ======================================================================
// RANKING CRITERIA CONFIGURATION GRID
// ======================================================================

Then(
    'User clicks the Add button in Ranking Criteria Configuration grid',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.clickAddInCriteriaGrid();
    }
);

Then(
    'User fills Ranking Criteria row with following details',
    { timeout: 90000 },
    async function (dataTable) {
        const criteria = dataTable.rowsHash();
        await this.pages.competitionRankingCreatePage.fillCriteriaRow(criteria);
    }
);

Then(
    'User saves the Ranking Criteria row',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.saveGridRow();
    }
);

Then(
    'User clicks the Update button in Ranking Criteria grid',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.clickGridUpdateButton();
    }
);

Then(
    'User clicks the Create button for Ranking Template',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.clickCreateButton();
    }
);

Then(
    'User verifies criteria added success message',
    { timeout: 15000 },
    async function () {
        await this.pages.competitionRankingCreatePage.verifyCriteriaAddedSuccessMessage();
    }
);

Then(
    'User saves the Ranking Template',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.saveTemplate();
    }
);

// ======================================================================
// SEARCH & NAVIGATE TO RECORD
// ======================================================================

Then(
    'User searches for the recently created Ranking Template',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.searchRankingTemplate();
    }
);

Then(
    'User clicks the first record in Ranking Template list',
    { timeout: 60000 },
    async function () {
        await this.pages.competitionRankingCreatePage.clickFirstRankingTemplateRecord();
    }
);

Then(
    'User clicks the first record to navigate to the detail page',
    { timeout: 60000 },
    async function () {
        await this.pages.competitionRankingCreatePage.clickFirstRecordToNavigateDetail();
    }
);

// ======================================================================
// EDIT TEMPLATE INFORMATION
// ======================================================================

Then(
    'User clicks the Edit button for Template Information',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.clickEditTemplateInfoButton();
    }
);

Then(
    'User edits the Ranking Template Name with new auto-generated name',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.editTemplateName();
    }
);

Then(
    'User edits the Ranking Description with {string}',
    { timeout: 30000 },
    async function (text) {
        await this.pages.competitionRankingCreatePage.editDescription(text);
    }
);

Then(
    'User clicks the Update button for Ranking Template',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.clickUpdateTemplateButton();
    }
);

// ======================================================================
// EDIT RANKING CRITERIA CONFIGURATION
// ======================================================================

Then(
    'User clicks the Edit button for Ranking Criteria Configuration section',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.clickEditCriteriaSectionButton();
    }
);

Then(
    'User clicks the first row in Ranking Criteria grid',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.clickFirstCriteriaGridRow();
    }
);

Then(
    'User clicks the Edit button in Ranking Criteria grid row',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.clickGridRowEditButton();
    }
);

Then(
    'User edits Ranking Criteria to {string}',
    { timeout: 30000 },
    async function (value) {
        await this.pages.competitionRankingCreatePage.editCriteriaValue(value);
    }
);

Then(
    'User clicks the Delete button in Ranking Criteria grid',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.clickCriteriaGridDeleteButton();
    }
);

Then(
    'User clicks the Confirm button',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.clickConfirmButton();
    }
);

// ======================================================================
// API – CAPTURE & VALIDATE
// ======================================================================

Then(
    'User starts capturing the Ranking Template API response',
    { timeout: 10000 },
    async function () {
        this.pages.competitionRankingCreatePage.startCapturingRankingAPI();
    }
);

Then(
    'User prints the Ranking Template API response JSON',
    { timeout: 90000 },
    async function () {
        this.rankingAPIResponse =
            await this.pages.competitionRankingCreatePage.awaitAndPrintRankingAPIResponse();
    }
);

Then(
    'User verifies the Ranking Template API response is successful',
    { timeout: 30000 },
    async function () {
        await this.pages.competitionRankingCreatePage.verifyAPIResponseSuccessful(
            this.rankingAPIResponse
        );
    }
);
