
const { expect } = require('chai');

class AdvanceFilterPage {


    constructor(page) {
        this.page = page;  
        
        //advance filter locators
        this.filterIcon = page.locator(
            "//span[contains(@style,'filter.svg')] | " +
            "//button[contains(@aria-label,'Filter') or contains(@title,'Filter')][.//span[contains(@style,'filter.svg')]] | " +
            "//button[contains(@aria-label,'filter') or contains(@title,'filter')]"
        ).first();
        this.advancedFilterTab = page.locator("//button[contains(text(),' Advanced Filter ')]");
        this.clickOnPlus = page.locator("//button[@title='Add Group/Condition']");
        this.addGroupOption = page.locator("//li[@aria-label='Add Group']");
        this.addConditionOption = page.locator("");
        this.applyAdvanceFilterButton = page.locator("//span[contains(text(),' Apply Advanced Filter ')]");
        this.selectaField = page.locator("//span[@class='e-input-group e-control-wrapper qb-dropdownlist e-ddl e-lib e-keyboard']");
        this.selectaFieldOption = page.locator("//li[@aria-label='Select a field']"); // no need and will check later
        this.selectOperator = page.locator("//span[@class='e-input-group e-control-wrapper e-ddl e-lib e-keyboard e-valid-input']");
        this.entertheValue = page.locator("//input[@role='textbox'] |//div[@class ='e-multi-select-wrapper']");
        this.letEnterTheValue = page.locator("//div[@class ='e-multi-select-wrapper']");

        //assertion locators
        this.footballFormatFootball = page.locator("(//span[normalize-space()='Football' and not(contains(@class,'opacity-50'))])[1]");
        this.nameOfClub= page.locator("(//div[contains(@class,'font-[400] text-base text-[var(--secondary-text)] truncate')])[1]");
        

        //navigation to federatio field and it's locator.
        this.clickOnFirstRecord = page.locator("(//div[contains(@class,'font-[400] text-base text-[var(--secondary-text)] truncate')])[1]");
        this.federation = page.locator("(//div[contains(@class,'flex items-center gap-2 font-base text-sm w-full ng-star-inserted')])[3]");
        this.statusOfClub = page.locator("(//span[contains(@class,'e-badge') or contains(@class,'status')])[1]");

        //search box locator and close search box locator
        this.searchBox = page.locator("//span[contains(@style,'url(assets/icons/grassroots/search-icon.svg);')]");
        this.enterSearchBox = page.locator("//input[@placeholder='Search by clubs']");
        this.closeSearchBox = page.locator("//button[contains(@class,'text-xl')]");

        //person function tab locator
        this.personFunctionsTab = page.locator(
            "//*[contains(@class,'e-tab-text') and normalize-space()='Person Function(s)'] | " +
            "//*[normalize-space()='Person Function(s)'][ancestor::*[contains(@class,'e-tab-header')]]"
        ).first();

        //basic  filter locators
        this.basicFilterTab = page.locator("//button[contains(text(),' Basic Filter ')]");
       
    }
//clickOnButton
    // Method to click on a button based on the provided label  
    async clickOnButton(label){
        const _click = async (locator, timeout = 20000) => {
            await locator.waitFor({ state: 'visible', timeout });
            await locator.scrollIntoViewIfNeeded();
            await locator.click();
        };

        switch(label){

            case 'advanced filter':
                await _click(this.advancedFilterTab);
            break;

            case 'basic filter':
                await _click(this.basicFilterTab);
            break;

            case 'filter':
                await _click(this.filterIcon, 25000);
            break;

            case 'apply advance filter':
                await _click(this.applyAdvanceFilterButton, 25000);
            break;

            case 'plus':
                await _click(this.clickOnPlus);
            break;

            case 'Person Function(s)':
                await _click(this.personFunctionsTab, 25000);
            break;

            default:
                console.log("Invalid button label");
        }
    }

    // Method to choose a field option based on the provided label and option
    async chooseFieldOption(label,option){

        if(label === 'Group or conditions'){ 
           
                await this.page.getByRole('menuitem',{name:option, exact: true}).click();

        } else if(label === 'Field'){

                await this.selectaField.click();
                await this.page.getByRole('option',{name:option, exact: true}).click();

        }else if(label === 'Condition'){

                await this.selectOperator.click();
                await this.page.getByRole('option',{name:option, exact: true}).click();
                

        }else if(label === 'Value'){
                await this.enterTheValues(option);
        }
    }
    // Method to choose an operator for the 'In' condition based on the provided label and option
    async chooseInOperator(label,option){

        if(label === 'Value'){
           
                await this.letEnterTheValue.click();
                const optionItem = this.page.getByRole('option', {name: option,exact: true});
                await optionItem.waitFor({ state: 'visible' });
                await optionItem.click();
        }   
    }

    // Method to enter values into the advance filter form based on the provided value
    async enterTheValues(value){ 

         await this.entertheValue.fill(value);
    }

    // Method to get the value of the football format field
    async getFootballFormatValue(){
         await this.footballFormatFootball.waitFor({ state: 'visible', timeout: 25000 });
         const actualValue = await this.footballFormatFootball.textContent();
         return actualValue;

    }

    // Method to get the value of the name field
    async getNameValue(){
         await this.nameOfClub.waitFor({ state: 'visible', timeout: 25000 });
         const actualValue = await this.nameOfClub.textContent();
         return actualValue;
    }

    // Method to get the value of the federation field
    async getFederationValue(){
         await this.federation.waitFor({ state: 'visible', timeout: 25000 });
         const actualValue = await this.federation.textContent();
         return actualValue;
    }

    // Method to get the value of the status field
    async getStatusValue(){
         await this.statusOfClub.waitFor({ state: 'visible', timeout: 25000 });
         const actualValue = await this.statusOfClub.textContent();
         return actualValue;
    }

    // Method to navigate to the first record and click on it
    async moveToFirstRecordAndClick(){
         await this.clickOnFirstRecord.waitFor({ state: 'visible', timeout: 25000 });
         await this.clickOnFirstRecord.click();
    }

    // Step definition for opening a club from the club list based on the provided club name
    async openClubFromClubList(clubName){   
            await this.page.getByRole('link', { name: clubName, exact: true }).click();
    };

    async validateApiResponseField(responseBody, field, expectedValue) {
        expect(responseBody).to.be.ok;
        expect(Array.isArray(responseBody.items)).to.be.true;

        const items = responseBody.items;
        console.log(items);

        console.log(`Validating ${items.length} API response items for field "${field}" = "${expectedValue}"`);

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let actualValue;

            if (field === 'Status') {
                actualValue = item?.status?.libraryValue;
            } else if (field === 'Team Function') {
                actualValue = item?.function?.name;
            } else if (field === 'Section Function') {
                actualValue = item?.function?.name;
            } else {
                throw new Error(`Unknown response field "${field}"`);
            }

            expect(
                actualValue?.toLowerCase(),
                `Item[${i}] "${item.name}" has ${field}="${actualValue}" but expected "${expectedValue}"`
            ).to.include(expectedValue.toLowerCase());
        }

        console.log(`✓ All ${items.length} records have ${field} = "${expectedValue}"`);
    }

    async openClubFromClubList(clubName){

        // click on search box and enter club name
        await this.searchBox.click();
        await this.enterSearchBox.fill(clubName);
        await this.enterSearchBox.press('Enter');
        await this.closeSearchBox.click();
        await this.moveToFirstRecordAndClick();


    }


}

module.exports = AdvanceFilterPage;

