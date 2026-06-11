# Author: Prem Kumar.V
# Date: April 24, 2026
# Description: Person Profile Notes feature test scenarios

@personProfileNotes
Feature: Person Profile Notes functionality
    As a user
    I want to create public notes for a person profile
    So that notes can be maintained from the person profile

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
        Then User can choose the "Person Management" tab
        #Then verify the page title for "Person Management"

    Scenario: Create a public note
        
        Then Search "DM-02" in the person management search box and open the person details page
        Then click on the notes icon in person profile page header
        Then User navigates to the person profile notes tab
        When User clicks the Add Note button on person profile notes
        And User enters the person profile note content
            """
            This is a sample text for testing a rich text editor. It contains simple sentences that are easy to read and modify. You can use this content to check formatting options like bold, italic, underline, and text alignment.
            The quick brown fox jumps over the lazy dog. This sentence includes every letter of the alphabet, making it useful for font and typing tests.
            You can also edit this paragraph to test spacing, line height, and indentation. Try adding more text, changing colors, or inserting links to see how the editor behaves.
            This is another paragraph to help you test multiple sections. It shows how content flows from one line to another and how paragraphs are separated.
            """
         And User enables the public switch for person profile note
         Then User clicks the Create button on person profile notes
         Then User should see person profile notes popup message as "Note added successfully!"

    Scenario: Update a public note
        
        Then Search "DM-02" in the person management search box and open the person details page
        Then click on the notes icon in person profile page header
        Then User navigates to the person profile notes tab
        When User searches for notes by name "This is a sample"
        Then User clicks the edit button of the first note
        When User updates the person profile note content with "Updated details"
        Then User clicks the Update button on person profile note
        Then User should see person profile notes popup message as "Note updated successfully!"

    Scenario: Delete a public note
        
        Then Search "DM-02" in the person management search box and open the person details page
        Then click on the notes icon in person profile page header
        Then User navigates to the person profile notes tab
        When User searches for notes by name "Updated details"
        Then User clicks the delete button of the first note
        Then User clicks the confirm button on delete note dialog
        Then User should see person profile notes popup message as "Note deleted successfully!"

    Scenario: Create a private note
        
        Then Search "DM-02" in the person management search box and open the person details page
        Then click on the notes icon in person profile page header
        Then User navigates to the person profile notes tab
        When User clicks the Add Note button on person profile notes
        And User enters the person profile note content
            """
            This is a private note sample text.
            """
        And User enables the private switch for person profile note
        Then User clicks the Create button on person profile notes
        Then User should see person profile notes popup message as "Note added successfully!"

    Scenario: Update a private note

        Then Search "DM-02" in the person management search box and open the person details page
        Then click on the notes icon in person profile page header
        Then User navigates to the person profile notes tab
        When User searches for notes by name "This is a private"
        Then User clicks the edit button of the first note
        When User updates the person profile note content with "Updated details"
        Then User clicks the Update button on person profile note
        Then User should see person profile notes popup message as "Note updated successfully!"

    Scenario: Delete a private note

        Then Search "DM-02" in the person management search box and open the person details page
        Then click on the notes icon in person profile page header
        Then User navigates to the person profile notes tab
        When User searches for notes by name "Updated details"
        Then User clicks the delete button of the first note
        Then User clicks the confirm button on delete note dialog
        Then User should see person profile notes popup message as "Note deleted successfully!"

    Scenario: Create a public template

        Then Search "DM-02" in the person management search box and open the person details page
        Then click on the notes icon in person profile page header
        Then User navigates to the person profile templates tab
        When User clicks the Add Template button on person profile notes
        And User enters template name as "Orion Template1" on person profile notes
        And User enters the person profile note content
            """
            This is a sample text for testing a rich text editor. It contains simple sentences that are easy to read and modify. You can use this content to check formatting options like bold, italic, underline, and text alignment.
            The quick brown fox jumps over the lazy dog. This sentence includes every letter of the alphabet, making it useful for font and typing tests.
            You can also edit this paragraph to test spacing, line height, and indentation. Try adding more text, changing colors, or inserting links to see how the editor behaves.
            This is another paragraph to help you test multiple sections. It shows how content flows from one line to another and how paragraphs are separated.
            """
        And User enables the public switch for person profile note
        Then User clicks the Create button on person profile notes
        Then User should see person profile notes popup message as "Template added successfully!"

    Scenario: Update public template created previously

        Then Search "DM-02" in the person management search box and open the person details page
        Then click on the notes icon in person profile page header
        Then User navigates to the person profile templates tab
        When User searches for template by name "Orion Template1" on person profile notes
        Then User clicks the edit button of the first template
        When User updates the template content with "Updated details" on person profile notes
        Then User clicks the Update button on person profile template
        Then User should see person profile notes popup message as "Template updated successfully!"

    Scenario: Delete public template updated previously

        Then Search "DM-02" in the person management search box and open the person details page
        Then click on the notes icon in person profile page header
        Then User navigates to the person profile templates tab
        When User searches for template by name "Updated details" on person profile notes
        Then User clicks the delete button of the first template
        Then User clicks the confirm button on delete template dialog
        Then User should see person profile notes popup message as "Template deleted successfully!"

    Scenario: Create a private template

        Then Search "DM-02" in the person management search box and open the person details page
        Then click on the notes icon in person profile page header
        Then User navigates to the person profile templates tab
        When User clicks the Add Template button on person profile notes
        And User enters template name as "Orion Template1" on person profile notes
        And User enters the person profile note content
            """
            This is a sample text for testing a rich text editor. It contains simple sentences that are easy to read and modify. You can use this content to check formatting options like bold, italic, underline, and text alignment.
            The quick brown fox jumps over the lazy dog. This sentence includes every letter of the alphabet, making it useful for font and typing tests.
            You can also edit this paragraph to test spacing, line height, and indentation. Try adding more text, changing colors, or inserting links to see how the editor behaves.
            This is another paragraph to help you test multiple sections. It shows how content flows from one line to another and how paragraphs are separated.
            """
        And User enables the private switch for person profile note
        Then User clicks the Create button on person profile notes
        Then User should see person profile notes popup message as "Template added successfully!"

    Scenario: Update private template created previously

        Then Search "DM-02" in the person management search box and open the person details page
        Then click on the notes icon in person profile page header
        Then User navigates to the person profile templates tab
        When User searches for template by name "Orion Template1" on person profile notes
        Then User clicks the edit button of the first template
        When User updates the template content with "Updated details" on person profile notes
        Then User clicks the Update button on person profile template
        Then User should see person profile notes popup message as "Template updated successfully!"

    Scenario: Delete private template updated previously

        Then Search "DM-02" in the person management search box and open the person details page
        Then click on the notes icon in person profile page header
        Then User navigates to the person profile templates tab
        When User searches for template by name "Updated details" on person profile notes
        Then User clicks the delete button of the first template
        Then User clicks the confirm button on delete template dialog
        Then User should see person profile notes popup message as "Template deleted successfully!"

    Scenario: Create a template and use it to create a note
        
        Then Search "DM-02" in the person management search box and open the person details page
        Then click on the notes icon in person profile page header
        Then User navigates to the person profile templates tab
        When User clicks the Add Template button on person profile notes
        And User enters template name as "Orion QA Template 1" on person profile notes
        And User enters the person profile note content
            """
            This is a sample text for testing a rich text editor. It contains simple sentences that are easy to read and modify. You can use this content to check formatting options like bold, italic, underline, and text alignment.
            The quick brown fox jumps over the lazy dog. This sentence includes every letter of the alphabet, making it useful for font and typing tests.
            You can also edit this paragraph to test spacing, line height, and indentation. Try adding more text, changing colors, or inserting links to see how the editor behaves.
            This is another paragraph to help you test multiple sections. It shows how content flows from one line to another and how paragraphs are separated.
            """
         And User enables the public switch for person profile note
         Then User clicks the Create button on person profile notes
         Then User should see person profile notes popup message as "Template added successfully!"
         When User navigates to the person profile notes tab
         When User clicks the Add Note button on person profile notes
         When User clicks the Use Template dropdown on person profile notes
         And User searches for template "Orion QA Template 1" in the template search
         When User clicks the create button to use the template
         Then User should see person profile notes popup message as "Note added successfully!"
         When User searches for notes by name "This is a sample"
         Then User clicks the delete button of the first note
         Then User clicks the confirm button on delete note dialog
         Then User navigates to the person profile templates tab
         When User searches for template by name "Orion QA Template 1" on person profile notes
        Then User clicks the delete button of the first template
        Then User clicks the confirm button on delete template dialog