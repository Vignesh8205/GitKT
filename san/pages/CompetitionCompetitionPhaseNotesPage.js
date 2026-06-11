const { expect } = require('playwright/test');

class CompetitionCompetitionPhaseNotesPage {
    constructor(page) {
        this.page = page;
        this.tabLocator = (tabName) => page.locator(`xpath=//li[normalize-space()='${tabName}'] | //a[normalize-space()='${tabName}'] | //div[@role='tab'][normalize-space()='${tabName}'] | //span[normalize-space()='${tabName}' and ancestor::*[@role='tab']]`).first();
        this.phaseLocator = (phaseName) => page.locator(`xpath=//td[normalize-space()='${phaseName}'] | //span[normalize-space()='${phaseName}'] | //a[normalize-space()='${phaseName}']`).first();
    }

    async clickTabByName(tabName) {
        await this.tabLocator(tabName).waitFor({ state: 'visible', timeout: 15000 });
        await this.tabLocator(tabName).click();
    }

    async clickCompetitionPhaseByName(phaseName) {
        await this.phaseLocator(phaseName).waitFor({ state: 'visible', timeout: 15000 });
        await this.phaseLocator(phaseName).click();
    }
}

module.exports = CompetitionCompetitionPhaseNotesPage;
