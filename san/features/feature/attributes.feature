@smoke @regression @Attributes @demo @AllActions
Feature: Attributes Management

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

    Scenario: Verify user can create Attribute successfully
        Then User Can able to access the Main menu in home page
        Then User choose the Settings tabs
        Then User select the TagsandAttributes Modules
        Then User select the Attributes Tab
        Then User Click the Edit mode
        Then User click on CreateAttribute button
        When User enters Attribute name "TagAuto"
        When User selects Attribute Category as "Administrative"
        And User selects Attribute Entity Type as "Clubs"
        And User selects Attribute Type as "Text"
        Then User click on CreateAttribute action button
        Then User validates the Attribute created success toast message
