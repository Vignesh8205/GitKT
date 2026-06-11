const { Then, When, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(1 * 60000);

Then('Search {string} in the club search box and open the club details page', { timeout: 90000 }, async function (clubName) {
    await this.pages.clubNotesPage.openClubDetailsByName(clubName);
});

Then('click on the notes icon in club profile page header', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.clickNotesIcon();
});

Then('User navigates to the club profile notes tab', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.navigateToNotesTab();
});

When('User clicks the Add Note button on club profile notes', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.clickAddNoteButton();
});

When('User enters the club profile note content', { timeout: 90000 }, async function (noteContent) {
    await this.pages.clubNotesPage.enterClubNoteContent(noteContent);
});

When('User enables the public switch for club profile note', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.enablePublicNoteSwitch();
});

Then('User clicks the Create button on club profile notes', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.clickCreateButton();
});

Then('User should see club profile notes popup message as {string}', { timeout: 90000 }, async function (expectedMessage) {
    await this.pages.clubNotesPage.validatePopupByText(expectedMessage);
});

When('User searches for club notes by name {string}', { timeout: 90000 }, async function (notesSearchText) {
    await this.pages.clubNotesPage.searchNotesByName(notesSearchText);
});

Then('User clicks the edit button of the first club note', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.clickFirstNoteEditButton();
});

When('User updates the club profile note content with {string}', { timeout: 90000 }, async function (updatedText) {
    await this.pages.clubNotesPage.updateNoteContent(updatedText);
});

Then('User clicks the Update button on club profile note', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.clickUpdateButton();
});

Then('User clicks the delete button of the first club note', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.clickFirstNoteDeleteButton();
});

Then('User clicks the confirm button on delete club note dialog', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.clickDeleteConfirmButton();
});

When('User enables the private switch for club profile note', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.enablePrivateNoteSwitch();
});

Then('User navigates to the club profile templates tab', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.navigateToTemplatesTab();
});

When('User clicks the Add Template button on club profile notes', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.clickAddTemplateButton();
});

When('User enters template name as {string} on club profile notes', { timeout: 90000 }, async function (templateName) {
    await this.pages.clubNotesPage.enterTemplateName(templateName);
});

When('User searches for template by name {string} on club profile notes', { timeout: 90000 }, async function (templateSearchText) {
    await this.pages.clubNotesPage.searchTemplateByName(templateSearchText);
});

Then('User clicks the edit button of the first club template', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.clickFirstTemplateEditButton();
});

When('User updates the club template content with {string} on club profile notes', { timeout: 90000 }, async function (updatedText) {
    await this.pages.clubNotesPage.updateNoteContent(updatedText);
});

Then('User clicks the Update button on club profile template', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.clickUpdateButton();
});

Then('User clicks the delete button of the first club template', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.clickFirstTemplateDeleteButton();
});

Then('User clicks the confirm button on delete club template dialog', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.clickDeleteConfirmButton();
});

When('User clicks the Use Template dropdown on club profile notes', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.clickUseTemplateDropdown();
});

When('User searches for template {string} in the club template search', { timeout: 90000 }, async function (templateName) {
    await this.pages.clubNotesPage.searchTemplateInDropdown(templateName);
});

When('User clicks the create button to use the club template', { timeout: 90000 }, async function () {
    await this.pages.clubNotesPage.clickCreateButtonForTemplate();
});
