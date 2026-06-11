const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai');

// Set default timeout for all steps    
setDefaultTimeout(2*60000);

Given(`User clicks the main menu`, { timeout: 90000 }, async function () {
    await this.pages.calendarPage.clickMainMenu();
    console.log('User clicked the main menu');
});

Given(`User navigates to MyPortal and selects Calendar`, { timeout: 90000 }, async function () {
    await this.pages.calendarPage.selectCalendarFromPortal();
    console.log('User navigated to MyPortal and selected Calendar');
});

Given(`User clicks the Create Event button`, { timeout: 90000 }, async function () {
    await this.pages.calendarPage.clickCreateEventButton();
    console.log('User clicked the Create Event button');
});

Then(`User verifies the Create Event dialog is open`, { timeout: 90000 }, async function () {
    await this.pages.calendarPage.verifyCreateEventDialog();
    console.log('Create Event dialog is open and verified');
});

Then(`User fills event title with {string}`, { timeout: 90000 }, async function (title) {
    await this.pages.calendarPage.fillTitle(title);
    console.log(`Event title filled with: ${title}`);
});

Then(`User fills event location with {string}`, { timeout: 90000 }, async function (location) {
    await this.pages.calendarPage.fillLocation(location);
    console.log(`Event location filled with: ${location}`);
});

Then(`User fills event start date and time with {string}`, { timeout: 90000 }, async function (startDateTime) {
    await this.pages.calendarPage.fillStartDateTime(startDateTime);
    console.log(`Event start date/time filled with: ${startDateTime}`);
});

Then(`User fills event end date and time with {string}`, { timeout: 90000 }, async function (endDateTime) {
    await this.pages.calendarPage.fillEndDateTime(endDateTime);
    console.log(`Event end date/time filled with: ${endDateTime}`);
});

Then(`User selects visibility as {string}`, { timeout: 90000 }, async function (visibility) {
    await this.pages.calendarPage.selectVisibility(visibility);
    console.log(`Event visibility selected as: ${visibility}`);
});

Then(`User selects event type as {string}`, { timeout: 90000 }, async function (eventType) {
    await this.pages.calendarPage.selectEventType(eventType);
    console.log(`Event type selected as: ${eventType}`);
});

Then(`User selects resources with {string}`, { timeout: 90000 }, async function (resources) {
    await this.pages.calendarPage.selectResources(resources);
    console.log(`Resources selected: ${resources}`);
});

Then(`User fills event description with {string}`, { timeout: 90000 }, async function (description) {
    await this.pages.calendarPage.fillDescription(description);
    console.log(`Event description filled with: ${description}`);
});

Then(`User selects tags as {string}`, { timeout: 90000 }, async function (tags) {
    await this.pages.calendarPage.selectTags(tags);
    console.log(`Tags selected: ${tags}`);
});

Then(`User selects attendees with {string}`, { timeout: 90000 }, async function (attendees) {
    await this.pages.calendarPage.selectAttendees(attendees);
    console.log(`Attendees selected: ${attendees}`);
});

Then(`User selects repeat as {string}`, { timeout: 90000 }, async function (repeat) {
    await this.pages.calendarPage.selectRepeat(repeat);
    console.log(`Repeat selected: ${repeat}`);
});

Then(`User clicks the Create button`, { timeout: 90000 }, async function () {
    await this.pages.calendarPage.clickCreateButton();
    console.log('User clicked the Create button');
});
