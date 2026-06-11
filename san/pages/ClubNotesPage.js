const { expect } = require('playwright/test');

class ClubNotesPage {
    constructor(page) {
        this.page = page;
        this.searchBox = page.locator("//span[contains(@style, 'search-icon.svg')]");
        this.quickSearchInput = page.locator("//input[contains(@placeholder, 'Search by clubs')]");
        this.quickSearchCloseButton = page.locator("//button[normalize-space(.)='×']");
        this.notesIcon = page.locator("//span[contains(@style,'notes.svg')]");
        this.notesTab = page.locator("//button[contains(text(),'Notes ')]");
        this.templatesTab = page.locator("//button[contains(normalize-space(.),'Templates')]");
        this.addNoteButton = page.locator("//button[normalize-space(.)='Add Note']");
        this.addTemplateButton = page.locator("//button[normalize-space(.)='Add Template']");
        this.createButton = page.locator("//button[normalize-space(.)='Create']");
        this.publicSwitch = page.locator("(//ejs-switch[@class='e-switch-wrapper e-wrapper']//span)[1]");
        this.privateSwitch = page.locator("(//ejs-switch[@class='e-switch-wrapper e-wrapper']//span)[2]");
        this.firstNoteEditButton = page.locator("(//span[contains(text(),'Edit') and contains(@class,'e-btn-content')])[1]");
        this.updateButton = page.locator("//button[normalize-space(.)='Update']");
        this.notesSearchInput = page.locator("//input[@placeholder='Search by Notes']");
        this.templateSearchInput = page.locator("//input[contains(@placeholder,'Template') and contains(@placeholder,'Search')]");
        this.templateNameInput = page.locator("//input[@placeholder='Enter Template Name']");
        this.firstNoteDeleteButton = page.locator("(//button[contains(@type,'button') and contains(.,'Delete')])[1]");
        this.deleteConfirmButton = page.locator("//button[normalize-space(.)='Confirm']");
        this.firstTemplateEditButton = page.locator("(//span[contains(text(),'Edit') and contains(@class,'e-btn-content')])[1]");
        this.firstTemplateDeleteButton = page.locator("(//button[contains(@type,'button') and contains(.,'Delete')])[1]");
        this.useTemplateDropdown = page.locator("//ejs-dropdownlist[@cssclass='notes-template-dropdown']");
    }

    async openClubDetailsByName(clubName) {
        await this.searchBox.waitFor({ state: 'visible', timeout: 10000 });
        await this.searchBox.click();
        await this.quickSearchInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.quickSearchInput.fill(clubName);
        await this.quickSearchInput.press('Enter');
        await this.quickSearchCloseButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.quickSearchCloseButton.click();
        const clubLink = this.page.getByText(clubName, { exact: true }).first();
        await clubLink.waitFor({ state: 'visible', timeout: 10000 });
        await clubLink.click();
    }

    async clickNotesIcon() {
        await this.notesIcon.waitFor({ state: 'visible', timeout: 10000 });
        await this.notesIcon.click();
    }

    async navigateToNotesTab() {
        await this.notesTab.waitFor({ state: 'visible', timeout: 10000 });
        await this.notesTab.click();
    }

    async clickAddNoteButton() {
        await this.addNoteButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.addNoteButton.click();
    }

    async navigateToTemplatesTab() {
        await this.templatesTab.waitFor({ state: 'visible', timeout: 10000 });
        await this.templatesTab.click();
    }

    async clickAddTemplateButton() {
        await this.addTemplateButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.addTemplateButton.click();
    }

    async enterTemplateName(templateName) {
        await this.templateNameInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.templateNameInput.fill(templateName);
    }

    async enterClubNoteContent(noteContent) {
        const trimmedContent = noteContent.trim();
        const editorFrame = this.page.locator('[contenteditable="true"][role="textbox"]');

        await editorFrame.waitFor({ state: 'visible', timeout: 10000 });
        await editorFrame.click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');
        await this.page.keyboard.insertText(trimmedContent);
    }

    async enablePublicNoteSwitch() {
        await this.publicSwitch.waitFor({ state: 'visible', timeout: 10000 });

        const classes = (await this.publicSwitch.getAttribute('class')) || '';
        const isEnabled = classes.includes('e-switch-inner e-switch-active');

        if (!isEnabled) {
            await this.publicSwitch.click();
        }
    }

    async enablePrivateNoteSwitch() {
        const allSwitches = this.page.locator("//ejs-switch[@class='e-switch-wrapper e-wrapper']//span");
        const switchCount = await allSwitches.count();

        if (switchCount >= 2) {
            await this.privateSwitch.waitFor({ state: 'visible', timeout: 10000 });
            const privateClasses = (await this.privateSwitch.getAttribute('class')) || '';
            const isPrivateEnabled = privateClasses.includes('e-switch-inner e-switch-active');
            if (!isPrivateEnabled) {
                await this.privateSwitch.click();
            }
            return;
        }

        await this.publicSwitch.waitFor({ state: 'visible', timeout: 10000 });
        const publicClasses = (await this.publicSwitch.getAttribute('class')) || '';
        const isPublicEnabled = publicClasses.includes('e-switch-inner e-switch-active');
        if (isPublicEnabled) {
            await this.publicSwitch.click();
        }
    }

    async clickCreateButton() {
        await this.createButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.createButton.click();
    }

    async validatePopupByText(expectedText, timeout = 7000) {
        const popup = this.page.getByText(expectedText).first();
        await expect(popup).toBeVisible({ timeout });
    }

    async searchNotesByName(searchText) {
        await this.notesSearchInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.notesSearchInput.fill(searchText);
        await this.notesSearchInput.press('Enter');
        await this.page.waitForTimeout(1500);
    }

    async searchTemplateByName(searchText) {
        const templateSearchCount = await this.templateSearchInput.count();
        if (templateSearchCount > 0) {
            await this.templateSearchInput.first().waitFor({ state: 'visible', timeout: 10000 });
            await this.templateSearchInput.first().fill(searchText);
            await this.templateSearchInput.first().press('Enter');
            await this.page.waitForTimeout(1500);
            return;
        }

        await this.notesSearchInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.notesSearchInput.fill(searchText);
        await this.notesSearchInput.press('Enter');
        await this.page.waitForTimeout(1500);
    }

    async clickFirstNoteEditButton() {
        await this.firstNoteEditButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.firstNoteEditButton.click();
    }

    async clickFirstTemplateEditButton() {
        await this.firstTemplateEditButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.firstTemplateEditButton.click();
    }

    async clickFirstTemplateDeleteButton() {
        await this.firstTemplateDeleteButton.waitFor({ state: 'visible', timeout: 50000 });
        await this.firstTemplateDeleteButton.click();
    }

    async updateNoteContent(updatedText) {
        const editorFrame = this.page.locator('[contenteditable="true"][role="textbox"]');
        await editorFrame.waitFor({ state: 'visible', timeout: 10000 });
        await editorFrame.click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');
        await this.page.keyboard.insertText(updatedText);
    }

    async clickUpdateButton() {
        await this.updateButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.updateButton.click();
    }

    async clickFirstNoteDeleteButton() {
        await this.firstNoteDeleteButton.waitFor({ state: 'visible', timeout: 50000 });
        await this.firstNoteDeleteButton.click();
    }

    async clickDeleteConfirmButton() {
        await this.deleteConfirmButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.deleteConfirmButton.click();
    }

    async clickUseTemplateDropdown() {
        await this.useTemplateDropdown.waitFor({ state: 'visible', timeout: 10000 });
        await this.useTemplateDropdown.click();
    }

    async searchTemplateInDropdown(templateName) {
        const templateOption = this.page.getByText(templateName, { exact: true });
        await templateOption.waitFor({ state: 'visible', timeout: 10000 });
        await templateOption.click();
    }

    async clickCreateButtonForTemplate() {
        await this.createButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.createButton.click();
    }
}

module.exports = ClubNotesPage;
