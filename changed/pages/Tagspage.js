const DataUtil = require('../utils/dataUtil');
const { BasePageforTagsandattributes } = require('./BasePageforTagsandattributes');

class TagsPage extends BasePageforTagsandattributes {
    constructor(page) {
        super(page);

/*class TagsPage {
    constructor(page) {
        this.page = page;

        // ===== Menu =====
        this.settingsMenu = page.locator("//span[text()='Settings']");
        this.tagsAttributesSideMenu = page.locator("//span[text()='Tags & Attributes']");*/


        // ===== Create Tag =====
        this.createTagButton = page.getByRole('button', { name: 'Create Tag progress' })
        this.tagNameInput = page.locator("//input[@id='name']");

        // ===== Category Dropdown (Syncfusion) =====
        this.categoryDropdown = page.locator(
            "//span[contains(@class,'e-input-group') and @aria-labelledby='categoryType_hidden']"
        );

        // ===== Entity Type =====
        this.entityTypeDropdown = page.locator("//div[contains(@class,'e-multi-select-wrapper') and contains(@class,'e-down-icon')]");
        

        // ===== Action =====
        this.createTagActionButton = page.getByRole('button', { name: 'Create Tag progress' })
    }

    async clickSettingsMenu() {
        console.log('⚙️ Clicking Settings menu');
        await this.settingsMenu.click();
    }

    async clickTagsAndAttributesModule() {
        console.log('🏷️ Clicking Tags & Attributes module');
        await this.tagsAttributesSideMenu.click();
    }

    async clickCreateTag() {
        console.log('➕ Clicking Create Tag button');
        await this.createTagButton.click();
    }

    async enterTagName(tagName) {
        const dynamicTagName = `${tagName}_${DataUtil.getDateSecondMilliTimestamp()}`;
        console.log(`✍️ Entering Tag Name: ${dynamicTagName}`);
        await this.tagNameInput.fill(dynamicTagName);
    }

    async selectCategory(option) {
        try {
            console.log(`📂 Selecting Category: ${option}`);
            await this.categoryDropdown.waitFor({ state: 'visible', timeout: 9000 });
            await this.categoryDropdown.click();

            // Syncfusion dropdown option
            await this.page.locator(`//li[normalize-space()='${option}']`).click();

            console.log('✅ Category selected:', option);
        } catch (error) {
            console.log('❌ Unable to select category:', error.message);
            throw error;
        }
    }

    async selectEntityType(option) {
    try {
        console.log(`🏷️ Selecting Entity Type: ${option}`);

        await this.entityTypeDropdown.waitFor({ state: 'visible', timeout: 9000 });
        await this.entityTypeDropdown.click();

        // Syncfusion dropdown option
        await this.page.locator(`//li[normalize-space()='${option}']`)
            .waitFor({ state: 'visible', timeout: 5000 });

        await this.page.locator(`//li[normalize-space()='${option}']`).click();

        console.log('✅ Entity Type selected:', option);
    } catch (error) {
        console.log('❌ Unable to select entity type:', error.message);
        throw error;
    }
}


    async clickCreateTagAction() {
        console.log('✅ Clicking Create Tag action button');
        await this.createTagActionButton.click();
    }
}

module.exports = { TagsPage };
