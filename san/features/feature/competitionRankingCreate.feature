@smoke @regression @competitionRankingCreate 
Feature: Competition Management - Ranking Template Creation
    As a user
    I want to create a Ranking Template with Criteria Configuration
    So that I can define ranking rules for competitions

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
    # CREATE RANKING TEMPLATE
    # =========================================================

    @competitionRankingCreateTemplate
    Scenario Outline: Create Ranking Template with "<CriteriaValue>" criteria and verify success
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Ranking sub tab
        Then  User verifies the Ranking page title
        Then  User clicks the Edit mode button on Ranking page
        Then  User clicks the Create Template button
        Then  User fills the Ranking Template Name with auto-generated name
        Then  User fills the Ranking Description with "Automation test description for ranking template"
        Then  User clicks the Add button in Ranking Criteria Configuration grid
        Then  User fills Ranking Criteria row with following details
            | Field               | Value                    |
            | Criteria            | <CriteriaValue>          |
            | Sorting Direction   | <SortingDirectionValue>  |
            | Influence Position  | <InfluencePositionValue> |
        Then  User clicks the Update button in Ranking Criteria grid
        # Then  validate popup message as "Criteria added successfully!"
        Then  User clicks the Create button for Ranking Template
        Then  validate popup message as "Ranking created successfully!"
        #Edit and Delete the created Ranking Template
        Then  User clicks the View mode button on Ranking page
        Then  User clicks the first record to navigate to the detail page
        Then  User clicks the Edit button for Template Information
        Then  User edits the Ranking Template Name with new auto-generated name
        Then  User edits the Ranking Description with "Updated automation test description for ranking template"
        Then  User clicks the Update button for Ranking Template
        Then  User clicks the Edit button for Ranking Criteria Configuration section
        Then  User clicks the first row in Ranking Criteria grid
        Then  User clicks the Edit button in Ranking Criteria grid row
        Then  User edits Ranking Criteria to "Head-to-Head Goals Scored"
        Then  User clicks the Update button in Ranking Criteria grid
        Then  validate popup message as "Criteria updated successfully!"
        Then  User clicks the first row in Ranking Criteria grid
        Then  User clicks the Delete button in Ranking Criteria grid
        Then  User clicks the Confirm button
        Then  validate popup message as "Criteria deleted successfully!"

        Examples:
            | CriteriaValue       | SortingDirectionValue    | InfluencePositionValue |
            |Goal Average at Home | Ascending (Lowest first) | Yes                    |
