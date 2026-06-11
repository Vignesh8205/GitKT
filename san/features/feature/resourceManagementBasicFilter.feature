@smoke @regression @resourceManagementFilter @basicFilter
Feature: Resource Management - Filter Functionality
    As a user
    I want to filter venue records on the Resource Management page
    So that I can find specific venues quickly

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
        Then  User Can able to access the Main menu in home page
        Then  User can able to navigate to Resource Management page

    # =========================================================
    # RESOURCE MANAGEMENT FILTER – SEARCH TEXT
    # =========================================================

    @resourceManagementSearchFilter
    Scenario Outline: Verify user can search resource management by text "<SearchText>"
        Then  User clicks the Resource Management filter icon
        Then  User verifies the Resource Management filter dialog is displayed
        Then  User searches resource management with text "<SearchText>"
        Then  User selects the first suggestion from resource management search dropdown
        Then  User starts capturing the resource management API response
        Then  User clicks Apply on Resource Management filter dialog
        Then  User awaits and verifies the resource management API total count is greater than zero
        Then  User clicks Reset on Resource Management filter dialog

        Examples:
            | SearchText                  |
            | 0000kklm20250828175557      |

    # =========================================================
    # RESOURCE MANAGEMENT FILTER – VENUE TYPE
    # =========================================================

    @resourceManagementVenueTypeFilter
    Scenario Outline: Verify user can filter resource management by Venue Type "<VenueTypeValue>"
        Then  User clicks the Resource Management filter icon
        Then  User verifies the Resource Management filter dialog is displayed
        Then  User applies Resource Management filter with following criteria
            | Venue Type | <VenueTypeValue> |
        Then  User starts capturing the resource management API response
        Then  User clicks Apply on Resource Management filter dialog
        Then  User verifies the resource management filtered grid displays matching records
        Then  User clicks Reset on Resource Management filter dialog

        Examples:
            | VenueTypeValue |
            | Bar            |

    # =========================================================
    # RESOURCE MANAGEMENT FILTER – STATUS + FORMAT (BADGE)
    # =========================================================

    @resourceManagementStatusFormatFilter
    Scenario Outline: Verify user can filter resource management by Status "<StatusValue>" and Format "<FormatValue>"
        Then  User clicks the Resource Management filter icon
        Then  User verifies the Resource Management filter dialog is displayed
        Then  User clicks Reset on Resource Management filter dialog
        Then  User applies Resource Management filter with following criteria
            | Status | <StatusValue> |
            | Format | <FormatValue> |
        Then  User starts capturing the resource management API response
        Then  User clicks Apply on Resource Management filter dialog
        Then  User awaits and verifies the resource management API total count is greater than zero
       

        Examples:
            | StatusValue | FormatValue |
            | Active      | Football    |

    # =========================================================
    # RESOURCE MANAGEMENT FILTER – FEDERATION
    # =========================================================

    @resourceManagementFederationFilter
    Scenario Outline: Verify user can filter resource management by Federation "<FederationValue>"
        Then  User clicks the Resource Management filter icon
        Then  User verifies the Resource Management filter dialog is displayed
        Then  User applies Resource Management filter with following criteria
            | Federation | <FederationValue> |
        Then  User starts capturing the resource management API response
        Then  User clicks Apply on Resource Management filter dialog
        Then  User awaits and verifies the resource management API total count is greater than zero
        Then  User clicks Reset on Resource Management filter dialog

        Examples:
            | FederationValue |
            | RBFA            |

    # =========================================================
    # RESOURCE MANAGEMENT FILTER – SURFACE TYPE
    # =========================================================

    @resourceManagementSurfaceTypeFilter
    Scenario Outline: Verify user can filter resource management by Surface Type "<SurfaceTypeValue>"
        Then  User clicks the Resource Management filter icon
        Then  User verifies the Resource Management filter dialog is displayed
        Then  User applies Resource Management filter with following criteria
            | Surface Type | <SurfaceTypeValue> |
        Then  User starts capturing the resource management API response
        Then  User clicks Apply on Resource Management filter dialog
        Then  User verifies the resource management filtered grid displays matching records
        Then  User clicks Reset on Resource Management filter dialog

        Examples:
            | SurfaceTypeValue  |
            | Surface Type 1    |

    # =========================================================
    # RESOURCE MANAGEMENT FILTER – PITCH TYPE
    # =========================================================

    @resourceManagementPitchTypeFilter
    Scenario Outline: Verify user can filter resource management by Pitch Type "<PitchTypeValue>"
        Then  User clicks the Resource Management filter icon
        Then  User verifies the Resource Management filter dialog is displayed
        Then  User applies Resource Management filter with following criteria
            | Pitch Type | <PitchTypeValue> |
        Then  User starts capturing the resource management API response
        Then  User clicks Apply on Resource Management filter dialog
        Then  User verifies the resource management filtered grid displays matching records
        Then  User clicks Reset on Resource Management filter dialog

        Examples:
            | PitchTypeValue |
            | Pitch Type 1   |

    # =========================================================
    # RESOURCE MANAGEMENT FILTER – OWNER + TAGS (COMBINED)
    # =========================================================

    @resourceManagementOwnerTagsFilter
    Scenario Outline: Verify user can filter resource management by Owner "<OwnerValue>" and Tags "<TagsValue>"
        Then  User clicks the Resource Management filter icon
        Then  User verifies the Resource Management filter dialog is displayed
        Then  User clicks Reset on Resource Management filter dialog
        Then  User applies Resource Management filter with following criteria
            | Owner | <OwnerValue> |
            | Tags  | <TagsValue>  |
        Then  User starts capturing the resource management API response
        Then  User clicks Apply on Resource Management filter dialog
        Then  User verifies the resource management filtered grid displays matching records
        Then  User clicks Reset on Resource Management filter dialog

        Examples:
            | OwnerValue | TagsValue                       |
            | owner-1    | RegressionTest (Administrative) |
