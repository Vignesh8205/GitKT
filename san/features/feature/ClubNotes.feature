# Author: Prem Kumar.V
# Date: April 24, 2026
# Description: Club Profile Notes feature test scenarios

@clubNotes 
Feature: Club Profile Notes functionality
    As a user
    I want to create public notes for a club profile
    So that notes can be maintained from the club profile

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
        Then User choose the "Club Management" tab

    # Scenario: Create a public note

    #     Then Search "CAT Club" in the club search box and open the club details page
    #     Then click on the notes icon in club profile page header
    #     Then User navigates to the club profile notes tab
    #     When User clicks the Add Note button on club profile notes
    #     And User enters the club profile note content
    #         """
    #         This is a sample text for testing a rich text editor. It contains simple sentences that are easy to read and modify. You can use this content to check formatting options like bold, italic, underline, and text alignment.
    #         The quick brown fox jumps over the lazy dog. This sentence includes every letter of the alphabet, making it useful for font and typing tests.
    #         You can also edit this paragraph to test spacing, line height, and indentation. Try adding more text, changing colors, or inserting links to see how the editor behaves.
    #         This is another paragraph to help you test multiple sections. It shows how content flows from one line to another and how paragraphs are separated.
    #         """
    #     And User enables the public switch for club profile note
    #     Then User clicks the Create button on club profile notes
    #     Then User should see club profile notes popup message as "Note added successfully!"

    # Scenario: Update a public note

    #     Then Search "CAT Club" in the club search box and open the club details page
    #     Then click on the notes icon in club profile page header
    #     Then User navigates to the club profile notes tab
    #     When User searches for club notes by name "This is a sample"
    #     Then User clicks the edit button of the first club note
    #     When User updates the club profile note content with "Updated details"
    #     Then User clicks the Update button on club profile note
    #     Then User should see club profile notes popup message as "Note updated successfully!"

    # Scenario: Delete a public note

    #     Then Search "CAT Club" in the club search box and open the club details page
    #     Then click on the notes icon in club profile page header
    #     Then User navigates to the club profile notes tab
    #     When User searches for club notes by name "Updated details"
    #     Then User clicks the delete button of the first club note
    #     Then User clicks the confirm button on delete club note dialog
    #     Then User should see club profile notes popup message as "Note deleted successfully!"

    # Scenario: Create a private note

    #     Then Search "CAT Club" in the club search box and open the club details page
    #     Then click on the notes icon in club profile page header
    #     Then User navigates to the club profile notes tab
    #     When User clicks the Add Note button on club profile notes
    #     And User enters the club profile note content
    #         """
    #         This is a private note sample text.
    #         """
    #     And User enables the private switch for club profile note
    #     Then User clicks the Create button on club profile notes
    #     Then User should see club profile notes popup message as "Note added successfully!"

    # Scenario: Update a private note

    #     Then Search "CAT Club" in the club search box and open the club details page
    #     Then click on the notes icon in club profile page header
    #     Then User navigates to the club profile notes tab
    #     When User searches for club notes by name "This is a private"
    #     Then User clicks the edit button of the first club note
    #     When User updates the club profile note content with "Updated details"
    #     Then User clicks the Update button on club profile note
    #     Then User should see club profile notes popup message as "Note updated successfully!"

    # Scenario: Delete a private note

    #     Then Search "CAT Club" in the club search box and open the club details page
    #     Then click on the notes icon in club profile page header
    #     Then User navigates to the club profile notes tab
    #     When User searches for club notes by name "Updated details"
    #     Then User clicks the delete button of the first club note
    #     Then User clicks the confirm button on delete club note dialog
    #     Then User should see club profile notes popup message as "Note deleted successfully!"

    # Scenario: Create a public template

    #     Then Search "CAT Club" in the club search box and open the club details page
    #     Then click on the notes icon in club profile page header
    #     Then User navigates to the club profile templates tab
    #     When User clicks the Add Template button on club profile notes
    #     And User enters template name as "Orion Template1" on club profile notes
    #     And User enters the club profile note content
    #         """
    #         This is a sample text for testing a rich text editor. It contains simple sentences that are easy to read and modify. You can use this content to check formatting options like bold, italic, underline, and text alignment.
    #         The quick brown fox jumps over the lazy dog. This sentence includes every letter of the alphabet, making it useful for font and typing tests.
    #         You can also edit this paragraph to test spacing, line height, and indentation. Try adding more text, changing colors, or inserting links to see how the editor behaves.
    #         This is another paragraph to help you test multiple sections. It shows how content flows from one line to another and how paragraphs are separated.
    #         """
    #     And User enables the public switch for club profile note
    #     Then User clicks the Create button on club profile notes
    #     Then User should see club profile notes popup message as "Template added successfully!"

    # Scenario: Update public template created previously

    #     Then Search "CAT Club" in the club search box and open the club details page
    #     Then click on the notes icon in club profile page header
    #     Then User navigates to the club profile templates tab
    #     When User searches for template by name "Orion Template1" on club profile notes
    #     Then User clicks the edit button of the first club template
    #     When User updates the club template content with "Updated details" on club profile notes
    #     Then User clicks the Update button on club profile template
    #     Then User should see club profile notes popup message as "Template updated successfully!"

    # Scenario: Delete public template updated previously

    #     Then Search "CAT Club" in the club search box and open the club details page
    #     Then click on the notes icon in club profile page header
    #     Then User navigates to the club profile templates tab
    #     When User searches for template by name "Updated details" on club profile notes
    #     Then User clicks the delete button of the first club template
    #     Then User clicks the confirm button on delete club template dialog
    #     Then User should see club profile notes popup message as "Template deleted successfully!"

    # Scenario: Create a private template

    #     Then Search "CAT Club" in the club search box and open the club details page
    #     Then click on the notes icon in club profile page header
    #     Then User navigates to the club profile templates tab
    #     When User clicks the Add Template button on club profile notes
    #     And User enters template name as "Orion Template1" on club profile notes
    #     And User enters the club profile note content
    #         """
    #         This is a sample text for testing a rich text editor. It contains simple sentences that are easy to read and modify. You can use this content to check formatting options like bold, italic, underline, and text alignment.
    #         The quick brown fox jumps over the lazy dog. This sentence includes every letter of the alphabet, making it useful for font and typing tests.
    #         You can also edit this paragraph to test spacing, line height, and indentation. Try adding more text, changing colors, or inserting links to see how the editor behaves.
    #         This is another paragraph to help you test multiple sections. It shows how content flows from one line to another and how paragraphs are separated.
    #         """
    #     And User enables the private switch for club profile note
    #     Then User clicks the Create button on club profile notes
    #     Then User should see club profile notes popup message as "Template added successfully!"

    # Scenario: Update private template created previously

    #     Then Search "CAT Club" in the club search box and open the club details page
    #     Then click on the notes icon in club profile page header
    #     Then User navigates to the club profile templates tab
    #     When User searches for template by name "Orion Template1" on club profile notes
    #     Then User clicks the edit button of the first club template
    #     When User updates the club template content with "Updated details" on club profile notes
    #     Then User clicks the Update button on club profile template
    #     Then User should see club profile notes popup message as "Template updated successfully!"

    # Scenario: Delete private template updated previously

    #     Then Search "CAT Club" in the club search box and open the club details page
    #     Then click on the notes icon in club profile page header
    #     Then User navigates to the club profile templates tab
    #     When User searches for template by name "Updated details" on club profile notes
    #     Then User clicks the delete button of the first club template
    #     Then User clicks the confirm button on delete club template dialog
    #     Then User should see club profile notes popup message as "Template deleted successfully!"

    Scenario: Create a template and use it to create a note

        Then Search "CAT Club" in the club search box and open the club details page
        Then click on the notes icon in club profile page header
        Then User navigates to the club profile templates tab
        When User clicks the Add Template button on club profile notes
        And User enters template name as "Orion QA Template 1" on club profile notes
        And User enters the club profile note content
            """
            This is a sample text for testing a rich text editor. It contains simple sentences that are easy to read and modify. You can use this content to check formatting options like bold, italic, underline, and text alignment.
            The quick brown fox jumps over the lazy dog. This sentence includes every letter of the alphabet, making it useful for font and typing tests.
            You can also edit this paragraph to test spacing, line height, and indentation. Try adding more text, changing colors, or inserting links to see how the editor behaves.
            This is another paragraph to help you test multiple sections. It shows how content flows from one line to another and how paragraphs are separated.
            """
        And User enables the public switch for club profile note
        Then User clicks the Create button on club profile notes
        Then User should see club profile notes popup message as "Template added successfully!"
        When User navigates to the club profile notes tab
        When User clicks the Add Note button on club profile notes
        When User clicks the Use Template dropdown on club profile notes
        And User searches for template "Orion QA Template 1" in the club template search
        When User clicks the create button to use the club template
        Then User should see club profile notes popup message as "Note added successfully!"
        When User searches for club notes by name "This is a sample"
        Then User clicks the delete button of the first club note
        Then User clicks the confirm button on delete club note dialog
        Then User navigates to the club profile templates tab
        When User searches for template by name "Orion QA Template 1" on club profile notes
        Then User clicks the delete button of the first club template
        Then User clicks the confirm button on delete club template dialog
