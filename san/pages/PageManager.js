const ClubManagementPage = require("./ClubManagementPage")
const DivisionPage = require("./DivisionPage")
const LoginPage = require("./LoginPage")
const DivisionCategoryPage = require("./Divisioncategorypage")
const MatchGridPage = require("./MatchGridPage");
const PersonManagementPage = require("./PersonManagementPage");
const SectionsClubPage = require("./SectionsClubPage");
const DataSetsPage = require("./DataSetsPage");
const PersonFunctionBasicFilterPage = require("./PersonFunctionBasicFilterPage");
const CalendarPage = require("./CalendarPage");

class PageManager {
    constructor(page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.divisionPage = new DivisionPage(this.page)
        this.divisionCategoryPage = new DivisionCategoryPage(this.page);
        this.clubManagementPage = new ClubManagementPage(this.page)
        this.matchGridPage = new MatchGridPage(this.page);
        this.personManagementPage = new PersonManagementPage(this.page);
        this.sectionsClubPage = new SectionsClubPage(this.page);
        this.dataSetsPage = new DataSetsPage(this.page);
        this.advanceFilterPage = new AdvanceFilterPage(this.page);
        this.matchAndDateGridFilterPage = new MatchAndDateGridFilterPage(this.page);
        this.federationManagementBasicFilterPage = new FederationManagementBasicFilterPage(this.page);
        this.dataSetsBasicFilterPage = new DataSetsBasicFilterPage(this.page);
        this.personFunctionBasicFilterPage = new PersonFunctionBasicFilterPage(this.page);
        this.calendarPage = new CalendarPage(this.page);
    }
}

module.exports = PageManager;
