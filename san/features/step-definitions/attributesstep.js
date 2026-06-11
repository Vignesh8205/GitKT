const { When, Then } = require('@cucumber/cucumber');
const { AttributesPage } = require('../../pages/attributespage');

Then('User choose the Settings tabs', async function () {
    this.attributesPage = new AttributesPage(this.page);
    await this.attributesPage.clickSettingsMenu();
});

Then('User select the TagsandAttributes Modules', async function () {
    await this.attributesPage.clickTagsAndAttributesModule();
});

Then('User select the Attributes Tab', async function () {
    await this.attributesPage.clickAttributesTab();
});

Then('User click on CreateAttribute button', async function () {
    await this.attributesPage.clickCreateAttribute();
});

When('User enters Attribute name {string}', async function (attributeName) {
    await this.attributesPage.enterAttributeName(attributeName);
});

When('User selects Attribute Category as {string}', async function (option) {
    await this.attributesPage.selectCategory(option);
});

When('User selects Attribute Entity Type as {string}', async function (option) {
    await this.attributesPage.selectEntityType(option);
});

When('User selects Attribute Type as {string}', async function (option) {
    await this.attributesPage.selectAttributeType(option);
});

Then('User click on CreateAttribute action button', async function () {
    await this.attributesPage.clickCreateAttributeAction();
});

Then('User validates the Attribute created success toast message', async function () {
    await this.attributesPage.verifyAttributeCreatedToast();
});
