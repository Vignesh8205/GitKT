/**
 * Class Name: DataSetsBasicFilterPage
 *
 * Description:
 * Page Object for the Data Sets Basic Filter panel.
 * Covers: Name search, Status (Active / Inactive) filter,
 * Apply button, and API response validation.
 *
 * @author Prem Kumar
 * @version 1.0
 * @since 12-04-2026
 */

const { expect } = require('chai');

class DataSetsBasicFilterPage {
    constructor(page) {
        this.page = page;

        // Navigation
        this.dataSetsTab = this.page
            .locator("//span[normalize-space()='Data Sets'] | //div[normalize-space()='Data Sets']")
            .first();

        // Filter panel controls
        this.filterIcon = this.page
            .locator("//button[@aria-label='Filter'] | //button[contains(@title,'Filter')] | //span[contains(@style,'filter.svg')]")
            .first();
        this.basicFilterTab = this.page
            .locator("//button[contains(normalize-space(),'Basic Filter')] | //div[normalize-space()='Basic Filter']")
            .first();

        // Filter panel elements
        this.filterHeading = this.page
            .locator("//div[contains(@class,'filter-header')] | //h2[contains(normalize-space(),'Filter')] | //span[contains(@class,'filter-title')]")
            .first();
        this.basicFilterSubheading = this.page
            .locator("//div[contains(@class,'basic-filter')] | //span[contains(normalize-space(),'Basic Filter') and not(@role='button')]")
            .first();
        this.currentFilterSection = this.page
            .locator("//div[contains(@class,'current-filter')] | //div[contains(@class,'active-filter')]")
            .first();

        // Name search box
        this.nameSearchInput = this.page
            .locator("//input[contains(@placeholder,'Search by Dataset Name')] | //label[normalize-space()='Search']/following::input[1]")
            .first();

        // Status buttons
        this.activeButton = this.page.locator("(//button[normalize-space()='Active'])[2]");
        this.inactiveButton = this.page.locator("(//button[normalize-space()='Inactive'])[2]");

        // Action buttons
        this.resetButton = this.page
            .locator("//button[normalize-space()='Reset']")
            .first();
        this.cancelButton = this.page
            .locator("//button[normalize-space()='Cancel']")
            .first();
        this.applyButton = this.page
            .locator("//button[normalize-space()='Apply']")
            .first();
        this.saveAsSegmentButton = this.page
            .locator("//button[contains(normalize-space(),'Save as Segment')] | //button[contains(normalize-space(),'Save As Segment')]")
            .first();

        // Grid
        this.gridRows = this.page
            .locator("//tr[contains(@class,'e-row')] | //div[@role='row' and contains(@class,'e-row')]");
    }

    async navigateToDataSets() {
        await this.dataSetsTab.waitFor({ state: 'visible', timeout: 15000 });
        await this.dataSetsTab.click();
    }

    async openFilterAndBasicFilter() {
        await this.filterIcon.waitFor({ state: 'visible', timeout: 15000 });
        await this.filterIcon.click();

        await this.basicFilterTab.waitFor({ state: 'visible', timeout: 15000 });
        await this.basicFilterTab.click();
    }

    async searchByName(name) {
        await this.selectAutoCompleteValue(this.nameSearchInput, name);
    }

    async chooseStatus(statusValue) {
        const normalizedStatus = statusValue.trim().toLowerCase();

        if (normalizedStatus === 'active') {
            await this.activeButton.waitFor({ state: 'visible', timeout: 15000 });
            await this.activeButton.click();
        } else if (normalizedStatus === 'inactive') {
            await this.inactiveButton.waitFor({ state: 'visible', timeout: 15000 });
            await this.inactiveButton.click();
        } else {
            throw new Error(`Unknown status value "${statusValue}"`);
        }
    }

    async clickApplyButton() {
        await this.applyButton.waitFor({ state: 'visible', timeout: 15000 });
        await this.applyButton.click();
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

    async validateApiResponseField(responseBody, field, expectedValue) {
        expect(responseBody).to.be.ok;
        expect(Array.isArray(responseBody.items)).to.be.true;

        const items = responseBody.items;
        console.log(`Validating ${items.length} API response items for field "${field}" = "${expectedValue}"`);

        const normalize = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');

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

        // Default: Name field
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let actualValue;

            if (field === 'Name') {
                actualValue = item?.name;
            }

            expect(
                actualValue?.toLowerCase(),
                `Item[${i}] "${item?.name}" has ${field}="${actualValue}" but expected "${expectedValue}"`
            ).to.include(expectedValue.toLowerCase());
        }
    }
}

module.exports = DataSetsBasicFilterPage;
