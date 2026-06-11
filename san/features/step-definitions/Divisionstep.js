const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const DivisionPage = require('../../pages/DivisionPage');
let divisionPage;
// Set default timeout for all steps
setDefaultTimeout(1 * 60000);

Then(`User Can able to access the Main menu in home page`, { timeout: 90000 }, async function () {
    await this.pages.loginPage.userAccessMaimenu();
    console.log('User clicked Main menu on home page ');

});

Then(`User choose the competition management tab`, { timeout: 90000 }, async function () {
    await this.pages.loginPage.userAccessCompetitionManagementPgae();
    console.log('User should be  Access Competition Management window ');

});

Then(`User select the Division category tab`, { timeout: 90000 }, async function () {
    await this.pages.loginPage.userSelectDivisionTab();
    console.log('User should Access Division Category window  ');
});

Then(`User navigates back to Division list`, { timeout: 30000 }, async function () {
    await this.page.goBack({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    console.log('Navigated back to Division list page');
});

Then(`User Click the Edit mode`, { timeout: 90000 }, async function () {
    await this.pages.loginPage.userAccessEditModeButton();
    console.log('User  should be Access the edit mode ');
});


Then(`User create the division management`, { timeout: 90000 }, async function () {
    await this.pages.loginPage.userCreateDivisionPage();
    console.log('User  should be Access the create division category page ');
});

When('user enters division information', { timeout: 120000 }, async function (dataTable) {
    const data = dataTable.rowsHash();

    await this.pages.divisionPage.fillDivisionInformation(data);
});

//Add Eligibility criteria 

Then(`User Clicking the add eligibility criteria`, { timeout: 90000 }, async function () {
 
    await this.pages.divisionPage.clickAddEligibility();
    console.log('User should be Access the Add eligibility criteria popup window  ');
});

When(`User Enter the Minimum age on popup window`, { timeout: 120000 }, async function (dataTable) {
    const data = dataTable.rowsHash();
    await this.pages.divisionPage.minimumAge(data);
    await this.pages.divisionPage.clickConfirmButton();
    console.log('Eligibility criteria record is created  ');
});




Then(`User starts capturing the Division create API response`, { timeout: 10000 }, async function () {
    this.pages.divisionPage.startCapturingCreateAPI();
    console.log('✓ Started capturing Division create API response');
});

Then(`User click the create button`, { timeout: 90000 }, async function () {
    await this.pages.divisionPage.clickCreateButton();
    console.log('User should be created the division record ');
});

Then(`User verifies and prints the Division create API response JSON`, { timeout: 30000 }, async function () {
    this.divisionCreateApiResponse = await this.pages.divisionPage.awaitAndPrintCreateAPIResponse();
});



Then(
    'Verify the Division record should be created with success message {string}',
    { timeout: 90000 },
    async function (expectedText) {
        await this.pages.divisionPage.validatePopupByText(expectedText);
        console.log('Division created success message validated');
    }
);

Then(`User searches for the recently created division in quick search`, { timeout: 90000 }, async function () {
    await this.pages.divisionPage.searchByQuickSearch(this.pages.divisionPage.createdDivisionName);
    console.log('User searched and opened the recently created division record');
});

Then(`User Click the Edit mode on division information section`, { timeout: 90000 }, async function () {
    await this.pages.divisionPage.clickEditOnDivisionInformation();
    console.log('User clicked Edit on Division Information section');
});

Then(`User Click the Edit mode on eligibility criteria section`, { timeout: 90000 }, async function () {
    await this.pages.divisionPage.clickEditOnEligibilityCriteria();
    console.log('User clicked Edit on Eligibility Criteria section');
});

Then(`User clicks on the recently created division record to open detail page`, { timeout: 90000 }, async function () {
    await this.pages.divisionPage.clickRecentlyCreatedRecord();
    console.log('User clicked on the recently created division record');
});


When('user updates division information', { timeout: 90000 }, async function (dataTable) {
    const data = dataTable.rowsHash();
    await this.pages.divisionPage.updateDivisionInformation(data);
});

// When('user updates division information', { timeout: 90000 }, async function (dataTable) {
//     const data = dataTable.rowsHash();
//     await this.pages.divisionPage.updateDivisionInformation(data);
// });

Then(`User clicks the update button on division information`, { timeout: 90000 }, async function () {
    await this.pages.divisionPage.clickUpdateButton();
    console.log('User clicked update button on division information');
});

Then(
    'Verify the Division record should be updated with success message {string}',
    { timeout: 90000 },
    async function (expectedText) {
        await this.pages.divisionPage.validatePopupByText(expectedText);
        console.log('Division updated success message validated');
    }
);

Then(`User navigates to the Eligibility Criteria section`, { timeout: 90000 }, async function () {
    // Locate the Eligibility Criteria accordion/section header button by its text content
    const eligibilitySection = this.page.getByRole('button', { name: /Eligibility Criteria/i }).first();
    await eligibilitySection.waitFor({ state: 'visible', timeout: 30000 });
    await eligibilitySection.scrollIntoViewIfNeeded();
    console.log('User navigated to Eligibility Criteria section');
});

Then(`User clicks on the eligibility criteria record`, { timeout: 90000 }, async function () {
    await this.pages.divisionPage.clickEligibilityCriteriaRecord();
    console.log('User clicked on the eligibility criteria record');
});

Then(`User clicks the edit action icon on the eligibility criteria record`, { timeout: 90000 }, async function () {
    await this.pages.divisionPage.clickEligibilityCriteriaEditIcon();
    console.log('User clicked the edit action icon on eligibility criteria record');
});

When(`User updates the eligibility criteria fields`, { timeout: 120000 }, async function (dataTable) {
    const data = dataTable.rowsHash();
    await this.pages.divisionPage.minimumAge(data);
});

Then(`User clicks the update button`, { timeout: 90000 }, async function () {
    await this.pages.divisionPage.clickConfirmButton();
    console.log('User clicked the update button');
});

Then(
    'Verify the eligibility criteria record should be updated with success message {string}',
    { timeout: 90000 },
    async function (expectedText) {
        await this.pages.divisionPage.validatePopupByText(expectedText);
        console.log('Eligibility criteria updated success message validated');
    }
);
