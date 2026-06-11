@smoke @regression @divisionCategory @demo @AllActions
Feature: Division Category Management
    As a user
    I want to create a division category
    So that it can be used while creating divisions

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


    Scenario: Verify user can edit the recently created Division Category
        Then User Can able to access the Main menu in home page
        Then User choose the competition management tab
        Then User select the Division Category menu
        Then User Click the Edit mode
        Then User click on Add Division Category button
        When User enters Division Category details
            | Category Code | DCAT                           |
            | Category Name | DivisionCategoryAuto           |
            | Description   | Auto created division category |
        When User select the format as "Football"
        When User enters Division Category description "Auto created division category"
        When User select the division category type as "Under 16"
        Then User starts capturing the Division Category create API response
        Then User click on Save Division Category
        Then Verify Division Category created with success message "Division Category created successfully!"
        Then User verifies and prints the Division Category create API response JSON
        # Edit 
        Then User searches for the recently created division category in quick search
        Then User clicks the recently created division category record
        Then User click on Edit Division Category
        When User updates Division Category details
            | Category Name | DivisionCategoryEdited         |
            | Description   | Auto updated division category |
        Then User click on Update Division Category
        Then Verify Division Category updated with success message "Division Category Information updated successfully!"
