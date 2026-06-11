@smoke @regression @divisionCategoryAdvancedFilter @advanceFilter
Feature: Division Category Advanced Filter Functionality
    As a user
    I want to filter the Division Category grid using advanced filter criteria
    So that I can find specific division categories using complex conditions

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

    @divisionCategoryAdvancedFilterSingleConditionTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> <Operator> "<Value>"
        # Navigate to Division Category
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division Category menu
        Then  User verifies the division category page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open Division Category advanced filter

        # Add one condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the Division Category advanced filter list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the Division Category advanced filter API total count is greater than zero
        Then  User prints the Division Category advanced filter API response JSON
        Then  User verifies all division category API records have "<Field>" "<Operator>" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open Division Category advanced filter
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field                    | Operator    | Value       |
            | Division Category Code   | Contains    | Match       |
            | Division Category Name   | Starts with | Match       |
            | Status                   | Equal       | Active      |

    # =========================================================
    # ADVANCED FILTER – AND OPERATORS
    # =========================================================

    @divisionCategoryAdvancedFilterANDConditionTest
    Scenario Outline: Verify user can apply two conditions with AND logic - <Field1> and <Field2>
        # Navigate to Division Category
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division Category menu
        Then  User verifies the division category page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open Division Category advanced filter

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
        Then  User starts capturing the Division Category advanced filter list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the Division Category advanced filter API total count is greater than zero
        Then  User prints the Division Category advanced filter API response JSON
        Then  User verifies all division category API records have "<Field1>" "<Operator1>" "<Value1>"
        Then  User verifies all division category API records have "<Field2>" "<Operator2>" "<Value2>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open Division Category advanced filter
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1                   | Operator1 | Value1 | Field2 | Operator2        | Value2   |
            | Division Category Name   | Contains  | Match  | Status | Does not contain | Inactive |

    # =========================================================
    # ADVANCED FILTER – OR OPERATORS
    # =========================================================

    @divisionCategoryAdvancedFilterORConditionTest
    Scenario Outline: Verify user can apply two conditions with OR logic - <Field1> or <Field2>
        # Navigate to Division Category
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division Category menu
        Then  User verifies the division category page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open Division Category advanced filter

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
        Then  User starts capturing the Division Category advanced filter list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the Division Category advanced filter API total count is greater than zero
        Then  User prints the Division Category advanced filter API response JSON
        Then  User verifies all division category API records satisfy "<Field1>" "<Operator1>" "<Value1>" or "<Field2>" "<Operator2>" "<Value2>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open Division Category advanced filter
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1                   | Operator1 | Value1 | Field2 | Operator2 | Value2 |
            | Division Category Name   | Contains  | Match  | Status | In        | Active |

    # =========================================================
    # ADVANCED FILTER – IN OPERATOR
    # =========================================================

    @divisionCategoryAdvancedFilterInOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> In "<Value>"
        # Navigate to Division Category
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division Category menu
        Then  User verifies the division category page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open Division Category advanced filter

        # Add one condition with In operator
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "In" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the Division Category advanced filter list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the Division Category advanced filter API total count is greater than zero
        Then  User prints the Division Category advanced filter API response JSON
        Then  User verifies all division category API records have "<Field>" "In" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open Division Category advanced filter
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Value           |
            | Status | Active,Inactive |

    # =========================================================
    # ADVANCED FILTER – NOT IN OPERATOR
    # =========================================================

    @divisionCategoryAdvancedFilterNotInOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> Not in "<Value>"
        # Navigate to Division Category
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division Category menu
        Then  User verifies the division category page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open Division Category advanced filter

        # Add one condition with Not in operator
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "Not in" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the Division Category advanced filter list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the Division Category advanced filter API total count is greater than zero
        Then  User prints the Division Category advanced filter API response JSON
        Then  User verifies all division category API records have "<Field>" "Not in" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open Division Category advanced filter
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Value    |
            | Status | Inactive |

    # =========================================================
    # ADVANCED FILTER – EQUAL / NOT EQUAL OPERATORS
    # =========================================================

    @divisionCategoryAdvancedFilterEqualOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> <Operator> "<Value>"
        # Navigate to Division Category
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division Category menu
        Then  User verifies the division category page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open Division Category advanced filter

        # Add one condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the Division Category advanced filter list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the Division Category advanced filter API total count is greater than zero
        Then  User prints the Division Category advanced filter API response JSON
        Then  User verifies all division category API records have "<Field>" "<Operator>" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open Division Category advanced filter
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field                  | Operator  | Value       |
            | Division Category Code | Equal     | MatchDivcat |
            | Division Category Code | Not equal | MatchDivcat |

    # =========================================================
    # ADVANCED FILTER – COMBINED: Contains AND Not in
    # =========================================================

    @divisionCategoryAdvancedFilterCombinedNotInTest
    Scenario Outline: Verify user can combine Contains and Not in conditions with AND logic
        # Navigate to Division Category
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division Category menu
        Then  User verifies the division category page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open Division Category advanced filter

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
        Then  User starts capturing the Division Category advanced filter list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the Division Category advanced filter API total count is greater than zero
        Then  User prints the Division Category advanced filter API response JSON
        Then  User verifies all division category API records satisfy "<Field1>" "<Operator1>" "<Value1>" and "<Field2>" "Not in" "<Value2>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open Division Category advanced filter
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1                   | Operator1 | Value1 | Field2 | Value2   |
            | Division Category Name   | Contains  | Match  | Status | Inactive |
