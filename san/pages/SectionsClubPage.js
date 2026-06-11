/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {import('@playwright/test').Locator} Locator */

const { expect } = require("playwright/test")
const DataUtil = require('../utils/dataUtil')


class SectionsClubPage {
    /**
  * @param {Page} page
  */

    constructor(page) {
        this.page = page
        this.menu = this.page.locator('[data-mat-icon-name="gr_portal"]')
        this.clubManagementIcon = this.page.locator('[id="Club Management"]')

        this.sectionNames = (name) => this.page.locator(`//td//div[contains(text(),'${name}')] `);
        this.teamTab = this.page.locator("//div[text()='Teams']");
        this.collaborationsTab = this.page.locator(`//div[@role="presentation"]//div[normalize-space(text())='Collaborations']`)
        this.sectionClubTab = this.page.locator("//div[text()=' Sections ']");
        this.addTeamsButton = this.page.locator('button.e-tbar-btn:has(span.e-add):has(span.e-tbar-btn-text)');
        this.enterTeamSearch = this.page.locator("//input[contains(@placeholder, 'Search by division category')]"); this.sectionClubTab
        this.radioLabelByText = (text) => this.page.locator(`//ejs-radiobutton[.//span[contains(normalize-space(), '${text}')]]`);
        this.nextBtn = page.locator("//span[contains(text() ,'Next')]");
        this.createTeamBtn = page.locator('[aria-label="Create Team progress"]')
        this.createCollaboration = this.page.locator('[aria-label="Create Collaboration progress"]')
        this.addClubSection = this.page.locator('[aria-label="Add"]')
        
        // create team
        this.sessionId = this.page.locator('[aria-labelledby="seasonId_hidden"]');
        this.suffix = this.page.locator('[aria-labelledby="suffix_hidden"]');
        this.searchOrg = this.page.locator('[placeholder="Search Organization"]');
        this.squadSize = this.page.locator('[aria-labelledby="squadSize_hidden"]');
        this.defaultDay = this.page.locator('[aria-labelledby="preferredDay_hidden"]');
        this.preferedTime = this.page.locator('[placeholder="HH:MM"]');
        this.pitch = this.page.locator('[aria-labelledby="pitch_hidden"]');
        this.teamLevel = this.page.locator('[aria-labelledby="teamLevel_hidden"]');
        this.meetingPlace = this.page.locator('#meetingPlace');
        // season team name
        this.seasonteamName = this.page.locator('#teamName');

        // collaboration tab 
        this.searchNameInput = this.page.locator('[placeholder="Search Name"]')
        this.saveButton = this.page.locator('[aria-label=" column header Actions"] [title="Save"]')



    }


    async openClubDetailsByName(clubName) {
        let locator = this.sectionNames(clubName).first()
        await locator.click()
    }


    async navigateTabs(tabName) {
        switch (tabName) {
            case "Teams":
                await this.teamTab.click();
                break;
            case "collaborations":
                await this.collaborationsTab.click()
                break;
            case "Person Function(s)":
                await this.financeTab.click();
                break;
            case "Tags":
                await this.tagsTab.click()
                break;
            case "Attributes":
                await this.attributeTab.click()
                break;
            default:
                break;
        }
    }

    async clickSectionPageButton(buttonName) {
        switch (buttonName) {

            case "Add Team":
                await this.addTeamsButton.click();
                break;
            case "Next":
                await this.nextBtn.click();
                break;
            case "Create Team":
                await this.createTeamBtn.scrollIntoViewIfNeeded();
                await this.page.evaluate(() => {
                    window.__toastTexts = [];
                    if (window.__toastObserver) window.__toastObserver.disconnect();
                    window.__toastObserver = new MutationObserver((mutations) => {
                        for (const m of mutations) {
                            for (const node of m.addedNodes) {
                                if (node.nodeType !== 1) continue;
                                const els = [node, ...node.querySelectorAll('*')];
                                for (const el of els) {
                                    const t = el.textContent && el.textContent.trim();
                                    if (t && t.length > 2 && t.length < 250 && !window.__toastTexts.includes(t))
                                        window.__toastTexts.push(t);
                                }
                            }
                        }
                    });
                    window.__toastObserver.observe(document.body, { childList: true, subtree: true });
                });
                await this.createTeamBtn.click();
                break;
            case "Create Collaboration":
                await this.page.evaluate(() => {
                    window.__toastTexts = [];
                    if (window.__toastObserver) window.__toastObserver.disconnect();
                    window.__toastObserver = new MutationObserver((mutations) => {
                        for (const m of mutations) {
                            for (const node of m.addedNodes) {
                                if (node.nodeType !== 1) continue;
                                const els = [node, ...node.querySelectorAll('*')];
                                for (const el of els) {
                                    const t = el.textContent && el.textContent.trim();
                                    if (t && t.length > 2 && t.length < 250 && !window.__toastTexts.includes(t))
                                        window.__toastTexts.push(t);
                                }
                            }
                        }
                    });
                    window.__toastObserver.observe(document.body, { childList: true, subtree: true });
                });
                await this.createCollaboration.click();
                break;
            case "Add ClubSection":
                await this.addClubSection.waitFor({ state: 'visible', timeout: 30000 });
                await this.addClubSection.click()
                break;
            case "Add Club Section": {
                const addClubSectionBtn = this.page.locator('[aria-label="Add Club Section progress"]');
                await addClubSectionBtn.waitFor({ state: 'visible', timeout: 30000 });
                await addClubSectionBtn.click();
                break;
            }
            case "save":
                await this.saveButton.click()
                break;
            case "Add":
                await this.addTeamsButton.first().waitFor({ state: 'visible', timeout: 15000 });
                await this.addTeamsButton.first().click();
                break;
            default:
                throw new Error(`No action defined for button name: "${buttonName}"`);
        }
    }


    //  async  enterTeamNameInSearch(teamname) {
    //         await enterTeamSearch.fill(teamname);
    //         await enterTeamSearch.press('Enter');
    // }


    async enterTeamNameInSearch(teamName) {
        await this.enterTeamSearch.click();
        await this.enterTeamSearch.fill('')
        await this.enterTeamSearch.type(String(teamName), { delay: 100 });
        await this.enterTeamSearch.press('Enter');

    }

    async chooseTeamInList(text) {
        // Team name is in a grid cell; find the row containing the text and click its radio input
        const radio = this.page.locator(
            `//tr[contains(normalize-space(.), '${text}')]//input[@type='radio']` +
            ` | //li[contains(normalize-space(.), '${text}')]//input[@type='radio']` +
            ` | //div[contains(normalize-space(.), '${text}')][.//input[@type='radio']]//input[@type='radio']`
        ).first();
        await radio.waitFor({ state: 'attached', timeout: 15000 });
        await radio.click({ force: true });
    }

    async selectCreateTeamDropdown(labelText, option) {
        const fieldMap = {
            sessionId: this.sessionId,
            suffix: this.suffix,
            squadSize: this.squadSize,
            defaultDay: this.defaultDay,
            pitch: this.pitch,
            teamLevel: this.teamLevel,
        };
        const trigger = fieldMap[labelText];
        if (!trigger) throw new Error(`No dropdown defined for field: "${labelText}"`);
        console.log(`[dropdown] Waiting for trigger: ${labelText}`);
        await trigger.waitFor({ state: 'visible', timeout: 10000 });
        console.log(`[dropdown] Clicking trigger: ${labelText}`);
        await trigger.click();
        console.log(`[dropdown] Looking for option: "${option}" in ${labelText}`);

        // Syncfusion dropdowns use li.e-list-item, not <option> elements
        const optionLocator = this.page.locator(
            `//li[contains(@class,'e-list-item') and normalize-space()='${option}']`
        ).first();
        await optionLocator.waitFor({ state: 'visible', timeout: 15000 });
        await optionLocator.click();
        console.log(`[dropdown] Selected "${option}" in ${labelText}`);
    }

    async EnterCreateTeamDetails(name, value) {
        switch (name) {
            case "Search Organization":
                console.log(`[details] Filling Search Organization: ${value}`);
                await this.searchOrg.waitFor({ state: 'visible', timeout: 10000 });
                await this.searchOrg.click();
                await this.searchOrg.fill(value);
                // Select the first autocomplete suggestion that appears
                const suggestion = this.page.locator(
                    `li.e-list-item:has-text("${value}"), mat-option:has-text("${value}"), [role="option"]:has-text("${value}")`
                ).first();
                const hasSuggestion = await suggestion.isVisible({ timeout: 5000 }).catch(() => false);
                if (hasSuggestion) {
                    await suggestion.click();
                } else {
                    await this.searchOrg.press('Tab');
                }
                console.log(`[details] Done Search Organization`);
                break;
            case "PreferedTime":
                console.log(`[details] Filling PreferedTime: ${value}`);
                await this.preferedTime.first().waitFor({ state: 'visible', timeout: 10000 });
                await this.preferedTime.first().click({ clickCount: 3 });
                await this.preferedTime.first().fill(value);
                await this.page.keyboard.press('Tab');
                console.log(`[details] Done PreferedTime`);
                break;
            case "MeetingPlace":
                console.log(`[details] Filling MeetingPlace: ${value}`);
                await this.meetingPlace.waitFor({ state: 'visible', timeout: 10000 });
                await this.meetingPlace.click();
                await this.meetingPlace.clear();
                await this.meetingPlace.fill(value);
                console.log(`[details] Done MeetingPlace`);
                break;
            case "SeasonTeamName":
                console.log(`[details] Filling SeasonTeamName: ${value}`);
                await this.seasonteamName.waitFor({ state: 'visible', timeout: 10000 });
                await this.seasonteamName.click();
                await this.seasonteamName.clear();
                await this.seasonteamName.fill(value);
                console.log(`[details] Done SeasonTeamName`);
                break;
            default:
                break;
        }

    }
    async enterSeasonOverviewDetails(data) {
        await this.selectCreateTeamDropdown("sessionId", data["sessionId"])
        await this.selectCreateTeamDropdown("suffix", data["suffix"])
        await this.selectCreateTeamDropdown("squadSize", data["squadSize"])
        await this.selectCreateTeamDropdown("defaultDay", data["defaultDay"])
        await this.selectCreateTeamDropdown("pitch", data["pitch"])
        await this.selectCreateTeamDropdown("teamLevel", data["teamLevel"])
        await this.EnterCreateTeamDetails("Search Organization", data["Search Organization"])
        await this.EnterCreateTeamDetails("PreferedTime", data["PreferedTime"])
        await this.EnterCreateTeamDetails("MeetingPlace", data["MeetingPlace"])
        await this.EnterCreateTeamDetails("SeasonTeamName", data["SeasonTeamName"])

    }

    async entersearchName(name) {
        await this.searchNameInput.click();
        await this.searchNameInput.fill('')
        await this.searchNameInput.type(name, { delay: 100 });
        await this.page.getByRole('option').first().click();
    }

    async selectDivisionCategory(categoryName) {
        const icon = this.page.locator(
            'div.e-multi-select-wrapper:has(input[placeholder="Select Division Category"]) span.e-ddl-icon'
        );
        await icon.waitFor({ state: 'visible', timeout: 15000 });
        await icon.click();

        await this.page.waitForTimeout(300);

        // If a filter input is available inside the popup, use it; otherwise type into the main input
        const filterInput = this.page.locator(
            'input.e-input-filter, input.e-search-input, div.e-popup-open input[type="text"]'
        ).first();
        const filterVisible = await filterInput.isVisible({ timeout: 2000 }).catch(() => false);
        if (filterVisible) {
            await filterInput.fill(categoryName);
        } else {
            const mainInput = this.page.locator('input.e-dropdownbase[placeholder="Select Division Category"]');
            await mainInput.evaluate(el => el.removeAttribute('readonly'));
            await mainInput.fill(categoryName);
        }

        await this.page.waitForTimeout(300);

        // Click the matching list item
        const option = this.page.locator('li.e-list-item').filter({ hasText: categoryName }).first();
        await option.waitFor({ state: 'attached', timeout: 10000 });
        await option.scrollIntoViewIfNeeded();
        await option.click();

        // Press Tab to close the dropdown before proceeding
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(300);
    }




}
module.exports = SectionsClubPage;