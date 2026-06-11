@smoke @regression @Tags @demo @AllActions
Feature: Tags Management

    As a user
    I want to create a tag
    So that it can be used across the application

    Background:
        Given I am on the login page
        And I load credentials from "test-data/credentials.json"
        When I enter username from "validUser"
        And I enter password from "validUser"
        And I click the login button
        Then I should be logged in successfully
        Then User select the Role on role list
        When I select "RegSeason" in the Season dropdown
        Then User Clicking on submit button

    Scenario: Verify user can create Tag successfully
        Then User Can able to access the Main menu in home page
        Then User choose the Settings tab
        Then User select the TagsandAttributes Module
        Then  User Click the Edit mode
        Then User click on CreateTag button
        When User enters Tag name "TagAuto"
        When User selects Category as "Administrative"
        And User selects Entity Type as "Clubs"
        Then User click on Create Tag action button
        # Then validate popup message as "Tag created successfully!"
