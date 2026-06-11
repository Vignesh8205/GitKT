@smoke @regression @clubSectionTeamsBasicFilter @basicFilter
Feature: Club Section Teams Basic Filter Functionality
    As a user
    I want to filter the Teams grid on a Section detail page using Basic Filter
    So that I can find specific teams based on filter criteria

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
    # Doubt need clarification: For Search filter, should we validate the API response contains the search value in any of the fields or just validate the API total count is greater than zero as mentioned in the scenario outline?

  @clubSectionTeamsSearchFilter
  Scenario Outline: Filter Teams by Search "<SearchValue>" and validate API response
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Teams tab on section detail page
    Then User clicks the filter button on Teams tab to open filter options
    Then User verifies "Basic Filter" tab is displayed in Teams filter dialog
    Then User starts capturing the Teams list API response
    Then User applies Teams Basic Filter with following criteria
      | FilterField | FilterValue   |
      | Search      | <SearchValue> |
    Then User clicks the Apply button in Teams filter dialog
    Then User prints the Teams API response JSON
    Then User logs UI vs API record count for Teams
    Then User verifies the Teams API total count is greater than zero

    Examples:
      | SearchValue           |
      | National Level Team 2 |
    # =========================================================
    # STATUS BADGE FILTER
    # =========================================================

  @clubSectionTeamsStatusFilter
  Scenario Outline: Filter Teams by Status "<StatusValue>" and validate API response
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Teams tab on section detail page
    Then User clicks the filter button on Teams tab to open filter options
    Then User verifies "Basic Filter" tab is displayed in Teams filter dialog
    Then User clicks the Reset button in Teams filter dialog
    Then User starts capturing the Teams list API response
    Then User applies Teams Basic Filter with following criteria
      | FilterField | FilterValue   |
      | Status      | <StatusValue> |
    Then User clicks the Apply button in Teams filter dialog
    Then User prints the Teams API response JSON
    Then User logs UI vs API record count for Teams
    Then User verifies the Teams API total count is greater than zero

    Examples:
      | StatusValue |
      | Active      |
      | Inactive    |
    # =========================================================
    # GENDER BADGE FILTER
    # =========================================================

  @clubSectionTeamsGenderFilter
  Scenario Outline: Filter Teams by Gender "<GenderValue>" and validate API response
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Teams tab on section detail page
    Then User clicks the filter button on Teams tab to open filter options
    Then User verifies "Basic Filter" tab is displayed in Teams filter dialog
    Then User starts capturing the Teams list API response
    Then User applies Teams Basic Filter with following criteria
      | FilterField | FilterValue   |
      | Gender      | <GenderValue> |
    Then User clicks the Apply button in Teams filter dialog
    Then User prints the Teams API response JSON
    Then User logs UI vs API record count for Teams
    Then User verifies the Teams API total count is greater than zero

    Examples:
      | GenderValue |
      | Female      |
    #   | Male        |
    # =========================================================
    # DIVISION CATEGORY FILTER
    # =========================================================
    # Doubt need clarification: For Division Category filter, should we validate the API response contains the Division Category value in the respective field for all the records or just validate the API total count is greater than zero as mentioned in the scenario outline?

  @clubSectionTeamsDivisionCategoryFilter
  Scenario Outline: Filter Teams by Division Category "<DivisionCategoryValue>" and validate API response
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Teams tab on section detail page
    Then User clicks the filter button on Teams tab to open filter options
    Then User verifies "Basic Filter" tab is displayed in Teams filter dialog
    Then User starts capturing the Teams list API response
    Then User applies Teams Basic Filter with following criteria
      | FilterField       | FilterValue             |
      | Division Category | <DivisionCategoryValue> |
    Then User clicks the Apply button in Teams filter dialog
    Then User prints the Teams API response JSON
    Then User logs UI vs API record count for Teams
    Then User verifies the Teams API total count is greater than zero

    Examples:
      | DivisionCategoryValue |
      | Under 20              |
    # =========================================================
    # TEAM CLASSIFICATION FILTER
    # =========================================================

  @clubSectionTeamsClassificationFilter
  Scenario Outline: Filter Teams by Team Classification "<TeamClassificationValue>" and validate API response
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Teams tab on section detail page
    Then User clicks the filter button on Teams tab to open filter options
    Then User verifies "Basic Filter" tab is displayed in Teams filter dialog
    Then User starts capturing the Teams list API response
    Then User applies Teams Basic Filter with following criteria
      | FilterField         | FilterValue               |
      | Team Classification | <TeamClassificationValue> |
    Then User clicks the Apply button in Teams filter dialog
    Then User prints the Teams API response JSON
    Then User logs UI vs API record count for Teams
    Then User verifies the Teams API total count is greater than zero

    Examples:
      | TeamClassificationValue |
      | National Level Team 2   |
    # =========================================================
    # SUFFIX BADGE FILTER
    # =========================================================

  @clubSectionTeamsSuffixFilter
  Scenario Outline: Filter Teams by Suffix "<SuffixValue>" and validate API response
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Teams tab on section detail page
    Then User clicks the filter button on Teams tab to open filter options
    Then User verifies "Basic Filter" tab is displayed in Teams filter dialog
    Then User starts capturing the Teams list API response
    Then User applies Teams Basic Filter with following criteria
      | FilterField | FilterValue   |
      | Suffix      | <SuffixValue> |
    Then User clicks the Apply button in Teams filter dialog
    Then User prints the Teams API response JSON
    Then User logs UI vs API record count for Teams
    Then User verifies the Teams API total count is greater than zero

    Examples:
      | SuffixValue |
      | A           |
    # =========================================================
    # DEFAULT DAY FILTER (EJ2 MultiSelect)
    # =========================================================

  @clubSectionTeamsDefaultDayFilter
  Scenario Outline: Filter Teams by Default Day "<DefaultDayValue>" and validate API response
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Teams tab on section detail page
    Then User clicks the filter button on Teams tab to open filter options
    Then User verifies "Basic Filter" tab is displayed in Teams filter dialog
    Then User starts capturing the Teams list API response
    Then User applies Teams Basic Filter with following criteria
      | FilterField | FilterValue       |
      | Default Day | <DefaultDayValue> |
    Then User clicks the Apply button in Teams filter dialog
    Then User prints the Teams API response JSON
    Then User logs UI vs API record count for Teams
    Then User verifies the Teams API total count is greater than zero

    Examples:
      | DefaultDayValue |
      | Monday          |
    # =========================================================
    # PITCH FILTER (EJ2 MultiSelect)
    # =========================================================

  @clubSectionTeamsPitchFilter
  Scenario Outline: Filter Teams by Pitch "<PitchValue>" and validate API response
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Teams tab on section detail page
    Then User clicks the filter button on Teams tab to open filter options
    Then User verifies "Basic Filter" tab is displayed in Teams filter dialog
    Then User starts capturing the Teams list API response
    Then User applies Teams Basic Filter with following criteria
      | FilterField | FilterValue  |
      | Pitch       | <PitchValue> |
    Then User clicks the Apply button in Teams filter dialog
    Then User prints the Teams API response JSON
    Then User logs UI vs API record count for Teams
    Then User verifies the Teams API total count is greater than zero

    Examples:
      | PitchValue |
      | vv pitch   |
    # =========================================================
    # ORGANIZATION FILTER (EJ2 MultiSelect)
    # =========================================================

  @clubSectionTeamsOrganizationFilter
  Scenario Outline: Filter Teams by Organization "<OrganizationValue>" and validate API response
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Teams tab on section detail page
    Then User clicks the filter button on Teams tab to open filter options
    Then User verifies "Basic Filter" tab is displayed in Teams filter dialog
    Then User starts capturing the Teams list API response
    Then User applies Teams Basic Filter with following criteria
      | FilterField  | FilterValue         |
      | Organization | <OrganizationValue> |
    Then User clicks the Apply button in Teams filter dialog
    Then User prints the Teams API response JSON
    Then User logs UI vs API record count for Teams
    Then User verifies the Teams API total count is greater than zero

    Examples:
      | OrganizationValue |
      | competitive       |
    # =========================================================
    # SQUAD SIZE FILTER
    # =========================================================

  @clubSectionTeamsSquadSizeFilter
  Scenario Outline: Filter Teams by Squad Size "<SquadSizeValue>" and validate API response
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Teams tab on section detail page
    Then User clicks the filter button on Teams tab to open filter options
    Then User verifies "Basic Filter" tab is displayed in Teams filter dialog
    Then User starts capturing the Teams list API response
    Then User applies Teams Basic Filter with following criteria
      | FilterField | FilterValue      |
      | Squad Size  | <SquadSizeValue> |
    Then User clicks the Apply button in Teams filter dialog
    Then User prints the Teams API response JSON
    Then User logs UI vs API record count for Teams
    Then User verifies the Teams API total count is greater than zero

    Examples:
      | SquadSizeValue |
      |             15 |
    # =========================================================
    # TEAM LEVEL FILTER (EJ2 MultiSelect)
    # =========================================================

  @clubSectionTeamsTeamLevelFilter
  Scenario Outline: Filter Teams by Team Level "<TeamLevelValue>" and validate API response
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Teams tab on section detail page
    Then User clicks the filter button on Teams tab to open filter options
    Then User verifies "Basic Filter" tab is displayed in Teams filter dialog
    Then User starts capturing the Teams list API response
    Then User applies Teams Basic Filter with following criteria
      | FilterField | FilterValue      |
      | Team Level  | <TeamLevelValue> |
    Then User clicks the Apply button in Teams filter dialog
    Then User prints the Teams API response JSON
    Then User logs UI vs API record count for Teams
    Then User verifies the Teams API total count is greater than zero

    Examples:
      | TeamLevelValue |
      | Begin          |
    # =========================================================
    # TAGS FILTER (EJ2 MultiSelect)
    # =========================================================

  @clubSectionTeamsTagsFilter
  Scenario Outline: Filter Teams by Tags "<TagsValue>" and validate API response
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
    Then User clicks the first result in the club listing grid
    Then User choose the " Sections " tab
    Then User clicks the first section record in the sections grid
    Then User navigates to the Teams tab on section detail page
    Then User clicks the filter button on Teams tab to open filter options
    Then User verifies "Basic Filter" tab is displayed in Teams filter dialog
    Then User starts capturing the Teams list API response
    Then User applies Teams Basic Filter with following criteria
      | FilterField | FilterValue |
      | Tags        | <TagsValue> |
    Then User clicks the Apply button in Teams filter dialog
    Then User prints the Teams API response JSON
    Then User logs UI vs API record count for Teams
    Then User verifies the Teams API total count is greater than zero

    Examples:
      | TagsValue               |
      | Tag002 (Administrative) |
