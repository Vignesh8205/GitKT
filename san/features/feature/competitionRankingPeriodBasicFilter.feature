@smoke @regression @competitionRankingPeriodBasicFilter @basicFilter
Feature: Competition Management - Ranking Period Basic Filter
    As a user
    I want to filter Ranking Periods using Basic Filter
    So that I can find specific ranking periods based on filter criteria

    Background:
        Given I am on the login page
        And I load credentials from "test-data/credentials.json"
        And I load testData from "test-data/testData.json"
        When  I enter username from "validUser"
        And   I enter password from "validUser"
        And   I click the login button
        Then  I should be logged in successfully
        Then  User select the Role on role list
        When I select "RegSeason" in the Season dropdown
        Then  User Clicking on submit button

    # =========================================================
    # TEMPLATE NAME FILTER (AutoComplete)
    # =========================================================

    @competitionRankingPeriodTemplateNameFilter
    Scenario Outline: Filter Ranking Periods by Template Name "<TemplateName>" and validate API response
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Ranking sub tab
        Then  User navigates to the Ranking Period sub tab
        Then  User clicks the filter icon on Ranking Period page to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Ranking Period filter dialog
        Then  User starts capturing the Ranking Period filter API response
        Then  User applies Ranking Period Basic Filter with following criteria
            | FilterField   | FilterValue    |
            | Template Name | <TemplateName> |
        Then  User clicks the Apply button in Ranking Period filter dialog
        Then  User prints the Ranking Period filter API response JSON
        Then  User logs UI vs API record count for Ranking Period
        Then  User verifies the Ranking Period filter API total count is greater than zero

        Examples:
            | TemplateName                    |
            | Business Template Main Template |

    # =========================================================
    # STATUS BADGE FILTER
    # =========================================================

    @competitionRankingPeriodStatusFilter
    Scenario Outline: Filter Ranking Periods by Status "<StatusValue>" and validate API response
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Ranking sub tab
        Then  User navigates to the Ranking Period sub tab
        Then  User clicks the filter icon on Ranking Period page to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Ranking Period filter dialog
        Then  User clicks the Reset button in Ranking Period filter dialog
        Then  User starts capturing the Ranking Period filter API response
        Then  User applies Ranking Period Basic Filter with following criteria
            | FilterField | FilterValue   |
            | Status      | <StatusValue> |
        Then  User clicks the Apply button in Ranking Period filter dialog
        Then  User prints the Ranking Period filter API response JSON
        Then  User logs UI vs API record count for Ranking Period
        Then  User verifies the Ranking Period filter API total count is greater than zero

        Examples:
            | StatusValue |
            | Active      |
            | Inactive    |

    # =========================================================
    # GROUP NAME FILTER (AutoComplete)
    # =========================================================

    @competitionRankingPeriodGroupNameFilter
    Scenario Outline: Filter Ranking Periods by Group Name "<GroupName>" and validate API response
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Ranking sub tab
        Then  User navigates to the Ranking Period sub tab
        Then  User clicks the filter icon on Ranking Period page to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Ranking Period filter dialog
        Then  User starts capturing the Ranking Period filter API response
        Then  User applies Ranking Period Basic Filter with following criteria
            | FilterField | FilterValue |
            | Group Name  | <GroupName> |
        Then  User clicks the Apply button in Ranking Period filter dialog
        Then  User prints the Ranking Period filter API response JSON
        Then  User logs UI vs API record count for Ranking Period
        Then  User verifies the Ranking Period filter API total count is greater than zero

        Examples:
            | GroupName |
            | Group 2   |

    # =========================================================
    # MATCHDAY COUNT FILTER (AutoComplete)
    # =========================================================

    @competitionRankingPeriodMatchdayCountFilter
    Scenario Outline: Filter Ranking Periods by Matchday Count "<MatchdayCount>" and validate API response
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Ranking sub tab
        Then  User navigates to the Ranking Period sub tab
        Then  User clicks the filter icon on Ranking Period page to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Ranking Period filter dialog
        Then  User starts capturing the Ranking Period filter API response
        Then  User applies Ranking Period Basic Filter with following criteria
            | FilterField    | FilterValue     |
            | Matchday Count | <MatchdayCount> |
        Then  User clicks the Apply button in Ranking Period filter dialog
        Then  User prints the Ranking Period filter API response JSON
        Then  User logs UI vs API record count for Ranking Period
        Then  User verifies the Ranking Period filter API total count is greater than zero

        Examples:
            | MatchdayCount    |
            | New Template-  5 |

    # =========================================================
    # GROUPS FILTER (AutoComplete)
    # =========================================================

    @competitionRankingPeriodGroupsFilter
    Scenario Outline: Filter Ranking Periods by Groups "<Groups>" and validate API response
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Ranking sub tab
        Then  User navigates to the Ranking Period sub tab
        Then  User clicks the filter icon on Ranking Period page to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Ranking Period filter dialog
        Then  User starts capturing the Ranking Period filter API response
        Then  User applies Ranking Period Basic Filter with following criteria
            | FilterField | FilterValue |
            | Groups      | <Groups>    |
        Then  User clicks the Apply button in Ranking Period filter dialog
        Then  User prints the Ranking Period filter API response JSON
        Then  User logs UI vs API record count for Ranking Period
        Then  User verifies the Ranking Period filter API total count is greater than zero

        Examples:
            | Groups |
            | 2      |
