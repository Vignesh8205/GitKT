const { Then, When, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(1 * 60000);

Then('Search {string} in the person management search box and open the person details page', { timeout: 90000 }, async function (personCode) {
    await this.pages.personProfileNotesPage.openPersonDetailsByCode(personCode);
});

Then('click on the notes icon in person profile page header', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.clickNotesIcon();
});


Then('User navigates to the person profile notes tab', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.navigateToNotesTab();
});


When('User clicks the Add Note button on person profile notes', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.clickAddNoteButton();
});


When('User enters the person profile note content', { timeout: 90000 }, async function (noteContent) {
    await this.pages.personProfileNotesPage.enterProfileNoteContent(noteContent);
});

When('User enables the public switch for person profile note', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.enablePublicNoteSwitch();
});

When('User enables the private switch for person profile note', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.enablePrivateNoteSwitch();
});

Then('User clicks the Create button on person profile notes', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.clickCreateButton();
});

Then('User should see person profile notes popup message as {string}', { timeout: 150000 }, async function (expectedMessage) {
    await this.pages.personProfileNotesPage.validatePopupByText(expectedMessage);
});

// scenarion for searching notes by name and editing the note content
When('User searches for notes by name {string}', { timeout: 90000 }, async function (notesSearchText) {
    await this.pages.personProfileNotesPage.searchNotesByName(notesSearchText);
});

Then('User clicks the edit button of the first note', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.clickFirstNoteEditButton();
});

When('User updates the person profile note content with {string}', { timeout: 90000 }, async function (updatedText) {
    await this.pages.personProfileNotesPage.updateNoteContent(updatedText);
});



Then('User clicks the Update button on person profile note', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.clickUpdateButton();
});

// scenario for deleting notes
Then('User clicks the delete button of the first note', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.clickFirstNoteDeleteButton();
});

Then('User clicks the confirm button on delete note dialog', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.clickDeleteConfirmButton();
});

Then('User clicks the Update button on person profile notes', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.clickUpdateButton();
});

//create public template scenario

Then('User navigates to the person profile templates tab', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.navigateToTemplatesTab();
});


When('User clicks the Add Template button on person profile notes', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.clickAddTemplateButton();
});

When('User enters template name as {string} on person profile notes', { timeout: 90000 }, async function (templateName) {
    await this.pages.personProfileNotesPage.enterTemplateName(templateName);
});

//Update public template created previously
When('User searches for template by name {string} on person profile notes', { timeout: 90000 }, async function (templateSearchText) {
    await this.pages.personProfileNotesPage.searchTemplateByName(templateSearchText);
});

Then('User clicks the edit button of the first template', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.clickFirstTemplateEditButton();
});

When('User updates the template content with {string} on person profile notes', { timeout: 90000 }, async function (updatedText) {
    await this.pages.personProfileNotesPage.updateNoteContent(updatedText);
});

Then('User clicks the Update button on person profile template', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.clickUpdateButton();
});

// Delete public template updated previously
Then('User clicks the delete button of the first template', { timeout: 150000 }, async function () {
    await this.pages.personProfileNotesPage.clickFirstTemplateDeleteButton();
});

Then('User clicks the confirm button on delete template dialog', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.clickDeleteConfirmButton();
});

// Scenario: Create a template and use it to create a note
When('User clicks the Use Template dropdown on person profile notes', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.clickUseTemplateDropdown();
});

When('User searches for template {string} in the template search', { timeout: 90000 }, async function (templateName) {
    await this.pages.personProfileNotesPage.searchTemplateInDropdown(templateName);
});

When('User presses enter key to search template', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.pressEnterToSearchTemplate();
});

Then('User should see the template {string} in the template list', { timeout: 90000 }, async function (templateName) {
    await this.pages.personProfileNotesPage.verifyTemplateInList(templateName);
});

When('User clicks the create button to use the template', { timeout: 90000 }, async function () {
    await this.pages.personProfileNotesPage.clickCreateButtonForTemplate();
});