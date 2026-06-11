@smoke @regression @divisionPage @demo @AllActions
Feature: Division Page Functionality
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



    Scenario: Verify the user creates a division then edits division information and eligibility criteria
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division category tab
        Then  User Click the Edit mode
        Then  User create the division management
        When  user enters division information
            | Division Code     | Div             |
            | Division Name     | DivName         |
            | Division Category | Under 21        |
            | Format            | Football        |
            | Region            | Region1         |
            | Federation        | RBFA            |
            | Organization      | competitive     |
            | Description       | AutoTest for UI |
        Then  User Clicking the add eligibility criteria
        When  User Enter the Minimum age on popup window
            | Gender                      | Female   |
            | Reference Month             | February |
            | Reference Date              | 21       |
            | Minimum Age                 | 23       |
            | Maximum Age Reference Month | February |
            | Maximum Age Reference Date  | 25       |
            | Maximum Age                 | 35       |
        Then  User starts capturing the Division create API response
        Then  User click the create button
        Then  Verify the Division record should be created with success message "Division created successfully!"
        Then  User verifies and prints the Division create API response JSON
        Then  User searches for the recently created division in quick search
        Then  User Click the Edit mode on division information section
        When  user updates division information
            | Format      | Mini-football   |
            | Region      | Region2         |
            | Federation  | VV              |
            | Description | AutoTest Edited |
        Then  User clicks the update button on division information
        Then  Verify the Division record should be updated with success message "Division Information updated successfully!"
        Then  User navigates to the Eligibility Criteria section
        Then  User Click the Edit mode on eligibility criteria section
        Then  User clicks on the eligibility criteria record
        Then  User clicks the edit action icon on the eligibility criteria record
        When  User updates the eligibility criteria fields
            | Gender                      | Male     |
            | Reference Month             | January  |
            | Reference Date              | 15       |
            | Minimum Age                 | 20       |
            | Maximum Age Reference Month | January  |
            | Maximum Age Reference Date  | 20       |
            | Maximum Age                 | 30       |
        Then  User clicks the update button
        Then  Verify the eligibility criteria record should be updated with success message "Eligibility criteria updated successfully!"

