const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(1 * 60000);

Then('click on the search box and search for {string} and click on the searched competition', { timeout: 90000 }, async function (competitionName) {
    await this.pages.competitionProfileNotesPage.openClubDetailsByName(competitionName);
});


