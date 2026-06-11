const { expect } = require('@playwright/test');
const DataUtil = require('../utils/dataUtil');

class DivisionCategoryPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.addButton = page.locator('(//span[contains(text(),"Create Division Category")])');
        this.categoryCode = page.locator('(//input[@placeholder="Enter Division Category Code"])');
        this.categoryName = page.locator('(//input[@placeholder="Enter Division Category Name"])');
        this.format = page.locator('//div[contains(@class,"e-multi-select-wrapper")]');
        this.editIconButton = page.locator('//button[@title="Edit"]');
        this.description = page.locator('[placeholder="Enter Description"]');
        this.createButton = page.locator("//span[normalize-space()='Create']");
        this.updateButton = page.locator("//span[normalize-space()='Update']");
        this.navigateToDivisionCat = page.locator('(//span[contains(text(),"Division Category")])[1]');
        this.divisionCategoryType = page.locator('//ejs-dropdownlist//span[@role="combobox"]');

        // Quick search
        this.searchIcon = page.locator("span[style*='search-icon.svg']").first();
        this.searchInput = page.locator('input[name="search"]#search_input[placeholder="Search by division categories"]');
        this.closeSearchBtn = page.locator("button.text-xl").first();
        this.firstGridRow = page.locator("//div[contains(@class,'e-gridcontent')]//table//tbody//tr[1]");

        // Ribbon edit button (visible in detail page)
        this.ribbonEditBtn = page.locator("//button[.//span[contains(@class,'e-edit')]]").first();

        // Stored values from create flow
        this.createdCategoryName = null;
        this.createdCategoryCode = null;
    }

    async navigateToDivisionCategory(){

        await this.navigateToDivisionCat.click();
    }
    async clickAddDivisionCategory() {
        await this.addButton.waitFor({ state: 'visible', timeout: 15000 });
        await this.addButton.click();
    }

    async fillDivisionCategoryDetails(data) {
        const timestamp = DataUtil.getDateSecondMilliTimestamp();
        const categoryCode = `${data['Category Code']}${timestamp}`;
        const categoryName = `${data['Category Name']}_${timestamp}`;
        this.createdCategoryCode = categoryCode;
        this.createdCategoryName = categoryName;
        await this.categoryCode.fill(categoryCode);
        await this.categoryName.fill(categoryName);
        console.log(`Created Division Category — Code: ${categoryCode}, Name: ${categoryName}`);
    }

    // ─────────────────────────────────────────────────────────────────
    // API – CAPTURE CREATE RESPONSE
    // ─────────────────────────────────────────────────────────────────

    startCapturingCreateAPI() {
        this._createApiPromise = this.page.waitForResponse(
            (r) =>
                r.url().toLowerCase().includes('create-age-category') &&
                r.request().method() === 'POST' &&
                r.status() >= 200 && r.status() < 300,
            { timeout: 30000 }
        );
        console.log('✓ Listening for Division Category create API response (create-age-category)');
    }

    async awaitAndPrintCreateAPIResponse() {
        const response = await this._createApiPromise;
        console.log(`✓ Captured Division Category create API URL: ${response.url()}`);
        const body = await response.json();
        this._createApiPromise = null;
        console.log('──────── DIVISION CATEGORY CREATE API RESPONSE (JSON) ────────');
        console.log(JSON.stringify(body, null, 2));
        console.log('────────────────────────────────────────────────────────────────');
        return body;
    }

    async clickSaveButton() {
        await this.createButton.waitFor({ state: 'visible' });
        await this.createButton.click();
    }

    async validatePopupByText(expectedText, timeout = 15000) {
        const popup = this.page.getByText(expectedText).first();
        await expect(popup).toBeVisible({ timeout });
    }


async selectformat(option){
        try{
            // Click the dropdown icon to open the Syncfusion multiselect popup
            const dropdownIcon = this.page.locator('ejs-multiselect span.e-ddl-icon').first();
            await dropdownIcon.waitFor({ state: 'visible', timeout: 5000 });
            await dropdownIcon.click();

            // Wait for the popup list to appear
            const popup = this.page.locator('.e-popup.e-multi-select-list-wrapper');
            await popup.waitFor({ state: 'visible', timeout: 5000 });

            const items = option.split(',').map(o => o.trim());
            for (const item of items) {
                await popup.getByRole('option', { name: item, exact: true }).click();
            }

            // Close the popup
            await this.page.keyboard.press('Escape');
            console.log('Selected format as', option);
        } catch(error){
            console.log('Unable to select format', error.message);
        }
    };

   async selectDivisionCategoryType(option) {
        await this.divisionCategoryType.waitFor({ state: 'visible', timeout: 10000 });
        await this.divisionCategoryType.click();
        const popup = this.page.locator('.e-popup.e-ddl');
        await popup.waitFor({ state: 'visible', timeout: 5000 });
        await popup.getByRole('option', { name: option, exact: true }).click();
        console.log('Selected division category type as', option);
    }




    async enterDescription(descriptionText) {
        try {
            await this.description.waitFor({ state: 'visible', timeout: 5000 });
            await this.description.fill(descriptionText);
            console.log('Entered description:', descriptionText);
        } catch (error) {
            console.log('Unable to enter description:', error.message);
        }
    }

    async searchRecentlyCreatedRecord() {
        const nameToSearch = this.createdCategoryName;
        if (!nameToSearch) {
            throw new Error('No created category name stored — run the create scenario first.');
        }

        // Open the quick search input
        await this.searchIcon.waitFor({ state: 'visible', timeout: 10000 });
        await this.searchIcon.click();

        // Use the exact search input from the DOM
        await this.searchInput.waitFor({ state: 'visible', timeout: 8000 });
        await this.searchInput.clear();
        await this.searchInput.fill(nameToSearch);
        await this.searchInput.press('Enter');
        await this.page.waitForTimeout(1500);
        console.log(`✓ Searched for recently created category: "${nameToSearch}"`);

        // Close the search popup using the × button
        const closeVisible = await this.closeSearchBtn.isVisible().catch(() => false);
        if (closeVisible) {
            await this.closeSearchBtn.click();
            await this.page.waitForTimeout(500);
            console.log('✓ Closed the quick search popup');
        } else {
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(500);
        }
    }

    async clickRecentlyCreatedRecord() {
        await this.firstGridRow.waitFor({ state: 'visible', timeout: 10000 });
        await this.firstGridRow.click({ force: true });
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1000);
        console.log('✓ Clicked the recently created division category record');
    }

    async clickEditOnDivisionCategory() {
        await this.ribbonEditBtn.waitFor({ state: 'visible', timeout: 10000 });
        await this.ribbonEditBtn.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked Edit on Division Category detail page');
    }

    async updateDivisionCategoryDetails(data) {
        if (data['Category Name']) {
            const timestamp = DataUtil.getDateSecondMilliTimestamp();
            const updatedName = `${data['Category Name']}_${timestamp}`;
            await this.categoryName.waitFor({ state: 'visible', timeout: 5000 });
            await this.categoryName.clear();
            await this.categoryName.fill(updatedName);
            console.log(`Updated Category Name to: ${updatedName}`);
        }
        if (data['Description']) {
            await this.description.waitFor({ state: 'visible', timeout: 5000 });
            await this.description.clear();
            await this.description.fill(data['Description']);
            console.log(`Updated Description to: ${data['Description']}`);
        }
        if (data['Format']) {
            await this.selectformat(data['Format']);
        }
        if (data['Division Category Type']) {
            await this.selectDivisionCategoryType(data['Division Category Type']);
        }
    }

    async clickUpdateButton() {
        await this.updateButton.waitFor({ state: 'visible', timeout: 8000 });
        await this.updateButton.click();
        console.log('✓ Clicked Update button on Division Category');
    }
}
module.exports = DivisionCategoryPage;

