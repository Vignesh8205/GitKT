const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai');
const LoginPage = require('../../pages/LoginPage');
const fs = require('fs');
const path = require('path');

// Set default timeout for all steps
setDefaultTimeout(2*60000);

Given('I am on the login page', { timeout: 90000 }, async function () {
    try {
           
        await this.pages.loginPage.navigateToLoginPage(this.baseUrl, { waitUntil: 'networkidle' });

        console.log("Navigated to login page");
        // Wait for login form to be visible (increase timeout for reliability)
        // await this.loginPage.waitForLoginForm(10000);

        try {
            const title = await this.pages.loginPage.getLoginTitle();
            console.log('Page title:', title);
        } catch (error) {
            console.log('Login title not found, but page loaded successfully');
        }


        console.log('Step completed successfully');
    } catch (error) {
     
        console.error('Error in step:', error.message);
        throw error;
    }
});

Given('I load credentials from {string}', async function (credentialsPath) {
    try {
        const fullPath = path.join(process.cwd(), credentialsPath);
        const credentialsData = fs.readFileSync(fullPath, 'utf8');
        this.credentials = JSON.parse(credentialsData);
        console.log('Credentials loaded successfully from:', credentialsPath);
    } catch (error) {
        console.error('Failed to load credentials from:', credentialsPath, error.message);
        throw error;
    }
});

Given('I load testData from {string}', async function (credentialsPath) {
    try {
        const fullPath = path.join(process.cwd(), credentialsPath);
        const credentialsData = fs.readFileSync(fullPath, 'utf8');
        this.testData = JSON.parse(credentialsData);
        console.log('Credentials loaded successfully from:', credentialsPath);
    } catch (error) {
        console.error('Failed to load credentials from:', credentialsPath, error.message);
        throw error;
    }
});

When('I enter username from {string}', async function (userKey) {
    const username = this.credentials[userKey].username;
    await this.pages.loginPage.enterUsername(username);
    console.log('Entered username for user:', userKey);
});

When('I enter password from {string}', async function (userKey) {
    const password = this.credentials[userKey].password;
    await this.pages.loginPage.enterPassword(password);
    console.log('Entered password for user:', userKey);
});

When('I click the login button', async function () {
    await this.pages.loginPage.clickLoginButton();
});

Then('I should remain on the login page', async function () {
    const currentURL = await this.pages.loginPage.getCurrentUrl();
    console.log("DEBUG: Current URL is ->", currentURL); // prints in terminal
    expect(currentURL).to.contain('/login');
});

When('I click the login button without entering credentials', { timeout: 90000 }, async function () {
    // Clear any existing values first
    await this.pages.loginPage.clearUsername();
    await this.pages.loginPage.clearPassword();
    await this.pages.loginPage.clickLoginButton();
});

Then('I should be logged in successfully', async function () {
    // Wait for navigation or dashboard elements to appear
    const navigated = await this.pages.loginPage.waitForNavigation(20000);

    if (!navigated) {
        // If URL doesn't change, check for success indicators
        const currentUrl = await this.pages.loginPage.getCurrentUrl();
        expect(currentUrl).to.not.include('/login');
    }
});

Then('I should see validation error messages', async function () {
    const errorMessages = await this.pages.loginPage.getAllErrorMessages();
    expect(errorMessages.length).to.be.greaterThan(0);
});


//User select the role
Then(`User select the Role on role list`, { timeout: 120000 }, async function () {
    await this.pages.loginPage.selectRBFAUser();
    console.log('RBFA user selected');

});



Then(`User select the season on dropdown`, { timeout: 90000 }, async function () {
    await this.pages.loginPage.userSelectDropdown();
    await this.pages.loginPage.userSelectSeasonOption();
});

Then(`User Clicking on submit button`, { timeout: 90000 }, async function () {
    await this.pages.loginPage.clickRoleConfirmButton();
    console.log('User Clicked submit button  ');

});

// Access the Competition managment menu 

Then(`Enter the {string}`, { timeout: 90000 }, async function (enterdivisioncode) {
    await this.pages.loginPage.enterUsername(enterdivisioncode);
    console.log('User  should be Access the create division category page ');
});



Then(`User select the dropdown`, { timeout: 90000 }, async function () {
    await this.pages.loginPage.dropdownDivisionPage();
    console.log('User  should be Access the create division window ');
});


When('I select {string} in the Season dropdown', async function (option) {
    await this.pages.loginPage.selectSeason(option);
});




