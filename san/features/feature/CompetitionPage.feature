@regression @CompetitionPageModule @CompConfig 
Feature: Competition Functionality
    As a user
    I want to able to create competition, update competition, deactivate, activate and delete.

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
        And User choose the competition management tab

    Scenario: create a competition
        And User Click the Edit mode 
        And  click on create competition button
        And  enter competition code
        And  click on competition configuration
        And  click on next button
        And  click on next button in competition information
        And  enter season informations
            | Field       | Value                      |
            | Description | Season information updated |
        And  enter general settings
            | Field                            | Value    |
            | Total Teams per competition      | 2        |
            | Default Match Day                | Sunday   |
            | Common Cost                      | Yes      |
            | Allow Club Collaboration         | Yes      |
            | Fair Play                        | Yes      |
            | Score                            | Official |
            | Use Disciplinary Sanction Table  | Yes      |
            | Auto Generate Disciplinary Files | Yes      |
        And  enter match settings
            | Field                                   | Value |
            | Min Players to Start Game               | 2     |
            | Max Players to Start Game               | 4     |
            | All Players Starting                    | Yes   |
            | Presence List Required                  | Yes   |
            | Has Goalkeeper                          | Yes   |
            | Has Substitution                        | Yes   |
            | Min Substitution                        | 1     |
            | Max Substitution                        | 2     |
            | Has Yellow Card                         | Yes   |
            | Has Red Card                            | Yes   |
            | Penalties Allowed                       | Yes   |
            | Automatic Generation Disciplinary Files | Yes   |
            | Digital Matchsheet Required             | Yes   |
            | Goal Scorer Tracking                    | Yes   |
            | Control Missing ID Cards                | Yes   |
            | Bad Weather Cancellation Deadlines      | 30    |
        And enter club changes
            | Field                       | Value                |
            | Processed Automatically     | Cancel Game Deadline |
            | Individual Forfeit Deadline | 60                   |
            | Change Date Time Deadline   | 180                  |
            | Cancel Game Deadline        | 60                   |
            | Change Pitch Deadline       | 60                   |
            | Postponement Deadline       | 60                   |
        And enter match Function
            | Field                 | Value |
            | Automatic Designation | Yes   |
            | Official Code         | RED01 |
            | Meeting Place         | Yes   |
            | Min Referee Block     | 10    |
            | Max Referee Block     | 20    |
        And enter pitch information
            | Field       | Value        |
            | Squad Size  | 15           |
            | Pitch Type  | Pitch Type 3 |
            | Average Lux | 30           |
        And click on "Next" button
        And add competition phase
            | Field                    | Value                       |
            | Competition Phase Order  | random                      |
            | Competition Phase Name   | random                      |
            | Total Teams              | random                      |
            | Match Grid               | random                      |
            | Date Grid                | random                      |
            | General Ranking          | Cumulative Ranking          |
            | Period Ranking           | Monthly Performance Ranking |
            | Fairplay Ranking         | Discipline Ranking          |
            | Fairplay scorning window | 100                         |
        And click on "Confirm" button
        And click on "Create Competition" button
        Then a "Competition created successfully!" message appear on the screen

    