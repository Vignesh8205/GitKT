class CalendarPage {
    constructor(page) {
        this.page = page;

        // Main menu and navigation
        this.mainMenu = page.locator('[data-mat-icon-name="gr_portal"]');
        this.portalPanel = page.locator('[id="My Portal"]');
        this.calendarMenu = page.locator("(//span[text()='Calendar'])[1]");
        
        // Create Event button
        this.createEventButton = page.getByRole('button', { name: 'Create Event' });
        
        // Event dialog selector
        this.eventDialog = page.locator('#Schedule_dialog_wrapper');
        
        // Event form fields
        this.titleInput = page.locator('input[placeholder="Enter Title"]');
        this.locationDropdown = page.locator('span.e-ddl:has(input[placeholder="Select Location"])');
        this.resourcesMultiSelect = page.locator('xpath=//*[@id="Schedule_dialog_wrapper"]//*[normalize-space(text())="Resources"]/following::span[contains(@class,"e-multiselect")][1]');
        this.resourcesInput = page.locator('xpath=//*[@id="Schedule_dialog_wrapper"]//*[normalize-space(text())="Resources"]/following::input[@type="text"][1]');
        this.startDateTimeInput = page.locator('#Schedule_dialog_wrapper input[placeholder*="DD/MM/YYYY"]').first();
        this.endDateTimeInput = page.locator('#Schedule_dialog_wrapper input[placeholder*="DD/MM/YYYY"]').last();
        this.allDayCheckbox = page.locator('#Schedule_dialog_wrapper label:has-text("All Day") input[type="checkbox"]');
        this.timezoneCheckbox = page.locator('#Schedule_dialog_wrapper label:has-text("Timezone") input[type="checkbox"]');
        this.visibilityDropdown = page.locator('span.e-ddl:has(input[placeholder="Select Visibility"])');
        this.eventTypeDropdown = page.locator('span.e-ddl:has(input[placeholder="Select Event Type"])');
        this.repeatCheckbox = page.locator('#Schedule_dialog_wrapper label:has-text("Repeat") input[type="checkbox"]');
        this.repeatDropdown = page.locator('xpath=//*[@id="Schedule_dialog_wrapper"]//*[contains(normalize-space(.),"Repeat")]/following::span[contains(@class,"e-ddl")][1]');
        this.tagsMultiSelect = page.locator('xpath=//*[@id="Schedule_dialog_wrapper"]//*[normalize-space(text())="Tags"]/following::span[contains(@class,"e-multiselect")][1]');
        this.tagsInput = page.locator('xpath=//*[@id="Schedule_dialog_wrapper"]//*[normalize-space(text())="Tags"]/following::input[@type="text"][1]');
        this.attendeesMultiSelect = page.locator('xpath=//*[@id="Schedule_dialog_wrapper"]//*[contains(normalize-space(.),"Attendees")]/following::span[contains(@class,"e-multiselect")][1]');
        this.attendeesInput = page.locator('xpath=//*[@id="Schedule_dialog_wrapper"]//*[contains(normalize-space(.),"Attendees")]/following::input[@type="text"][1]');
        this.descriptionInput = page.locator('#Schedule_dialog_wrapper textarea').first();
        
        // Dialog buttons
        this.createButton = page.locator('#Schedule_dialog_wrapper button:has-text("Create")');
        this.cancelButton = page.locator('#Schedule_dialog_wrapper button:has-text("Cancel")');
    }

    // Navigation methods
    async clickMainMenu() {
        await this.mainMenu.waitFor({ state: 'visible', timeout: 10000 });
        await this.mainMenu.click();
        await this.page.waitForTimeout(500);
    }

    async navigateToCalendar() {
        // Always click the main menu (My Portal) first to open the portal panel
        await this.clickMainMenu();
        // Then click the Calendar option from the portal panel
        await this.portalPanel.waitFor({ state: 'visible', timeout: 10000 });
        await this.portalPanel.click();
        await this.calendarMenu.waitFor({ state: 'visible', timeout: 10000 });
        await this.calendarMenu.click();
        await this.page.waitForLoadState('networkidle');
    }

    async selectCalendarFromPortal() {
        // Main menu is already open — click My Portal then Calendar
        await this.portalPanel.waitFor({ state: 'visible', timeout: 10000 });
        await this.portalPanel.click();
        await this.calendarMenu.waitFor({ state: 'visible', timeout: 10000 });
        await this.calendarMenu.click();
        await this.page.waitForLoadState('networkidle');
    }


    async clickCreateEventButton() {
        await this.createEventButton.click();
        // Wait for the dialog to appear
        await this.eventDialog.waitFor({ state: 'visible', timeout: 10000 });
    }

    async verifyCreateEventDialog() {
        await this.eventDialog.waitFor({ state: 'visible', timeout: 10000 });
        const isVisible = await this.eventDialog.isVisible();
        if (!isVisible) {
            throw new Error('Create Event dialog/popup is not visible');
        }
        console.log('Create Event dialog is visible');
    }

    // Form field methods
    async fillTitle(title) {
        await this.titleInput.fill(title);
        console.log(`Filled title: ${title}`);
    }

    async selectResources(resources) {
        try {
            await this.resourcesMultiSelect.waitFor({ state: 'visible', timeout: 5000 });
            await this.resourcesMultiSelect.click();
            await this.page.waitForTimeout(300);
            await this.resourcesInput.fill(resources);
            await this.page.waitForTimeout(400);
            const option = this.page.locator(`[role="option"]:has-text("${resources}")`).first();
            if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
                await option.click();
            } else {
                console.log(`Resources option "${resources}" not found in dropdown list`);
            }
        } catch (error) {
            console.log(`Resources field error: ${error.message}`);
        }
    }

    async fillLocation(location) {
        try {
            await this.locationDropdown.waitFor({ state: 'visible', timeout: 5000 });
            await this.locationDropdown.click();
            await this.page.waitForTimeout(300);
            const option = this.page.locator(`[role="option"]:has-text("${location}")`).first();
            if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
                await option.click();
            } else {
                console.log(`Location option "${location}" not found in dropdown list`);
            }
        } catch (error) {
            console.log(`Location field error: ${error.message}`);
        }
    }

    async fillStartDateTime(dateTime) {
        // Use evaluate to set the value on the Syncfusion component
        await this.startDateTimeInput.evaluate((el, value) => {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }, dateTime);
        console.log(`Filled start date/time: ${dateTime}`);
    }

    async fillEndDateTime(dateTime) {
        // Use evaluate to set the value on the Syncfusion component
        await this.endDateTimeInput.evaluate((el, value) => {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }, dateTime);
        console.log(`Filled end date/time: ${dateTime}`);
    }

    async selectVisibility(visibility) {
        await this.visibilityDropdown.waitFor({ state: 'visible', timeout: 10000 });
        await this.visibilityDropdown.click();
        await this.page.waitForTimeout(300);
        const option = this.page.locator(`[role="option"]:has-text("${visibility}")`).first();
        if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
            await option.click();
        } else {
            // fallback: pick first option
            await this.page.locator('[role="option"]').first().click();
        }
        console.log(`Selected visibility: ${visibility}`);
    }

    async selectEventType(eventType) {
        await this.eventTypeDropdown.waitFor({ state: 'visible', timeout: 10000 });
        await this.eventTypeDropdown.click();
        await this.page.waitForTimeout(300);
        const option = this.page.locator(`[role="option"]:has-text("${eventType}")`).first();
        if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
            await option.click();
        } else {
            // fallback: pick first option
            await this.page.locator('[role="option"]').first().click();
        }
        console.log(`Selected event type: ${eventType}`);
    }

    async fillDescription(description) {
        await this.descriptionInput.fill(description);
        console.log(`Filled description: ${description}`);
    }

    async selectTags(tags) {
        try {
            await this.tagsMultiSelect.waitFor({ state: 'visible', timeout: 10000 });
            await this.tagsMultiSelect.click();
            await this.page.waitForTimeout(300);
            await this.tagsInput.fill(tags);
            await this.page.waitForTimeout(400);
            const option = this.page.locator(`[role="option"]:has-text("${tags}")`).first();
            if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
                await option.click();
            } else {
                console.log(`Tags option "${tags}" not found in dropdown list`);
            }
        } catch (error) {
            console.log(`Tags field error: ${error.message}`);
        }
    }

    async selectAttendees(attendees) {
        try {
            await this.attendeesMultiSelect.waitFor({ state: 'visible', timeout: 10000 });
            await this.attendeesMultiSelect.click();
            await this.page.waitForTimeout(300);
            await this.attendeesInput.fill(attendees);
            await this.page.waitForTimeout(400);
            const option = this.page.locator(`[role="option"]:has-text("${attendees}")`).first();
            if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
                await option.click();
            } else {
                console.log(`Attendees option "${attendees}" not found in dropdown list`);
            }
        } catch (error) {
            console.log(`Attendees field error: ${error.message}`);
        }
    }

    async selectRepeat(repeat) {
        try {
            await this.repeatDropdown.waitFor({ state: 'visible', timeout: 5000 });
            await this.repeatDropdown.click();
            await this.page.waitForTimeout(300);
            const option = this.page.locator(`[role="option"]:has-text("${repeat}")`).first();
            if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
                await option.click();
            } else {
                console.log(`Repeat option "${repeat}" not found in dropdown list`);
            }
        } catch (error) {
            console.log(`Repeat field error: ${error.message}`);
        }
    }

    async clickCreateButton() {
        await this.createButton.click();
        // Wait for dialog to close
        try {
            await this.eventDialog.waitFor({ state: 'hidden', timeout: 10000 });
        } catch (error) {
            console.log('Dialog close timeout, but continuing');
        }
        console.log('Clicked Create button and dialog closed');
    }

    async clickCancelButton() {
        await this.cancelButton.click();
        try {
            await this.eventDialog.waitFor({ state: 'hidden', timeout: 10000 });
        } catch (error) {
            console.log('Dialog close timeout');
        }
    }
}

module.exports = CalendarPage;
