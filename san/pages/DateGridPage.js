const DataUtil = require('../utils/dataUtil');

class DateGridPage {
    constructor(page) {
        this.page = page;

        this.dateGridTab = page.locator("//div[@role='tab' and normalize-space()='Date Grid']");
        this.createDateGridBtn = page.getByRole('//button[@aria-label="Create Date Grid progress"]');
        this.templateNameInput = page.locator("//input[@id='templateName']");
        this.totalTeamsInput = page.locator("//input[@id='totalTeams']");
        this.matchDayCountInput = page.locator("//input[@id='matchDayCount']");
        this.generateGridBtn = page.locator("//button[@type='button' and .//span[normalize-space()='Generate Grid']]");
        //this.startDateInput = page.locator("//input[contains(@name,'ej2-datepicker') and @placeholder='DD/MM/YYYY'])[1]");
        // this.startDateInput = page.locator("//input[contains(@id,'ej2-datepicker_')])[1]");
        this.startDateInput = page.locator("(//input[contains(@placeholder, 'DD/MM/YYYY')])[1]");
        this.successMessage = page.locator("//span[contains(text(),'Date grid created successfully')]");
    }

    async navigateToDateGrid() {
        await this.dateGridTab.waitFor({ state: 'visible', timeout: 5000 });
        await this.dateGridTab.click();
    }

    async clickCreateDateGrid() {
        await this.createDateGridBtn.waitFor({ state: 'visible', timeout: 5000 });
        await this.createDateGridBtn.click();
    }

    async enterTemplateName(templateName) {
        const name =
            `${templateName}_${DataUtil.getDateSecondMilliTimestamp()}`;
        await this.templateNameInput.fill(name);
        console.log('Entered template name:', name);
    }

    async enterTotalTeams(totalTeams) {
        await this.totalTeamsInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.totalTeamsInput.fill(totalTeams);
    }

    async enterMatchDayCount(count) {
        await this.matchDayCountInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.matchDayCountInput.fill(count);

    }

    async clickGenerateGrid() {
        await this.generateGridBtn.waitFor({ state: 'visible', timeout: 5000 });
        await this.generateGridBtn.click();
        // Press TAB 8 times
        for (let i = 0; i < 8; i++) {
            await this.page.keyboard.press('Tab');
        }
    }



    async tabUntilStartDateFocused(maxTabs = 20) {
        for (let i = 0; i < maxTabs; i++) {
            const placeholder = await this.page.evaluate(() => document.activeElement.placeholder);
            if (placeholder && placeholder.includes('DD/MM/YYYY')) {
                console.log(`Focus reached Start Date after ${i} tabs`);
                return;
            }
            await this.page.keyboard.press('Tab');
            await this.page.waitForTimeout(100);
        }
        throw new Error('Start Date field not focused after tabbing');
    }





    async setStartDate(startDate) {
        let startDateFixed = startDate == "current" ? DataUtil.getCurrentDate() : startDate
        await this.startDateInput.waitFor({ state: "visible" })
        await this.startDateInput.fill(startDateFixed)
    }


    async verifySuccessMessage(expectedMessage) {
        await this.successMessage.waitFor({ state: 'visible' });
        const actualText = await this.successMessage.textContent();
        return actualText.includes(expectedMessage);
    }
}

module.exports = DateGridPage;


