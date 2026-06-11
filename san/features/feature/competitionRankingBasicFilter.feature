@smoke @regression @competitionRankingBasicFilter @basicFilter
Feature: Competition Management - Ranking Template Basic Filter
    As a user
    I want to filter Ranking Templates using Basic Filter
    So that I can find specific ranking templates based on filter criteria

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

    @competitionRankingTemplateNameFilter
    Scenario Outline: Filter Ranking Templates by Template Name "<TemplateName>" and validate API response
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Ranking sub tab
        Then  User clicks the filter icon on Ranking page to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Ranking filter dialog
        Then  User starts capturing the Ranking filter API response
        Then  User applies Ranking Basic Filter with following criteria
            | FilterField   | FilterValue    |
            | Template Name | <TemplateName> |
        Then  User clicks the Apply button in Ranking filter dialog
        Then  User prints the Ranking filter API response JSON
        Then  User logs UI vs API record count for Ranking
        Then  User verifies the Ranking filter API total count is greater than zero

        Examples:
            | TemplateName                  |
            | RankingTemplate20260413145107 |

    # =========================================================
    # STATUS BADGE FILTER
    # =========================================================

    @competitionRankingStatusFilter
    Scenario Outline: Filter Ranking Templates by Status "<StatusValue>" and validate API response
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Ranking sub tab
        Then  User clicks the filter icon on Ranking page to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Ranking filter dialog
        Then  User clicks the Reset button in Ranking filter dialog
        Then  User starts capturing the Ranking filter API response
        Then  User applies Ranking Basic Filter with following criteria
            | FilterField | FilterValue   |
            | Status      | <StatusValue> |
        Then  User clicks the Apply button in Ranking filter dialog
        Then  User prints the Ranking filter API response JSON
        Then  User logs UI vs API record count for Ranking
        Then  User verifies the Ranking filter API total count is greater than zero

        Examples:
            | StatusValue |
            | Active      |
            | Inactive    |

    # =========================================================
    # RANKING CRITERIA BADGE FILTER
    # =========================================================

    @competitionRankingCriteriaFilter
    Scenario Outline: Filter Ranking Templates by Ranking Criteria "<CriteriaValue>" and validate API response
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Ranking sub tab
        Then  User clicks the filter icon on Ranking page to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Ranking filter dialog
        Then  User starts capturing the Ranking filter API response
        Then  User applies Ranking Basic Filter with following criteria
            | FilterField      | FilterValue     |
            | Ranking Criteria | <CriteriaValue> |
        Then  User clicks the Apply button in Ranking filter dialog
        Then  User prints the Ranking filter API response JSON
        Then  User logs UI vs API record count for Ranking
        Then  User verifies the Ranking filter API total count is greater than zero

        Examples:
            | CriteriaValue             |
            | Head-to-Head Goal Average |
