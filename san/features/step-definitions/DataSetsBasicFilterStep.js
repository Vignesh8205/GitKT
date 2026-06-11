const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai');

setDefaultTimeout(2 * 60000);

Given('User navigates to DataSets page', { timeout: 90000 }, async function () {
    await this.pages.dataSetsBasicFilterPage.navigateToDataSets();
});

When('User opens DataSets filter and chooses Basic Filter', { timeout: 90000 }, async function () {
    await this.pages.dataSetsBasicFilterPage.openFilterAndBasicFilter();
});

When('User searches name {string} in DataSets search box', { timeout: 90000 }, async function (name) {
    await this.pages.dataSetsBasicFilterPage.searchByName(name);
});

When('User chooses status {string} in DataSets Status filter', { timeout: 90000 }, async function (statusValue) {
    await this.pages.dataSetsBasicFilterPage.chooseStatus(statusValue);
});

Then('User clicks Apply in DataSets basic filter', { timeout: 90000 }, async function () {
    this.dataSetsResponsePromise = this.page.waitForResponse(
        response => response.url().includes('libraries/list') && response.request().method() === 'POST',
        { timeout: 90000 }
    );
    await this.pages.dataSetsBasicFilterPage.clickApplyButton();
});

Then('verify all API response records have {string} matching {string} from DataSets basic filter API response', { timeout: 90000 }, async function (field, expectedValue) {
    const response = await this.dataSetsResponsePromise;
    const body = await response.json();
    this.dataSetsGridApiResponse = body;

    expect(body.total).to.be.greaterThan(0);
    console.log(`✓ API /libraries/list returned total: ${body.total}, items in page: ${body.items.length}`);

    await this.pages.dataSetsBasicFilterPage.validateApiResponseField(this.dataSetsGridApiResponse, field, expectedValue);
});
