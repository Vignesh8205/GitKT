# Feature Name: DataSets Basic Filter
# Description: Verifies basic filter behaviour in the Data Sets module
# Author: Prem Kumar
# Version: 1.0
# Start Date: 12-04-2026

@dataSetsBasicFilter @regression @basicFilter
Feature: DataSets basic filter
    As a user
    I want to use basic filter in Data Sets
    So that I can filter records by name and status

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
        And  user choose "Settings"
        And  User navigates to DataSets page

    @dataSetsNameBasicFilter
    Scenario Outline: Search by name in DataSets search box
        When User opens DataSets filter and chooses Basic Filter
        And User searches name "<Name>" in DataSets search box
        Then User clicks Apply in DataSets basic filter
        And verify all API response records have "Name" matching "Child Resource Type" from DataSets basic filter API response

        Examples:
            | Name                |
            | Child Resource Type |

    @dataSetsStatusBasicFilter
    Scenario Outline: Filter by Active status in DataSets
        When User opens DataSets filter and chooses Basic Filter
        And User chooses status "<Status Value>" in DataSets Status filter
        Then User clicks Apply in DataSets basic filter
        And verify all API response records have "Status" matching "Active" from DataSets basic filter API response

        Examples:
            | Status Value |
            | Active       |

    @dataSetsStatusBasicFilter
    Scenario Outline: Filter by Inactive status in DataSets
        When User opens DataSets filter and chooses Basic Filter
        And User chooses status "<Status Value>" in DataSets Status filter
        Then User clicks Apply in DataSets basic filter
        And verify all API response records have "Status" matching "Inactive" from DataSets basic filter API response

        Examples:
            | Status Value |
            | Inactive     |
