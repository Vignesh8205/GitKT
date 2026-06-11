@smoke @regression @rankingPeriodCreate 
Feature: Competition Management - Ranking Period Creation
    As a user
    I want to create a Ranking Period template with Matchday Configuration
    So that I can define ranking periods for competitions

    Background:
        Given I am on the login page
        And I load credentials from "test-data/credentials.json"
        And I load testData from "test-data/testData.json"
        When  I enter username from "validUser"
        And   I enter password from "validUser"
        And   I click the login button
        Then  I should be logged in successfully
        Then  User select the Role on role list
        When I select "RegSeason" in the Season dropdown
        Then  User Clicking on submit button

    # =========================================================
    # CREATE RANKING PERIOD TEMPLATE
    # =========================================================

    @rankingPeriodCreateTemplate
    Scenario Outline: Create Ranking Period with <TotalMatchdays> matchdays and <NumberOfGroups> groups and verify API response
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Ranking sub tab
        Then  User navigates to the Ranking Period sub tab
        Then  User verifies the Ranking Period page title
        Then  User clicks the Edit mode button on Ranking page
        Then  User clicks the Create Template button
        Then  User fills the Ranking Template Name with auto-generated name
        Then  User fills the Ranking Description with "Automation test description for ranking template"
        Then  User navigate to the Matchday Configuration and fill the Total Matchdays and Number of Groups with <TotalMatchdays> and <NumberOfGroups>
        Then  User click the Configure Groups
        Then  User choose the Auto Assign Matchdays
        Then  User clicks the Create button for Ranking Template
        Then  validate popup message as "Template Created Successfully"

        Examples:
            | TotalMatchdays | NumberOfGroups |
            | 2              | 2              |