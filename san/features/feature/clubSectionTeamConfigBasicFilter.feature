@smoke @regression @clubSectionTeamConfigBasicFilter @basicFilter
Feature: Club Section Team Configuration Basic Filter Functionality
    As a user
    I want to filter the Team Configuration grid on a Section detail page using Basic Filter
    So that I can find specific team configurations based on filter criteria

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
    # =========================================================
    # SEARCH FILTER (AutoComplete)
    # =========================================================

  @clubSectionTeamConfigSearchFilter
  Scenario Outline: Filter Team Config by Search "<SearchValue>" and validate API response
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Team Configuration tab on section detail page
    Then User clicks the filter button on Team Configuration tab to open filter options
    Then User verifies "Basic Filter" tab is displayed in Team Config filter dialog
    Then User starts capturing the Team Config list API response
    Then User applies Team Config Basic Filter with following criteria
      | FilterField | FilterValue   |
      | Search      | <SearchValue> |
    Then User clicks the Apply button in Team Config filter dialog
    Then User prints the Team Config API response JSON
    Then User logs UI vs API record count for Team Config
    Then User verifies the Team Config API total count is greater than zero

    Examples:
      | SearchValue           |
      | National Level Team 2 |
    # =========================================================
    # STATUS BADGE FILTER
    # =========================================================

  @clubSectionTeamConfigStatusFilter
  Scenario Outline: Filter Team Config by Status "<StatusValue>" and validate API response
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Team Configuration tab on section detail page
    Then User clicks the filter button on Team Configuration tab to open filter options
    Then User verifies "Basic Filter" tab is displayed in Team Config filter dialog
    Then User clicks the Reset button in Team Config filter dialog
    Then User starts capturing the Team Config list API response
    Then User applies Team Config Basic Filter with following criteria
      | FilterField | FilterValue   |
      | Status      | <StatusValue> |
    Then User clicks the Apply button in Team Config filter dialog
    Then User prints the Team Config API response JSON
    Then User logs UI vs API record count for Team Config
    Then User verifies the Team Config API total count is greater than zero

    Examples:
      | StatusValue |
      | Active      |
            # | Inactive    |
    # =========================================================
    # DIVISION CATEGORY FILTER
    # =========================================================

  @clubSectionTeamConfigDivisionCategoryFilter
  Scenario Outline: Filter Team Config by Division Category "<DivisionCategoryValue>" and validate API response
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Team Configuration tab on section detail page
    Then User clicks the filter button on Team Configuration tab to open filter options
    Then User verifies "Basic Filter" tab is displayed in Team Config filter dialog
    Then User starts capturing the Team Config list API response
    Then User applies Team Config Basic Filter with following criteria
      | FilterField       | FilterValue             |
      | Division Category | <DivisionCategoryValue> |
    Then User clicks the Apply button in Team Config filter dialog
    Then User prints the Team Config API response JSON
    Then User logs UI vs API record count for Team Config
    Then User verifies the Team Config API total count is greater than zero

    Examples:
      | DivisionCategoryValue |
      | Under 19 code         |
    # =========================================================
    # TEAM CLASSIFICATION FILTER (EJ2 MultiSelect)
    # =========================================================

  @clubSectionTeamConfigClassificationFilter
  Scenario Outline: Filter Team Config by Team Classification "<TeamClassificationValue>" and validate API response
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Team Configuration tab on section detail page
    Then User clicks the filter button on Team Configuration tab to open filter options
    Then User verifies "Basic Filter" tab is displayed in Team Config filter dialog
    Then User starts capturing the Team Config list API response
    Then User applies Team Config Basic Filter with following criteria
      | FilterField         | FilterValue               |
      | Team Classification | <TeamClassificationValue> |
    Then User clicks the Apply button in Team Config filter dialog
    Then User prints the Team Config API response JSON
    Then User logs UI vs API record count for Team Config
    Then User verifies the Team Config API total count is greater than zero

    Examples:
      | TeamClassificationValue |
      | National Level Team 2   |
    # =========================================================
    # TAGS FILTER (EJ2 MultiSelect)
    # =========================================================

  @clubSectionTeamConfigTagsFilter
  Scenario Outline: Filter Team Config by Tags "<TagsValue>" and validate API response
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Team Configuration tab on section detail page
    Then User clicks the filter button on Team Configuration tab to open filter options
    Then User verifies "Basic Filter" tab is displayed in Team Config filter dialog
    Then User starts capturing the Team Config list API response
    Then User applies Team Config Basic Filter with following criteria
      | FilterField | FilterValue |
      | Tags        | <TagsValue> |
    Then User clicks the Apply button in Team Config filter dialog
    Then User prints the Team Config API response JSON
    Then User logs UI vs API record count for Team Config
    Then User verifies the Team Config API total count is greater than zero

    Examples:
      | TagsValue |
      | Tag002    |
