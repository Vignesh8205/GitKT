@smoke @regression @resourceCalendarBasicFilter
Feature: Resource Calendar Basic Filter Functionality
    As a user
    I want to filter the Resources Calendar using basic filter criteria
    So that I can find specific events quickly

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
    # RESOURCE CALENDAR BASIC FILTER – SEARCH BY EVENT NAME
    # =========================================================

  @resourceCalendarSearchFilter
  Scenario Outline: Verify user can filter Resource Calendar by Event Name "<SearchText>"
    Then User Can able to access the Main menu in home page
    Then User navigates to "Resource Management" from main menu
    Then User clicks the Venue Management tab
    Then User navigates to the Resources Calendar tab
        # Open filter dialog and select Basic Filter tab
    Then User clicks the Resource Calendar filter icon
    Then User clicks the "Basic Filter" tab in Resource Calendar filter dialog
        # Apply Search filter
    Then User applies Resource Calendar Basic Filter with following criteria
      | Search By Event Name | <SearchText> |
        # Capture API, Apply and verify
    Then User starts capturing the Resource Calendar basic filter API response
    Then User clicks the Apply button in Resource Calendar filter dialog
    Then User verifies the Resource Calendar basic filter API response total count is greater than zero
    Then User prints the Resource Calendar basic filter API response JSON
    Then User verifies all Resource Calendar basic filter API records have "eventName" "Contains" "<SearchText>"
        # Reset and verify
    Then User clicks the Resource Calendar filter icon
    Then User clicks the "Basic Filter" tab in Resource Calendar filter dialog
    Then User clicks the Reset button in Resource Calendar filter dialog
    Then User verifies that all Resource Calendar filters are cleared

    Examples:
      | SearchText |
      | AutoTest01 |
    # =========================================================
    # RESOURCE CALENDAR BASIC FILTER – EVENT TYPE
    # =========================================================

  @resourceCalendarEventTypeFilter
  Scenario Outline: Verify user can filter Resource Calendar by Event Type "<EventType>"
    Then User Can able to access the Main menu in home page
    Then User navigates to "Resource Management" from main menu
    Then User clicks the Venue Management tab
    Then User navigates to the Resources Calendar tab
        # Open filter dialog and select Basic Filter tab
    Then User clicks the Resource Calendar filter icon
    Then User clicks the "Basic Filter" tab in Resource Calendar filter dialog
        # Apply Event Type filter
    Then User applies Resource Calendar Basic Filter with following criteria
      | Event Type | <EventType> |
        # Capture API, Apply and verify
    Then User starts capturing the Resource Calendar basic filter API response
    Then User clicks the Apply button in Resource Calendar filter dialog
    Then User verifies the Resource Calendar basic filter API response total count is greater than zero
    Then User prints the Resource Calendar basic filter API response JSON
    Then User verifies all Resource Calendar basic filter API records have "eventType" "Contains" "<EventType>"
        # Reset and verify
    Then User clicks the Resource Calendar filter icon
    Then User clicks the "Basic Filter" tab in Resource Calendar filter dialog
    Then User clicks the Reset button in Resource Calendar filter dialog
    Then User verifies that all Resource Calendar filters are cleared

    Examples:
      | EventType   |
      | Competition |
    # =========================================================
    # RESOURCE CALENDAR BASIC FILTER – LOCATION
    # =========================================================

  @resourceCalendarLocationFilter
  Scenario Outline: Verify user can filter Resource Calendar by Location "<Location>"
    Then User Can able to access the Main menu in home page
    Then User navigates to "Resource Management" from main menu
    Then User clicks the Venue Management tab
    Then User navigates to the Resources Calendar tab
        # Open filter dialog and select Basic Filter tab
    Then User clicks the Resource Calendar filter icon
    Then User clicks the "Basic Filter" tab in Resource Calendar filter dialog
        # Apply Location filter
    Then User applies Resource Calendar Basic Filter with following criteria
      | Location | <Location> |
        # Capture API, Apply and verify
    Then User starts capturing the Resource Calendar basic filter API response
    Then User clicks the Apply button in Resource Calendar filter dialog
    Then User verifies the Resource Calendar basic filter API response total count is greater than zero
    Then User prints the Resource Calendar basic filter API response JSON
    Then User verifies all Resource Calendar basic filter API records have "location" "Contains" "<Location>"
        # Reset and verify
    Then User clicks the Resource Calendar filter icon
    Then User clicks the "Basic Filter" tab in Resource Calendar filter dialog
    Then User clicks the Reset button in Resource Calendar filter dialog
    Then User verifies that all Resource Calendar filters are cleared

    Examples:
      | Location      |
      | Chennai Orion |
    # =========================================================
    # RESOURCE CALENDAR BASIC FILTER – VISIBILITY
    # =========================================================

  @resourceCalendarVisibilityFilter
  Scenario Outline: Verify user can filter Resource Calendar by Visibility "<Visibility>"
    Then User Can able to access the Main menu in home page
    Then User navigates to "Resource Management" from main menu
    Then User clicks the Venue Management tab
    Then User navigates to the Resources Calendar tab
        # Open filter dialog and select Basic Filter tab
    Then User clicks the Resource Calendar filter icon
    Then User clicks the "Basic Filter" tab in Resource Calendar filter dialog
        # Apply Visibility filter
    Then User applies Resource Calendar Basic Filter with following criteria
      | Visibility | <Visibility> |
        # Capture API, Apply and verify
    Then User starts capturing the Resource Calendar basic filter API response
    Then User clicks the Apply button in Resource Calendar filter dialog
    Then User verifies the Resource Calendar basic filter API response total count is greater than zero
    Then User prints the Resource Calendar basic filter API response JSON
    Then User verifies all Resource Calendar basic filter API records have "visibility" "Contains" "<Visibility>"
        # Reset and verify
    Then User clicks the Resource Calendar filter icon
    Then User clicks the "Basic Filter" tab in Resource Calendar filter dialog
    Then User clicks the Reset button in Resource Calendar filter dialog
    Then User verifies that all Resource Calendar filters are cleared

    Examples:
      | Visibility |
      | Everyone   |
    # =========================================================
    # RESOURCE CALENDAR BASIC FILTER – ALL DAY EVENT
    # =========================================================

  @resourceCalendarAllDayEventFilter
  Scenario Outline: Verify user can filter Resource Calendar by All Day Event "<State>"
    Then User Can able to access the Main menu in home page
    Then User navigates to "Resource Management" from main menu
    Then User clicks the Venue Management tab
    Then User navigates to the Resources Calendar tab
        # Open filter dialog and select Basic Filter tab
    Then User clicks the Resource Calendar filter icon
    Then User clicks the "Basic Filter" tab in Resource Calendar filter dialog
        # Apply All Day Event filter
    Then User applies Resource Calendar Basic Filter with following criteria
      | All Day Event | <State> |
        # Capture API, Apply and verify
    Then User starts capturing the Resource Calendar basic filter API response
    Then User clicks the Apply button in Resource Calendar filter dialog
    Then User verifies the Resource Calendar basic filter API response total count is greater than zero
    Then User prints the Resource Calendar basic filter API response JSON
    Then User verifies all Resource Calendar basic filter API records have "allDay" "Equal" "<State>"
        # Reset and verify
    Then User clicks the Resource Calendar filter icon
    Then User clicks the "Basic Filter" tab in Resource Calendar filter dialog
    Then User clicks the Reset button in Resource Calendar filter dialog
    Then User verifies that all Resource Calendar filters are cleared

    Examples:
      | State |
      | On    |
    # =========================================================
    # RESOURCE CALENDAR BASIC FILTER – RESOURCES
    # =========================================================

  @resourceCalendarResourcesFilter
  Scenario Outline: Verify user can filter Resource Calendar by Resources "<Resource>"
    Then User Can able to access the Main menu in home page
    Then User navigates to "Resource Management" from main menu
    Then User clicks the Venue Management tab
    Then User navigates to the Resources Calendar tab
        # Open filter dialog and select Basic Filter tab
    Then User clicks the Resource Calendar filter icon
    Then User clicks the "Basic Filter" tab in Resource Calendar filter dialog
        # Apply Resources filter
    Then User applies Resource Calendar Basic Filter with following criteria
      | Resources | <Resource> |
        # Capture API, Apply and verify
    Then User starts capturing the Resource Calendar basic filter API response
    Then User clicks the Apply button in Resource Calendar filter dialog
    Then User verifies the Resource Calendar basic filter API response total count is greater than zero
    Then User prints the Resource Calendar basic filter API response JSON
    Then User verifies all Resource Calendar basic filter API records have "resources" "Contains" "<Resource>"

    Examples:
      | Resource |
      |       1A |
    # =========================================================
    # RESOURCE CALENDAR BASIC FILTER – DATE RANGE
    # =========================================================

  @resourceCalendarDateRangeFilter
  Scenario Outline: Verify user can filter Resource Calendar by Date Range "<DateRange>"
    Then User Can able to access the Main menu in home page
    Then User navigates to "Resource Management" from main menu
    Then User clicks the Venue Management tab
    Then User navigates to the Resources Calendar tab
        # Open filter dialog and select Basic Filter tab
    Then User clicks the Resource Calendar filter icon
    Then User clicks the "Basic Filter" tab in Resource Calendar filter dialog
        # Apply Date Range filter
    Then User applies Resource Calendar Basic Filter with following criteria
      | Date Range | <DateRange> |
        # Capture API, Apply and verify
    Then User starts capturing the Resource Calendar basic filter API response
    Then User clicks the Apply button in Resource Calendar filter dialog
    Then User verifies the Resource Calendar basic filter API response total count is greater than zero
    Then User prints the Resource Calendar basic filter API response JSON
    Then User verifies all Resource Calendar basic filter API records have "dateRange" "Contains" "<DateRange>"
        # Reset and verify
    Then User clicks the Resource Calendar filter icon
    Then User clicks the "Basic Filter" tab in Resource Calendar filter dialog
    Then User clicks the Reset button in Resource Calendar filter dialog
    Then User verifies that all Resource Calendar filters are cleared

    Examples:
      | DateRange               |
      | 21/05/2026 - 21/05/2026 |
    # =========================================================
    # RESOURCE CALENDAR BASIC FILTER – TAGS
    # =========================================================

  @resourceCalendarTagsFilter
  Scenario Outline: Verify user can filter Resource Calendar by Tags "<Tag>"
    Then User Can able to access the Main menu in home page
    Then User navigates to "Resource Management" from main menu
    Then User clicks the Venue Management tab
    Then User navigates to the Resources Calendar tab
        # Open filter dialog and select Basic Filter tab
    Then User clicks the Resource Calendar filter icon
    Then User clicks the "Basic Filter" tab in Resource Calendar filter dialog
        # Apply Tags filter
    Then User applies Resource Calendar Basic Filter with following criteria
      | Tags | <Tag> |
        # Capture API, Apply and verify
    Then User starts capturing the Resource Calendar basic filter API response
    Then User clicks the Apply button in Resource Calendar filter dialog
    Then User verifies the Resource Calendar basic filter API response total count is greater than zero
    Then User prints the Resource Calendar basic filter API response JSON
    Then User verifies all Resource Calendar basic filter API records have "tags" "Contains" "<Tag>"
        # Reset and verify
    Then User clicks the Resource Calendar filter icon
    Then User clicks the "Basic Filter" tab in Resource Calendar filter dialog
    Then User clicks the Reset button in Resource Calendar filter dialog
    Then User verifies that all Resource Calendar filters are cleared

    Examples:
      | Tag                     |
      | Tag002 (Administrative) |
    # =========================================================
    # RESOURCE CALENDAR – CLICK EVENT AND VERIFY DETAIL API
    # =========================================================

  @resourceCalendarEventDetailAPI
  Scenario: Verify clicking a Resource Calendar event triggers the event detail API
    Then User Can able to access the Main menu in home page
    Then User navigates to "Resource Management" from main menu
    Then User clicks the Venue Management tab
    Then User navigates to the Resources Calendar tab
        # Start listening for the event detail API BEFORE clicking
    Then User starts capturing the Resource Calendar event detail API response
        # Click the "Pawan Nikkil" event (div.e-subject rendered inside div.e-appointment)
    Then User clicks the calendar event "Pawan Nikkil" on the Resources Calendar
        # Await and verify the GET /venue/events/{id}?type=resource API response
    Then User verifies the Resource Calendar event detail API response is valid
    Then User prints the Resource Calendar event detail API response JSON
