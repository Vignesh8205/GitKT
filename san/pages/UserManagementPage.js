/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

const { expect } = require("playwright/test")
const DataUtil = require('../utils/dataUtil')



class UserManagementPage {
    /**
  * @param {Page} page
  */
    constructor(page) {
        this.page = page
        this.menu = this.page.locator('[data-mat-icon-name="gr_portal"]');

        this.settingsTab = this.page.locator('[id="Settings"]');
        this.addNewButton = this.page.locator('[aria-label="Add User progress"]');
        this.userManagementIcon = this.page.locator("//span[contains(@class,'user-management-module-icon')]");
        this.personFirstName = this.page.locator('[id="firstName"]');
        this.personLastName = this.page.locator('[id="lastName"]');
        this.personGenderDropdown = this.page.locator('[id="gender"]');
        this.personDateOfBirth = this.page.locator('[aria-label="datepicker"]');


        this.personEmailID = this.page.locator('[placeholder="Enter Email"]');
        this.personNumber = this.page.locator("//input[contains(@class,'mat-mdc-input-element') and @type='tel']")



        this.userConfirmButton = this.page.locator('[aria-label="Create progress"]');

    }

    // User Management 

    async navigateToUserManagement() {
        await this.settingsTab.waitFor({ state: "visible" })
        await this.settingsTab.click();
        await this.userManagementIcon.waitFor({ state: "visible" })
        await this.userManagementIcon.click();

    }

    //Add the new user 

    async clickOnCreateUser() {
        await this.addNewButton.waitFor({ state: "visible" })
        await this.addNewButton.click();

    }

    // Fill the Person detail 


    async fillPersonFirstName(firstname) {
        await this.personFirstName.fill(firstname);
    }

    async fillPersonLastName(lastname) {
        await this.personLastName.fill(lastname);
    }

async selectUserGenderDropdown(gender) {
    await this.personGenderDropdown.click();

    await this.page.getByRole('option', { name: gender, exact: true }).click();

    await this.page.keyboard.press('Tab');
}


    async setUserDateOfBirth(value) {

        await this.personDateOfBirth.waitFor({ state: 'visible' });
        await this.personDateOfBirth.fill(value);

    }


    async fillPersonDetails(data) {


        await this.fillPersonFirstName(data['First Name']);
        await this.fillPersonLastName(data['Last Name']);

        await this.selectUserGenderDropdown(data['Gender']);

        await this.setUserDateOfBirth(data['Date of Birth'] === "past" ? DataUtil.getPastDate() : data['Date of Birth']);

    }

    // Fill the Contact details 

    async enterBirthEmailID(email) {
        await this.personEmailID.fill(String(email));
    }

    async personContactNumber(Number) {
        await this.personNumber.fill(String(Number));
    }



    async fillContactDetails(data) {

        const emailID = data['Email'] === "random" ? DataUtil.generateRandomEmail() : data['Email']

        await this.enterBirthEmailID(emailID);

        const userPhoneNumber =
            data['Registration Number'] === 'random'
                ? DataUtil.generateRandomNumber()
                : data['Registration Number'];

        await this.personContactNumber(userPhoneNumber);

    }

    async userClickConfirmButton() {
        await this.userConfirmButton.waitFor({ state: "visible" });
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
        await this.userConfirmButton.click();
    }


}

module.exports = UserManagementPage;
