const { Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(2 * 60000);

Then(
    'User fill the Season dropdown with {string}',
    { timeout: 30000 },
    async function (season) {
        await this.pages.matchChangeRequestCreatePage.fillSeasonDropdown(season);
    }
);

Then(
    'User fill the Federation with {string} and Region with {string}',
    { timeout: 60000 },
    async function (federation, region) {
        await this.pages.matchChangeRequestCreatePage.fillFederationAndRegion(federation, region);
    }
);

Then(
    'User navigate to the Change Request Configurations and click the add button',
    { timeout: 30000 },
    async function () {
        await this.pages.matchChangeRequestCreatePage.navigateToChangeRequestConfigAndClickAdd();
    }
);

Then(
    'User navigate to the add configuration popup',
    { timeout: 30000 },
    async function () {
        await this.pages.matchChangeRequestCreatePage.waitForAddConfigurationPopup();
    }
);

Then(
    'User fill the Change Request Type with {string}',
    { timeout: 30000 },
    async function (type) {
        await this.pages.matchChangeRequestCreatePage.fillChangeRequestType(type);
    }
);

Then(
    'User choose Requested By with {string} and Approved By with {string}',
    { timeout: 60000 },
    async function (requestedBy, approvedBy) {
        await this.pages.matchChangeRequestCreatePage.fillRequestedByAndApprovedBy(requestedBy, approvedBy);
    }
);

Then(
    'User move to Request Submission Period section',
    { timeout: 15000 },
    async function () {
        await this.pages.matchChangeRequestCreatePage.moveToRequestSubmissionPeriodSection();
    }
);

Then(
    'User fill the Start Date with {string} and End Date with {string}',
    { timeout: 60000 },
    async function (startDate, endDate) {
        await this.pages.matchChangeRequestCreatePage.fillStartDateAndEndDate(startDate, endDate);
    }
);

Then(
    'User fill the Start Time with {string} and End Time with {string}',
    { timeout: 60000 },
    async function (startTime, endTime) {
        await this.pages.matchChangeRequestCreatePage.fillStartTimeAndEndTime(startTime, endTime);
    }
);

Then(
    'User fill the Deadline Before Kickoff with {int}',
    { timeout: 30000 },
    async function (duration) {
        await this.pages.matchChangeRequestCreatePage.fillDeadlineBeforeKickoff(duration);
    }
);

Then(
    'User click the Enable day restrictions for rescheduling checkbox',
    { timeout: 30000 },
    async function () {
        await this.pages.matchChangeRequestCreatePage.clickEnableDayRestrictionsCheckbox();
    }
);

Then(
    'User fill the Rescheduled FROM with {string} and Rescheduled TO with {string}',
    { timeout: 60000 },
    async function (fromDay, toDay) {
        await this.pages.matchChangeRequestCreatePage.fillRescheduledFromAndTo(fromDay, toDay);
    }
);

Then(
    'User click the add configuration Create button',
    { timeout: 30000 },
    async function () {
        await this.pages.matchChangeRequestCreatePage.clickAddConfigurationCreateButton();
    }
);
