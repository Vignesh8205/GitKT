const { Given, When, Then,setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

const CompetitionPage = require('../../pages/CompetitionPage');
const CompetitionConfigPage = require('../../pages/CompetitionConfigPage');


// Set default timeout for all steps
setDefaultTimeout(2*60000);


Given('click on create competition button',{timeout: 70000}, async function(){


    this.competitionPage = new CompetitionPage(this.page);
    await this.competitionPage.clickOnCreateCompetitionBtn();

})

When('enter competition code', async function (){
     
    await this.competitionPage.enterCompetitionCode();
    
})

When('click on competition configuration', async function(){


    await this. competitionPage.clickOnCompetitionConfig();
})

When('click on next button', async function(){

    await this.competitionPage.clickOnNextBtn();
})

When ('click on next button in competition information', async function(){

    await this.competitionPage.clickOnNextBtn();


})

When ('enter season informations', async function(dataTable){

    const data = dataTable.rowsHash();

    await this.competitionPage.descriptions(data);
})

When('enter general settings',{timeout :120000}, async function(dataTable){

    const data = dataTable.rowsHash();
    await this.competitionPage.generalSettings('Total Teams per competition',data['Total Teams per competition']);
    await this.competitionPage.generalSettings('Default Match Day',data['Default Match Day']);
    await this.competitionPage.generalSettings('Common Cost',data['Common Cost']);
    await this.competitionPage.generalSettings('Allow Club Collaboration',data['Allow Club Collaboration']);
    await this.competitionPage.generalSettings('Fair Play',data['Fair Play']);
    await this.competitionPage.generalSettings('Score',data['Score']);
    await this.competitionPage.generalSettings('Use Disciplinary Sanction Table',data['Use Disciplinary Sanction Table']);
    await this.competitionPage.generalSettings('Auto Generate Disciplinary Files',data['Auto Generate Disciplinary Files']);
})

When ('enter match settings',{timeout :160000}, async function(dataTable){

    const data = dataTable.rowsHash();
    await this.competitionPage.matchSettings('Min Players to Start Game', data['Min Players to Start Game']);
    await this.competitionPage.matchSettings('Max Players to Start Game',data['Max Players to Start Game']);
    await this.competitionPage.matchSettings('All Players Starting', data['All Players Starting']);
    await this.competitionPage.matchSettings('Presence List Required', data['Presence List Required']);
    await this.competitionPage.matchSettings('Has Goalkeeper', data['Has Goalkeeper']);
    await this.competitionPage.matchSettings('Has Substitution', data['Has Substitution']);
    await this.competitionPage.matchSettings('Min Substitution', data['Min Substitution']);
    await this.competitionPage.matchSettings('Max Substitution', data['Max Substitution']);
    await this.competitionPage.matchSettings('Has Yellow Card', data['Has Yellow Card']);
    await this.competitionPage.matchSettings('Has Red Card', data['Has Red Card']);
    await this.competitionPage.matchSettings('Penalties Allowed', data['Penalties Allowed']);
    await this.competitionPage.matchSettings('Automatic Generation Disciplinary Files', data['Automatic Generation Disciplinary Files']);
    await this.competitionPage.matchSettings('Digital Matchsheet Required', data['Digital Matchsheet Required']);
    await this.competitionPage.matchSettings('Goal Scorer Tracking', data['Goal Scorer Tracking']);
    await this.competitionPage.matchSettings('Control Missing ID Cards', data['Control Missing ID Cards']);
    await this.competitionPage.matchSettings('Bad Weather Cancellation Deadlines',data['Bad Weather Cancellation Deadlines']);

})

When ('enter club changes', async function(dataTable){

    const data = dataTable.rowsHash();
    await this.competitionPage.clubChanges('Processed Automatically',data['Processed Automatically']);
    await this.competitionPage.clubChanges('Individual Forfeit Deadline',data['Individual Forfeit Deadline']);
    await this.competitionPage.clubChanges('Change Date Time Deadline',data['Change Date Time Deadline']);
    await this.competitionPage.clubChanges('Cancel Game Deadline',data['Cancel Game Deadline']);
    await this.competitionPage.clubChanges('Change Pitch Deadline',data['Change Pitch Deadline']);
    await this.competitionPage.clubChanges('Postponement Deadline',data['Postponement Deadline']);


})

When ('enter match Function', async function(dataTable){

    const data = dataTable.rowsHash();
    await this.competitionPage.matchFunction('Automatic Designation', data['Automatic Designation']);
    await this.competitionPage.matchFunction('Official Code', data['Official Code']);
    await this.competitionPage.matchFunction('Meeting Place', data['Meeting Place']);
    await this.competitionPage.matchFunction('Min Referee Block', data['Min Referee Block']);
    await this.competitionPage.matchFunction('Max Referee Block', data['Max Referee Block']);
})

When('enter pitch information', async function(dataTable){

     const data = dataTable.rowsHash();

    await this.competitionPage.pitchInformation('Squad Size', data['Squad Size']);
    await this.competitionPage.pitchInformation('Pitch Type', data['Pitch Type']);
    await this.competitionPage.pitchInformation('Average Lux', data['Average Lux']);

})

When ('click on {string} button', async function(button){

      
    await this.competitionPage.nextCancelBack(button);
    console.log("clicked on next button");
})

When ('add competition phase', {timeout :160000}, async function(dataTable){

    const data = dataTable.rowsHash();
    this.competitionPage = new CompetitionPage(this.page);
    await this.competitionPage.clickOnAddCompetitionPhase();
    await this.competitionPage.addCompetitionPhase('Competition Phase Order',data['Competition Phase Order']);
    await this.competitionPage.addCompetitionPhase('Competition Phase Name', data['Competition Phase Name']);
    await this.competitionPage.addCompetitionPhase('Total Teams',data['Total Teams']);
    await this.competitionPage.addCompetitionPhase('Match Grid',data['Match Grid']);
    await this.competitionPage.addCompetitionPhase('Date Grid',data['Date Grid']);
    await this.competitionPage.addCompetitionPhase('General Ranking',data['General Ranking']);
    await this.competitionPage.addCompetitionPhase('Period Ranking',data['Period Ranking']);
    await this.competitionPage.addCompetitionPhase('Fairplay Ranking',data['Fairplay Ranking']);
    await this.competitionPage.addCompetitionPhase('Fairplay scorning window',data['Fairplay scorning window']);
} );


Then('a {string} message appear on the screen', {timeout: 60000},async function(expectedMess){

    const message = await this.competitionPage.verifyMessage();

    expect(message).to.equal(expectedMess);

})

// assign Teams

Given('click on first record of the competition page', {timeout: 6000}, async function(){

    this.competitionPage = new CompetitionPage(this.page);
    await this.competitionPage.clickOnFirstRecordOfCompetitionScreen();

})

Given ('navigate to {string} tab',{timeout :6000}, async function(label){

    
    await this.competitionPage.clickOnTab(label);

})

When('Click on {string} button', {timeout: 6000}, async function(label){

    await this.competitionPage.clickOnButton(label);
})

When('Click on {string} from Select Teams',{timeout: 6000}, async function(label){


    await this.competitionPage.clickOnButton(label);
})

When('Search team from the list', {timeout: 6000}, async function(dataTable){

    try{
    const data = dataTable.hashes();
    await this.competitionPage.clickOnSearchTeam(data[0].Value);

    } catch (error){
        crossOriginIsolated.log(`Error message",${error.message}`)
    }
})

Then('A {string} message appear on the screen',{timeout: 4000}, async function(label){

    const message =this.competitionPage.getMessageForAssignTeam();
    expect(message).to.equal('Teams assigned successfully!');

})

When('Click on first competition phase from the list', {timeout: 5000}, async function(){


    await this.competitionPage.clickOnFirstCompetitionPhaseFromTheGrid();
})
