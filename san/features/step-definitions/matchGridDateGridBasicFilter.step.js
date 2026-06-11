const { expect } = require('chai');
const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// scenario # 1
Then('user choose the {string} tab', { timeout: 90000 }, async function (tabName) {
    await this.pages.matchAndDateGridFilterPage.selectTab(tabName);
});

Then('User select the {string} tab', { timeout: 90000 }, async function (tabName) {
    await this.pages.matchAndDateGridFilterPage.selectTab(tabName);
});

Then('verify the {string} heading should be visible', { timeout: 90000 }, async function (label) {
    await this.pages.matchAndDateGridFilterPage.verifyBasicFilterElementVisible(label);
});

Then('verify the {string} textbox should be visible', { timeout: 90000 }, async function (label) {
    await this.pages.matchAndDateGridFilterPage.verifyBasicFilterElementVisible(label);
});

Then('verify the {string} input field should be visible', { timeout: 90000 }, async function (label) {
    await this.pages.matchAndDateGridFilterPage.verifyBasicFilterElementVisible(label);
});

Then('verify the {string} input should be visible', { timeout: 90000 }, async function (label) {
    await this.pages.matchAndDateGridFilterPage.verifyBasicFilterElementVisible(label);
});

Then(/^verify the "([^"]+)"\s+text should be visible$/, { timeout: 90000 }, async function (label) {
    await this.pages.matchAndDateGridFilterPage.verifyBasicFilterElementVisible(label);
});

Then('verify the {string} button should be visible', { timeout: 90000 }, async function (label) {
    await this.pages.matchAndDateGridFilterPage.verifyBasicFilterElementVisible(label);
});

// scenario # 2

Then('User enters value as {string} in {string}', { timeout: 90000 }, async function (inputValue, field) {

    await this.pages.matchAndDateGridFilterPage.enterValueInBasicFilter(inputValue, field);
});

Then('Wait for response of match grid API', { timeout: 90000 }, async function () {

    this.matchGridResponsePromise = this.page.waitForResponse(
            response => response.url().includes("match-grids/list") && response.request().method() === 'POST',
            { timeout: 90000 }
        );
});

Then('User clicks Apply button in basic filter', { timeout: 90000 }, async function () {

        await this.pages.matchAndDateGridFilterPage.clickOnBasicFilterApplyButton();
});

Then('User clicks Reset button in basic filter', { timeout: 90000 }, async function () {
        await this.pages.matchAndDateGridFilterPage.clickOnBasicFilterResetButton();
});

Then('verify all API response records have {string} matching {string} from match grid basic filter API response', { timeout: 90000 }, async function (field, expectedValue) {


     const response = await this.matchGridResponsePromise;
            const body = await response.json();
            this.matchGridApiResponse = body;
            expect(body.total).to.be.greaterThan(0);
            console.log(`✓ API /match-grids/list returned total: ${body.total}, items in page: ${body.items.length}`);
    
           await this.pages.matchAndDateGridFilterPage.validateApiResponseField(this.matchGridApiResponse, field, expectedValue);

});


// Scenario # 3
Then('Wait for response of date grid API', { timeout: 90000 }, async function () {

    this.matchGridResponsePromise = this.page.waitForResponse(
            response => response.url().includes("date-grids/list") && response.request().method() === 'POST',
            { timeout: 90000 }
        );
});
