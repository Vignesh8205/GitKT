@smoke @regression @rankingPositionCreate 
Feature: Competition Management - Ranking Position Creation
    As a user
    I want to create a Ranking Position template with Group Configuration
    So that I can define ranking positions for competitions

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
    # CREATE RANKING POSITION TEMPLATE
    # =========================================================

    @rankingPositionCreateTemplate
    Scenario Outline: Create Ranking Position Template with <TotalTeams> teams and <StartPosition>-<EndPosition> group positions
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Ranking sub tab
        Then  User navigates to the Ranking Position sub tab
        Then  User verifies the Ranking Position page title
        Then  User clicks the Edit mode button on Ranking page
        Then  User clicks the Create Template button
        Then  User fills the Ranking Template Name with auto-generated name
        Then  User fill the Total Teams number with <TotalTeams>
        Then  User fills the Ranking Description with "Automation test description for ranking template"
        Then  User navigate to the Position Group Configuration and click the add button
        Then  User fill the Group Name with auto-generated name on popup
        Then  User fill the Start Position with <StartPosition> and End Position with <EndPosition>
        Then  User fill the Colour with "<Colour>"
        Then  User click the Group Configuration Confirm button
        Then  User clicks the Create button for Ranking Template
        Then  validate popup message as "Template created successfully!"

        Examples:
            | TotalTeams | StartPosition | EndPosition | Colour    |
            | 12         | 1             | 2           | #80006f |