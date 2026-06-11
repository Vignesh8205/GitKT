@matchGridBasicFilter @regression @basicFilter
Feature: Match Grid and Date Grid basic filter
     As a user
     I want to use basic filter in match grid and date grid 
     So that I can filter the data as per my requirement

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
    Given User Can able to access the Main menu in home page
    And user choose the "Competition Management" tab
#Fail need to fix 

  Scenario: Use Basic Filter in Match Grid to verify element visibility
    And User select the "Match Grid" tab
    When the user clicks on the "filter" icon
    And the user clicks on the "basic filter" Tab
    Then verify the "Basic filter" heading should be visible
    And verify the "Current Filter" textbox should be visible
    And verify the "Template Name" input field should be visible
    And verify the "Total Teams" input should be visible
    And verify the "Match Day Count" input should be visible
    And verify the "Status"  text should be visible
    And verify the "Active" button should be visible
    And verify the "Inactive" button should be visible
    And verify the "Apply" button should be visible
    And verify the "Reset" button should be visible
    And verify the "Cancel" button should be visible
    Then the user clicks on the "Cancel" button

  @matchGridTemplateNameBasicFilter
  Scenario Outline: Use Basic Filter Template Name in Match Grid and validate API response
    When User select the "<Grid Type>" tab
    And the user clicks on the "filter" icon
    And the user clicks on the "basic filter" Tab
    And User enters value as "<Input Value>" in "<Field>"
    And Wait for response of match grid API
    And User clicks Apply button in basic filter
    Then verify all API response records have "<Field>" matching "<expected result>" from match grid basic filter API response

    Examples:
      | Input Value | Field           | expected result | Grid Type  |
      | Template 1  | Template Name   | Template 1      | Match Grid |
      | Template 1  | Total Teams     | Template 1      | Match Grid |
      | Template 1  | Match Day Count | Template 1      | Match Grid |

  @matchGridStatusBasicFilter
  Scenario Outline: Use Basic Filter Status in Match Grid and validate API response
    When User select the "<Grid Type>" tab
    And the user clicks on the "filter" icon
    And the user clicks on the "basic filter" Tab
    And User enters value as "<Input Value>" in "<Field>"
    And Wait for response of match grid API
    And User clicks Apply button in basic filter
    Then verify all API response records have "<Field>" matching "<expected result>" from match grid basic filter API response

    Examples:
      | Input Value | Field  | expected result | Grid Type  |
      | Active      | Status | Active          | Match Grid |
      | Inactive    | Status | Inactive        | Match Grid |

  @needfix
  Scenario: Use Basic Filter in Date Grid to verify element visibility
    And User select the "Date Grid" tab
    When the user clicks on the "filter" icon
    And the user clicks on the "basic filter" Tab
    Then verify the "Basic filter" heading should be visible
    And verify the "Current Filter" textbox should be visible
    And verify the "Template Name" input field should be visible
    And verify the "Total Teams" input should be visible
    And verify the "Match Day Count" input should be visible
    And verify the "Status"  text should be visible
    And verify the "Active" button should be visible
    And verify the "Inactive" button should be visible
    And verify the "Apply" button should be visible
    And verify the "Reset" button should be visible
    And verify the "Cancel" button should be visible
        # And verify the "Save as Segment" button should be visible
    Then the user clicks on the "Cancel" button

  Scenario Outline: Use Basic Filter Template Name in Date Grid and validate API response
    When User select the "<Grid Type>" tab
    And the user clicks on the "filter" icon
    And the user clicks on the "basic filter" Tab
    And User enters value as "<Input Value>" in "<Field>"
    And Wait for response of date grid API
    And User clicks Apply button in basic filter
    Then verify all API response records have "<Field>" matching "<expected result>" from match grid basic filter API response

    Examples:
      | Input Value | Field           | expected result | Grid Type |
      | Template 1  | Template Name   | Template 1      | Date Grid |
      | Template 1  | Total Teams     | Template 1      | Date Grid |
      | Template 1  | Match Day Count | Template 1      | Date Grid |

  @datagridtemplatefilter
  Scenario Outline: Use Basic Filter Status in Date Grid and validate API response
    When User select the "<Grid Type>" tab
    And the user clicks on the "filter" icon
    And the user clicks on the "basic filter" Tab
    And User clicks Reset button in basic filter
    And User enters value as "<Input Value>" in "<Field>"
    And Wait for response of date grid API
    And User clicks Apply button in basic filter
    Then verify all API response records have "<Field>" matching "<expected result>" from match grid basic filter API response

    Examples:
      | Input Value | Field  | expected result | Grid Type |
      | Active      | Status | Active          | Date Grid |
      | Inactive    | Status | Inactive        | Date Grid |
