@smoke @regression @userManagementBasicFilter @basicFilter
Feature: User Management - Filter Functionality
    As a user
    I want to filter user records on the User Management page
    So that I can find specific users quickly

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
        Then  User can able to navigate to Settings Page

    # =========================================================
    # USER MANAGEMENT FILTER – SEARCH TEXT
    # =========================================================

    @userManagementSearchFilter
    Scenario Outline: Verify user can search user management by text "<SearchText>"
        Then  User clicks the User Management filter icon
        Then  User verifies the User Management filter dialog is displayed
        Then  User searches user management with text "<SearchText>"
        Then  User selects the first suggestion from user management search dropdown
        Then  User starts capturing the user management API response
        Then  User clicks Apply on User Management filter dialog
        Then  User awaits and verifies the user management API total count is greater than zero
        Then  User clicks Reset on User Management filter dialog

        Examples:
            | SearchText          |
            | User Regressio03    |

    # =========================================================
    # USER MANAGEMENT FILTER – STATUS BADGE
    # =========================================================

    @userManagementStatusFilter
    Scenario Outline: Verify user can filter user management by Status "<StatusValue>"
        Then  User clicks the User Management filter icon
        Then  User verifies the User Management filter dialog is displayed
        Then  User clicks Reset on User Management filter dialog
        Then  User applies User Management filter with following criteria
            | Status | <StatusValue> |
        Then  User starts capturing the user management API response
        Then  User clicks Apply on User Management filter dialog
        Then  User awaits and verifies the user management API total count is greater than zero
        Then  User clicks Reset on User Management filter dialog

        Examples:
            | StatusValue |
            | Active      |
           # | Inactive    |

    # =========================================================
    # USER MANAGEMENT FILTER – ROLE
    # =========================================================

    @userManagementRoleFilter
    Scenario Outline: Verify user can filter user management by Role "<RoleValue>"
        Then  User clicks the User Management filter icon
        Then  User verifies the User Management filter dialog is displayed
        Then  User applies User Management filter with following criteria
            | Role | <RoleValue> |
        Then  User starts capturing the user management API response
        Then  User clicks Apply on User Management filter dialog
        Then  User verifies the user management filtered grid displays matching records
        Then  User clicks Reset on User Management filter dialog

        Examples:
            | RoleValue   |
            | Super Admin |

    # =========================================================
    # USER MANAGEMENT FILTER – GENDER BADGE
    # =========================================================

    @userManagementGenderFilter
    Scenario Outline: Verify user can filter user management by Gender "<GenderValue>"
        Then  User clicks the User Management filter icon
        Then  User verifies the User Management filter dialog is displayed
        Then  User applies User Management filter with following criteria
            | Gender | <GenderValue> |
        Then  User starts capturing the user management API response
        Then  User clicks Apply on User Management filter dialog
        Then  User awaits and verifies the user management API total count is greater than zero
        Then  User clicks Reset on User Management filter dialog

        Examples:
            | GenderValue |
            | Female      |
            #| Male        |

    # =========================================================
    # USER MANAGEMENT FILTER – REGION
    # =========================================================

    @userManagementRegionFilter
    Scenario Outline: Verify user can filter user management by Region "<RegionValue>"
        Then  User clicks the User Management filter icon
        Then  User verifies the User Management filter dialog is displayed
        Then  User applies User Management filter with following criteria
            | Region | <RegionValue> |
        Then  User starts capturing the user management API response
        Then  User clicks Apply on User Management filter dialog
        Then  User verifies the user management filtered grid displays matching records
        Then  User clicks Reset on User Management filter dialog

        Examples:
            | RegionValue |
            | Region 1    |
           # | Region 2    |

    # =========================================================
    # USER MANAGEMENT FILTER – DEPARTMENT
    # =========================================================

    @userManagementDepartmentFilter
    Scenario Outline: Verify user can filter user management by Department "<DepartmentValue>"
        Then  User clicks the User Management filter icon
        Then  User verifies the User Management filter dialog is displayed
        Then  User applies User Management filter with following criteria
            | Department | <DepartmentValue> |
        Then  User starts capturing the user management API response
        Then  User clicks Apply on User Management filter dialog
        Then  User verifies the user management filtered grid displays matching records
        Then  User clicks Reset on User Management filter dialog

        Examples:
            | DepartmentValue |
            | Sports          |

    # =========================================================
    # USER MANAGEMENT FILTER – TAGS
    # =========================================================

    @userManagementTagsFilter
    Scenario Outline: Verify user can filter user management by Tags "<TagsValue>"
        Then  User clicks the User Management filter icon
        Then  User verifies the User Management filter dialog is displayed
        Then  User applies User Management filter with following criteria
            | Tags | <TagsValue> |
        Then  User starts capturing the user management API response
        Then  User clicks Apply on User Management filter dialog
        Then  User verifies the user management filtered grid displays matching records
        Then  User clicks Reset on User Management filter dialog

        Examples:
            | TagsValue                        |
            | RegressionTest (Administrative)  |

    # =========================================================
    # USER MANAGEMENT FILTER – AGE RANGE
    # =========================================================

    @userManagementAgeRangeFilter
    Scenario Outline: Verify user can filter user management by Age Range min "<MinAge>" max "<MaxAge>"
        Then  User clicks the User Management filter icon
        Then  User verifies the User Management filter dialog is displayed
        Then  User applies User Management Age Range filter with min "<MinAge>" and max "<MaxAge>"
        Then  User starts capturing the user management API response
        Then  User clicks Apply on User Management filter dialog
        Then  User verifies the user management filtered grid displays matching records
        Then  User clicks Reset on User Management filter dialog

        Examples:
            | MinAge | MaxAge |
            | 18     | 40     |
