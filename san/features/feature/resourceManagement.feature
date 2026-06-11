@smoke @regression @resourceManagement @AllActions
Feature: Resource Management - Create Venue
    As a user
    I want to be able to create a venue in Resource Management
    So that I can manage venues within the system

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
    # CREATE VENUE
    # =========================================================

    @resourceManagementCreateVenueTest
    Scenario Outline: Verify user can create a venue with venue details and address
        # Navigate to Resource Management
        Then  User Can able to access the Main menu in home page
        Then  User navigates to "Resource Management" from main menu
        Then  User clicks the Edit button in Resource Management
        Then  User clicks the "Create Venue" button in Resource Management

        # Fill Venue details
        Then  User fills the venue details with the following information
            | Field            | Value          |
            | Name             | <VenueName>    |
            | Federation       | <Federation>   |
            | Venue Type       | <VenueType>    |
            | Address Line 1   | <AddressLine1> |
            | Address Line 2   | <AddressLine2> |
            | Suburb / City    | <City>         |
            | State / Province | <State>        |
            | Country          | <Country>      |
            | Postal Code      | <PostalCode>   |

        Then  User clicks the "Create Venue" button in Resource Management
        Then validate popup message as "Venue created successfully!"
        Examples:
            | VenueName | Federation | VenueType | AddressLine1 | AddressLine2        | City    | State      | Country | PostalCode |
            | random    | RBFA       | Stadium   | Ambit        | Ambattur Industrial | Chennai | Tamil Nadu | India   | 600058     |
