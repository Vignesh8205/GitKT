# Author: Prem Kumar.V
# Date: May 04, 2026
# Description: Club Section Team Configuration Notes feature test scenarios

@clubSectionTeamConfigurationNotes 
Feature: Club Section Team Configuration Notes functionality
    As a user
    I want to create public notes for a club section team
    So that notes can be maintained from the club section team profile

    Background:
        Given I am on the login page
        And I load credentials from "test-data/credentials.json"
        When  I enter username from "validUser"
        And   I enter password from "validUser"
        And   I click the login button
        Then  I should be logged in successfully
        Then  User select the Role on role list
        When I select "CAT Season - CAT Season" in the Season dropdown
        Then  User Clicking on submit button
        Given User Can able to access the Main menu in home page
        Then User choose the "Club Management" tab
        Then Search "CAT Club" in the club search box and open the club details page
        Then click on Sections tab
        Then click on 'CAT Club123' section
        Then user choose the Team Configuration tab
        Then Click on the "National Level Team 1" suffix

    Scenario: Create a public note

        Then click on the notes icon in club section team profile page header
        Then User navigates to the club section team profile notes tab
        When User clicks the Add Note button on club section team notes
        And User enters the club section team note content
            """
            This is a sample text for testing a rich text editor. It contains simple sentences that are easy to read and modify.
            You can use this content to check formatting options like bold, italic, underline, and text alignment.
            The quick brown fox jumps over the lazy dog. This sentence includes every letter of the alphabet, making it useful for font and typing tests.
            You can also edit this paragraph to test spacing, line height, and indentation. Try adding more text, changing colors, or inserting links to see how the editor behaves.
            This is another paragraph to help you test multiple sections. It shows how content flows from one line to another and how paragraphs are separated.
            """
        And User enables the public switch for club section team note
        Then User clicks the Create button on club section team notes
        Then User should see club section team notes popup message as "Note added successfully!"

    Scenario: Update a public note

        Then click on the notes icon in club section team profile page header
        Then User navigates to the club section team profile notes tab
        When User searches for club section team notes by name "This is a sample"
        Then User clicks the edit button of the first club section team note
        When User updates the club section team note content with "Updated details"
        Then User clicks the Update button on club section team notes
        Then User should see club section team notes popup message as "Note updated successfully!"

    Scenario: Delete a public note

        Then click on the notes icon in club section team profile page header
        Then User navigates to the club section team profile notes tab
        When User searches for club section team notes by name "Updated details"
        Then User clicks the delete button of the first club section team note
        Then User clicks the confirm button on delete club section team note dialog
        Then User should see club section team notes popup message as "Note deleted successfully!"

    Scenario: Create a private note

        Then click on the notes icon in club section team profile page header
        Then User navigates to the club section team profile notes tab
        When User clicks the Add Note button on club section team notes
        And User enters the club section team note content
            """
            This is a private note sample text.
            """
        And User enables the private switch for club section team note
        Then User clicks the Create button on club section team notes
        Then User should see club section team notes popup message as "Note added successfully!"

    Scenario: Update a private note

        Then click on the notes icon in club section team profile page header
        Then User navigates to the club section team profile notes tab
        When User searches for club section team notes by name "This is a private"
        Then User clicks the edit button of the first club section team note
        When User updates the club section team note content with "Updated details"
        Then User clicks the Update button on club section team notes
        Then User should see club section team notes popup message as "Note updated successfully!"

    Scenario: Delete a private note

        Then click on the notes icon in club section team profile page header
        Then User navigates to the club section team profile notes tab
        When User searches for club section team notes by name "Updated details"
        Then User clicks the delete button of the first club section team note
        Then User clicks the confirm button on delete club section team note dialog
        Then User should see club section team notes popup message as "Note deleted successfully!"

    Scenario: Create a public template

        Then click on the notes icon in club section team profile page header
        Then User navigates to the club section team profile templates tab
        When User clicks the Add Template button on club section team notes
        And User enters template name as "Orion Template1" on club section team notes
        And User enters the club section team note content
            """
            This is a sample text for testing a rich text editor. It contains simple sentences that are easy to read and modify. You can use this content to check formatting options like bold, italic, underline, and text alignment.
            The quick brown fox jumps over the lazy dog. This sentence includes every letter of the alphabet, making it useful for font and typing tests.
            You can also edit this paragraph to test spacing, line height, and indentation. Try adding more text, changing colors, or inserting links to see how the editor behaves.
            This is another paragraph to help you test multiple sections. It shows how content flows from one line to another and how paragraphs are separated.
            """
        And User enables the public switch for club section team note
        Then User clicks the Create button on club section team notes
        Then User should see club section team notes popup message as "Template added successfully!"

    Scenario: Update public template

        Then click on the notes icon in club section team profile page header
        Then User navigates to the club section team profile templates tab
        When User searches for template by name "Orion Template1" on club section team notes
        Then User clicks the edit button of the first club section team template
        When User updates the club section team template content with "Section Template Updated details"
        Then User clicks the Update button on club section team template
        Then User should see club section team notes popup message as "Template updated successfully!"

    Scenario: Delete public template

        Then click on the notes icon in club section team profile page header
        Then User navigates to the club section team profile templates tab
        When User searches for template by name "Orion Template1" on club section team notes
        Then User clicks the delete button of the first club section team template
        Then User clicks the confirm button on delete club section team template dialog
        Then User should see club section team notes popup message as "Template deleted successfully!"

    Scenario: Create a private template

        Then click on the notes icon in club section team profile page header
        Then User navigates to the club section team profile templates tab
        When User clicks the Add Template button on club section team notes
        And User enters template name as "Orion Template1" on club section team notes
        And User enters the club section team note content
            """
            This is a private template sample text for section profile.
            """
        And User enables the private switch for club section team note
        Then User clicks the Create button on club section team notes
        Then User should see club section team notes popup message as "Template added successfully!"

    Scenario: Update private template

        Then click on the notes icon in club section team profile page header
        Then User navigates to the club section team profile templates tab
        When User searches for template by name "Orion Template1" on club section team notes
        Then User clicks the edit button of the first club section team template
        When User updates the club section team template content with "Section Private Template Updated details"
        Then User clicks the Update button on club section team template
        Then User should see club section team notes popup message as "Template updated successfully!"

    Scenario: Delete private template

        Then click on the notes icon in club section team profile page header
        Then User navigates to the club section team profile templates tab
        When User searches for template by name "Orion Template1" on club section team notes
        Then User clicks the delete button of the first club section team template
        Then User clicks the confirm button on delete club section team template dialog
        Then User should see club section team notes popup message as "Template deleted successfully!"

    Scenario: Create a template and use it to create a note

        Then click on the notes icon in club section team profile page header
        Then User navigates to the club section team profile templates tab
        When User clicks the Add Template button on club section team notes
        And User enters template name as "Orion QA Section" on club section team notes
        And User enters the club section team note content
            """
            This is a sample text for testing a rich text editor. It contains simple sentences that are easy to read and modify. You can use this content to check formatting options like bold, italic, underline, and text alignment.
            The quick brown fox jumps over the lazy dog. This sentence includes every letter of the alphabet, making it useful for font and typing tests.
            You can also edit this paragraph to test spacing, line height, and indentation. Try adding more text, changing colors, or inserting links to see how the editor behaves.
            This is another paragraph to help you test multiple sections. It shows how content flows from one line to another and how paragraphs are separated.
            """
        And User enables the public switch for club section team note
        Then User clicks the Create button on club section team notes
        Then User should see club section team notes popup message as "Template added successfully!"
        When User navigates to the club section team profile notes tab
        When User clicks the Add Note button on club section team notes
        When User clicks the Use Template dropdown on club section team notes
        And User searches for template "Orion QA Section" in the club section team template search
        When User clicks the create button to use the club section team template
        Then User should see club section team notes popup message as "Note added successfully!"
        When User searches for club section team notes by name "This is a sample"
        Then User clicks the delete button of the first club section team note
        Then User clicks the confirm button on delete club section team note dialog
        Then User navigates to the club section team profile templates tab
        When User searches for template by name "Orion QA Section" on club section team notes
        Then User clicks the delete button of the first club section team template
        Then User clicks the confirm button on delete club section team template dialog