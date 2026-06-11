/**
* Class Name: Data Sets
* 
* Description: 
* this class details about data sets screen
* 
* @author Prem Kumar
* @version 1.0
* @since 13-02-2025
* @last update 14-02-2025
*/

const DataUtil = require("../utils/dataUtil");

class DataSetsPage {

  constructor(page) {

    this.page = page;
    this.settings =page.locator('//span[contains(text(),"Settings")]');
    this.addButton = page.locator('//span[@class="e-tbar-btn-text" and contains(text(), "Add") ]');
    this.nameRow = page.locator('//input[@name="name"]');
    this.updateBtn = page.locator('//span[@class="e-tbar-btn-text" and contains(text(), "Update") ]');
    this.bottomMessage = page.locator("//div[@class='e-toast-content']");
    
  }

  async chooseModule(moduleName){

    if(moduleName === 'Settings'){

        this.settings.click();
        console.log("Clicked on Settings module");

    } else{
        console.log(`Mention screen not available`);
    }

  }

  async clickOnButton(buttonName){

    switch(buttonName){

      case "Add":

          await this.addButton.click();

      default:
            
          console.log("Given label not belong to create data sets button");
    }

  }

  async enterRowValue(name){

        this.nameRow.fill(name)
        console.log("Entered name as ",name);
  }

  async clickOnRowWiseButton(buttonName){

    switch(buttonName){

      case"Update":

          await this.updateBtn.click();

      default:
            
          console.log("Given label not belong to create data sets button");
    }

  }
   async verifyMessage(){

      return await this.bottomMessage.innerText();   

   }
}
module.exports = DataSetsPage;