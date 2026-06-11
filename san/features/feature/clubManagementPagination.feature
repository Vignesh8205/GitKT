@smoke @regression @paginationBar 
Feature: Club Management Pagination Bar Functionality
    As a user
    I want to be able to navigate through paginated records on the Club Management data grid
    So that I can browse, filter, and manage clubs across multiple pages


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

    # -------------------------------------------------------
    # Pagination Bar Visibility
    # -------------------------------------------------------

    @paginationBarVisibility
    Scenario: Verify the pagination bar is visible at the bottom of the Club Management data grid
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid

    @paginationBarHiddenWhenBelowPageSize
    Scenario: Verify the pagination bar is hidden when record count does not exceed the page size
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is only visible when records exceed the page size

    # -------------------------------------------------------
    # Navigation Buttons
    # -------------------------------------------------------

    @paginationNavigationButtons
    Scenario: Verify all navigation buttons are present on the pagination bar
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  verify the "previous page" navigation button is present
        Then  verify the "first page" navigation button is present
        Then  verify the "next page" navigation button is present
        Then  verify the "last page" navigation button is present

    @paginationNextPagepaginationPrevPage
    Scenario: Verify the single right and left arrows navigate to next and previous pages
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        # Navigate to next page and verify
        Then  user captures the current page number from the pagination bar
        Then  user clicks the "next page" navigation button
        Then  verify the page has navigated to the next page
        # Navigate back to previous page and verify
        Then  user captures the current page number from the pagination bar
        Then  user clicks the "previous page" navigation button
        Then  verify the page has navigated to the previous page

    @paginationFirstPage
    Scenario: Verify the double left arrow navigates to the first page
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user clicks the "next page" navigation button
        Then  user clicks the "first page" navigation button
        Then  verify the current page number is 1

    @paginationLastPage
    Scenario: Verify the double right arrow navigates to the last page
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user clicks the "last page" navigation button
        Then  verify the current page is the last page

    # -------------------------------------------------------
    # Page Number Display
    # -------------------------------------------------------

    @paginationCurrentPageHighlighted
    Scenario: Verify the current page number is visually highlighted
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  verify the current page number is highlighted in the pagination bar

    @paginationClickPageNumber
    Scenario: Verify clicking a page number directly navigates to that page
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user clicks the "next page" navigation button
        Then  user clicks the "next page" navigation button
        Then  user clicks on page number 1 in the pagination bar
        Then  verify the current page number is 1

    @paginationFirstLastAlwaysVisible
    Scenario: Verify the first and last page numbers are always displayed
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  verify the first page number is always visible in the pagination bar
        Then  verify the last page number is always visible in the pagination bar

    @paginationEllipsis
    Scenario: Verify ellipsis is shown when page range is skipped
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user clicks the "last page" navigation button
        Then  verify an ellipsis is displayed in the pagination bar to indicate skipped pages

    # -------------------------------------------------------
    # Page Size Selector
    # -------------------------------------------------------

    @paginationDefaultPageSize
    Scenario: Verify the default page size is 15
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  verify the default selected page size is 15

    @paginationPageSizeOptions
    Scenario: Verify the page size selector contains the correct options
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  verify the page size dropdown contains options "5, 20, 30"

    @paginationPageSizeChange
    Scenario Outline: Verify changing the page size to <PageSize> resets to page 1 and shows correct rows
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user selects page size "<PageSize>" from the page size selector
        Then  verify the current page number is 1
        Then  verify the data grid shows at most <PageSize> records per page

        Examples:
            | PageSize |
            | 5        |
            | 20       |
            | 30       |

    @paginationAllOption
    Scenario: Verify the "All" option is available when record count is at most 100
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  verify the "All" option is available in the page size dropdown for grids with 100 or fewer records

    # -------------------------------------------------------
    # Pagination Behaviour / Properties
    # -------------------------------------------------------

    @paginationScrollToTop
    Scenario: Verify scroll position returns to the top of the grid on page change
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user clicks the "next page" navigation button
        Then  verify the data grid is scrolled to the top after page change

    @paginationResetOnPageSizeChange
    Scenario: Verify page resets to page 1 when the page size is changed
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user clicks the "next page" navigation button
        Then  user selects page size "20" from the page size selector
        Then  verify the current page number is 1

    @paginationResetOnFilterApply
    Scenario: Verify page resets to page 1 when a filter is applied
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user clicks the "next page" navigation button
        Then  user applies a search filter on the Club Management grid
        Then  verify the current page number is 1

    @paginationResetOnSearchChange
    Scenario: Verify page resets to page 1 when the search input changes
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user clicks the "next page" navigation button
        Then  user enters a search term in the Club Management search bar
        Then  verify the current page number is 1

    @paginationNavigateToNearestValidPage
    Scenario: Verify pagination navigates to the nearest valid page when current page becomes invalid
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user clicks the "last page" navigation button
        Then  verify that if the last page has only one record, deleting it navigates to the previous valid page

    # -------------------------------------------------------
    # Keyboard Navigation
    # -------------------------------------------------------

    @paginationKeyboardPageDown
    Scenario: Verify Page Down key navigates to the next page
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user focuses the pagination bar
        Then  user captures the current page number from the pagination bar
        Then  user presses the "PageDown" key on the pagination bar
        Then  verify the page has navigated to the next page

    @paginationKeyboardPageUp
    Scenario: Verify Page Up key navigates to the previous page
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user clicks the "next page" navigation button
        Then  user focuses the pagination bar
        Then  user captures the current page number from the pagination bar
        Then  user presses the "PageUp" key on the pagination bar
        Then  verify the page has navigated to the previous page

    @paginationKeyboardRightArrow
    Scenario: Verify Right Arrow key navigates to the next page
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user focuses the pagination bar
        Then  user captures the current page number from the pagination bar
        Then  user presses the "ArrowRight" key on the pagination bar
        Then  verify the page has navigated to the next page

    @paginationKeyboardLeftArrow
    Scenario: Verify Left Arrow key navigates to the previous page
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user clicks the "next page" navigation button
        Then  user focuses the pagination bar
        Then  user captures the current page number from the pagination bar
        Then  user presses the "ArrowLeft" key on the pagination bar
        Then  verify the page has navigated to the previous page

    @paginationKeyboardEnterSpace
    Scenario Outline: Verify <Key> key selects the currently focused page number
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user focuses a page number button in the pagination bar
        Then  user presses the "<Key>" key on the pagination bar
        Then  verify the focused page number is now the current active page

        Examples:
            | Key   |
            | Enter |
            | Space |

    @paginationKeyboardTab
    Scenario: Verify Tab key moves focus to the next pagination item
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user focuses the pagination bar
        Then  user presses the "Tab" key on the pagination bar
        Then  verify focus has moved to the next pagination item

    @paginationKeyboardShiftTab
    Scenario: Verify Shift+Tab key moves focus to the previous pagination item
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user focuses the pagination bar
        Then  user presses the "Tab" key on the pagination bar
        Then  user presses the "Shift+Tab" key on the pagination bar
        Then  verify focus has moved to the previous pagination item

    @paginationKeyboardHome
    Scenario: Verify Home key navigates to the first page
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user clicks the "next page" navigation button
        Then  user focuses the pagination bar
        Then  user presses the "Home" key on the pagination bar
        Then  verify the current page number is 1

    @paginationKeyboardEnd
    Scenario: Verify End key navigates to the last page
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user focuses the pagination bar
        Then  user presses the "End" key on the pagination bar
        Then  verify the current page is the last page

    @paginationKeyboardCtrlAltPageUp
    Scenario: Verify Ctrl+Alt+Page Up key navigates to the first page
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user clicks the "next page" navigation button
        Then  user focuses the pagination bar
        Then  user presses the "Control+Alt+PageUp" key on the pagination bar
        Then  verify the current page number is 1

    @paginationKeyboardCtrlAltPageDown
    Scenario: Verify Ctrl+Alt+Page Down key navigates to the last page
        Then  User Can able to access the Main menu in home page
        Then  User choose the "Club Management" tab
        Then  verify the page title "Club Management"
        Then  verify the pagination bar is displayed at the bottom of the data grid
        Then  user focuses the pagination bar
        Then  user presses the "Control+Alt+PageDown" key on the pagination bar
        Then  verify the current page is the last page
