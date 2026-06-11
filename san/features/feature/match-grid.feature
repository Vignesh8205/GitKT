@smoke @regression @matchGrid @AllActions
Feature: Match Grid Management
    As a user
    I want to create a match grid
    So that matches can be generated automatically

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

    Scenario: Verify user can create Match Grid successfully
        Then User Can able to access the Main menu in home page
        Then User choose the competition management tab
        Then User select the Match Grid tab
        Then User Click the Edit mode 
        Then User click on Create Match Grid button
        When User enters Match Grid template name "MatchGridAuto"
        And User enters total teams "2"
        And user enter the matchday count "1"
        Then User click on Generate Grid button
        When User enters Teams H value "Team A"
        And User enters Teams A value "Team B"
