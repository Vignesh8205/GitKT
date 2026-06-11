
/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

const { expect } = require("playwright/test")
const DataUtil = require('../utils/dataUtil')



class ClubManagementPage {
    /**
  * @param {Page} page
  */
    constructor(page) {
        this.page = page
        this.menu = this.page.locator('[data-mat-icon-name="gr_portal"]')
        this.clubManagementIcon = this.page.locator('[id="Club Management"]')

        this.title = this.page.locator("//div[normalize-space(text())='Club Management'] | //h1[normalize-space(text())='Club Management'] | //h2[normalize-space(text())='Club Management'] | //span[normalize-space(text())='Club Management']")
        this.createNewClubButton = this.page.locator('//button[@aria-label="Create Club progress"]')
        this.addClubWebsite = this.page.locator(
            '[aria-label="Add"]'
        ).first()
        this.websiteEditButton = this.page.locator('button:has(span.e-edit)').filter({ hasText: '' }).nth(0)
        this.websiteUpdateButton = this.page.locator('[aria-label="Update progress"]:not([disabled])').first()
        this.clubNameFileld = this.page.locator('[placeholder="Enter Club Name"]')
        this.updateButton = this.page.locator('[aria-label="Update progress"]:not([disabled])').first()
        this.addButton = this.page.locator('[aria-label="Add progress"]')
        this.close = this.page.locator('button.e-dlg-closeicon-btn[title="Close"]')
            .or(this.page.locator('[class="e-dlg-header-content"] > [title="Close"]'))
        this.federationDropDown = this.page.locator("//label[.//div[normalize-space()='Federation']]/following-sibling::div//ejs-multiselect")
        this.registrationNumberField = this.page.locator('[placeholder="Enter Registration Number"]');
        this.colorPrimaryField = this.page.getByText('Primary').locator('..').locator('input[role="textbox"]');
        this.colorSecondaryField = this.page.locator('//input[@id="textbox_120"]');
        this.colorTertiaryField = this.page.locator('//input[@id="textbox_122"]');
        this.browseLogo = this.page.locator('button[title="Browse"]').first();
        this.createClubButton = this.page.locator('[aria-label="Create Club progress"]')
        this.addFunctionProgress = this.page.locator('button.e-tbar-btn[aria-label="Add"]:has(span.e-add)')
        this.confirmButton = this.page.locator('[aria-label=" Confirm  progress"]')

        this.quickSearchIcon = this.page.locator("//span[contains(@style,'url(assets/icons/grassroots/search-icon.svg)')]")
        this.quickSearchInput = this.page.locator('input[placeholder*="Search by Club"], input[placeholder*="Search by club"], input[placeholder*="Search"][not(@placeholder="Search Person Name")]').first()


        this.uploadButton = this.page.locator('[aria-label="Upload"]').first();
        this.saveClubWebsiteButton = this.page.locator('td button>i[class*="e-save"]').first()
        this.viewModeButton = this.page.locator('button[title="View"]:has(span.e-eye)').first()

        this.fifaIdInput = page.locator('#fifaId');
        this.abbreviationInput = page.locator('#abbreviation');
        this.correspondenceLanguageDropdown = this.page.locator(
            'label:has-text("Correspondence Language") >> xpath=following::ejs-multiselect[1]'
        );
        this.dropdownOption = (value) => this.page.locator(`//li[contains(@class,'e-list-item') and normalize-space()='${value}']`);
        this.foundingDateInput = page.locator('[placeholder="DD/MM/YYYY"]');
        this.shortNameInput = page.locator('[placeholder="Enter Short Name"]');
        this.clubCodeDropdown = this.page.locator(
            '#clubCode'
        );
        this.legalStatusDropdown = this.page.locator(
            'label:has-text("Legal Status") >> xpath=following::ejs-dropdownlist[1]//span[@role="combobox"]'
        );
        this.statusDropdown = this.page.locator(
            '//label[.//div[text()="Status"]]/following-sibling::div//ejs-dropdownlist//span[@role="combobox"]'
        ).first();




        this.nameInput = this.page.locator('[name="name"]')
        this.linkInput = this.page.locator('[name="url"]')
        this.descriptionInput = this.page.locator('[name="description"]')
        this.financeTab = this.page.getByRole('tab', { name: 'Finance' })
        this.personFunctionTab = this.page.getByRole('tab', { name: " Person Function(s) " })
        this.bankNameInput = this.page.locator('[name="name_bankName"]')
        this.bankAccountInput = this.page.locator('[name="name_bankAccountNumber"]')
        this.VATNumberInput = this.page.locator('[name="name_vatNumber"]')


        this.searchPersonName = this.page.locator('[placeholder="Search Person Name"]')
        // this.[placeholder="Search Person Name"]

        this.clubFunctionDropDown = this.page.locator('#clubFunction>span')
        this.clubFunctionClubDropDown = this.page.locator(
            "//div[.//label[normalize-space()='Club Function']][not(.//label[normalize-space()='Section Function'])][not(.//label[normalize-space()='Team Function'])]" +
            "//label[.//div[normalize-space()='Club']]/following::ejs-dropdownlist[1]//span[@role='combobox']"
        )
        this.clubFunctionEndDate = this.page.locator("//div[.//label[normalize-space()='Club Function']][not(.//label[normalize-space()='Section Function'])][not(.//label[normalize-space()='Team Function'])]//label[.//div[normalize-space()='End Date']]/following::input[@placeholder='DD/MM/YYYY'][1]")
        this.clubFunctionStartDate = this.page.locator("//div[.//label[normalize-space()='Club Function']][not(.//label[normalize-space()='Section Function'])][not(.//label[normalize-space()='Team Function'])]//label[.//div[normalize-space()='Start Date']]/following::input[@placeholder='DD/MM/YYYY'][1]")


        //sectionFunction
        this.sectionFunctionSectionDropDown = this.page.locator('#sectionId>span')
        this.sectionFunctionDropDown = this.page.locator('#sectionFunction>span')
        this.sectionFunctionStartDate = this.page.locator("//div[.//label[normalize-space()='Section Function']][not(.//label[normalize-space()='Club Function'])][not(.//label[normalize-space()='Team Function'])]//label[.//div[normalize-space()='Start Date']]/following::input[@placeholder='DD/MM/YYYY'][1]")
        this.sectionFunctionEndDate = this.page.locator("//div[.//label[normalize-space()='Section Function']][not(.//label[normalize-space()='Club Function'])][not(.//label[normalize-space()='Team Function'])]//label[.//div[normalize-space()='End Date']]/following::input[@placeholder='DD/MM/YYYY'][1]")


        // teamFunctionSection
        this.teamFunctionSectionDropDown = this.page.locator('#teamSection>span')
        this.teamFunctionTeamDropDown = this.page.locator("#teamId>span")
        this.teamFunctionDropDown = this.page.locator('[id="teamFunction"]>span')
        this.teamFunctionStartDate = this.page.locator("//div[.//label[normalize-space()='Team Function']][not(.//label[normalize-space()='Club Function'])][not(.//label[normalize-space()='Section Function'])]//label[.//div[normalize-space()='Start Date']]/following::input[@placeholder='DD/MM/YYYY'][1]")
        this.teamFunctionEndDate = this.page.locator("//div[.//label[normalize-space()='Team Function']][not(.//label[normalize-space()='Club Function'])][not(.//label[normalize-space()='Section Function'])]//label[.//div[normalize-space()='End Date']]/following::input[@placeholder='DD/MM/YYYY'][1]")

        // Section Tab 

        this.clubSectionTab = this.page.locator("//*[@role='tab'][.//*[normalize-space()='Sections']]");
        this.addSectionButton = this.page.locator('button.e-tbar-btn[aria-label="Add"]:has(span.e-add)');
        this.sectionRegisterNumberField = this.page.locator('//*[@placeholder="Enter Registration Number" and @name="name_registrationNumber"]').first();
        this.sectionSportiveTypeDropDown = this.page.locator('#sportiveType>span');
        this.sectionFormatIdDropDown = this.page.locator('#formatId>span');
        this.sectionGenderOfferingDropDown = this.page.locator('#gender>span');
        //this.sectionConfirmButton = this.page.locator("//span[contains(text(),'Confirm')]");

        // venue
        this.venuesTab = this.page.locator('div[role="tab"]:has-text("Venues")');
        this.map_Venue = this.page.locator('button.e-tbar-btn[aria-label="Add"]:has(span.e-add)');
        this.map_Venue_Name = this.page.locator("//input[@placeholder='Select Name']");
        this.map_Venue_Purpose = this.page.locator("//label[.//div[normalize-space()='Purpose']] /following-sibling::div //div[contains(@class,'e-multi-select-wrapper')]");
        this.deleteIconVenueTable = (name) => this.page.locator(`//tr[@role='row'][td[count(//th[.//span[normalize-space()='Name']]/preceding-sibling::th) + 1][normalize-space()='${name}'] ]//td[last()]//*[contains(@title,'Delete')]`)
        this.editIconVenueTable = (name) => this.page.locator(`//tr[@role='row'][td[count(//th[.//span[normalize-space()='Name']]/preceding-sibling::th) + 1][normalize-space()='${name}'] ]//td[last()]//*[contains(@title,'Edit')]`)


        // Map Tag
        this.tagsTab = this.page.getByRole('tab', { name: 'Tags' })
        this.map_Tag = this.page.locator('button.e-tbar-btn[aria-label="Add"]:has(span.e-add)');
        this.map_Category_DrpDwn = this.page.locator("//ejs-dropdownlist[@id='category']");
        this.map_Tag_Name = this.page.locator("//label[.//div[normalize-space()='Tag Name']] /following-sibling::div //div[contains(@class,'e-multi-select-wrapper')]");

        this.tagUnlinkIcon = (name) => this.page.locator(`//tr[@role='row'][td[count(//th[.//span[normalize-space()='Tag Name']]/preceding-sibling::th) + 1 ][normalize-space()='${name}'] ]//td[last()]//*[contains(@class,'delete') or contains(@class,'e-icon')]`)
        // Attribute
        this.attributeTab = this.page.getByRole('tab', { name: 'Attributes' })
        this.Attribute_Value = this.page.locator("//input[@placeholder='Enter Attribute Value']");

        this.Attribute_Edit = (attribute) => this.page.locator(`//tr[.//td[@aria-colindex='2']//div[normalize-space()='${attribute}']]//button[contains(@class,'custom-edit-btn')]`)
        this.attribute_Unlink = (attribute) => this.page.locator(`//tr[.//td[@aria-colindex='2']//div[normalize-space()='${attribute}']]//button[contains(@class,'custom-delete-btn')]`)

    }


    clubRowByName(clubName) {
        return this.page.getByText(clubName, { exact: true })
    }


    async navigateToClubManagementPage() {
        await this.clubManagementIcon.click();
    }
    //Tab wise selection 

    async navigateTab(tabName) {
        switch (tabName) {
            case "Club Management":
                await this.clubManagementIcon.click();
                break;
            case "Finance":
                await this.financeTab.click();
                await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
                break;
            case "Person Function(s)":
                await this.personFunctionTab.click();
                break;
            case " Sections ":
                await this.clubSectionTab.waitFor({state:"visible",timeout:10000}).catch(()=>{
                });
                await this.clubSectionTab.click();
                break;
            case "Tags":
                await this.tagsTab.click()
                break;
            case "Venues":
                await this.venuesTab.click();
                break;
            case "Attributes":
                await this.attributeTab.click()
                break;
            default:
                break;
        }

    }


    async searchByQuickSearch(searchTerm) {
        await this.quickSearchIcon.waitFor({ state: 'visible', timeout: 10000 });
        await this.quickSearchIcon.click();
        const input = this.page.locator(
            'input[placeholder*="Search by Club"], input[placeholder*="Search by club"], ' +
            'input[placeholder*="Club Name"], input[placeholder*="club name"]'
        ).first();
        await input.waitFor({ state: 'visible', timeout: 10000 });
        await input.clear();
        await input.fill(searchTerm);
        await input.press('Enter');
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
        console.log(`✓ Quick-searched clubs for: "${searchTerm}"`);
    }

    async clickFirstClubRecordInGrid() {
        const firstRow = this.page.locator('//div[contains(@class,\'e-gridcontent\')]//table//tbody//tr[1]');
        await firstRow.waitFor({ state: 'visible', timeout: 15000 });
        await firstRow.click({ force: true });
        await this.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
        // Wait for the club detail view to be visible (edit mode not yet clicked, so use a read-only field)
        await this.page.locator('app-ribbon-menu, [aria-label="Edit progress"], button[title="Edit"]').first()
            .waitFor({ state: 'visible', timeout: 20000 });
        console.log('✓ Clicked first club record and detail page loaded');
    }

    async navigateToClubManagement() {
        await this.menu.waitFor({ state: "visible" })
        await this.menu.click()
    }

    async clickHomeTabEditMode() {
        await this.page.locator('.e-dlg-overlay').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
        await this.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
        const editButton = this.page.locator('button:has(span.e-edit)').filter({ visible: true }).nth(0);
        await editButton.waitFor({ state: 'visible', timeout: 15000 });
        await editButton.scrollIntoViewIfNeeded();
        await editButton.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked Edit mode on Home tab');
    }

    async clickWebsiteSectionEditMode() {
        const websiteEditBtn = this.page.locator(`//div[normalize-space()='Club Websites']/ancestor::div[contains(@class,'e-acrdn-header')]//button[.//span[contains(@class,'e-edit')]]`).first();
        await websiteEditBtn.waitFor({ state: 'visible', timeout: 15000 });
        await websiteEditBtn.scrollIntoViewIfNeeded();
        await websiteEditBtn.click();
        await this.page.waitForTimeout(1000);
        console.log('✓ Clicked Edit mode on Website section');
    }

    async clickViewModeButton() {
        await this.viewModeButton.waitFor({ state: 'visible', timeout: 15000 });
        await this.viewModeButton.scrollIntoViewIfNeeded();
        await this.viewModeButton.click();
        await this.page.waitForTimeout(1000);
        console.log('✓ Clicked View mode button (exited edit mode)');
    }



    async verifyPageTitle(expectedTitle) {
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        const titleLocator = this.page.locator(
            `//div[normalize-space(text())='${expectedTitle}'] | ` +
            `//h1[normalize-space(text())='${expectedTitle}'] | ` +
            `//h2[normalize-space(text())='${expectedTitle}'] | ` +
            `//span[normalize-space(text())='${expectedTitle}']`
        );
        await titleLocator.first().waitFor({ state: 'visible', timeout: 30000 });
    }

    //Create,update,add,confirm button 

    async clickClubManagementPageButton(name) {
        switch (name) {
            case "Create New Club":
                await this.createNewClubButton.first().waitFor({ state: 'visible', timeout: 30000 });
                await this.createNewClubButton.first().scrollIntoViewIfNeeded();
                await this.createNewClubButton.first().click();
                break;
            case "Create Club":
                await this.createClubButton.click();
                break;
            case "Add Club Website":
                await this.addClubWebsite.waitFor({ state: 'visible', timeout: 15000 });
                await this.addClubWebsite.scrollIntoViewIfNeeded();
                await this.addClubWebsite.click();
                break;
            case "Update": {
                const gridToolbarUpdate = this.page.locator('[aria-label="Update"]').first();
                const isToolbarVisible = await gridToolbarUpdate.isVisible().catch(() => false);
                if (isToolbarVisible) {
                    await gridToolbarUpdate.click();
                } else {
                    await this.updateButton.click();
                }
                break;
            }
            case "Add Function progress": {
                // Wait for the Person Functions tab panel to be active, then click its Add toolbar button
                await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
                const addFuncBtn = this.page.locator('button.e-tbar-btn[aria-label="Add"]:has(span.e-add)').first();
                await addFuncBtn.waitFor({ state: 'visible', timeout: 30000 });
                await addFuncBtn.scrollIntoViewIfNeeded();
                await addFuncBtn.click();
                break;
            }
            case "Add Section":
                await this.addSectionButton.waitFor({ state: 'visible', timeout: 15000 });
                await this.addSectionButton.click();
                break;
            case "Confirm": {
                await this.confirmButton.first().waitFor({ state: 'visible', timeout: 30000 });
                // Start observer BEFORE the click so we don't miss a fast toast
                await this.page.evaluate(() => {
                    window.__toastTexts = [];
                    if (window.__toastObserver) window.__toastObserver.disconnect();
                    window.__toastObserver = new MutationObserver((mutations) => {
                        for (const m of mutations) {
                            for (const node of m.addedNodes) {
                                if (node.nodeType !== 1) continue;
                                const els = [node, ...node.querySelectorAll('*')];
                                for (const el of els) {
                                    const t = el.textContent && el.textContent.trim();
                                    if (t && t.length > 2 && t.length < 250 && !window.__toastTexts.includes(t))
                                        window.__toastTexts.push(t);
                                }
                            }
                        }
                    });
                    window.__toastObserver.observe(document.body, { childList: true, subtree: true });
                });
                await this.confirmButton.first().scrollIntoViewIfNeeded();
                await this.confirmButton.click();
                break;
            }
            case "Map Venue":
                await this.map_Venue.waitFor({ state: 'visible', timeout: 15000 });
                await this.map_Venue.click();
                break;
            case "Map Tag":
                await this.map_Tag.waitFor({ state: 'visible', timeout: 15000 });
                await this.map_Tag.click();
                break;
            case "Add":
                await this.addButton.click()
                break;
            case "close":
                await this.close.first().waitFor({ state: 'visible', timeout: 15000 });
                await this.close.first().click();
                break;
            default:
                throw new Error(`No action defined for button name: ${name}`);
        }

    }

    async selectFederation(option) {
        await this.federationDropDown.click()
        await this.page.getByRole('option', { name: option, exact: true }).click();
    }

    async enterRegistrationNumber(registrationNumber) {
        await this.registrationNumberField.fill(registrationNumber);
    }

    async enterclubName(clubName) {
        await this.clubNameFileld.fill(clubName)
    }





    async uploadClubLogoViaButton(filePath) {
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.browseLogo.click()
        ]);
        await fileChooser.setFiles(filePath);
        await this.uploadButton.click()
    }


    async fillClubDetails(data) {
        const clubName = data['Club Name'] === "random" ? DataUtil.generateRandomClubName() : data['Club Name'];
        const federation = data['Federation'];
        const registrationNumber =
            data['Registration Number'] === 'random'
                ? DataUtil.generateRandomNumber()
                : data['Registration Number'];

        this.lastCreatedClubName = clubName;
        await this.enterclubName(clubName)
        await this.selectFederation(federation)
        await this.enterRegistrationNumber(String(registrationNumber));
    }



    async choosePrimaryColor(Primary) {
        await this.colorPrimaryField.fill(String(Primary));
    }

    async chooseSecondaryColor(Secondary) {
        await this.colorSecondaryField.locator('xpath=ancestor::ejs-textbox').click();
        await this.colorSecondaryField.fill(String(Secondary));
    }

    async chooseTertiaryColor(Tertiary) {
        await this.colorTertiaryField.locator('xpath=ancestor::ejs-textbox').click();
        await this.colorTertiaryField.fill(String(Tertiary));
    }


    async setClubColor(label, colorValue) {
        const colorPicker = this.page.locator('color-picker', {
            has: this.page.getByText(label, { exact: true })
        });
        const textbox = colorPicker.locator('input[role="textbox"]');
        if (await textbox.isEditable()) {
            await textbox.fill(colorValue);
            await textbox.press('Enter');
        } else {

            const splitBtn = colorPicker.locator('.e-split-colorpicker');
            await expect(splitBtn).toBeVisible({ timeout: 20000 });
            await splitBtn.click();
        }
        await this.page.mouse.click(500, 500);
    }


    async fillClubColor(colors) {
        for (const [label, value] of Object.entries(colors)) {
            await this.setClubColor(label, value);
        }
    }



    async openClubDetailsByName(clubName) {
        await this.searchByQuickSearch(clubName);
        await this.page.getByText(clubName, { exact: true }).first().click({ timeout: 15000 });
    }



    async ClicksaveClubWebsiteButton() {
        await expect(this.saveClubWebsiteButton).toBeEnabled();
        await this.saveClubWebsiteButton.click()
    }


    async enterFifaId(value) {
        await this.fifaIdInput.waitFor({ state: 'visible', timeout: 20000 });
        await this.fifaIdInput.fill(value);
    }

    async enterAbbreviation(value) {
        await this.abbreviationInput.waitFor({ state: 'visible' });
        await this.abbreviationInput.fill(value);
    }

    async selectCorrespondenceLanguage(language) {

        await this.correspondenceLanguageDropdown.waitFor({ state: 'visible' });
        await this.correspondenceLanguageDropdown.click();
        const option = this.dropdownOption(language);
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async enterFoundingDate(value) {
        await this.foundingDateInput.waitFor({ state: 'visible' });
        await this.foundingDateInput.fill(value);
    }

    async enterShortName(value) {
        await this.shortNameInput.waitFor({ state: 'visible' });
        await this.shortNameInput.fill(value);
    }

    async enterClubCode(value) {
        await this.clubCodeDropdown.waitFor({ state: 'visible' });
        await this.clubCodeDropdown.click();
        // let oldoptionValue = ''
        // try {
        //     oldoptionValue = await this.clubCodeInputValue.getAttribute("value")
        // } catch (error) {
        //     await this.clubCodeDropdown.click();
        // }
        // let allOptions = await this.page.getByRole('option').allTextContents()
        // console.log(allOptions, "************allOptions", value);
        // if (oldoptionValue == value) {
        //     value = allOptions.filter(e => e = !value)[1]
        // }
        const option = this.page.getByText(value, { exact: true })
        await option.waitFor({ state: 'visible' });
        await option.click();
    }


    async selectLegalStatus(value) {
        await this.legalStatusDropdown.waitFor({ state: 'visible' });
        await this.legalStatusDropdown.click();
        await this.page.getByRole('option', { name: value, exact: true }).click();
    }

    async selectStatus(value) {
        await this.statusDropdown.waitFor({ state: 'visible' });
        await this.statusDropdown.click({ force: true });
        await this.page.getByRole('option', { name: value, exact: true }).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.getByRole('option', { name: value, exact: true }).click({ force: true });
    }

    async fillClubWebsites(data) {
        await this.nameInput.fill(data.Name);
        let link = DataUtil.generateRandomLink(data.Link)
        await this.linkInput.fill(link);
        await this.descriptionInput.fill(data.Description);
    }

    async selectClubFunction(value) {
        await this.clubFunctionDropDown.waitFor({ state: 'visible' });
        await this.clubFunctionDropDown.click({ force: true })
        const option = this.dropdownOption(value);
        await option.waitFor({ state: 'visible' });
        await option.click({ force: true });
    }

    async financialDetails(data) {

        console.log(data);


        if (data['Bank Name']) {
            await this.bankNameInput.waitFor({ state: 'visible' });
            await this.bankNameInput.clear();
            let name = data['Bank Name'] == "random" ? DataUtil.bankName() : data['Bank Name']
            await this.bankNameInput.fill(name)
        }

        if (data['Bank Account']) {
            let account = data['Bank Account'] == "random" ? DataUtil.bankAccountNumber() : data['Bank Account']
            await this.bankAccountInput.waitFor({ state: 'visible' });
            await this.bankAccountInput.clear();
            await this.bankAccountInput.fill(account);
        }

        if (data['VAT Number']) {
            let VATNumber = data['VAT Number'] == "random" ? DataUtil.vatNumber() : data['VAT Number']
            await this.VATNumberInput.waitFor({ state: 'visible' });
            await this.VATNumberInput.clear();
            await this.VATNumberInput.fill(VATNumber);
        }
    }

    async validatePopupByText(expectedText, timeout = 20000) {
        const observerScript = () => {
            if (window.__toastObserver) return;
            window.__toastTexts = window.__toastTexts || [];
            window.__toastObserver = new MutationObserver((mutations) => {
                for (const m of mutations) {
                    for (const node of m.addedNodes) {
                        if (node.nodeType !== 1) continue;
                        const els = [node, ...node.querySelectorAll('*')];
                        for (const el of els) {
                            const t = el.textContent && el.textContent.trim();
                            if (t && t.length > 2 && t.length < 250 && !window.__toastTexts.includes(t))
                                window.__toastTexts.push(t);
                        }
                    }
                }
            });
            window.__toastObserver.observe(document.body, { childList: true, subtree: true });
        };
        // Start observer only if Confirm case didn't already start it
        await this.page.evaluate(observerScript);

        try {
            await this.page.waitForFunction(
                (text) => (window.__toastTexts || []).some(t => t.includes(text)),
                expectedText,
                { timeout }
            );
            console.log(`✓ Popup message displayed: "${expectedText}"`);
        } catch {
            const all = await this.page.evaluate(() => window.__toastTexts || []);
            const detail = all.length
                ? `Text seen after Confirm: ${all.slice(0, 15).map(t => `"${t}"`).join(' | ')}`
                : 'No new DOM elements were added after clicking Confirm.';
            throw new Error(`Popup with text "${expectedText}" was not visible within ${timeout}ms. ${detail}`);
        } finally {
            await this.page.evaluate(() => {
                if (window.__toastObserver) { window.__toastObserver.disconnect(); delete window.__toastObserver; }
                delete window.__toastTexts;
            });
        }
    }

    async searchAndSelectPerson(name) {
        await this.searchPersonName.waitFor({ state: 'visible', timeout: 15000 });
        await this.searchPersonName.fill(name);
        // Wait for the suggestion dropdown to appear and click the matching result
        const suggestion = this.page.locator(
            `//li[contains(@class,'e-list-item') and normalize-space()='${name}']` +
            ` | //div[contains(@class,'suggestion') or contains(@class,'autocomplete')]//span[normalize-space()='${name}']` +
            ` | //mat-option[normalize-space()='${name}']`
        ).first();
        const suggestionVisible = await suggestion.isVisible({ timeout: 5000 }).catch(() => false);
        if (suggestionVisible) {
            await suggestion.click({ force: true });
        } else {
            await this.searchPersonName.press('Enter');
            // After Enter, wait briefly and try to click a result row if one appears
            await this.page.waitForTimeout(500);
            const resultRow = this.page.locator(
                `//tr[.//td[normalize-space()='${name}']] | //li[normalize-space()='${name}']`
            ).first();
            if (await resultRow.isVisible({ timeout: 3000 }).catch(() => false)) {
                await resultRow.click({ force: true });
            }
        }
        console.log(`✓ Selected person: "${name}"`);
    }

    async setClubFunctionEndDateAndStartDate(startDate, endDate) {
        let startDateFixed = startDate == "current" ? DataUtil.getCurrentDate() : startDate
        let endDateFixed = endDate == "future" ? DataUtil.getFutureDate() : endDate
        await this.clubFunctionStartDate.waitFor({ state: "visible" })
        await this.clubFunctionStartDate.fill(startDateFixed)
        await this.clubFunctionEndDate.fill(endDateFixed)
    }

    async setSectionFunctionEndDateAndStartDate(startDate, endDate) {
        let startDateFixed = startDate == "current" ? DataUtil.getCurrentDate() : startDate
        let endDateFixed = endDate == "future" ? DataUtil.getFutureDate() : endDate
        await this.sectionFunctionStartDate.waitFor({ state: "visible" })
        await this.sectionFunctionStartDate.fill(startDateFixed)
        await this.sectionFunctionEndDate.fill(endDateFixed)
    }

    async setTeamFunctionEndDateAndStartDate(startDate, endDate) {
        let startDateFixed = startDate == "current" ? DataUtil.getCurrentDate() : startDate
        let endDateFixed = endDate == "future" ? DataUtil.getFutureDate() : endDate
        await this.teamFunctionStartDate.waitFor({ state: "visible" })
        await this.teamFunctionStartDate.fill(startDateFixed)
        await this.teamFunctionEndDate.fill(endDateFixed)
    }


    async addClubFunction(data) {
        // Wait for the popup to open and the Person Name field to be visible
        await this.searchPersonName.waitFor({ state: 'visible', timeout: 15000 });
        await this.searchAndSelectPerson(data['Person Name']);

        // Wait for the Club Function form fields to render after person selection
        await this.clubFunctionDropDown.waitFor({ state: 'visible', timeout: 15000 });

        // Club field: skip if 'default' (pre-populated with current club)
        if (data['Club'] && data['Club'] !== 'default') {
            await this.clubFunctionClubDropDown.waitFor({ state: 'visible' });
            await this.clubFunctionClubDropDown.click({ force: true });
            const option = this.dropdownOption(data['Club']);
            await option.waitFor({ state: 'visible' });
            await option.click({ force: true });
        }

        await this.selectClubFunction(data['Function']);
        await this.setClubFunctionEndDateAndStartDate(data['Start Date'], data['End Date']);
    }

    // Section function with person 
    async selectSectionFunctionSection(value) {
        await this.sectionFunctionSectionDropDown.waitFor({ state: 'visible' });
        await this.sectionFunctionSectionDropDown.click({ force: true });
        if (value === 'first') {
            const firstOption = this.page.locator('.e-popup-open li.e-list-item:not(.e-disabled)').first();
            await firstOption.waitFor({ state: 'visible', timeout: 10000 });
            await firstOption.click({ force: true });
        } else {
            const option = this.dropdownOption(value);
            await option.first().waitFor({ state: 'visible' });
            await option.first().click({ force: true });
        }
    }

    async selectsectionFunctionFunction(value) {
        await this.sectionFunctionDropDown.waitFor({ state: 'visible' });
        await this.sectionFunctionDropDown.click({ force: true });
        const option = this.dropdownOption(value);
        await option.waitFor({ state: 'visible' });
        await option.click({ force: true });
    }


    //Team function with person

    async selectTeamFunctionFunction(value) {
        await this.teamFunctionDropDown.waitFor({ state: 'visible' });
        await this.teamFunctionDropDown.click({ force: true });
        const option = this.dropdownOption(value);
        await option.waitFor({ state: 'visible' });
        await option.click({ force: true });
    }

    async selectTeamFunctionSection(value) {
        await this.teamFunctionSectionDropDown.waitFor({ state: 'visible' });
        await this.teamFunctionSectionDropDown.click({ force: true });
        if (value === 'first') {
            const firstOption = this.page.locator('.e-popup-open li.e-list-item:not(.e-disabled)').first();
            await firstOption.waitFor({ state: 'visible', timeout: 10000 });
            await firstOption.click({ force: true });
        } else {
            const option = this.dropdownOption(value);
            await option.first().waitFor({ state: 'visible' });
            await option.first().click({ force: true });
        }
    }

    async selectTeamFunctionTeam(value) {
        await this.teamFunctionTeamDropDown.waitFor({ state: 'visible' });
        await this.teamFunctionTeamDropDown.click({ force: true });
        if (value === 'first') {
            const firstOption = this.page.locator('.e-popup-open li.e-list-item:not(.e-disabled)').first();
            await firstOption.waitFor({ state: 'visible', timeout: 10000 });
            await firstOption.click({ force: true });
        } else {
            const option = this.dropdownOption(value);
            if (await option.count() == 1) {
                await option.waitFor({ state: 'visible' });
                await option.click({ force: true });
            } else {
                await option.first().waitFor({ state: 'visible' });
                await option.first().click({ force: true });
            }
        }
    }



    async addSectionFunction(data) {
        await this.selectSectionFunctionSection(data.Section)
        await this.selectsectionFunctionFunction(data.Function)
        await this.setSectionFunctionEndDateAndStartDate(data['Start Date'], data['End Date'])
    }

    async addTeamFunction(data) {
        await this.selectTeamFunctionSection(data.Section)
        await this.selectTeamFunctionTeam(data.Team)
        await this.selectTeamFunctionFunction(data.Function)
        await this.setTeamFunctionEndDateAndStartDate(data['Start Date'], data['End Date'])
    }

    //Section Tab

    async enterSectionRegistrationNumber(sectionRegisterNumber) {
        await this.sectionRegisterNumberField.waitFor({ state: 'visible', timeout: 15000 });
        await this.sectionRegisterNumberField.fill(sectionRegisterNumber);
    }

    async selectSectionTabDropdown(labelText, option) {
        let dropdown;
        if (labelText === 'Sportive Type') {
            dropdown = this.sectionSportiveTypeDropDown;
        } else if (labelText === 'Format') {
            dropdown = this.sectionFormatIdDropDown;
        } else if (labelText === 'Gender Offering') {
            dropdown = this.sectionGenderOfferingDropDown;
        }
        await dropdown.waitFor({ state: 'visible', timeout: 10000 });
        await dropdown.click({ force: true });
        const opt = this.page.locator(`.e-popup-open li.e-list-item:not(.e-disabled)`).filter({ hasText: option }).first();
        await opt.waitFor({ state: 'visible', timeout: 10000 });
        await opt.click({ force: true });
    }


    async addSectionTabFunction(data) {

        const sectionRegisterNumber =
            data['Registration Number'] === 'random'
                ? DataUtil.generateRandomNumber()
                : data['Registration Number'];

        await this.enterSectionRegistrationNumber(String(sectionRegisterNumber));

        await this.selectSectionTabDropdown('Sportive Type', data['Sportive Type']);
        await this.selectSectionTabDropdown('Format', data['Format']);
        await this.selectSectionTabDropdown('Gender Offering', data['Gender Offering']);

    }

    //Venue 

    async enterVenueName(venueName) {
        await this.map_Venue_Name.waitFor({ state: 'visible', timeout: 15000 });
        await this.map_Venue_Name.click();
        await this.map_Venue_Name.clear();
        await this.map_Venue_Name.pressSequentially(venueName, { delay: 50 });
        const option = this.page.locator(`.e-popup-open li.e-list-item:not(.e-disabled)`).filter({ hasText: venueName }).first();
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click({ force: true });
    }

    async selectPurpose(value) {
        await this.map_Venue_Purpose.waitFor({ state: 'visible', timeout: 15000 });
        await this.map_Venue_Purpose.click();
        const opt = this.page.locator(`.e-popup-open li.e-list-item:not(.e-disabled)`).filter({ hasText: value }).first();
        await opt.waitFor({ state: 'visible', timeout: 10000 });
        await opt.click({ force: true });
        // Close the multiselect popup so it doesn't block subsequent clicks
        await this.page.keyboard.press('Escape');
        await this.page.locator('.e-popup-open').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    }

    async addVenueFunction(data) {
        const name =
            data['Name'] === 'random'
                ? DataUtil.generateRandomClubName()
                : data['Name'];
        const purpose = data['Purpose'];
        if (name && name !== 'null') {
            await this.enterVenueName(name);
        }
        if (purpose) {
            await this.selectPurpose(purpose);
        }
    }


    async deleteTheVenue(name) {
        const row = this.page.locator(`//tr[@role='row'][td[normalize-space()='${name}']]`).first();
        await row.waitFor({ state: 'visible', timeout: 15000 });
        await row.click({ force: true });
        const deleteBtn = this.page.locator('button.e-tbar-btn[aria-label="Delete"]:has(span.e-delete)');
        await deleteBtn.waitFor({ state: 'visible', timeout: 10000 });
        await deleteBtn.click({ force: true });
    }

    async clickEditIconVenueTable(name) {
        const row = this.page.locator(`//tr[@role='row'][td[normalize-space()='${name}']]`).first();
        await row.waitFor({ state: 'visible', timeout: 15000 });
        await row.click({ force: true });
        const editBtn = this.page.locator('button.e-tbar-btn[aria-label="Edit"]:has(span.e-edit)');
        await editBtn.waitFor({ state: 'visible', timeout: 10000 });
        await editBtn.click({ force: true });
    }

    //Tag 

    async clickUnlinkIconTagsTable(name) {
        let locator = this.tagUnlinkIcon(name)
        await locator.first().click()
    }

    async selectTagcategory(category) {
        await this.map_Category_DrpDwn.waitFor({ state: 'visible', timeout: 10000 });
        await this.map_Category_DrpDwn.click();
        const opt = this.page.locator(`.e-popup-open li.e-list-item:not(.e-disabled)`).filter({ hasText: category }).first();
        await opt.waitFor({ state: 'visible', timeout: 10000 });
        await opt.click({ force: true });
    }

    async selectTagtagName(tagName) {
        await this.map_Tag_Name.waitFor({ state: 'visible', timeout: 10000 });
        await this.map_Tag_Name.click();
        const opt = this.page.locator(`.e-popup-open li.e-list-item:not(.e-disabled)`).filter({ hasText: tagName }).first();
        await opt.waitFor({ state: 'visible', timeout: 10000 });
        await opt.click({ force: true });
        await this.page.keyboard.press('Escape');
        await this.page.locator('.e-popup-open').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    }

    async addMapTag(data) {
        const category = data['Category'];
        const tagName = data['Tag Name'];
        if (category) {
            await this.selectTagcategory(category)
        }
        if (tagName) {
            await this.selectTagtagName(tagName)
        }
    }

    // Attribute
    async enter_attribute_value(value) {
        await this.page.waitForTimeout(500);
        const input = this.page.locator(
            '//input[@placeholder="Enter Attribute Value"] | ' +
            '//*[contains(@class,"e-dialog")]//input[not(@type="hidden")] | ' +
            '//*[@role="dialog"]//input[not(@type="hidden")]'
        ).first();
        await input.waitFor({ state: 'visible', timeout: 15000 });
        await input.click();
        await input.fill(value);
    }
    async click_attribute_Unlink(attribute) {
        const unlinkBtn = this.page.locator(`//tr[@role='row'][.//div[normalize-space()='${attribute}']]//button[contains(@class,'custom-delete-btn') or .//img[@alt='Unlink']]`);
        await unlinkBtn.waitFor({ state: 'attached', timeout: 15000 });
        await unlinkBtn.click({ force: true });
    }

    async click_attribute_edit(attribute) {
        const row = this.page.locator(`//tr[@role='row'][.//td[@aria-colindex='2']//div[normalize-space()='${attribute}']]`).first();
        await row.waitFor({ state: 'visible', timeout: 15000 });
        await row.click({ force: true });
        const editBtn = this.page.locator('button.e-tbar-btn[aria-label="Edit"]:has(span.e-edit)');
        await editBtn.waitFor({ state: 'visible', timeout: 10000 });
        await editBtn.click({ force: true });
    }

    async searchLastCreatedClubInGrid() {
        const clubName = this.lastCreatedClubName;
        if (!clubName) throw new Error('No recently created club name found. Create a club first.');
        await this.searchByQuickSearch(clubName);
        console.log(`✓ Searched for recently created club: "${clubName}"`);
    }

    async searchClubsCreatedTodayInGrid() {
        const todayPrefix = DataUtil.getTodayClubNamePrefix();
        await this.searchByQuickSearch(todayPrefix);
        console.log(`✓ Searched for clubs created today with prefix: "${todayPrefix}"`);
    }

    async clickEditIconOnPersonFunctionTab() {
        await this.page.locator('.e-dlg-overlay').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
        const editButton = this.page.locator('button:has(span.e-edit)').filter({ visible: true }).first();
        await editButton.waitFor({ state: 'visible', timeout: 15000 });
        await editButton.scrollIntoViewIfNeeded();
        await editButton.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked Edit mode on Person Function tab');
    }

    async selectFirstPersonFunctionRecord() {
        const firstRow = this.page.locator('.e-gridcontent tbody tr[role="row"]').first();
        await firstRow.waitFor({ state: 'visible', timeout: 15000 });
        await firstRow.click({ force: true });
        console.log('✓ Selected first person function record');
    }

    async clickPersonFunctionToolbarButton(buttonName) {
        const button = this.page.locator(`button[aria-label="${buttonName}"]`).filter({ hasText: buttonName });
        await button.waitFor({ state: 'visible', timeout: 10000 });
        await button.click({ force: true });
        console.log(`✓ Clicked "${buttonName}" on Person Function toolbar`);
    }

}

module.exports = ClubManagementPage;
