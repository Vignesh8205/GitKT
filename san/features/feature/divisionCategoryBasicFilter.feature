@smoke @regression @divisionCategoryBasicFilter @basicFilter
Feature: Division Category Basic Filter Functionality
    As a user
    I want to filter the Division Category grid using basic filter criteria
    So that I can find specific division categories based on filter criteria

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
    # SEARCH BY DIVISION CATEGORY NAME OR CODE
    # =========================================================

    @divisionCategoryBasicFilterSearchTest
    Scenario Outline: Verify user can search division categories by name or code "<SearchText>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division Category menu
        Then  User verifies the division category page title
        Then  User clicks the filter icon to open Division Category basic filter
        Then  User searches for division category with "<SearchText>" in Division Category basic filter
        Then  User starts capturing the Division Category basic filter list API response
        Then  User clicks the Apply button in Division Category basic filter dialog
        Then  User verifies the Division Category basic filter API total count is greater than zero
        Then  User prints the Division Category basic filter API response JSON
        Then  User clicks the filter icon to open Division Category basic filter
        Then  User clicks the Reset button in Division Category basic filter dialog
        Then  User verifies that all Division Category basic filters are cleared
        Examples:
            | SearchText  |
            | MatchDivcat |

    # =========================================================
    # STATUS FILTER – reset first, then select badge
    # =========================================================

    @divisionCategoryBasicFilterStatusTest
    Scenario Outline: Verify user can filter division categories by Status badge "<StatusValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division Category menu
        Then  User verifies the division category page title
        Then  User clicks the filter icon to open Division Category basic filter
        Then  User clicks the Reset button in Division Category basic filter dialog
        Then  User selects the "<StatusValue>" status badge in Division Category basic filter
        Then  User starts capturing the Division Category basic filter list API response
        Then  User clicks the Apply button in Division Category basic filter dialog
        Then  User verifies the Division Category basic filter API total count is greater than zero
        Then  User prints the Division Category basic filter API response JSON
        Then  User clicks the filter icon to open Division Category basic filter
        Then  User clicks the Reset button in Division Category basic filter dialog
        Then  User verifies that all Division Category basic filters are cleared
        Examples:
            | StatusValue |
            | Active      |

    # =========================================================
    # FORMAT FILTER
    # =========================================================

    @divisionCategoryBasicFilterFormatTest
    Scenario Outline: Verify user can filter division categories by Format "<FormatValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division Category menu
        Then  User verifies the division category page title
        Then  User clicks the filter icon to open Division Category basic filter
        Then  User selects "<FormatValue>" in Division Category basic filter Format field
        Then  User starts capturing the Division Category basic filter list API response
        Then  User clicks the Apply button in Division Category basic filter dialog
        Then  User verifies the Division Category basic filter API total count is greater than zero
        Then  User prints the Division Category basic filter API response JSON
        Then  User clicks the filter icon to open Division Category basic filter
        Then  User clicks the Reset button in Division Category basic filter dialog
        Then  User verifies that all Division Category basic filters are cleared
        Examples:
            | FormatValue |
            | Football    |

    # =========================================================
    # DIVISION CATEGORY TYPE FILTER
    # =========================================================

    @divisionCategoryBasicFilterTypeTest
    Scenario Outline: Verify user can filter division categories by Division Category Type "<TypeValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division Category menu
        Then  User verifies the division category page title
        Then  User clicks the filter icon to open Division Category basic filter
        Then  User selects "<TypeValue>" in Division Category basic filter Division Category Type field
        Then  User starts capturing the Division Category basic filter list API response
        Then  User clicks the Apply button in Division Category basic filter dialog
        Then  User verifies the Division Category basic filter API total count is greater than zero
        Then  User prints the Division Category basic filter API response JSON
        Then  User clicks the filter icon to open Division Category basic filter
        Then  User clicks the Reset button in Division Category basic filter dialog
        Then  User verifies that all Division Category basic filters are cleared
        Examples:
            | TypeValue |
            | Under 19  |
