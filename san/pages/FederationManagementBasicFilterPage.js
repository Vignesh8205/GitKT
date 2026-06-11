const { expect } = require('chai');

class FederationManagementBasicFilterPage {
    constructor(page) {
        this.page = page;

        this.federationManagementTab = this.page.locator("//span[normalize-space()='Federation Management'] | //div[normalize-space()='Federation Management']").first();
        this.filterIcon = this.page.locator("//button[@aria-label='Filter'] | //button[contains(@title,'Filter')] | //span[contains(@style,'filter.svg')]").first();
        this.basicFilterTab = this.page.locator("//button[contains(normalize-space(),'Basic Filter')] | //div[normalize-space()='Basic Filter']").first();

        this.organizationSearchInput = this.page.locator("//label[normalize-space()='Organization']/following::input[contains(@placeholder,'Search')][1] | //input[contains(@placeholder,'Organization')]").first();
        this.federationSearchInput = this.page.locator("//div[@class='e-multi-select-wrapper e-down-icon']");
        this.federationDropdownTrigger = this.page.locator("//input[contains(@placeholder,'Select Federation')]/ancestor::div[contains(@class,'e-multi-select-wrapper')][1]").first();

        // Formats
        this.footballFormat = this.page.locator("//button[contains(normalize-space(text()), 'Football')]").first();
        this.futsalFormat = this.page.locator("//button[contains(normalize-space(text()), 'Futsal')]").first();
        this.minifootballFormat = this.page.locator("//button[contains(normalize-space(text()), 'Mini-footbal')]").first();

        this.statusDropdown = this.page.locator("//label[normalize-space()='Status']/following::span[@role='combobox'][1] | //label[normalize-space()='Status']/following::span[contains(@class,'e-input-group')][1]").first();
        this.activeStatusButton = this.page.locator("(//button[normalize-space()='Active'])[2]");
        this.inactiveStatusButton = this.page.locator("(//button[normalize-space()='Inactive'])[2]");

        this.applyButton = this.page.locator("//button[normalize-space()='Apply']").first();
        this.gridRows = this.page.locator("//tr[contains(@class,'e-row')] | //div[@role='row' and contains(@class,'e-row')]");
        this.federationOptions =this.page.locator("//div[contains(@class,'e-dropdownlist') and contains(@style,'display: block')]//li | //ul[contains(@class,'e-list') and contains(@style,'display: block')]//li");
    }

    async navigateToFederationManagement() {
        await this.federationManagementTab.waitFor({ state: 'visible', timeout: 15000 });
        await this.federationManagementTab.click();
    }

    async openFilterAndBasicFilter() {
        await this.filterIcon.waitFor({ state: 'visible', timeout: 15000 });
        await this.filterIcon.click();

        await this.basicFilterTab.waitFor({ state: 'visible', timeout: 15000 });
        await this.basicFilterTab.click();
    }

    async searchOrganization(organizationName) {
        await this.selectAutoCompleteValue(this.organizationSearchInput, organizationName);
    }

    async selectOptions(options) {
        // Ensure options is an array
        if (!Array.isArray(options)) {
            throw new Error(`selectOptions expects an array, received ${typeof options}`);
        }

        await this.federationSearchInput.waitFor({ state: 'visible', timeout: 15000 });
        await this.federationSearchInput.click();
        const popup = this.page.locator('ul.e-list-parent').last();
        await popup.waitFor({ state: 'visible', timeout: 10000 });

        for (const option of options) {
            const optionText = option.trim();
            const dropdownOption = popup.getByText(optionText, { exact: true }).first();
            await dropdownOption.waitFor({ state: 'visible', timeout: 10000 });
            await dropdownOption.click();
        }
    }
  

    async chooseFormat(formatValue) {   

        if (formatValue.toLowerCase() === 'football') {
            await this.footballFormat.waitFor({ state: 'visible', timeout: 15000 });
            await this.footballFormat.click();
            return;
        } else if (formatValue.toLowerCase() === 'futsal') {
            await this.futsalFormat.waitFor({ state: 'visible', timeout: 15000 });
            await this.futsalFormat.click();
            return; 
        } else if (formatValue.toLowerCase() === 'mini-football') {
            await this.minifootballFormat.waitFor({ state: 'visible', timeout: 15000 });
            await this.minifootballFormat.click();
            return;
        } else {
            throw new Error(`Unknown format value "${formatValue}"`);       
        }

    }

    async chooseStatus(statusValue) {
        const normalizedStatus = statusValue.trim().toLowerCase();

        if (normalizedStatus === 'active') {
           
            await this.activeStatusButton.waitFor({ state: 'visible', timeout: 15000 });
            await this.activeStatusButton.click();
        }else if (normalizedStatus === 'inactive') {
            await this.inactiveStatusButton.waitFor({ state: 'visible', timeout: 15000 });
            await this.inactiveStatusButton.click();
        }
    }

    async clickApplyButton() {
        await this.applyButton.waitFor({ state: 'visible', timeout: 15000 });
        await this.applyButton.click();
    }

    async verifyFilteredResultsVisible() {
        await this.page.waitForLoadState('networkidle');

        const rowCount = await this.gridRows.count();
        expect(rowCount, 'Expected filtered grid to show at least one record').to.be.greaterThan(0);
    }

    async selectAutoCompleteValue(inputLocator, value) {
        await inputLocator.waitFor({ state: 'visible', timeout: 15000 });
        await inputLocator.click();
        await inputLocator.fill('');
        await inputLocator.pressSequentially(value, { delay: 100 });

        const option = this.page.getByRole('option', { name: value, exact: false }).first();
        const optionVisible = await option.isVisible().catch(() => false);

        if (optionVisible) {
            await option.click();
        } else {
            await inputLocator.press('ArrowDown');
            await inputLocator.press('Enter');
        }
    }

    async selectDropdownOption(optionText) {
        const roleBasedOption = this.page.getByRole('option', { name: optionText, exact: true }).first();
        const textBasedOption = this.page.getByText(optionText, { exact: true }).first();

        if (await roleBasedOption.isVisible().catch(() => false)) {
            await roleBasedOption.click();
            return;
        }

        await textBasedOption.waitFor({ state: 'visible', timeout: 10000 });
        await textBasedOption.click();
    }

    async validateApiResponseField(responseBody, field, expectedValue) {
            expect(responseBody).to.be.ok;
            expect(Array.isArray(responseBody.items)).to.be.true;
    
            const items = responseBody.items;
            console.log(items);
    
            console.log(`Validating ${items.length} API response items for field "${field}" = "${expectedValue}"`);

            const normalize = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');

            if (field === 'Federation Name') {
                const expected = expectedValue.toLowerCase();
                const hasExpectedFederation = items.some((item) => {
                    const federationNames = (item?.fedId || [])
                        .map((fed) => fed?.name)
                        .filter(Boolean)
                        .map((name) => name.toLowerCase());

                    return federationNames.some((name) => name.includes(expected));
                });

                expect(
                    hasExpectedFederation,
                    `Expected at least one API item to have Federation Name matching "${expectedValue}"`
                ).to.be.true;

                return;
            }

            if (field === 'Format') {
                expect(
                    items.length,
                    `Expected at least one API item for Format "${expectedValue}", but received empty items`
                ).to.be.greaterThan(0);

                const expected = normalize(expectedValue);
                const hasExpectedFormat = items.some((item) => {
                    const formatNames = (item?.formatId || [])
                        .map((format) => format?.name)
                        .filter(Boolean)
                        .map((name) => normalize(name));

                    return formatNames.includes(expected);
                });

                expect(
                    hasExpectedFormat,
                    `Expected at least one API item to have Format matching "${expectedValue}"`
                ).to.be.true;

                return;
            }

            if (field === 'Status') {
                expect(
                    items.length,
                    `Expected at least one API item for Status "${expectedValue}", but received empty items`
                ).to.be.greaterThan(0);

                const expected = normalize(expectedValue);

                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    const actualStatus = normalize(item?.status?.libraryValue);

                    expect(
                        actualStatus,
                        `Item[${i}] "${item?.name || 'Unknown'}" has Status="${item?.status?.libraryValue}" but expected "${expectedValue}"`
                    ).to.equal(expected);
                }

                return;
            }
    
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                let actualValue;
    
                    if (field === 'Organization Name') {
                        actualValue = item?.name;
                } else if (field === 'Match Day Count') {
                    actualValue = item?.templateName;
                }
    
                expect(
                    actualValue?.toLowerCase(),
                    `Item[${i}] "${item.name}" has ${field}="${actualValue}" but expected "${expectedValue}"`
                ).to.include(expectedValue.toLowerCase());
            }

        }
    
}

module.exports = FederationManagementBasicFilterPage;
