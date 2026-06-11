@smoke @regression @SeasonPageModule 
Feature: Season Functionality
        As a user 
        I want to create, update, activate, deactivate and delete season
        So that I can manage season effectively.

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

Scenario: Create a season
        Then User Can able to access the Main menu in home page
        Then User choose the competition management tab
        Then User select the season tab
        Then  User Click the Edit mode 
        When click on Create Season button
        And enter season information
        | Field                    | Value                    |
        | Season Code              | Sea                      |
        | Season Name              | SeaName                  |
        | Season Type              | Season - 1               |
        | Federation               | RBFA                     |
        | Season Duration          | 22/10/2076 - 07/11/2076  |
        | Description              | Season Created           |
        | Update Status Manually   | Enable                   |
        | Status                   | Active                   |

        And click on create season button
        Then a created success message should be displayed
