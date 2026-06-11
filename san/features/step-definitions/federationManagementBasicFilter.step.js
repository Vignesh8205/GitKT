const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai');

setDefaultTimeout(2 * 60000);

Given('User navigates to Federation Management page', { timeout: 90000 }, async function () {
    await this.pages.federationManagementBasicFilterPage.navigateToFederationManagement();
});

When('User opens Federation Management filter and chooses Basic Filter', { timeout: 90000 }, async function () {
    await this.pages.federationManagementBasicFilterPage.openFilterAndBasicFilter();
});

When('User searches organization {string} in Organization dropdown', { timeout: 90000 }, async function (organizationName) {
    await this.pages.federationManagementBasicFilterPage.searchOrganization(organizationName);
});

When('User searches federation {string} in Federation dropdown', async function (federationList) {
  const federationArray = federationList.split(',').map(f => f.trim());

    await this.pages.federationManagementBasicFilterPage.selectOptions(federationArray);
});

When('User chooses format {string} in Format dropdown', { timeout: 90000 }, async function (formatValue) {
    await this.pages.federationManagementBasicFilterPage.chooseFormat(formatValue);
});

When('User chooses status {string} in Status filter', { timeout: 90000 }, async function (statusValue) {
    await this.pages.federationManagementBasicFilterPage.chooseStatus(statusValue);
});

Then('User clicks Apply in Federation Management basic filter', { timeout: 90000 }, async function () {

    this.OrganizationResponsePromise = this.page.waitForResponse(
            response => response.url().includes("organization/get-organizations") && response.request().method() === 'POST',
            { timeout: 90000 }
        );
    await this.pages.federationManagementBasicFilterPage.clickApplyButton();
});

Then('verify all API response records have {string} matching {string} from organization basic filter API response', { timeout: 90000 }, async function (field, expectedValue) {
    
    const response = await this.OrganizationResponsePromise;
    const body = await response.json();
            this.organizationGridApiResponse = body;
            expect(body.count).to.be.greaterThan(0);
    
            console.log(`✓ API /organization-grids/list returned total: ${body.total}, items in page: ${body.items.length}`);

    await this.pages.federationManagementBasicFilterPage.validateApiResponseField(this.organizationGridApiResponse, field, expectedValue);
});
