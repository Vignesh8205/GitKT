const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');

const fs = require('fs');
const path = require('path');
const { expect } = require('playwright/test');
const DataUtil = require('../../utils/dataUtil');
setDefaultTimeout(1 * 60000);

/**
 * Click on the Club Management tab
 */
Then('User can able to navigate to Settings Page', { timeout: 90000 }, async function () {

    await this.pages.userManagementPage.navigateToUserManagement();
});


Then('User access the Add new button', { timeout: 90000 }, async function () {
    await this.pages.userManagementPage.clickOnCreateUser();
});

Then('user Fill Person details on new user page', { timeout: 90000 }, async function (dataTable) {
    const data = dataTable.rowsHash();

    await this.pages.userManagementPage.fillPersonDetails(data);
});


Then('User Fill the contact details on new user page', { timeout: 90000 }, async function (dataTable) {
    const data = dataTable.rowsHash();
    await this.pages.userManagementPage.fillContactDetails(data);
});

Then('User click on confirm the user button', { timeout: 90000 }, async function () {

    await this.pages.userManagementPage.userClickConfirmButton();
});
