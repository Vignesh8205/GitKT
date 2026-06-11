const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');

const fs = require('fs');
const path = require('path');
const { expect } = require('playwright/test');
const DataUtil = require('../../utils/dataUtil');
setDefaultTimeout(1 * 60000);

Then('User opens the details of a created season with name {string}', { timeout: 90000 }, async function (clubName) {
  await this.pages.sectionsClubPage.openClubDetailsByName(clubName)

});

Then('User choose the {string} tab in section', { timeout: 90000 }, async function (tabName) {

  await this.pages.sectionsClubPage.navigateTabs(tabName)

});


Then('the user taps the {string} button within the section', { timeout: 90000 }, async function (buttonName) {

  await this.pages.sectionsClubPage.clickSectionPageButton(buttonName)
})

Then('the user enter the team value in search bar', { timeout: 90000 }, async function (dataTable) {
  const data = dataTable.rowsHash();
  await this.pages.sectionsClubPage.enterTeamNameInSearch(data["SelectTeam"]);
})


Then('User able to choose the team from displayed list {string}', { timeout: 90000 }, async function (text) {
  await this.pages.sectionsClubPage.chooseTeamInList(text);
})
Then('enter season overview details', { timeout: 180000 }, async function (dataTable) {
  const data = dataTable.rowsHash();
  await this.pages.sectionsClubPage.enterSeasonOverviewDetails(data);
})

When('user types {string} in Search Name field', async function (sectionName) {
  await this.pages.sectionsClubPage.entersearchName(sectionName)
});

When('user selects Division Category {string}', { timeout: 30000 }, async function (categoryName) {
  await this.pages.sectionsClubPage.selectDivisionCategory(categoryName);
});
