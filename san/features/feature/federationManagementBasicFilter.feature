# Feature Name: Federation Management Basic Filter
# Description: verifies basic filter behavior in Federation Management module
# Author: Prem Kumar
# Version: 1.0
# Start Date: 09-04-2026

@federationManagementBasicFilter @regression @basicFilter
Feature: Federation Management basic filter
    As a user
    I want to use basic filter in Federation Management
    So that I can filter records by organization, federation, format and status

    Background:
        Given I am on the login page
        And I load credentials from "test-data/credentials.json"
        When  I enter username from "validUser"
        And   I enter password from "validUser"
        And   I click the login button
        Then  I should be logged in successfully
        Then  User select the Role on role list
        When I select "Jio Season - Jio Season" in the Season dropdown
        Then  User Clicking on submit button
        Given User Can able to access the Main menu in home page
        And  user choose the "Federation Management" tab
        And  User navigates to Federation Management page

    @federationManagementOrganizationBasicFilter
    Scenario Outline: Search by organization name in Organization dropdown
        When User opens Federation Management filter and chooses Basic Filter
        And User searches organization "<Organization Name>" in Organization dropdown
        Then User clicks Apply in Federation Management basic filter
        And verify all API response records have "Organization Name" matching "Belgium Org" from organization basic filter API response

        Examples:
            | Organization Name |
            | Belgium Org       |

    @federationManagementFederationBasicFilter
    Scenario Outline: Search by federation in Federation dropdown
        When User opens Federation Management filter and chooses Basic Filter
        And User searches federation "<Federation Name>" in Federation dropdown
        Then User clicks Apply in Federation Management basic filter
        And verify all API response records have "Federation Name" matching "RBFA" from organization basic filter API response

        Examples:
            | Federation Name       |
            | RBFA                  |

     @federationManagementFormatBasicFilter
    Scenario Outline: Choose football format in Format dropdown
        When User opens Federation Management filter and chooses Basic Filter
        And User chooses format "<Format Value>" in Format dropdown
        Then User clicks Apply in Federation Management basic filter
        And verify all API response records have "Format" matching "Football" from organization basic filter API response

        Examples:
            | Format Value   |
            | Football     |

    @federationManagementFormatBasicFilter
    Scenario Outline: Choose football format in Format dropdown
        When User opens Federation Management filter and chooses Basic Filter
        And User chooses format "<Format Value>" in Format dropdown
        Then User clicks Apply in Federation Management basic filter
        And verify all API response records have "Format" matching "Mini-football" from organization basic filter API response

        Examples:
            | Format Value   |
            | Mini-football  |


     @federationManagementFormatBasicFilter
    Scenario Outline: Choose futsal format in Format dropdown
        When User opens Federation Management filter and chooses Basic Filter
        And User chooses format "<Format Value>" in Format dropdown
        Then User clicks Apply in Federation Management basic filter
        And verify all API response records have "Format" matching "Futsal" from organization basic filter API response

        Examples:
            | Format Value   |
            | Futsal         |
        
    @federationManagementStatusBasicFilter
    Scenario Outline: Choose active in Status filter
        When User opens Federation Management filter and chooses Basic Filter
        And User chooses status "<Status Value>" in Status filter
        Then User clicks Apply in Federation Management basic filter
        And verify all API response records have "Status" matching "Active" from organization basic filter API response

        Examples:
            | Status Value |
            | Active       |

     @federationManagementStatusBasicFilter
    Scenario Outline: Choose Inactive in Status filter
        When User opens Federation Management filter and chooses Basic Filter
        And User chooses status "<Status Value>" in Status filter
        Then User clicks Apply in Federation Management basic filter
        And verify all API response records have "Status" matching "Inactive" from organization basic filter API response

        Examples:
            | Status Value |
            | Inactive     |