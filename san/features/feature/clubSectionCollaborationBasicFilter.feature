@smoke @regression @clubSectionCollaborationFilter @basicFilter
Feature: Club Section Collaboration Tab Basic Filter Functionality
    As a user
    I want to filter the Collaboration grid on a Section detail page
    So that I can find specific collaboration records using basic filter criteria

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

    @clubSectionCollabSearchFilter
    Scenario Outline: Filter Collaboration tab by Search Registration Number
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  User clicks the first result in the club listing grid
        Then  User choose the " Sections " tab
        Then  User clicks the first section record in the sections grid
        Then  User navigates to the Collaboration tab on section detail page
        Then  User starts capturing the collaboration list API response
        Then  User clicks the filter button on Collaboration tab
        Then  User applies Collaboration Basic Filter with following criteria
            | Search | <SearchValue> |
        Then  User clicks the Apply button in Collaboration filter dialog
        Then  User awaits and prints the collaboration API response as JSON

    Examples:
        | SearchValue             |
        | Regression25            |

    @clubSectionCollabStatusFilter
    Scenario Outline: Filter Collaboration tab by Status
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  User clicks the first result in the club listing grid
        Then  User choose the " Sections " tab
        Then  User clicks the first section record in the sections grid
        Then  User navigates to the Collaboration tab on section detail page
        Then  User starts capturing the collaboration list API response
        Then  User clicks the filter button on Collaboration tab
        Then  User applies Collaboration Basic Filter with following criteria
            | Status | <StatusValue> |
        Then  User clicks the Apply button in Collaboration filter dialog
        Then  User awaits and prints the collaboration API response as JSON

    Examples:
        | StatusValue  |
        | Pending Club |

    @clubSectionCollabDivisionCategoryFilter
    Scenario Outline: Filter Collaboration tab by Division Category
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  User clicks the first result in the club listing grid
        Then  User choose the " Sections " tab
        Then  User clicks the first section record in the sections grid
        Then  User navigates to the Collaboration tab on section detail page
        Then  User starts capturing the collaboration list API response
        Then  User clicks the filter button on Collaboration tab
        Then  User applies Collaboration Basic Filter with following criteria
            | Division Category | <DivisionCategoryValue> |
        Then  User clicks the Apply button in Collaboration filter dialog
        Then  User awaits and prints the collaboration API response as JSON

    Examples:
        | DivisionCategoryValue |
        | RegeressioTest        |

    @clubSectionCollabTagsFilter
    Scenario Outline: Filter Collaboration tab by Tags
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  User clicks the first result in the club listing grid
        Then  User choose the " Sections " tab
        Then  User clicks the first section record in the sections grid
        Then  User navigates to the Collaboration tab on section detail page
        Then  User starts capturing the collaboration list API response
        Then  User clicks the filter button on Collaboration tab
        Then  User applies Collaboration Basic Filter with following criteria
            | Tags | <TagsValue> |
        Then  User clicks the Apply button in Collaboration filter dialog
        Then  User awaits and prints the collaboration API response as JSON

    Examples:
        | TagsValue               |
        | Tag002 (Administrative) |
