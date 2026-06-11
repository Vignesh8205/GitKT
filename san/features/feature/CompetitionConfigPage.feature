@regression @CompetitionConfigPageModule @CompConfig 
Feature: Competition Configuration Functionality
         As a user 
         I want to able to create competition configuration, update competition configuration, deactivate, activate and delete.

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

  Scenario: Create competition configuration
    Given User Can able to access the Main menu in home page
    And User choose the competition management tab
    When the user clicks on the Competition Configuration tab
    And User Click the Edit mode 
    And the user clicks on Create Competition Configuration button
    And the user enters a competition code
    And the user enters a competition name
    And the user selects the competition type as "Championship"
    And the user selects the competition level as "Level 1"
    And the user selects the division as "Orion Division"
    And the user selects the organization as "competitive"
    And the user enters a description as "Competition configuration updated"
    And the user clicks on the Next button
    And the user clicks on Add Competition Phase button
    And the user enters the competition phase order
    And the user enters the competition phase name
    And the user enters the total number of teams
    And the user selects the match grid
    And the user selects the general ranking as "Cumulative Ranking"
    And the user selects the period ranking as "Monthly Performance Ranking"
    And the user selects the fair play ranking as "Discipline Ranking"
    And the user enters the fair play scoring window
    And the user clicks on the Confirm button
    Then a competition phase added success message should appear on the screen
    When the user clicks on the Create Competition Configuration button
    Then a competition configuration created success message should appear on the screen

   