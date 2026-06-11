@smoke @regression @clubPage @AllActions
Feature: Club Management Page Functionality
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

    @clubPagehomeTab @clubPageFinanceTab 
    Scenario: Create club and fill Home tab and Finance tab details
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  User Click the Edit mode 
        Then  user Click on the "Create New Club" button
        And user enter the club details
            | Club Name           | random |
            | Federation          | RBFA   |
            | Registration Number | random |
        When User upload the club logo "test-data/uploadsImages/RBFALogo.jpg"
        Then User choose the Club colors from "clubManageMentPage.colors"
        Then  user Click on the "Create Club" button
        Then validate popup message as "Club created successfully!"
        Then  User clicks the Edit icon on the club detail page
        When User updates the following Club Details on the Home tab:
            | FIFA ID                 | 100                 |
            | Abbreviation            | Ori                 |
            | Correspondence Language | English             |
            | Founding Date           | current             |
            | Short Name              | Realmadrid          |
            | Club Code               | Refree Associations |
            | Legal Status            | Cooperative Company |
        Then user Click on the "Update" button
        Then validate popup message as "Club Details updated successfully!"
        Then  User clicks the Edit icon on the Club Website section
        Then  user Click on the "Add Club Website" button
        When User updates the Club Websites with the following entries:
            | Name      | Link    | Description  |
            | Website 9 | goooogl | Main Website |   
        Then user Click on the "Update" button
        Then validate popup message as "Club website added successfully!"
        Then  User choose the "Finance" tab
        # Then  user Click on the "Confirm" button
        Then  User clicks the Edit icon on the club detail page
        When  User updates the following Financial Details:
            | Bank Name    | UI Bank Test  |
            | Bank Account | random        |
            | VAT Number   | random        |
        Then  user Click on the "Update" button
        Then validate popup message as "Financial Details updated successfully!"
            
     
    @clubPagePersonFunctionsTab
    Scenario: Fill the Person Function tab details of an existing club
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  User clicks the first result in the club listing grid
        Then  User choose the "Person Function(s)" tab
        Then  User clicks the Edit icon on the club detail page
        Then  user Click on the "Add Function progress" button
        When user adds Club Function with following details:
            | Person Name | OrionNew Testing |
            | Club        | default          |
            | Function    | Club Clothing Admin|
            | Start Date  | current          |
            | End Date    | future           |
        When user Section Function with following details:
            | Section    | first                     |
            | Function   | Futsal Co-Ordinator       |
            | Start Date | current                   |
            | End Date   | future                    |
        When user Team Function with following details:
            | Section    | first                   |
            | Team       | first                   |
            | Function   | Assistant Coach         |
            | Start Date | current                 |
            | End Date   | future                  |
        Then  user Click on the "Confirm" button
        Then validate popup message as "Function added successfully!"


    @clubPagePersonFunctionEditDelete
    Scenario: Edit and Delete the Person Function record of an existing club
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  User clicks the first result in the club listing grid
        Then  User choose the "Person Function(s)" tab
        Then  User clicks the Edit icon on the club detail page
        Then  user selects the first person function record from the grid
        Then  user clicks the "Edit" button on Person Function toolbar
        When  user updates Person Function Status to "Inactive"
        Then  user Click on the "Confirm" button
        Then validate popup message as "Function updated successfully!"
        Then  user selects the first person function record from the grid
        Then  user clicks the "Delete" button on Person Function toolbar
        Then  user Click on the "Confirm" button
        Then validate popup message as "Function deleted successfully!"


    @clubPageSectionTab @fix
    Scenario: Fill the Section tab details of an existing club
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  User searches for clubs created today in the listing grid
        Then  User clicks the second result in the club listing grid
        Then  User choose the " Sections " tab
        Then  User clicks the Edit icon on the club detail page
        Then  user Click on the "Add Section" button
        When user adds section with following details:
            | Registration Number | random        |
            | Sportive Type       | Amateur       |
            | Format              | Football      |
            | Gender Offering     | Female        |
        Then  user Click on the "Confirm" button
        Then validate popup message as "Section added successfully!."



    @clubPageVenueTab @fix
    Scenario: Fill the Venue tab details of an existing club
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  User searches for clubs created today in the listing grid
        Then  User clicks the first result in the club listing grid
        Then  User choose the "Venues" tab
        Then  User clicks the Edit icon on the club detail page
        Then  user Click on the "Map Venue" button
        When user fill Venue with following details:
            | Name    | vv venue     |
            | Purpose | training     |
        Then  user Click on the "Confirm" button
        Then validate popup message as "Venue mapped successfully!"
        Then User able to edit the record from Venues "vv venue"
        When user fill Venue with following details:
            | Name    | null  |
            | Purpose | match |
        Then  user Click on the "Confirm" button
        Then validate popup message as "Mapped venue information updated successfully!"
        Then User able to Delete the record from Venues "vv venue"
        Then  user Click on the "Confirm" button
        Then validate popup message as "Mapped venue deleted successfully!"


   