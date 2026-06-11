const { expect } = require('playwright/test');

class CompetitionProfileNotesPage {
    constructor(page) {
        this.page = page;
         
        this.searchBox = page.locator("//span[contains(@style, 'search-icon.svg')]");
        this.quickSearchInput = page.locator("//input[contains(@placeholder, 'Search by competition')]");
        this.quickSearchCloseButton = page.locator("//button[normalize-space(.)='×']");
    }

    competitionRowByName(competitionName) {
        return this.page.locator(`//tr[@role='row']//span[normalize-space()='${competitionName}'] | //tr[@role='row']//td[normalize-space()='${competitionName}']`).first();
    }

    async openClubDetailsByName(clubName) {
        await this.searchBox.waitFor({ state: 'visible', timeout: 10000 });
        await this.searchBox.click();
        await this.quickSearchInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.quickSearchInput.fill(clubName);
        await this.quickSearchInput.press('Enter');
        await this.quickSearchCloseButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.quickSearchCloseButton.click();
        const clubLink = this.page.getByText(clubName, { exact: true }).first();
        await clubLink.waitFor({ state: 'visible', timeout: 10000 });
        await clubLink.click();
    }
    

    async validateCompetitionProfilePageLoaded() {
        await expect(this.notesIcon).toBeVisible({ timeout: 30000 });
    }
}

module.exports = CompetitionProfileNotesPage;
