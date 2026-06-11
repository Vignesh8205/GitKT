@smoke @regression @competitionManagementAdvancedFilter @advanceFilter
Feature: Competition Management Advanced Filter Functionality
    As a user
    I want to filter the Competition Management grid using advanced filter criteria
    So that I can find specific competitions using complex conditions

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
    # ADVANCED FILTER – Single CONDITION OPERATORS
    # =========================================================

    @competitionManagementAdvancedFilterSingleConditionTest 
    Scenario Outline: Verify user can apply a single condition filter using <Field> <Operator> "<Value>"
        # Navigate to Competition Management
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User verifies the competition management page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the competition management list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the competition management API response total count is greater than zero
        Then  User prints the competition management API response JSON
        Then  User verifies all competition management API records have "<Field>" "<Operator>" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field              | Operator            | Value |
            | Competition Name   | Contains            | Comp  |
            | Competition Name   | Starts with         | Reg   |
            | Status             | Does not start with | Active|

    # =========================================================
    # ADVANCED FILTER – AND OPERATORS
    # =========================================================

    @competitionManagementAdvancedFilterANDConditionTest
    Scenario Outline: Verify user can apply two conditions with AND logic - <Field1> and <Field2>
        # Navigate to Competition Management
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User verifies the competition management page title

        # Open filter dialog and switch to Advanced Filter
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add first condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field1>" as the condition field
        Then  User selects "<Operator1>" as the condition operator
        Then  User enters "<Value1>" as the condition value

        # Add second condition
        Then  User adds another condition in the Advanced Filter
        Then  User selects "<Field2>" as the condition field for condition 2
        Then  User selects "<Operator2>" as the condition operator for condition 2
        Then  User enters "<Value2>" as the condition value for condition 2

        # Set AND logic and apply
        Then  User sets the group logic to "AND" at index 0
        Then  User starts capturing the competition management list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the competition management API response total count is greater than zero
        Then  User prints the competition management API response JSON
        Then  User verifies all competition management API records have "<Field1>" "<Operator1>" "<Value1>"
        Then  User verifies all competition management API records have "<Field2>" "<Operator2>" "<Value2>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1             | Operator1 | Value1 | Field2 | Operator2         | Value2 |
            | Competition Name   | Contains  | Reg    | Status | Does not contain  | Active |

    # =========================================================
    # ADVANCED FILTER – OR OPERATORS
    # =========================================================

    @competitionManagementAdvancedFilterORConditionTest
    Scenario Outline: Verify user can apply two conditions with OR logic - <Field1> or <Field2>
        # Navigate to Competition Management
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User verifies the competition management page title

        # Open filter dialog and switch to Advanced Filter
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add first condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field1>" as the condition field
        Then  User selects "<Operator1>" as the condition operator
        Then  User enters "<Value1>" as the condition value

        # Add second condition
        Then  User adds another condition in the Advanced Filter
        Then  User selects "<Field2>" as the condition field for condition 2
        Then  User selects "<Operator2>" as the condition operator for condition 2
        Then  User enters "<Value2>" as the condition value for condition 2

        # Set OR logic and apply
        Then  User sets the group logic to "OR" at index 0
        Then  User starts capturing the competition management list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the competition management API response total count is greater than zero
        Then  User prints the competition management API response JSON
        Then  User verifies all competition management API records satisfy "<Field1>" "<Operator1>" "<Value1>" or "<Field2>" "<Operator2>" "<Value2>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1             | Operator1 | Value1      | Field2            | Operator2   | Value2 |
            | Format             | Equal     | Football    | Division Category | Starts with | Reg    |

    # =========================================================
    # ADVANCED FILTER – IN OPERATOR
    # =========================================================

    @competitionManagementAdvancedFilterInOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> In "<Value>"
        # Navigate to Competition Management
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User verifies the competition management page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition with In operator
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "In" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the competition management list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the competition management API response total count is greater than zero
        Then  User prints the competition management API response JSON
        Then  User verifies all competition management API records have "<Field>" "In" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field    | Value              |
            | Status   | Active,Inactive    |

    # =========================================================
    # ADVANCED FILTER – NOT IN OPERATOR
    # =========================================================

    @competitionManagementAdvancedFilterNotInOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> Not in "<Value>"
        # Navigate to Competition Management
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User verifies the competition management page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition with Not in operator
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "Not in" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the competition management list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the competition management API response total count is greater than zero
        Then  User prints the competition management API response JSON
        Then  User verifies all competition management API records have "<Field>" "Not in" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Value    |
            | Status | Inactive |

    # =========================================================
    # ADVANCED FILTER – COMBINED: Contains AND Not in
    # =========================================================

    @competitionManagementAdvancedFilterCombinedNotInTest
    Scenario Outline: Verify user can combine Contains and Not in conditions with AND logic
        # Navigate to Competition Management
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User verifies the competition management page title

        # Open filter dialog and switch to Advanced Filter
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add first condition: Contains
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field1>" as the condition field for condition 1
        Then  User selects "<Operator1>" as the condition operator for condition 1
        Then  User enters "<Value1>" as the condition value for condition 1

        # Add second condition: Not in
        Then  User adds another condition in the Advanced Filter
        Then  User selects "<Field2>" as the condition field for condition 2
        Then  User selects "Not in" as the condition operator for condition 2
        Then  User enters "<Value2>" as the condition value for condition 2

        # Set AND logic and apply
        Then  User sets the group logic to "AND" at index 0
        Then  User starts capturing the competition management list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the competition management API response total count is greater than zero
        Then  User prints the competition management API response JSON
        Then  User verifies all competition management API records satisfy "<Field1>" "<Operator1>" "<Value1>" and "<Field2>" "Not in" "<Value2>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1            | Operator1 | Value1 | Field2 | Value2   |
            | Competition Name  | Contains  | Reg    | Status | Inactive |

    # =========================================================
    # ADVANCED FILTER – EQUAL / NOT EQUAL OPERATORS
    # =========================================================

    @competitionManagementAdvancedFilterEqualOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> <Operator> "<Value>"
        # Navigate to Competition Management
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User verifies the competition management page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the competition management list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the competition management API response total count is greater than zero
        Then  User prints the competition management API response JSON
        Then  User verifies all competition management API records have "<Field>" "<Operator>" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field    | Operator  | Value  |
            | Status   | Equal     | Active |
            | Status   | Not equal | Active |

    # =========================================================
    # ADVANCED FILTER – GREATER THAN / LESS THAN OPERATORS
    # =========================================================

    @competitionManagementAdvancedFilterComparisonOperatorTest
    Scenario Outline: Verify user can apply a comparison condition filter using <Field> <Operator> "<Value>"
        # Navigate to Competition Management
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User verifies the competition management page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify list API count
        Then  User starts capturing the competition management list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the competition management API response total count is greater than zero
        Then  User prints the competition management API response JSON

        # Navigate to first filtered record → Season Information tab → validate eligibility criteria
        Then  User starts capturing the competition eligibility criteria API response
        Then  User clicks the first competition record in the filtered grid
        Then  User navigates to the "Season Information" tab on the competition detail page
        Then  User awaits the competition eligibility criteria API response
        Then  User prints the competition eligibility criteria API response JSON
        Then  User verifies the eligibility criteria maximum age "<Operator>" "<Value>"

        Examples:
            | Field       | Operator              | Value |
            | Maximum Age | Greater than          | 2     |
            | Maximum Age | Greater than or equal | 3     |
            | Maximum Age | Less than             | 10    |
            | Maximum Age | Less than or equal    | 10    |

    # =========================================================
    # ADVANCED FILTER – BETWEEN / NOT BETWEEN OPERATORS
    # =========================================================

    @competitionManagementAdvancedFilterBetweenOperatorTest
    Scenario Outline: Verify user can apply a <Operator> condition filter on <Field> between "<FromValue>" and "<ToValue>"
        # Navigate to Competition Management
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User verifies the competition management page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition with range values
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters between values "<FromValue>" and "<ToValue>" as the condition value

        # Apply filter and verify list API count
        Then  User starts capturing the competition management list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the competition management API response total count is greater than zero
        Then  User prints the competition management API response JSON

        # Navigate to first filtered record → Season Information tab → validate eligibility criteria
        Then  User starts capturing the competition eligibility criteria API response
        Then  User clicks the first competition record in the filtered grid
        Then  User navigates to the "Season Information" tab on the competition detail page
        Then  User awaits the competition eligibility criteria API response
        Then  User prints the competition eligibility criteria API response JSON
        Then  User verifies the eligibility criteria maximum age "<Operator>" between "<FromValue>" and "<ToValue>"

        Examples:
            | Field       | Operator    | FromValue | ToValue |
            | Maximum Age | Between     | 5         | 30      |
            | Maximum Age | Not between | 50        | 100     |
