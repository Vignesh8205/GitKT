const { Before, Then, When, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(1 * 60000);

Before({ tags: '@clubSectionTeamConfigurationHistoryNotes' }, async function () {
    // Reuse existing generic note/template steps from other step-definition files.
    this.pages.personProfileNotesPage = this.pages.clubSectionTeamConfigurationHistoryNotesPage;
    this.pages.clubSectionNotesPage = this.pages.clubSectionTeamConfigurationHistoryNotesPage;
});

Then('click on the "History" tab', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.clickHistoryTab();
});

Then('click on team name as {string}', { timeout: 90000 }, async function (teamName) {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.clickTeamNameInHistory(teamName);
});

Then('click on the notes icon', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.clickNotesIcon();
});

Then('User navigates to the notes tab', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.navigateToNotesTab();
});

When('User clicks the Add Note button on notes', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.clickAddNoteButton();
});

When('User enters the note content', { timeout: 90000 }, async function (noteContent) {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.enterClubSectionTeamNoteContent(noteContent);
});

When('User enables the public switch', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.enablePublicNoteSwitch();
});

When('User enables the public switch for note', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.enablePublicNoteSwitch();
});

When('User enables the private switch for note', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.enablePrivateNoteSwitch();
});

Then('User clicks the create button', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.clickCreateButton();
});

Then('User clicks the Create button on notes', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.clickCreateButton();
});

Then('User should see popup message as {string}', { timeout: 90000 }, async function (expectedMessage) {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.validatePopupByText(expectedMessage);
});

Then('User should see notes popup message as {string}', { timeout: 90000 }, async function (expectedMessage) {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.validatePopupByText(expectedMessage);
});

Then('User clicks the edit button of the note', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.clickFirstNoteEditButton();
});

When('User updates the note content with {string}', { timeout: 90000 }, async function (updatedText) {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.updateNoteContent(updatedText);
});

Then('User clicks the Update button on notes', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.clickUpdateButton();
});

Then('User navigates to the templates tab', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.navigateToTemplatesTab();
});

When('User clicks the Add Template button on notes', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.clickAddTemplateButton();
});

When('User clicks the Add Template button', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.clickAddTemplateButton();
});

When('User enters template name as {string} on notes', { timeout: 90000 }, async function (templateName) {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.enterTemplateName(templateName);
});

When('User enters template name as {string}', { timeout: 90000 }, async function (templateName) {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.enterTemplateName(templateName);
});

When('User searches for template by name {string} on notes', { timeout: 90000 }, async function (templateSearchText) {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.searchTemplateByName(templateSearchText);
});

When('User searches for template by name {string}', { timeout: 90000 }, async function (templateSearchText) {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.searchTemplateByName(templateSearchText);
});

When('User updates the template content with {string}', { timeout: 90000 }, async function (updatedText) {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.updateNoteContent(updatedText);
});

When('User updates the template content with {string} on notes', { timeout: 90000 }, async function (updatedText) {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.updateNoteContent(updatedText);
});

Then('User clicks the Update button on template', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.clickUpdateButton();
});

When('User clicks the Use Template dropdown on notes', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamConfigurationHistoryNotesPage.clickUseTemplateDropdown();
});
