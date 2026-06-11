@smoke @regression @personManagemantPage @AllActions
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

    @personCreateTest
    Scenario Outline: Verify the user create the Person management - <FirstName> <LastName>
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  verify the page title for "Person Management"
        Then  User clicks the Edit mode button on Person Management page
        Then  user Click on "Create Person" button
        Then  user enter the Person details
            | Person Code    | random          |
            | FirstName      | <FirstName>     |
            | LastName       | <LastName>      |
            | Date of Birth  | past            |
            | Email          | random          |
            | Gender         | <Gender>        |
            | Federation     | <Federation>    |
            | Place of Birth | <PlaceOfBirth>  |
        Then user enter the Person other details
            | MaritalStatus | <MaritalStatus> |
            | Profession    | <Profession>    |
        When User upload the profile photo via browse button "test-data\uploadsImages\profilephoto.jpg"
        Then User choose address type set primary addressand address from dropdown on Add Address popup window
            | Address Type | <AddressType> |
            | Address      | <Address>     |
        Then  user Click on the "Confirm" button
        Then validate popup message as "Address added successfully!"
        Then  User access the "Create Person" button
        Then validate popup message as "Person created successfully!"
        Then  User verifies the Home tab is displayed
        Then  User navigates to Finance Details section and clicks Edit mode
        When  User can fill the Finance Details
            | International Bank Number | random |
            | Bank Name                 | random |
        Then  User clicks the Update button on Finance Details section
        Then validate popup message as "Finance Details updated successfully!"

        Examples:
            | FirstName | LastName | Gender | Federation | PlaceOfBirth | MaritalStatus | Profession | AddressType | Address | PersonName      |
            | OrionNew  | Nikkil   | Male   | RBFA       | Chennai      | Bachelor      | EEE        | Home        | ambit   | OrionNew Nikkil |


    

    @personMembershipTab
    Scenario Outline: Verify the user create the Membership Page for person - <Club>
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  verify the page title for "Person Management"
        Then  User searches for the recently created person by PersonRBFA code and opens the first record
        Then  User can choose the "Membership" tab
        Then  user Click on "Add Membership" button
        Then  User can add the memebership details
            | Club         | <Club>        |
            | Club Section | <ClubSection> |
            | Start Date   | current       |
            | End Date     | future        |
        Then user Click on the "Confirm" button
        Then validate popup message as "Membership added successfully!"
        Then User Edit the existing club function "<EditClub>" from grid
        Then  User can add the memebership details
            | Start Date | current |
            | End Date   | future  |
            | Status     | Active  |
        Then user Click on the "Confirm" button
        Then validate popup message as "Membership updated successfully!"
        Then User deletes the club "<DeleteClub>" from grid
        Then  user Click on the "Confirm" button
        Then validate popup message as "Membership deleted successfully!"

        Examples:
            | Club    | ClubSection   | EditClub                | DeleteClub              |
            | !!!!Qqq | !!!!Qqq       | !!!!Qqq                 |  !!!!Qqq                |

    @clubfunction @personFucntionTab
    Scenario: Verify the user create the Club Function Page for person
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  verify the page title for "Person Management"
        Then  User searches for the recently created person by PersonRBFA code and opens the first record
        Then  User can choose the "Functions" tab
        Then  User click the Edit mode for Club function section
        When User clicks Add Function for "Club Function(s)"
        When User add function with below details
            | Club       | !!!!Qqq    |
            | Function   | Club Admin |
            | Start Date | current    |
            | End Date   | future     |
        Then  user Click on the "Confirm" button
        Then validate popup message as "Function added successfully!"
        Then User edit the function from club "!!!!Qqq" and function "Club Function(s)"
        When User add function with below details
            | Club       | !!!!Qqq             |
            | Function   | Club Clothing Admin |
            | Start Date | current             |
            | End Date   | future              |
            | Status     | Inactive            |
        Then  user Click on the "Confirm" button
        Then validate popup message as "Function updated successfully!"
        Then User selects "Active" and "Inactive" status in "Club Function(s)" section
        Then User deletes the function from club "!!!!Qqq" and function "Club Function(s)"
        Then  user Click on the "Confirm" button
        Then validate popup message as "Function deleted successfully!"
           


    @sectionfunction @personFucntionTab
    Scenario: Verify the user create the Section Function Page for person
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  verify the page title for "Person Management"
        Then  User searches for the recently created person by PersonRBFA code and opens the first record
        Then  User can choose the "Functions" tab
        Then  User click the Edit mode for Section function section
        When User clicks Add Function for "Section Function(s)"
        When User add function with below details
            | Club       | !!!!Qqq                 |
            | Section    | !!!!Qqq                 |
            | Function   | Women's Section Manager |
            | Start Date | current                 |
            | End Date   | future                  |
        Then  user Click on the "Confirm" button
        Then validate popup message as "Function added successfully!"
        Then User edit the function from club "!!!!Qqq" and function "Section Function(s)"
        When User add function with below details
            | Club       | !!!!Qqq                 |
            | Function   | Futsal Co-Ordinator     |
            | Start Date | current                 |
            | End Date   | future                  |
            | Status     | Inactive                |
        Then  user Click on the "Confirm" button
        Then validate popup message as "Function updated successfully!"
         Then User selects "Active" and "Inactive" status in "Section Function(s)" section
        Then User deletes the function from club "!!!!Qqq" and function "Section Function(s)"
        Then  user Click on the "Confirm" button
        Then validate popup message as "Function deleted successfully!"


    @teamfunction @personFucntionTab
    Scenario: Verify the user create the Team Function Page for person
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  verify the page title for "Person Management"
        Then  User searches for the recently created person by PersonRBFA code and opens the first record
        Then  User can choose the "Functions" tab
        Then  User click the Edit mode for Team function section
        When User clicks Add Function for "Team Function(s)"
        When User add function with below details
            | Club       | !!!!Qqq             |
            | Section    | !!!!Qqq             |
            | Team       | !!!!Qqq A RegSeason |
            | Function   | Assistant Coach     |
            | Start Date | current             |
            | End Date   | future              |
        Then  user Click on the "Confirm" button
        Then validate popup message as "Function added successfully!"
        Then User edit the function from club "!!!!Qqq" and function "Team Function(s)"
        When User add function with below details
            | Club       | !!!!Qqq             |
            | Function   | Assistant Coach     |
            | Team       | !!!!Qqq B RegSeason |
            | Start Date | current             |
            | End Date   | future              |
            | Status     | Inactive            |
        Then  user Click on the "Confirm" button
        Then validate popup message as "Function updated successfully!"
        Then User selects "Active" and "Inactive" status in "Team Function(s)" section
        Then User deletes the function from club "!!!!Qqq" and function "Team Function(s)"
        Then  user Click on the "Confirm" button
        Then validate popup message as "Function deleted successfully!"



 @personUsersTab
    Scenario: Verify the user create the Users for person
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  verify the page title for "Person Management"
        Then  User searches for the recently created person by PersonRBFA code and opens the first record
        Then  User can choose the "Users" tab
        Then User click the Edit Mode for User Owner section
        Then  user Click on " Add User " button
        Then  User can add the user owner Details
        | Name      | Club Admin    |
        Then User clicks the Update button for Owner section
        Then validate popup message as "Mapped User added successfully!"
        Then User selects the row checkbox
        Then User delete the function from user
        Then user Click on the "Confirm" button
        Then validate popup message as "User deleted successfully!"
        Then User click the Edit Mode for To act on behalf section
        Then  user Click on " Add Behalf User " button
        Then  User can add the user To act on behalf Details
        | Name      | Super Admin    |
        Then User clicks the Update button for To act on behalf
        Then validate popup message as "Mapped User added successfully!"
        Then User selects the row checkbox
        Then User edit the Mapped User added
        | Name      | Abirami R   |
        Then User clicks the Update button for To act on behalf
        Then validate popup message as "Mapped user updated successfully!"
        Then User selects the row checkbox
        Then User delete the user from user from Users to act on behalf list
        Then user Click on the "Confirm" button
        Then validate popup message as "Mapped user removed successfully!"
    


