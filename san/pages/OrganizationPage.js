/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

const { expect } = require('playwright/test');
const DataUtil = require('../utils/dataUtil');

class OrganizationPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // Navigation
        this.federationManagementTab = this.page.locator('[id="Federation Management"]')
            .or(this.page.locator("//span[normalize-space()='Federation Management'] | //div[normalize-space()='Federation Management']").first());

        // Create Organization button
        this.createOrganizationButton = this.page.locator('[aria-label="Create Organization progress"]')
            .or(this.page.locator('button:has-text("Create Organization")'))
            .or(this.page.locator("//button[contains(normalize-space(),'Create Organization')]"));

        // Organization form fields
        this.organizationCodeInput = this.page.locator('[placeholder="Enter Organization Code"]')
            .or(this.page.locator('#organizationCode'))
            .or(this.page.locator("//label[normalize-space()='Organization Code']/following-sibling::div//input"));

        this.organizationNameInput = this.page.locator('[placeholder="Enter Organization Name"]')
            .or(this.page.locator('#organizationName'))
            .or(this.page.locator("//label[normalize-space()='Organization Name']/following-sibling::div//input"));

        this.federationDropdown = this.page.locator(
            'div.e-multi-select-wrapper:has(input[placeholder="Select Federation"]),' +
            'div.e-multi-select-wrapper:has(input[placeholder*="Federation"])'
        ).first();

        this.formatDropdown = this.page.locator(
            'div.e-multi-select-wrapper:has(input[placeholder="Select Format"]),' +
            'div.e-multi-select-wrapper:has(input[placeholder*="Format"])'
        ).first();

        this.descriptionInput = this.page.locator('[placeholder="Enter Description"]')
            .or(this.page.locator("//label[normalize-space()='Description']/following-sibling::div//textarea"))
            .or(this.page.locator("//label[normalize-space()='Description']/following-sibling::div//input"));

        // Confirm / Save button
        this.confirmButton = this.page.locator('[aria-label=" Confirm  progress"]')
            .or(this.page.locator('[aria-label="Confirm progress"]'))
            .or(this.page.locator('[aria-label="Create Organization progress"]'))
            .or(this.page.locator('button.e-primary.e-btn:has-text("Confirm")'))
            .or(this.page.locator('.e-dialog button:has-text("Confirm")'))
            .or(this.page.locator('button:has-text("Yes")'));

        // Dropdown option (generic)
        this.dropdownOption = (value) =>
            this.page.locator(`//li[contains(@class,'e-list-item') and normalize-space()='${value}']`);
    }

    /**
     * Navigate to Federation Management via its menu tab.
     */
    async navigateToFederationManagement() {
        await this.federationManagementTab.waitFor({ state: 'visible', timeout: 30000 });
        await this.federationManagementTab.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Click the Create Organization button.
     */
    async clickCreateOrganization() {
        await this.createOrganizationButton.waitFor({ state: 'visible', timeout: 30000 });
        await this.createOrganizationButton.click();
        await this.organizationCodeInput.waitFor({ state: 'visible', timeout: 15000 });
    }

    /**
     * Select a value from an ejs-dropdownlist by clicking on it and selecting the option.
     * @param {Locator} dropdownLocator
     * @param {string} value
     */
    async selectDropdownValue(dropdownLocator, value) {
        await dropdownLocator.waitFor({ state: 'visible', timeout: 15000 });
        await dropdownLocator.click();
        const option = this.dropdownOption(value);
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click();
    }

    /**
     * Fill the organization form fields from a data-table row hash.
     * Supported keys: "Organization Code", "Organization Name", "Federation", "Format", "Description"
     * @param {Object} data - row hash from the Cucumber data table
     */
    async fillOrganizationDetails(data) {
        if (data['Organization Code']) {
            const orgCode = data['Organization Code'] === 'UI'
                ? DataUtil.generateOrgCode('UI')
                : data['Organization Code'];
            await this.organizationCodeInput.waitFor({ state: 'visible', timeout: 15000 });
            await this.organizationCodeInput.fill(orgCode);
        }

        if (data['Organization Name']) {
            const orgName = data['Organization Name'] === 'UI'
                ? DataUtil.generateOrgCode('UI')
                : data['Organization Name'];
            await this.organizationNameInput.waitFor({ state: 'visible', timeout: 15000 });
            await this.organizationNameInput.fill(orgName);
        }

        if (data['Federation']) {
            await this.selectDropdownValue(this.federationDropdown, data['Federation']);
        }

        if (data['Format']) {
            await this.selectDropdownValue(this.formatDropdown, data['Format']);
        }

        if (data['Description']) {
            await this.descriptionInput.waitFor({ state: 'visible', timeout: 15000 });
            await this.descriptionInput.fill(data['Description']);
        }
    }

    /**
     * Click the Confirm button to submit the organization creation.
     */
    async clickConfirmOrganization() {
        await this.confirmButton.waitFor({ state: 'visible', timeout: 15000 });
        await this.page.evaluate(() => {
            window.__toastTexts = [];
            if (window.__toastObserver) window.__toastObserver.disconnect();
            window.__toastObserver = new MutationObserver((mutations) => {
                for (const m of mutations) {
                    for (const node of m.addedNodes) {
                        if (node.nodeType !== 1) continue;
                        const els = [node, ...node.querySelectorAll('*')];
                        for (const el of els) {
                            const t = el.textContent && el.textContent.trim();
                            if (t && t.length > 2 && t.length < 250 && !window.__toastTexts.includes(t))
                                window.__toastTexts.push(t);
                        }
                    }
                }
            });
            window.__toastObserver.observe(document.body, { childList: true, subtree: true });
        });
        await this.confirmButton.click();
    }

    /**
     * Validate a toast/popup message by its text.
     * @param {string} expectedText
     * @param {number} timeout
     */
    async validatePopupByText(expectedText, timeout = 20000) {
        const popup = this.page.locator(
            "//div[@class='e-toast-content'] | " +
            "//div[contains(@class,'e-toast-content')] | " +
            "//div[contains(@class,'e-toast-message')] | " +
            "//*[contains(@class,'toast') or contains(@class,'snack') or contains(@class,'notification')]"
        ).filter({ hasText: expectedText }).first();

        try {
            await popup.waitFor({ state: 'visible', timeout });
            await popup.waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {});
        } catch (error) {
            throw new Error(
                `Popup with text "${expectedText}" was not visible within ${timeout}ms.\nOriginal error: ${error.message}`
            );
        }
    }
}

module.exports = OrganizationPage;
