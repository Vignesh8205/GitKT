/**
* Class Name: Data Sets
* 
* Description: 
* this class details about data sets screen
* 
* @author Prem Kumar
* @version 1.0
* @since 13-02-2025
* @last update 14-02-2025
*/

const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai');
const DataUtil = require('../../utils/dataUtil');
//const SeasonPage = require('../../pages/SeasonPage');
const fs = require('fs');
const path = require('path');

// Set default timeout for all steps
setDefaultTimeout(60000);

// When ('enter season information', { timeout: 90000 }, async function(dataTable){

//         const data = dataTable.rowsHash();
//         await this.seasonPage.toFillSeasonInformation(data);
// })

When('user choose {string}', { timeout: 90000 }, async function (moduleName) {

        await this.pages.dataSetsPage.chooseModule(moduleName);
});


When('Click on the {string} button',{timeout: 9000}, async function(buttonName){

        await this.pages.dataSetsPage.clickOnButton(buttonName);

});

Then('enter data sets values', { timeout: 90000 }, async function (dataTable) {

         const data = dataTable.rowsHash();
         const name = data['Name'] === "random" ? DataUtil.generateRandomDataSetName() : data['Name'];
         await this.pages.dataSetsPage.enterRowValue(name);
});

When('Click on the rowwise {string} button',{timeout: 9000},async function(buttonName){

        await this.pages.dataSetsPage.clickOnRowWiseButton(buttonName);

});

Then('a {string} message appear on screen', {timeout: 9000}, async function(expectedMess){

       const message = await this.pages.dataSetsPage.verifyMessage();

         expect(message).to.equal(expectedMess);
});