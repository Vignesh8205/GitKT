@smoke @regression @clubSectionTeamConfigAdvancedFilter @advanceFilter
Feature: Club Management - Section Detail - Team Configuration Tab Advanced Filter Functionality
    As a user
    I want to filter team configuration records on a section detail page using advanced filter
    So that I can find specific team configuration records using complex conditions

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

    # =============================================================
    # SINGLE CONDITION
    # =============================================================

    @clubSectionTeamConfigAdvancedFilterSingleConditionTest
    Scenario Outline: Verify user can apply a single condition advanced filter on Team Configuration using <Field> <Operator> "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the Sections tab on club detail page
        Then  User clicks the first section record in the sections grid
        Then  User navigates to the Team Configuration tab on section detail page
        Then  User opens the Team Configuration filter in club section page
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the club section team config advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club section team config advanced filter API response total count is greater than zero
        Then  User prints the club section team config advanced filter API response JSON
        Then  User verifies all club section team config advanced filter API records have "<Field>" "<Operator>" "<Value>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | ClubName  | Field             | Operator            | Value    |
            | AAAAPawan | Status            | Contains            | Active   |
            | AAAAPawan | Status            | Does not start with | Inactive |
            | AAAAPawan | Status            | Does not contain    | Inactive |
            | AAAAPawan | Division Category | Contains            | Team     |

    # =============================================================
    # AND CONDITION
    # =============================================================

    @clubSectionTeamConfigAdvancedFilterANDConditionTest
    Scenario Outline: Verify user can apply two conditions with AND logic on Team Configuration - <Field1> and <Field2>
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the Sections tab on club detail page
        Then  User clicks the first section record in the sections grid
        Then  User navigates to the Team Configuration tab on section detail page
        Then  User opens the Team Configuration filter in club section page
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field1>" as the condition field
        Then  User selects "<Operator1>" as the condition operator
        Then  User enters "<Value1>" as the condition value
        Then  User adds another condition in the Advanced Filter
        Then  User selects "<Field2>" as the condition field for condition 2
        Then  User selects "<Operator2>" as the condition operator for condition 2
        Then  User enters "<Value2>" as the condition value for condition 2
        Then  User sets the group logic to "AND" at index 0
        Then  User starts capturing the club section team config advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club section team config advanced filter API response total count is greater than zero
        Then  User prints the club section team config advanced filter API response JSON
        Then  User verifies all club section team config advanced filter API records have "<Field1>" "<Operator1>" "<Value1>"
        Then  User verifies all club section team config advanced filter API records have "<Field2>" "<Operator2>" "<Value2>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | ClubName  | Field1            | Operator1 | Value1 | Field2 | Operator2        | Value2   |
            | AAAAPawan | Division Category | Contains  | Team   | Status | Does not contain | Inactive |

    # =============================================================
    # OR CONDITION
    # =============================================================

    @clubSectionTeamConfigAdvancedFilterORConditionTest
    Scenario Outline: Verify user can apply two conditions with OR logic on Team Configuration - <Field1> or <Field2>
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the Sections tab on club detail page
        Then  User clicks the first section record in the sections grid
        Then  User navigates to the Team Configuration tab on section detail page
        Then  User opens the Team Configuration filter in club section page
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field1>" as the condition field
        Then  User selects "<Operator1>" as the condition operator
        Then  User enters "<Value1>" as the condition value
        Then  User adds another condition in the Advanced Filter
        Then  User selects "<Field2>" as the condition field for condition 2
        Then  User selects "<Operator2>" as the condition operator for condition 2
        Then  User enters "<Value2>" as the condition value for condition 2
        Then  User sets the group logic to "OR" at index 0
        Then  User starts capturing the club section team config advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club section team config advanced filter API response total count is greater than zero
        Then  User prints the club section team config advanced filter API response JSON
        Then  User verifies all club section team config advanced filter API records satisfy "<Field1>" "<Operator1>" "<Value1>" or "<Field2>" "<Operator2>" "<Value2>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | ClubName  | Field1 | Operator1 | Value1 | Field2 | Operator2 | Value2   |
            | AAAAPawan | Status | Contains  | Active | Status | Contains  | Inactive |

    # =============================================================
    # IN OPERATOR
    # =============================================================

    @clubSectionTeamConfigAdvancedFilterInOperatorTest
    Scenario Outline: Verify user can apply In operator on Team Configuration using <Field> In "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the Sections tab on club detail page
        Then  User clicks the first section record in the sections grid
        Then  User navigates to the Team Configuration tab on section detail page
        Then  User opens the Team Configuration filter in club section page
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "In" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the club section team config advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club section team config advanced filter API response total count is greater than zero
        Then  User prints the club section team config advanced filter API response JSON
        Then  User verifies all club section team config advanced filter API records have "<Field>" "In" "<Value>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | ClubName  | Field  | Value           |
            | AAAAPawan | Status | Active,Inactive |

    # =============================================================
    # NOT IN OPERATOR
    # =============================================================

    @clubSectionTeamConfigAdvancedFilterNotInOperatorTest
    Scenario Outline: Verify user can apply Not in operator on Team Configuration using <Field> Not in "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the Sections tab on club detail page
        Then  User clicks the first section record in the sections grid
        Then  User navigates to the Team Configuration tab on section detail page
        Then  User opens the Team Configuration filter in club section page
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "Not in" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the club section team config advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club section team config advanced filter API response total count is greater than zero
        Then  User prints the club section team config advanced filter API response JSON
        Then  User verifies all club section team config advanced filter API records have "<Field>" "Not in" "<Value>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | ClubName  | Field  | Value    |
            | AAAAPawan | Status | Inactive |

    # =============================================================
    # EQUAL / NOT EQUAL OPERATOR
    # =============================================================

    @clubSectionTeamConfigAdvancedFilterEqualOperatorTest
    Scenario Outline: Verify user can apply Equal/Not equal operator on Team Configuration using <Field> <Operator> "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the Sections tab on club detail page
        Then  User clicks the first section record in the sections grid
        Then  User navigates to the Team Configuration tab on section detail page
        Then  User opens the Team Configuration filter in club section page
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the club section team config advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club section team config advanced filter API response total count is greater than zero
        Then  User prints the club section team config advanced filter API response JSON
        Then  User verifies all club section team config advanced filter API records have "<Field>" "<Operator>" "<Value>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | ClubName  | Field  | Operator  | Value    |
            | AAAAPawan | Status | Equal     | Active   |
            | AAAAPawan | Status | Not equal | Inactive |

    # =============================================================
    # COMBINED (Contains AND Not in)
    # =============================================================

    @clubSectionTeamConfigAdvancedFilterCombinedNotInTest
    Scenario Outline: Verify user can combine Contains and Not in conditions with AND logic on Team Configuration
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the Sections tab on club detail page
        Then  User clicks the first section record in the sections grid
        Then  User navigates to the Team Configuration tab on section detail page
        Then  User opens the Team Configuration filter in club section page
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field1>" as the condition field for condition 1
        Then  User selects "<Operator1>" as the condition operator for condition 1
        Then  User enters "<Value1>" as the condition value for condition 1
        Then  User adds another condition in the Advanced Filter
        Then  User selects "<Field2>" as the condition field for condition 2
        Then  User selects "Not in" as the condition operator for condition 2
        Then  User enters "<Value2>" as the condition value for condition 2
        Then  User sets the group logic to "AND" at index 0
        Then  User starts capturing the club section team config advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club section team config advanced filter API response total count is greater than zero
        Then  User prints the club section team config advanced filter API response JSON
        Then  User verifies all club section team config advanced filter API records satisfy "<Field1>" "<Operator1>" "<Value1>" and "<Field2>" "Not in" "<Value2>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | ClubName  | Field1            | Operator1 | Value1 | Field2 | Value2   |
            | AAAAPawan | Division Category | Contains  | Team   | Status | Inactive |
