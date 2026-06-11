const { Then, When, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(1 * 60000);

Then('User clicks the Teams tab in club section', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.clickTeamTab();
});

Then('User clicks on {string} suffix in club section team list', { timeout: 90000 }, async function (suffix) {
    await this.pages.clubSectionTeamNotesPage.clickTeamSuffix(suffix);
});

Then('click on the notes icon in club section team profile page header', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.clickNotesIcon();
});

Then('User navigates to the club section team profile notes tab', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.navigateToNotesTab();
});

When('User clicks the Add Note button on club section team notes', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.clickAddNoteButton();
});

When('User enters the club section team note content', { timeout: 90000 }, async function (noteContent) {
    await this.pages.clubSectionTeamNotesPage.enterClubSectionTeamNoteContent(noteContent);
});

When('User enables the public switch for club section team note', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.enablePublicNoteSwitch();
});

When('User enables the private switch for club section team note', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.enablePrivateNoteSwitch();
});

Then('User clicks the Create button on club section team notes', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.clickCreateButton();
});

Then('User should see club section team notes popup message as {string}', { timeout: 90000 }, async function (expectedMessage) {
    await this.pages.clubSectionTeamNotesPage.validatePopupByText(expectedMessage);
});

When('User searches for club section team notes by name {string}', { timeout: 90000 }, async function (notesSearchText) {
    await this.pages.clubSectionTeamNotesPage.searchNotesByName(notesSearchText);
});

Then('User clicks the edit button of the first club section team note', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.clickFirstNoteEditButton();
});

When('User updates the club section team note content with {string}', { timeout: 90000 }, async function (updatedText) {
    await this.pages.clubSectionTeamNotesPage.updateNoteContent(updatedText);
});

Then('User clicks the Update button on club section team notes', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.clickUpdateButton();
});

Then('User clicks the delete button of the first club section team note', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.clickFirstNoteDeleteButton();
});

Then('User clicks the confirm button on delete club section team note dialog', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.clickDeleteConfirmButton();
});

Then('User navigates to the club section team profile templates tab', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.navigateToTemplatesTab();
});

When('User clicks the Add Template button on club section team notes', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.clickAddTemplateButton();
});

When('User enters template name as {string} on club section team notes', { timeout: 90000 }, async function (templateName) {
    await this.pages.clubSectionTeamNotesPage.enterTemplateName(templateName);
});

When('User searches for template by name {string} on club section team notes', { timeout: 90000 }, async function (templateSearchText) {
    await this.pages.clubSectionTeamNotesPage.searchTemplateByName(templateSearchText);
});

Then('User clicks the edit button of the first club section team template', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.clickFirstTemplateEditButton();
});

When('User updates the club section team template content with {string}', { timeout: 90000 }, async function (updatedText) {
    await this.pages.clubSectionTeamNotesPage.updateNoteContent(updatedText);
});

Then('User clicks the Update button on club section team template', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.clickUpdateButton();
});

Then('User clicks the delete button of the first club section team template', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.clickFirstTemplateDeleteButton();
});

Then('User clicks the confirm button on delete club section team template dialog', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.clickDeleteConfirmButton();
});

When('User clicks the Use Template dropdown on club section team notes', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.clickUseTemplateDropdown();
});

When('User searches for template {string} in the club section team template search', { timeout: 90000 }, async function (templateName) {
    await this.pages.clubSectionTeamNotesPage.searchTemplateInDropdown(templateName);
});

When('User clicks the create button to use the club section team template', { timeout: 90000 }, async function () {
    await this.pages.clubSectionTeamNotesPage.clickCreateButtonForTemplate();
});