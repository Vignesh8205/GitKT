const ClubSectionTeamNotesPage = require('./ClubSectionTeamNotesPage');

class ClubSectionTeamConfigurationNotesPage extends ClubSectionTeamNotesPage {
    constructor(page) {
        super(page);
        this.teamConfigurationTab = page.locator("//div[text()=' Team Configuration ']");
    }

    async clickTeamConfigurationTab() {
        if (await this.teamConfigurationTab.isVisible()) {
            await this.teamConfigurationTab.click();
            return;
        }

        await this.clickTeamTab();
    }

    async clickTeamConfigurationSuffix(suffix) {
        await this.clickTeamSuffix(suffix);
    }
}

module.exports = ClubSectionTeamConfigurationNotesPage;