@smoke @regression @seasonConfigAdvancedFilter @advanceFilter
Feature: Season Configuration Advanced Filter Functionality
    As a user
    I want to filter Season Configurations using advanced filter criteria
    So that I can find specific configurations using complex conditions

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
    # SINGLE CONDITION
    # =============================================================

    @seasonConfigAdvancedFilterSingleConditionTest
    Scenario Outline: Verify user can apply a single condition advanced filter on Season Config using <Field> <Operator> "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User clicks the Season tab in Competition Management sidebar
        Then  User clicks the Home tab in Season management
        Then  User clicks the quick search icon on Season listing
        Then  User searches for "<SeasonName>" in season quick search popup
        Then  User closes the season quick search popup
        Then  User clicks on the first season record in listing
        Then  User clicks the Configurations tab in season detail page
        Then  User clicks the Season Configuration Advanced Filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the Season Configuration advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the Season Configuration advanced filter API response total count is greater than zero
        Then  User prints the Season Configuration advanced filter API response JSON
        Then  User verifies all Season Config advanced filter API records have "<Field>" "<Operator>" "<Value>"
        Then  User clicks the Season Configuration Advanced Filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | SeasonName    | Field      | Operator | Value |
            | Season Filter | Federation | Contains | RBFA  |

    # =============================================================
    # AND CONDITION
    # =============================================================

    @seasonConfigAdvancedFilterANDConditionTest
    Scenario Outline: Verify user can apply two conditions with AND logic on Season Config - <Field1> and <Field2>
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User clicks the Season tab in Competition Management sidebar
        Then  User clicks the Home tab in Season management
        Then  User clicks the quick search icon on Season listing
        Then  User searches for "<SeasonName>" in season quick search popup
        Then  User closes the season quick search popup
        Then  User clicks on the first season record in listing
        Then  User clicks the Configurations tab in season detail page
        Then  User clicks the Season Configuration Advanced Filter icon
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
        Then  User starts capturing the Season Configuration advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the Season Configuration advanced filter API response total count is greater than zero
        Then  User prints the Season Configuration advanced filter API response JSON
        Then  User verifies all Season Config advanced filter API records have "<Field1>" "<Operator1>" "<Value1>"
        Then  User verifies all Season Config advanced filter API records have "<Field2>" "<Operator2>" "<Value2>"
        Then  User clicks the Season Configuration Advanced Filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | SeasonName    | Field1     | Operator1 | Value1 | Field2 | Operator2 | Value2   |
            | Season Filter | Federation | Contains  | RBFA   | Format | Contains  | Football |

    # =============================================================
    # OR CONDITION
    # =============================================================

    @seasonConfigAdvancedFilterORConditionTest
    Scenario Outline: Verify user can apply two conditions with OR logic on Season Config - <Field1> or <Field2>
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User clicks the Season tab in Competition Management sidebar
        Then  User clicks the Home tab in Season management
        Then  User clicks the quick search icon on Season listing
        Then  User searches for "<SeasonName>" in season quick search popup
        Then  User closes the season quick search popup
        Then  User clicks on the first season record in listing
        Then  User clicks the Configurations tab in season detail page
        Then  User clicks the Season Configuration Advanced Filter icon
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
        Then  User starts capturing the Season Configuration advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the Season Configuration advanced filter API response total count is greater than zero
        Then  User prints the Season Configuration advanced filter API response JSON
        Then  User verifies all Season Config advanced filter API records satisfy "<Field1>" "<Operator1>" "<Value1>" or "<Field2>" "<Operator2>" "<Value2>"
        Then  User clicks the Season Configuration Advanced Filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | SeasonName     | Field1 | Operator1 | Value1   | Field2 | Operator2 | Value2 |
            | Season Filter  | Format | Contains  | Football | Format | Contains  | Futsal |

    # =============================================================
    # IN OPERATOR
    # =============================================================

    @seasonConfigAdvancedFilterInOperatorTest
    Scenario Outline: Verify user can apply In operator on Season Config using <Field> In "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User clicks the Season tab in Competition Management sidebar
        Then  User clicks the Home tab in Season management
        Then  User clicks the quick search icon on Season listing
        Then  User searches for "<SeasonName>" in season quick search popup
        Then  User closes the season quick search popup
        Then  User clicks on the first season record in listing
        Then  User clicks the Configurations tab in season detail page
        Then  User clicks the Season Configuration Advanced Filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "In" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the Season Configuration advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the Season Configuration advanced filter API response total count is greater than zero
        Then  User prints the Season Configuration advanced filter API response JSON
        Then  User verifies all Season Config advanced filter API records have "<Field>" "In" "<Value>"
        Then  User clicks the Season Configuration Advanced Filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | SeasonName   | Field  | Value            |
            | Season Filter| Format | Football,Futsal  |

    # =============================================================
    # NOT IN OPERATOR
    # =============================================================

    @seasonConfigAdvancedFilterNotInOperatorTest
    Scenario Outline: Verify user can apply Not in operator on Season Config using <Field> Not in "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User clicks the Season tab in Competition Management sidebar
        Then  User clicks the Home tab in Season management
        Then  User clicks the quick search icon on Season listing
        Then  User searches for "<SeasonName>" in season quick search popup
        Then  User closes the season quick search popup
        Then  User clicks on the first season record in listing
        Then  User clicks the Configurations tab in season detail page
        Then  User clicks the Season Configuration Advanced Filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "Not in" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the Season Configuration advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the Season Configuration advanced filter API response total count is greater than zero
        Then  User prints the Season Configuration advanced filter API response JSON
        Then  User verifies all Season Config advanced filter API records have "<Field>" "Not in" "<Value>"
        Then  User clicks the Season Configuration Advanced Filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | SeasonName     | Field  | Value    |
            | Season Filter  | Format | Football |

    # =============================================================
    # EQUAL / NOT EQUAL OPERATOR
    # =============================================================

    @seasonConfigAdvancedFilterEqualOperatorTest
    Scenario Outline: Verify user can apply Equal/Not equal operator on Season Config using <Field> <Operator> "<Value>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User clicks the Season tab in Competition Management sidebar
        Then  User clicks the Home tab in Season management
        Then  User clicks the quick search icon on Season listing
        Then  User searches for "<SeasonName>" in season quick search popup
        Then  User closes the season quick search popup
        Then  User clicks on the first season record in listing
        Then  User clicks the Configurations tab in season detail page
        Then  User clicks the Season Configuration Advanced Filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters "<Value>" as the condition value
        Then  User starts capturing the Season Configuration advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the Season Configuration advanced filter API response total count is greater than zero
        Then  User prints the Season Configuration advanced filter API response JSON
        Then  User verifies all Season Config advanced filter API records have "<Field>" "<Operator>" "<Value>"
        Then  User clicks the Season Configuration Advanced Filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | SeasonName   | Field  | Operator  | Value    |
            | Season Filter| Format | Equal     | Football |
            | Season Filter| Format | Not equal | Football |

    # =============================================================
    # COMBINED (Contains AND Not in)
    # =============================================================

    @seasonConfigAdvancedFilterCombinedNotInTest
    Scenario Outline: Verify user can combine Contains and Not in conditions with AND logic on Season Config
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User clicks the Season tab in Competition Management sidebar
        Then  User clicks the Home tab in Season management
        Then  User clicks the quick search icon on Season listing
        Then  User searches for "<SeasonName>" in season quick search popup
        Then  User closes the season quick search popup
        Then  User clicks on the first season record in listing
        Then  User clicks the Configurations tab in season detail page
        Then  User clicks the Season Configuration Advanced Filter icon
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
        Then  User starts capturing the Season Configuration advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the Season Configuration advanced filter API response total count is greater than zero
        Then  User prints the Season Configuration advanced filter API response JSON
        Then  User verifies all Season Config advanced filter API records satisfy "<Field1>" "<Operator1>" "<Value1>" and "<Field2>" "Not in" "<Value2>"
        Then  User clicks the Season Configuration Advanced Filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
            | SeasonName   | Field1     | Operator1 | Value1 | Field2 | Value2 |
            | Season Filter| Federation | Contains  | RBFA   | Format | Futsal |

    # =============================================================
    # TIME FRAME – BETWEEN / NOT BETWEEN
    # =============================================================

    @seasonConfigAdvancedFilterBetweenOperatorTest
    Scenario Outline: Verify user can apply a <Operator> date condition on Season Config <Field> between "<FromValue>" and "<ToValue>"
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User clicks the Season tab in Competition Management sidebar
        Then  User clicks the Home tab in Season management
        Then  User clicks the quick search icon on Season listing
        Then  User searches for "<SeasonName>" in season quick search popup
        Then  User closes the season quick search popup
        Then  User clicks on the first season record in listing
        Then  User clicks the Configurations tab in season detail page
        Then  User clicks the Season Configuration Advanced Filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User adds a new condition in the Advanced Filter
        Then  User selects "<Field>" as the condition field
        Then  User selects "<Operator>" as the condition operator
        Then  User enters between values "<FromValue>" and "<ToValue>" as the condition value
        Then  User starts capturing the Season Configuration advanced filter API response
        Then  User clicks the Apply Advanced Filter button
        Then  User verifies the Season Configuration advanced filter API response total count is greater than zero
        Then  User prints the Season Configuration advanced filter API response JSON
        Then  User verifies all Season Config advanced filter API records have "<Field>" "<Operator>" values "<FromValue>" and "<ToValue>"
        Then  User clicks the Season Configuration Advanced Filter icon
        Then  User clicks the "Advanced Filter" tab in filter dialog
        Then  User clicks the Reset button in filter dialog
        Then  User verifies that all filters are cleared

        Examples:
             | SeasonName    | Field                   | Operator    | FromValue  | ToValue    |
           # | Season Filter | Time Frame Start Date   | Between     | 08/03/2027 | 13/03/2027 |
           # | Season Filter | Time Frame Start Date   | Not between | 08/03/2027 | 13/03/2027 |
             | Season Filter | Time Frame End Date     | Between     | 19/03/2027 | 26/03/2027 |
           # | Season Filter | Time Frame End Date     | Not between | 19/03/2027 | 26/03/2027 |
