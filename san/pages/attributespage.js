const { BasePageforTagsandattributes } = require('./BasePageforTagsandattributes');
const DataUtil = require('../utils/dataUtil');

class AttributesPage extends BasePageforTagsandattributes {
    constructor(page) {
        super(page);

        this.attributesTab = page.locator(
            "//div[contains(@class,'e-tab-text') and normalize-space()='Attributes']"
        );

        this.createAttributeBtn = page.locator("//button[.='Create Attribute']");
        this.attributeNameInput = page.locator("//input[@id='name']");

        // ===== Category Dropdown =====
        this.categoryDropdown = page.locator(
            "//span[contains(@class,'e-input-group') and @aria-labelledby='categoryType_hidden']"
        );
 
        // ===== Entity Type Dropdown =====
        this.entityTypeDropdown = page.locator(
            "//div[contains(@class,'e-multi-select-wrapper') and contains(@class,'e-down-icon')]"
        );
 
        // ===== Attribute Type Dropdown =====
        this.attributeTypeDropdown = page.locator(
            "//span[contains(@class,'e-input-group') and @aria-labelledby='attributeType_hidden']"
        );

         // ===== Action Button =====
        this.createAttributeActionButton = page.locator(
            "//button[@ejs-progressbutton and .//span[normalize-space()='Create Attribute']]"
        );
    }

    async clickAttributesTab() {
        await this.attributesTab.waitFor({ state: 'visible', timeout: 8000 });
        await this.attributesTab.click();
    }

    async clickCreateAttribute() {
        await this.createAttributeBtn.waitFor({ state: 'visible', timeout: 8000 });
        await this.createAttributeBtn.click();
    }

    async enterAttributeName(attributeName) {
    const dynamicAttributeName = `${attributeName}_${DataUtil.getDateSecondMilliTimestamp()}`;
    console.log(`✍️ Entering Attribute Name: ${dynamicAttributeName}`);
    await this.attributeNameInput.waitFor({ state: 'visible', timeout: 8000 });
    await this.attributeNameInput.fill(dynamicAttributeName);
}


    async selectCategory(option) {
    try {
        console.log(`📂 Selecting Category: ${option}`);

        await this.categoryDropdown.waitFor({ state: 'visible', timeout: 9000 });
        await this.categoryDropdown.click();

        await this.page
            .locator(`//li[normalize-space()='${option}']`)
            .waitFor({ state: 'visible', timeout: 5000 });

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

        await this.page
            .locator(`//li[normalize-space()='${option}']`)
            .waitFor({ state: 'visible', timeout: 5000 });

        await this.page.locator(`//li[normalize-space()='${option}']`).click();

        console.log('✅ Entity Type selected:', option);
    } catch (error) {
        console.log('❌ Unable to select entity type:', error.message);
        throw error;
    }
}

async selectAttributeType(option) {
    try {
        console.log(`🔤 Selecting Attribute Type: ${option}`);

        await this.attributeTypeDropdown.waitFor({ state: 'visible', timeout: 9000 });
        await this.attributeTypeDropdown.click();

        await this.page
            .locator(`//li[normalize-space()='${option}']`)
            .waitFor({ state: 'visible', timeout: 5000 });

        await this.page.locator(`//li[normalize-space()='${option}']`).click();

        console.log('✅ Attribute Type selected:', option);
    } catch (error) {
        console.log('❌ Unable to select attribute type:', error.message);
        throw error;
    }
}

async clickCreateAttributeAction() {
        console.log('✅ Clicking Create Attribute action button');
        await this.createAttributeActionButton.click();
    }

    async verifyAttributeCreatedToast() {
        console.log('🔔 Verifying Attribute created success toast');
        const expectedMessage = 'Attribute created successfully!';
        const toast = this.page.locator("//div[contains(@class,'e-toast-content')]");
        await toast.waitFor({ state: 'visible', timeout: 10000 });
        const message = (await toast.textContent()).trim();
        console.log(`✅ Toast message: ${message}`);
        if (message !== expectedMessage) {
            throw new Error(`Expected toast "${expectedMessage}" but got "${message}"`);
        }
        await toast.waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {});
    }

}




module.exports = { AttributesPage };
