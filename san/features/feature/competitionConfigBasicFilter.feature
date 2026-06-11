@smoke @regression @competitionConfigFilters @basicFilter
Feature: Competition Configuration Basic Filter Functionality
    As a user
    I want to be able to filter competition configurations using the Basic Filter
    So that I can find specific competitions based on filter criteria

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

    # =========================================================
    # VERIFY FILTER DIALOG OPENS
    # =========================================================

    @competitionConfigBasicFilterOpenTest
    Scenario: Verify user can open Basic Filter dialog and verify filter fields in Competition Configuration
        # Navigate to Competition Management > Competition Configuration
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  the user clicks on the Competition Configuration tab

        # Open Basic Filter dialog
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Competition Configuration filter dialog

        # Verify the Search input placeholder inside the filter dialog
        Then  User verifies the Competition Configuration filter search input has placeholder "Search by Competition Configuration Code or Competition Configuration Name"

        # Verify filter fields are visible
        Then  User verifies the Competition Configuration filter field "Status" is displayed
        Then  User verifies the Competition Configuration filter field "Competition Type" is displayed
        Then  User verifies the Competition Configuration filter field "Format" is displayed
        Then  User verifies the Competition Configuration filter field "Competition Level" is displayed

    # =========================================================
    # SEARCH BY COMPETITION NAME
    # =========================================================
    
    @competitionConfigSearchByNameTest
    Scenario Outline: Verify user can search competition configurations by name "<SearchText>"
        # Navigate to Competition Management > Competition Configuration
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  the user clicks on the Competition Configuration tab
        # Open Basic Filter dialog
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Competition Configuration filter dialog
        # Search by name, then arm API listener just before Apply
        Then  User searches for competition config with name "<SearchText>"
        Then  User starts capturing the competition config list API response
        Then  User clicks the Apply button in Competition Configuration filter dialog
        Then  User verifies the competition config API total count is greater than zero
        Then  User verifies the competition config grid contains name "<SearchText>"
        # Reset filters
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User clicks the Reset button in Competition Configuration filter dialog
        Then  User verifies that all Competition Configuration filters are cleared
        Examples:
            | SearchText |
            | Test       |

    # =========================================================
    # STATUS FILTER
    # =========================================================

    @competitionConfigStatusFilterTest
    Scenario Outline: Verify user can apply Status filter "<StatusValue>" in Competition Configuration
        # Navigate to Competition Management > Competition Configuration
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  the user clicks on the Competition Configuration tab
        # Open Basic Filter dialog
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Competition Configuration filter dialog
        # Apply Status filter first, then arm the API listener just before Apply
        Then  User applies Competition Config Basic Filter with following criteria
            | FilterField | FilterValue   |
            | Status      | <StatusValue> |
        # Capture API just before Apply so button-click requests are not captured
        Then  User starts capturing the competition config list API response
        Then  User clicks the Apply button in Competition Configuration filter dialog
        # Validate API
        Then  User verifies the competition config API total count is greater than zero
        Then  User verifies all competition config API records have "status" matching "<StatusValue>"
        # Click first record then navigate back
        Then  User clicks the first competition config record in the filtered grid
        Then  User navigates back to Competition Configuration list
        # Reset filters
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User clicks the Reset button in Competition Configuration filter dialog
        Then  User verifies that all Competition Configuration filters are cleared
        Examples:
            | StatusValue |
            | Active      |
    #| Inactive    |
    #| Draft       |

    # =========================================================
    # COMPETITION TYPE FILTER
    # =========================================================

    @competitionConfigTypeFilterTest
    Scenario Outline: Verify user can filter competition configurations by Competition Type "<CompetitionTypeValue>"
        # Navigate to Competition Management > Competition Configuration
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  the user clicks on the Competition Configuration tab
        # Open Basic Filter dialog
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Competition Configuration filter dialog
        # Apply Competition Type filter
        Then  User applies Competition Config Basic Filter with following criteria
            | FilterField      | FilterValue            |
            | Competition Type | <CompetitionTypeValue> |
        # Capture API then apply
        Then  User starts capturing the competition config list API response
        Then  User clicks the Apply button in Competition Configuration filter dialog
        # Verify grid shows records
        Then  User verifies the Competition Configuration filtered grid displays matching records
        # Reset filters
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User clicks the Reset button in Competition Configuration filter dialog
        Then  User verifies that all Competition Configuration filters are cleared
        Examples:
            | CompetitionTypeValue |
            | Championship         |

    # =========================================================
    # FORMAT FILTER
    # =========================================================

    @competitionConfigFormatFilterTest
    Scenario Outline: Verify user can filter competition configurations by Format "<FormatValue>"
        # Navigate to Competition Management > Competition Configuration
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  the user clicks on the Competition Configuration tab
        # Open Basic Filter dialog
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Competition Configuration filter dialog
        # Apply Format filter
        Then  User applies Competition Config Basic Filter with following criteria
            | FilterField | FilterValue   |
            | Format      | <FormatValue> |
        # Capture API then apply
        Then  User starts capturing the competition config list API response
        Then  User clicks the Apply button in Competition Configuration filter dialog
        Then  User verifies the competition config API total count is greater than zero
        # Verify grid shows records
        Then  User verifies the Competition Configuration filtered grid displays matching records
        # Reset filters
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User clicks the Reset button in Competition Configuration filter dialog
        Then  User verifies that all Competition Configuration filters are cleared
        Examples:
            | FormatValue |
            | Football    |
   

    # =========================================================
    # COMPETITION LEVEL FILTER
    # =========================================================

    @competitionConfigLevelFilterTest
    Scenario Outline: Verify user can filter competition configurations by Competition Level "<LevelValue>"
        # Navigate to Competition Management > Competition Configuration
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  the user clicks on the Competition Configuration tab
        # Open Basic Filter dialog
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Competition Configuration filter dialog
        # Apply Competition Level filter
        Then  User applies Competition Config Basic Filter with following criteria
            | FilterField       | FilterValue  |
            | Competition Level | <LevelValue> |
        # Capture API then apply
        Then  User starts capturing the competition config list API response
        Then  User clicks the Apply button in Competition Configuration filter dialog
        Then  User verifies the competition config API total count is greater than zero
        # Verify grid shows records
        Then  User verifies the Competition Configuration filtered grid displays matching records
        # Reset filters
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User clicks the Reset button in Competition Configuration filter dialog
        Then  User verifies that all Competition Configuration filters are cleared
        Examples:
            | LevelValue |
            | Level 1    |
        

    # =========================================================
    # DIVISION FILTER
    # =========================================================

    @competitionConfigDivisionFilterTest
    Scenario Outline: Verify user can filter competition configurations by Division "<DivisionValue>"
        # Navigate to Competition Management > Competition Configuration
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  the user clicks on the Competition Configuration tab
        # Open Basic Filter dialog
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Competition Configuration filter dialog
        # Apply Division filter
        Then  User applies Competition Config Basic Filter with following criteria
            | FilterField | FilterValue      |
            | Division    | <DivisionValue>  |
        # Capture API then apply
        Then  User starts capturing the competition config list API response
        Then  User clicks the Apply button in Competition Configuration filter dialog
        Then  User verifies the competition config API total count is greater than zero
        # Verify grid shows records
        Then  User verifies the Competition Configuration filtered grid displays matching records
        # Reset filters
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User clicks the Reset button in Competition Configuration filter dialog
        Then  User verifies that all Competition Configuration filters are cleared
        Examples:
            | DivisionValue      |
            | RegeressionTestDiv |

    # =========================================================
    # DIVISION CATEGORY FILTER
    # =========================================================

    @competitionConfigDivisionCategoryFilterTest
    Scenario Outline: Verify user can filter competition configurations by Division Category "<DivisionCategoryValue>"
        # Navigate to Competition Management > Competition Configuration
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  the user clicks on the Competition Configuration tab
        # Open Basic Filter dialog
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Competition Configuration filter dialog
        # Apply Division Category filter
        Then  User applies Competition Config Basic Filter with following criteria
            | FilterField       | FilterValue               |
            | Division Category | <DivisionCategoryValue>   |
        # Capture API then apply
        Then  User starts capturing the competition config list API response
        Then  User clicks the Apply button in Competition Configuration filter dialog
        Then  User verifies the competition config API total count is greater than zero
        # Verify grid shows records
        Then  User verifies the Competition Configuration filtered grid displays matching records
        # Reset filters
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User clicks the Reset button in Competition Configuration filter dialog
        Then  User verifies that all Competition Configuration filters are cleared
        Examples:
            | DivisionCategoryValue |
            | RegeressioTest        |

    # =========================================================
    # REGION FILTER
    # =========================================================

    @competitionConfigRegionFilterTest
    Scenario Outline: Verify user can filter competition configurations by Region "<RegionValue>"
        # Navigate to Competition Management > Competition Configuration
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  the user clicks on the Competition Configuration tab
        # Open Basic Filter dialog
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Competition Configuration filter dialog
        # Apply Region filter
        Then  User applies Competition Config Basic Filter with following criteria
            | FilterField | FilterValue    |
            | Region      | <RegionValue>  |
        # Capture API then apply
        Then  User starts capturing the competition config list API response
        Then  User clicks the Apply button in Competition Configuration filter dialog
        Then  User verifies the competition config API total count is greater than zero
        # Verify grid shows records
        Then  User verifies the Competition Configuration filtered grid displays matching records
        # Reset filters
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User clicks the Reset button in Competition Configuration filter dialog
        Then  User verifies that all Competition Configuration filters are cleared
        Examples:
            | RegionValue |
            | Region1     |

    # =========================================================
    # FEDERATION FILTER
    # =========================================================

    @competitionConfigFederationFilterTest
    Scenario Outline: Verify user can filter competition configurations by Federation "<FederationValue>"
        # Navigate to Competition Management > Competition Configuration
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  the user clicks on the Competition Configuration tab
        # Open Basic Filter dialog
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Competition Configuration filter dialog
        # Apply Federation filter
        Then  User applies Competition Config Basic Filter with following criteria
            | FilterField | FilterValue         |
            | Federation  | <FederationValue>   |
        # Capture API then apply
        Then  User starts capturing the competition config list API response
        Then  User clicks the Apply button in Competition Configuration filter dialog
        Then  User verifies the competition config API total count is greater than zero
        # Verify grid shows records
        Then  User verifies the Competition Configuration filtered grid displays matching records
        # Reset filters
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User clicks the Reset button in Competition Configuration filter dialog
        Then  User verifies that all Competition Configuration filters are cleared
        Examples:
            | FederationValue |
            | RBFA            |

    # =========================================================
    # ORGANIZATION FILTER
    # =========================================================

    @competitionConfigOrganizationFilterTest
    Scenario Outline: Verify user can filter competition configurations by Organization "<OrganizationValue>"
        # Navigate to Competition Management > Competition Configuration
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  the user clicks on the Competition Configuration tab
        # Open Basic Filter dialog
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Competition Configuration filter dialog
        # Apply Organization filter
        Then  User applies Competition Config Basic Filter with following criteria
            | FilterField  | FilterValue           |
            | Organization | <OrganizationValue>   |
        # Capture API then apply
        Then  User starts capturing the competition config list API response
        Then  User clicks the Apply button in Competition Configuration filter dialog
        Then  User verifies the competition config API total count is greater than zero
        # Verify grid shows records
        Then  User verifies the Competition Configuration filtered grid displays matching records
        # Reset filters
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User clicks the Reset button in Competition Configuration filter dialog
        Then  User verifies that all Competition Configuration filters are cleared
        Examples:
            | OrganizationValue |
            | Competitive Football              |

    # =========================================================
    # COMBINED – STATUS + COMPETITION TYPE
    # =========================================================

    @competitionConfigCombinedFilterTest
    Scenario Outline: Verify combined Status + Competition Type filter returns correct records
        # Navigate to Competition Management > Competition Configuration
        Then  User Can able to access the Main menu in home page
        Then  User choose the competition management tab
        Then  the user clicks on the Competition Configuration tab
        # Open Basic Filter dialog and apply combined filters
        Then  User clicks the filter icon in Competition Configuration to open filter options
        Then  User verifies "Basic Filter" tab is displayed in Competition Configuration filter dialog
        Then  User starts capturing the competition config list API response
        Then  User applies Competition Config Basic Filter with following criteria
            | FilterField      | FilterValue            |
            | Status           | <StatusValue>          |
            | Competition Type | <CompetitionTypeValue> |
        Then  User clicks the Apply button in Competition Configuration filter dialog
        Then  User verifies the competition config API total count is greater than zero
        Then  User verifies the Competition Configuration filtered grid displays matching records
        Examples:
            | StatusValue | CompetitionTypeValue |
            | Active      | Championship         |


    