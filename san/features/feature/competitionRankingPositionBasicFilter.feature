@smoke @regression @competitionRankingPositionBasicFilter @basicFilter
Feature: Competition Management - Ranking Position Basic Filter
    As a user
    I want to filter Ranking Positions using Basic Filter
    So that I can find specific ranking positions based on filter criteria

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

    @competitionRankingPositionTemplateNameFilter
    Scenario Outline: Filter Ranking Positions by Template Name "<TemplateName>" and validate API response
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Ranking sub tab
        Then  User navigates to the Ranking Position sub tab
        Then  User clicks the filter icon on Ranking Position page to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Ranking Position filter dialog
        Then  User starts capturing the Ranking Position filter API response
        Then  User applies Ranking Position Basic Filter with following criteria
            | FilterField   | FilterValue    |
            | Template Name | <TemplateName> |
        Then  User clicks the Apply button in Ranking Position filter dialog
        Then  User prints the Ranking Position filter API response JSON
        Then  User logs UI vs API record count for Ranking Position
        Then  User verifies the Ranking Position filter API total count is greater than zero

        Examples:
            | TemplateName |
            | AAAATest001  |

    # =========================================================
    # STATUS BADGE FILTER
    # =========================================================

    @competitionRankingPositionStatusFilter
    Scenario Outline: Filter Ranking Positions by Status "<StatusValue>" and validate API response
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Ranking sub tab
        Then  User navigates to the Ranking Position sub tab
        Then  User clicks the filter icon on Ranking Position page to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Ranking Position filter dialog
        Then  User clicks the Reset button in Ranking Position filter dialog
        Then  User starts capturing the Ranking Position filter API response
        Then  User applies Ranking Position Basic Filter with following criteria
            | FilterField | FilterValue   |
            | Status      | <StatusValue> |
        Then  User clicks the Apply button in Ranking Position filter dialog
        Then  User prints the Ranking Position filter API response JSON
        Then  User logs UI vs API record count for Ranking Position
        Then  User verifies the Ranking Position filter API total count is greater than zero

        Examples:
            | StatusValue |
            | Active      |
            | Inactive    |

    # =========================================================
    # GROUP NAME FILTER (AutoComplete)
    # =========================================================

    @competitionRankingPositionGroupNameFilter
    Scenario Outline: Filter Ranking Positions by Group Name "<GroupName>" and validate API response
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Ranking sub tab
        Then  User navigates to the Ranking Position sub tab
        Then  User clicks the filter icon on Ranking Position page to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Ranking Position filter dialog
        Then  User starts capturing the Ranking Position filter API response
        Then  User applies Ranking Position Basic Filter with following criteria
            | FilterField | FilterValue |
            | Group Name  | <GroupName> |
        Then  User clicks the Apply button in Ranking Position filter dialog
        Then  User prints the Ranking Position filter API response JSON
        Then  User logs UI vs API record count for Ranking Position
        Then  User verifies the Ranking Position filter API total count is greater than zero

        Examples:
            | GroupName |
            | Group2   |

    # =========================================================
    # TOTAL TEAMS FILTER (AutoComplete)
    # =========================================================

    @competitionRankingPositionTotalTeamsFilter
    Scenario Outline: Filter Ranking Positions by Total Teams "<TotalTeams>" and validate API response
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Ranking sub tab
        Then  User navigates to the Ranking Position sub tab
        Then  User clicks the filter icon on Ranking Position page to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Ranking Position filter dialog
        Then  User starts capturing the Ranking Position filter API response
        Then  User applies Ranking Position Basic Filter with following criteria
            | FilterField | FilterValue  |
            | Total Teams | <TotalTeams> |
        Then  User clicks the Apply button in Ranking Position filter dialog
        Then  User prints the Ranking Position filter API response JSON
        Then  User logs UI vs API record count for Ranking Position
        Then  User verifies the Ranking Position filter API total count is greater than zero

        Examples:
            | TotalTeams |
            | 44         |

    # =========================================================
    # GROUPS FILTER (AutoComplete)
    # =========================================================

    @competitionRankingPositionGroupsFilter
    Scenario Outline: Filter Ranking Positions by Groups "<Groups>" and validate API response
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Ranking sub tab
        Then  User navigates to the Ranking Position sub tab
        Then  User clicks the filter icon on Ranking Position page to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Ranking Position filter dialog
        Then  User starts capturing the Ranking Position filter API response
        Then  User applies Ranking Position Basic Filter with following criteria
            | FilterField | FilterValue |
            | Groups      | <Groups>    |
        Then  User clicks the Apply button in Ranking Position filter dialog
        Then  User prints the Ranking Position filter API response JSON
        Then  User logs UI vs API record count for Ranking Position
        Then  User verifies the Ranking Position filter API total count is greater than zero

        Examples:
            | Groups |
            | 2      |
