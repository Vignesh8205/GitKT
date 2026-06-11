@smoke @regression @personManagementFilters @basicFilter
Feature: Person Management Basic Filter Functionality
    As a user
    I want to be able to filter persons using the Basic Filter
    So that I can find specific persons based on filter criteria

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

  @personManagementBasicFilterTest
  Scenario: Verify user can open Basic Filter dialog
        # Navigate to Person Management
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then verify the page title for "Person Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon to open filter options
    Then User verifies that "Basic Filter" tab is displayed

  @personManagementBasicFilterAgeRangeTest
  Scenario: Verify user can apply Age Range filter and verify
        # Prerequisites - Navigate to Person Management
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then verify the page title for "Person Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon to open filter options
    Then User verifies that "Basic Filter" tab is displayed
        # Apply Age Range filters
    Then User applies Basic Filter with following criteria
      | FilterField       | FilterValue |
      | Age Range Minimum |          20 |
      | Age Range Maximum |          50 |
        # Apply the filter
    Then User clicks the Apply button in filter dialog
    Then User verifies that the filter has been applied successfully
    Then User verifies the filtered grid displays only matching records
        # Verify Reset functionality
    Then User clicks the filter icon to open filter options
    Then User clicks the Reset button in filter dialog
    Then User verifies that all filters are cleared

  @personManagementMaritalStatusFilterTest
  Scenario: Verify user can apply Marital Status filter and verify
        # Prerequisites - Navigate to Person Management
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then verify the page title for "Person Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon to open filter options
    Then User verifies that "Basic Filter" tab is displayed
        # Apply Marital Status filter
    Then User applies Basic Filter with following criteria
      | FilterField    | FilterValue |
      | Marital Status | Single      |
        # Apply the filter
    Then User clicks the Apply button in filter dialog
    Then User verifies that the filter has been applied successfully
    Then User verifies the filtered grid displays only matching records
        # Verify Reset functionality
    Then User clicks the filter icon to open filter options
    Then User clicks the Reset button in filter dialog
    Then User verifies that all filters are cleared

  @personManagementGenderFilterTest
  Scenario: Verify user can apply Gender filter and verify
        # Prerequisites - Navigate to Person Management
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then verify the page title for "Person Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon to open filter options
    Then User verifies that "Basic Filter" tab is displayed
        # Apply Gender filter
    Then User applies Basic Filter with following criteria
      | FilterField | FilterValue |
      | Gender      | Male        |
        # Apply the filter
    Then User clicks the Apply button in filter dialog
    Then User verifies that the filter has been applied successfully
    Then User verifies the filtered grid displays only matching records
        # Verify Reset functionality
    Then User clicks the filter icon to open filter options
    Then User clicks the Reset button in filter dialog
    Then User verifies that all filters are cleared

  @personManagementStatusAPIValidationTest
  Scenario: Verify default Status is Active and API response returns only Active persons
        # Prerequisites - Navigate to Person Management
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then verify the page title for "Person Management"
    Then User clicks the filter icon to open filter options
    Then User verifies that "Basic Filter" tab is displayed
    Then User verifies the "Status" button group has "Active" pre-selected by default
    Then User starts capturing the persons list API response
    Then User clicks the Apply button in filter dialog
        # Validate API response
    Then User verifies the API response total count is greater than zero
    Then User verifies all API response records have "status" matching "Active"

  @personManagementGenderAPIValidationTest
  Scenario: Verify Gender filter API response returns only Male persons
        # Prerequisites - Navigate to Person Management
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then verify the page title for "Person Management"
        # Open Basic Filter dialog and apply Gender filter
    Then User clicks the filter icon to open filter options
    Then User verifies that "Basic Filter" tab is displayed
    Then User applies Basic Filter with following criteria
      | FilterField | FilterValue |
      | Gender      | Male        |
        # Start capturing API then click Apply
    Then User starts capturing the persons list API response
    Then User clicks the Apply button in filter dialog
        # Validate API response
    Then User verifies the API response total count is greater than zero
    Then User verifies all API response records have "gender" matching "Male"

  @personManagementMaritalStatusAPIValidationTest
  Scenario Outline: Verify Marital Status filter API response returns only Single persons
        # Prerequisites - Navigate to Person Management
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then verify the page title for "Person Management"
        # Open Basic Filter dialog and apply Marital Status filter
    Then User clicks the filter icon to open filter options
    Then User verifies that "Basic Filter" tab is displayed
    Then User applies Basic Filter with following criteria
      | FilterField    | FilterValue     |
      | Marital Status | <MaritalStatus> |
        # Start capturing API then click Apply
    Then User starts capturing the persons list API response
    Then User clicks the Apply button in filter dialog
    Then User clicks the first person record in the filtered grid
    Then User verifies the married status is "<MaritalStatus>"
        # Validate API response

    Examples:
      | MaritalStatus |
      | Single        |

  @personManagementCombinedFiltersTest
  Scenario: Verify user can apply multiple filters ( Gender, Status) together
        # Prerequisites - Navigate to Person Management
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then verify the page title for "Person Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon to open filter options
    Then User verifies that "Basic Filter" tab is displayed
        # Apply multiple filters
    Then User applies Basic Filter with following criteria
      | FilterField | FilterValue |
      | Gender      | Female      |
      | Status      | Active      |
        # Apply the filters
    Then User clicks the Apply button in filter dialog
    Then User verifies that the filter has been applied successfully
    Then User verifies the filtered grid displays only matching records
        # Verify Reset functionality
    Then User clicks the filter icon to open filter options
    Then User clicks the Reset button in filter dialog
    Then User verifies that all filters are cleared
    # =========================================================
    # SEARCH BY PERSON NAME (Basic Filter dialog – Search autocomplete)
    # =========================================================

  @personManagementSearchByPersonNameTest
  Scenario Outline: Verify user can search persons by name "<SearchText>"
        # Navigate to Person Management
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then verify the page title for "Person Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon to open filter options
    Then User verifies that "Basic Filter" tab is displayed
        # Capture API, search by name via Search autocomplete in filter dialog, then Apply
    Then User starts capturing the persons list API response
    Then User searches for person with name "<SearchText>"
    Then User verifies the API response total count is greater than zero
    Then User verifies all API response records contain name "<SearchText>"
    Then User verifies the grid contains person name "<SearchText>"
        # Clear the search (reopens filter dialog, clears autocomplete, clicks Apply)
    Then User clears the person name search input

    Examples:
      | SearchText |
      | Alex       |
    # | Mason      |
    # =========================================================
    # BASIC FILTER – CLUB FUNCTION
    # =========================================================

  @personManagementClubFunctionFilterTest
  Scenario Outline: Verify user can filter persons by Club Function "<FunctionValue>"
        # Navigate to Person Management
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then verify the page title for "Person Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon to open filter options
    Then User verifies that "Basic Filter" tab is displayed
        # Open Basic Filter and apply Club Function filter
    Then User clicks the filter icon to open filter options
    Then User verifies that "Basic Filter" tab is displayed
    Then User applies Basic Filter with following criteria
      | FilterField   | FilterValue     |
      | Club Function | <FunctionValue> |
        # Capture API then apply
    Then User starts capturing the persons list API response
    Then User clicks the Apply button in filter dialog
    Then User verifies the API response total count is greater than zero
        # Reset
    Then User clicks the filter icon to open filter options
    Then User clicks the Reset button in filter dialog
    Then User verifies that all filters are cleared

    Examples:
      | FunctionValue |
      | Club Admin    |
    # =========================================================
    # BASIC FILTER – SECTION FUNCTION
    # =========================================================

  @personManagementSectionFunctionFilterTest
  Scenario Outline: Verify user can filter persons by Section Function "<FunctionValue>"
        # Navigate to Person Management
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then verify the page title for "Person Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon to open filter options
    Then User verifies that "Basic Filter" tab is displayed
        # Open Basic Filter and apply Section Function filter
    Then User clicks the filter icon to open filter options
    Then User verifies that "Basic Filter" tab is displayed
    Then User applies Basic Filter with following criteria
      | FilterField    | FilterValue     |
      | <FunctionType> | <FunctionValue> |
        # Capture persons/list API then apply
    Then User starts capturing the persons list API response
    Then User clicks the Apply button in filter dialog
    Then User verifies the API response total count is greater than zero
        # Click first person record and validate section function via /functions/list API
    Then User clicks the first person record in the filtered grid
    Then User starts capturing the "<FunctionType>" functions API response
    Then User navigates to "Functions" tab on person detail page
    Then User waits for the "<FunctionType>" functions API response
    Then User verifies the "<FunctionType>" functions API contains "<FunctionValue>"
        # Navigate back then Reset
    Then User navigates back to Person Management list
    Then User clicks the filter icon to open filter options
    Then User clicks the Reset button in filter dialog
    Then User verifies that all filters are cleared

    Examples:
      | FunctionValue   | FunctionType |
      | Assistant Coach | team         |
            # | Women's Section Manager | section      |
            # | Club Admin              | club         |
    # =========================================================
    # BASIC FILTER – TEAM FUNCTION
    # =========================================================

  @personManagementTeamFunctionFilterTest
  Scenario Outline: Verify user can filter persons by Team Function "<FunctionValue>"
        # Navigate to Person Management
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then verify the page title for "Person Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon to open filter options
    Then User verifies that "Basic Filter" tab is displayed
        # Open Basic Filter and apply Team Function filter
    Then User clicks the filter icon to open filter options
    Then User verifies that "Basic Filter" tab is displayed
    Then User applies Basic Filter with following criteria
      | FilterField   | FilterValue     |
      | Team Function | <FunctionValue> |
        # Capture API then apply
    Then User starts capturing the persons list API response
    Then User clicks the Apply button in filter dialog
    Then User verifies the API response total count is greater than zero
        # Reset
    Then User clicks the filter icon to open filter options
    Then User clicks the Reset button in filter dialog
    Then User verifies that all filters are cleared

    Examples:
      | FunctionValue   |
      | Assistant Coach |
    # =========================================================
    # BASIC FILTER – TAGS
    # =========================================================

  @personManagementTagsFilterTest
  Scenario Outline: Verify user can filter persons by Tag "<TagValue>"
        # Navigate to Person Management
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then verify the page title for "Person Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon to open filter options
    Then User verifies that "Basic Filter" tab is displayed
        # Open Basic Filter and apply Tags filter
    Then User clicks the filter icon to open filter options
    Then User verifies that "Basic Filter" tab is displayed
    Then User applies Basic Filter with following criteria
      | FilterField | FilterValue |
      | Tags        | <TagValue>  |
        # Capture persons/list API then apply
    Then User starts capturing the persons list API response
    Then User clicks the Apply button in filter dialog
    Then User verifies the API response total count is greater than zero

    Examples:
      | TagValue |
      | Tag002   |
