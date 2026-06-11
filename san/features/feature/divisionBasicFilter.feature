@smoke @regression @divisionBasicFilter @basicFilter
Feature: Division Basic Filter Functionality
    As a user
    I want to filter the Division grid using basic filter criteria
    So that I can find specific divisions based on filter criteria

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
    # SEARCH BY DIVISION NAME OR CODE
    # =========================================================

    @divisionBasicFilterSearchTest
    Scenario Outline: Verify user can search divisions by name or code "<SearchText>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division category tab
        Then  User verifies the division page title
        Then  User clicks the filter icon to open Division basic filter
        Then  User searches for division with "<SearchText>" in Division basic filter
        Then  User starts capturing the Division basic filter list API response
        Then  User clicks the Apply button in Division basic filter dialog
        Then  User verifies the Division basic filter API total count is greater than zero
        Then  User prints the Division basic filter API response JSON
        Then  User clicks the filter icon to open Division basic filter
        Then  User clicks the Reset button in Division basic filter dialog
        Then  User verifies that all Division basic filters are cleared
        Examples:
            | SearchText      |
            | MatchDiv        |

    # =========================================================
    # STATUS FILTER – open filter, reset first, then select badge
    # =========================================================

    @divisionBasicFilterStatusTest
    Scenario Outline: Verify user can filter divisions by Status badge "<StatusValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division category tab
        Then  User verifies the division page title
        Then  User clicks the filter icon to open Division basic filter
        Then  User clicks the Reset button in Division basic filter dialog
        Then  User selects the "<StatusValue>" status badge in Division basic filter
        Then  User starts capturing the Division basic filter list API response
        Then  User clicks the Apply button in Division basic filter dialog
        Then  User verifies the Division basic filter API total count is greater than zero
        Then  User prints the Division basic filter API response JSON
        Then  User clicks the filter icon to open Division basic filter
        Then  User clicks the Reset button in Division basic filter dialog
        Then  User verifies that all Division basic filters are cleared
        Examples:
            | StatusValue |
            | Active      |

    # =========================================================
    # FORMAT FILTER
    # =========================================================

    @divisionBasicFilterFormatTest
    Scenario Outline: Verify user can filter divisions by Format "<FormatValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division category tab
        Then  User verifies the division page title
        Then  User clicks the filter icon to open Division basic filter
        Then  User selects "<FormatValue>" in Division basic filter Format field
        Then  User starts capturing the Division basic filter list API response
        Then  User clicks the Apply button in Division basic filter dialog
        Then  User verifies the Division basic filter API total count is greater than zero
        Then  User prints the Division basic filter API response JSON
        Then  User clicks the filter icon to open Division basic filter
        Then  User clicks the Reset button in Division basic filter dialog
        Then  User verifies that all Division basic filters are cleared
        Examples:
            | FormatValue |
            | Football    |

    # =========================================================
    # DIVISION CATEGORY FILTER
    # =========================================================

    @divisionBasicFilterDivisionCategoryTest
    Scenario Outline: Verify user can filter divisions by Division Category "<DivisionCategoryValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division category tab
        Then  User verifies the division page title
        Then  User clicks the filter icon to open Division basic filter
        Then  User selects "<DivisionCategoryValue>" in Division basic filter Division Category field
        Then  User starts capturing the Division basic filter list API response
        Then  User clicks the Apply button in Division basic filter dialog
        Then  User verifies the Division basic filter API total count is greater than zero
        Then  User prints the Division basic filter API response JSON
        Then  User clicks the filter icon to open Division basic filter
        Then  User clicks the Reset button in Division basic filter dialog
        Then  User verifies that all Division basic filters are cleared
        Examples:
            | DivisionCategoryValue |
            | MatchDivcat           |

    # =========================================================
    # FEDERATION FILTER
    # =========================================================

    @divisionBasicFilterFederationTest
    Scenario Outline: Verify user can filter divisions by Federation "<FederationValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division category tab
        Then  User verifies the division page title
        Then  User clicks the filter icon to open Division basic filter
        Then  User selects "<FederationValue>" in Division basic filter Federation field
        Then  User starts capturing the Division basic filter list API response
        Then  User clicks the Apply button in Division basic filter dialog
        Then  User verifies the Division basic filter API total count is greater than zero
        Then  User prints the Division basic filter API response JSON
        Then  User clicks the filter icon to open Division basic filter
        Then  User clicks the Reset button in Division basic filter dialog
        Then  User verifies that all Division basic filters are cleared
        Examples:
            | FederationValue |
            | RBFA            |

    # =========================================================
    # REGION FILTER
    # =========================================================

    @divisionBasicFilterRegionTest
    Scenario Outline: Verify user can filter divisions by Region "<RegionValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division category tab
        Then  User verifies the division page title
        Then  User clicks the filter icon to open Division basic filter
        Then  User selects "<RegionValue>" in Division basic filter Region field
        Then  User starts capturing the Division basic filter list API response
        Then  User clicks the Apply button in Division basic filter dialog
        Then  User verifies the Division basic filter API total count is greater than zero
        Then  User prints the Division basic filter API response JSON
        Then  User clicks the filter icon to open Division basic filter
        Then  User clicks the Reset button in Division basic filter dialog
        Then  User verifies that all Division basic filters are cleared
        Examples:
            | RegionValue |
            | Region1     |

    # =========================================================
    # ORGANIZATION FILTER
    # =========================================================

    @divisionBasicFilterOrganizationTest
    Scenario Outline: Verify user can filter divisions by Organization "<OrganizationValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division category tab
        Then  User verifies the division page title
        Then  User clicks the filter icon to open Division basic filter
        Then  User selects "<OrganizationValue>" in Division basic filter Organization field
        Then  User starts capturing the Division basic filter list API response
        Then  User clicks the Apply button in Division basic filter dialog
        Then  User verifies the Division basic filter API total count is greater than zero
        Then  User prints the Division basic filter API response JSON
        Then  User clicks the filter icon to open Division basic filter
        Then  User clicks the Reset button in Division basic filter dialog
        Then  User verifies that all Division basic filters are cleared
        Examples:
            | OrganizationValue |
            | competitive       |

    # =========================================================
    # TAGS FILTER
    # =========================================================

    @divisionBasicFilterTagsTest
    Scenario Outline: Verify user can filter divisions by Tags "<TagValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division category tab
        Then  User verifies the division page title
        Then  User clicks the filter icon to open Division basic filter
        Then  User selects "<TagValue>" in Division basic filter Tags field
        Then  User starts capturing the Division basic filter list API response
        Then  User clicks the Apply button in Division basic filter dialog
        Then  User verifies the Division basic filter API total count is greater than zero
        Then  User prints the Division basic filter API response JSON
        Then  User clicks the filter icon to open Division basic filter
        Then  User clicks the Reset button in Division basic filter dialog
        Then  User verifies that all Division basic filters are cleared
        Examples:
            | TagValue    |
            | MatchChange |
