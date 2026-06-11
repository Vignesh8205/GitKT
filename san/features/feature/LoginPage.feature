@regression @LoginPageModule
Feature: Login Functionality
    As a user
    I want to be able to log in to the application
    So that I can access the system

  Scenario: login 1
    Given I am on the login page
    And I load credentials from "test-data/credentials.json"
    And I load testData from "test-data/testData.json"
    When I enter username from "validUser"
    And I enter password from "validUser"
    And I click the login button
    Then I should be logged in successfully
    Then User select the Role on role list
       # When I select "RegSeason" in the Season dropdown
        # Then  User Clicking on submit button

  @login2
  Scenario: login 2
    Given I am on the login page
    And I load credentials from "test-data/credentials.json"
    And I load testData from "test-data/testData.json"
    When I enter username from "validUser"
    And I enter password from "validUser"
    And I click the login button
    Then I should be logged in successfully
    Then User select the Role on role list
    When I select "RegSeason" in the Season dropdown
    Then User Clicking on submit button
