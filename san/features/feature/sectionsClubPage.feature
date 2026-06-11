@smoke @regression @sectionClubPage @AllActions
Feature: Club Management with teams Page Functionality
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

    @sectionClubTeamPage @fix 
    Scenario: Verify the user create the Teams from section
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  User opens the details of a created club with name "SouthWestBelgium"
        Then  User choose the " Sections " tab
        Then  User opens the details of a created season with name "SouthWestBelgium"
        Then  User choose the "Teams" tab in section
        Then  User Click the Edit mode 
        Then  the user taps the "Add" button within the section
        When  the user enter the team value in search bar
            | SelectTeam | s |
        Then User able to choose the team from displayed list "SouthWestBegium"
        And the user taps the "Next" button within the section
        And the user taps the "Next" button within the section
        And enter season overview details
            | Field               | Value            |
            | sessionId           | RegSeason        |
            | suffix              | B                |
            | Search Organization | competitive      |
            | squadSize           | 16               |
            | defaultDay          | Monday           |
            | PreferedTime        | 03:30            |
            | pitch               | vv pitch         |
            | teamLevel           | Begin            |
            | MeetingPlace        | USA              |
            | SeasonTeamName      | SWB 04           |
        When User upload the club logo "test-data/uploadsImages/RBFALogo.jpg"
        And the user taps the "Create Team" button within the section
        Then validate popup message as "Team created successfully!"


    @PageCollaboration @fix
    Scenario: Verify the user create the Collaboration from section
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  User opens the details of a created club with name "SouthWestBelgium"
        Then  User choose the " Sections " tab
        Then  User opens the details of a created season with name "SouthWestBelgium"
        Then  User choose the "collaborations" tab in section
        Then  User Click the Edit mode
        And the user taps the "Add ClubSection" button within the section
        When user selects Division Category "SouthWestBegiumTesting"
        And the user taps the "Add Club Section" button within the section
        When user types "SoutherBelgiumClub" in Search Name field
        And the user taps the "save" button within the section
        Then  user Click on the "Confirm" button
        Then validate popup message as "Collaboration created successfully!"









