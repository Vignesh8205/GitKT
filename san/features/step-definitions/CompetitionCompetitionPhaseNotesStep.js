const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(1 * 60000);

Then('click on the {string} tab', { timeout: 90000 }, async function (tabName) {
    await this.pages.competitionCompetitionPhaseNotesPage.clickTabByName(tabName);
});

Then('click on the {string} of the competition phase name', { timeout: 90000 }, async function (phaseName) {
    await this.pages.competitionCompetitionPhaseNotesPage.clickCompetitionPhaseByName(phaseName);
});
