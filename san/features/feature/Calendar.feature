@regression 
Feature: Calendar Event Creation Functionality
    As a user
    I want to be able to create an event in the calendar
    So that I can manage my scheduled events

    Background:
        Given I am on the login page
        And I load credentials from "test-data/credentials.json"
        When  I enter username from "validUser"
        And   I enter password from "validUser"
        And   I click the login button
        Then  I should be logged in successfully
        Then  User select the Role on role list
        When I select "RegSeason" in the Season dropdown
        Then  User Clicking on submit button

    @calendarPage
    Scenario Outline: User can create a calendar event
        Then User Can able to access the Main menu in home page
        And User navigates to MyPortal and selects Calendar
        And User clicks the Create Event button
        Then User verifies the Create Event dialog is open
        And User fills event title with "<eventTitle>"
        And User fills event location with "<location>"
        And User selects resources with "<resources>"
        And User fills event start date and time with "<startDate>"
        And User fills event end date and time with "<endDate>"
        And User selects visibility as "<visibility>"
        And User selects event type as "<eventType>"
        And User fills event description with "<description>"
        And User selects tags as "<tags>"
        And User selects attendees with "<attendees>"
        And User selects repeat as "<repeat>"
        And User clicks the Create button
        Then validate popup message as "Event created successfully!"

        Examples:
            | eventTitle      | location                  | resources       | startDate        | endDate          | visibility | eventType   | description                          | tags                            | attendees       | repeat |
            | Team Meeting    |  0000kklm20250828182035   | Trial Season 1  | 01/04/2026 10:00 | 01/04/2026 11:00 | Public     | Meeting     | Quarterly team sync meeting          | RegressionTest (Administrative) | Regression USER | Never  |
           # | Project Review  | Board Room               |                 | 02/04/2026 14:00 | 02/04/2026 15:30 | Private    | Competition | Project status and review discussion |                              |                 |        |

