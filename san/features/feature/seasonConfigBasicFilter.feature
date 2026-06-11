@smoke @regression @seasonConfigBasicFilter @basicFilter
Feature: Season Configuration Basic Filter Functionality
    As a user
    I want to filter Season Configurations using basic filter criteria
    So that I can find specific configurations quickly

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
    # SEASON CONFIG BASIC FILTER – FEDERATION
    # =========================================================

    @seasonConfigFederationFilter
    Scenario Outline: Verify user can filter Season Configurations by Federation "<Federation>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User clicks the Season tab in Competition Management sidebar
        Then  User clicks the Home tab in Season management
        Then  User clicks the quick search icon on Season listing
        Then  User searches for "<SeasonName>" in season quick search popup
        Then  User closes the season quick search popup
        Then  User clicks on the first season record in listing
        Then  User clicks the Configurations tab in season detail page
        Then  User clicks the Season Configuration filter icon
        Then  User clicks the "Basic Filter" tab in Season Configuration filter dialog
        Then  User applies Season Configuration Basic Filter with following criteria
            | Federation | <Federation> |
        Then  User starts capturing the Season Configuration basic filter API response
        Then  User clicks the Apply button in Season Configuration filter dialog
        Then  User verifies the Season Configuration basic filter API response total count is greater than zero
        Then  User prints the Season Configuration basic filter API response JSON
        Then  User clicks the Season Configuration filter icon
        Then  User clicks the "Basic Filter" tab in Season Configuration filter dialog
        Then  User clicks the Reset button in Season Configuration filter dialog
        Then  User verifies that all Season Configuration filters are cleared

        Examples:
            | SeasonName   | Federation |
            | Season Filter| RBFA       |

    # =========================================================
    # SEASON CONFIG BASIC FILTER – FORMAT
    # =========================================================

    @seasonConfigFormatFilter
    Scenario Outline: Verify user can filter Season Configurations by Format "<Format>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User clicks the Season tab in Competition Management sidebar
        Then  User clicks the Home tab in Season management
        Then  User clicks the quick search icon on Season listing
        Then  User searches for "<SeasonName>" in season quick search popup
        Then  User closes the season quick search popup
        Then  User clicks on the first season record in listing
        Then  User clicks the Configurations tab in season detail page
        Then  User clicks the Season Configuration filter icon
        Then  User clicks the "Basic Filter" tab in Season Configuration filter dialog
        Then  User applies Season Configuration Basic Filter with following criteria
            | Format | <Format> |
        Then  User starts capturing the Season Configuration basic filter API response
        Then  User clicks the Apply button in Season Configuration filter dialog
        Then  User verifies the Season Configuration basic filter API response total count is greater than zero
        Then  User prints the Season Configuration basic filter API response JSON
        Then  User clicks the Season Configuration filter icon
        Then  User clicks the "Basic Filter" tab in Season Configuration filter dialog
        Then  User clicks the Reset button in Season Configuration filter dialog
        Then  User verifies that all Season Configuration filters are cleared

        Examples:
            | SeasonName    | Format        |
            | Season Filter | Football      |
            | Season Filter | Futsal        |
            | Season Filter | Mini-football |

    # =========================================================
    # SEASON CONFIG BASIC FILTER – REGION
    # =========================================================

    @seasonConfigRegionFilter
    Scenario Outline: Verify user can filter Season Configurations by Region "<Region>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User clicks the Season tab in Competition Management sidebar
        Then  User clicks the Home tab in Season management
        Then  User clicks the quick search icon on Season listing
        Then  User searches for "<SeasonName>" in season quick search popup
        Then  User closes the season quick search popup
        Then  User clicks on the first season record in listing
        Then  User clicks the Configurations tab in season detail page
        Then  User clicks the Season Configuration filter icon
        Then  User clicks the "Basic Filter" tab in Season Configuration filter dialog
        Then  User applies Season Configuration Basic Filter with following criteria
            | Region | <Region> |
        Then  User starts capturing the Season Configuration basic filter API response
        Then  User clicks the Apply button in Season Configuration filter dialog
        Then  User verifies the Season Configuration basic filter API response total count is greater than zero
        Then  User prints the Season Configuration basic filter API response JSON
        Then  User clicks the Season Configuration filter icon
        Then  User clicks the "Basic Filter" tab in Season Configuration filter dialog
        Then  User clicks the Reset button in Season Configuration filter dialog
        Then  User verifies that all Season Configuration filters are cleared

        Examples:
            | SeasonName    | Region  |
            | Season Filter | Region1 |
            | Season Filter | Region2 |

    # =========================================================
    # SEASON CONFIG BASIC FILTER – TYPE
    # =========================================================

    @seasonConfigTypeFilter
    Scenario Outline: Verify user can filter Season Configurations by Type "<Type>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User clicks the Season tab in Competition Management sidebar
        Then  User clicks the Home tab in Season management
        Then  User clicks the quick search icon on Season listing
        Then  User searches for "<SeasonName>" in season quick search popup
        Then  User closes the season quick search popup
        Then  User clicks on the first season record in listing
        Then  User clicks the Configurations tab in season detail page
        Then  User clicks the Season Configuration filter icon
        Then  User clicks the "Basic Filter" tab in Season Configuration filter dialog
        Then  User applies Season Configuration Basic Filter with following criteria
            | Type | <Type> |
        Then  User starts capturing the Season Configuration basic filter API response
        Then  User clicks the Apply button in Season Configuration filter dialog
        Then  User verifies the Season Configuration basic filter API response total count is greater than zero
        Then  User prints the Season Configuration basic filter API response JSON
        Then  User clicks the Season Configuration filter icon
        Then  User clicks the "Basic Filter" tab in Season Configuration filter dialog
        Then  User clicks the Reset button in Season Configuration filter dialog
        Then  User verifies that all Season Configuration filters are cleared

        Examples:
            | SeasonName    | Type               |
            | Season Filter | Club Collaboration |

    # =========================================================
    # SEASON CONFIG BASIC FILTER – COMPETITION TYPE
    # =========================================================

    @seasonConfigCompetitionTypeFilter
    Scenario Outline: Verify user can filter Season Configurations by Competition Type "<CompetitionType>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User clicks the Season tab in Competition Management sidebar
        Then  User clicks the Home tab in Season management
        Then  User clicks the quick search icon on Season listing
        Then  User searches for "<SeasonName>" in season quick search popup
        Then  User closes the season quick search popup
        Then  User clicks on the first season record in listing
        Then  User clicks the Configurations tab in season detail page
        Then  User clicks the Season Configuration filter icon
        Then  User clicks the "Basic Filter" tab in Season Configuration filter dialog
        Then  User applies Season Configuration Basic Filter with following criteria
            | Competition Type | <CompetitionType> |
        Then  User starts capturing the Season Configuration basic filter API response
        Then  User clicks the Apply button in Season Configuration filter dialog
        Then  User verifies the Season Configuration basic filter API response total count is greater than zero
        Then  User prints the Season Configuration basic filter API response JSON
        Then  User clicks the Season Configuration filter icon
        Then  User clicks the "Basic Filter" tab in Season Configuration filter dialog
        Then  User clicks the Reset button in Season Configuration filter dialog
        Then  User verifies that all Season Configuration filters are cleared

        Examples:
            | SeasonName    | CompetitionType |
            | Season Filter | Cup             |

    # =========================================================
    # SEASON CONFIG BASIC FILTER – TIME FRAME
    # =========================================================

    @seasonConfigTimeFrameFilter
    Scenario Outline: Verify user can filter Season Configurations by Time Frame "<TimeFrame>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User clicks the Season tab in Competition Management sidebar
        Then  User clicks the Home tab in Season management
        Then  User clicks the quick search icon on Season listing
        Then  User searches for "<SeasonName>" in season quick search popup
        Then  User closes the season quick search popup
        Then  User clicks on the first season record in listing
        Then  User clicks the Configurations tab in season detail page
        Then  User clicks the Season Configuration filter icon
        Then  User clicks the "Basic Filter" tab in Season Configuration filter dialog
        Then  User applies Season Configuration Basic Filter with following criteria
            | Time Frame | <TimeFrame> |
        Then  User starts capturing the Season Configuration basic filter API response
        Then  User clicks the Apply button in Season Configuration filter dialog
        Then  User verifies the Season Configuration basic filter API response total count is greater than zero
        Then  User prints the Season Configuration basic filter API response JSON
        Then  User clicks the Season Configuration filter icon
        Then  User clicks the "Basic Filter" tab in Season Configuration filter dialog
        Then  User clicks the Reset button in Season Configuration filter dialog
        Then  User verifies that all Season Configuration filters are cleared

        Examples:
            | SeasonName    | TimeFrame                   |
            | Season Filter | 08/03/2027 - 13/03/2027     |
