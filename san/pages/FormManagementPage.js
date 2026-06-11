class FormManagementPage {
    constructor(page) {
          this.page = page;

          this.mainMenu = page.locator('[data-mat-icon-name="gr_portal"]');
          this.formManagement = page.locator('//*[@data-mat-icon-name="gr_form"]/following-sibling::span');
          this.formBuilder = page.locator("//div[text()='Form Builder']");
          this.createNewFormButton = page.locator("//span[text()='Create New Form']");
          this.standardLayout = page.locator("//div[text()='Standard Layout ']");
          this.standardLayoutConfirmButton = page.locator("//span[text()='Confirm']");
          this.templateName = page.locator("//input[@class='e-control e-textbox e-lib e-input']");
          // Text xpath 
          this.formText = page.locator("//div[text()='Text ']");
          this.textSetting = page.locator("[class='cursor-pointer ng-tns-c3020729163-7 ng-star-inserted']");
        
          

    }

    async clickMainMenu() {
        await this.mainMenu.click();
    }

    async clickFormManagement() {
        await this.formManagement.click();
    }

    async clickFormBuilder() {
        await this.formBuilder.click();
    }

    async clickCreateNewForm() {
        await this.createNewFormButton.click();
    }

    async clickStandardLayout() {
        await this.standardLayout.click();
        await this.standardLayoutConfirmButton.click();
    }

    //Form Text element

    async clickTextElement() {
        await this.formText.click();
        await this.textSetting.click();
        
    }

    } 
  module.exports = FormManagementPage;