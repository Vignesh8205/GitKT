@smoke @regression @clubSectionPersonFunctionFilter @basicFilter
Feature: Club Section Person Function Tab Basic Filter Functionality
    As a user
    I want to filter the Person Function grid on a Section detail page
    So that I can find specific person function records using basic filter criteria

  Background:
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

  @clubSectionPersonFunctionSearchFilter
  Scenario Outline: Filter Section Person Function tab by Search Person Name
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Person Function(s) tab on section detail page
    Then User starts capturing the section person function list API response
    Then User clicks the filter button on Section Person Function tab
    Then User applies Section Person Function Basic Filter with following criteria
      | Search | <SearchValue> |
    Then User clicks the Apply button in Section Person Function filter dialog
    Then User awaits and prints the section person function API response as JSON

    Examples:
      | SearchValue      |
      | OrionNew Testing |

  @clubSectionPersonFunctionStatusFilter
  Scenario Outline: Filter Section Person Function tab by Status
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Person Function(s) tab on section detail page
    Then User clicks the filter button on Section Person Function tab
    Then User clicks the Reset button in Section Person Function filter dialog
    Then User starts capturing the section person function list API response
    Then User applies Section Person Function Basic Filter with following criteria
      | Status | <StatusValue> |
    Then User clicks the Apply button in Section Person Function filter dialog
    Then User awaits and prints the section person function API response as JSON

    Examples:
      | StatusValue |
      | Active      |
      | Inactive    |

  @clubSectionPersonFunctionLevelFilter
  Scenario Outline: Filter Section Person Function tab by Level
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Person Function(s) tab on section detail page
    Then User starts capturing the section person function list API response
    Then User clicks the filter button on Section Person Function tab
    Then User applies Section Person Function Basic Filter with following criteria
      | Level | <LevelValue> |
    Then User clicks the Apply button in Section Person Function filter dialog
    Then User awaits and prints the section person function API response as JSON

    Examples:
      | LevelValue |
      | Section    |
      | Team       |

  @clubSectionPersonFunctionSectionFunctionFilter
  Scenario Outline: Filter Section Person Function tab by Section Function
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Person Function(s) tab on section detail page
    Then User starts capturing the section person function list API response
    Then User clicks the filter button on Section Person Function tab
    Then User applies Section Person Function Basic Filter with following criteria
      | Section Function | <SectionFunctionValue> |
    Then User clicks the Apply button in Section Person Function filter dialog
    Then User awaits and prints the section person function API response as JSON

    Examples:
      | SectionFunctionValue |
      | Futsal Co-Ordinator  |

  @clubSectionPersonFunctionTeamFilter
  Scenario Outline: Filter Section Person Function tab by Team
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Person Function(s) tab on section detail page
    Then User clicks the filter button on Section Person Function tab
    Then User clicks the Reset button in Section Person Function filter dialog
    Then User starts capturing the section person function list API response
    Then User applies Section Person Function Basic Filter with following criteria
      | Team | <TeamValue> |
    Then User clicks the Apply button in Section Person Function filter dialog
    Then User awaits and prints the section person function API response as JSON

    Examples:
      | TeamValue |
      | archana   |

  @clubSectionPersonFunctionTeamFunctionFilter
  Scenario Outline: Filter Section Person Function tab by Team Function
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Person Function(s) tab on section detail page
    Then User starts capturing the section person function list API response
    Then User clicks the filter button on Section Person Function tab
    Then User applies Section Person Function Basic Filter with following criteria
      | Team Function | <TeamFunctionValue> |
    Then User clicks the Apply button in Section Person Function filter dialog
    Then User awaits and prints the section person function API response as JSON

    Examples:
      | TeamFunctionValue |
      | Team Delegate     |

  @clubSectionPersonFunctionDateRangeFilter
  Scenario Outline: Filter Section Person Function tab by Date Range
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Person Function(s) tab on section detail page
    Then User starts capturing the section person function list API response
    Then User clicks the filter button on Section Person Function tab
    Then User applies Section Person Function Basic Filter with following criteria
      | Date Range | <DateRangeValue> |
    Then User clicks the Apply button in Section Person Function filter dialog
    Then User awaits and prints the section person function API response as JSON

    Examples:
      | DateRangeValue          |
      | 01/04/2026 - 30/04/2026 |
