const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('chai');
const SeasonPage = require('../../pages/SeasonPage');
const fs = require('fs');
const path = require('path');

// Set default timeout for all steps
setDefaultTimeout(60000);

Given('User select the season tab', { timeout: 90000 }, async function () {

        this.seasonPage = new SeasonPage(this.page);
        await this.seasonPage.openSeasonscreen();
});

// Scenario: 1. Create a season

When('click on Create Season button', { timeout: 90000 }, async function () {

        this.seasonPage = new SeasonPage(this.page);
        await this.seasonPage.clickOnCreateSeasonButton();
});

When ('enter season information', { timeout: 90000 }, async function(dataTable){

        const data = dataTable.rowsHash();
        await this.seasonPage.toFillSeasonInformation(data);
})

When('click on create season button', { timeout: 90000 }, async function () {

        await this.seasonPage.clickOnCreateButton();
});

Then('a created success message should be displayed', { timeout: 90000 }, async function () {

        const text = await this.seasonPage.getCreateSucessMessage();
        expect(text).to.equal('Season created successfully!');
        console.log("Season created successfully!");
});