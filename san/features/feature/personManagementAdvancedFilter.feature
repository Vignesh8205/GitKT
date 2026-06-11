@smoke @regression @personManagementFilters @advancedFilter @advanceFilter
Feature: Person Management Advanced Filter Functionality
    As a user
    I want to be able to filter persons using the Advanced Filter (Query Builder)
    So that I can find persons using complex conditions with AND/OR logic


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


    @personManagementAdvancedFilterSingleConditionTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> <Operator> "<Value>"
        # Navigate to Person Management
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  verify the page title for "Person Management"

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the persons list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the API response total count is greater than zero
        Then  User prints the persons list API response JSON
        Then  User verifies all API response records have "<Field>" "<Operator>" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field       | Operator    | Value |
            | First Name  | Contains    | Alex  |
            | First Name  | Starts with | Mason |
            | First Name  | Contains    | gmail |

    # =========================================================
    # ADVANCED FILTER – AND  OPERATORS
    # =========================================================


    
    @personManagementAdvancedFilterANDConditionTest
    Scenario Outline: Verify user can apply two conditions with AND logic - <Field1> and <Field2>
        # Navigate to Person Management
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  verify the page title for "Person Management"

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
        Then  User starts capturing the persons list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the API response total count is greater than zero
        Then  User prints the persons list API response JSON
        Then  User verifies all API response records have "<Field1>" "<Operator1>" "<Value1>"
        Then  User verifies all API response records have "<Field2>" "<Operator2>" "<Value2>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1     | Operator1 | Value1 | Field2    | Operator2 | Value2 |
            | First Name | Contains  | Alex   | Last Name | Contains  | Mason  |

    # =========================================================
    # ADVANCED FILTER – OR OPERATORS
    # =========================================================

   
    @personManagementAdvancedFilterORConditionTest
    Scenario Outline: Verify user can apply two conditions with OR logic - <Field1> or <Field2>
        # Navigate to Person Management
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  verify the page title for "Person Management"

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
        Then  User starts capturing the persons list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the API response total count is greater than zero
        Then  User prints the persons list API response JSON
        Then  User verifies all API response records satisfy "<Field1>" "<Operator1>" "<Value1>" or "<Field2>" "<Operator2>" "<Value2>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1     | Operator1 | Value1 | Field2     | Operator2 | Value2 |
            | First Name | Contains  | Alex   | Gender     | Starts with  | Fem  |

    # =========================================================
    # ADVANCED FILTER – IN OPERATOR
    # =========================================================

    @personManagementAdvancedFilterInOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> In "<Value>"
        # Navigate to Person Management
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  verify the page title for "Person Management"

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition with In operator
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "In" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the persons list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the API response total count is greater than zero
        Then  User prints the persons list API response JSON
        Then  User verifies all API response records have "<Field>" "In" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field      | Value      |
            | First Name | Alex,David |

    # =========================================================
    # ADVANCED FILTER – NOT IN OPERATOR
    # =========================================================

    @personManagementAdvancedFilterNotInOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> Not in "<Value>"
        # Navigate to Person Management
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  verify the page title for "Person Management"

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition with Not in operator
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "Not in" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the persons list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the API response total count is greater than zero
        Then  User prints the persons list API response JSON
        Then  User verifies all API response records have "<Field>" "Not in" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Value  |
            | Gender | Female |

    # =========================================================
    # ADVANCED FILTER – COMBINED: Contains AND Not in
    # =========================================================
    #Need Fix
    @personManagementAdvancedFilterCombinedNotInTest
    Scenario Outline: Verify user can combine Contains and Not in conditions with AND logic
        # Navigate to Person Management
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  verify the page title for "Person Management"

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
        Then  User starts capturing the persons list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the API response total count is greater than zero
        Then  User prints the persons list API response JSON
        Then  User verifies all API response records satisfy "<Field1>" "<Operator1>" "<Value1>" and "<Field2>" "Not in" "<Value2>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1     | Operator1 | Value1 | Field2 | Value2 |
            | First Name | Contains  | a      | Status | Active |

    # =========================================================
    # ADVANCED FILTER – EQUAL / NOT EQUAL OPERATORS
    # =========================================================

    @personManagementAdvancedFilterEqualOperatorTest
    Scenario Outline: Verify user can apply a single condition filter using <Field> <Operator> "<Value>"
        # Navigate to Person Management
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  verify the page title for "Person Management"

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the persons list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the API response total count is greater than zero
        Then  User prints the persons list API response JSON
        Then  User verifies all API response records have "<Field>" "<Operator>" "<Value>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field      | Operator  | Value |
            | First Name | Equal     | Alex  |
            | First Name | Not equal | Alex  |

    # =========================================================
    # ADVANCED FILTER – GREATER THAN / LESS THAN OPERATORS
    # =========================================================

    @personManagementAdvancedFilterComparisonOperatorTest
    Scenario Outline: Verify user can apply a comparison condition filter using <Field> <Operator> "<Value>"
        # Navigate to Person Management
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  verify the page title for "Person Management"

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the persons list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the API response total count is greater than zero
        Then  User prints the persons list API response JSON
        Then  User verifies all API response records have "<Field>" "<Operator>" "<Value>"

        Examples:
            | Field         | Operator              | Value      |
            | Date Of Birth | Greater than          | 24/04/2020 |
            | Date Of Birth | Greater than or equal | 24/04/2020 |
            | Date Of Birth | Less than             | 24/04/2020 |
            | Date Of Birth | Less than or equal    | 24/04/2020 |

    # =========================================================
    # ADVANCED FILTER – BETWEEN / NOT BETWEEN OPERATORS
    # =========================================================

    @personManagementAdvancedFilterBetweenOperatorTest
    Scenario Outline: Verify user can apply a <Operator> condition filter on <Field> between "<FromValue>" and "<ToValue>"
        # Navigate to Person Management
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  verify the page title for "Person Management"

        # Open filter dialog and switch to Advanced Filter tab
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog

        # Add one condition with range values
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters between values "<FromValue>" and "<ToValue>" as the condition value

        # Apply filter and verify results
        Then  User starts capturing the persons list API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the API response total count is greater than zero
        Then  User prints the persons list API response JSON
        Then  User verifies all API response records have "<Field>" "<Operator>" values "<FromValue>" and "<ToValue>"

        # Reset and verify cleared
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field         | Operator    | FromValue  | ToValue    |
            | Date Of Birth | Between     | 24/04/2015 | 24/04/2020 |
            | Date Of Birth | Not between | 24/04/2015 | 24/04/2020 |

