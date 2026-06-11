const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai');

const DivisionCategoryPage = require('../../pages/Divisioncategorypage');

setDefaultTimeout(1 * 60000);

Then(`User select the Division Category menu`, async function () {
    try{
    this.divisionCategoryPage = new DivisionCategoryPage(this.page);
    await this.pages.divisionCategoryPage.navigateToDivisionCategory();
    console.log('User navigated to Division Category page');
    } catch(error){

        console.log(`Unable to navigate to division category :${error.message}`);
    }
});

Then(`User click on Add Division Category button`, async function () {

    try{
    await this.pages.divisionCategoryPage.clickAddDivisionCategory();
    console.log('Clicked Add Division Category button');
    } catch(error){
        console.log(`unable to click on Add Division category :${error.message}`);
    }
});

When(`User enters Division Category details`, async function (dataTable) {
    const data = dataTable.rowsHash();
    await this.pages.divisionCategoryPage.fillDivisionCategoryDetails(data);
});

When('User select the format as {string}', async function (option) {
    await this.pages.divisionCategoryPage.selectformat(option);
    
});

When('User enters Division Category description {string}', async function (description) {
    await this.pages.divisionCategoryPage.enterDescription(description);
});

When(
  'User select the division category type as {string}',async function (option) {
      await this.divisionCategoryPage.selectDivisionCategoryType(option);
  }
);




Then(`User click on Save Division Category`, async function () {
    await this.pages.divisionCategoryPage.clickSaveButton();
    console.log('Clicked Save Division Category');
});

Then(`User starts capturing the Division Category create API response`, async function () {
    this.pages.divisionCategoryPage.startCapturingCreateAPI();
});

Then(`User verifies and prints the Division Category create API response JSON`,
    { timeout: 30000 },
    async function () {
        this.divisionCategoryCreateApiResponse =
            await this.pages.divisionCategoryPage.awaitAndPrintCreateAPIResponse();
    }
);

Then(`Verify Division Category created with success message {string}`,
    async function (expectedMessage) {
        await this.pages.divisionCategoryPage.validatePopupByText(expectedMessage);
        console.log('Division Category success message validated');
    }
);

Then(`User searches for the recently created division category in quick search`,
    { timeout: 30000 },
    async function () {
        await this.pages.divisionCategoryPage.searchRecentlyCreatedRecord();
        console.log('User searched for the recently created division category');
    }
);

Then(`User clicks the recently created division category record`,
    { timeout: 30000 },
    async function () {
        await this.pages.divisionCategoryPage.clickRecentlyCreatedRecord();
        console.log('User clicked the recently created division category record');
    }
);

Then(`User click on Edit Division Category`,
    { timeout: 30000 },
    async function () {
        await this.pages.divisionCategoryPage.clickEditOnDivisionCategory();
        console.log('User clicked Edit on Division Category');
    }
);

When(`User updates Division Category details`,
    { timeout: 30000 },
    async function (dataTable) {
        const data = dataTable.rowsHash();
        await this.pages.divisionCategoryPage.updateDivisionCategoryDetails(data);
        console.log('User updated Division Category details');
    }
);

Then(`User click on Update Division Category`,
    { timeout: 30000 },
    async function () {
        await this.pages.divisionCategoryPage.clickUpdateButton();
        console.log('User clicked Update on Division Category');
    }
);

Then(`Verify Division Category updated with success message {string}`,
    { timeout: 30000 },
    async function (expectedMessage) {
        await this.pages.divisionCategoryPage.validatePopupByText(expectedMessage);
        console.log('Division Category update success message validated');
    }
);
