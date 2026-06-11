@smoke @regression @organizationAdvancedFilter @advanceFilter
Feature: Organization Advanced Filter Functionality
    As a user
    I want to filter the Organization grid using advanced filter criteria
    So that I can find specific organizations using complex conditions

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

    @organizationAdvancedFilterSingleConditionTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> <Operator> "<Value>"
        # Navigate to Federation Management > Organization
        Then  User Can able to access the Main menu in home page
        Then  User choose the Federation Management option
        Then  User clicks the Organization tab
        Then  User clicks the Home tab in Organization
        Then  User verifies the Organization page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the organization advanced filter list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the organization advanced filter API response total count is greater than zero
        Then  User prints the organization advanced filter API response JSON
        Then  User verifies all organization advanced filter API records have "<Field>" "<Operator>" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field             | Operator            | Value |
            | Organization Name | Contains            | Org   |
            | Organization Code | Starts with         | Org   |
            | Status            | Does not start with | Active|

    # =========================================================
    # ADVANCED FILTER – AND OPERATORS
    # =========================================================

    @organizationAdvancedFilterANDConditionTest
    Scenario Outline: Verify user can apply two conditions with AND logic - <Field1> and <Field2>
        # Navigate to Federation Management > Organization
        Then  User Can able to access the Main menu in home page
        Then  User choose the Federation Management option
        Then  User clicks the Organization tab
        Then  User clicks the Home tab in Organization
        Then  User verifies the Organization page title

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
        Then  User starts capturing the organization advanced filter list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the organization advanced filter API response total count is greater than zero
        Then  User prints the organization advanced filter API response JSON
        Then  User verifies all organization advanced filter API records have "<Field1>" "<Operator1>" "<Value1>"
        Then  User verifies all organization advanced filter API records have "<Field2>" "<Operator2>" "<Value2>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1            | Operator1 | Value1 | Field2 | Operator2        | Value2   |
            | Organization Name | Contains  | Org    | Status | Does not contain | Inactive |

    # =========================================================
    # ADVANCED FILTER – OR OPERATORS
    # =========================================================

    @organizationAdvancedFilterORConditionTest
    Scenario Outline: Verify user can apply two conditions with OR logic - <Field1> or <Field2>
        # Navigate to Federation Management > Organization
        Then  User Can able to access the Main menu in home page
        Then  User choose the Federation Management option
        Then  User clicks the Organization tab
        Then  User clicks the Home tab in Organization
        Then  User verifies the Organization page title

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
        Then  User starts capturing the organization advanced filter list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the organization advanced filter API response total count is greater than zero
        Then  User prints the organization advanced filter API response JSON
        Then  User verifies all organization advanced filter API records satisfy "<Field1>" "<Operator1>" "<Value1>" or "<Field2>" "<Operator2>" "<Value2>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1            | Operator1 | Value1 | Field2    | Operator2   | Value2 |
            | Organization Name | Contains  | Org    | Federation| Starts with | RBFA   |

    # =========================================================
    # ADVANCED FILTER – IN OPERATOR
    # =========================================================

    @organizationAdvancedFilterInOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> In "<Value>"
        # Navigate to Federation Management > Organization
        Then  User Can able to access the Main menu in home page
        Then  User choose the Federation Management option
        Then  User clicks the Organization tab
        Then  User clicks the Home tab in Organization
        Then  User verifies the Organization page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition with In operator
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "In" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the organization advanced filter list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the organization advanced filter API response total count is greater than zero
        Then  User prints the organization advanced filter API response JSON
        Then  User verifies all organization advanced filter API records have "<Field>" "In" "<Value>"

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

    @organizationAdvancedFilterNotInOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> Not in "<Value>"
        # Navigate to Federation Management > Organization
        Then  User Can able to access the Main menu in home page
        Then  User choose the Federation Management option
        Then  User clicks the Organization tab
        Then  User clicks the Home tab in Organization
        Then  User verifies the Organization page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition with Not in operator
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "Not in" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the organization advanced filter list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the organization advanced filter API response total count is greater than zero
        Then  User prints the organization advanced filter API response JSON
        Then  User verifies all organization advanced filter API records have "<Field>" "Not in" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Value    |
            | Status | Active   |

    # =========================================================
    # ADVANCED FILTER – EQUAL / NOT EQUAL OPERATORS
    # =========================================================

    @organizationAdvancedFilterEqualOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> <Operator> "<Value>"
        # Navigate to Federation Management > Organization
        Then  User Can able to access the Main menu in home page
        Then  User choose the Federation Management option
        Then  User clicks the Organization tab
        Then  User clicks the Home tab in Organization
        Then  User verifies the Organization page title

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the organization advanced filter list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the organization advanced filter API response total count is greater than zero
        Then  User prints the organization advanced filter API response JSON
        Then  User verifies all organization advanced filter API records have "<Field>" "<Operator>" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field             | Operator  | Value    |
            | Organization Code | Equal     | regOrg24 |
            | Organization Code | Not equal | regOrg24 |

    # =========================================================
    # ADVANCED FILTER – COMBINED: Contains AND Not in
    # =========================================================

    @organizationAdvancedFilterCombinedNotInTest
    Scenario Outline: Verify user can combine Contains and Not in conditions with AND logic
        # Navigate to Federation Management > Organization
        Then  User Can able to access the Main menu in home page
        Then  User choose the Federation Management option
        Then  User clicks the Organization tab
        Then  User clicks the Home tab in Organization
        Then  User verifies the Organization page title

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
        Then  User starts capturing the organization advanced filter list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the organization advanced filter API response total count is greater than zero
        Then  User prints the organization advanced filter API response JSON
        Then  User verifies all organization advanced filter API records satisfy "<Field1>" "<Operator1>" "<Value1>" and "<Field2>" "Not in" "<Value2>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1            | Operator1 | Value1 | Field2 | Value2   |
            | Organization Code | Contains  | Org    | Status | Inactive |