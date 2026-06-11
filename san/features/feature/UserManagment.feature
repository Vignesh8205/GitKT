@smoke @regression @UserManagementPage @AllActions
Feature:  User Management Page Functionality
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


    Scenario: Verify the user create the User  management
        Then  User Can able to access the Main menu in home page
        Then  User can able to navigate to Settings Page
        Then  User Click the Edit mode
        Then  User access the Add new button
        When  user Fill Person details on new user page
            | First Name    | Praga    |
            | Last Name     | Hinduja  |
            | Gender        | Female   |
            | Date of Birth | past     |
        When  User Fill the contact details on new user page
            | Email        | random  |
            | Phone Number | random  |
        Then User click on confirm the user button
        Then validate popup message as "User created successfully!"
