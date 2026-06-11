const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – RESOURCE MANAGEMENT
// ======================================================================

/**
 * Navigate to a named module from the main menu (generic).
 * Used by: Then User navigates to "Resource Management" from main menu
 */
Then(
    'User navigates to {string} from main menu',
    { timeout: 90000 },
    async function (moduleName) {
        await this.pages.resourceManagementPage.navigateToResourceManagement(moduleName);
    }
);

// ======================================================================
// EDIT BUTTON
// ======================================================================

/**
 * Click the Edit button on the Resource Management ribbon/toolbar.
 */
Then(
    'User clicks the Edit button in Resource Management',
    { timeout: 90000 },
    async function () {
        await this.pages.resourceManagementPage.clickEditButton();
    }
);

// ======================================================================
// CREATE VENUE BUTTON
// ======================================================================

/**
 * Click a named button in Resource Management (e.g. "Create Venue").
 */
Then(
    'User clicks the {string} button in Resource Management',
    { timeout: 90000 },
    async function (buttonName) {
        if (buttonName === 'Create Venue') {
            await this.pages.resourceManagementPage.clickCreateVenue();
        } else {
            throw new Error(`Button "${buttonName}" is not handled in Resource Management steps`);
        }
    }
);

// ======================================================================
// FILL VENUE DETAILS
// ======================================================================

/**
 * Fill venue form fields from a data table.
 *
 * Supported fields: "Venue Name", "Capacity", "Surface Type"
 */
Then(
    'User fills the venue details with the following information',
    { timeout: 90000 },
    async function (dataTable) {
        const data = dataTable.rowsHash();
        await this.pages.resourceManagementPage.fillVenueDetails(data);
    }
);

// ======================================================================
// ADDRESS SEARCH
// ======================================================================

/**
 * Type a search term in the venue address search input.
 */
Then(
    'User searches for address {string} in the venue address field',
    { timeout: 90000 },
    async function (searchText) {
        await this.pages.resourceManagementPage.searchAddress(searchText);
    }
);

/**
 * Select the first address suggestion returned by the autocomplete dropdown.
 */
Then(
    'User selects the first address suggestion from the dropdown',
    { timeout: 90000 },
    async function () {
        await this.pages.resourceManagementPage.selectFirstAddressSuggestion();
    }
);

// ======================================================================
// SAVE
// ======================================================================

/**
 * Click the Save / Confirm button to persist the venue.
 */
Then(
    'User clicks the Save button in Resource Management',
    { timeout: 90000 },
    async function () {
        await this.pages.resourceManagementPage.clickSave();
    }
);

// ======================================================================
// VERIFICATION
// ======================================================================

/**
 * Verify the venue with the given name was created successfully.
 */
Then(
    'User verifies the venue {string} is created successfully',
    { timeout: 90000 },
    async function (venueName) {
        await this.pages.resourceManagementPage.verifyVenueCreated(venueName);
    }
);
