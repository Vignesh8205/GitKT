const DataUtil = require('../utils/dataUtil');

class MatchGridPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.matchGridTab = page.locator("//div[@role='tab' and normalize-space()='Match Grid']");
        this.createMatchGridBtn = page.locator("//span[normalize-space()='Create Match Grid']");
        this.templateNameInput = page.locator("//input[@id='templateName']");
        this.totalTeamsInput = page.locator("//input[@id='totalTeams']");
        this.matchDayCountInput = page.locator("//input[@id='matchDayCount']");
        this.generateGridBtn = page.locator("//button[@type='button' and .//span[normalize-space()='Generate Grid']]");
        this.teamHInput = page.locator("//input[@placeholder='H']");
        this.teamAInput = page.locator("//input[@placeholder='A']");
    }

    async navigateToMatchGrid() {
        await this.matchGridTab.waitFor({ state: 'visible', timeout: 5000 });
        await this.matchGridTab.click();
    }

    async clickCreateMatchGrid() {
        await this.createMatchGridBtn.waitFor({ state: 'visible', timeout: 5000 });
        await this.createMatchGridBtn.click();
    }

    async enterTemplateName(templateName) {
        const nameWithTimestamp =
            `${templateName}_${DataUtil.getDateSecondMilliTimestamp()}`;

        await this.templateNameInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.templateNameInput.fill(nameWithTimestamp);
        console.log('Entered template name:', nameWithTimestamp);
    }

    async enterTotalTeams(totalTeams) {
        await this.totalTeamsInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.totalTeamsInput.fill(totalTeams);
        console.log('Entered total teams:', totalTeams);
    }

    async enterMatchDayCount(matchDayCount) {
    await this.matchDayCountInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.matchDayCountInput.fill(matchDayCount);
    console.log('Entered total teams:', matchDayCount);
}


    async clickGenerateGrid() {
        await this.generateGridBtn.waitFor({ state: 'visible', timeout: 5000 });
        await this.generateGridBtn.click();
    }

    async enterTeamH(teamH) {
        await this.teamHInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.teamHInput.fill(teamH);
        console.log('Entered Team H:', teamH);
    }

    async enterTeamA(teamA) {
        await this.teamAInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.teamAInput.fill(teamA);
        console.log('Entered Team A:', teamA);
    }
}

module.exports = MatchGridPage;
