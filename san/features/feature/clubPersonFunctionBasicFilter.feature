@smoke @regression @clubPersonFunctionBasicFilter @basicFilter
Feature: Club Person Function Basic Filter Functionality
    As a user
    I want to filter person functions inside a club detail page
    So that I can find specific function records for a club

    Background:
        Given I am on the login page
        And I load credentials from "test-data/credentials.json"
        When  I enter username from "validUser"
        And   I enter password from "validUser"
        And   I click the login button
        Then  I should be logged in successfully
        Then  User select the Role on role list
        When I select "RegSeason" in the Season dropdown
        Then  User Clicking on submit button

    # =========================================================
    # SCENARIO 1 – SEARCH TEXT FILTER
    # =========================================================

    @clubPersonFunctionSearchTextFilter
    Scenario Outline: Verify user can filter club person functions by search text "<SearchText>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the "Person Function(s)" tab on club detail page
        Then  User opens the "<FunctionSection>" function filter
        Then  User verifies the function filter dialog is open
        Then  User searches person functions with search text "<SearchText>"
        Then  User starts capturing the person functions API
        Then  User clicks Apply on the person function filter
        Then  User awaits and verifies the person functions API total count is greater than zero
        Then  User prints the person functions API response as JSON
        Then  User clicks Reset on the person function filter
        Then  User verifies all person function filters have been cleared

        Examples:
            | ClubName          | FunctionSection  | SearchText                               |
            | RegressionTest002 | Club Function(s) | RegressionPerson Nikkil                  |

    # =========================================================
    # SCENARIO 2 – STATUS FILTER (reset then re-apply)
    # =========================================================

    @clubPersonFunctionStatusFilter
    Scenario Outline: Verify user can filter club person functions by Status "<StatusValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the "Person Function(s)" tab on club detail page
        Then  User opens the "<FunctionSection>" function filter
        Then  User verifies the function filter dialog is open
        Then  User clicks Reset on the person function filter
        Then  User filters person functions by Status "<StatusValue>"
        Then  User starts capturing the person functions API
        Then  User clicks Apply on the person function filter
        Then  User awaits and verifies the person functions API total count is greater than zero
        Then  User prints the person functions API response as JSON
        Then  User clicks Reset on the person function filter
        Then  User verifies all person function filters have been cleared

        Examples:
            | ClubName          | FunctionSection  | StatusValue |
            | RegressionTest002 | Club Function(s) | Active      |

    # =========================================================
    # SCENARIO 3 – LEVEL FILTER
    # =========================================================

    @clubPersonFunctionLevelFilter
    Scenario Outline: Verify user can filter club person functions by Level "<LevelValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the "Person Function(s)" tab on club detail page
        Then  User opens the "<FunctionSection>" function filter
        Then  User verifies the function filter dialog is open
        Then  User filters person functions by Level "<LevelValue>"
        Then  User starts capturing the person functions API
        Then  User clicks Apply on the person function filter
        Then  User awaits and verifies the person functions API total count is greater than zero
        Then  User prints the person functions API response as JSON
        Then  User verifies the person function filtered grid has records
        Then  User clicks Reset on the person function filter
        Then  User verifies all person function filters have been cleared

        Examples:
            | ClubName          | FunctionSection  | LevelValue |
            | RegressionTest002 | Club Function(s) | Section    |

    # =========================================================
    # SCENARIO 4 – CLUB FUNCTION FILTER
    # =========================================================

    @clubPersonFunctionClubFunctionFilter
    Scenario Outline: Verify user can filter club person functions by Club Function "<ClubFunctionValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the "Person Function(s)" tab on club detail page
        Then  User opens the "<FunctionSection>" function filter
        Then  User verifies the function filter dialog is open
        Then  User filters person functions by Club Function "<ClubFunctionValue>"
        Then  User starts capturing the person functions API
        Then  User clicks Apply on the person function filter
        Then  User awaits and verifies the person functions API total count is greater than zero
        Then  User prints the person functions API response as JSON
        Then  User verifies the person function filtered grid has records
        Then  User clicks Reset on the person function filter
        Then  User verifies all person function filters have been cleared

        Examples:
            | ClubName          | FunctionSection  | ClubFunctionValue   |
            | RegressionTest002 | Club Function(s) | Club Clothing Admin |

    # =========================================================
    # SCENARIO 5 – SECTION VALUE FILTER
    # =========================================================

    @clubPersonFunctionSectionValueFilter
    Scenario Outline: Verify user can filter club person functions by Section "<SectionValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the "Person Function(s)" tab on club detail page
        Then  User opens the "<FunctionSection>" function filter
        Then  User verifies the function filter dialog is open
        Then  User filters person functions by Section "<SectionValue>"
        Then  User starts capturing the person functions API
        Then  User clicks Apply on the person function filter
        Then  User awaits and verifies the person functions API total count is greater than zero
        Then  User prints the person functions API response as JSON
        Then  User verifies the person function filtered grid has records
        Then  User clicks Reset on the person function filter
        Then  User verifies all person function filters have been cleared

        Examples:
            | ClubName          | FunctionSection     | SectionValue      |
            | RegressionTest002 | Section Function(s) | RegressionTest002 |

    # =========================================================
    # SCENARIO 6 – SECTION FUNCTION FILTER
    # =========================================================

    @clubPersonFunctionSectionFunctionFilter
    Scenario Outline: Verify user can filter club person functions by Section Function "<SectionFunctionValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the "Person Function(s)" tab on club detail page
        Then  User opens the "<FunctionSection>" function filter
        Then  User verifies the function filter dialog is open
        Then  User filters person functions by Section Function "<SectionFunctionValue>"
        Then  User starts capturing the person functions API
        Then  User clicks Apply on the person function filter
        Then  User awaits and verifies the person functions API total count is greater than zero
        Then  User prints the person functions API response as JSON
        Then  User verifies the person function filtered grid has records
        Then  User clicks Reset on the person function filter
        Then  User verifies all person function filters have been cleared

        Examples:
            | ClubName          | FunctionSection     | SectionFunctionValue |
            | RegressionTest002 | Section Function(s) | Futsal Co-Ordinator  |

    # =========================================================
    # SCENARIO 7 – TEAM VALUE FILTER
    # =========================================================

    @clubPersonFunctionTeamValueFilter
    Scenario Outline: Verify user can filter club person functions by Team "<TeamValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the "Person Function(s)" tab on club detail page
        Then  User opens the "<FunctionSection>" function filter
        Then  User verifies the function filter dialog is open
        Then  User filters person functions by Team "<TeamValue>"
        Then  User starts capturing the person functions API
        Then  User clicks Apply on the person function filter
        Then  User awaits and verifies the person functions API total count is greater than zero
        Then  User prints the person functions API response as JSON
        Then  User verifies the person function filtered grid has records
        Then  User clicks Reset on the person function filter
        Then  User verifies all person function filters have been cleared

        Examples:
            | ClubName          | FunctionSection  | TeamValue   |
            | RegressionTest002 | Team Function(s) | Regressio24 |

    # =========================================================
    # SCENARIO 8 – TEAM FUNCTION FILTER
    # =========================================================

    @clubPersonFunctionTeamFunctionFilter
    Scenario Outline: Verify user can filter club person functions by Team Function "<TeamFunctionValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the "Person Function(s)" tab on club detail page
        Then  User opens the "<FunctionSection>" function filter
        Then  User verifies the function filter dialog is open
        Then  User filters person functions by Team Function "<TeamFunctionValue>"
        Then  User starts capturing the person functions API
        Then  User clicks Apply on the person function filter
        Then  User awaits and verifies the person functions API total count is greater than zero
        Then  User prints the person functions API response as JSON
        Then  User verifies the person function filtered grid has records
        Then  User clicks Reset on the person function filter
        Then  User verifies all person function filters have been cleared

        Examples:
            | ClubName          | FunctionSection  | TeamFunctionValue |
            | RegressionTest002 | Team Function(s) | Head Coach        |

    # =========================================================
    # SCENARIO 9 – DATE RANGE FILTER
    # =========================================================

    @clubPersonFunctionDateRangeFilter
    Scenario Outline: Verify user can filter club person functions by Date Range "<DateRange>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the "Person Function(s)" tab on club detail page
        Then  User opens the "<FunctionSection>" function filter
        Then  User verifies the function filter dialog is open
        Then  User filters person functions by Date Range "<DateRange>"
        Then  User starts capturing the person functions API
        Then  User clicks Apply on the person function filter
        Then  User awaits and verifies the person functions API total count is greater than zero
        Then  User prints the person functions API response as JSON
        Then  User verifies the person function filtered grid has records
        Then  User clicks Reset on the person function filter
        Then  User verifies all person function filters have been cleared

        Examples:
            | ClubName          | FunctionSection  | DateRange               |
            | RegressionTest002 | Club Function(s) | 10/03/2026 - 27/03/2026 |
