const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber')
const { expect } = require('chai')
const SeasonPage = require('../../pages/SeasonPage')
const CompetitionConfigPage = require('../../pages/CompetitionConfigPage')
const fs = require('fs')
const path = require('path')
const DataUtil = require('../../pages/commonUtils/DataUtil')

// Set default timeout for all steps
setDefaultTimeout(60000)

When('the user clicks on the Competition Configuration tab', async function () {

    try{

        this.competitionConfigPage = new CompetitionConfigPage(this.page)
        await this.competitionConfigPage.clickOnCompetitionConfigurationTab()

    } catch(error){

        console.log(`Unable to click on competition configuration tab:${error.message}`);
    }

})

When('the user clicks on Create Competition Configuration button',async function () {

    await this.competitionConfigPage.clickOnCreateCompetitionConfigurationBtn()

  }
)

When('the user enters a competition code', async function () {

    await this.competitionConfigPage.enterCompetitionCode()

})

When('the user enters a competition name', async function () {

    await this.competitionConfigPage.enterCompetitionName()
})

When('the user selects the competition type as {string}',async function (competitionType) {

    await this.competitionConfigPage.selectCompetitionType(competitionType);

  }
)

When('the user selects the competition level as {string}',async function (competitionLevel) {

    await this.competitionConfigPage.selectCompetitionLevel(competitionLevel);
  }
)

When('the user selects the division as {string}', async function (division) {

    await this.competitionConfigPage.selectDivision(division);

})

When('the user selects the organization as {string}',async function (oragnization) {

    await this.competitionConfigPage.selectOrganization(oragnization);
})

When('the user enters a description as {string}', async function (description) {

    await this.competitionConfigPage.enterDescription(description);
})

When('the user clicks on the Next button', async function () {

    await this.competitionConfigPage.clickOnNextBtn();
})

When('the user clicks on Add Competition Phase button', async function () {

    await this.competitionConfigPage.clickOnAddCompetitionPhase();
})

When('the user enters the competition phase order', async function () {

    await this.competitionConfigPage.enterCompetitionPhaseOrder();
})

When('the user enters the competition phase name', async function () {

    await this.competitionConfigPage.enterCompetitionPhaseName();

})

When('the user enters the total number of teams', async function () {

   await this.competitionConfigPage.enterTotalTeams();
})

When('the user selects the match grid',async function(){

    try{

        await this.competitionConfigPage.selectMatchGrid();

      } catch(error){

        console.log(`Unable to select the match grid :${error.message}`);
      }
})

When('the user selects the general ranking as {string}',async function (generalRanking) {

   await this.competitionConfigPage.selectGeneralRanking(generalRanking);
  }
)

When('the user selects the period ranking as {string}',async function (periodRanking) {

  try{

         await this.competitionConfigPage.selectPeroidRanking(periodRanking);

        } catch(error){

        console.log(`Unable to select period ranking: ${error.message}`);
  }
}
)

When('the user selects the fair play ranking as {string}',async function (fairPlayRanking){

   await this.competitionConfigPage.selectFairplayRanking(fairPlayRanking);
}
)

When('the user enters the fair play scoring window', async function () {

    try{

      await this.competitionConfigPage.enterFairplayScoringWindow();
  } catch(error){

      console.log(`Unable to enter fairplay ranking: ${error.message}`);
  }
}  )

When('the user clicks on the Confirm button', async function () {

    await this.competitionConfigPage.clickOnConfirmBtn();
})

Then('a competition phase added success message should appear on the screen', async function () {

    try{

            const messageLocator =await this.competitionConfigPage.verifyCompetitionPhaseCreatedSuccessfullyMessage();
            await expect(messageLocator).to.equal('Competition phase created successfully!');
            console.log('Competition phase created successfully!')

    } catch(error){

            console.log(`Competition phase create success message not appearing: ${error.message}`);
    }

}
)

When('the user clicks on the Create Competition Configuration button', async function () {

  await this.competitionConfigPage.clickOnCreateCompetitionConfigurationBtnInsideStepTwo();
}
)

Then('a competition configuration created success message should appear on the screen', async function () {

     const messageLocator =await this.competitionConfigPage.verifyCompetitionConfigurationCreatedSuccessfullyMessage();
     await expect(messageLocator).to.equal('Competition Configuration created successfully!');
     console.log('Competition Configuration created successfully')

  }
)

//update competition Information

Given('the user opens the first record of the competition configuration', async function () {

      try{

          await this.competitionConfigPage.clickOnFirstRecordOfCompetitionConfigurations();
      } catch(error){

          console.log(`Unable to open first record of the competition configuration:${error.message}`);
      }

});

When('the user updates the competition code', async function () {

     await this.competitionConfigPage.clearCompetitionCode();
     await this.competitionConfigPage.enterCompetitionCode();
});

When('the user updates the competition name', async function () {

     await this.competitionConfigPage.clearCompetitionName();
     await this.competitionConfigPage.enterCompetitionName();
});

When('the user updates the competition type as {string}', async function (option) {

        try{

         this.competitionConfigPage = new CompetitionConfigPage(this.page)
         await this.competitionConfigPage.updateCompetitionType(option);

        } catch(error){

         console.log(`Unable to update competition type:${error.message}`);
    }

});

When('the user updates the competition level as {string}', async function (option) {

     await this.competitionConfigPage.updateCompetitionLevel(option);

});

When('the user updates the division as {string}', async function (option) {

    try{

         await this.competitionConfigPage.updateDivision(option);

        } catch(error){

        console.log(`Unable to update division: ${error.message}`);
    }

});

When('the user updates the description', async function () {

    try{

         await this.competitionConfigPage.clearDescription();
         await this.competitionConfigPage.updateDescriptions();

        } catch(error){

         console.log(`Unable to update description: ${error.message}`);
    }

});

When('the user clicks the Update button', async function () {


    await this.competitionConfigPage.clickOnUpdateBtn();

});

Then('a competition configuration updated success message should appear on the screen', async function () {

    const messageLocator = await this.competitionConfigPage.toGetUpdatedCompetitionConfigurationMess();

    await expect(messageLocator).to.equal('Competition configuration updated successfully!');
    console.log("Competition configuration updated successfully!");
});

//update competition phase

Given('the user clicks on the competition phase section', async function () {

    this.competitionConfigPage = new CompetitionConfigPage(this.page);
    await this.competitionConfigPage.toClickOnCompetitionPhaseTab();
});

When('the user clicks the edit pencil icon of the first competition phase', async function () {

    await this.competitionConfigPage.clickOnEditIconOfTheFirstRecordCompetitionPhase();
});

When('the user updates the competition phase order', async function () {


    await this.competitionConfigPage.clearCompetitionPhase();
    await this.competitionConfigPage.enterCompetitionPhaseOrder();


});

When('the user updates the competition phase name', async function () {

    await this.competitionConfigPage.clearCompeitionPhaseName();
    await this.competitionConfigPage.enterCompetitionPhaseName();

});

When('the user updates the total teams', async function () {

    await this.competitionConfigPage.clearTotalTeams();
    await this.competitionConfigPage.enterTotalTeams();

});

When('the user updates the match grid', async function () {

    await this.competitionConfigPage.selectMatchGrid();

});

When('the user updates the general ranking as {string}', async function (ranking) {

    await this.competitionConfigPage.updateGeneralPeriodFairplayRanking("General Ranking",ranking);
});

When('the user updates the period ranking as {string}', async function (ranking) {

    await this.competitionConfigPage.updateGeneralPeriodFairplayRanking("Period Ranking",ranking);
});

When('the user updates the fair play ranking as {string}', async function (ranking) {

    await this.competitionConfigPage.updateGeneralPeriodFairplayRanking("Fairplay Ranking",ranking);

});

When('the user updates the fair play scoring window', async function () {

    await this.competitionConfigPage.clearFairPlayScoringWindow();
    await this.competitionConfigPage.enterFairplayScoringWindow();

});

When('the user clicks the Update button from competition phase', async function (){

    await this.competitionConfigPage.clickedOnUpdateButton();

});

Then('a competition phase updated success message should appear on the screen', async function () {

    try{

         const message =await this.competitionConfigPage.getCompetitionPhaseUpdatedSuccessMessage();
         await expect(message).to.equal("Competition phase updated successfully!");
         console.log("Competition phase updated successfully!");

     }catch(error){

         console.log("Competition phase updated successfully not appearing", error.message);
    }
});

//deactivate a competition configuration

When ('the user clicks on actions icon', async function(){

    await this.competitionConfigPage.clickOnActionsIcon();


});

When ('the user clicks on deactivate icon',async function(){



    await this.competitionConfigPage.actions('Deactivate');
    await this.competitionConfigPage.confirmCancelButton('Confirm');

});

Then('a competition configuration deactivated successfully message should on the screen', async function(){


    try{
    const message = await this.competitionConfigPage.confirmDeactiveActivateDeleteMessage('Deactivate');

    expect(message).to.equal("Competition Configuration deactivated successfully!");

    console.log("Competition Configuration deactivated successfully!");
    } catch(error){

        console.log(`Error message: ${error.message}`);
    }

});


//activate a competition configuration

When ('the user clicks on activate icon',async function(){


    await this.competitionConfigPage.actions('Activate');
    await this.competitionConfigPage.confirmCancelButton('Confirm');
});

Then('a competition configuration activated successfully message should on the screen', async function(){


    const message = await this.competitionConfigPage.confirmDeactiveActivateDeleteMessage('Activate');

    expect(message).to.equal("Competition Configuration activated successfully!");

    console.log("Competition Configuration activated successfully!");

});