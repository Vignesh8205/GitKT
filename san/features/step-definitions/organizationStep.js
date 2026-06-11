const { When, Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

// ======================================================================
// NAVIGATION – FEDERATION MANAGEMENT
// ======================================================================

/**
 * Click on the Federation Management option from the main menu.
 */
Then('User choose the Federation Management option', { timeout: 90000 }, async function () {
    await this.pages.organizationPage.navigateToFederationManagement();
    console.log('User navigated to Federation Management');
});

// ======================================================================
// CREATE ORGANIZATION
// ======================================================================

/**
 * Click the Create Organization button.
 */
Then('User click on create the organization button', { timeout: 90000 }, async function () {
    await this.pages.organizationPage.clickCreateOrganization();
    console.log('User clicked the Create Organization button');
});

// ======================================================================
// FILL ORGANIZATION DETAILS
// ======================================================================

/**
 * Fill organization form fields from a data table.
 *
 * Supported fields: "Organization Code", "Organization Name", "Federation", "Format", "Description"
 */
When('user enters organization information', { timeout: 90000 }, async function (dataTable) {
    const data = dataTable.rowsHash();
    await this.pages.organizationPage.fillOrganizationDetails(data);
    console.log('User entered organization details');
});

// ======================================================================
// CONFIRM ORGANIZATION
// ======================================================================

/**
 * Click the Confirm button to submit the organization form.
 */
Then('User click on confirm the organization button', { timeout: 90000 }, async function () {
    await this.pages.organizationPage.clickConfirmOrganization();
    console.log('User clicked the Confirm button for organization');
});
