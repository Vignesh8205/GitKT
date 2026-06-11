@DataSetsPage @regression @AllActions
Feature: Division Page Functionality
    As a user
    I want to be able to log in to the application
    So that I can access the system

    Background:
        Given I am on the login page
        And I load credentials from "test-data/credentials.json"
        When  I enter username from "validUser"
        And   I enter password from "validUser"
        And   I click the login button
        Then  I should be logged in successfully
        Then  User select the Role on role list
        When I select "RegSeason" in the Season dropdown
        Then  User Clicking on submit button

    Scenario: verify the user create a data sets
        Given User Can able to access the Main menu in home page
        And user choose "Settings"
        And  User Click the Edit mode
        When Click on the "Add" button
        And  enter data sets values
        |Field  | Value   |
        |Name   | random  |
        And Click on the rowwise "Update" button
        Then a "Data Sets created successfully!" message appear on screen
        