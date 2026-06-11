@smoke @regression @divisionAdvancedFilter @advanceFilter
Feature: Division Advanced Filter Functionality
    As a user
    I want to filter the Division grid using advanced filter criteria
    So that I can find specific divisions using complex conditions

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

    @divisionAdvancedFilterSingleConditionTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> <Operator> "<Value>"
        # Navigate to Division
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division category tab
        Then  User verifies the division page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the division list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the division API response total count is greater than zero
        Then  User prints the division API response JSON
        Then  User verifies all division API records have "<Field>" "<Operator>" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples: 
            | Field            | Operator    | Value    |
            | Division Code    | Contains    | Match    |
            | Division Name    | Starts with | Match    |
            | Status           | Equal       | Active   |

    # =========================================================
    # ADVANCED FILTER – AND OPERATORS
    # =========================================================

    @divisionAdvancedFilterANDConditionTest
    Scenario Outline: Verify user can apply two conditions with AND logic - <Field1> and <Field2>
        # Navigate to Division
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division category tab
        Then  User verifies the division page title

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
        Then  User starts capturing the division list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the division API response total count is greater than zero
        Then  User prints the division API response JSON
        Then  User verifies all division API records have "<Field1>" "<Operator1>" "<Value1>"
        Then  User verifies all division API records have "<Field2>" "<Operator2>" "<Value2>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1        | Operator1 | Value1 | Field2 | Operator2        | Value2 |
            | Division Name | Contains  | Match  | Status | Does not contain | Inactive |

    # =========================================================
    # ADVANCED FILTER – OR OPERATORS
    # =========================================================

    @divisionAdvancedFilterORConditionTest
    Scenario Outline: Verify user can apply two conditions with OR logic - <Field1> or <Field2>
        # Navigate to Division
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division category tab
        Then  User verifies the division page title

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
        Then  User starts capturing the division list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the division API response total count is greater than zero
        Then  User prints the division API response JSON

        # Navigate to first record and validate eligibility criteria
        Then  User starts capturing the division eligibility criteria API response
        Then  User clicks the first division record in the filtered grid
        Then  User awaits the division eligibility criteria API response
        Then  User prints the division eligibility criteria API response JSON
        Then  User verifies the division eligibility criteria satisfies "<Field1>" "<Operator1>" "<Value1>" or "<Field2>" "<Operator2>" "<Value2>"

        # Navigate back to list before reset (OR scenario navigated to a detail record)
        Then  User navigates back to Division list

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1            | Operator1 | Value1    | Field2 | Operator2 | Value2 |
            | Division Category | Contains  | Under 199 | Status | In        | Active |

    # =========================================================
    # ADVANCED FILTER – IN OPERATOR
    # =========================================================

    @divisionAdvancedFilterInOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> In "<Value>"
        # Navigate to Division
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division category tab
        Then  User verifies the division page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition with In operator
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "In" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the division list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the division API response total count is greater than zero
        Then  User prints the division API response JSON
        Then  User verifies all division API records have "<Field>" "In" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Value           |
            | Status | Active,Inactive |

    # =========================================================
    # ADVANCED FILTER – NOT IN OPERATOR
    # =========================================================

    @divisionAdvancedFilterNotInOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> Not in "<Value>"
        # Navigate to Division
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division category tab
        Then  User verifies the division page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition with Not in operator
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "Not in" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the division list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the division API response total count is greater than zero
        Then  User prints the division API response JSON
        Then  User verifies all division API records have "<Field>" "Not in" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Value   |
            | Region | Region1 |

    # =========================================================
    # ADVANCED FILTER – EQUAL / NOT EQUAL OPERATORS
    # =========================================================

    @divisionAdvancedFilterEqualOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> <Operator> "<Value>"
        # Navigate to Division
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division category tab
        Then  User verifies the division page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the division list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the division API response total count is greater than zero
        Then  User prints the division API response JSON
        Then  User verifies all division API records have "<Field>" "<Operator>" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field         | Operator  | Value          |
            | Division Code | Equal     | MatchDiv0508   |
            | Division Code | Not equal | MatchDiv0508   |

    # =========================================================
    # ADVANCED FILTER – COMBINED: Contains AND Not in
    # =========================================================

    @divisionAdvancedFilterCombinedNotInTest
    Scenario Outline: Verify user can combine Contains and Not in conditions with AND logic
        # Navigate to Division
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division category tab
        Then  User verifies the division page title

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
        Then  User starts capturing the division list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the division API response total count is greater than zero
        Then  User prints the division API response JSON
        Then  User verifies all division API records satisfy "<Field1>" "<Operator1>" "<Value1>" and "<Field2>" "Not in" "<Value2>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1        | Operator1 | Value1   | Field2 | Value2   |
            | Division Name | Contains  | Match    | Status | Inactive |

    # =========================================================
    # ADVANCED FILTER – BETWEEN / NOT BETWEEN OPERATORS
    # =========================================================

    @divisionAdvancedFilterBetweenOperatorTest
    Scenario Outline: Verify user can apply a <Operator> condition filter on <Field> between "<FromValue>" and "<ToValue>"
        # Navigate to Division
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User select the Division category tab
        Then  User verifies the division page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition with range values
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters between values "<FromValue>" and "<ToValue>" as the condition value

        # Apply filter and capture list API
        Then  User starts capturing the division list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the division API response total count is greater than zero
        Then  User prints the division API response JSON

        # Navigate to first filtered record and validate eligibility criteria
        Then  User starts capturing the division eligibility criteria API response
        Then  User clicks the first division record in the filtered grid
        Then  User awaits the division eligibility criteria API response
        Then  User prints the division eligibility criteria API response JSON
        Then  User verifies the division eligibility criteria "<Field>" "<Operator>" between "<FromValue>" and "<ToValue>"

        Examples:
            | Field   | Operator    | FromValue | ToValue |
            | Max Age | Between     | 5         | 20      |
            | Min Age | Between     | 1         | 10      |
            | Max Age | Not between | 25        | 50      |
            | Min Age | Not between | 15        | 30      |
