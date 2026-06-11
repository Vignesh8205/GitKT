@CompetitionCompetitionPhaseNotes 
Feature: Competition Competition Phase Notes functionality
    As a user
    I want to create public notes for a club section team
    So that notes can be maintained from the club section team profile

    Background:
        Given I am on the login page
        And   I load credentials from "test-data/credentials.json"
        When  I enter username from "validUser"
        And   I enter password from "validUser"
        And   I click the login button
        Then  I should be logged in successfully
        Then  User select the Role on role list
        When  I select "CAT Season - CAT Season" in the Season dropdown
        Then  User Clicking on submit button
        Given User Can able to access the Main menu in home page
        And   User choose the competition management tab
	    And   click on the search box and search for "Lion Fox Comp" and click on the searched competition
        And   click on the "Competition Phase" tab
        And   click on the "Final Phase" of the competition phase name 
         
        
	
     Scenario: Create a public note

        Then click on the notes icon         
	    Then User navigates to the notes tab
        When User clicks the Add Note button on notes
        And User enters the note content
            """
            This is a sample text for testing a rich text editor. It contains simple sentences that are easy to read and modify. 
	    You can use this content to check formatting options like bold, italic, underline, and text alignment.
            The quick brown fox jumps over the lazy dog. This sentence includes every letter of the alphabet, making it useful for font and typing tests.
            You can also edit this paragraph to test spacing, line height, and indentation. Try adding more text, changing colors, or inserting links to see how the editor behaves.
            This is another paragraph to help you test multiple sections. It shows how content flows from one line to another and how paragraphs are separated.
            """
         And User enables the public switch 
         Then User clicks the create button 
         Then User should see popup message as "Note added successfully!"

    Scenario: Update a public note

        Then click on the notes icon 
        Then User navigates to the notes tab
        When User searches for notes by name "This is a sample"
        Then User clicks the edit button of the note
        When User updates the note content with "Updated details"
        Then User clicks the Update button on notes
        Then User should see notes popup message as "Note updated successfully!"

    Scenario: Delete a public note 
       
        Then click on the notes icon
        Then User navigates to the notes tab
        When User searches for notes by name "Updated details"
        Then User clicks the delete button of the first note
        Then User clicks the confirm button on delete note dialog
        Then User should see notes popup message as "Note deleted successfully!"

    Scenario: Create a private note

        Then click on the notes icon 
        Then User navigates to the notes tab
         When User clicks the Add Note button on notes
        And User enters the note content
            """
            This is a private note sample text.
            """
        And User enables the private switch for note
        Then User clicks the Create button on notes
        Then User should see notes popup message as "Note added successfully!"

    Scenario: Update a private note 

        Then click on the notes icon 
        Then User navigates to the notes tab
        When User searches for notes by name "This is a private"
        Then User clicks the edit button of the first club section note
        When User updates the note content with "Updated details"
        Then User clicks the Update button on notes
        Then User should see notes popup message as "Note updated successfully!"

    Scenario: Delete a private note 
    
        Then click on the notes icon
        Then User navigates to the notes tab
        When User searches for notes by name "Updated details"
        Then User clicks the delete button of the first note
        Then User clicks the confirm button on delete note dialog
        Then User should see notes popup message as "Note deleted successfully!"

    Scenario: Create a public template 

        Then click on the notes icon 
        Then User navigates to the templates tab
        When User clicks the Add Template button on notes
        And User enters template name as "Orion Template1" on notes
        And User enters the note content
            """
            This is a sample text for testing a rich text editor. It contains simple sentences that are easy to read and modify. You can use this content to check formatting options like      bold, italic, underline, and text alignment. The quick brown fox jumps over the lazy dog. This sentence includes every letter of the alphabet, making it useful for font and typing tests.
            You can also edit this paragraph to test spacing, line height, and indentation. Try adding more text, changing colors, or inserting links to see how the editor behaves.
            This is another paragraph to help you test multiple sections. It shows how content flows from one line to another and how paragraphs are separated.
            """
        And User enables the public switch for note
        Then User clicks the Create button on notes
        Then User should see notes popup message as "Template added successfully!"

    Scenario: Update public template

        Then click on the notes icon 
        Then User navigates to the templates tab
        When User searches for template by name "Orion Template1" on notes
        Then User clicks the edit button of the first template
        When User updates the template content with "Section Template Updated details"
        Then User clicks the Update button on template
        Then User should see notes popup message as "Template updated successfully!"

    Scenario: Delete public template
      
        Then click on the notes icon
        Then User navigates to the templates tab
        When User searches for template by name "Orion Template1" on notes
        Then User clicks the delete button of the first template
        Then User clicks the confirm button on delete club section template dialog
        Then User should see club section notes popup message as "Template deleted successfully!"

    Scenario: Create a private template

        Then click on the notes icon         
	    Then User navigates to the templates tab
        When User clicks the Add Template button
        And User enters template name as "Orion Template1"
        And User enters the note content
            """
            This is a private template sample text for section profile.
            """
        And User enables the private switch for note
        Then User clicks the Create button on notes
        Then User should see notes popup message as "Template added successfully!"

    Scenario: Update private template

        Then click on the notes icon         
	    Then User navigates to the templates tab
        When User searches for template by name "Orion Template1"
        Then User clicks the edit button of the first template
        When User updates the template content with "Section Private Template Updated details" on notes
        Then User clicks the Update button on template
        Then User should see notes popup message as "Template updated successfully!"

    Scenario: Delete private template

        Then click on the notes icon 
        Then User navigates to the club section profile templates tab
        When User searches for template by name "Orion Template1" on club section notes
        Then User clicks the delete button of the first club section template
        Then User clicks the confirm button on delete club section template dialog
        Then User should see club section notes popup message as "Template deleted successfully!"


    Scenario: Create a template and use it to create a note 

        Then click on the notes icon 
        Then User navigates to the templates tab
        When User clicks the Add Template button on notes
        And User enters template name as "Orion QA Section" on notes
        And User enters the note content
            """
            This is a sample text for testing a rich text editor. It contains simple sentences that are easy to read and modify. You can use this content to check formatting options like bold, italic, underline, and text alignment.
            The quick brown fox jumps over the lazy dog. This sentence includes every letter of the alphabet, making it useful for font and typing tests.
            You can also edit this paragraph to test spacing, line height, and indentation. Try adding more text, changing colors, or inserting links to see how the editor behaves.
            This is another paragraph to help you test multiple sections. It shows how content flows from one line to another and how paragraphs are separated.
            """
        And User enables the public switch for note
        Then User clicks the Create button on notes
        Then User should see notes popup message as "Template added successfully!"
        When User navigates to the notes tab
        When User clicks the Add Note button on notes
        When User clicks the Use Template dropdown on notes
        And User searches for template "Orion QA Section" in the template search
        When User clicks the create button to use the template
        Then User should see notes popup message as "Note added successfully!"
        When User searches for notes by name "This is a sample"
        Then User clicks the delete button of the first club section team note
        Then User clicks the confirm button on delete note dialog
        Then User navigates to the templates tab
        When User searches for template by name "Orion QA Section" on notes
        Then User clicks the delete button of the first club section team template
        Then User clicks the confirm button on delete template dialog
