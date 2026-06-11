@advanceFilter @regression
Feature: Club Advance Filter
     As a user
     I want to use advance filter
     So that I can filter the data as per my requirement


 Background:
        Given I am on the login page
        And I load credentials from "test-data/credentials.json"
        When  I enter username from "validUser"
        And   I enter password from "validUser"
        And   I click the login button
        Then  I should be logged in successfully
        Then  User select the Role on role list
        When I select "Jio Season - Jio Season" in the Season dropdown
        Then  User Clicking on submit button
        Given User Can able to access the Main menu in home page
        And  User choose the "Club Management" tab
       
        
    @Filterfix1
    Scenario: Use Advanced Filter in Club Management to verify the record with status, name and federation
       When the user clicks on the "filter" icon
       And the user clicks on the "advanced filter" Tab
       And the user clicks on the "plus" button
        And the user enters details
        | Group or Conditions   | Add Group        |
        | Field                 | <field>          |
        | Condition             | <condition>      |
        | Value                 | <value>          |
        And the user clicks on the "apply advance filter" button
        Then verify actual ouput should match with table output
         |Field                | <field>                       |
         |Expected Output      | <expected output>             |
        
    Examples:
        | field      | condition      | value       | expected output   |
        | Status     | In             | Operational | Operational       |
        | Name       | Contains       | Prem        | Prem              |
        | Federation | Starts with    | RB          | RBFA              |

     
     @ClubAdvanceFilter1
         Scenario: Use Advanced Filter in Club Management -> Person Functions to verify the record with different conditions in club management
        And open "CAT Club" from the club                    
        And the user clicks on the "Person Function(s)" Tab
        When the user clicks on the "filter" icon
        And the user clicks on the "advanced filter" Tab
        And the user clicks on the "plus" button
        And the user enters details
        | Group or Conditions   | Add Group        |
        | Field                 | <field>          |
        | Condition             | <condition>      |
        | Value                 | <value>          |
        And  Wait for response of "/person-function/list" API
        And the user clicks on the "apply advance filter" button
        Then verifies all API response records have "<field>" matching "<expected output>"
    Examples:
        | field              | condition      | value                | expected output      |
        | Section Function   | Starts with    | Futsal Co-Ordinator  | Futsal Co-Ordinator  |
        # | Status             | In             | Active               | Active               |
        # | Team Function      | Contains       | Team Delegate        | Team Delegate        |
                
