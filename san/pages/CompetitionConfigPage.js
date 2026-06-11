/**
* Class Name: CompetitionConfigPage
* 
* Description: 
* this class details about competition configuration screen
* 
* @author Prem Kumar
* @version 1.0
* @since 1-12-2025
*/

/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */


const DataUtil = require("../utils/dataUtil");
const { saveData } = require('../utils/shareData');
let totalTeams=0;

class CompetitionConfigPage{
    /**
  * @param {Page} page
  */

    constructor(page) {

        this.page = page;

        //Competition Information tab
        this.competitionConfigurationTab= page.locator("//div[@class='e-tab-text']//div[contains(text(),' Competition Configuration')]");
        this.createCompetitionConfigurationBtn = page.locator("//span[contains(text(),'Create Competition Configuration')]");
        this.competitionCodeTxt = page.locator("//input[@name='name_competitionCode']");
        this.competitionName = page.locator("//input[@name='name_competitionName']");
        this.competitionTypeDrp = page.locator("(//span[@class='e-input-group e-control-wrapper e-ddl e-lib e-keyboard'])[1]");
        this.competitionLevelDrp = page.locator("(//span[@class='e-input-group e-control-wrapper e-ddl e-lib e-keyboard'])[1]");
        this.divisionDrp = page.locator("(//span[@class='e-input-group e-control-wrapper e-ddl e-lib e-keyboard'])");
        this.oragnizationDrp = page.locator("(//span[@role='combobox'])[8]"); 
        this.description = page.locator("//textarea[@id='description']");
        this.nextBtn= page.locator("//span[contains(text(),'Next')]");
        this.cancelBtn = page.locator("//span[contains(text(),'Cancel')]")

        // Competition Phase tab 

        this.addCompetitionPhase = page.locator("//span[contains(text(),'Add Competition Phase')]");
        this.competitionPhaseOrderTxt= page.locator('//input[@name="name_competitionPhaseOrder"]');
        this.competitionPhaseNameTxt =page.locator('//input[@name="name_competitionPhaseName"]');
        this.totalTeamsTxt= page.locator('//input[@name="name_totalTeam"]');
        this.matchGridTxt = page.locator('//span[@aria-describedby="matchGrid"]');
        this.generalRankingDrp = page.locator('//span[@aria-controls="generalRanking"or @aria-describedby="generalRanking"]');
        this.periodRankingDrp = page.locator('//span[@aria-controls="periodRanking"or @aria-describedby="periodRanking"]');
        this.fairplayRankingDrp = page.locator('//span[@aria-controls="fairplayRanking"or @aria-describedby="fairplayRanking"]');
        this.fairplayScoringWindowTxt =page.locator('//input[@name="name_fairplayScoringWindow"]');
        this.confirmBtn = page.locator('//span[contains(text(),"Confirm")]');
        this.addCompetitionPhaseCancelBtn =page.locator('(//span[@class="e-btn-content"])[5]//span'); 
        this.CompetitionConfigurationCreatedSuccessfullyMessage = page.locator('//*[@class="e-toast-content"]');
        this.CompetitionPhaseCreatedSuccessfullyMessage = page.locator('//*[@class="e-toast-content"]');
        this.createCompetitionConfigurationBtnInside =page.getByRole('button', { name: /Create Competition Configuration/i });

        //update home tab
        this.firstRow =page.locator("(//tbody[@role='rowgroup']//tr[@aria-rowindex='1'])[2]");
        this.updateCompetitionTypeDrp = page.locator("(//span[@class='e-input-group e-control-wrapper e-ddl e-lib e-keyboard e-valid-input'])[1]");
        this.updateCompetitionLevelDrps = page.locator("(//span[@class='e-input-group e-control-wrapper e-ddl e-lib e-keyboard e-valid-input'])[1]");
        this.updateDivisionDrp = page.locator("//span[@aria-describedby='divisionId']");

        this.updateDescription = page.locator("//textarea[@id='description']");
        this.updateBtn = page.locator("//span[contains(text(),'Update')]");
        this.updateCancelBtn = page.locator("//span[contains(text(),'Cancel')]");
        this.updatedCompetitionConfigurationMess =page.locator("//*[@class='e-toast-content']")

        //Update competition Phase tab
        this.competitionPhaseTab = page.locator("//div[@class='e-text-wrap']//div[contains(text(),' Competition Phase ')]");
        this.firstRowCompetitionPhase = page.locator("(//button[@title='Edit']//span)[1]");
        this.updateButton = page.locator("//span[contains(text(),'Update')]");
        this.updatedCompetitionPhaseSuccessMes = page.locator("//*[@class='e-toast-content']");

        //actions panel
        this.actionsIcon =page.locator("//div[starts-with(@class,'p-1 rounded-xl pb-2.5 ng-tns-c')]//div//span[contains(text(),'Actions')]")
        this.activateBtn =page.locator("//div[@class='m-5 flex flex-col gap-4 ng-star-inserted']//*[contains(text(),'Activate')]");
        this.deactivateBtn =page.locator("//div[@class='m-5 flex flex-col gap-4 ng-star-inserted']//*[contains(text(),'Deactivate')]");
        this.deleteBtn = page.locator("//div[@class='m-5 flex flex-col gap-4 ng-star-inserted']//*[contains(text(),'Delete')]");


        // competition configuration dialog box
        this.confirmButton =page.locator("//div[@class='e-footer-content']//*[contains(text(),'Confirm')]");
        this.cancelButton = page.locator("//div[@class='e-footer-content']//*[contains(text(),'Cancel')]");

        //message Information
        this.Message =page.locator("//div[@class='e-toast-content']");

    }

    /**
     * Click on Competition Configuration Tab
     */
    async clickOnCompetitionConfigurationTab(){

         await this.competitionConfigurationTab.waitFor({state: 'visible', timeout:2000});
         try{
         await this.competitionConfigurationTab.click();
         console.log('Clicked on Competition Configuration tab');
         } catch(error){

          console.log(`Unable to click on competition configuration: ${error.message}`);
         }

    };

    /**
     * Click on Create Competition Configuration button
     */
    async clickOnCreateCompetitionConfigurationBtn(){

         await this.createCompetitionConfigurationBtn.waitFor({state: 'visible', timeout:2000});
         await this.createCompetitionConfigurationBtn.click();
         console.log('Clicked on create competition configuration button')
    }

    /**
     * To enter competition code and it's generated using getRandomAlphanumeric
     */
    async enterCompetitionCode(){

        // await this.competitionCodeTxt.waitFor({state:'visible',timeout:5000});
         let competitionCode;

             try{

               this.competitionCode ='Com'+DataUtil.getDateSecondMilliTimestamp();
                saveData({ competitionCode: this.competitionCode });

              await this.competitionCodeTxt.fill(this.competitionCode);
              console.log('Entered competition code as ',competitionCode);

            } catch(error){

              console.log(`Unable to enter competition code: ${error.message}`);
            }

       
    }

   /**
    *  To enter competition name and it is generated using getRandomAlphanumeric
    */
   async enterCompetitionName(){

         let competitionNames;
         await this.competitionName.waitFor({state:'visible',timeout:5000});

             try{


                competitionNames= "Com"+DataUtil.getDateSecondMilliTimestamp();
                await  this.competitionName.fill(competitionNames);
                 console.log('Entered competition Name as',competitionNames);

            } catch(error){

                  console.log(`Unable to enter competition name:${error.message}`);

            }    


    };

   /**
    *  To select competition type 
    */

    async selectCompetitionType(competitionType){


         await this.competitionTypeDrp.waitFor({state:'visible',timeout:5000});

            try{

                 await this.competitionTypeDrp.click();
                 await this.page.keyboard.type(competitionType, { delay: 100 });
                 await this.page.keyboard.press('ArrowDown');
                 await this.page.keyboard.press('Enter');
                 console.log('Selected competition type as',competitionType);

            }  catch(error){

                console.log(`Unable to select competition type:${error.message}`);
            }
    };

   /**
    * To select competiton level
    */

    async selectCompetitionLevel(competitionLevel){

        await this.competitionLevelDrp.waitFor({state:'visible',timeout:5000});

            try {

                 await this.competitionLevelDrp.click();
                 await this.page.keyboard.type(competitionLevel, { delay: 100 });
                 await this.page.keyboard.press('ArrowDown');
                 await this.page.keyboard.press('Enter');
                 console.log('Selected competition level as',competitionLevel);

            } catch(error){

                 console.log(`Unable to select competition level:${error.message}`);
            }

    };

   /**
    * To select division
    */
   async selectDivision(division){

         await this.divisionDrp.waitFor({state:'visible',timeout:5000});

             try{

                 await this.divisionDrp.click();
                 await this.page.keyboard.type(division,{delay:100})
                 await this.page.keyboard.press('ArrowDown');
                 await this.page.keyboard.press('Enter');
                 console.log('Selected division as ',division);

            } catch(error){

                 console.log(`Unable to select division:${error.message}`);
             }

    }

   /**
    * To select organization
    */
   async selectOrganization(option){

       try{

             await this.oragnizationDrp.waitFor({state:'visible',timeout:5000});
             await this.oragnizationDrp.click();
             const options= await this.page.locator(`text=${option}`).click();
             console.log('Selected organization as',option);

        } catch(error){

             console.log(`Unable to select oragnization:  ${error.message}`);
        }

    };

   /**
    * Add description
    */

   async enterDescription(descriptions){

       // let descriptions;

            try{

                    //descriptions =DataUtil.getRandomAlphaNumeric();
                    await this.description.waitFor({state:'visible',timeout:5000});
                    await this.description.fill(descriptions);
                    console.log('Entered description as ',descriptions);

            } catch(error){

                    console.log(`Unable to enter description:${error.message}`);

             }
   }

   /**
    * To click Next button
    */

    async clickOnNextBtn(){

            try{
                    await this.nextBtn.waitFor({state:'visible', timeout: 5000});
                    await this.nextBtn.click();
                    console.log('Clicked on next button');
            } catch(error){

                    console.log(`Unabe to click on next button :  ${error.message}`);
                } 
    }

   /**
    * click on Add Competition Phase button
    */

   async clickOnAddCompetitionPhase(){

         try{
                 await this.addCompetitionPhase.waitFor({state:'visible', timeout: 5000});
                 await this.addCompetitionPhase.click();
                 console.log("Clicked on add competition Phase button");

            } catch(error){

                 console.log(`Unable to click on add competition phase button :  ${error.message}`);
            }
    }

   /**
    * To enter competition phase competitionPhaseOrder using DataUtil.js
    * Generate value based on minimum value and maximum value
    * e.g minimum value is 5 and maximum value is 10. the value will be generated between 5 to 10.
    */
   async enterCompetitionPhaseOrder(){

        let competitionPhaseOder;

            try{

                     competitionPhaseOder= DataUtil.getRandomNumber(1,10);
                     await this.competitionPhaseOrderTxt.waitFor({state:'visible', timeout: 5000});
                     await this.competitionPhaseOrderTxt.fill(competitionPhaseOder);
                     console.log("Entered competition phase order as",competitionPhaseOder )

            } catch (error){

                     console.log(`Unable to enter competition phase order:  ${error.message}`);
            }
   }

   /**
    * To enter competition phase name
    * Generate using getRandomAlphaNumeric() 
    */

   async enterCompetitionPhaseName(){

         let competitionPhaseName;

            try{
                     competitionPhaseName = "CompPhase "+ DataUtil.getDateSecondMilliTimestamp();
                     await this.competitionPhaseNameTxt.waitFor({state:'visible', timeout:5000});
                     await this.competitionPhaseNameTxt.fill(competitionPhaseName);
                     console.log("Entered competition phase name as", competitionPhaseName);

                } catch(error){

                    console.log(`Unable to enter competition phase name:  ${error.message}`);
                }
   }

   /**
    *  To enter total teams
    *  Generated using getRandomNumber()
    */

   async enterTotalTeams(){

        try{
                 totalTeams =DataUtil.getEvenNumber();
                 await this.totalTeamsTxt.waitFor({state:'visible',timeout:5000});
                 await this.totalTeamsTxt.fill(totalTeams);
                 console.log("Entered total teams as",totalTeams);

            } catch(error){

                 console.log(`Unable to enter total teams:  ${error.message}`);

            }
   }

   async selectMatchGrid(){

    await this.matchGridTxt.waitFor({state:'visible', timeout:5000});

         try{

                 //await this.matchGridTxt.fill('e');
                 await this.matchGridTxt.click();
                 await this.page.keyboard.press('Enter');
                 console.log("Selected match gird for team for",totalTeams);

            } catch(error){

                 console.log(`Unable to select match grid for team :  ${error.message}`);

            }
   }


   async selectGeneralRanking(generalRanking){

        await this.generalRankingDrp.waitFor({state:'visible',timeout:5000});

            try{

                     await this.generalRankingDrp.click();
                     await this.page.keyboard.type(generalRanking,{delay:100})
                     await this.page.keyboard.press('ArrowDown');
                     await this.page.keyboard.press('Enter');
                    console.log("Selected general ranking as",generalRanking)

            } catch(error){

                 console.log(`Unable to select general ranking :  ${error.message}`);
            }
   }

   async selectPeroidRanking(periodRanking){

        await this.periodRankingDrp.waitFor({state:'visible',timeout:5000});

            try{

                 await this.periodRankingDrp.click();
                 await this.page.keyboard.type(periodRanking,{delay:100})
                 await this.page.keyboard.press('ArrowDown');
                 await this.page.keyboard.press('Enter');
                 console.log("Selected peroid ranking as",periodRanking);

            } catch(error){

                 console.log(`Unable to select peroid ranking :  ${error.message}`);
            }
   }

   async selectFairplayRanking(fairplayRankig){

        await this.fairplayRankingDrp.waitFor({state:'visible', timeout:5000});

            try{

                 await this.fairplayRankingDrp.click();
                 await this.page.keyboard.type(fairplayRankig,{delay:100})
                 await this.page.keyboard.press('ArrowDown');
                 await this.page.keyboard.press('Enter');
                 console.log("Selected fairplay ranking as",fairplayRankig);

            } catch(error){

                 console.log(`Unable to select fairplay ranking :  ${error.message}`);
            }
   }

   async enterFairplayScoringWindow(){

        let fairPlayScorningWindow;

            try{

                 fairPlayScorningWindow = DataUtil.getRandomNumber(10,15);
                 await this.fairplayScoringWindowTxt.waitFor({state:'visible',timeout:5000});
                 await this.fairplayScoringWindowTxt.fill(fairPlayScorningWindow);
                 console.log("Entered fairplay scoring window as",fairPlayScorningWindow);

            } catch(error){

                 console.log(`Unable to enter fairplay scoring window :  ${error.message}`);
            }
   }

   async clickOnConfirmBtn(){

        await this.confirmBtn.waitFor({state:'visible', timeout: 5000});

            try{

                 await this.confirmBtn.click();
                 console.log("Clicked on confirm button");

            } catch {

                 console.log("Unable to click on confirm button");

            }
   }

   async clickOnCreateCompetitionConfigurationBtnInsideStepTwo(){

        await this.createCompetitionConfigurationBtnInside.waitFor({state: 'visible', timeout:8000});
        try{
        await this.createCompetitionConfigurationBtnInside.click();
        console.log('Clicked on Create Competition Configuration button')
        } catch(error){
          console.log(`Error message: ${error.message}`);
        }
   }

   async verifyCompetitionPhaseCreatedSuccessfullyMessage(){

      await this.CompetitionPhaseCreatedSuccessfullyMessage.waitFor({state:'visible', timeout:2000});
      return await this.CompetitionPhaseCreatedSuccessfullyMessage.innerText();   

   }

   async verifyCompetitionConfigurationCreatedSuccessfullyMessage(){

      await this.CompetitionConfigurationCreatedSuccessfullyMessage.waitFor({state:'visible', timeout:2000});
      return await this.CompetitionConfigurationCreatedSuccessfullyMessage.innerText();   
      

   }

   //update competition Information

   async clickOnFirstRecordOfCompetitionConfigurations(){

      await this.firstRow.waitFor({state:'visible',timeout:5000});
      await this.firstRow.click();

   }

   async clearCompetitionCode(){

      await this.competitionCodeTxt.waitFor({state:'visible',timeout:5000});
      await this.competitionCodeTxt.clear();
      console.log("Competition code is cleared now")

   }

   async clearCompetitionName(){

      await this.competitionName.waitFor({state:'visible',timeout:5000});
      await this.competitionName.clear();
      console.log("Competition name is cleared now")
   }

   async clickOnCompetitionPhaseTab(){

      await this.competitionPhaseTab.waitFor({state:'visible',timeout: 2000});
      await this.competitionPhaseTab.click();
      console.log("Clicked on competition phase tab");
   }

   /**
    *  To update competition type 
    */

    async updateCompetitionType(option){


         await this.updateCompetitionTypeDrp.waitFor({state:'visible',timeout:2000});

            try{

                 await this.updateCompetitionTypeDrp.click();
                 await this.page.getByRole('option',{name:option, exact:true}).click();
                 console.log('Updated competition type as',option);

            }  catch(error){

                console.log(`Unable to select competition type : ${error.message}`);
            }
    };

   /**
    * To update competition level
    */

    async updateCompetitionLevel(option){

        await this.updateCompetitionLevelDrps.waitFor({state:'visible',timeout:5000});

            try {

                 await this.updateCompetitionLevelDrps.click();
                 await this.page.getByRole('option',{name:option, exact:true}).click();
                 //const options= await this.page.locator(`text=${option}`).click();
                // await this.page.keyboard.press('ArrowDown');
                 //await this.page.keyboard.press('Enter');
                 console.log('updated competition level',option);

            } catch(error){

                 console.log(`Unable to select competition level :  ${error.message}`);
            }

    };

   /**
    * To update division
    */
   async updateDivision(option){

         await this.updateDivisionDrp.waitFor({state:'visible',timeout:5000});

             try {

                await this.updateDivisionDrp.click();
                await this.page.getByRole('option',{name:option, exact:true}).click();
                 console.log('updated Selected division',option);

            } catch(error){

                 console.log(`Unable to select division : ${error.message}`);
             }

    }

    /**
     * To clear descriptions
     */

    async clearDescription(){

      await this.updateDescription.waitFor({state:'visible',timeout:5000});
      await this.updateDescription.clear();

    }

    async updateDescriptions(){

        let descriptions;

            try{

                    descriptions =DataUtil.getRandomAlphaNumeric();
                    await this.updateDescription.waitFor({state:'visible',timeout:5000});
                    await this.updateDescription.fill(descriptions);
                    console.log('Enter description as ',descriptions);

            } catch(error){

                    console.log(`Unable to enter description : ${error.message}`);

             }
   }


     /**
    * To click on update button
    */

    async clickOnUpdateBtn(){

            try{
                    await this.updateBtn.waitFor({state:'visible', timeout: 5000});
                    await this.updateBtn.click();
                    console.log('Clicked on updateCancelBtn button');
            } catch(error){

                    console.log(`Unabe to click on update button : ${error.message}`);
                } 
    }


    /**
     *  To get update competition configuration message
     */

    async toGetUpdatedCompetitionConfigurationMess(){

          await this.updatedCompetitionConfigurationMess.waitFor({state:'visible', timeout:2000});
          return await this.updatedCompetitionConfigurationMess.innerText();  
    }

    /**
     * To click on competition phase
     */

    async toClickOnCompetitionPhaseTab(){

     await this.competitionPhaseTab.waitFor({state:'visible',timeout:2000});
      await this.competitionPhaseTab.click();
     console.log("Clicked on Competition Phase Tab");

    }

    /**
     * To click on edit icon of the second record (competition phase)
     */

    async clickOnEditIconOfTheFirstRecordCompetitionPhase(){

     await this.firstRowCompetitionPhase.waitFor({state:'visible', timeout:2000});
     await this.firstRowCompetitionPhase.click();
     console.log("Clicked on first record of the competition phase");


    }

    /**
     * To clear competition phase order
     */

    async clearCompetitionPhase(){

     await this.competitionPhaseOrderTxt.waitFor({state:'visible', timeout:2000});
     await this.competitionPhaseOrderTxt.clear();
     console.log("Clear competition phase order");
    }

    /**
     * To clear competition phase name
     */

    async clearCompeitionPhaseName(){

     await this.competitionPhaseNameTxt.waitFor({state:'visible', timeout:2000});
     await this.competitionPhaseNameTxt.clear();
     console.log("Clear competition phase name");
    }

    /**
     * To clear total teams
     */

    async clearTotalTeams(){

     await this.totalTeamsTxt.waitFor({state:'visible', timeout: 2000});
     await this.totalTeamsTxt.clear();
     console.log("Clear total teams");

    }

    /**
     * To update general ranking, period ranking and fairplay ranking
     */

    async updateGeneralPeriodFairplayRanking(labelText, option){


     if(labelText =="General Ranking"){

               await this.generalRankingDrp.click();
               const options= await this.page.locator(`text=${option}`).click();
               console.log(`General ranking selected as ${option}`);

     }else if(labelText =="Period Ranking"){

               await this.periodRankingDrp.click();
               const options= await this.page.locator(`text=${option}`).click();
               console.log(`Period ranking selected as ${option}`);

     }else if(labelText =="Fairplay Ranking"){

               await this.fairplayRankingDrp.click();
               const options= await this.page.locator(`text=${option}`).click();
               console.log(`Fairplay ranking selected as ${option}`);

     }


    }

    async clearFairPlayScoringWindow(){

          await this.fairplayScoringWindowTxt.waitFor({state:'visible', timeout:2000});
          await this.fairplayScoringWindowTxt.clear();
          console.log("Fairplay scoring window value is cleared");
    }


    async clickedOnUpdateButton(){

          await this.updateButton.click();
          console.log('Clicked on update button');
    }

    async getCompetitionPhaseUpdatedSuccessMessage(){

          return await this.updatedCompetitionPhaseSuccessMes.innerText();

          await this.passCompetitionCode()
     //Competition phase updated successfully!
    }




    async actions(labelText){

     if(labelText=='Activate'){

          try{

          await this.activateBtn.click();
          console.log("Clicked on activate button");
          } catch(error){

               console.log(`Activate button, ${error.message}`);
          }

     }else if(labelText =='Delete'){

          try{

           await this.deleteBtn.click();
          console.log("Clicked on delete button");
          } catch(error){

               console.log(`Delete button, ${error.message}`);
          }

     }else if(labelText =='Deactivate' ){

          try{

           await this.deactivateBtn.click();
          console.log("Clicked on deactivate button");

          } catch(error){

               console.log(`deactivate button, ${error.message}`);
          }

     }



    }

    async confirmCancelButton(lableText){

     if(lableText =='Confirm'){

          await this.confirmButton.click();
          console.log("Clicked on confirm button")

     } else if(lableText =='Cancel'){


           await this.cancelButton.click();
          console.log("Clicked on confirm button")

     }
    }

    async clickOnActionsIcon(){

     await this.actionsIcon.click();
    }

    async confirmDeactiveActivateDeleteMessage(lableText){


     if(lableText == 'Activate'){

          return await this.Message.innerText();

     } else if(lableText == 'Deactivate'){

           return await this.Message.innerText();
     }


    }

}
module.exports = CompetitionConfigPage;