@smoke @regression @clubPersonFunctionAdvancedFilter @advanceFilter
Feature: Club Management - Person Function(s) Tab Advanced Filter Functionality
    As a user
    I want to filter person function records on a club detail page using advanced filter
    So that I can find specific person function records using complex conditions

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

    @clubPFAdvancedFilterSingleConditionTest
    Scenario Outline: Verify user can apply a single condition advanced filter on Club Person Function using <Field> <Operator> "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the "Person Function(s)" tab on club detail page
        Then  User opens the person function filter in club page
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the club page person function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club page person function advanced filter API response total count is greater than zero
        Then  User prints the club page person function advanced filter API response JSON
        Then  User verifies all club page person function advanced filter API records have "<Field>" "<Operator>" "<Value>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | ClubName  | Field            | Operator            | Value     |
            | AAAAPawan | Status           | Contains            | Active    |
            | AAAAPawan | Status           | Does not start with | Active    |
            | AAAAPawan | Status           | Does not contain    | Inactive  |
            | AAAAPawan | Club Function    | Contains            | Admin     |
            | AAAAPawan | Section Function | Contains            | Secretary |
            | AAAAPawan | Level            | Contains            | Club      |
            | AAAAPawan | Level            | Equal               | Team      |

    # =============================================================
    # AND CONDITION
    # =============================================================

    @clubPFAdvancedFilterANDConditionTest
    Scenario Outline: Verify user can apply two conditions with AND logic on Club Person Function - <Field1> and <Field2>
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the "Person Function(s)" tab on club detail page
        Then  User opens the person function filter in club page
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
        Then  User starts capturing the club page person function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club page person function advanced filter API response total count is greater than zero
        Then  User prints the club page person function advanced filter API response JSON
        Then  User verifies all club page person function advanced filter API records have "<Field1>" "<Operator1>" "<Value1>"
        Then  User verifies all club page person function advanced filter API records have "<Field2>" "<Operator2>" "<Value2>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | ClubName  | Field1        | Operator1 | Value1 | Field2 | Operator2        | Value2   |
            | AAAAPawan | Club Function | Contains  | Admin  | Status | Does not contain | Inactive |
            | AAAAPawan | Level         | Equal     | Team   | Status | Contains         | Active   |

    # =============================================================
    # OR CONDITION
    # =============================================================

    @clubPFAdvancedFilterORConditionTest
    Scenario Outline: Verify user can apply two conditions with OR logic on Club Person Function - <Field1> or <Field2>
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the "Person Function(s)" tab on club detail page
        Then  User opens the person function filter in club page
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
        Then  User starts capturing the club page person function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club page person function advanced filter API response total count is greater than zero
        Then  User prints the club page person function advanced filter API response JSON
        Then  User verifies all club page person function advanced filter API records satisfy "<Field1>" "<Operator1>" "<Value1>" or "<Field2>" "<Operator2>" "<Value2>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | ClubName  | Field1          | Operator1 | Value1      | Field2 | Operator2 | Value2  |
            | AAAAPawan |Section Function | Contains  | Secretary   | Status | Contains  | Active  |
            | AAAAPawan | Level           | Equal     | Team        | Status | Contains  | Active  |

    # =============================================================
    # IN OPERATOR
    # =============================================================

    @clubPFAdvancedFilterInOperatorTest
    Scenario Outline: Verify user can apply In operator on Club Person Function using <Field> In "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the "Person Function(s)" tab on club detail page
        Then  User opens the person function filter in club page
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "In" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the club page person function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club page person function advanced filter API response total count is greater than zero
        Then  User prints the club page person function advanced filter API response JSON
        Then  User verifies all club page person function advanced filter API records have "<Field>" "In" "<Value>"
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

    @clubPFAdvancedFilterNotInOperatorTest
    Scenario Outline: Verify user can apply Not in operator on Club Person Function using <Field> Not in "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the "Person Function(s)" tab on club detail page
        Then  User opens the person function filter in club page
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "Not in" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the club page person function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club page person function advanced filter API response total count is greater than zero
        Then  User prints the club page person function advanced filter API response JSON
        Then  User verifies all club page person function advanced filter API records have "<Field>" "Not in" "<Value>"
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

    @clubPFAdvancedFilterEqualOperatorTest
    Scenario Outline: Verify user can apply Equal/Not equal operator on Club Person Function using <Field> <Operator> "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the "Person Function(s)" tab on club detail page
        Then  User opens the person function filter in club page
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the club page person function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club page person function advanced filter API response total count is greater than zero
        Then  User prints the club page person function advanced filter API response JSON
        Then  User verifies all club page person function advanced filter API records have "<Field>" "<Operator>" "<Value>"
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

    @clubPFAdvancedFilterCombinedNotInTest
    Scenario Outline: Verify user can combine Contains and Not in conditions with AND logic on Club Person Function
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the "Person Function(s)" tab on club detail page
        Then  User opens the person function filter in club page
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
        Then  User starts capturing the club page person function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club page person function advanced filter API response total count is greater than zero
        Then  User prints the club page person function advanced filter API response JSON
        Then  User verifies all club page person function advanced filter API records satisfy "<Field1>" "<Operator1>" "<Value1>" and "<Field2>" "Not in" "<Value2>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | ClubName  | Field1        | Operator1 | Value1 | Field2 | Value2   |
            | AAAAPawan | Club Function | Contains  | Admin  | Status | Inactive |
            | AAAAPawan | Level         | Contains  | Club   | Status | Inactive |

    # =============================================================
    # BETWEEN / NOT BETWEEN (Date)
    # =============================================================

    @clubPFAdvancedFilterBetweenOperatorTest @Date 
    Scenario Outline: Verify user can apply a <Operator> date condition on Club Person Function between "<FromValue>" and "<ToValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  User searches the club record with "<ClubName>"
        Then  User clicks the matched club record
        Then  User navigates to the "Person Function(s)" tab on club detail page
        Then  User opens the person function filter in club page
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters between values "<FromValue>" and "<ToValue>" as the condition value
        Then  User starts capturing the club page person function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club page person function advanced filter API response total count is greater than zero
        Then  User prints the club page person function advanced filter API response JSON
        Then  User verifies all club page person function advanced filter API records have "<Field>" "<Operator>" values "<FromValue>" and "<ToValue>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | ClubName  | Field      | Operator    | FromValue  | ToValue    |
            | AAAAPawan | Start Date | Between     | 18/05/2026 | 19/05/2026 |
            | AAAAPawan | Start Date | Not between | 18/05/2026 | 19/05/2026 |
            | AAAAPawan | End Date   | Between     | 20/05/2026 | 23/05/2026 |
           # | AAAAPawan | End Date   | Not between | 20/05/2026 | 23/05/2026 |
