/**
* Class Name: Advance Filter Step Definitions
* 
* Description: 
* this class details about advance filter step definitions
* 
* @author Prem Kumar
* @version 1.0
* @since 05-04-2026
* @last update 05-04-2026
*/
const { expect } = require('chai');
const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(1 * 60000);

/*
* This file contains step definitions for the advance filter feature.
* It defines the steps that correspond to the scenarios outlined in the feature file.
* The steps include actions such as clicking on icons, entering details, and verifying outputs.
* Each step interacts with the advance filter page through methods defined in the page object model.
*/

// Step definition for clicking on an icon with a specified label
When ('the user clicks on the {string} icon', {timeout:30000}, async function(label){
    await this.pages.advanceFilterPage.clickOnButton(label);
});

// Step definition for clicking on a tab with a specified label
When ('the user clicks on the {string} Tab',{timeout:30000}, async function(label){
    await this.pages.advanceFilterPage.clickOnButton(label);
});

// Step definition for entering details into the advance filter form
When('the user enters details',{timeout: 38000}, async function(dataTable){

    const data = dataTable.rowsHash();  

    if(data['Condition'] === 'In'){

         await this.pages.advanceFilterPage.chooseFieldOption('Group or conditions',data['Group or Conditions']);
         await this.pages.advanceFilterPage.chooseFieldOption('Field',data['Field']); 
         await this.pages.advanceFilterPage.chooseFieldOption('Condition',data['Condition']);
         await this.pages.advanceFilterPage.chooseInOperator('Value', data['Value']);

    }else  {

    
        await this.pages.advanceFilterPage.chooseFieldOption('Group or conditions',data['Group or Conditions']);
        await this.pages.advanceFilterPage.chooseFieldOption('Field',data['Field']); 
        await this.pages.advanceFilterPage.chooseFieldOption('Condition',data['Condition']);
        await this.pages.advanceFilterPage.chooseFieldOption('Value', data['Value']);
    }
    
});

// Step definition for clicking on a button with a specified label
When('the user clicks on the {string} button', {timeout:60000}, async function(label){
    
     await this.pages.advanceFilterPage.clickOnButton(label);
   
});

//Step definition for verifying that the actual output matches the expected output from a data table



Then('verify actual ouput should match with table output', { timeout: 60000 }, async function (dataTable) {


     const data = dataTable.rowsHash();  
     if(data['Field'] === 'Formats'){
    
         const messageLocator =await this.pages.advanceFilterPage.getFootballFormatValue();
         await expect(messageLocator.trim()).to.equal(data['Expected Output']);
     
    } else if(data['Field'] === 'Name'){

         const messageLocator =await this.pages.advanceFilterPage.getNameValue();
         await expect(messageLocator.trim()).to.include(data['Expected Output']);
    
    } else if(data['Field'] === 'Federation'){

        await this.pages.advanceFilterPage.moveToFirstRecordAndClick();
        const messageLocator =await this.pages.advanceFilterPage.getFederationValue();
        await expect(messageLocator.trim()).to.equal(data['Expected Output']);
       
     } else if(data['Field'] === 'Status'){
        const messageLocator = await this.pages.advanceFilterPage.getStatusValue();
        await expect(messageLocator.trim()).to.equal(data['Expected Output']);
     }

});

    //Step definition for Club - > Person Function -> Advance Filter
    When('open {string} from the club', {timeout:35000}, async function(clubName){
        await this.pages.advanceFilterPage.openClubFromClubList(clubName);  

    });

    When('Wait for response of {string} API', { timeout: 60000 }, async function (apiName) {

        this.clubPersonFunctionResponsePromise = this.page.waitForResponse(
            response => response.url().includes(apiName) && response.request().method() === 'POST',
            { timeout: 60000 }
        );

    });

    Then('verifies all API response records have {string} matching {string}', { timeout: 60000 }, async function (field, expectedValue) {

        const response = await this.clubPersonFunctionResponsePromise;
        const body = await response.json();
        this.clubPersonListApiResponse = body;
        expect(body.totalCount).to.be.greaterThan(0);
        console.log(`✓ API /persons/list returned total: ${body.totalCount}, items in page: ${body.items.length}`);

       await this.pages.advanceFilterPage.validateApiResponseField(this.clubPersonListApiResponse, field, expectedValue);
   

});

