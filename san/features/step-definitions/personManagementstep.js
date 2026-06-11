const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');

const fs = require('fs');
const path = require('path');
const { expect } = require('playwright/test');
const DataUtil = require('../../utils/dataUtil');
setDefaultTimeout(1 * 60000);

/**
 * Click on the Person  Management tab
 */

Then(`User can choose the {string} tab`, { timeout: 90000 }, async function (tabName) {
    await this.pages.personManagementPage.navigateTabForPerson(tabName);
});

// verify the Person Management title 
Then(`verify the page title for {string}`, { timeout: 90000 }, async function (expectedTitle) {
    await this.pages.personManagementPage.verifyPageTitle(expectedTitle)

});

/**
 * Click Create person button
 */
Then('User clicks the Edit mode button on Person Management page', { timeout: 30000 }, async function () {
    await this.pages.personManagementPage.clickEditModeButton();
});

Then('User verifies the Home tab is displayed', { timeout: 20000 }, async function () {
    await this.pages.personManagementPage.verifyHomeTabIsActive();
});

Then('User navigates to Finance Details section and clicks Edit mode', { timeout: 30000 }, async function () {
    await this.pages.personManagementPage.scrollToFinanceSectionAndClickEdit();
});

Then('User clicks the Update button on Finance Details section', { timeout: 30000 }, async function () {
    await this.pages.personManagementPage.clickFinanceUpdateButton();
});

Then(`user Click on {string} button`, { timeout: 90000 }, async function (buttonName) {
    await this.pages.personManagementPage.clickPersonManagementPageButton(buttonName)
});

/**
 * Fill the person detail page
 */
Then(`user enter the Person details`, { timeout: 90000 }, async function (dataTable) {
    const data = dataTable.rowsHash();
    const personDetails = dataTable.rowsHash();
    const emailID = data['Email'] === "random" ? DataUtil.generateRandomEmail() : data['Email']
    await this.pages.personManagementPage.fillPersonDetails(data);
    await this.pages.personManagementPage.setPersonDateOfBirth(personDetails['Date of Birth'] === "past" ? DataUtil.getPastDate() : personDetails['Date of Birth (DOB)']);
    await this.pages.personManagementPage.enterRandomEmailID(emailID);
    await this.pages.personManagementPage.selectPersonGenderAndFedration('Gender', data['Gender']);
    await this.pages.personManagementPage.selectPersonGenderAndFedration('Federation', data['Federation']);
    await this.pages.personManagementPage.enterPersonPlaceOfBirth(data['Place of Birth']);

});

/**
 * Fill the person other details
 */

Then(`user enter the Person other details`, { timeout: 90000 }, async function (dataTable) {
    const data = dataTable.rowsHash();
    const personDetails = dataTable.rowsHash();
    await this.pages.personManagementPage.fillOtherDetails(data);
});


When('User upload the profile photo via browse button {string}', async function (relativePath) {
    const filePath = require('path').join(process.cwd(), relativePath);
    await this.pages.personManagementPage.uploadClubLogoViaButton(filePath);
});


/**
 * Fill the address  details
 */

When('User choose address type set primary addressand address from dropdown on Add Address popup window', async function (dataTable) {
    let data = dataTable.rowsHash();
    await this.pages.personManagementPage.fillPersonAddressDetails(data)
});


Then('User access the {string} button', async function (buttonText) {
    await this.pages.personManagementPage.clickPersonManagementPageButton(buttonText)
});


Then('User opens the details of a created person with name {string}', async function (data) {
    await this.pages.personManagementPage.openPersonDetailsByName(data)
});

Then('User searches for the recently created person by PersonRBFA code and opens the first record', { timeout: 60000 }, async function () {
    await this.pages.personManagementPage.searchPersonByRBFACodeAndOpenFirst();
});

When('User can fill the Finance Details', async function (dataTable) {
    const financeData = dataTable.rowsHash();

    await this.pages.personManagementPage.fillFinanceDetails(financeData);
});

// Membership tab 


Then('User can add the memebership details', async function (dataTable) {
    const data = dataTable.rowsHash();
    if (data["Club"]) {
        await this.pages.personManagementPage.selectAddMembershipDropdown("Club", data["Club"]);
    }
    if (data["Club Section"]) {
        await this.pages.personManagementPage.selectAddMembershipDropdown("Club Section", data["Club Section"]);
    }
    await this.pages.personManagementPage.setClubSectionEndDateAndStartDate(data['Start Date'], data['End Date']);
    if (data['Status']) {
        await this.pages.personManagementPage.selectAddMembershipDropdown("Status", data['Status']);
    }
});

Then(
    'User Edit the existing club function {string} from grid', async function (name) {
        await this.pages.personManagementPage.clickEditIcoBtn(name);
    });



Then('User deletes the club {string} from grid', async function (name) {
    await this.pages.personManagementPage.clickDelectIconBtn(name);
});

Then('User click the Edit mode for Club function section', async function () {
    await this.pages.personManagementPage.clickSectionEditButton('Club Function(s)');
});

Then('User click the Edit mode for Section function section', async function () {
    await this.pages.personManagementPage.clickSectionEditButton('Section Function(s)');
});

Then('User click the Edit mode for Team function section', async function () {
    await this.pages.personManagementPage.clickSectionEditButton('Team Function(s)');
});

When('User clicks Add Function for {string}', async function (sectionName) {
    await this.pages.personManagementPage.clickAddFunction(sectionName);
});

When('User add function with below details', { timeout: 90000 }, async function (dataTable) {
    const data = dataTable.rowsHash();
    if (data["Club"]) {
        await this.pages.personManagementPage.selectAddMembershipDropdown("Club", data["Club"]);
    }
    if (data["Function"]) {
        await this.pages.personManagementPage.selectFunction(data["Function"])
    }
    await this.pages.personManagementPage.setClubSectionEndDateAndStartDate(data['Start Date'], data['End Date']);
    if (data['Status']) {
        await this.pages.personManagementPage.selectAddMembershipDropdown("Status", data['Status']);
    }
    if (data["Section"]) {
        await this.pages.personManagementPage.selectAddMembershipDropdown("Section", data['Section']);
    }
    if (data["Team"]) {
        await this.pages.personManagementPage.selectAddMembershipDropdown("Team", data["Team"])
    }
});

Then('User selects {string} and {string} status in {string} section', async function (status1, status2, sectionName) {
    await this.pages.personManagementPage.selectSectionStatusButtons(sectionName, [status1, status2]);
});

Then(
    'User deletes the function from club {string} and function {string}',
    async function (clubName, functionName) {
        await this.pages.personManagementPage.deleteFunction(clubName, functionName);
    }
);

Then('User edit the function from club {string} and function {string}', async function (clubName, functionName) {
    await this.pages.personManagementPage.editFunction(clubName, functionName);
});


//Users DEtails 


Then('User can add the user owner Details', async function (dataTable) {
    const data = dataTable.rowsHash();
    await this.pages.personManagementPage.fillOwnerUserName(data["Name"]);
});


Then('User delete the function from user', async function () {
    await this.pages.personManagementPage.deleteUser();
});


Then('User can add the user To act on behalf Details', async function (dataTable) {
    const data = dataTable.rowsHash();
    await this.pages.personManagementPage.fillMultiUserName(data["Name"]);
});

Then('User clicks the Save button for To act on behalf section', async function () {
    await this.pages.personManagementPage.usersClickOnSaveButton();
});

Then('User selects the row checkbox', async function () {
    await this.pages.personManagementPage.selectRowCheckbox();
});

Then('User clicks the Update button for To act on behalf', async function () {
    await this.pages.personManagementPage.userBhalfUpdateIcon();
});

Then('User clicks the Update button for Owner section', async function () {
    await this.pages.personManagementPage.userUpdateIcon();
});

Then('User click the Edit Mode for User Owner section', async function () {
    await this.pages.personManagementPage.clickEditModeForOwnerUsers();
});

Then('User click the Edit Mode for To act on behalf section', async function () {
    await this.pages.personManagementPage.clickEditModeForBehalfUsers();
});

Then('User edit the Mapped User added', async function (dataTable) {
    const data = dataTable.rowsHash();
    await this.pages.personManagementPage.editBehalfMappedUser(data["Name"]);
});

Then('User clicks the Edit icon on the person detail page', async function () {
    await this.pages.personManagementPage.clickPersonDetailEditIcon();
});

Then('User clicks the attribute quick search icon', async function () {
    await this.pages.personManagementPage.clickAttributeQuickSearch();
});

Then('User enters {string} in attribute search box', async function (value) {
    await this.pages.personManagementPage.enterAttributeSearchValue(value);
});

Then('User clicks the attribute search close icon', async function () {
    await this.pages.personManagementPage.clickAttributeSearchClose();
});

Then('User clicks the Confirm button for person attribute', async function () {
    await this.pages.personManagementPage.clickConfirmButtonForAttribute();
});

Then('User clicks the listed attribute record {string}', async function (attributeName) {
    await this.pages.personManagementPage.clickListedAttributeRecord(attributeName);
});

Then('User edits the owner user from Users list', async function () {
    await this.pages.personManagementPage.editOwnerUser();
});

Then('User edit the user from users list {string}', async function (userName) {
    await this.pages.personManagementPage.editUsersList(userName);
}
);

Then('User delete the user from user from Users to act on behalf list', async function () {
    await this.pages.personManagementPage.deleteUsers();
});

