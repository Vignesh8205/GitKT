const ClubSectionNotesPage = require('./ClubSectionNotesPage');

class ClubSectionTeamNotesPage extends ClubSectionNotesPage {
    constructor(page) {
        super(page);
        this.teamTab = page.locator("//div[text()='Teams']");
    }

    teamSuffixLink(suffix) {
        return this.page.locator(
            `//td[normalize-space(.)='${suffix}'] | //td//div[normalize-space(.)='${suffix}'] | //td//span[normalize-space(.)='${suffix}']`
        ).first();
    }

    async clickTeamTab() {
        await this.teamTab.waitFor({ state: 'visible', timeout: 10000 });
        await this.teamTab.click();
    }

    async clickTeamSuffix(suffix) {
        const teamSuffix = this.teamSuffixLink(suffix);
        await teamSuffix.waitFor({ state: 'visible', timeout: 10000 });
        await teamSuffix.click();
    }

    async enterClubSectionTeamNoteContent(noteContent) {
        await this.enterClubSectionNoteContent(noteContent);
    }
}

module.exports = ClubSectionTeamNotesPage;