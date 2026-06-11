const { Then, When, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(1 * 60000);

// Then('Search {string} in the club search box and open the club details page', { timeout: 90000 }, async function (clubName) {
//     await this.pages.clubSectionNotesPage.openClubDetailsByName(clubName);
// });

Then('click on Sections tab', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.clickSectionsTab();
});

Then('click on {string} section', { timeout: 90000 }, async function (sectionName) {
    await this.pages.clubSectionNotesPage.clickSection(sectionName);
});

Then('click on the notes icon in club section profile page header', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.clickNotesIcon();
});

Then('User navigates to the club section profile notes tab', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.navigateToNotesTab();
});

When('User clicks the Add Note button on club section notes', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.clickAddNoteButton();
});

When('User enters the club section note content', { timeout: 90000 }, async function (noteContent) {
    await this.pages.clubSectionNotesPage.enterClubSectionNoteContent(noteContent);
});

When('User enables the public switch for club section note', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.enablePublicNoteSwitch();
});

Then('User clicks the Create button on club section notes', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.clickCreateButton();
});

Then('User should see club section notes popup message as {string}', { timeout: 90000 }, async function (expectedMessage) {
    await this.pages.clubSectionNotesPage.validatePopupByText(expectedMessage);
});

When('User searches for club section notes by name {string}', { timeout: 90000 }, async function (notesSearchText) {
    await this.pages.clubSectionNotesPage.searchNotesByName(notesSearchText);
});

Then('User clicks the edit button of the first club section note', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.clickFirstNoteEditButton();
});

When('User updates the club section note content with {string}', { timeout: 90000 }, async function (updatedText) {
    await this.pages.clubSectionNotesPage.updateNoteContent(updatedText);
});

Then('User clicks the Update button on club section notes', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.clickUpdateButton();
});

Then('User clicks the delete button of the first club section note', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.clickFirstNoteDeleteButton();
});

Then('User clicks the confirm button on delete club section note dialog', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.clickDeleteConfirmButton();
});

When('User enables the private switch for club section note', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.enablePrivateNoteSwitch();
});

Then('User navigates to the club section profile templates tab', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.navigateToTemplatesTab();
});

When('User clicks the Add Template button on club section notes', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.clickAddTemplateButton();
});

When('User enters template name as {string} on club section notes', { timeout: 90000 }, async function (templateName) {
    await this.pages.clubSectionNotesPage.enterTemplateName(templateName);
});

When('User searches for template by name {string} on club section notes', { timeout: 90000 }, async function (templateSearchText) {
    await this.pages.clubSectionNotesPage.searchTemplateByName(templateSearchText);
});

Then('User clicks the edit button of the first club section template', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.clickFirstTemplateEditButton();
});

When('User updates the club section template content with {string} on club section notes', { timeout: 90000 }, async function (updatedText) {
    await this.pages.clubSectionNotesPage.updateNoteContent(updatedText);
});

Then('User clicks the Update button on club section template', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.clickUpdateButton();
});

Then('User clicks the delete button of the first club section template', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.clickFirstTemplateDeleteButton();
});

Then('User clicks the confirm button on delete club section template dialog', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.clickDeleteConfirmButton();
});

When('User clicks the Use Template dropdown on club section notes', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.clickUseTemplateDropdown();
});

When('User searches for template {string} in the club section template search', { timeout: 90000 }, async function (templateName) {
    await this.pages.clubSectionNotesPage.searchTemplateInDropdown(templateName);
});

When('User clicks the create button to use the club section template', { timeout: 90000 }, async function () {
    await this.pages.clubSectionNotesPage.clickCreateButtonForTemplate();
});
