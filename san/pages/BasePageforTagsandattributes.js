class BasePageforTagsandattributes {
    constructor(page) {
        this.page = page;

        this.settingsMenu = page.locator("//span[text()='Settings']");
        this.tagsAttributesSideMenu = page.locator("//span[text()='Tags & Attributes']");
    }

    async clickSettingsMenu() {
        await this.settingsMenu.click();
    }

    async clickTagsAndAttributesModule() {
        await this.tagsAttributesSideMenu.click();
    }
}

module.exports = { BasePageforTagsandattributes };
