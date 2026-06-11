@smoke @regression @competitionChangeRequestFilter @basicFilter
Feature: Competition Management Change Request Tab Basic Filter Functionality
    As a user
    I want to filter the Change Request grid using basic filter criteria
    So that I can find specific change request records

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

    @competitionChangeRequestTemplateNameFilter
    Scenario Outline: Filter Change Request tab by Template Name
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Change Request sub tab
        Then  User verifies the Change Request page title
        Then  User starts capturing the change request list API response
        Then  User clicks the filter icon on Change Request tab
        Then  User applies Change Request Basic Filter with following criteria
            | Template Name | <TemplateNameValue> |
        Then  User clicks the Apply button in Change Request filter dialog
        Then  User awaits and prints the change request API response as JSON

    Examples:
        | TemplateNameValue      |
        | Pawan Nikkil Testing   |

    @competitionChangeRequestStatusFilter
    Scenario Outline: Filter Change Request tab by Status
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Change Request sub tab
        Then  User verifies the Change Request page title
        Then  User clicks the filter icon on Change Request tab
        Then  User clicks the Reset button in Change Request filter dialog
        Then  User starts capturing the change request list API response
        Then  User applies Change Request Basic Filter with following criteria
            | Status | <StatusValue> |
        Then  User clicks the Apply button in Change Request filter dialog
        Then  User awaits and prints the change request API response as JSON

    Examples:
        | StatusValue |
        | Active      |
        | Inactive    |

    @competitionChangeRequestSeasonFilter
    Scenario Outline: Filter Change Request tab by Season
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Change Request sub tab
        Then  User verifies the Change Request page title
        Then  User starts capturing the change request list API response
        Then  User clicks the filter icon on Change Request tab
        Then  User applies Change Request Basic Filter with following criteria
            | Season | <SeasonValue> |
        Then  User clicks the Apply button in Change Request filter dialog
        Then  User awaits and prints the change request API response as JSON

    Examples:
        | SeasonValue |
        | RegSeason   |

    @competitionChangeRequestFederationFilter
    Scenario Outline: Filter Change Request tab by Federation
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Change Request sub tab
        Then  User verifies the Change Request page title
        Then  User starts capturing the change request list API response
        Then  User clicks the filter icon on Change Request tab
        Then  User applies Change Request Basic Filter with following criteria
            | Federation | <FederationValue> |
        Then  User clicks the Apply button in Change Request filter dialog
        Then  User awaits and prints the change request API response as JSON

    Examples:
        | FederationValue |
        | RBFA            |

    @competitionChangeRequestRegionFilter
    Scenario Outline: Filter Change Request tab by Region
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  User navigates to the Templates option
        Then  User navigates to the Change Request sub tab
        Then  User verifies the Change Request page title
        Then  User starts capturing the change request list API response
        Then  User clicks the filter icon on Change Request tab
        Then  User applies Change Request Basic Filter with following criteria
            | Region | <RegionValue> |
        Then  User clicks the Apply button in Change Request filter dialog
        Then  User awaits and prints the change request API response as JSON

    Examples:
        | RegionValue |
        | Region1     |
        | Region2     |
