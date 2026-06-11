@smoke @regression @competitionChangeRequestAdvancedFilter
Feature: Competition Management Change Request Tab Advanced Filter Functionality
    As a user
    I want to filter the Change Request grid using advanced filter criteria
    So that I can find specific change request records using complex conditions

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

    @competitionChangeRequestAdvancedFilterApprovedByTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> <Operator> "<Value>"
        # Navigate to Competition Management
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Change Request sub tab
        Then  User verifies the Change Request page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon on Change Request tab
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter, verify API count, click first record, verify detail
        Then  User starts capturing the change request advanced filter API response
        Then  User clicks the Apply Advanced Filter button on Change Request
        Then  User verifies the change request advanced filter API response total count is greater than zero
        Then  User prints the change request advanced filter API response JSON
        Then  User verifies the change request detail field "<Field>" "<Operator>" "<Value>"

        Examples:
            | Field         | Operator              | Value |
            | Template Name | Starts with           | Pawan |
            # | Template Name | Does not start with | Away  |
            # | Template Name | Contains            | Away  |
            # | Template Name | Does not contain    | Away  |
            # | Template Name | Ends with           | Time  |
            # | Template Name | Does not end with   | Time  |
