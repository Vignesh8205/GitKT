const { Given, When, Then } = require('@cucumber/cucumber');
const DateGridPage = require('../../pages/DateGridPage');

Then('User select the Date Grid tab', async function () {
    this.dateGridPage = new DateGridPage(this.page);
    await this.dateGridPage.navigateToDateGrid();
    console.log('Navigated to Date Grid tab');
});

Then('User click on Create Date Grid button', async function () {
    await this.dateGridPage.clickCreateDateGrid();
    console.log('Clicked Create Date Grid button');
});

When('User enters Date Grid template name {string}', async function (templateName) {
    await this.dateGridPage.enterTemplateName(templateName);
});

When('User enters total teams for date grid {string}', async function (totalTeams) {
    await this.dateGridPage.enterTotalTeams(totalTeams);
});

When('user enter the matchday count for date grid {string}', async function (count) {
    await this.dateGridPage.enterMatchDayCount(count);
});

Then('User click on Generate Grid button for date grid', async function () {
    await this.dateGridPage.clickGenerateGrid();
    console.log('Clicked Generate Grid button for Date Grid');
});



When('User enters start date {string}', async function (startDate) {
    await this.dateGridPage.enterStartDate(startDate);
    console.log('Entered start date:', startDate);
});



When('User clicks on Create Date Grid', async function () {
    await this.dateGridPage.clickCreateDateGrid();
});

Then(`User enters startDate  {string}`, async function (startDate)  {
    // this.dateGridPage = new DateGridPage(this.page);
    await this.dateGridPage.setStartDate(startDate)
});

/*Then(
    'validate popup message as {string}',
    async function (expectedMessage) {
        const result =
            await this.dateGridPage.verifySuccessMessage(expectedMessage);
        expect(result).toBeTruthy();
    }
);*/


