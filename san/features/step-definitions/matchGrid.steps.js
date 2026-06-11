const { Given, When, Then } = require('@cucumber/cucumber');
const MatchGridPage = require('../../pages/MatchGridPage');



Then('User select the Match Grid tab', async function () {
    this.matchGridPage = new MatchGridPage(this.page);
    await this.matchGridPage.navigateToMatchGrid();
    console.log('Navigated to Match Grid tab');
});

Then('User click on Create Match Grid button', async function () {
    await this.matchGridPage.clickCreateMatchGrid();
    console.log('Clicked Create Match Grid button');
});

When('User enters Match Grid template name {string}', async function (templateName) {
    await this.matchGridPage.enterTemplateName(templateName);
});

When('User enters total teams {string}', async function (totalTeams) {
    await this.matchGridPage.enterTotalTeams(totalTeams);
});

When('user enter the matchday count {string}', async function (matchDayCount) {
    await this.pages.matchGridPage.enterMatchDayCount(matchDayCount);
    console.log('Entered matchday count:', matchDayCount);
});


Then('User click on Generate Grid button', async function () {
    await this.matchGridPage.clickGenerateGrid();
    console.log('Clicked Generate Grid button');
});

When('User enters Teams H value {string}', async function (teamH) {
    await this.matchGridPage.enterTeamH(teamH);
});

When('User enters Teams A value {string}', async function (teamA) {
    await this.matchGridPage.enterTeamA(teamA);
});
