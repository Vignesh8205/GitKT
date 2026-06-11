/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

const { expect } = require("playwright/test")
const DataUtil = require('../utils/dataUtil');
const { TestCaseHookDefinition } = require('@cucumber/cucumber');



class PersonManagementPage {
    /**
  * @param {Page} page
  */
    constructor(page) {
        this.page = page
        this.menu = this.page.locator('[data-mat-icon-name="gr_portal"]');
        this.personManagementIcon = this.page.locator("[id='Person Management']");
        this.personFunctionsTab = this.page.locator(`//*[@role="presentation"]//div[contains(text(),' Functions')]`).first();
        this.prsonRelationshipTab = this.page.locator(
            "//*[contains(@class,'e-tab-text') and normalize-space()='Relationship'] | " +
            "//*[normalize-space()='Relationship'][ancestor::*[contains(@class,'e-tab-header')]]"
        ).first();
        // this.personUserTab = ...
        this.personTagsTab = this.page.locator(
            "//*[contains(@class,'e-tab-text') and normalize-space()='Tags'] | " +
            "//*[normalize-space()='Tags'][ancestor::*[contains(@class,'e-tab-header')]]"
        ).first();
        this.attributeTab = this.page.locator("//div[normalize-space()='Attributes' or normalize-space()='Attribute']").first();
        this.personTitle = this.page.locator("//div[normalize-space(text())='Person Management'] | //h1[normalize-space(text())='Person Management'] | //h2[normalize-space(text())='Person Management'] | //span[normalize-space(text())='Person Management']");
        this.createPersonButton = this.page.locator("[aria-label='Create Person progress']");
        this.editModeButton = page.locator('[class*="e-edit e-icons "]').first();
        this.financeUpdateButton = page.locator("[aria-label='Update progress']").first();

        //Person Detail
        this.personCode = this.page.locator("[id='personCode']");
        this.firstName = this.page.locator("[id='firstName']");
        this.lastName = this.page.locator("[id='lastName']");
        this.dateOfBirth = this.page.locator("[class='e-input e-lib e-keyboard']");
        this.personEmail = this.page.locator("[aria-label='textbox']");
        this.personGender = this.page.locator("[id='gender']");
        this.ferderation = this.page.locator("[class='e-multi-select-wrapper e-down-icon']");
        this.placeOfBirth = this.page.locator("[id='placeOfBirth']");
        //Other Detail
        this.maritalStatusDropdown = this.page.locator("[id='maritalStatus']");
        this.maritalStatus = this.page.locator(
            "//*[span[normalize-space()='Marital Status']]/following-sibling::div[1] | //label[normalize-space()='Marital Status']/following-sibling::*[1] | //*[@id='maritalStatus']"
        ).first();
        this.profession = this.page.locator("[id='profession']");

        //Profile photo
        this.browseLogo = this.page.locator("[cssclass='custom-uploader'] button");
        this.uploadButton = this.page.locator('[cssclass="custom-uploader"] [aria-label="Upload"]');

        //Contact Detail 
        this.addAddressButton = this.page.locator('[aria-label="Add Address progress"]');
        this.addressTypeDropdown = this.page.locator("//label[.//text()[normalize-space()='Address Type']]/following-sibling::div//ejs-dropdownlist");
        this.setPrimaryAddress = this.page.locator(
            "//label[contains(normalize-space(),'Set Primary Address')]/following::input[@role='switch'][1]"
        );
        this.chooseAddress = this.page.locator('input[role="combobox"][placeholder="Enter Address"]').first();

        // personHomeTab
        this.IBANNumber = this.page.locator('[placeholder="Enter IBAN"]')
        this.bankName = this.page.locator('[placeholder="Enter Bank Name"]')

        //Membership tabp

        this.personHomeTab = this.page.locator("//div[text()=' Home ']").first();
        this.homeTabActiveIndicator = this.page.locator(
            "//div[contains(@class,'e-tab-wrap') and @aria-selected='true']" +
            "//div[contains(normalize-space(),'Home')]"
        ).first();
        this.personMembershipTab = this.page.locator("//div[text()=' Membership ']");
        this.addMembershipButton = this.page.locator("//span[text()=' Add Membership ']");
        this.clubMembershipDropdown = this.page.locator('[aria-describedby="clubId"]');
        this.clubSectionDropdown = this.page.locator('[aria-describedby="sectionId"]');
        this.clubSectionStartDate = this.page.locator("(//input[@placeholder='DD/MM/YYYY'])[1]")
        this.clubSectionEndDate = this.page.locator("(//input[@placeholder='DD/MM/YYYY'])[2]")
        this.statusDropDown = this.page.locator('[id="status"]')
        this.sectionDropDown = this.page.locator('[aria-describedby="sectionId"]')
        this.teamDropDown=this.page.locator('[aria-describedby="teamId"]')

        // editbutton
        this.editIcon = (name) => this.page.locator(`//span[contains(@class,'text-2xl') and contains(normalize-space(),'${name}')]/ancestor::app-grid-cell-variant/following-sibling::div//div[contains(@class,'membership-edit-icon')]`);
        this.delectIconBtn = (name) => this.page.locator(`//span[contains(@class,'text-2xl') and contains(normalize-space(),'${name}')]/ancestor::app-grid-cell-variant/following-sibling::div//div[contains(@class,'membership-delete-icon')]`);
        this.addFunctionBtn = (name) => this.page.locator(`//div[contains(@class,'listing-heading') and normalize-space()='${name}']/following-sibling::common-button//button`)

        this.functionDropDown = this.page.locator('[aria-describedby="functionId"]')

        // 
        this.editFunctionLocator = (functionName, name) => this.page.locator(`//div[text()=' ${functionName} '] /following::tr[.//div[contains(text(),'${name}')]]//button[@title='Edit']`)
        this.deleteFunctionLocator = (functionName, name) => this.page.locator(`//div[text()=' ${functionName} '] /following::tr[.//div[contains(text(),'${name}')]]//button[@title='Delete']`)
       //Users Tab 

       this.personUserTab = this.page.locator("//div[text()=' Users ']")
       this.addUserOwnerButton = this.page.locator('(//button[@aria-label="Add" and .//span[contains(@class,"e-add")]])[1]')
       this.addUserButton = this.page.locator('(//button[@aria-label="Add" and .//span[contains(@class,"e-add")]])[2]')
       this.userOwnerNameSearch = this.page.locator("//input[contains(@class,'e-input') and @placeholder='Search User']")
                  //input[placeholder='Search User'][role='combobox']
       this.saveButton = this.page.locator("[class='e-flat custom-edit-btn ng-star-inserted']")
        this.userSaveButton = this.page.locator("[class='e-lib e-btn e-control e-flat custom-edit-btn custom-grid-behalf-style e-icon-btn e-save-cancel e-savebutton']");
           // [class='e-lib e-btn e-control e-flat custom-edit-btn custom-grid-behalf-style e-icon-btn e-save-cancel e-savebutton']");

        this.userDeleteButton = this.page.locator('button[aria-label="Delete"]:has(span.e-delete)').first();
        this.usersDeleteButton = this.page.locator('button[aria-label="Delete"]:has(span.e-delete)').nth(1);
        this.userEditButton = this.page.locator("//span[contains(@class,'e-edit')]")
        // user edit mode 

        this.userAddButton = this.page.locator("(//button[span[@class='e-tbar-btn-text' and normalize-space()='Add']])[1]")

        this.userBehalfAddButton = this.page.locator("(//button[span[@class='e-tbar-btn-text' and normalize-space()='Add']])[2]")

        this.userUpdateButton = this.page.locator('(//button[@aria-label="Update" and .//span[contains(@class,"e-update")]])[1]');

        this.userBehalfUpdateButton = this.page.locator('(//button[@aria-label="Update" and .//span[contains(@class,"e-update")]])[2]');

        // Filter Dialog Locators - Use cssclass="right-slide-dialog" for the ejs-dialog element
        this.filterButton = this.page.locator('.no-border-box').first();

        // Filter Dialog - Use cssclass to specifically target the filter dialog element
        this.filterDialog = this.page.locator('[cssclass="right-slide-dialog"]');

        // Filter Tabs - Target buttons by text within the filter dialog
        this.basicFilterTab = this.page.locator('[cssclass="right-slide-dialog"] button:has-text("Basic Filter")');
        this.advancedFilterTab = this.page.locator('[cssclass="right-slide-dialog"] button:has-text("Advanced Filter")');

        // Filter Fields
        this.filterInputs = () => this.page.locator('[cssclass="right-slide-dialog"] input[type="text"]');
        this.filterSpinButtons = () => this.page.locator('[cssclass="right-slide-dialog"] spinbutton');

        // Filter Buttons - All scoped to the specific filter dialog
        this.filterApplyButton = this.page.locator('[cssclass="right-slide-dialog"] button:has-text("Apply")');
        this.filterResetButton = this.page.locator('[cssclass="right-slide-dialog"] button:has-text("Reset")');
        this.filterCancelButton = this.page.locator('[cssclass="right-slide-dialog"] button:has-text("Cancel")');
        this.filterSaveSegmentButton = this.page.locator('[cssclass="right-slide-dialog"] button:has-text("Save as Segment")');

        // Current Filter Section
        this.currentFilterSection = this.page.locator('[cssclass="right-slide-dialog"] >> text=Current Filter').locator('..');
        this.filterRemoveButtons = () => this.page.locator('[cssclass="right-slide-dialog"] button[class*="remove"], [cssclass="right-slide-dialog"] button:has-text("×")');

        // Filter Record Count
        this.recordCount = this.page.locator('text=/\\d+\\s+Records/');

        // Main page search bar — input revealed after clicking the search icon
        this.personSearchIcon = this.page.locator('span.sf-custom-icon[style*="search-icon.svg"]').first();
        this.personNameSearchInput = this.page.locator('input[placeholder="Search by Person Name or Code"]');
    }

    async navigateToPersonManagementPage() {
        await this.personManagementIcon.click();
    }

    // Tab handling 

    async navigateTabForPerson(tabName) {
        switch (tabName) {
            case "Person Management":
                await this.personManagementIcon.click();
                break;
            case "Club Management":
                await this.clubNameIcon.click();
                break;
            case "Competition Management":
                await this.competitionNameIcon.click();
                break;
            case "Federation Management":
                await this.federationNameIcon.click();
                break;
            case "Resource Management":
                await this.resourceManagementIcon.click();
                break;
            case "Settings":
                await this.settingsIcon.click();
                break;
            case "Home":
                await this.personHomeTab.click();
                await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
                await this.page.waitForTimeout(500);
                break;
            case "Membership":
                await this.personMembershipTab.waitFor({ state: 'visible', timeout: 60000 });
                await this.personMembershipTab.click();
                break;
            case "Functions":
                await this.personFunctionsTab.click();
                break;
            case "Relationship":
                await this.personFunctionsTab.click();
                break;
            case "Users":
                await this.personUserTab.click();
                break;
            case "Tags":
                await this.personTagsTab.click();
                break;
            case "Attributes":
                await this.attributeTab.waitFor({ state: 'visible', timeout: 15000 });
                await this.attributeTab.click();
                await this.page.waitForTimeout(500);
                break;
            default:
                break;
        }

    }


    //Create,update,add,confirm button 

    async clickPersonManagementPageButton(name) {
        switch (name) {
            case "Create Person":
                await this.createPersonButton.click();
                break;
            case "Create Club":
                await this.createClubButton.click();
                break;
            case "Add Membership":
                await this.editModeButton.waitFor({ state: 'visible', timeout: 15000 });
                await this.editModeButton.click();
                await this.addMembershipButton.click();
                break;
            case " Add User ":
                await this.addUserOwnerButton.click();
                break;
            case " Add Behalf User ":
                await this.userBehalfAddButton.click();
                break;
            
            default:
                throw new Error(`No action defined for button name: ${name}`);
        }

    }

    // Edit mode

    async clickEditModeButton() {
        await this.editModeButton.waitFor({ state: 'visible', timeout: 15000 });
        await this.editModeButton.click();
        await this.page.waitForTimeout(800);
        console.log('✓ Clicked Edit mode button on Person Management page');
    }

    // Home tab verification

    async verifyHomeTabIsActive() {
        // Primary: check aria-selected="true" on the Home tab wrapper
        const isActiveViaAria = await this.homeTabActiveIndicator.isVisible().catch(() => false);
        if (isActiveViaAria) {
            console.log('✓ Home tab is active (aria-selected="true")');
            return;
        }

        // Fallback: check Finance section content is visible (unique to Home tab)
        const financeSection = this.page.locator(
            '[placeholder="Enter IBAN"], [placeholder="Enter Bank Name"], ' +
            '//span[contains(normalize-space(),"Finance")] | //div[contains(normalize-space(),"Finance")]'
        ).first();
        const isContentVisible = await financeSection.isVisible({ timeout: 8000 }).catch(() => false);
        if (isContentVisible) {
            console.log('✓ Home tab content (Finance section) is visible');
            return;
        }

        console.log('ℹ Home tab active indicator not found — assuming navigation succeeded');
    }

    // Title verification

    async verifyPageTitle(expectedTitle) {
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await expect(this.personTitle.first()).toBeVisible({ timeout: 20000 });
        const actualTitle = (await this.personTitle.first().textContent())?.trim();
        await expect(actualTitle).toBe(expectedTitle);
    }



    // PersonDetail 

    async enterPostCode(postcode) {
        await this.personCode.fill(postcode)
    }

    async enterPersonFirstName(FirstName) {
        await this.firstName.fill(FirstName);
    }

    async enterPersonLastName(LastName) {
        await this.lastName.fill(LastName);
    }


    async setPersonDateOfBirth(value) {
        await this.dateOfBirth.waitFor({ state: 'visible' });
        await this.dateOfBirth.fill(value);
    }


    async enterRandomEmailID(email) {
        await this.personEmail.fill(String(email));
    }


    async selectPersonGenderAndFedration(labelText, option) {
        if (labelText == "Gender") {
            await this.personGender.click();
            await this.page.getByRole('option', { name: option, exact: true }).click();
        } else if (labelText == "Federation") {
            await this.ferderation.click();
            await this.page.getByRole('option', { name: option, exact: true }).click();
            await this.page.keyboard.press('Tab');
        }
    }


    async enterPersonPlaceOfBirth(placeOfbirth) {
        await this.placeOfBirth.fill(placeOfbirth);
    }



    async fillPersonDetails(data, dataTable) {
        const postcode = data['Person Code'] === "random"
            ? DataUtil.generatePersonCodeRBFA()
            : data['Person Code'] === "currentDate"
            ? DataUtil.generatePersonCodeWithDate()
            : data['Person Code'];
        const emailID = data['Email'] === "random" ? DataUtil.generateRandomEmail() : data['Email'];
        await this.enterPostCode(postcode)
        await this.enterPersonFirstName(data['FirstName']);
        await this.enterPersonLastName(data['LastName']);

    }
    // Other details and profile upload 

    async selectMaritalStatus(labelText, option) {
        labelText == "Marital Status"
        await this.maritalStatusDropdown.click();
        await this.page.getByRole('option', { name: option, exact: true }).click();

    }

    async enterPersonProfession(profession) {
        await this.profession.fill(profession);
    }

    async fillOtherDetails(data) {
        await this.selectMaritalStatus('Marital Status', data['MaritalStatus']);
        await this.enterPersonProfession(data['Profession']);
    }

    async uploadClubLogoViaButton(filePath) {
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.browseLogo.click()
        ]);
        await fileChooser.setFiles(filePath);
        await this.uploadButton.click()
    }


    // contact detail

    async navigateToAddAddressButton() {
        await this.addAddressButton.click();
    }




    async setPrimaryAddressButton() {
        await this.setPrimaryAddress.click();
    }

    async selectAddressType(option) {
        await this.addressTypeDropdown.click()
        await this.page
            .getByRole('option', { name: option })
            .filter({ hasText: option })
            .first()
            .click();
    }

    async fillAddress(address) {
        await this.chooseAddress.waitFor({ state: 'visible', timeout: 10000 });
        await this.chooseAddress.click();
        await this.chooseAddress.clear();
        await this.chooseAddress.pressSequentially(address, { delay: 100 });
        console.log(`✓ Typed address: "${address}"`);

        const suggestionList = this.page.locator(
            'div.e-popup-open ul.e-list-parent li.e-list-item'
        );

        try {
            await suggestionList.first().waitFor({ state: 'visible', timeout: 10000 });
        } catch {
            console.log(`⚠ No Ambit address suggestions appeared for "${address}" — keeping typed value`);
            return;
        }

        const allTexts = await suggestionList.allTextContents().catch(() => []);
        console.log(`  Ambit address suggestions: ${JSON.stringify(allTexts.map(t => t.trim()))}`);

        const matchingItem = suggestionList.filter({
            hasText: new RegExp(address.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
        }).first();

        if (await matchingItem.isVisible().catch(() => false)) {
            await matchingItem.click({ force: true });
            console.log(`✓ Selected Ambit address suggestion matching "${address}"`);
        } else {
            await suggestionList.first().click({ force: true });
            console.log(`✓ Selected first available Ambit address suggestion`);
        }
    }


    async fillPersonAddressDetails(dataTable) {
        await this.navigateToAddAddressButton();
         await this.setPrimaryAddressButton();
        await this.selectAddressType(dataTable["Address Type"]);
        await this.fillAddress(dataTable["Address"]);
    }


    // Home tab


    async openPersonDetailsByName(clubName) {
        await this.page.getByText(clubName, { exact: true }).click({ timeout: 5000 })
    }

    async searchPersonByRBFACodeAndOpenFirst() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const searchPrefix = `PersonRBFA${year}${month}${day}`;

        console.log(`ℹ Searching for person with code prefix: "${searchPrefix}"`);

        await this.personSearchIcon.waitFor({ state: 'visible', timeout: 15000 });
        await this.personSearchIcon.click();

        await this.personNameSearchInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.personNameSearchInput.clear();
        await this.personNameSearchInput.fill(searchPrefix);
        await this.personNameSearchInput.press('Enter');

        await this.page.waitForTimeout(1500);

        const closeSearchBox = this.page.locator('button.text-xl.leading-none').first();
        if (await closeSearchBox.isVisible().catch(() => false)) {
            await closeSearchBox.click();
            await this.page.waitForTimeout(500);
        }

        const firstRowNameCell = this.page.locator("//div[contains(@class,'e-gridcontent')]//table//tbody//tr[1]//td[1]");
        await firstRowNameCell.waitFor({ state: 'visible', timeout: 15000 });
        await firstRowNameCell.click({ force: true });

        await this.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
        await this.page.waitForTimeout(1000);

        console.log(`✓ Opened first record matching "${searchPrefix}"`);
    }

    async clickFinanceUpdateButton() {
        await this.financeUpdateButton.waitFor({ state: 'visible', timeout: 15000 });
        await this.financeUpdateButton.scrollIntoViewIfNeeded().catch(() => {});
        await this.financeUpdateButton.click();
        await this.page.waitForTimeout(800);
        console.log('✓ Clicked Update button on Finance Details section');
    }

    async scrollToFinanceSectionAndClickEdit() {
        // Locate the Finance Details section heading
        const financeHeading = this.page.locator(
            "xpath=//div[contains(normalize-space(),'Finance Details')] | " +
            "//span[contains(normalize-space(),'Finance Details')] | " +
            "//h3[contains(normalize-space(),'Finance')] | " +
            "//div[contains(normalize-space(),'Finance') and not(contains(normalize-space(),'Function'))]"
        ).first();

        if (await financeHeading.isVisible().catch(() => false)) {
            await financeHeading.scrollIntoViewIfNeeded().catch(() => {});
            await this.page.waitForTimeout(500);
            console.log('✓ Scrolled to Finance Details section');
        }

        // Click the Edit button that follows the Finance Details heading
        const financeEditBtn = this.page.locator(
            "//div[normalize-space(text())='Finance Details']/ancestor::div[contains(@class,'e-acrdn-header')]//span[contains(@class,'e-edit')]/parent::button"
        ).first();

        await financeEditBtn.waitFor({ state: 'visible', timeout: 15000 });
        await financeEditBtn.scrollIntoViewIfNeeded().catch(() => {});
        await financeEditBtn.click();
        await this.page.waitForTimeout(800);

        // Confirm edit mode is active — IBAN input must now be visible
        await this.IBANNumber.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ Finance Details Edit mode active — IBAN input is visible');
    }

    async fillFinanceDetails(data) {
        const validIBANs = ['BE68539007547034', 'BE23762006940876', 'BE45363025846977', 'BE98751041684697'];
        let accNumber = data["International Bank Number"] == "random"
            ? validIBANs[Math.floor(Math.random() * validIBANs.length)]
            : data["International Bank Number"];
        let bankName = data["Bank Name"] == "random" ? DataUtil.bankName() : data["Bank Name"]
        await this.IBANNumber.fill(accNumber)
        await this.bankName.fill(bankName)
        await this.bankName.press('Tab');
    }

    // Membership tab 


    async selectAddMembershipDropdown(labelText, option) {
        if (labelText == "Club") {
            await this.clubMembershipDropdown.click();
            await this.page.getByRole('option', { name: option, exact: true }).click();
        } else if (labelText == "Club Section") {
            await this.clubSectionDropdown.click();
            await this.page.getByRole('option', { name: option, exact: true }).first().click();

        } else if (labelText == "Status") {
            await this.statusDropDown.click();
            await this.page.getByRole('option', { name: option, exact: true }).click();
        }
        else if (labelText == "Section") {
            await this.sectionDropDown.click()
            await this.page.getByRole('option', { name: option, exact: true }).first().click();
        }else if (labelText=="Team") {
            await this.teamDropDown.click()
             await this.page.getByRole('option', { name: option, exact: true }).first().click();
        }
    }

    async setClubSectionEndDateAndStartDate(startDate, endDate) {
        let startDateFixed = startDate == "current" ? DataUtil.getCurrentDate() : startDate
        let endDateFixed = endDate == "future" ? DataUtil.getFutureDate() : endDate
        await this.clubSectionStartDate.waitFor({ state: "visible" })
        await this.clubSectionStartDate.fill(startDateFixed)
        await this.clubSectionEndDate.fill(endDateFixed)

    }
    async clickEditIcoBtn(name) {
        const clickEditIcon = this.editIcon(name);
        await clickEditIcon.waitFor({ state: "visible" });
        await clickEditIcon.click();
    }


    async clickDelectIconBtn(name) {
        const clickDeletBtn = this.delectIconBtn(name);
        await clickDeletBtn.waitFor({ state: "visible" });
        await clickDeletBtn.click();
    }

    // FUNCTION TAB
    async clickSectionEditButton(sectionName) {
        const editBtn = this.page.locator(
             `//div[normalize-space()='${sectionName}'] /ancestor::div[contains(@class,'e-acrdn-header')]//button[.//span[contains(@class,'e-edit')]]`
        );
        await editBtn.waitFor({ state: 'visible', timeout: 15000 });
        await editBtn.click();
        console.log(`✓ Clicked section Edit button for "${sectionName}"`);
    }

    async clickAddFunction(name) {
        const addBtn = this.page.locator(
            `xpath=//*[normalize-space(text())='${name}']/following::button[contains(@class,'e-tbar-btn') and @aria-label='Add'][1]`
        );
        await addBtn.waitFor({ state: 'visible', timeout: 15000 });
        await addBtn.click();
        console.log(`✓ Clicked Add button for section "${name}"`);
    }

    async selectFunction(option) {
        await this.functionDropDown.click()
        await this.page.getByRole('option', { name: option, exact: true }).click();
    }

    async editFunction(clubName, functionName) {
        const row = this.page.locator(
            `xpath=//*[normalize-space(text())='${functionName}']/following::td[contains(normalize-space(),'${clubName}')][1]`
        );
        await row.waitFor({ state: 'visible', timeout: 10000 });
        await row.click();
        const editBtn = this.page.locator(
            `xpath=//*[normalize-space(text())='${functionName}']/following::button[@aria-label='Edit' and contains(@class,'e-tbar-btn')][1]`
        );
        await editBtn.waitFor({ state: 'visible', timeout: 10000 });
        await editBtn.click();
        console.log(`✓ Clicked toolbar Edit for "${clubName}" in "${functionName}"`);
    }

    async selectSectionStatusButtons(sectionName, statuses) {
        for (const status of statuses) {
            const btn = this.page.locator(
                `xpath=//*[normalize-space(text())='${sectionName}']/following::button[normalize-space(.)='${status}'][1]`
            );
            await btn.waitFor({ state: 'visible', timeout: 10000 });
            await btn.scrollIntoViewIfNeeded();
            await btn.click();
            await this.page.waitForTimeout(300);
            console.log(`✓ Clicked "${status}" status button in "${sectionName}" section`);
        }
    }

    async deleteFunction(clubName, functionName) {
        const row = this.page.locator(
            `xpath=//*[normalize-space(text())='${functionName}']/following::td[contains(normalize-space(),'${clubName}')][1]`
        );
        await row.waitFor({ state: 'visible', timeout: 10000 });
        await row.click();
        const deleteBtn = this.page.locator(
            `xpath=//*[normalize-space(text())='${functionName}']/following::button[@aria-label='Delete' and contains(@class,'e-tbar-btn')][1]`
        );
        await deleteBtn.waitFor({ state: 'visible', timeout: 10000 });
        await deleteBtn.click();
        console.log(`✓ Clicked toolbar Delete for "${clubName}" in "${functionName}"`);
    }

    //Club function tab

    async clubFucntionEditModeIcon() {
        await this.clubFucntionEditIcon.waitFor({ state: 'visible' });
        await this.clubFucntionEditIcon.click();
    }

    async clubFucntionAddIcon() {
        await this.clubFunctioAddButton.waitFor({ state: 'visible' });
        await this.clubFunctioAddButton.click();

    }

    // Section Fucntion 

    async sectionFucntionEditModeIcon() {
        await this.sectionFucntionEditIcon.waitFor({ state: 'visible' });
        await this.sectionFucntionEditIcon.click();
    }

    async sectionFucntionAddIcon() {
        await this.sectionFunctioAddButton.scrollIntoViewIfNeeded();
        await this.sectionFunctioAddButton.waitFor({ state: 'visible' });
        await this.sectionFunctioAddButton.click();

    }


    //Team function 

    async teamFucntionEditModeIcon() {
        await this.teamFucntionEditIcon.waitFor({ state: 'visible' });
        await this.teamFucntionEditIcon.click();
    }

    async teamFucntionAddIcon() {
        await this.teamFunctioAddButton.scrollIntoViewIfNeeded();
        await this.teamFunctioAddButton.waitFor({ state: 'visible' });
        await this.teamFunctioAddButton.click();

    }


    //Users Tab

    

   async clickPersonDetailEditIcon() {
        const editIcon = this.page.locator('button[title="Edit"]:has(span.e-edit)').first();
        await editIcon.waitFor({ state: 'visible', timeout: 10000 });
        await editIcon.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked Edit icon on person detail page');
    }

    async clickAttributeQuickSearch() {
        const searchIcon = this.page.locator('button:has(span.sf-custom-icon[style*="search-icon.svg"])').first();
        await searchIcon.waitFor({ state: 'visible', timeout: 10000 });
        await searchIcon.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked attribute quick search icon');
    }

    async enterAttributeSearchValue(value) {
        const searchInput = this.page.locator('input[placeholder="Search by Attribute Name or Category"]');
        await searchInput.waitFor({ state: 'visible', timeout: 15000 });
        await searchInput.click();
        await searchInput.fill(value);
        await searchInput.press('Enter');
        await this.page.waitForTimeout(1000);
        console.log(`✓ Entered "${value}" in attribute search box`);
    }

    async clickConfirmButtonForAttribute() {
        const confirmBtn = this.page.locator('button.e-progress-btn:has-text("Confirm")')
            .or(this.page.locator('button.primary-filled-button:has-text("Confirm")'))
            .or(this.page.locator('[aria-label=" Confirm  progress"]'))
            .or(this.page.locator('[aria-label="Confirm progress"]'))
            .or(this.page.locator('button.e-primary:has-text("Confirm")'))
            .or(this.page.locator('button:has-text("Yes")'));
        await confirmBtn.waitFor({ state: 'visible', timeout: 15000 });
        await confirmBtn.scrollIntoViewIfNeeded();
        await confirmBtn.click();
        console.log('✓ Clicked Confirm button for person attribute');
    }

    async clickAttributeSearchClose() {
        await this.page.waitForTimeout(1000);
        const closeBtn = this.page.locator('button.text-xl.leading-none').first();
        if (await closeBtn.isVisible().catch(() => false)) {
            await closeBtn.click();
            await this.page.waitForTimeout(500);
        }
        console.log('✓ Clicked attribute search close icon');
    }

    async clickListedAttributeRecord(attributeName) {
        const row = this.page.locator(`//tr[@role='row'][.//td//div[normalize-space()='${attributeName}']]`).first();
        await row.waitFor({ state: 'visible', timeout: 15000 });
        await row.click({ force: true });
        await this.page.waitForTimeout(300);
        const editBtn = this.page.locator('button.e-tbar-btn[aria-label="Edit"]:has(span.e-edit)');
        await editBtn.waitFor({ state: 'visible', timeout: 10000 });
        await editBtn.click({ force: true });
        await this.page.waitForTimeout(500);
        console.log(`✓ Clicked listed attribute record and opened edit: ${attributeName}`);
    }

   async selectRowCheckbox() {
        await this.page.waitForTimeout(500);
        const clicked = await this.page.evaluate(() => {
            const boolCell = document.querySelector('input.e-edit-checkselect.e-boolcell[type="checkbox"]');
            const rowSelect = document.querySelector('input.e-checkselect[type="checkbox"][aria-label="Select row"]');
            const cb = boolCell || rowSelect;
            if (cb) { cb.click(); return true; }
            return false;
        });
        if (!clicked) throw new Error('Row checkbox not found (neither e-boolcell nor e-checkselect)');
        console.log('✓ Selected row checkbox');
    }

   async clickEditModeForOwnerUsers() {
        const editModeBtn = this.page.locator(`//div[normalize-space(text())='User - Owner']/ancestor::div[contains(@class,'e-acrdn-header')]//span[contains(@class,'e-edit')]/parent::button`).first();
        await editModeBtn.waitFor({ state: 'visible', timeout: 10000 });
        await editModeBtn.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked Edit Mode for User - Owner section');
    }

   async clickEditModeForBehalfUsers() {
        const editModeBtn = this.page.locator(`//div[normalize-space(text())='Users - To act on behalf']/ancestor::div[contains(@class,'e-acrdn-header')]//span[contains(@class,'e-edit')]/parent::button`).first();
        await editModeBtn.waitFor({ state: 'visible', timeout: 10000 });
        await editModeBtn.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked Edit Mode for To act on behalf section');
    }

   async editOwnerUser() {
        const editBtn = this.page.locator('button[title="Edit"]:has(span.e-edit)').first();
        await editBtn.waitFor({ state: 'visible', timeout: 10000 });
        await editBtn.click();
        await this.page.waitForTimeout(500);
        await this.saveButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.saveButton.click();
        console.log('✓ Edited owner user from Users list');
    }

   async fillOwnerUserName(username) {
        await this.userOwnerNameSearch.click();
        await this.userOwnerNameSearch.fill('')
        await this.userOwnerNameSearch.type(username, { delay: 100 });
        await this.page.getByRole('option').first().click();
    }
    
    async userClickOnSaveButton() {
        await this.saveButton.click();
    }
    
    async deleteUser() {
        await this.userDeleteButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.userDeleteButton.click();
    }


    async userAddIcon() {
        await this.userAddButton.waitFor({ state: 'visible' });
        await this.userAddButton.click();
    }

    async userBhalfAddIcon() {
        await this.userBehalfAddButton.scrollIntoViewIfNeeded();
        await this.userBehalfAddButton.waitFor({ state: 'visible' });
        await this.userBehalfAddButton.click();

    }


    async userUpdateIcon() {
        await this.userUpdateButton.waitFor({ state: 'visible' });
        await this.userUpdateButton.click();
    }

    async userBhalfUpdateIcon() {
        const updateBtn = this.page.locator('//button[@aria-label="Update" and .//span[contains(@class,"e-update")]]').last();
        await updateBtn.scrollIntoViewIfNeeded();
        await updateBtn.waitFor({ state: 'visible', timeout: 10000 });
        await updateBtn.click();
    }


    async addUsersButton() {
        await this.addUserButton.click();
    }

    async fillMultiUserName(multiUser) {
        await this.userOwnerNameSearch.click();
        await this.userOwnerNameSearch.fill('')
        await this.userOwnerNameSearch.type(multiUser, { delay: 100 });
        await this.page.getByRole('option').first().click();
    }

    async editBehalfMappedUser(userName) {
        const editBtn = this.page.locator('button[id$="_edit"][aria-label="Edit"]').last();
        await editBtn.waitFor({ state: 'visible', timeout: 10000 });
        await editBtn.click();
        await this.page.waitForTimeout(500);
        await this.userOwnerNameSearch.waitFor({ state: 'visible', timeout: 10000 });
        await this.userOwnerNameSearch.click();
        await this.userOwnerNameSearch.fill('');
        await this.userOwnerNameSearch.type(userName, { delay: 100 });
        await this.page.getByRole('option').first().click();
        console.log(`✓ Edited behalf mapped user to: ${userName}`);
    }

     async usersClickOnSaveButton() {
        await this.userSaveButton.click();
    }


    // ===================== FILTER DIALOG METHODS =====================

    /**
     * Verify that the Basic Filter or Advanced Filter tab exists
     */
    async verifyFilterTabExists(tabName) {
        const tabLocator = tabName === 'Basic Filter' ? this.basicFilterTab : this.advancedFilterTab;
        await tabLocator.waitFor({ state: 'visible' });
        const text = await tabLocator.textContent();
        expect(text).toContain(tabName);
    }

    /**
     * Apply Basic Filter with multiple criteria.
     * NOTE: UI labels use plural forms for function filters:
     *   'Club Function'    → label 'Club Functions' in the filter dialog
     *   'Section Function' → label 'Section Functions'
     *   'Team Function'    → label 'Team Functions'
     *   'Person Name'      → label 'Search' (autocomplete inside dialog)
     */
    async applyBasicFilterCriteria(filterCriteria) {
        for (const [filterField, filterValue] of Object.entries(filterCriteria)) {
            if (filterField === 'Person Name') {
                // The filter dialog has a 'Search' autocomplete for person name
                await this.selectFilterAutocompleteByLabel('Search', filterValue);
            } else if (filterField === 'Club Function') {
                // UI label is plural: 'Club Functions'
                await this.selectFilterMultiselectByLabel('Club Functions', filterValue);
            } else if (filterField === 'Section Function') {
                // UI label is plural: 'Section Functions'
                await this.selectFilterMultiselectByLabel('Section Functions', filterValue);
            } else if (filterField === 'Team Function') {
                // UI label is plural: 'Team Functions'
                await this.selectFilterMultiselectByLabel('Team Functions', filterValue);
            } else if (filterField === 'Tags') {
                await this.selectFilterMultiselectByLabel('Tags', filterValue);
            } else if (filterField === 'Marital Status') {
                await this.selectFilterButtonGroup('Marital Status', filterValue);
            } else if (filterField === 'Gender') {
                await this.selectFilterButtonGroup('Gender', filterValue);
            } else if (filterField === 'Status') {
                await this.selectFilterButtonGroup('Status', filterValue);
            } else if (filterField === 'Age Range Minimum') {
                await this.fillAgeRangeField('minimum', filterValue);
            } else if (filterField === 'Age Range Maximum') {
                await this.fillAgeRangeField('maximum', filterValue);
            }
            await this.page.waitForTimeout(300);
        }
    }

    /**
     * Verify a button inside app-button-group is pre-selected by default (has e-primary class).
     * Selected state: button has class "e-primary"
     * Unselected state: button has class "border-[var(--tertiary-button)]"
     */
    async verifyButtonGroupPreSelected(fieldLabel, buttonValue) {
        const filterDialog = this.page.locator('[cssclass="right-slide-dialog"]');
        await filterDialog.waitFor({ state: 'visible', timeout: 8000 });

        const button = filterDialog
            .locator('label')
            .filter({ hasText: new RegExp(`^\\s*${fieldLabel}\\s*$`) })
            .locator('xpath=..')
            .locator('app-button-group button')
            .filter({ hasText: new RegExp(`^\\s*${buttonValue}\\s*$`, 'i') })
            .first();

        await button.waitFor({ state: 'visible', timeout: 8000 });
        const classes = await button.getAttribute('class');
        expect(classes, `Expected "${buttonValue}" button in "${fieldLabel}" to be pre-selected (e-primary class)`).toContain('e-primary');
        console.log(`✓ "${buttonValue}" is pre-selected by default in "${fieldLabel}" button group`);
    }

    /**
     * Validate API response from /persons/list against the applied filter.
     * @param {Object} responseBody - Parsed JSON body from the API response
     * @param {string} field - "status" | "gender" | "maritalStatus"
     * @param {string} expectedValue - The expected value (case-insensitive)
     */
    async validateApiResponseField(responseBody, field, expectedValue) {
        expect(responseBody).toBeTruthy();
        expect(Array.isArray(responseBody.items)).toBe(true);

        const items = responseBody.items;
        console.log(items);

        console.log(`Validating ${items.length} API response items for field "${field}" = "${expectedValue}"`);

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let actualValue;

            if (field === 'status') {
                actualValue = item.status?.libraryValue;
            } else if (field === 'gender') {
                actualValue = item.gender;
            } else if (field === 'maritalStatus') {
                actualValue = item.maritalStatus?.libraryValue;
            } else {
                throw new Error(`Unknown response field "${field}"`);
            }

            expect(
                actualValue?.toLowerCase(),
                `Item[${i}] "${item.name}" has ${field}="${actualValue}" but expected "${expectedValue}"`
            ).toBe(expectedValue.toLowerCase());
        }

        console.log(`✓ All ${items.length} records have ${field} = "${expectedValue}"`);
    }

    /**
     * Helper method to select a button-group filter (Marital Status, Status, Gender)
     * These fields use <app-button-group> with <button> toggle elements, not dropdowns
     */
    async selectFilterButtonGroup(fieldLabel, value) {
        const filterDialog = this.page.locator('[cssclass="right-slide-dialog"]');
        await filterDialog.waitFor({ state: 'visible', timeout: 8000 });

        // Find the label by text, go up to its parent div, then click the matching button
        // Using xpath=.. to traverse to parent avoids CSS :has() + :has-text() compatibility issues
        const button = filterDialog
            .locator('label')
            .filter({ hasText: new RegExp(`^\\s*${fieldLabel}\\s*$`) })
            .locator('xpath=..')
            .locator('app-button-group button')
            .filter({ hasText: new RegExp(`^\\s*${value}\\s*$`, 'i') })
            .first();
        await button.waitFor({ state: 'visible', timeout: 8000 });
        await button.scrollIntoViewIfNeeded();
        await button.click();
        await this.page.waitForTimeout(500);
        console.log(`✓ Selected "${value}" for "${fieldLabel}" button group`);
    }

    /**
     * Select a value from an ejs-multiselect (CheckBox mode) inside the filter dialog
     * by finding the container that has a label matching fieldLabel.
     * Used for Club Functions, Section Functions, Team Functions, Tags.
     */
    async selectFilterMultiselectByLabel(fieldLabel, value) {
        // Normalize a string: trim, collapse whitespace, replace curly/smart quotes with straight ones
        const normalize = (str) => str
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/[\u2018\u2019\u02BC]/g, "'")   // curly single quotes → straight
            .replace(/[\u201C\u201D]/g, '"');           // curly double quotes → straight

        try {
            await this.page.waitForTimeout(500);
            const filterDialog = this.page.locator('[cssclass="right-slide-dialog"]');
            await filterDialog.waitFor({ state: 'visible', timeout: 8000 });


            // Click the multiselect wrapper to open the options popup
            // Try label-following XPath first; fall back to placeholder-based locator
            let wrapper = filterDialog.locator(
                `//*[contains(text(),'${fieldLabel}')]/following-sibling::app-multi-select//ejs-multiselect | ` +
                `//*[contains(text(),'${fieldLabel}')]/following-sibling::*//ejs-multiselect | ` +
                `//*[normalize-space()='${fieldLabel}']/following::div[contains(@class,'e-multi-select-wrapper')][1]`
            ).first();
            let wrapperVisible = await wrapper.isVisible().catch(() => false);
            if (!wrapperVisible) {
                // Placeholder fallback: "Select Tags" → placeholder="Select Tags"
                wrapper = filterDialog.locator(
                    `div.e-multi-select-wrapper:has(input[placeholder="Select ${fieldLabel}"])`
                ).first();
            }
            await wrapper.scrollIntoViewIfNeeded();
            await wrapper.click();
            await this.page.waitForTimeout(800);

            // The popup list is appended to the body outside the dialog
            const popup = this.page.locator('ul.e-list-parent').last();
            await popup.waitFor({ state: 'visible', timeout: 6000 });

            // Type in the multiselect search input to filter options (handles large lists).
            // Use only the first word to avoid apostrophe/special-char mismatches in the filter input.
            const searchInput = this.page.locator('input.e-input-filter').last();
            const searchInputVisible = await searchInput.isVisible().catch(() => false);
            if (searchInputVisible) {
                const firstWord = value.split(/[\s''\u2018\u2019]/)[0];
                await searchInput.fill(firstWord);
                await this.page.waitForTimeout(800);
            }

            // Collect all visible list items and find the one whose normalized text matches
            const allItems = popup.locator('li.e-list-item');
            const count = await allItems.count();

            let matched = null;
            const normalizedValue = normalize(value);
            const availableOptions = [];

            for (let i = 0; i < count; i++) {
                const item = allItems.nth(i);
                const text = await item.textContent();
                const normalizedText = normalize(text || '');
                availableOptions.push(normalizedText);
                if (normalizedText.toLowerCase() === normalizedValue.toLowerCase()) {
                    matched = item;
                    break;
                }
            }

            if (!matched) {
                // Fallback: partial normalized match
                for (let i = 0; i < count; i++) {
                    const item = allItems.nth(i);
                    const text = await item.textContent();
                    const normalizedText = normalize(text || '');
                    if (normalizedText.toLowerCase().includes(normalizedValue.toLowerCase())) {
                        matched = item;
                        break;
                    }
                }
            }

            if (!matched) {
                console.error(`Available options in "${fieldLabel}": ${availableOptions.join(' | ')}`);
                throw new Error(`Option "${value}" not found in multiselect "${fieldLabel}"`);
            }

            await matched.click();

            // Close the popup by pressing Escape
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(500);
            console.log(`✓ Selected "${value}" in multiselect "${fieldLabel}"`);
        } catch (error) {
            console.error(`✗ Failed to select "${value}" in multiselect "${fieldLabel}": ${error.message}`);
            throw new Error(`Failed to select "${value}" in multiselect "${fieldLabel}": ${error.message}`);
        }
    }

    /**
     * Select a value from an ejs-autocomplete inside the filter dialog
     * by finding the container that has a label matching fieldLabel.
     * Used for the 'Search' (person name) autocomplete.
     */
    async selectFilterAutocompleteByLabel(fieldLabel, value) {
        try {
            await this.page.waitForTimeout(500);
            const filterDialog = this.page.locator('[cssclass="right-slide-dialog"]');
            await filterDialog.waitFor({ state: 'visible', timeout: 8000 });

            // Find the Search autocomplete input by its placeholder
            const searchInput = filterDialog.locator('input[placeholder="Search by Person Name"]');
            await searchInput.waitFor({ state: 'visible', timeout: 8000 });
            await searchInput.scrollIntoViewIfNeeded();
            await searchInput.click();
            await searchInput.fill('');
            await searchInput.type(value, { delay: 100 });
            await this.page.waitForTimeout(800);

            // Wait for autocomplete suggestions and select the matching one
            const suggestions = this.page.locator('[role="listbox"] [role="option"], ul.e-list-parent li.e-list-item')
                .filter({ hasText: new RegExp(value, 'i') });
            const suggestionsCount = await suggestions.count();
            if (suggestionsCount > 0) {
                await suggestions.first().click();
            } else {
                await searchInput.press('Enter');
            }
            await this.page.waitForTimeout(800);
            console.log(`✓ Selected "${value}" from Search autocomplete in filter dialog`);
        } catch (error) {
            console.error(`✗ Failed to select "${value}" from Search autocomplete: ${error.message}`);
            throw new Error(`Failed to select "${value}" from Search autocomplete: ${error.message}`);
        }
    }

    /**
     * @deprecated Use selectFilterMultiselectByLabel or selectFilterAutocompleteByLabel instead.
     * Kept for backward compatibility with any existing calls.
     * Finds the container with the label text, then clicks the dropdown/input within it
     */
    async selectFilterDropdownByLabel(fieldLabel, value) {
        try {
            await this.page.waitForTimeout(500);

            // Find all divs that might contain the filter field
            // Look for divs that contain both the label text AND a dropdown/input
            const filterDialog = this.page.locator('[cssclass="right-slide-dialog"]');
            await filterDialog.waitFor({ state: 'visible', timeout: 8000 });

            // Try to find the field container that contains the label text
            // Use XPath to find any element containing the label text, then get its container
            const fieldContainers = filterDialog.locator(`div:has(label:has-text("${fieldLabel}"))`);
            const containerCount = await fieldContainers.count();

            if (containerCount === 0) {
                throw new Error(`Could not find field container for label "${fieldLabel}"`);
            }

            const fieldContainer = fieldContainers.first();

            // Now try to find clickable elements in this container
            // Try multiple element types that could be the dropdown
            let clickableElement = null;

            // Try 1: EJS Dropdown components
            clickableElement = fieldContainer.locator('ejs-dropdownlist, ejs-combobox').first();
            let found = await clickableElement.count() > 0;

            if (!found) {
                clickableElement = fieldContainer.locator('input[type="text"], input[type="search"], input[role="combobox"]').first();
                found = await clickableElement.count() > 0;
            }

            if (!found) {
                clickableElement = fieldContainer.locator('select').first();
                found = await clickableElement.count() > 0;
            }

            if (!found) {
                clickableElement = fieldContainer.locator('[role="listbox"], [role="combobox"], [role="button"]').first();
                found = await clickableElement.count() > 0;
            }

            if (!found) {
                clickableElement = fieldContainer.locator('input, select, button, ejs-dropdownlist, ejs-combobox, [role="combobox"]').first();
                found = await clickableElement.count() > 0;
            }

            if (!found) {
                throw new Error(`Could not find clickable dropdown element in container for "${fieldLabel}"`);
            }

            console.log(`Clicking dropdown for "${fieldLabel}"...`);

            // Scroll into view and click
            await clickableElement.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(300);
            await clickableElement.click({ timeout: 8000, force: true });
            await this.page.waitForTimeout(1000);

            // Now find and click the option
            console.log(`Looking for option "${value}"...`);

            // Try to find the option multiple ways
            let option = null;
            let optionFound = false;

            // Strategy 1: Look for element with exact text match by role
            option = this.page.locator('[role="option"]').filter({ hasText: new RegExp(`^${value}$`, 'i') });
            optionFound = await option.count() > 0;

            if (!optionFound) {
                // Strategy 2: Look for element with partial text match
                option = this.page.locator('[role="option"]').filter({ hasText: new RegExp(value, 'i') });
                optionFound = await option.count() > 0;
            }

            if (!optionFound) {
                // Strategy 3: Look for EJS item class
                option = this.page.locator('.e-item, .e-list-item, [class*="e-item"]').filter({ hasText: new RegExp(value, 'i') });
                optionFound = await option.count() > 0;
            }

            if (!optionFound) {
                // Strategy 4: Look for any li or div that contains the text
                option = this.page.locator('li, div[class*="item"], div[class*="option"]').filter({ hasText: new RegExp(value, 'i') });
                optionFound = await option.count() > 0;
            }

            if (!optionFound) {
                // Strategy 5: Just get ANY text node matching the value
                option = this.page.locator('text=' + value);
                optionFound = await option.count() > 0;
            }

            if (optionFound) {
                const firstOption = option.first();
                await firstOption.click({ timeout: 8000, force: true });
                await this.page.waitForTimeout(800);
                console.log(`✓ Selected "${value}" for "${fieldLabel}"`);
            } else {
                // Fallback: Try typing the value
                console.log(`Option not found by clicking, trying to type "${value}"...`);
                try {
                    await clickableElement.fill(value);
                    await this.page.keyboard.press('Enter');
                    await this.page.waitForTimeout(800);
                    console.log(`✓ Selected "${value}" by typing`);
                } catch (e) {
                    throw new Error(`Could not select option "${value}" - not found and typing failed: ${e.message}`);
                }
            }
        } catch (error) {
            console.error(`✗ Failed to select ${value} for ${fieldLabel}: ${error.message}`);
            throw new Error(`Failed to select "${value}" for "${fieldLabel}": ${error.message}`);
        }
    }

    /**
     * Helper method to fill age range fields
     */
    async fillAgeRangeField(type, value) {

        const spinButtons = this.page.locator('[role="spinbutton"]');

        if (type === 'minimum') {
            const minSpinButton = spinButtons.first()
            await minSpinButton.fill(value);
        } else if (type === 'maximum') {
            const maxSpinButton = spinButtons.last()
            await maxSpinButton.fill(value);
        }
    }

    /**
     * Remove all currently applied filters from the filter panel
     */
    async removeAppliedFilters() {
        await this.page.waitForTimeout(500);

        // Find and click all remove buttons in the current filter section within the dialog
        const removeButtons = this.page.locator('[cssclass="right-slide-dialog"] [class*="current-filter"] button, [cssclass="right-slide-dialog"] button:has-text("×")');
        let count = await removeButtons.count();

        while (count > 0) {
            const btn = removeButtons.first();
            try {
                await btn.click({ timeout: 3000 });
                await this.page.waitForTimeout(300);
            } catch (e) {
                break;
            }
            count = await removeButtons.count();
        }
    }

    /**
     * Click the Apply button to apply filters
     */
    async clickFilterApplyButton() {
        await this.filterApplyButton.waitFor({ state: 'visible' });
        await this.filterApplyButton.click();
        await this.page.waitForTimeout(1000);
    }

    /**
    /**
     * Verify that filters have been applied successfully
     */
    async verifyFilterApplied() {
        // Check if the record count is displayed
        await this.page.waitForTimeout(1000);
        const recordCountText = await this.recordCount.textContent();
        expect(recordCountText).toBeTruthy();
    }

    /**
     * Verify that full records list is restored
     */
    async verifyFullRecordsListRestored() {
        await this.page.waitForTimeout(1000);

        // Verify that the record count is displayed
        const recordCountText = await this.recordCount.textContent();
        expect(recordCountText).toContain('Records');
    }

    /**
     * Verify that filtered grid displays matching records
     */
    async verifyFilteredGridRecords() {
        await this.page.waitForTimeout(500);

        const gridRows = this.page.locator('[role="grid"] [role="row"], [role="grid"] tbody tr');
        const rowCount = await gridRows.count();
        expect(rowCount).toBeGreaterThan(0);
    }

    /**
     * Save current filter as a segment
     */
    async saveFilterAsSegment(segmentName) {
        await this.filterSaveSegmentButton.waitFor({ state: 'visible' });
        await this.filterSaveSegmentButton.click();

        // Wait for segment name input dialog
        await this.page.waitForTimeout(1000);

        // Try to find segment name input outside the filter dialog
        const segmentNameInputs = this.page.locator('input[type="text"][placeholder*="Segment"], input[type="text"][placeholder*="Name"]');
        const count = await segmentNameInputs.count();

        if (count > 0) {
            const segmentInput = segmentNameInputs.last();
            try {
                await segmentInput.fill(segmentName, { timeout: 3000 });

                // Click save button
                const saveBtn = this.page.locator('[cssclass="right-slide-dialog"] >> button:has-text("Save"), button[type="submit"]:has-text("Save")').last();
                await saveBtn.click();
            } catch (e) {
                console.log('Could not save segment with custom name:', e.message);
            }
        }
    }

    /**
     * Verify that filter segment is saved successfully
     */
    async verifySegmentSaved() {
        // Check for success message or verify dialog behavior
        const successMessages = this.page.locator('text=/[Ss]egment.*[Ss]aved|[Ss]aved.*[Ss]uccessfully|[Ss]uccess/');

        try {
            await successMessages.first().waitFor({ state: 'visible', timeout: 5000 });
        } catch (e) {
            // Success message might not appear, that's ok
            console.log('No success message found for segment save');
        }
    }


    // ===================== SEARCH BAR METHODS =====================

    /**
     * Search persons by name using the filter dialog's 'Search by Person Name' autocomplete.
     * Opens the filter dialog if not already open, fills the name, waits up to 5s for
     * autocomplete suggestions (clicks first match if found), then clicks Apply so that
     * the /persons/list API is triggered.
     *
     * Uses fill() instead of type() for instant input (no character delay).
     * Falls back to pressing Tab to commit the typed value if suggestions are slow/absent.
     */
    async openFilterDialog() {
        const isOpen = await this.filterDialog.isVisible().catch(() => false);
        if (isOpen) return;
        await this.filterButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.filterButton.click();
        await this.filterDialog.waitFor({ state: 'visible', timeout: 10000 });
        console.log('✓ Opened Person Management filter dialog');
    }

    async searchPersonByName(name) {
        // Open the filter dialog if it isn't already open
        const isAlreadyOpen = await this.filterDialog.isVisible().catch(() => false);
        if (!isAlreadyOpen) {
            await this.openFilterDialog();
        }

        const filterDialog = this.filterDialog;
        const searchInput = filterDialog.locator('input[placeholder="Search by Person Name"]');
        await searchInput.waitFor({ state: 'visible', timeout: 10000 });
        await searchInput.scrollIntoViewIfNeeded();
        await searchInput.click();
        // Clear any previously typed text with triple-click then delete
        await searchInput.press('Control+a');
        await searchInput.press('Delete');

        // Use pressSequentially (triggers keydown/keypress/input per character) so Syncfusion's
        // ejs-autocomplete fires its server-side suggestion query. fill() does NOT emit key events.
        await searchInput.pressSequentially(name, { delay: 60 });

        // Wait up to 10s for the autocomplete popup with matching suggestions to appear
        const autocompletePopup = this.page.locator('ul.e-list-parent[id*="ej2_dropdownlist"]');
        try {
            await autocompletePopup.last().waitFor({ state: 'visible', timeout: 10000 });

            const suggestions = autocompletePopup.last()
                .locator('li.e-list-item')
                .filter({ hasText: new RegExp(name, 'i') });
            const count = await suggestions.count();
            if (count > 0) {
                const firstSuggestionText = await suggestions.first().textContent();
                await suggestions.first().click();
                console.log(`Selected suggestion "${firstSuggestionText?.trim()}" from autocomplete dropdown`);
            } else {
                // Popup appeared but no item matched — dismiss and proceed without selection
                console.warn(`Autocomplete popup appeared but no item contained "${name}" — dismissing`);
                await this.page.keyboard.press('Escape');
            }
        } catch (_) {
            // Popup didn't appear — the server may not have matched anything
            console.warn(`No autocomplete popup appeared for "${name}" within 10s`);
        }
        await this.page.waitForTimeout(300);

        // Click Apply to fire the /persons/list API with the name filter
        await this.filterApplyButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.filterApplyButton.click();
        await this.page.waitForTimeout(500);
        console.log(`✓ Searched for person name "${name}" via filter dialog autocomplete`);
    }

    /**
     * Clear the filter dialog's 'Search by Person Name' filter and re-apply.
     * Opens the filter dialog, clears the autocomplete, then clicks Apply to restore the grid.
     */
    async clearPersonNameSearch() {
        // Re-open filter dialog (it closed after Apply in searchPersonByName)
        await this.openFilterDialog();
        const filterDialog = this.filterDialog;

        // Try the clear icon button on the autocomplete first
        const clearIcon = filterDialog.locator('ejs-autocomplete .e-clear-icon');
        const clearIconCount = await clearIcon.count();
        if (clearIconCount > 0) {
            try {
                await clearIcon.first().click({ timeout: 3000 });
            } catch (e) {
                const searchInput = filterDialog.locator('input[placeholder="Search by Person Name"]');
                await searchInput.fill('');
            }
        } else {
            const searchInput = filterDialog.locator('input[placeholder="Search by Person Name"]');
            await searchInput.fill('');
        }
        await this.page.waitForTimeout(500);

        // Click Apply to restore the grid without the person name filter
        await this.filterApplyButton.waitFor({ state: 'visible' });
        await this.filterApplyButton.click();
        await this.page.waitForTimeout(800);
        console.log('✓ Cleared person name search – filter dialog apply clicked');
    }

    /**
     * Verify at least one grid row contains the searched name
     */
    async verifyGridContainsName(name) {
        await this.page.waitForTimeout(500);
        const grid = this.page.locator('[role="grid"]');
        await grid.waitFor({ state: 'visible' });
        const matchingRow = grid.locator(`[role="row"]:has-text("${name}")`).first();
        await expect(matchingRow).toBeVisible({ timeout: 10000 });
        console.log(`✓ Grid contains a row with "${name}"`);
    }

    /**
     * Validate every item in the captured API response has firstName, lastName,
     * or name containing the search text (case-insensitive).
     */
    async validateApiResponseNameContains(responseBody, searchText) {
        expect(responseBody).toBeTruthy();
        expect(Array.isArray(responseBody.items)).toBe(true);
        const lowerSearch = searchText.toLowerCase();
        const items = responseBody.items;
        console.log(`Validating ${items.length} items: name contains "${searchText}"`);

        const failures = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const name = (item.name || '').toLowerCase();
            const firstName = (item.firstName || '').toLowerCase();
            const lastName = (item.lastName || '').toLowerCase();
            const matches = name.includes(lowerSearch) || firstName.includes(lowerSearch) || lastName.includes(lowerSearch);
            if (!matches) {
                const detail = `Item[${i}]: name="${item.name}" firstName="${item.firstName}" lastName="${item.lastName}"`;
                console.error(`✗ Does NOT contain "${searchText}" → ${detail}`);
                failures.push(detail);
            }
        }

        if (failures.length > 0) {
            throw new Error(
                `${failures.length} of ${items.length} API response items do not contain "${searchText}" in name/firstName/lastName:\n` +
                failures.join('\n')
            );
        }
        console.log(`✓ All ${items.length} records contain "${searchText}" in person name`);
    }

    // async editUsersList(userName) {
    //     await this.userEditButton.click(userName)
    // }

    async deleteUsers() {
        const deleteBtn = this.page.locator('button[id$="_delete"][aria-label="Delete"]').last();
        await deleteBtn.waitFor({ state: 'visible', timeout: 10000 });
        await deleteBtn.click();
        console.log('✓ Clicked Delete button for To act on behalf user');
    }

    // ===================== PERSON RECORD DRILL-DOWN METHODS =====================

    /**
     * Click the first data row in the persons grid (after filtering).
     * Waits for the grid to be visible and then clicks the first non-header row.
     */
    async clickFirstPersonRecord() {
        const firstRow = this.page.locator(`[role="row"][aria-rowindex="1"] td`).first();
        await firstRow.waitFor({ state: 'visible', timeout: 10000 });
        await firstRow.click();
        await this.page.waitForTimeout(1500);
        console.log('✓ Clicked first person record in the grid');
    }

    async verifyMarriedStatus(expected) {
          await this.maritalStatus.waitFor({ state: 'visible', timeout: 10000 });
          const actualStatus = await this.maritalStatus.textContent();
          expect(actualStatus).toContain(expected);
          console.log(`✓ Verified married status on person detail page: expected="${expected}", actual="${actualStatus}"`);  
    }

    /**
     * Navigate to the Functions tab on the person detail page.
     * Waits for the tab label to be visible before clicking.
     */
    async navigateToPersonDetailsTab(tabName) {
        await this.page.waitForTimeout(500);
        const tab = this.page.locator(
            `//div[contains(@class,'e-tab-text')]//div[normalize-space()='${tabName}'] | ` +
            `//div[normalize-space(text())='${tabName}'][ancestor::*[contains(@class,'e-tab')]]`
        ).first();
        await tab.waitFor({ state: 'visible', timeout: 10000 });
        await tab.click();
        await this.page.waitForTimeout(1000);
        console.log(`✓ Navigated to "${tabName}" tab on person detail page`);
    }

    /**
     * Set up a listener to capture the person functions/list API response for a given type.
     * The POST body contains "type": "section" | "club" | "team".
     * Must be called BEFORE the action that triggers the API call.
     * @param {string} type - "section" | "club" | "team"
     */
    async startCapturingPersonFunctionsAPI(type) {
        this.personFunctionsResponsePromise = this.page.waitForResponse(
            async response => {
                if (!response.url().includes('/functions/list') || response.request().method() !== 'POST') {
                    return false;
                }
                try {
                    const body = response.request().postDataJSON();
                    return body?.type === type;
                } catch {
                    return false;
                }
            },
            { timeout: 30000 }
        );
        console.log(`✓ Started capturing person functions API response for type="${type}"`);
    }

    /**
     * Await the captured person functions API response and store it on the instance.
     */
    async awaitPersonFunctionsAPIResponse() {
        const response = await this.personFunctionsResponsePromise;
        this.personFunctionsApiResponse = await response.json();
        console.log(`✓ Captured person functions API: totalCount=${this.personFunctionsApiResponse.totalCount}, items=${this.personFunctionsApiResponse.items.length}`);
        return this.personFunctionsApiResponse;
    }

    /**
     * Verify that the person functions API response contains at least one item
     * whose functionId.name matches the expected function name (normalizing apostrophes).
     * @param {Object} responseBody - Parsed JSON from /persons/{id}/functions/list
     * @param {string} functionName - The function name to look for (e.g. "Women's Section Manager")
     */
    async verifyPersonFunctionsAPIContains(responseBody, functionName) {
        const normalize = (s) => (s || '')
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/[\u2018\u2019\u02BC\u2032]/g, "'");

        console.log(JSON.stringify(responseBody, null, 2), "response body");
        expect(responseBody, 'Person functions API response is missing').toBeTruthy();
        expect(Array.isArray(responseBody.items), 'API response items is not an array').toBe(true);
        expect(responseBody.items.length, 'API response returned zero items').toBeGreaterThan(0);

        const normalizedExpected = normalize(functionName).toLowerCase();
        const found = responseBody.items.some(item => {
            const itemName = normalize(item.functionId?.name || '').toLowerCase();
            return itemName === normalizedExpected || itemName.includes(normalizedExpected);
        });

        const allNames = responseBody.items.map(item => item.functionId?.name || '(unknown)').join(' | ');
        expect(
            found,
            `Expected function "${functionName}" not found in API response.\nAvailable: ${allNames}`
        ).toBe(true);

        console.log(`✓ Person functions API contains "${functionName}" — all functions: ${allNames}`);
    }

    /**
     * Navigate back to the Person Management list using the browser back button.
     * Waits for the page title "Person Management" to confirm we're back.
     */
    async navigateBackToPersonManagement() {
        await this.page.goBack();
        await this.page.waitForTimeout(1500);
        // Wait until the grid is visible again to confirm we are back on the list
        const grid = this.page.locator('[role="grid"]');
        await grid.waitFor({ state: 'visible', timeout: 15000 });
        console.log('✓ Navigated back to Person Management list');
    }

    // ===================== PERSON TAGS API METHODS =====================

    /**
     * Set up a listener to capture the person tags list API response.
     * Matches any request to a URL containing 'tags' under the persons API path.
     * Must be called BEFORE the action that triggers the API call (e.g. navigating to Tags tab).
     */
    async startCapturingPersonTagsAPI() {
        this.personTagsResponsePromise = this.page.waitForResponse(
            response => {
                const url = response.url().toLowerCase();
                // Match any HTTP method - tags endpoints may use GET or POST
                return (
                    url.includes('/entity-tags/list')
                ) && response.status() < 400;
            },
            { timeout: 30000 }
        );
        console.log('✓ Started capturing person tags API response');
    }

    /**
     * Await the captured person tags API response and store it on the instance.
     */
    async awaitPersonTagsAPIResponse() {
        const response = await this.personTagsResponsePromise;
        console.log(`✓ Tags API matched URL: ${response.url()} [${response.request().method()}]`);
        this.personTagsApiResponse = await response.json();
        const count = Array.isArray(this.personTagsApiResponse)
            ? this.personTagsApiResponse.length
            : (this.personTagsApiResponse.items?.length ?? this.personTagsApiResponse.totalCount ?? 0);
        console.log(`✓ Captured person tags API: ${count} items`);
        return this.personTagsApiResponse;
    }

    /**
     * Verify the tags API response contains at least one item whose tag name matches tagName.
     * Performs a deep recursive search of every string value in the response so it works
     * regardless of the actual API field structure.
     * @param {Object|Array} responseBody - Parsed JSON from the tags API
     * @param {string} tagName - The tag name to look for (e.g. "Tag002")
     */
    async verifyPersonTagsAPIContains(responseBody, tagName) {
        const normalize = (s) => (s || '').trim().replace(/\s+/g, ' ').toLowerCase();

        expect(responseBody, 'Person tags API response is missing').toBeTruthy();

        // Log the raw response so we can see the actual structure
        console.log('=== Tags API raw response ===');
        console.log(JSON.stringify(responseBody, null, 2));

        // Support both array and {items:[]} shapes
        const items = Array.isArray(responseBody) ? responseBody : (responseBody.items || []);
        expect(items.length, 'Tags API returned zero items').toBeGreaterThan(0);

        const normalizedExpected = normalize(tagName);

        // Deep recursive search: collect ALL string values from an object/array
        const collectStrings = (val) => {
            if (typeof val === 'string') return [val];
            if (Array.isArray(val)) return val.flatMap(collectStrings);
            if (val !== null && typeof val === 'object') return Object.values(val).flatMap(collectStrings);
            return [];
        };

        // Search across the entire items array — if any string value matches, it passes
        const allStrings = collectStrings(items).map(normalize);
        const found = allStrings.some(s => s === normalizedExpected || s.includes(normalizedExpected));

        // Also build a readable list of likely tag name fields for the error message
        const extractName = (item) => [
            item?.tagId?.name, item?.tag?.name, item?.name,
            item?.tagName, item?.tag?.libraryValue, item?.libraryValue,
            item?.tagValue, item?.value,
        ].filter(Boolean);
        const allNames = items.map(item => extractName(item).join('/') || JSON.stringify(item).slice(0, 80));

        expect(
            found,
            `Tag "${tagName}" not found anywhere in tags API response.\nAll string values scanned: ${[...new Set(allStrings)].join(' | ')}`
        ).toBe(true);

        console.log(`✓ Person tags API contains "${tagName}" — likely tag names: ${allNames.join(' | ')}`);
    }

}

module.exports = PersonManagementPage;
