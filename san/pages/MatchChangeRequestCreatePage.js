/** @typedef {import('@playwright/test').Page} Page */

class MatchChangeRequestCreatePage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // Add button in Change Request Configurations grid toolbar
        this.addConfigBtn = page.locator(
            'button:has(span.e-add.e-icons):has(span.e-tbar-btn-text), button[aria-label="Add"]:has(span.e-add)'
        ).first();

        // Create button inside add-configuration popup (aria-label="Create progress")
        this.addConfigCreateBtn = page.locator('[aria-label="Create progress"]').first();

        // Deadline Before Kickoff input
        this.deadlineInput = page.locator(
            'input#deadlineBeforeKickoff, input[name="name_deadlineBeforeKickoff"], ' +
            'input[placeholder="Enter number of seconds before kick-off"]'
        ).first();
    }

    // ─────────────────────────────────────────────────────────────────
    // SEASON DROPDOWN
    // ─────────────────────────────────────────────────────────────────

    async fillSeasonDropdown(season) {
        await this._selectEJ2Dropdown('season', season);
        console.log(`✓ Selected Season: ${season}`);
    }

    // ─────────────────────────────────────────────────────────────────
    // FEDERATION & REGION
    // ─────────────────────────────────────────────────────────────────

    async fillFederationAndRegion(federation, region) {
        await this._selectEJ2Dropdown('federation', federation);
        console.log(`✓ Selected Federation: ${federation}`);

        await this.page.waitForTimeout(500);

        const regionWrapper = this.page.locator(
            '//ejs-dropdownlist[@id="federation"]/following::div[contains(@class,"e-multi-select-wrapper")][1] | ' +
            '//*[contains(normalize-space(),"Region")]/following::div[contains(@class,"e-multi-select-wrapper")][1]'
        ).first();
        await this._selectMultiselectWrapper(regionWrapper, region);
        console.log(`✓ Selected Region: ${region}`);
    }

    // ─────────────────────────────────────────────────────────────────
    // CHANGE REQUEST CONFIGURATIONS – ADD BUTTON
    // ─────────────────────────────────────────────────────────────────

    async navigateToChangeRequestConfigAndClickAdd() {
        await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});

        const section = this.page.locator(
            '//*[contains(normalize-space(),"Change Request Configuration")]'
        ).first();
        if (await section.count() > 0) {
            await section.scrollIntoViewIfNeeded();
        }

        await this.addConfigBtn.waitFor({ state: 'visible', timeout: 15000 });
        await this.addConfigBtn.scrollIntoViewIfNeeded();
        await this.addConfigBtn.click();
        await this.page.waitForTimeout(1000);
        console.log('✓ Clicked Add in Change Request Configurations');
    }

    // ─────────────────────────────────────────────────────────────────
    // WAIT FOR ADD CONFIGURATION POPUP
    // ─────────────────────────────────────────────────────────────────

    async waitForAddConfigurationPopup() {
        const typeDropdown = this.page.locator(
            'ejs-dropdownlist[id="changeRequestType"], span.e-input-group:has(select[id="changeRequestType_hidden"])'
        ).first();
        await typeDropdown.waitFor({ state: 'visible', timeout: 15000 });
        console.log('✓ Add configuration popup is ready');
    }

    // ─────────────────────────────────────────────────────────────────
    // CHANGE REQUEST TYPE DROPDOWN
    // ─────────────────────────────────────────────────────────────────

    async fillChangeRequestType(type) {
        await this._selectEJ2Dropdown('changeRequestType', type);
        console.log(`✓ Selected Change Request Type: ${type}`);
    }

    // ─────────────────────────────────────────────────────────────────
    // REQUESTED BY & APPROVED BY MULTISELECTS
    // ─────────────────────────────────────────────────────────────────

    async fillRequestedByAndApprovedBy(requestedBy, approvedBy) {
        const requestedByWrapper = this.page.locator(
            '//*[normalize-space()="Requested By"]/ancestor::*[contains(@class,"e-multi-select-wrapper")][1] | ' +
            '//*[normalize-space()="Requested By"]/parent::*[contains(@class,"e-multi-select-wrapper")] | ' +
            '//*[normalize-space()="Requested By"]/parent::*//div[contains(@class,"e-multi-select-wrapper")] | ' +
            '//*[normalize-space()="Requested By"]/preceding::div[contains(@class,"e-multi-select-wrapper")][1] | ' +
            '//*[normalize-space()="Requested By"]/following::div[contains(@class,"e-multi-select-wrapper")][1]'
        ).first();
        await this._selectMultiselectWrapper(requestedByWrapper, requestedBy);
        console.log(`✓ Selected Requested By: ${requestedBy}`);

        await this.page.waitForTimeout(500);

        const approvedByWrapper = this.page.locator(
            '//*[normalize-space()="Approved By"]/ancestor::*[contains(@class,"e-multi-select-wrapper")][1] | ' +
            '//*[normalize-space()="Approved By"]/parent::*[contains(@class,"e-multi-select-wrapper")] | ' +
            '//*[normalize-space()="Approved By"]/parent::*//div[contains(@class,"e-multi-select-wrapper")] | ' +
            '//*[normalize-space()="Approved By"]/preceding::div[contains(@class,"e-multi-select-wrapper")][1] | ' +
            '//*[normalize-space()="Approved By"]/following::div[contains(@class,"e-multi-select-wrapper")][1]'
        ).first();
        await this._selectMultiselectWrapper(approvedByWrapper, approvedBy);
        console.log(`✓ Selected Approved By: ${approvedBy}`);
    }

    // ─────────────────────────────────────────────────────────────────
    // REQUEST SUBMISSION PERIOD – SCROLL INTO VIEW
    // ─────────────────────────────────────────────────────────────────

    async moveToRequestSubmissionPeriodSection() {
        const section = this.page.locator(
            '//*[contains(normalize-space(),"Request Submission Period") or contains(normalize-space(),"Submission Period")]'
        ).first();
        if (await section.count() > 0) {
            await section.scrollIntoViewIfNeeded();
        }
        await this.page.waitForTimeout(300);
        console.log('✓ Scrolled to Request Submission Period section');
    }

    // ─────────────────────────────────────────────────────────────────
    // START DATE & END DATE
    // ─────────────────────────────────────────────────────────────────

    async fillStartDateAndEndDate(startDate, endDate) {
        await this._fillDatePickerByLabel('Start Date', startDate);
        console.log(`✓ Filled Start Date: ${startDate}`);
        await this._fillDatePickerByLabel('End Date', endDate);
        console.log(`✓ Filled End Date: ${endDate}`);
    }

    // ─────────────────────────────────────────────────────────────────
    // START TIME & END TIME
    // ─────────────────────────────────────────────────────────────────

    async fillStartTimeAndEndTime(startTime, endTime) {
        await this._fillTimePickerByLabel('Start Time', startTime);
        console.log(`✓ Filled Start Time: ${startTime}`);
        await this._fillTimePickerByLabel('End Time', endTime);
        console.log(`✓ Filled End Time: ${endTime}`);
    }

    // ─────────────────────────────────────────────────────────────────
    // DEADLINE BEFORE KICKOFF
    // ─────────────────────────────────────────────────────────────────

    async fillDeadlineBeforeKickoff(duration) {
        await this.deadlineInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.deadlineInput.scrollIntoViewIfNeeded();
        await this.deadlineInput.click({ clickCount: 3 });
        await this.deadlineInput.fill(String(duration));
        console.log(`✓ Filled Deadline Before Kickoff: ${duration}`);
        await this.page.waitForTimeout(300);
    }

    // ─────────────────────────────────────────────────────────────────
    // ENABLE DAY RESTRICTIONS CHECKBOX
    // ─────────────────────────────────────────────────────────────────

    async clickEnableDayRestrictionsCheckbox() {
        const label = this.page.locator(
            '//span[contains(@class,"e-label") and contains(normalize-space(),"Enable day restrictions for rescheduling")]/parent::* | ' +
            '//label[contains(normalize-space(),"Enable day restrictions for rescheduling")]'
        ).first();
        await label.waitFor({ state: 'visible', timeout: 10000 });
        await label.scrollIntoViewIfNeeded();
        await label.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked Enable day restrictions for rescheduling checkbox');
    }

    // ─────────────────────────────────────────────────────────────────
    // RESCHEDULED FROM & TO MULTISELECTS
    // ─────────────────────────────────────────────────────────────────

    async fillRescheduledFromAndTo(fromDay, toDay) {
        // Use e-multi-select-wrapper (FROM has no outer e-multiselect div)
        const fromWrapper = this.page.locator(
            '//*[contains(normalize-space(),"Rescheduled FROM") or contains(normalize-space(),"Rescheduled from")]/following::div[contains(@class,"e-multi-select-wrapper")][1]'
        ).first();
        await this._selectMultiselectWrapper(fromWrapper, fromDay);
        console.log(`✓ Selected Rescheduled FROM: ${fromDay}`);

        await this.page.waitForTimeout(500);

        const toWrapper = this.page.locator(
            '//*[contains(normalize-space(),"Rescheduled TO") or contains(normalize-space(),"Rescheduled to")]/following::div[contains(@class,"e-multi-select-wrapper")][1]'
        ).first();
        await this._selectMultiselectWrapper(toWrapper, toDay);
        console.log(`✓ Selected Rescheduled TO: ${toDay}`);
    }

    // ─────────────────────────────────────────────────────────────────
    // ADD CONFIGURATION CREATE BUTTON
    // ─────────────────────────────────────────────────────────────────

    async clickAddConfigurationCreateButton() {
        await this.addConfigCreateBtn.waitFor({ state: 'visible', timeout: 10000 });
        await this.addConfigCreateBtn.scrollIntoViewIfNeeded();
        await this.addConfigCreateBtn.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked add configuration Create button');
    }

    // ─────────────────────────────────────────────────────────────────
    // PRIVATE HELPERS
    // ─────────────────────────────────────────────────────────────────

    async _selectEJ2Dropdown(componentId, value) {
        const component = this.page.locator(
            `ejs-dropdownlist#${componentId}, span.e-input-group:has(select[id="${componentId}_hidden"])`
        ).first();
        await component.waitFor({ state: 'visible', timeout: 10000 });
        await component.click();
        const item = this.page.locator('li.e-list-item').filter({ hasText: new RegExp(`^${value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`) }).first();
        await item.waitFor({ state: 'visible', timeout: 10000 });
        await item.click();
        await this.page.waitForTimeout(300);
    }

    async _selectMultiselectWrapper(wrapperLocator, value) {
        await wrapperLocator.waitFor({ state: 'visible', timeout: 10000 });
        await wrapperLocator.scrollIntoViewIfNeeded();
        // Click the dropdownbase input with force to bypass readonly/size restrictions
        const input = wrapperLocator.locator('input.e-dropdownbase').first();
        if (await input.count() > 0) {
            await input.click({ force: true });
        } else {
            await wrapperLocator.locator('span.e-ddl-icon').first().click();
        }
        await this.page.waitForTimeout(500);
        const item = this.page.locator(`li.e-list-item:has-text("${value}")`).first();
        await item.waitFor({ state: 'visible', timeout: 15000 });
        await item.click();
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(300);
    }

    async _fillDatePickerByLabel(labelText, dateValue) {
        // Scope to the label's own parent container to avoid picking the wrong datepicker
        const input = this.page.locator(
            `//*[normalize-space()="${labelText}"]/parent::*//input[@placeholder="DD/MM/YYYY"] | ` +
            `//*[normalize-space()="${labelText}"]/following-sibling::*//input[@placeholder="DD/MM/YYYY"]`
        ).first();
        await input.waitFor({ state: 'visible', timeout: 10000 });
        await input.scrollIntoViewIfNeeded();
        await input.click({ clickCount: 3 });
        await input.fill(dateValue);
        await input.press('Tab');
        await this.page.waitForTimeout(300);
    }

    async _fillTimePickerByLabel(labelText, timeValue) {
        // Scope to the label's own parent container to avoid picking the wrong timepicker
        const input = this.page.locator(
            `//*[normalize-space()="${labelText}"]/parent::*//input[@placeholder="HH:mm"] | ` +
            `//*[normalize-space()="${labelText}"]/following-sibling::*//input[@placeholder="HH:mm"]`
        ).first();
        await input.waitFor({ state: 'visible', timeout: 10000 });
        await input.scrollIntoViewIfNeeded();
        await input.click({ clickCount: 3 });
        await input.fill(timeValue);
        await input.press('Tab');
        await this.page.waitForTimeout(300);
    }
}

module.exports = MatchChangeRequestCreatePage;
