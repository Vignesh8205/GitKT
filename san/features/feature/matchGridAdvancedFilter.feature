@smoke @regression @matchGridAdvancedFilter @advanceFilter
Feature: Match Grid Advanced Filter Functionality
    As a user
    I want to filter the Match Grid using advanced filter criteria
    So that I can find specific match grid templates using complex conditions

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
    # ADVANCED FILTER – SINGLE CONDITION OPERATORS
    # =========================================================

    @matchGridAdvancedFilterSingleConditionTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> <Operator> "<Value>"
        # Navigate to Match Grid
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Match Grid tab

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and validate API
        Then  User starts capturing the match grid list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the match grid API response total count is greater than zero
        Then  User prints the match grid API response JSON
        Then  User verifies all match grid API records have "<Field>" "<Operator>" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field         | Operator            | Value    |
            | Template Name | Contains            | Reg      |
            | Status        | Does not contain    | Active   |
            | Template Name | Starts with         | reg      |
            | Status        | Does not start with | Inactive |

    # =========================================================
    # ADVANCED FILTER – AND OPERATORS
    # =========================================================

    @matchGridAdvancedFilterANDConditionTest
    Scenario Outline: Verify user can apply two conditions with AND logic - <Field1> and <Field2>
        # Navigate to Match Grid
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Match Grid tab

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
        Then  User starts capturing the match grid list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the match grid API response total count is greater than zero
        Then  User prints the match grid API response JSON
        Then  User verifies all match grid API records have "<Field1>" "<Operator1>" "<Value1>"
        Then  User verifies all match grid API records have "<Field2>" "<Operator2>" "<Value2>"



        Examples:
            | Field1        | Operator1 | Value1 | Field2 | Operator2        | Value2   |
            | Template Name | Contains  | Reg    | Status | Does not contain | Inactive |

    # =========================================================
    # ADVANCED FILTER – OR OPERATORS
    # =========================================================

    @matchGridAdvancedFilterORConditionTest
    Scenario Outline: Verify user can apply two conditions with OR logic - <Field1> or <Field2>
        # Navigate to Match Grid
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Match Grid tab

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
        Then  User starts capturing the match grid list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the match grid API response total count is greater than zero
        Then  User prints the match grid API response JSON
        Then  User verifies all match grid API records satisfy "<Field1>" "<Operator1>" "<Value1>" or "<Field2>" "<Operator2>" "<Value2>"

        Examples:
            | Field1        | Operator1 | Value1 | Field2 | Operator2 | Value2   |
            | Template Name | Contains  | Reg    | Status | Equal     | Inactive |

    # =========================================================
    # ADVANCED FILTER – IN OPERATOR
    # =========================================================

    @matchGridAdvancedFilterInOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> In "<Value>"
        # Navigate to Match Grid
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Match Grid tab

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition with In operator
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "In" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and validate API
        Then  User starts capturing the match grid list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the match grid API response total count is greater than zero
        Then  User prints the match grid API response JSON
        Then  User verifies all match grid API records have "<Field>" "In" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Value           |
            | Status | Active          |

    # =========================================================
    # ADVANCED FILTER – NOT IN OPERATOR
    # =========================================================

    @matchGridAdvancedFilterNotInOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> Not in "<Value>"
        # Navigate to Match Grid
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Match Grid tab

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition with Not in operator
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "Not in" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and validate API
        Then  User starts capturing the match grid list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the match grid API response total count is greater than zero
        Then  User prints the match grid API response JSON
        Then  User verifies all match grid API records have "<Field>" "Not in" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Value    |
            | Status | Inactive |

    # =========================================================
    # ADVANCED FILTER – EQUAL / NOT EQUAL OPERATORS
    # =========================================================

    @matchGridAdvancedFilterEqualOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> <Operator> "<Value>"
        # Navigate to Match Grid
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Match Grid tab

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and validate API
        Then  User starts capturing the match grid list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the match grid API response total count is greater than zero
        Then  User prints the match grid API response JSON
        Then  User verifies all match grid API records have "<Field>" "<Operator>" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field         | Operator   | Value        |
            | Template Name | Equal      | RegMatch26   |
            | Status        | Not equal  | Active       |

    # =========================================================
    # ADVANCED FILTER – COMPARISON OPERATORS (GT / LT)
    # =========================================================

    @matchGridAdvancedFilterComparisonOperatorTest
    Scenario Outline: Verify user can apply a comparison condition filter using <Field> <Operator> "<Value>"
        # Navigate to Match Grid
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Match Grid tab

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and validate API
        Then  User starts capturing the match grid list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the match grid API response total count is greater than zero
        Then  User prints the match grid API response JSON
        Then  User verifies all match grid API records have "<Field>" "<Operator>" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field       | Operator              | Value |
            | Total Teams | Greater than          | 2     |
            | Total Teams | Greater than or equal | 4     |
            | Total Teams | Less than             | 6     |
            | Total Teams | Less than or equal    | 6     |

    # =========================================================
    # ADVANCED FILTER – BETWEEN / NOT BETWEEN OPERATORS
    # =========================================================

    @matchGridAdvancedFilterBetweenOperatorTest
    Scenario Outline: Verify user can apply a <Operator> condition filter on <Field> between "<FromValue>" and "<ToValue>"
        # Navigate to Match Grid
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Match Grid tab

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition with range values
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters between values "<FromValue>" and "<ToValue>" as the condition value

        # Apply filter and validate API
        Then  User starts capturing the match grid list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the match grid API response total count is greater than zero
        Then  User prints the match grid API response JSON
        Then  User verifies all match grid API records have "<Field>" "<Operator>" values "<FromValue>" and "<ToValue>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field          | Operator    | FromValue | ToValue |
            | Total Teams    | Between     | 4         | 16      |
            | Total Teams    | Not between | 8         | 20      |
            | Match Day Count| Between     | 1         | 5       |
            | Match Day Count| Not between | 2         | 4       |