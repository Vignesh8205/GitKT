@smoke @regression @clubManagementFilters @basicFilter
Feature: Club Management Basic Filter Functionality
    As a user
    I want to be able to filter clubs using the Basic Filter
    So that I can find specific clubs based on filter criteria

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
    # VERIFY FILTER DIALOG OPENS
    # =========================================================

  @clubManagementBasicFilterOpenTest
  Scenario: Verify user can open Basic Filter dialog and verify filter fields in Club Management
        # Navigate to Club Management
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon in Club Management to open filter options
    Then User verifies "Basic Filter" tab is displayed in Club Management filter dialog
        # Verify the Search input placeholder inside the filter dialog
    Then User verifies the Club Management filter search input has placeholder "Search by Club Name or Registration Number"
        # Verify filter fields are visible
    Then User verifies the Club Management filter field "Status" is displayed
    Then User verifies the Club Management filter field "Sportive Type" is displayed
    Then User verifies the Club Management filter field "Format" is displayed
    Then User verifies the Club Management filter field "Gender Offering" is displayed
    Then User verifies the Club Management filter field "Language" is displayed
    Then User verifies the Club Management filter field "Region" is displayed
    Then User verifies the Club Management filter field "Federation" is displayed
    # =========================================================
    # STATUS FILTER
    # =========================================================

  @clubManagementStatusFilterTest
  Scenario Outline: Verify user can apply Status filter "<StatusValue>" and verify results
        # Navigate to Club Management
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon in Club Management to open filter options
    Then User verifies "Basic Filter" tab is displayed in Club Management filter dialog
        # Capture API before filter selection
    Then User starts capturing the clubs list API response
        # Select Status from the filter search box
    Then User applies Club Basic Filter with following criteria
      | FilterField | FilterValue   |
      | Status      | <StatusValue> |
        # Apply filter
    Then User clicks the Apply button in Club Management filter dialog
        # Validate API
    Then User verifies the clubs API total count is greater than zero
    Then User verifies all clubs API records have "status" matching "<StatusValue>"
        # Open first filtered record then navigate back
    Then User clicks the first club record in the filtered grid
    Then User navigates back to Club Management list
        # Reset filters
    Then User clicks the filter icon in Club Management to open filter options
    Then User clicks the Reset button in Club Management filter dialog
    Then User verifies that all Club Management filters are cleared

    Examples:
      | StatusValue |
      | Draft       |
    #| Inactive    |
    #| Active      |
    # =========================================================
    # SPORTIVE TYPE FILTER
    # =========================================================

  @clubManagementSportiveTypeFilterTest
  Scenario Outline: Verify user can filter clubs by Sportive Type "<SportiveTypeValue>"
        # Navigate to Club Management
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon in Club Management to open filter options
    Then User verifies "Basic Filter" tab is displayed in Club Management filter dialog
        # Apply Sportive Type filter
    Then User applies Club Basic Filter with following criteria
      | FilterField   | FilterValue         |
      | Sportive Type | <SportiveTypeValue> |
        # Capture API then apply
    Then User starts capturing the clubs list API response
    Then User clicks the Apply button in Club Management filter dialog
        # Verify grid shows records
    Then User verifies the Club Management filtered grid displays matching records
        # Reset filters
    Then User clicks the filter icon in Club Management to open filter options
    Then User clicks the Reset button in Club Management filter dialog
    Then User verifies that all Club Management filters are cleared

    Examples:
      | SportiveTypeValue |
      | Amateur           |
    # =========================================================
    # FORMAT FILTER
    # =========================================================

  @clubManagementFormatFilterTest
  Scenario Outline: Verify user can filter clubs by Format "<FormatValue>"
        # Navigate to Club Management
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon in Club Management to open filter options
    Then User verifies "Basic Filter" tab is displayed in Club Management filter dialog
        # Apply Format filter
    Then User applies Club Basic Filter with following criteria
      | FilterField | FilterValue   |
      | Format      | <FormatValue> |
        # Capture API then apply
    Then User starts capturing the clubs list API response
    Then User clicks the Apply button in Club Management filter dialog
    Then User verifies the clubs API total count is greater than zero
        # Verify grid shows records
    Then User verifies the Club Management filtered grid displays matching records
        # Reset filters
    Then User clicks the filter icon in Club Management to open filter options
    Then User clicks the Reset button in Club Management filter dialog
    Then User verifies that all Club Management filters are cleared

    Examples:
      | FormatValue |
      | Football    |
    # =========================================================
    # GENDER OFFERING FILTER
    # =========================================================

  @clubManagementGenderOfferingFilterTest
  Scenario Outline: Verify user can filter clubs by Gender Offering "<GenderValue>"
        # Navigate to Club Management
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon in Club Management to open filter options
    Then User verifies "Basic Filter" tab is displayed in Club Management filter dialog
        # Apply Gender Offering filter
    Then User applies Club Basic Filter with following criteria
      | FilterField     | FilterValue   |
      | Gender Offering | <GenderValue> |
        # Capture API then apply
    Then User starts capturing the clubs list API response
    Then User clicks the Apply button in Club Management filter dialog
    Then User verifies the clubs API total count is greater than zero
        # Verify grid shows records
    Then User verifies the Club Management filtered grid displays matching records
        # Reset filters
    Then User clicks the filter icon in Club Management to open filter options
    Then User clicks the Reset button in Club Management filter dialog
    Then User verifies that all Club Management filters are cleared

    Examples:
      | GenderValue |
      | Male        |
    #| Female      |
    #| Mixed       |
    # =========================================================
    # LANGUAGE FILTER
    # =========================================================

  @clubManagementLanguageFilterTest
  Scenario Outline: Verify user can filter clubs by Language "<LanguageValue>"
        # Navigate to Club Management
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon in Club Management to open filter options
    Then User verifies "Basic Filter" tab is displayed in Club Management filter dialog
        # Apply Language filter
    Then User applies Club Basic Filter with following criteria
      | FilterField | FilterValue     |
      | <Field>     | <LanguageValue> |
        # Apply the filter
    Then User clicks the Apply button in Club Management filter dialog
    Then User verifies that the Club Management filter has been applied successfully
    Then User verifies the Club Management filtered grid displays matching records

    Examples:
      | LanguageValue | Field    |
      | Dutch         | Language |
    # =========================================================
    # REGION FILTER
    # =========================================================

  @clubManagementRegionFilterTest
  Scenario Outline: Verify user can filter clubs by Region "<RegionValue>"
        # Navigate to Club Management
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon in Club Management to open filter options
    Then User verifies "Basic Filter" tab is displayed in Club Management filter dialog
        # Apply Region filter
    Then User applies Club Basic Filter with following criteria
      | FilterField | FilterValue   |
      | <field>     | <RegionValue> |
    Then User clicks the Apply button in Club Management filter dialog
    Then User clicks the first club record in the filtered grid
    Then User verifies the Club Management filtered grid displays matching records
        #Then  User verifies the "<field>" is within "<RegionValue>"

    Examples:
      | RegionValue | field  |
      | Region1     | Region |
    # =========================================================
    # FEDERATION FILTER
    # =========================================================

  @clubManagementFederationFilterTest
  Scenario Outline: Verify user can filter clubs by Federation "<FederationValue>"
        # Navigate to Club Management
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon in Club Management to open filter options
    Then User verifies "Basic Filter" tab is displayed in Club Management filter dialog
        # Apply Federation filter
    Then User applies Club Basic Filter with following criteria
      | FilterField | FilterValue       |
      | <field>     | <FederationValue> |
    Then User clicks the Apply button in Club Management filter dialog
    Then User clicks the first club record in the filtered grid
    Then User verifies the "<field>" is within "<FederationValue>"

    Examples:
      | FederationValue | field      |
      | RBFA            | Federation |
    # =========================================================
    # LEGAL STATUS FILTER
    # =========================================================

  @clubManagementLegalStatusFilterTest
  Scenario Outline: Verify user can filter clubs by Legal Status "<LegalStatusValue>"
        # Navigate to Club Management
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon in Club Management to open filter options
    Then User verifies "Basic Filter" tab is displayed in Club Management filter dialog
        # Apply Legal Status filter
    Then User applies Club Basic Filter with following criteria
      | FilterField | FilterValue        |
      | <field>     | <LegalStatusValue> |
    Then User clicks the Apply button in Club Management filter dialog
    Then User verifies the Club Management filtered grid displays matching records
    Then User clicks the first club record in the filtered grid
    Then User verifies the "<field>" is within "<LegalStatusValue>"

    Examples:
      | LegalStatusValue    | field        |
      | Cooperative Company | Legal Status |
    # =========================================================
    # CLUB CODE FILTER
    # =========================================================

  @clubManagementClubCodeFilterTest
  Scenario Outline: Verify user can filter clubs by Club Code "<ClubCodeValue>"
        # Navigate to Club Management
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon in Club Management to open filter options
    Then User verifies "Basic Filter" tab is displayed in Club Management filter dialog
        # Apply Club Code filter
    Then User applies Club Basic Filter with following criteria
      | FilterField | FilterValue     |
      | <field>     | <ClubCodeValue> |
    Then User clicks the Apply button in Club Management filter dialog
        # Verify grid shows records
    Then User verifies the Club Management filtered grid displays matching records
    Then User clicks the first club record in the filtered grid
    Then User verifies the "<field>" is within "<ClubCodeValue>"

    Examples:
      | ClubCodeValue | field     |
      | Workforce     | Club Code |
    # =========================================================
    # FOUNDING DATE FILTER
    # =========================================================

  @clubManagementFoundingDateFilterTest
  Scenario Outline: Verify user can filter clubs by Founding Date range and verify results
        # Navigate to Club Management
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon in Club Management to open filter options
    Then User verifies "Basic Filter" tab is displayed in Club Management filter dialog
        # Apply Founding Date filter
    Then User applies Club Basic Filter with following criteria
      | FilterField        | FilterValue    |
      | Founding Date From | <FoundingDate> |
    Then User clicks the Apply button in Club Management filter dialog
    Then User clicks the first club record in the filtered grid
    Then User verifies the founding date is within "<FoundingDate>"

    Examples:
      | FoundingDate            |
      | 10/03/2026 - 27/03/2026 |
    # =========================================================
    # TAGS FILTER
    # =========================================================

  @clubManagementTagsFilterTest
  Scenario Outline: Verify user can filter clubs by Tag "<TagValue>"
        # Navigate to Club Management
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon in Club Management to open filter options
    Then User verifies "Basic Filter" tab is displayed in Club Management filter dialog
        # Apply Tags filter
    Then User applies Club Basic Filter with following criteria
      | FilterField | FilterValue |
      | Tags        | <TagValue>  |
        # Capture API then apply
    Then User starts capturing the clubs list API response
    Then User clicks the Apply button in Club Management filter dialog
    Then User verifies the clubs API total count is greater than zero

    Examples:
      | TagValue |
      | Tag002   |
    # =========================================================
    # SEARCH BY CLUB NAME
    # =========================================================

  @clubManagementSearchByNameTest
  Scenario Outline: Verify user can search clubs by name "<SearchText>"
        # Navigate to Club Management
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
        # Open Basic Filter dialog
    Then User clicks the filter icon in Club Management to open filter options
    Then User verifies "Basic Filter" tab is displayed in Club Management filter dialog
        # Capture API before searching (autocomplete selection fires POST immediately)
    Then User starts capturing the clubs list API response
        # Search by name then apply
    Then User searches for club with name "<SearchText>"
    Then User clicks the Apply button in Club Management filter dialog
    Then User verifies the clubs API total count is greater than zero
    Then User verifies all clubs API records contain name "<SearchText>"
    Then User verifies the club grid contains name "<SearchText>"
        # Clear the search
    Then User clears the club name search input

    Examples:
      | SearchText |
      | APIM       |
    # =========================================================
    # COMBINED  – STATUS + FEDERATION
    # =========================================================

  @clubManagementCombinedAPIValidationTest
  Scenario Outline: Verify combined Status + Federation filter returns correct API records
        # Navigate to Club Management
    Then User Can able to access the Main menu in home page
    Then User choose the "Club Management" tab
    Then verify the page title "Club Management"
        # Open Basic Filter dialog and apply filters
    Then User clicks the filter icon in Club Management to open filter options
    Then User verifies "Basic Filter" tab is displayed in Club Management filter dialog
    Then User applies Club Basic Filter with following criteria
      | FilterField | FilterValue  |
      | Status      | <status>     |
      | Federation  | <Federation> |
    Then User clicks the Apply button in Club Management filter dialog
    Then User clicks the first person record in the filtered grid
    Then User verifies the status is "<status>"

    Examples:
      | status | Federation |
      | Draft  | RBFA       |
