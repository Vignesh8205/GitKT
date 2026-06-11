/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

const { expect } = require('playwright/test');
const DataUtil = require('../utils/dataUtil');

class ResourceManagementPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // Main menu / navigation
        this.mainMenuButton = this.page.locator('[data-mat-icon-name="gr_portal"]');
        this.resourceManagementTab = this.page.locator('[id="Resource Management"]');

        // Page title
        this.pageTitle = this.page.locator("//span[contains(@class,'text-[32px]') and contains(text(),'Resource Management')]");

        // Edit / action buttons
        this.editButton = this.page.locator(`[class*="e-edit e-icons"]`).first();
        this.createVenueButton = this.page.locator('[aria-label="Create Venue progress"]').last();
        this.saveButton = this.page.locator(
            '//button[contains(@aria-label,"Create Venue") or contains(@aria-label,"Save")][@type="button"]'
        ).first();
        this.confirmButton = this.page.locator('[aria-label="Confirm progress"], [aria-label=" Confirm  progress"]');

        // Venue form fields
        this.venueNameInput = this.page.locator('[placeholder="Enter Name"]').first();
        this.capacityInput = this.page.locator('[placeholder="Enter Capacity"], [id="capacity"]').first();
        this.surfaceTypeDropdown = this.page.locator(
            "//label[.//text()[normalize-space()='Surface Type']]/following-sibling::div//ejs-dropdownlist"
        );

        // Federation and Venue Type dropdowns
        this.federationDropdown = this.page.locator(
            "//label[.//text()[normalize-space()='Federation']]/following-sibling::div//ejs-dropdownlist"
        );
        this.venueTypeDropdown = this.page.locator(
            "//label[.//text()[normalize-space()='Venue Type']]/following-sibling::div//ejs-dropdownlist"
        );

        // Address section – Line 1 autocomplete
        this.addressSearchInput = this.page.locator(
            'input[role="combobox"][placeholder="Enter Address Line 1"]'
        ).first();
        this.firstAddressSuggestion = this.page.locator(
            'ul.e-list-parent li.e-list-item'
        ).first();

        // Address section – remaining plain text/dropdown fields
        this.addressLine2Input   = this.page.locator('#lineTwo');
        this.cityInput           = this.page.locator('#city');
        this.stateInput          = this.page.locator('#state');
        this.countryDropdown     = this.page.locator('#country_hidden').locator('xpath=ancestor::span[contains(@class,"e-ddl")]');
        this.postalCodeInput     = this.page.locator('#postalCode');

        // Success toast / notification
        this.successToast = this.page.locator(
            '[class*="toast"], [class*="snack"], [class*="notification"], [class*="alert"]'
        ).first();

        // Grid rows
        this.venueGridRows = this.page.locator('ejs-grid .e-row, [class*="grid-row"], tbody tr');
    }

    /**
     * Navigate to Resource Management via the main menu tab.
     */
    async navigateToResourceManagement() {
        await this.resourceManagementTab.waitFor({ state: 'visible', timeout: 30000 });
        await this.resourceManagementTab.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Click the Edit button to enter edit mode.
     */
    async clickEditButton() {
        await this.editButton.waitFor({ state: 'visible', timeout: 30000 });
        await this.editButton.click();
    }

    /**
     * Click the Create Venue button.
     */
    async clickCreateVenue() {
        await this.createVenueButton.waitFor({ state: 'visible', timeout: 30000 });
        await this.createVenueButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Fill the venue form fields from a data-table row hash.
     * Supported keys: "Venue Name", "Capacity", "Surface Type"
     * @param {Object} data  - row hash from the data table
     */
    async fillVenueDetails(data) {
        if (data['Name']) {
            const venueName =
                data['Name'] === 'random'
                    ? DataUtil.generateRandomVenueName()
                    : data['Name'];
            await this.venueNameInput.waitFor({ state: 'visible', timeout: 20000 });
            await this.venueNameInput.fill(venueName);
        }

        if (data['Capacity']) {
            await this.capacityInput.waitFor({ state: 'visible', timeout: 20000 });
            await this.capacityInput.fill(data['Capacity']);
        }

        if (data['Surface Type']) {
            await this.surfaceTypeDropdown.waitFor({ state: 'visible', timeout: 20000 });
            await this.surfaceTypeDropdown.click();
            await this.page
                .locator(`//li[contains(@class,'e-list-item') and normalize-space()='${data['Surface Type']}']`)
                .click();
        }

        if (data['Federation']) {
            await this.federationDropdown.waitFor({ state: 'visible', timeout: 20000 });
            await this.federationDropdown.click();
            await this.page
                .locator(`//li[contains(@class,'e-list-item') and normalize-space()='${data['Federation']}']`)
                .click();
        }

        if (data['Venue Type']) {
            await this.venueTypeDropdown.waitFor({ state: 'visible', timeout: 20000 });
            await this.venueTypeDropdown.click();
            await this.page
                .locator(`//li[contains(@class,'e-list-item') and normalize-space()='${data['Venue Type']}']`)
                .click();
        }

        if (data['Address Line 1']) {
            await this.addressSearchInput.waitFor({ state: 'visible', timeout: 20000 });
            await this.addressSearchInput.click();
            await this.addressSearchInput.clear();
            await this.addressSearchInput.fill(data['Address Line 1']);
            await this.page.waitForTimeout(2000);
            // await this.firstAddressSuggestion.waitFor({ state: 'visible', timeout: 20000 });
            // await this.firstAddressSuggestion.click();
            // await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
            await this.page.waitForTimeout(3000);
        }

        if (data['Address Line 2']) {
            await this.addressLine2Input.waitFor({ state: 'visible', timeout: 20000 });
            await this.addressLine2Input.fill(data['Address Line 2']);
        }

        if (data['Suburb / City']) {
            await this.cityInput.waitFor({ state: 'visible', timeout: 20000 });
            await this.cityInput.fill(data['Suburb / City']);
        }

        if (data['State / Province']) {
            await this.stateInput.waitFor({ state: 'visible', timeout: 20000 });
            await this.stateInput.fill(data['State / Province']);
        }

        if (data['Country']) {
            await this.countryDropdown.waitFor({ state: 'visible', timeout: 20000 });
            await this.countryDropdown.click();
            await this.page
                .locator(`//li[contains(@class,'e-list-item') and normalize-space()='${data['Country']}']`)
                .click();
        }

        if (data['Postal Code']) {
            await this.postalCodeInput.waitFor({ state: 'visible', timeout: 20000 });
            await this.postalCodeInput.fill(data['Postal Code']);
        }
    }

    /**
     * Type a search term into the address search input.
     * @param {string} searchText
     */
    async searchAddress(searchText) {
        await this.addressSearchInput.waitFor({ state: 'visible', timeout: 20000 });
        await this.addressSearchInput.click();
        await this.addressSearchInput.clear();
        // Use pressSequentially to trigger Syncfusion autocomplete server queries
        await this.addressSearchInput.pressSequentially(searchText, { delay: 100 });
        // Wait for the suggestion popup to appear
        await this.page.waitForTimeout(2000);
    }

    /**
     * Click the first suggestion from the address autocomplete dropdown.
     */
    async selectFirstAddressSuggestion() {
        await this.firstAddressSuggestion.waitFor({ state: 'visible', timeout: 20000 });
        await this.firstAddressSuggestion.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Click the Save / Confirm button to save the venue.
     */
    async clickSave() {
        await this.saveButton.waitFor({ state: 'visible', timeout: 15000 });
        await this.saveButton.click();
        await this.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
    }

    /**
     * Verify the venue was created – check that a success toast or the venue name appears in the grid.
     * @param {string} venueName
     */
    async verifyVenueCreated(venueName) {
        // First try to find a success toast message
        const toastVisible = await this.successToast.isVisible().catch(() => false);
        if (toastVisible) {
            const toastText = await this.successToast.innerText();
            expect(toastText.toLowerCase()).toContain('success');
            return;
        }

        // Fall back: look for the venue name inside the grid
        const venueInGrid = this.page.locator(`text=${venueName}`).first();
        await venueInGrid.waitFor({ state: 'visible', timeout: 15000 });
        await expect(venueInGrid).toBeVisible();
    }
}

module.exports = ResourceManagementPage;
