const { When, Then } = require('@cucumber/cucumber');
const { TagsPage } = require('../../pages/Tagspage');

// Create page object ONCE and reuse
Then('User choose the Settings tab', async function () {
    this.tagsPage = new TagsPage(this.page);
    await this.tagsPage.clickSettingsMenu();
});

Then('User select the TagsandAttributes Module', async function () {
    await this.tagsPage.clickTagsAndAttributesModule();
});

Then('User click on CreateTag button', async function () {
    await this.tagsPage.clickCreateTag();
});

When('User enters Tag name {string}', async function (tagName) {
    await this.tagsPage.enterTagName(tagName);
});

When('User selects Category as {string}', async function (option) {
    await this.tagsPage.selectCategory(option);
});

When('User selects Entity Type as {string}', async function (option) {
    await this.tagsPage.selectEntityType(option);
});

Then('User click on Create Tag action button', async function () {
    await this.tagsPage.clickCreateTagAction();
});
