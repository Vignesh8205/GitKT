@smoke @regression @personFunctionFilter @basicFilter
Feature: Person Management - Functions Tab Filter Functionality
    As a user
    I want to filter club, section, and team function records on the Functions tab
    So that I can find specific function records for a person

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
    # =========================================================
    # CLUB FUNCTION FILTER – FIELD SEARCH
    # =========================================================

  @personClubFunctionSearchFilter
  Scenario Outline: Verify user can search club functions by text "<SearchText>"
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then User selects the first person record from the listing page
    Then User navigates to the Functions tab on person detail page
    Then User clicks the Club Function filter icon
    Then User verifies the Club Function filter dialog is displayed
    Then User searches club functions with text "<SearchText>"
    Then User starts capturing the club functions API response
    Then User clicks Apply on Club Function filter dialog
    Then User awaits and verifies the club functions API total count is greater than zero
    Then User clicks the Club Function filter icon
    Then User clicks Reset on Club Function filter dialog
    Then User verifies that all Club Function filters are cleared

    Examples:
      | SearchText |
      | !!!!san1   |
    # =========================================================
    # CLUB FUNCTION FILTER – STATUS BADGE
    # =========================================================

  @personClubFunctionStatusFilter
  Scenario Outline: Verify user can filter club functions by Status "<StatusValue>"
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then User selects the first person record from the listing page
    Then User navigates to the Functions tab on person detail page
    Then User clicks the Club Function filter icon
    Then User verifies the Club Function filter dialog is displayed
    Then User applies Club Function filter with following criteria
      | Status | <StatusValue> |
    Then User starts capturing the club functions API response
    Then User clicks Apply on Club Function filter dialog
    Then User awaits and verifies the club functions API total count is greater than zero
    Then User clicks Reset on Club Function filter dialog

    Examples:
      | StatusValue |
      | Inactive    |
            #| Active        |
    # =========================================================
    # CLUB FUNCTION FILTER – CLUB FUNCTION TYPE
    # =========================================================

  @personClubFunctionTypeFilter
  Scenario Outline: Verify user can filter by Club Function "<ClubFunctionValue>"
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then User selects the first person record from the listing page
    Then User navigates to the Functions tab on person detail page
    Then User clicks the Club Function filter icon
    Then User verifies the Club Function filter dialog is displayed
    Then User applies Club Function filter with following criteria
      | Club Function | <ClubFunctionValue> |
    Then User starts capturing the club functions API response
    Then User clicks Apply on Club Function filter dialog
    Then User verifies the club functions filtered grid displays matching records
    Then User clicks Reset on Club Function filter dialog

    Examples:
      | ClubFunctionValue |
      | Club Admin        |
    # =========================================================
    # CLUB FUNCTION FILTER – DATE RANGE
    # =========================================================

  @personClubFunctionDateRangeFilter
  Scenario Outline: Verify user can filter club functions by Date Range "<DateRange>"
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then User selects the first person record from the listing page
    Then User navigates to the Functions tab on person detail page
    Then User clicks the Club Function filter icon
    Then User verifies the Club Function filter dialog is displayed
    Then User applies Club Function filter with following criteria
      | Start Date | <DateRange> |
    Then User starts capturing the club functions API response
    Then User clicks Apply on Club Function filter dialog
    Then User verifies the club functions filtered grid displays matching records
    Then User clicks Reset on Club Function filter dialog

    Examples:
      | DateRange               |
      | 01/04/2026 - 30/04/2026 |
    # =========================================================
    # SECTION FUNCTION FILTER – FIELD SEARCH
    # =========================================================

  @personSectionFunctionSearchFilter @sectionfunctionBasicFilter
  Scenario Outline: Verify user can search section functions by text "<SearchText>"
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then User selects the first person record from the listing page
    Then User navigates to the Functions tab on person detail page
    Then User clicks the Section Function filter icon
    Then User verifies the Section Function filter dialog is displayed
    Then User searches section functions with text "<SearchText>"
    Then User starts capturing the section functions API response
    Then User clicks Apply on Section Function filter dialog
    Then User awaits and verifies the section functions API total count is greater than zero
    Then User clicks Reset on Section Function filter dialog

    Examples:
      | SearchText |
      | &&&&&san   |
    # =========================================================
    # SECTION FUNCTION FILTER – STATUS BADGE
    # =========================================================

  @personSectionFunctionStatusFilter @sectionfunctionBasicFilter
  Scenario Outline: Verify user can filter section functions by Status "<StatusValue>"
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then User selects the first person record from the listing page
    Then User navigates to the Functions tab on person detail page
    Then User clicks the Section Function filter icon
    Then User verifies the Section Function filter dialog is displayed
    Then User applies Section Function filter with following criteria
      | Status | <StatusValue> |
    Then User starts capturing the section functions API response
    Then User clicks Apply on Section Function filter dialog
    Then User awaits and verifies the section functions API total count is greater than zero
    Then User clicks Reset on Section Function filter dialog

    Examples:
      | StatusValue |
      | Inactive    |
    # =========================================================
    # SECTION FUNCTION FILTER – SPORTIVE TYPE
    # =========================================================

  @personSectionFunctionSportiveTypeFilter @sectionfunctionBasicFilter
  Scenario Outline: Verify user can filter section functions by Sportive Type "<SportiveTypeValue>"
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then User selects the first person record from the listing page
    Then User navigates to the Functions tab on person detail page
    Then User clicks the Section Function filter icon
    Then User verifies the Section Function filter dialog is displayed
    Then User applies Section Function filter with following criteria
      | Sportive Type | <SportiveTypeValue> |
    Then User starts capturing the section functions API response
    Then User clicks Apply on Section Function filter dialog
    Then User verifies the section functions filtered grid displays matching records
    Then User clicks Reset on Section Function filter dialog

    Examples:
      | SportiveTypeValue |
      | Amateur           |
    # =========================================================
    # SECTION FUNCTION FILTER – FORMAT
    # =========================================================

  @personSectionFunctionFormatFilter @sectionfunctionBasicFilter
  Scenario Outline: Verify user can filter section functions by Format "<FormatValue>"
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then User selects the first person record from the listing page
    Then User navigates to the Functions tab on person detail page
    Then User clicks the Section Function filter icon
    Then User verifies the Section Function filter dialog is displayed
    Then User applies Section Function filter with following criteria
      | Format | <FormatValue> |
    Then User starts capturing the section functions API response
    Then User clicks Apply on Section Function filter dialog
    Then User verifies the section functions filtered grid displays matching records
    Then User clicks Reset on Section Function filter dialog

    Examples:
      | FormatValue |
      | Football    |
    # =========================================================
    # SECTION FUNCTION FILTER – SECTION FUNCTION TYPE
    # =========================================================

  @personSectionFunctionTypeFilter @sectionfunctionBasicFilter
  Scenario Outline: Verify user can filter by Section Function "<SectionFunctionValue>"
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then User selects the first person record from the listing page
    Then User navigates to the Functions tab on person detail page
    Then User clicks the Section Function filter icon
    Then User verifies the Section Function filter dialog is displayed
    Then User applies Section Function filter with following criteria
      | Section Function | <SectionFunctionValue> |
    Then User starts capturing the section functions API response
    Then User clicks Apply on Section Function filter dialog
    Then User verifies the section functions filtered grid displays matching records
    Then User clicks Reset on Section Function filter dialog

    Examples:
      | SectionFunctionValue        |
      | Section Competition Manager |
    # =========================================================
    # SECTION FUNCTION FILTER – DATE RANGE
    # =========================================================

  @personSectionFunctionDateRangeFilter @sectionfunctionBasicFilter
  Scenario Outline: Verify user can filter section functions by Date Range "<DateRange>"
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then User selects the first person record from the listing page
    Then User navigates to the Functions tab on person detail page
    Then User clicks the Section Function filter icon
    Then User verifies the Section Function filter dialog is displayed
    Then User applies Section Function filter with following criteria
      | Start Date | <DateRange> |
    Then User starts capturing the section functions API response
    Then User clicks Apply on Section Function filter dialog
    Then User verifies the section functions filtered grid displays matching records
    Then User clicks Reset on Section Function filter dialog

    Examples:
      | DateRange               |
      | 01/04/2026 - 30/04/2026 |
    # =========================================================
    # TEAM FUNCTION FILTER – FIELD SEARCH
    # =========================================================

  @personTeamFunctionSearchFilter @teamfunctionBasicFilter
  Scenario Outline: Verify user can search team functions by text "<SearchText>"
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then User selects the first person record from the listing page
    Then User navigates to the Functions tab on person detail page
    Then User clicks the Team Function filter icon
    Then User verifies the Team Function filter dialog is displayed
    Then User searches team functions with text "<SearchText>"
    Then User selects the first suggestion from team function search dropdown
    Then User starts capturing the team functions API response
    Then User clicks Apply on Team Function filter dialog
    Then User awaits and verifies the team functions API total count is greater than zero
    Then User clicks Reset on Team Function filter dialog

    Examples:
      | SearchText  |
      | &&&&&san BB |
      | !!!!Qqq     |
    # =========================================================
    # TEAM FUNCTION FILTER – STATUS BADGE
    # =========================================================

  @personTeamFunctionStatusFilter @teamfunctionBasicFilter
  Scenario Outline: Verify user can filter team functions by Status "<StatusValue>"
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then User selects the first person record from the listing page
    Then User navigates to the Functions tab on person detail page
    Then User clicks the Team Function filter icon
    Then User verifies the Team Function filter dialog is displayed
    Then User applies Team Function filter with following criteria
      | Status | <StatusValue> |
    Then User starts capturing the team functions API response
    Then User clicks Apply on Team Function filter dialog
    Then User awaits and verifies the team functions API total count is greater than zero
    Then User clicks Reset on Team Function filter dialog

    Examples:
      | StatusValue |
      | Inactive    |
    # =========================================================
    # TEAM FUNCTION FILTER – TEAM FUNCTION TYPE
    # =========================================================

  @personTeamFunctionTypeFilter @teamfunctionBasicFilter
  Scenario Outline: Verify user can filter by Team Function "<TeamFunctionValue>"
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then User selects the first person record from the listing page
    Then User navigates to the Functions tab on person detail page
    Then User clicks the Team Function filter icon
    Then User verifies the Team Function filter dialog is displayed
    Then User applies Team Function filter with following criteria
      | Team Function | <TeamFunctionValue> |
    Then User starts capturing the team functions API response
    Then User clicks Apply on Team Function filter dialog
    Then User verifies the team functions filtered grid displays matching records
    Then User clicks Reset on Team Function filter dialog

    Examples:
      | TeamFunctionValue |
      | Equipment Manager |
    # =========================================================
    # TEAM FUNCTION FILTER – FORMAT
    # =========================================================

  @personTeamFunctionFormatFilter @teamfunctionBasicFilter
  Scenario Outline: Verify user can filter team functions by Format "<FormatValue>"
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then User selects the first person record from the listing page
    Then User navigates to the Functions tab on person detail page
    Then User clicks the Team Function filter icon
    Then User verifies the Team Function filter dialog is displayed
    Then User applies Team Function filter with following criteria
      | Format | <FormatValue> |
    Then User starts capturing the team functions API response
    Then User clicks Apply on Team Function filter dialog
    Then User verifies the team functions filtered grid displays matching records
    Then User clicks Reset on Team Function filter dialog

    Examples:
      | FormatValue |
      | Football    |
    # =========================================================
    # TEAM FUNCTION FILTER – DATE RANGE
    # =========================================================

  @personTeamFunctionDateRangeFilter @teamfunctionBasicFilter
  Scenario Outline: Verify user can filter team functions by Date Range "<DateRange>"
    Then User Can able to access the Main menu in home page
    Then User can choose the "Person Management" tab
    Then User selects the first person record from the listing page
    Then User navigates to the Functions tab on person detail page
    Then User clicks the Team Function filter icon
    Then User verifies the Team Function filter dialog is displayed
    Then User applies Team Function filter with following criteria
      | Start Date | <DateRange> |
    Then User starts capturing the team functions API response
    Then User clicks Apply on Team Function filter dialog
    Then User verifies the team functions filtered grid displays matching records
    Then User clicks Reset on Team Function filter dialog

    Examples:
      | DateRange               |
      | 01/04/2026 - 30/04/2026 |
