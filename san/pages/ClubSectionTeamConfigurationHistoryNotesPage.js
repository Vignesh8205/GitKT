const ClubSectionTeamConfigurationNotesPage = require('./ClubSectionTeamConfigurationNotesPage');

class ClubSectionTeamConfigurationHistoryNotesPage extends ClubSectionTeamConfigurationNotesPage {
    constructor(page) {
        super(page);
        this.historyTab = page.locator("//div[text()=' History '] | //div[text()='History']");
    }

    teamNameLink(teamName) {
    return this.page.locator(
        `//td[contains(@class,'e-rowcell')]//span[normalize-space()='${teamName}']`
    ).first();
    }

    async clickHistoryTab() {
        await this.historyTab.waitFor({ state: 'visible', timeout: 10000 });
        await this.historyTab.click();
    }

    async clickTeamNameInHistory(teamName) {
        const teamLink = this.teamNameLink(teamName);
        await teamLink.waitFor({ state: 'visible', timeout: 10000 });
        await teamLink.click();
    }
}

module.exports = ClubSectionTeamConfigurationHistoryNotesPage;
