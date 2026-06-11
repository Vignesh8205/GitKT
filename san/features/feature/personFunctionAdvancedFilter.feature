@smoke @regression @personFunctionAdvancedFilter @advanceFilter
Feature: Person Management - Functions Tab Advanced Filter Functionality
    As a user
    I want to filter Club, Section, and Team function records using advanced filter criteria
    So that I can find specific function records using complex conditions

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

    # =============================================================
    # CLUB FUNCTION - SINGLE CONDITION
    # =============================================================

    @personClubFunctionAdvancedFilterSingleConditionTest
    Scenario Outline: Verify user can apply a single condition filter on Club Function using <Field> <Operator> "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Club Function filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the club function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club function advanced filter API response total count is greater than zero
        Then  User prints the club function advanced filter API response JSON
        Then  User verifies all club function advanced filter API records have "<Field>" "<Operator>" "<Value>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field         | Operator            | Value  |
            | Status        | Contains            | Active |
            | Status        | Does not start with | Active |
            | Club Function | Contains            | Admin  |

    # =============================================================
    # CLUB FUNCTION - AND CONDITION
    # =============================================================

    @personClubFunctionAdvancedFilterANDConditionTest
    Scenario Outline: Verify user can apply two conditions with AND logic on Club Function - <Field1> and <Field2>
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Club Function filter icon
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
        Then  User starts capturing the club function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club function advanced filter API response total count is greater than zero
        Then  User prints the club function advanced filter API response JSON
        Then  User verifies all club function advanced filter API records have "<Field1>" "<Operator1>" "<Value1>"
        Then  User verifies all club function advanced filter API records have "<Field2>" "<Operator2>" "<Value2>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1        | Operator1 | Value1 | Field2 | Operator2        | Value2   |
            | Club Function | Contains  | Admin  | Status | Does not contain | Inactive |

    # =============================================================
    # CLUB FUNCTION - OR CONDITION
    # =============================================================

    @personClubFunctionAdvancedFilterORConditionTest
    Scenario Outline: Verify user can apply two conditions with OR logic on Club Function - <Field1> or <Field2>
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Club Function filter icon
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
        Then  User starts capturing the club function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club function advanced filter API response total count is greater than zero
        Then  User prints the club function advanced filter API response JSON
        Then  User verifies all club function advanced filter API records satisfy "<Field1>" "<Operator1>" "<Value1>" or "<Field2>" "<Operator2>" "<Value2>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1        | Operator1 | Value1 | Field2 | Operator2 | Value2   |
            | Club Function | Contains  | Admin  | Status | Contains  | Inactive |

    # =============================================================
    # CLUB FUNCTION - IN OPERATOR
    # =============================================================

    @personClubFunctionAdvancedFilterInOperatorTest
    Scenario Outline: Verify user can apply In operator on Club Function using <Field> In "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Club Function filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "In" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the club function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club function advanced filter API response total count is greater than zero
        Then  User prints the club function advanced filter API response JSON
        Then  User verifies all club function advanced filter API records have "<Field>" "In" "<Value>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Value           |
            | Status | Active,Inactive |

    # =============================================================
    # CLUB FUNCTION - NOT IN OPERATOR
    # =============================================================

    @personClubFunctionAdvancedFilterNotInOperatorTest
    Scenario Outline: Verify user can apply Not in operator on Club Function using <Field> Not in "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Club Function filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "Not in" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the club function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club function advanced filter API response total count is greater than zero
        Then  User prints the club function advanced filter API response JSON
        Then  User verifies all club function advanced filter API records have "<Field>" "Not in" "<Value>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Value    |
            | Status | Inactive |

    # =============================================================
    # CLUB FUNCTION - EQUAL / NOT EQUAL
    # =============================================================

    @personClubFunctionAdvancedFilterEqualOperatorTest
    Scenario Outline: Verify user can apply Equal/Not equal operator on Club Function using <Field> <Operator> "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Club Function filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the club function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club function advanced filter API response total count is greater than zero
        Then  User prints the club function advanced filter API response JSON
        Then  User verifies all club function advanced filter API records have "<Field>" "<Operator>" "<Value>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Operator  | Value    |
            | Status | Equal     | Active   |
            | Status | Not equal | Inactive |

    # =============================================================
    # CLUB FUNCTION - COMBINED (Contains AND Not in)
    # =============================================================

    @personClubFunctionAdvancedFilterCombinedNotInTest
    Scenario Outline: Verify user can combine Contains and Not in conditions with AND logic on Club Function
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Club Function filter icon
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
        Then  User starts capturing the club function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club function advanced filter API response total count is greater than zero
        Then  User prints the club function advanced filter API response JSON
        Then  User verifies all club function advanced filter API records satisfy "<Field1>" "<Operator1>" "<Value1>" and "<Field2>" "Not in" "<Value2>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1        | Operator1 | Value1 | Field2 | Value2   |
            | Club Function | Contains  | Admin  | Status | Inactive |

    # =============================================================
    # SECTION FUNCTION - SINGLE CONDITION
    # =============================================================

    @personSectionFunctionAdvancedFilterSingleConditionTest 
    Scenario Outline: Verify user can apply a single condition filter on Section Function using <Field> <Operator> "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Section Function filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the section function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the section function advanced filter API response total count is greater than zero
        Then  User prints the section function advanced filter API response JSON
        Then  User verifies all section function advanced filter API records have "<Field>" "<Operator>" "<Value>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field            | Operator            | Value  |
            | Status           | Contains            | Active |
            | Status           | Does not start with | Active |
            | Section Function | Contains            | Section|

    # =============================================================
    # SECTION FUNCTION - AND CONDITION
    # =============================================================

    @personSectionFunctionAdvancedFilterANDConditionTest
    Scenario Outline: Verify user can apply two conditions with AND logic on Section Function - <Field1> and <Field2>
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Section Function filter icon
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
        Then  User starts capturing the section function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the section function advanced filter API response total count is greater than zero
        Then  User prints the section function advanced filter API response JSON
        Then  User verifies all section function advanced filter API records have "<Field1>" "<Operator1>" "<Value1>"
        Then  User verifies all section function advanced filter API records have "<Field2>" "<Operator2>" "<Value2>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1           | Operator1 | Value1   | Field2 | Operator2        | Value2   |
            | Section Function | Contains  | Section  | Status | Does not contain | Inactive |

    # =============================================================
    # SECTION FUNCTION - OR CONDITION
    # =============================================================

    @personSectionFunctionAdvancedFilterORConditionTest
    Scenario Outline: Verify user can apply two conditions with OR logic on Section Function - <Field1> or <Field2>
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Section Function filter icon
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
        Then  User starts capturing the section function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the section function advanced filter API response total count is greater than zero
        Then  User prints the section function advanced filter API response JSON
        Then  User verifies all section function advanced filter API records satisfy "<Field1>" "<Operator1>" "<Value1>" or "<Field2>" "<Operator2>" "<Value2>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1           | Operator1 | Value1   | Field2 | Operator2 | Value2   |
            | Section Function | Contains  | Section  | Status | Contains  | Inactive |

    # =============================================================
    # SECTION FUNCTION - IN OPERATOR
    # =============================================================

    @personSectionFunctionAdvancedFilterInOperatorTest
    Scenario Outline: Verify user can apply In operator on Section Function using <Field> In "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Section Function filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "In" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the section function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the section function advanced filter API response total count is greater than zero
        Then  User prints the section function advanced filter API response JSON
        Then  User verifies all section function advanced filter API records have "<Field>" "In" "<Value>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Value           |
            | Status | Active,Inactive |

    # =============================================================
    # SECTION FUNCTION - NOT IN OPERATOR
    # =============================================================

    @personSectionFunctionAdvancedFilterNotInOperatorTest
    Scenario Outline: Verify user can apply Not in operator on Section Function using <Field> Not in "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Section Function filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "Not in" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the section function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the section function advanced filter API response total count is greater than zero
        Then  User prints the section function advanced filter API response JSON
        Then  User verifies all section function advanced filter API records have "<Field>" "Not in" "<Value>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Value    |
            | Status | Inactive |

    # =============================================================
    # SECTION FUNCTION - EQUAL / NOT EQUAL
    # =============================================================

    @personSectionFunctionAdvancedFilterEqualOperatorTest
    Scenario Outline: Verify user can apply Equal/Not equal operator on Section Function using <Field> <Operator> "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Section Function filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the section function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the section function advanced filter API response total count is greater than zero
        Then  User prints the section function advanced filter API response JSON
        Then  User verifies all section function advanced filter API records have "<Field>" "<Operator>" "<Value>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Operator  | Value    |
            | Status | Equal     | Active   |
            | Status | Not equal | Inactive |

    # =============================================================
    # SECTION FUNCTION - COMBINED (Contains AND Not in)
    # =============================================================

    @personSectionFunctionAdvancedFilterCombinedNotInTest
    Scenario Outline: Verify user can combine Contains and Not in conditions with AND logic on Section Function
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Section Function filter icon
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
        Then  User starts capturing the section function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the section function advanced filter API response total count is greater than zero
        Then  User prints the section function advanced filter API response JSON
        Then  User verifies all section function advanced filter API records satisfy "<Field1>" "<Operator1>" "<Value1>" and "<Field2>" "Not in" "<Value2>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1           | Operator1 | Value1 | Field2 | Value2   |
            | Section Function | Contains  | Section  | Status | Inactive |

    # =============================================================
    # TEAM FUNCTION - SINGLE CONDITION
    # =============================================================

    @personTeamFunctionAdvancedFilterSingleConditionTest
    Scenario Outline: Verify user can apply a single condition filter on Team Function using <Field> <Operator> "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Team Function filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the team function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the team function advanced filter API response total count is greater than zero
        Then  User prints the team function advanced filter API response JSON
        Then  User verifies all team function advanced filter API records have "<Field>" "<Operator>" "<Value>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field         | Operator            | Value       |
            | Status        | Contains            | Active      |
            | Status        | Does not start with | Active      |
            | Team Function | Contains            | Assistant   |

    # =============================================================
    # TEAM FUNCTION - AND CONDITION
    # =============================================================

    @personTeamFunctionAdvancedFilterANDConditionTest
    Scenario Outline: Verify user can apply two conditions with AND logic on Team Function - <Field1> and <Field2>
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Team Function filter icon
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
        Then  User starts capturing the team function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the team function advanced filter API response total count is greater than zero
        Then  User prints the team function advanced filter API response JSON
        Then  User verifies all team function advanced filter API records have "<Field1>" "<Operator1>" "<Value1>"
        Then  User verifies all team function advanced filter API records have "<Field2>" "<Operator2>" "<Value2>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1        | Operator1 | Value1      | Field2 | Operator2        | Value2   |
            | Team Function | Contains  | Assistant   | Status | Does not contain | Inactive |

    # =============================================================
    # TEAM FUNCTION - OR CONDITION
    # =============================================================

    @personTeamFunctionAdvancedFilterORConditionTest
    Scenario Outline: Verify user can apply two conditions with OR logic on Team Function - <Field1> or <Field2>
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Team Function filter icon
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
        Then  User starts capturing the team function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the team function advanced filter API response total count is greater than zero
        Then  User prints the team function advanced filter API response JSON
        Then  User verifies all team function advanced filter API records satisfy "<Field1>" "<Operator1>" "<Value1>" or "<Field2>" "<Operator2>" "<Value2>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1        | Operator1 | Value1      | Field2 | Operator2        | Value2   |
            | Team Function | Contains  | Assistant   | Status | Does not contain | Inactive |

    # =============================================================
    # TEAM FUNCTION - IN OPERATOR
    # =============================================================

    @personTeamFunctionAdvancedFilterInOperatorTest
    Scenario Outline: Verify user can apply In operator on Team Function using <Field> In "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Team Function filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "In" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the team function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the team function advanced filter API response total count is greater than zero
        Then  User prints the team function advanced filter API response JSON
        Then  User verifies all team function advanced filter API records have "<Field>" "In" "<Value>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Value           |
            | Status | Active,Inactive |

    # =============================================================
    # TEAM FUNCTION - NOT IN OPERATOR
    # =============================================================

    @personTeamFunctionAdvancedFilterNotInOperatorTest
    Scenario Outline: Verify user can apply Not in operator on Team Function using <Field> Not in "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Team Function filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "Not in" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the team function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the team function advanced filter API response total count is greater than zero
        Then  User prints the team function advanced filter API response JSON
        Then  User verifies all team function advanced filter API records have "<Field>" "Not in" "<Value>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Value    |
            | Status | Inactive |

    # =============================================================
    # TEAM FUNCTION - EQUAL / NOT EQUAL
    # =============================================================

    @personTeamFunctionAdvancedFilterEqualOperatorTest
    Scenario Outline: Verify user can apply Equal/Not equal operator on Team Function using <Field> <Operator> "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Team Function filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the team function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the team function advanced filter API response total count is greater than zero
        Then  User prints the team function advanced filter API response JSON
        Then  User verifies all team function advanced filter API records have "<Field>" "<Operator>" "<Value>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field  | Operator  | Value    |
            | Status | Equal     | Active   |
            | Status | Not equal | Inactive |

    # =============================================================
    # TEAM FUNCTION - COMBINED (Contains AND Not in)
    # =============================================================

    @personTeamFunctionAdvancedFilterCombinedNotInTest
    Scenario Outline: Verify user can combine Contains and Not in conditions with AND logic on Team Function
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Team Function filter icon
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
        Then  User starts capturing the team function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the team function advanced filter API response total count is greater than zero
        Then  User prints the team function advanced filter API response JSON
        Then  User verifies all team function advanced filter API records satisfy "<Field1>" "<Operator1>" "<Value1>" and "<Field2>" "Not in" "<Value2>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field1           | Operator1 | Value1      | Field2 | Value2   |
            | Team Function    | Contains  | Assistant   | Status | Inactive |

    # =============================================================
    # CLUB FUNCTION - BETWEEN / NOT BETWEEN (Date)
    # =============================================================

    @personClubFunctionAdvancedFilterBetweenOperatorTest @Date
    Scenario Outline: Verify user can apply a <Operator> date condition on Club Function between "<FromValue>" and "<ToValue>"
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Club Function filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters between values "<FromValue>" and "<ToValue>" as the condition value
        Then  User starts capturing the club function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the club function advanced filter API response total count is greater than zero
        Then  User prints the club function advanced filter API response JSON
        Then  User verifies all club function advanced filter API records have "<Field>" "<Operator>" values "<FromValue>" and "<ToValue>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field      | Operator    | FromValue  | ToValue    |
            | Start Date | Between     | 18/05/2026 | 19/05/2026 |
            | Start Date | Not between | 18/05/2026 | 19/05/2026 |

    # =============================================================
    # SECTION FUNCTION - BETWEEN / NOT BETWEEN (Date)
    # =============================================================

    @personSectionFunctionAdvancedFilterBetweenOperatorTest @Date
    Scenario Outline: Verify user can apply a <Operator> date condition on Section Function between "<FromValue>" and "<ToValue>"
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Section Function filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters between values "<FromValue>" and "<ToValue>" as the condition value
        Then  User starts capturing the section function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the section function advanced filter API response total count is greater than zero
        Then  User prints the section function advanced filter API response JSON
        Then  User verifies all section function advanced filter API records have "<Field>" "<Operator>" values "<FromValue>" and "<ToValue>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field      | Operator    | FromValue  | ToValue    |
            | Start Date | Between     | 18/05/2026 | 19/05/2026 |
            | Start Date | Not between | 18/05/2026 | 19/05/2026 |

    # =============================================================
    # TEAM FUNCTION - BETWEEN / NOT BETWEEN (Date)
    # =============================================================

    @personTeamFunctionAdvancedFilterBetweenOperatorTest  
    Scenario Outline: Verify user can apply a <Operator> date condition on Team Function between "<FromValue>" and "<ToValue>"
        Then  User Can able to access the Main menu in home page
        Then  User can choose the "Person Management" tab
        Then  User clicks the Home tab in Person Management
        Then  User selects the first person record from the listing page
        Then  User navigates to the Functions tab on person detail page
        Then  User verifies the Person Functions page title
        Then  User clicks the Team Function filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters between values "<FromValue>" and "<ToValue>" as the condition value
        Then  User starts capturing the team function advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the team function advanced filter API response total count is greater than zero
        Then  User prints the team function advanced filter API response JSON
        Then  User verifies all team function advanced filter API records have "<Field>" "<Operator>" values "<FromValue>" and "<ToValue>"
        Then  User clicks the filter icon to open filter options
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | Field      | Operator    | FromValue  | ToValue    |
            | Start Date | Between     | 18/05/2026 | 19/05/2026 |
            | Start Date | Not between | 18/05/2026 | 19/05/2026 |
