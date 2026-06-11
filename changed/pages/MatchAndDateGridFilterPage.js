const { expect } = require('chai');
class MatchAndDateGridFilterPage {
	constructor(page) {
		this.page = page;

		// Tab locators
		this.matchGridTab = this.page.locator("//div[contains(text(),'Match Grid')]").first();
		this.dateGridTab = this.page.locator("//div[contains(text(),'Date Grid')]").first();
        this.competitionManagementTab = this.page.locator("//div[@id='Competition Management']");
	    this.federationManagementTab = this.page.locator("//span[normalize-space()='Federation Management'] | //div[normalize-space()='Federation Management']").first();


		// Filter icon & tab locators
		this.filterIcon = this.page.locator("//span[contains(@style,'filter.svg')]");
		this.basicFilterTabBtn = this.page.locator("//button[contains(text(),' Basic Filter ')]");

		// Basic filter locators
		this.basicFilterHeading = this.page.locator("//button[contains(normalize-space(),'Basic Filter')] | //div[normalize-space()='Basic Filter']").first();
		this.currentFilterTextbox = this.page.locator("//div[contains(text(),'Current Filter')]");
		this.templateNameInput = this.page.locator("//input[@placeholder='Search by Template Name']");
		this.totalTeamsInput = this.page.locator("//input[@placeholder='Search by Template Name or Total Teams']");
		this.matchDayCountInput = this.page.locator("//input[@placeholder='Search by Template Name or Match Day Count']");
		this.statusText = this.page.locator("//label[normalize-space()='Status']");
		this.activeButton = this.page.locator("//div[@class='mb-2'] //button[normalize-space()='Active']");
		this.inactiveButton = this.page.locator("//div[@class='mb-2'] //button[normalize-space()='Inactive']");
		this.applyButton = this.page.locator("//button[normalize-space()='Apply']");
		this.resetButton = this.page.locator("//button[normalize-space()='Reset']");
		this.cancelButton = this.page.locator("//button[normalize-space()='Cancel']");
		this.saveAsSegmentButton = this.page.locator("//button[normalize-space()='Save as Segment']");
		
		// Autocomplete popup locators
		this.autocompletePopup = this.page.locator("[id*='ej2_dropdownlist']");
		this.autocompleteOptions = this.page.locator("[role='listbox'] [role='option']");
	}

	async selectTab(tabName) {
		switch (tabName) {
			case 'Match Grid':
				await this.matchGridTab.click();
				break;
			case 'Date Grid':
				await this.dateGridTab.click();
				break;
            
            case 'Competition Management':
				await this.competitionManagementTab.click();
				break;
			
			case 'Federation Management':
				await this.federationManagementTab.click();
				break;
			default:
				throw new Error(`Tab \"${tabName}\" is not supported`);
		}
	}

	async clickOnButton(label) {
		switch (label) {
			case 'filter':
				await this.filterIcon.click();
				break;
			case 'basic filter':
				await this.basicFilterTabBtn.click();
				break;
			default:
				throw new Error(`Button "${label}" is not supported in clickOnButton`);
		}
	}

	getBasicFilterElementLocator(label) {
		switch (label) {
			case 'Basic filter':
				return this.basicFilterHeading;
			case 'Current Filter':
				return this.currentFilterTextbox;
			case 'Template Name':
				return this.templateNameInput;
			case 'Total Teams':
				return this.totalTeamsInput;
			case 'Match Day Count':
				return this.matchDayCountInput;
			case 'Status':
				return this.statusText;
			case 'Active':
				return this.activeButton;
			case 'Inactive':
				return this.inactiveButton;
			case 'Apply':
				return this.applyButton;
			case 'Reset':
				return this.resetButton;
			case 'Cancel':
				return this.cancelButton;
			case 'Save as Segment':
				return this.saveAsSegmentButton;
			default:
				throw new Error(`Element \"${label}\" is not configured for basic filter validation`);
		}
	}

	async verifyBasicFilterElementVisible(label) {
		const locator = this.getBasicFilterElementLocator(label);
		await locator.waitFor({ state: 'visible', timeout: 15000 });
		expect(await locator.isVisible(), `Expected basic filter element "${label}" to be visible`).to.be.true;
	}

    async validateApiResponseField(responseBody, field, expectedValue) {
            expect(responseBody).to.be.ok;
            expect(Array.isArray(responseBody.items)).to.be.true;
    
            const items = responseBody.items;
            console.log(items);
    
            console.log(`Validating ${items.length} API response items for field "${field}" = "${expectedValue}"`);
    
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                let actualValue;
    
                if (field === 'Template Name') {
                    actualValue = item?.templateName;
                } else if (field === 'Total Teams') {
                    actualValue = item?.templateName;
                } else if (field === 'Match Day Count') {
                    actualValue = item?.templateName;
                }else if(field ==='Status'){
					actualValue = item?.status?.libraryValue;

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


        async clickOnBasicFilterApplyButton() {
            await this.applyButton.click();
        }

        async enterTemplateNameInBasicFilter(templateSearch) {
            // Type template name with delay
            await this.templateNameInput.pressSequentially(templateSearch, { delay: 100 });
            await this.templateNameInput.press('ArrowDown');
            await this.templateNameInput.press('Enter');
        }

		async enterTotalTeamsInBasicFilter(totalTeams) {
			await this.totalTeamsInput.pressSequentially(totalTeams, { delay: 100 });
			await this.totalTeamsInput.press('ArrowDown');
			await this.totalTeamsInput.press('Enter');
		}

		async enterMatchDayCountInBasicFilter(matchDayCount) {
			await this.matchDayCountInput.pressSequentially(matchDayCount, { delay: 100 });
			await this.matchDayCountInput.press('ArrowDown');
			await this.matchDayCountInput.press('Enter');
		}

		async selectStatusInBasicFilter(statusValue) {
			const normalizedStatus = statusValue.trim().toLowerCase();

			if (normalizedStatus === 'active') {
				await this.activeButton.click();
			} else if (normalizedStatus === 'inactive') {
				await this.inactiveButton.click();
			} else {
				throw new Error(`Status value "${statusValue}" is not supported. Use "Active" or "Inactive".`);
			}
		}


		async enterValueInBasicFilter(inputValue, field) {
			
			if (field === 'Template Name') {
				await this.enterTemplateNameInBasicFilter(inputValue);
			} else if (field === 'Total Teams') {
				await this.enterTotalTeamsInBasicFilter(inputValue);
			} else if (field === 'Match Day Count') {
				await this.enterMatchDayCountInBasicFilter(inputValue);
			} else if (field === 'Status') {
				await this.selectStatusInBasicFilter(inputValue);
			} else {
				throw new Error(`Input for field "${field}" is not implemented in enterValueInBasicFilter method`);
			}

		}

		async clickOnBasicFilterResetButton() {
			await this.resetButton.click();
			await this.page.waitForTimeout(500);
		}
}

module.exports = MatchAndDateGridFilterPage;
