const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

const FormManagementPage = require('../../pages/FormManagementPage');
let formManagePage;
// Set default timeout for all steps
setDefaultTimeout(2*60000);

Given(`Verify the user able to access the MainMenu`, { timeout: 90000 }, async function () {
    formManagePage = new FormManagementPage(this.page);
    await formManagePage.clickMainMenu();
    console.log('User clicked Main menu on home page ');

});

Then(`User select the Form management menu`, { timeout: 90000 }, async function () {
    await formManagePage.clickFormManagement();
    console.log('User should be  Access Form Management window ');

});

Then(`User choose the Form builder tab`, { timeout: 90000 }, async function () {
    await formManagePage.clickFormBuilder();
    console.log('User Clicked on Form Builder Tab');
});

Then(`User Click the create new form option`, { timeout: 90000 }, async function () {
    await formManagePage.clickCreateNewForm();
    console.log('User should be access the new form window ');
});

Then(`User Clicking the standard Layout from select layout popup`, { timeout: 90000 }, async function () {
    await formManagePage.clickStandardLayout();
    console.log('User should be select the layout from layout option ');
});

//Verify the text Form Element 

Then(`erify the Text form element and able to set the properties of the text`, { timeout: 120000 }, async function () {
    await formManagePage.clickTextElement();
    console.log('User select Text form element and set the properties');
});