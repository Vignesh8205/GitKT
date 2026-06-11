const { expect } = require("playwright/test");
const DataUtil = require("../utils/dataUtil");

class DivisionPage {
    constructor(page) {
        this.page = page;

        this.divisionCode = page.locator('[placeholder="Enter Division Code"]');
        this.divisionName = page.locator('[placeholder="Enter Division Name"]');
        this.createButton = page.locator('//span[text()="Create Club"]');
        this.EditModeIcon = page.locator('//button[@title="Edit"]');
        // create division dropdown
        this.divisionCategory = page.locator('[aria-labelledby="category_hidden"]')
        this.format = page.locator(`//label[.//div[normalize-space()='Format']]/following-sibling::div//ejs-multiselect`).first()
        this.region = page.locator('label:has-text("Region") ~ div ejs-dropdownlist, label:has-text("Region") ~ ejs-dropdownlist').first()
        this.federation = page.locator('label:has-text("Federation") ~ div ejs-dropdownlist, label:has-text("Federation") ~ ejs-dropdownlist').first()
        this.oraganization = page.locator("//label[.//div[normalize-space()='Organization']] /following-sibling::div //ejs-multiselect //span[contains(@class,'e-input-group-icon')]")
        this.description = page.locator('[id="description"]');
        // Add Eligibility Criteria
        this.addEligibilitybutton = page.locator('//button[@aria-label="Add Eligibility Criteria progress"]');
        this.gender = page.locator('[aria-labelledby="gender_hidden"]');
        this.minReferenceMonth = page.locator('[aria-labelledby="minReferenceMonth_hidden"]');
        this.minReferenceDate = page.locator('[aria-labelledby="minReferenceDate_hidden"]');
        this.minAge = page.locator('#minAge>span>[placeholder="Enter Age"]');
        this.maxReferenceMonth = page.locator('[aria-labelledby="maxReferenceMonth_hidden"]');
        this.maxReferenceDate = page.locator('[aria-labelledby="maxReferenceDate_hidden"]');
        this.maxAge = page.locator('#maxAge>span>[placeholder="Enter Age"]');
        this.confirmButton = page.locator('[aria-label=" Confirm  progress"]');
        //Edit Eligibility criteria

        this.createButton = page.locator("//span[text()='Create']");
        this.saveButton = page.locator("//span[text()='Update']");
        this.updateButton = page.locator("//span[text()='Update']");
        this.firstRecordRow = page.locator("//div[contains(@class,'e-gridcontent')]//table//tbody//tr[1]");
        this.eligibilityCriteriaEditIcon = page.locator("//span[text()='Edit']");
        this.divisionInfoEditBtn = page.locator("//button[.//span[contains(@class,'e-edit')]]").first();
        this.eligibilityCriteriaSectionEditBtn = page.locator("//button[.//span[contains(@class,'e-edit')]]").last();
        this.searchIcon = page.locator("//span[contains(@style,'url(assets/icons/grassroots/search-icon.svg)')]");
        this.quickSearchInput = this.page.locator('input[placeholder="Search by division"]');
        this.closeSearchBox = page.locator("//button[contains(@class,'text-xl')]");
        this.createdDivisionName = null;
        this.createdDivisionCode = null;
    }

    async fillDivisionCode(code) {
        await this.divisionCode.fill(code);
    }

    async fillDivisionName(name) {
        await this.divisionName.fill(name);
    }

    async selectDivCatDropdown(labelText, option) {
        const optionLocator = this.page.getByRole('option', { name: option, exact: true }).first();
        if (labelText == "Division Category") {
            await this.divisionCategory.click();
            await this.page.locator(`text=${option}`).waitFor({ state: 'visible' });
            await this.page.locator(`text=${option}`).click();
        } else if (labelText == "Format") {
            await this.format.waitFor({ state: 'visible' });
            await this.format.evaluate(el => el.ej2_instances?.[0]?.showPopup());
            await optionLocator.waitFor({ state: 'visible', timeout: 15000 });
            await optionLocator.click();
        } else if (labelText == "Region") {
            await this.region.waitFor({ state: 'visible' });
            await this.region.evaluate(el => el.ej2_instances?.[0]?.showPopup());
            await optionLocator.waitFor({ state: 'visible', timeout: 15000 });
            await optionLocator.click();
        } else if (labelText == "Federation") {
            await this.federation.waitFor({ state: 'visible' });
            await this.federation.evaluate(el => el.ej2_instances?.[0]?.showPopup());
            await optionLocator.waitFor({ state: 'visible', timeout: 15000 });
            await optionLocator.click();
        } else if (labelText == "Organization") {
            await this.oraganization.click();
            await this.page.waitForTimeout(500);

            // Wait for the EJ2 multiselect popup to open
            const msPopup = this.page.locator('div.e-popup-open').last();
            await msPopup.waitFor({ state: 'visible', timeout: 10000 });

            // Try to match the option in the list items (case-insensitive, partial)
            const listItems = msPopup.locator('li.e-list-item');
            const count = await listItems.count();
            let clicked = false;
            for (let i = 0; i < count; i++) {
                const text = ((await listItems.nth(i).textContent()) ?? '').trim().toLowerCase();
                if (text === option.toLowerCase() || text.includes(option.toLowerCase())) {
                    await listItems.nth(i).click();
                    clicked = true;
                    break;
                }
            }

            if (!clicked) {
                // Fallback: filter by hasText
                const fallback = msPopup.locator('li.e-list-item').filter({ hasText: option }).first();
                await fallback.waitFor({ state: 'visible', timeout: 5000 });
                await fallback.click();
            }

            await this.page.keyboard.press('Tab');
        }
    }

    async fillDivisionDescription(text) {
        await this.description.fill(text);
    }


    async fillDivisionInformation(data) {
        const timestamp = DataUtil.getDateSecondMilliTimestamp();
        let divisionCode = data['Division Code'] + timestamp;
        let divisionName = data['Division Name'] + timestamp;
        this.createdDivisionCode = divisionCode;
        this.createdDivisionName = divisionName;
        await this.fillDivisionCode(divisionCode);
        await this.fillDivisionName(divisionName);
        await this.selectDivCatDropdown('Division Category', data['Division Category']);
        await this.selectDivCatDropdown('Format', data['Format']);
        await this.selectDivCatDropdown('Region', data['Region']);
        await this.selectDivCatDropdown('Federation', data['Federation']);
        await this.selectDivCatDropdown('Organization', data['Organization']);
        await this.fillDivisionDescription(data['Description']);
    }

    async searchByQuickSearch(divisionName) {
    await this.searchIcon.waitFor({ state: 'visible' });
    await this.searchIcon.click();

    const divisionSearchInput = this.page.locator('input[placeholder="Search by division"]');
    await divisionSearchInput.waitFor({ state: 'visible' });
    await divisionSearchInput.clear();
    await divisionSearchInput.fill(divisionName || this.createdDivisionName);
    await divisionSearchInput.press('Enter');

    await this.page.waitForTimeout(1500);

    // ✅ Press Escape to close/dismiss the toolbar overlay before clicking row
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);

    // ✅ Use force click to bypass intercepting overlay
    const firstRow = this.page.locator('//div[contains(@class,\'e-gridcontent\')]//table//tbody//tr[1]');
    await firstRow.waitFor({ state: 'visible' });
    await firstRow.click({ force: true });
}

    async clickCreate() {
        await this.EditModeIcon.click();
        await this.createButton.click();
       
    }

    // ADD Eligibility Certeria
    // clicking add eligibility criteria button 

    async clickAddEligibility() {
        //await this.page.waitForSelector(this.selectors.addEligibilitybutton, { timeout: 10000 });
        await this.addEligibilitybutton.click();
    }

    //Select min age with gender

    //Fill age on textbox 

    async fillMiniAge(minage) {
        await this.minAge.fill(minage);
    }

    async fillMaximumAge(maxAge) {
        await this.maxAge.fill(maxAge)
    }

    async minimumAge(data) {
        await this.selectMinEligibilityCriteria('Gender', data['Gender']);
        await this.selectMinEligibilityCriteria('Reference Month', data['Reference Month']);
        await this.selectMinEligibilityCriteria('Reference Date', data['Reference Date']);
        await this.fillMiniAge(data['Minimum Age']);
        // Wait for the max section's dropdown icon to be rendered and stable
        // (Angular may re-render the max fields after min-age input changes)
        await this.maxReferenceMonth.locator('.e-ddl-icon').waitFor({ state: 'visible', timeout: 10000 });
        await this.selectMaxEligibilityCriteria('Maximum Age Reference Month', data['Maximum Age Reference Month']);
        await this.selectMaxEligibilityCriteria('Maximum Age Reference Date', data['Maximum Age Reference Date']);
        await this.fillMaximumAge(data['Maximum Age'])
    }


    async clickConfirmButton() {
        await this.confirmButton.waitFor({ state: 'visible' });
        await this.confirmButton.click();
    }



    //Edit Eligibility Criteria 

    async _openDropdownAndSelect(dropdownLocator, option) {
        await dropdownLocator.waitFor({ state: 'visible' });

        const optionLocator = this.page.locator(
            `//li[contains(@class,'e-list-item') and normalize-space()='${option}']`
        ).first();

        // Attempt 1: click the dropdown arrow icon
        const icon = dropdownLocator.locator('.e-ddl-icon, .e-search-icon').first();
        const iconVisible = await icon.isVisible({ timeout: 2000 }).catch(() => false);
        if (iconVisible) {
            await icon.click();
        } else {
            await dropdownLocator.click();
        }
        let opened = await optionLocator.waitFor({ state: 'visible', timeout: 3000 })
            .then(() => true).catch(() => false);

        // Attempt 2: call showPopup() on the EJ2 instance via evaluate
        if (!opened) {
            await dropdownLocator.evaluate(el => {
                let node = el;
                while (node && node.tagName?.toLowerCase() !== 'ejs-dropdownlist') {
                    node = node.parentElement;
                }
                if (node?.ej2_instances?.[0]?.showPopup) {
                    node.ej2_instances[0].showPopup();
                }
            });
            opened = await optionLocator.waitFor({ state: 'visible', timeout: 3000 })
                .then(() => true).catch(() => false);
        }

        // Attempt 3: focus the wrapper span and press Alt+ArrowDown
        if (!opened) {
            await dropdownLocator.focus();
            await this.page.keyboard.press('Alt+ArrowDown');
            await optionLocator.waitFor({ state: 'visible', timeout: 10000 });
        }

        await optionLocator.click();
        // Wait for the option list to disappear before proceeding to the next field
        await optionLocator.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    }

    async selectMinEligibilityCriteria(labelText, option) {
        switch (labelText) {
            case "Gender":
                await this._openDropdownAndSelect(this.gender, option);
                break;

            case "Reference Month":
                await this._openDropdownAndSelect(this.minReferenceMonth, option);
                break;

            case "Reference Date":
                await this._openDropdownAndSelect(this.minReferenceDate, option);
                break;
            default:
                throw new Error(`Invalid labelText: ${labelText}`);
        }
    }


    async selectMaxEligibilityCriteria(labelText, option) {
        switch (labelText) {

            case "Maximum Age Reference Month":
                await this._openDropdownAndSelect(this.maxReferenceMonth, option);
                break;

            case "Maximum Age Reference Date":
                await this._openDropdownAndSelect(this.maxReferenceDate, option);
                break;

            default:
                throw new Error(`Invalid labelText: ${labelText}`);
        }
    }


    async clickCreateButton() {
        await this.createButton.waitFor({ state: 'visible' });
        await this.createButton.click();
    }

    async clickEditOnDivisionInformation() {
        await this.divisionInfoEditBtn.waitFor({ state: 'visible', timeout: 30000 });
        await this.divisionInfoEditBtn.click();
    }

    async clickEditOnEligibilityCriteria() {
        await this.eligibilityCriteriaSectionEditBtn.waitFor({ state: 'visible' });
        await this.eligibilityCriteriaSectionEditBtn.click();
    }

    async clickRecentlyCreatedRecord() {
        await this.firstRecordRow.waitFor({ state: 'visible' });
        await this.firstRecordRow.click();
    }

    // async updateDivisionInformation(data) {
    //     if (data['Format']) await this.selectDivCatDropdown('Format', data['Format']);
    //     if (data['Region']) await this.selectDivCatDropdown('Region', data['Region']);
    async updateDivisionInformation(data) {
        if (data['Format'])      await this.selectDivCatDropdown('Format', data['Format']);
        if (data['Region'])      await this.selectDivCatDropdown('Region', data['Region']);
        if (data['Federation'])  await this.selectDivCatDropdown('Federation', data['Federation']);
        if (data['Organization']) await this.selectDivCatDropdown('Organization', data['Organization']);
        if (data['Description']) await this.fillDivisionDescription(data['Description']);
    }

    async clickSaveButton() {
        await this.saveButton.waitFor({ state: 'visible' });
        await this.saveButton.click();
    }

    async clickEligibilityCriteriaRecord() {
        await this.firstRecordRow.waitFor({ state: 'visible' });
        await this.firstRecordRow.click();
    }

    async clickEligibilityCriteriaEditIcon() {
        await this.firstRecordRow.waitFor({ state: 'visible' });
        await this.firstRecordRow.hover();
        await this.eligibilityCriteriaEditIcon.waitFor({ state: 'visible', timeout: 10000 });
        await this.eligibilityCriteriaEditIcon.click();
    }

    async clickUpdateButton() {
        await this.updateButton.waitFor({ state: 'visible' });
        await this.updateButton.click();
    }

    async validatePopupByText(expectedText, timeout = 20000) {
        const popup = this.page.locator("//div[@class='e-toast-content']").filter({ hasText: expectedText }).first();
        try {
            await expect(popup).toBeVisible({ timeout });
        } catch (error) {
            throw new Error(
                `Popup with text "${expectedText}" was not visible within ${timeout}ms.\nOriginal error: ${error.message}`
            );
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // API – CAPTURE CREATE RESPONSE
    // ─────────────────────────────────────────────────────────────────

    startCapturingCreateAPI() {
        this._createApiPromise = this.page.waitForResponse(
            (r) =>
                r.url().toLowerCase().includes('create-division') &&
                r.request().method() === 'POST' &&
                r.status() >= 200 && r.status() < 300,
            { timeout: 30000 }
        );
        console.log('✓ Listening for Division create API response (create-division)');
    }

    async awaitAndPrintCreateAPIResponse() {
        const response = await this._createApiPromise;
        console.log(`✓ Captured Division create API URL: ${response.url()}`);
        const body = await response.json();
        this._createApiPromise = null;
        console.log('──────── DIVISION CREATE API RESPONSE (JSON) ────────');
        console.log(JSON.stringify(body, null, 2));
        console.log('─────────────────────────────────────────────────────');
        return body;
    }

    //Division created successfully!
}


module.exports = DivisionPage;

