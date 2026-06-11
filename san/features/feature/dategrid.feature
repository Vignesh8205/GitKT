@smoke @regression @dateGrid @demo @AllActions
Feature: Date Grid Management
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
        Then User select the Date Grid tab
        Then  User Click the Edit mode 
        Then User click on Create Date Grid button
        When User enters Date Grid template name "DateGridAuto"
        And User enters total teams for date grid "2"
        And user enter the matchday count for date grid "1"
        Then User click on Generate Grid button for date grid
        And  User enters startDate  "01/02/2094"
        Then User click on Create Date Grid button
        Then validate popup message as "Date grid created successfully!"
        
        
        