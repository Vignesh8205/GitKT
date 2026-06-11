const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');

const fs = require('fs');
const path = require('path');
const { expect } = require('playwright/test');
const DataUtil = require('../../utils/dataUtil');
setDefaultTimeout(1 * 60000);

/**
 * Click on the Club Management tab
 */
Then('User choose the {string} tab', { timeout: 90000 }, async function (tabName) {

    await this.pages.clubManagementPage.navigateTab(tabName)

});

/**
 * Verify page title
 */
Then('verify the page title {string}', { timeout: 90000 }, async function (expectedTitle) {
    await this.pages.clubManagementPage.verifyPageTitle(expectedTitle)
});

/**
 * Click the Edit icon on the Club detail Home tab
 */
Then('User clicks the Edit icon on the club detail page', { timeout: 90000 }, async function () {
    await this.pages.clubManagementPage.clickHomeTabEditMode();
});

/**
 * Click the Edit icon on the Club Website section
 */
Then('User clicks the Edit icon on the Club Website section', { timeout: 90000 }, async function () {
    await this.pages.clubManagementPage.clickWebsiteSectionEditMode();
});

/**
 * Click the View mode button to exit edit mode
 */
Then('User clicks the View mode button', { timeout: 90000 }, async function () {
    await this.pages.clubManagementPage.clickViewModeButton();
});

/**
 * Click Create New Club button
 */
Then('user Click on the {string} button', { timeout: 60000 }, async function (buttonName) {
    await this.pages.clubManagementPage.clickClubManagementPageButton(buttonName)

});

/**
 * Enter club details using DataTable
 */
Then('user enter the club details', { timeout: 30000 }, async function (dataTable) {
    const data = dataTable.rowsHash();
    await this.pages.clubManagementPage.fillClubDetails(data)

});



When('User upload the club logo {string}', async function (relativePath) {
    const filePath = require('path').join(process.cwd(), relativePath);
    await this.pages.clubManagementPage.uploadClubLogoViaButton(filePath);
});

/**
 * Choose the club color 
 */
Then('User choose the Club colors from {string}', { timeout: 90000 }, async function (dataPath) {
    const colors = dataPath
        .split('.')
        .reduce((obj, key) => obj && obj[key], this.testData);

    console.log(colors);


    if (!colors) {
        throw new Error(`Invalid data path: ${dataPath}`);
    }
    await this.pages.clubManagementPage.fillClubColor(colors);
    console.log("User should select the Club colors  ");

});




Then('User opens the details of a created club with name {string}', { timeout: 90000 }, async function (clubName) {
    const resolvedName = clubName === 'lastCreated'
        ? this.pages.clubManagementPage.lastCreatedClubName
        : clubName;
    if (!resolvedName) throw new Error('No recently created club name found. Run the @clubcreate scenario first.');
    await this.pages.clubManagementPage.openClubDetailsByName(resolvedName);
});

When('User updates the following Club Details on the Home tab:', { timeout: 90000 }, async function (dataTable) {

    const clubDetails = dataTable.rowsHash();

    await this.pages.clubManagementPage.enterFifaId(clubDetails['FIFA ID']);
    await this.pages.clubManagementPage.enterAbbreviation(clubDetails['Abbreviation']);
    await this.pages.clubManagementPage.selectCorrespondenceLanguage(
        clubDetails['Correspondence Language']
    );
    await this.pages.clubManagementPage.enterFoundingDate(clubDetails['Founding Date'] === "current" ? DataUtil.getCurrentDateDDMMYYYY() : clubDetails['Founding Date']);
    await this.pages.clubManagementPage.enterShortName(clubDetails['Short Name']);
    await this.pages.clubManagementPage.enterClubCode(clubDetails['Club Code']);
    await this.pages.clubManagementPage.selectLegalStatus(clubDetails['Legal Status']);
    if (clubDetails['Status']) {
        await this.pages.clubManagementPage.selectStatus(clubDetails['Status']);
    }



});



When('User updates the Club Websites with the following entries:', { timeout: 90000 }, async function (dataTable) {
    const rows = dataTable.hashes();

    for (const row of rows) {
        await this.pages.clubManagementPage.fillClubWebsites(row)
    }
});

Then('User clicks the save changes', { timeout: 90000 }, async function () {
    await this.pages.clubManagementPage.ClicksaveClubWebsiteButton()
});


When(
    'User updates the following Financial Details:', { timeout: 90000 }, async function (dataTable) {
        const data = dataTable.rowsHash();
        await this.pages.clubManagementPage.financialDetails(data)
    }
);


Then(
    'validate popup message as {string}',
    { timeout: 30000 },
    async function (expectedMessage) {
        await this.pages.clubManagementPage.validatePopupByText(expectedMessage);
    }
);

When('user adds Club Function with following details:', { timeout: 90000 }, async function (dataTable) {
    const data = dataTable.rowsHash();
    await this.pages.clubManagementPage.addClubFunction(data)
});

When('user Section Function with following details:', { timeout: 90000 }, async function (dataTable) {
    const data = dataTable.rowsHash();
    await this.pages.clubManagementPage.addSectionFunction(data);
});

When('user Team Function with following details:', { timeout: 90000 }, async function (dataTable) {
    const data = dataTable.rowsHash();
    await this.pages.clubManagementPage.addTeamFunction(data);
});

//Section Tab popup
When('user adds section with following details:', { timeout: 60000 }, async function (dataTable) {
    const data = dataTable.rowsHash();
    await this.pages.clubManagementPage.addSectionTabFunction(data);

});

When('user fill Venue with following details:', { timeout: 90000 }, async function (dataTable) {
    const data = dataTable.rowsHash();
    await this.pages.clubManagementPage.addVenueFunction(data);
});

Then('User able to Delete the record from Venues {string}', { timeout: 90000 },
    async function (venueName) {

        await this.pages.clubManagementPage.deleteTheVenue(venueName)
    }
);

Then('User able to edit the record from Venues {string}', { timeout: 90000 },
    async function (venueName) {
        await this.pages.clubManagementPage.clickEditIconVenueTable(venueName)
    }
);

Then('User able to unlinked the record from Tags {string}', { timeout: 90000 },
    async function (venueName) {

        await this.pages.clubManagementPage.clickUnlinkIconTagsTable(venueName)
    }
);

When('user adds Map Tab with Category and tagname', { timeout: 90000 }, async function (dataTable) {
    const data = dataTable.rowsHash();
     await this.pages.clubManagementPage.addMapTag(data)
});


When(
  'user Edit Attributes Tab with atrribute value', { timeout: 90000 },
  async function (dataTable) {
    const data = dataTable.rowsHash();
    let attributeValue = data['Attribute Value'];
    if (attributeValue === 'random') {
      attributeValue = `${DataUtil.generateRandomNumber(8)}`;
    }
    await this.pages.clubManagementPage.enter_attribute_value(attributeValue)
  }
);



When('user unlink Attribute {string}', { timeout: 90000 }, async function (attribute) {
   await this.pages.clubManagementPage.click_attribute_Unlink(attribute)
});
When('user edit Attribute {string}', { timeout: 90000 }, async function (attribute) {
   await this.pages.clubManagementPage.click_attribute_edit(attribute)
});

Then('user selects the first person function record from the grid', { timeout: 30000 }, async function () {
    await this.pages.clubManagementPage.selectFirstPersonFunctionRecord();
});

Then('user clicks the {string} button on Person Function toolbar', { timeout: 30000 }, async function (buttonName) {
    await this.pages.clubManagementPage.clickPersonFunctionToolbarButton(buttonName);
});

When('user updates Person Function Status to {string}', { timeout: 60000 }, async function (status) {
    await this.pages.clubManagementPage.selectStatus(status);
});

Then('User searches for the recently created club in the listing grid', { timeout: 90000 }, async function () {
    await this.pages.clubManagementPage.searchLastCreatedClubInGrid();
});

Then('User searches for clubs created today in the listing grid', { timeout: 90000 }, async function () {
    await this.pages.clubManagementPage.searchClubsCreatedTodayInGrid();
});

Then('User clicks the first result in the club listing grid', { timeout: 90000 }, async function () {
    await this.pages.clubManagementPage.clickFirstClubRecordInGrid();
});
//tr[@role='row'][td[count(//th[.//span[normalize-space()='Attribute Name']]/preceding-sibling::th) + 1][normalize-space()='Abis']]//td[last()]//*[ contains(@title,'Edit')]

//tr[@role='row'][td[count(//th[.//span[normalize-space()='Attribute Name']]/preceding-sibling::th) +1][normalize-space()='Abis']]//td[last()]//*[ contains(@title,'Unlink')]


//tr[@role='row'][td[count(//th[.//span[normalize-space()='Attribute Name']]/preceding-sibling::th) + 1][normalize-space()='Abis']]//td[last()]//*[ contains(@title,'Edit')]
//tr[@role='row'][td[count(//th[.//span[normalize-space()='Attribute Name']]/preceding-sibling::th) +1][normalize-space()='Abis']]//td[last()]//*[ contains(@title,'Unlink')]

//tr[@role='row'][td[count(//th[.//span[normalize-space()='Attribute Name']]/preceding-sibling::th) + 1][normalize-space()='Abis']]//td[last()]//*[ contains(@title,'Edit')]
//tr[@role='row'][td[count(//th[.//span[normalize-space()='Attribute Name']]/preceding-sibling::th) +1][normalize-space()='Abis']]//td[last()]//*[ contains(@title,'Unlink')]
//tr[@role='row'][td[count(//th[.//span[normalize-space()='Attribute Name']]/preceding-sibling::th) + 1][normalize-space()='Abis']]//td[last()]//*[ contains(@title,'Edit')]
//tr[@role='row'][td[count(//th[.//span[normalize-space()='Attribute Name']]/preceding-sibling::th) +1][normalize-space()='Abis']]//td[last()]//*[ contains(@title,'Unlink')]
