@smoke @regression @matchChangeRequestCreate 
Feature: Competition Management - Match Change Request Template Creation
    As a user
    I want to create a Match Change Request template with configuration
    So that I can define change request rules for competitions

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
    # CREATE MATCH CHANGE REQUEST TEMPLATE
    # =========================================================

    @matchChangeRequestCreateTemplate
    Scenario Outline: Create Match Change Request Template with <Season> season and <ChangeRequestType> type
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Change Request sub tab
        Then  User verifies the Change Request page title
        Then  User clicks the Edit mode button on Ranking page
        Then  User clicks the Create Template button
        Then  User fills the Ranking Template Name with auto-generated name
        Then  User fill the Season dropdown with "<Season>"
        Then  User fill the Federation with "<Federation>" and Region with "<Region>"
        Then  User fills the Ranking Description with "Automation test description for change request template"
        Then  User navigate to the Change Request Configurations and click the add button
        Then  User navigate to the add configuration popup
        Then  User fill the Change Request Type with "<ChangeRequestType>"
        Then  User choose Requested By with "<RequestedBy>" and Approved By with "<ApprovedBy>"
        Then  User move to Request Submission Period section
        Then  User fill the Start Date with "<StartDate>" and End Date with "<EndDate>"
        Then  User fill the Start Time with "<StartTime>" and End Time with "<EndTime>"
        Then  User fill the Deadline Before Kickoff with <Duration>
        Then  User click the Enable day restrictions for rescheduling checkbox
        Then  User fill the Rescheduled FROM with "<RescheduledFrom>" and Rescheduled TO with "<RescheduledTo>"
        Then  User click the add configuration Create button
        Then  validate popup message as "Configuration added successfully!"
        Then  User clicks the Create button for Ranking Template
        Then  validate popup message as "Template Created Successfully!"

        Examples:
            | Season    | Federation | Region  | ChangeRequestType | RequestedBy | ApprovedBy | StartDate  | EndDate    | StartTime | EndTime | Duration | RescheduledFrom | RescheduledTo |
            | RegSeason | RBFA       | Region1 | Date & Time       | Home Team   | Away Team  | 13/05/2026 | 15/05/2026 | 14:30     | 14:00   | 86400    | Monday          | Wednesday     |