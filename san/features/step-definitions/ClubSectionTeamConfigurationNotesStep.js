const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(1 * 60000);

Then('user choose the Team Configuration tab', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationNotesPage.clickTeamConfigurationTab();
});

Then('Click on the "National Level Team 1" suffix', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationNotesPage.clickTeamConfigurationSuffix('National Level Team 1');
});