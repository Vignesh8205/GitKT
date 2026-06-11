@formManagementPage

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


    Scenario: Verify the user create the Form Builder under Form management
        Given Verify the user able to access the MainMenu 
        Then  User select the Form management menu
        Then  User choose the Form builder tab
        Then  User Click the create new form option
        Then  User Clicking the standard Layout from select layout popup
        
        