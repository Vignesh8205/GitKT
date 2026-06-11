/**
* Class Name: Season page
* 
* Description: 
* this class details about season screen
* 
* @author Prem Kumar
* @version 1.0
* @since 14-01-2025
* @last update 5-03-2025
*/

const DataUtil = require("../utils/dataUtil");

class SeasonPage {

  /**
  * @param {Page} page
  */

  constructor(page) {

    this.page = page;
    this.createSeasonBt = page.locator('//span[@class="e-btn-content"]');
    this.seasonCode = page.locator('//input[@class="e-control e-textbox e-lib e-input"]');
    this.seasonName =page.locator('//input[@id="name"]');
    this.seasonTab = page.locator('//li[@data-uid="4"]');
    this.seasonType = page.locator('//span[@class="e-input-group e-control-wrapper e-ddl e-lib e-keyboard"]');
    this.federation = page.locator('//div[@class="e-multi-select-wrapper e-down-icon"]');
    this.seasonDuration= page.locator('//input[@class="e-input e-lib e-keyboard"]');
    this.description = page.locator('//textarea[@id="description"]');
    this.updateManually = page.locator('//span[@class="e-switch-inner e-switch-active"or @class="e-switch-inner"]');
    this.statusDrp = page.locator('(//span[@role="combobox"])[2]');
    this.updateStatusEnabled = page.locator('//span[@class ="e-switch-off"]');
    this.updateStatusDisabled = page.locator('//span[@class ="e-switch-inner e-switch-active"]');
    this.createSeasonInsideBtn = page.locator('(//span[@class ="e-btn-content"])[2]');
    this.cancel = page.locator('(//span[@class ="e-btn-content"])[1]');
    this.successMessage = page.locator('//div[@class ="e-toast-content"]');
  }

  /**
   * To open season page
   */

  async openSeasonscreen() {

      await this.seasonTab.click();
      console.log('You should able to view season screen')
  };

  /**
   * click on create season button
  */

  async clickOnCreateSeasonButton() {

      await this.createSeasonBt.click();
      console.log("Clicked on Create Competition button");

  }

  /**
   * Enter season code
  */

  async enterSeasonCode(seasonCodes) {

      await this.seasonCode.fill(seasonCodes);
      console.log("Entered season code as",seasonCodes );
  }

  /**
   * Enter season name
  */

  async enterSeasonName(seasonName) {

      await this.seasonName.fill(seasonName);
      console.log("Entered Season name as",seasonName);
  }

  /**
   * Update status manually
  */

  async updateStatusManually(){

      await this.updateManually.click()
      console.log("Update status manually updated");
  }

  /**
   *  For season code, season name, season type, federation, season duration, description
   * update status manually and status
   */

  async toFillSeasonInformation(data){

      let seasonCode = data['Season Code'] + DataUtil.getDateSecondMilliTimestamp()
      let seasonName = data['Season Name'] + DataUtil.getDateSecondMilliTimestamp()
      await this.enterSeasonCode(seasonCode);
      await this.enterSeasonName(seasonName);
      await this.toSelectSeasonDrp('Season Type',data['Season Type']);
      await this.toSelectSeasonDrp('Federation',data['Federation']);
      await this.fillSeasonDuration(data['Season Duration']);
      await this.fillDescription(data['Description']);
      await this.enableDisableToggleBtn(data['Update Status Manually']);
      await this.toSelectSeasonDrp('Status',data['Status']);
  }

  // to select season type and federation dropdown.

  async toSelectSeasonDrp(label, option){

    if(label === "Season Type"){

       await this.seasonType.click();
       await this.page.getByRole('option', { name: option, exact: true }).click();
       console.log("Season Type selected as ",option);

    }else if(label ==="Federation"){

        await this.federation.click();
        await this.page.getByRole('option', { name: option, exact: true }).click();
        console.log("Federation selected as ",option);

    }else if(label ==="Status"){

        await this.statusDrp.click();
        await this.page.getByRole('option', { name: option, exact: true }).click();
         console.log("Status selected as ",option);
    }
  }
/**
  *  To fill season duration
  */
  async fillSeasonDuration(seasonDurations){

      await this.seasonDuration.fill(seasonDurations);
      console.log("Season Duration filled as ",seasonDurations);
  }
/**
* To fill description
*/
  async fillDescription(descriptions){

      await this.description.fill(descriptions)
      console.log("Description filled as ",descriptions);
  }

  /**
   *  To enable or disable toggle button
   */

  async enableDisableToggleBtn(option){

    if(option === 'Enable'){

            await this.updateStatusEnabled.click();
            console.log("Updated status manually enabled");
    }else if(option ==='Disable'){

            await this.updateStatusDisabled.click();
            console.log("Updated status manually disabled");
    }
  }
  /**
   * click on create button
   */
  async clickOnCreateButton() {

      await this.createSeasonInsideBtn.click();
      console.log("Clicked on create button ");
  }

  /**
   * Click on cancel button
   */
  async clickOnCancelButton() {

      await this.cancel.click();
      console.log("Clicked on cancel button ");

  }

  /**
   *  To retrieve a success message and it is called in seasonstep.js
   */

  async getCreateSucessMessage() {

      const message = this.successMessage;
      const text = await message.innerText();
      return text;
  }
}
module.exports = SeasonPage;