@smoke @regression @OrganizationPage @AllActions
Feature:  Resource Management Page Functionality
    As a user
    I want to be able to log in to the application
    So that I can access the system


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

    
    Scenario: Verify the user create the Organization  management
        Then  User Can able to access the Main menu in home page
        Then  User choose the Federation Management option
        Then  User Click the Edit mode
        Then  User click on create the organization button
        When  user enters organization information
            | Organization Code | UI                             |
            | Organization Name | UI                             |
            | Federation        | RBFA                           |
            | Format            | Football                       |
            | Description       | organization for UI Automation |
        Then User click on confirm the organization button
        Then validate popup message as "Organization created successfully!"



