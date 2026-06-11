class LoginPage {
    constructor(page) {
        this.page = page;
        // Page selectors based on the provided HTML structure 
        this.selectors = {
            // Form elements
            usernameInput: '//input[@id="username"]',
            passwordInput: '//input[@id="password"]',
            loginButton: 'input[type="submit"]',

            // select role elements
            rbfaOption: "//b[normalize-space()='RBFA']",
            seasonDropDown: "//span[@role='combobox']",
            SeasonOption: "//li[contains(@class, 'e-list-item')]",
            confirmationButton: "//span[@class='e-btn-content' and normalize-space()='Confirm']",
            mainMenu: "//div[@class='mat-mdc-menu-trigger p-5 portal-button h-full flex items-center justify-center']",
            competitionManagementMenu: "//span[text()='Competition Management']",
            divisionTab: "//span[text()='Division']",
            createDivisionButton: "//span[text()='Create Division']",
            editModeIcon: "[class*='e-edit e-icons']",

            //Create Division 

            enterDivisionCode: "//input[@class='e-control e-textbox e-lib e-input']",
            enterDivisionName: "//input[@id='name']",
            dropdownDivisionCat: "//span[@class='e-input-group e-control-wrapper e-ddl e-lib e-keyboard e-error']",
            dropdownSearchDivision: "//div[@class='cdk-overlay-container']",
            dropdownFormat: "//span[@class='e-input-group e-control-wrapper e-disabled e-ddl e-lib e-keyboard']",
            dropdownRegion: "(//span[@aria-label='dropdownlist'])[3]",
            dropdownFederation: "(//span[@aria-label='dropdownlist'])[4]"


        };

        this.seasonDropDown = page.locator("//span[@role='combobox']")
    }

    /**
    * Navigate to the login page
    */
    async navigateToLoginPage(baseUrl) {
        try {
            console.log(`Navigating to: ${baseUrl}`);
            await this.page.goto(baseUrl, { waitUntil: 'networkidle' });
            console.log('Page loaded successfully');
            await this.page.waitForLoadState('domcontentloaded');
            console.log('Page is ready');
        } catch (error) {
            console.error('Failed to navigate to page:', error.message);
            throw error;
        }
    }

    /**
    * Wait for the login form to be visible
    */
    async waitForLoginForm(timeout = 5000) {
        try {
            await this.page.waitForSelector(this.selectors.form, { timeout });
            console.log('Login form found');
        } catch (error) {
            console.log('Login form not found, continuing with test');
        }
    }

    /**
    * Check if login form is visible
    */
    async isLoginFormVisible() {
        return await this.page.isVisible(this.selectors.form);
    }

    /**
    * Get the login page title
    */
    async getLoginTitle() {
        try {
            return await this.page.textContent(this.selectors.loginTitle, { timeout: 5000 });
        } catch (error) {
            console.log('Login title selector not found:', error.message);
            return null;
        }
    }

    /**
    * Enter username in the username field
    */
    async enterUsername(username) {
        const field = this.page.locator(this.selectors.usernameInput);
        const visible = await field.waitFor({ state: 'visible', timeout: 15000 }).then(() => true).catch(() => false);
        if (!visible) { console.log('Username field not visible — SSO session active, skipping'); return; }
        await field.fill(username);
        console.log('Username entered');
    }

    /**
    * Enter password in the password field
    */
    async enterPassword(password) {
        const field = this.page.locator(this.selectors.passwordInput);
        const visible = await field.waitFor({ state: 'visible', timeout: 15000 }).then(() => true).catch(() => false);
        if (!visible) { console.log('Password field not visible — SSO session active, skipping'); return; }
        await field.fill(password);
        console.log('Password entered');
    }

    /**
    * Clear the username field
    */
    async clearUsername() {
        try {
            console.log("Attempting to clear username field...");
            await this.page.waitForSelector(this.selectors.usernameInput, { state: 'visible', timeout: 10000 });
            await this.page.fill(this.selectors.usernameInput, '');
            console.log("Username field cleared successfully");
        } catch (error) {
            console.error(`Failed to clear username field: ${error.message}`);
            throw error;
        }
    }

    /**
    * Clear the password field
    */
    async clearPassword() {
        try {
            console.log("Attempting to clear password field...");
            await this.page.waitForSelector(this.selectors.passwordInput, { state: 'visible', timeout: 10000 });
            await this.page.fill(this.selectors.passwordInput, '');
            console.log("Password field cleared successfully");
        } catch (error) {
            console.error(`Failed to clear password field: ${error.message}`);
            throw error;
        }
    }

    /**
    * Get the current value of username field
    */
    async getUsernameValue() {
        return await this.page.inputValue(this.selectors.usernameInput);
    }

    /**
    * Get the current value of password field
    */
    async getPasswordValue() {
        return await this.page.inputValue(this.selectors.passwordInput);
    }

    /**
    * Click the login button
    */
    async clickLoginButton() {
        const loginBtn = this.page.locator(this.selectors.loginButton);
        const visible = await loginBtn.waitFor({ state: 'visible', timeout: 15000 }).then(() => true).catch(() => false);
        if (!visible) {
            console.log('Login button not visible — SSO session active, skipping login click');
            await this.page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => {});
            return;
        }
        await loginBtn.click();
        console.log('Login button clicked');
        await this.page.waitForLoadState('domcontentloaded', { timeout: 60000 }).catch(() => {});
        await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    }

    /**
    * Click the cancel button
    */
    async clickCancelButton() {
        await this.page.click(this.selectors.cancelButton);
    }

    /**
    * Click the forgot password link
    */
    async clickForgotPasswordLink() {
        await this.page.click(this.selectors.forgotPasswordLink);
    }

    /**
    * Check if error message is visible
    */
    async isErrorMessageVisible(timeout = 5000) {
        try {
            await this.page.waitForSelector(this.selectors.errorMessage, { timeout });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
    * Get error message text
    */
    async getErrorMessage() {
        if (await this.isErrorMessageVisible()) {
            return await this.page.textContent(this.selectors.errorMessage);
        }
        return null;
    }

    /**
    * Get all error messages
    */
    async getAllErrorMessages() {
        return await this.page.$$(this.selectors.errorMessage);
    }

    /**
    * Check if username field is empty
    */
    async isUsernameEmpty() {
        const value = await this.getUsernameValue();
        return value === '';
    }

    /**
    * Check if password field is empty
    */
    async isPasswordEmpty() {
        const value = await this.getPasswordValue();
        return value === '';
    }

    /**
    * Wait for navigation after login
    */
    async waitForNavigation(timeout = 10000) {
        try {
            await this.page.waitForLoadState('networkidle', { timeout });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
    * Get current page URL
    */
    async getCurrentUrl() {
        return this.page.url();
    }

    /**
    * Take screenshot of the login page
    */
    async takeScreenshot(name) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${name}-${timestamp}.png`;
        const filepath = `screenshots/${filename}`;
        await this.page.screenshot({ path: filepath, fullPage: true });
        return filepath;
    }

    /**
    * Check if all form elements are present
    */
    async areFormElementsPresent() {
        const elements = [
            this.selectors.usernameInput,
            this.selectors.passwordInput,
            this.selectors.loginButton,
            this.selectors.forgotPasswordLink
        ];

        for (const selector of elements) {
            const isVisible = await this.page.isVisible(selector);
            if (!isVisible) {
                return false;
            }
        }
        return true;
    }

    /**
    * Get form element states
    */
    async getFormElementStates() {
        return {
            usernameField: await this.page.isVisible(this.selectors.usernameInput),
            passwordField: await this.page.isVisible(this.selectors.passwordInput),
            loginButton: await this.page.isVisible(this.selectors.loginButton),

        };
    }

    //User select the Role
    async selectRBFAUser() {
        console.log(`[selectRBFAUser] Current URL: ${this.page.url()}`);
        // Wait for Keycloak redirect to the app before looking for role selection
        await this.page.waitForURL('**/grassroots/**', { timeout: 30000 }).catch(() => {
            console.log(`[selectRBFAUser] URL did not change to app path. Current URL: ${this.page.url()}`);
        });
        console.log(`[selectRBFAUser] URL after redirect wait: ${this.page.url()}`);
        try {
            await this.page.waitForSelector(this.selectors.rbfaOption, { timeout: 80000 });
        } catch (e) {
            const screenshotPath = `screenshots/rbfa-missing-${Date.now()}.png`;
            await this.page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => {});
            console.log(`[selectRBFAUser] RBFA element not found. Screenshot: ${screenshotPath}. URL: ${this.page.url()}`);
            throw e;
        }
        await this.page.click(this.selectors.rbfaOption);
        console.log('✓ RBFA role selected');
    }

    //User select the season on season dropdown

    async userSelectDropdown() {
        await this.page.waitForSelector(this.selectors.seasonDropDown, { timeout: 90000 });
        await this.page.click(this.selectors.seasonDropDown);

    }
    // User select the season for eg UIAutomation season 

    async userSelectSeasonOption() {
        await this.page.waitForSelector(this.selectors.SeasonOption, { timeout: 30000 });
        await this.page.click(this.selectors.SeasonOption);

    }

    async clickRoleConfirmButton() {
        await this.page.waitForSelector(this.selectors.confirmationButton, { timeout: 10000 });
        await this.page.click(this.selectors.confirmationButton);

    }
    //Competition Management  
    async userAccessMaimenu() {
        await this.page.waitForSelector(this.selectors.mainMenu, { timeout: 10000 });
        await this.page.click(this.selectors.mainMenu);

    }

    async userAccessCompetitionManagementPgae() {
        await this.page.waitForSelector(this.selectors.competitionManagementMenu, { timeout: 10000 });
        await this.page.click(this.selectors.competitionManagementMenu);

    }

    async userSelectDivisionTab() {
        await this.page.waitForSelector(this.selectors.divisionTab, { timeout: 10000 });
        await this.page.click(this.selectors.divisionTab);
    }

    async userAccessEditModeButton(){
        const editBtn = this.page.locator(this.selectors.editModeIcon).filter({ visible: true }).first();
        await editBtn.waitFor({ state: 'visible', timeout: 15000 });
        await editBtn.click();
    }
    async userCreateDivisionPage() {
        
        await this.page.waitForSelector(this.selectors.createDivisionButton, { timeout: 10000 });
        await this.page.click(this.selectors.createDivisionButton);

    }


    /**
  * Select a season by visible text.
  * @param option 
  */
    async selectSeason(option) {
        await this.seasonDropDown.click();
        const optionByRole = this.page.getByRole('option', { name: option, exact: true });
        if (await optionByRole.count() > 2) {
            await optionByRole.first().click();
        } else {
            await this.page.getByText(option, { exact: true }).click();
        }

    }


}
module.exports = LoginPage;








