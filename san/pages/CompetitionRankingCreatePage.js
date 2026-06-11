/** @typedef {import('@playwright/test').Page} Page */
const { expect } = require('playwright/test');
const DataUtil = require('../utils/dataUtil');

class CompetitionRankingCreatePage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;

        // Ranking tree/sidebar menu item
        this.rankingMenuItem = page.locator(
            "//span[contains(@class,'e-list-text') and normalize-space()='Ranking']"
        ).first();

        // Page title
        this.rankingTitle = page.locator(
            "//span[contains(@class,'font-secondary') and normalize-space()='Ranking']"
        ).first();

        // Template form fields
        this.templateNameInput = page.locator(
            '#templateName, input[placeholder="Enter Template Name"]'
        ).first();
        this.descriptionTextarea = page.locator(
            '#description, textarea[placeholder="Enter Description"]'
        ).first();

        // Ranking Criteria Configuration grid toolbar Add button
        this.criteriaGridAddBtn = page.locator(
            'button[aria-label="Add"]:has(.e-add), button.e-tbar-btn:has(.e-add)'
        ).first();

        // Inline grid row dropdowns (appear after clicking Add)
        this.criteriaDropdown = page.locator(
            'input[placeholder*="Criteria"], input[placeholder*="criteria"]'
        ).first();
        this.sortingDirectionDropdown = page.locator(
            'input[placeholder="Select Sorting Direction"]'
        ).first();
        this.influencePositionDropdown = page.locator(
            'input[placeholder="Select Influence Position"]'
        ).first();

        // Priority Level element in the grid row
        this.priorityLevelCell = page.locator(
            'td[aria-label*="Priority"], input[name*="priorityLevel"], input[name*="priority"]'
        ).first();

        // Grid row Update button (saves the inline-edited row)
        this.gridUpdateBtn = page.locator(
            'button[aria-label="Update"], button.e-tbar-btn:has(.e-update)'
        ).first();

        // Template Save / Submit button
        this.templateSaveBtn = page.locator(
            'button:has-text("Save"), button:has-text("Submit")'
        ).first();

        // API response capture
        this._apiResponsePromise = null;
        this._lastAPIResponse = null;

        // Store generated template name for later assertions
        this._generatedTemplateName = null;
    }

    // ─────────────────────────────────────────────────────────────────
    // NAVIGATION
    // ─────────────────────────────────────────────────────────────────

    async navigateToRankingMenuItem() {
        await this.rankingMenuItem.waitFor({ state: 'visible', timeout: 20000 });
        await this.rankingMenuItem.click({ force: true, timeout: 15000 });
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(800);
        console.log('✓ Navigated to Ranking sub tab');
    }

    async clickEditMode() {
        const editBtn = this.page.locator(
            'button:has(.e-edit), button[aria-label*="Edit"], button:has-text("Edit")'
        ).first();
        await editBtn.waitFor({ state: 'visible', timeout: 10000 });
        await editBtn.click();
        await this.page.waitForTimeout(800);
        console.log('✓ Clicked Edit mode button on Ranking page');
    }

    async clickViewMode() {
        // View mode ribbon button — title="View", contains span.e-eye.e-icons
        const viewBtn = this.page.locator(
            'button[title="View"]:has(span.e-eye), button[title="View"]'
        ).first();
        await viewBtn.waitFor({ state: 'visible', timeout: 10000 });
        await viewBtn.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(800);
        console.log('✓ Clicked View mode button on Ranking page');
    }

    async clickCreateTemplate() {
        const createBtn = this.page.locator(
            'button:has-text("Create Template"), span.e-btn-content:has-text("Create Template")'
        ).first();
        await createBtn.waitFor({ state: 'visible', timeout: 10000 });
        await createBtn.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(800);
        console.log('✓ Clicked Create Template button');
    }

    async verifyRankingTitle() {
        await this.rankingTitle.waitFor({ state: 'visible', timeout: 15000 });
        const titleText = await this.rankingTitle.textContent();
        console.log(`✓ Ranking page title verified: "${titleText.trim()}"`);
    }

    // ─────────────────────────────────────────────────────────────────
    // FORM – TEMPLATE DETAILS
    // ─────────────────────────────────────────────────────────────────

    async fillTemplateName() {
        this._generatedTemplateName = DataUtil.generateRandomClubName('TemplateRBFA', 6);

        await this.templateNameInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.templateNameInput.click();
        await this.templateNameInput.clear();
        await this.templateNameInput.fill(this._generatedTemplateName);
        console.log(`✓ Filled Template Name: "${this._generatedTemplateName}"`);
    }

    async fillDescription(text) {
        await this.descriptionTextarea.waitFor({ state: 'visible', timeout: 10000 });
        await this.descriptionTextarea.click();
        await this.descriptionTextarea.clear();
        await this.descriptionTextarea.fill(text.substring(0, 255));
        console.log(`✓ Filled Description: "${text.substring(0, 50)}..."`);
    }

    // ─────────────────────────────────────────────────────────────────
    // RANKING CRITERIA CONFIGURATION GRID
    // ─────────────────────────────────────────────────────────────────

    async verifyCriteriaAddedSuccessMessage() {
        const expectedText = 'Criteria added successfully';
        const toast = this.page.locator(
            "//div[@class='e-toast-content'] | " +
            "//div[contains(@class,'e-toast-content')] | " +
            "//div[contains(@class,'e-toast-message')] | " +
            "//*[contains(@class,'toast') or contains(@class,'snack') or contains(@class,'notification')]"
        ).filter({ hasText: expectedText }).first();

        try {
            await toast.waitFor({ state: 'visible', timeout: 20000 });
            const msg = await toast.textContent();
            console.log(`✓ Success message displayed: "${msg.trim()}"`);
            // Wait for toast to auto-dismiss so it doesn't block subsequent actions
            await toast.waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {});
        } catch (error) {
            throw new Error(
                `Toast "${expectedText}" was not visible within 20000ms.\nOriginal error: ${error.message}`
            );
        }
    }

    async clickAddInCriteriaGrid() {
        await this.criteriaGridAddBtn.waitFor({ state: 'visible', timeout: 10000 });
        await this.criteriaGridAddBtn.click();
        await this.page.waitForTimeout(800);
        console.log('✓ Clicked Add button in Ranking Criteria Configuration grid');
    }

    /**
     * Fill the inline-edit row in the Ranking Criteria Configuration grid.
     * Priority Level is disabled by default and is left unchanged.
     *
     * @param {Record<string, string>} criteria  { Criteria, 'Sorting Direction', 'Influence Position' }
     */
    async fillCriteriaRow(criteria) {
        for (const [field, value] of Object.entries(criteria)) {
            // Skip DataTable header rows (both 'Field' and 'FilterField' variants)
            if (field === 'Field' || field === 'FilterField') continue;
            if (!value || value.trim() === '') continue;

            switch (field) {
                case 'Criteria':
                    await this._selectGridDropdown(this.criteriaDropdown, value);
                    break;
                case 'Sorting Direction':
                    await this._selectGridDropdown(this.sortingDirectionDropdown, value);
                    break;
                case 'Influence Position':
                    await this._selectGridDropdown(this.influencePositionDropdown, value);
                    break;
                default:
                    console.warn(`⚠ Unknown criteria field: "${field}" – skipping`);
            }
            await this.page.waitForTimeout(300);
        }

        // Log Priority Level state (disabled by default – left unchanged)
        const isPLDisabled = await this.priorityLevelCell.isDisabled().catch(() => true);
        console.log(`ℹ Priority Level is ${isPLDisabled ? 'disabled (default — left unchanged)' : 'enabled'}`);
    }

    async clickGridUpdateButton() {
        // id="grid_944338811_0_update" | aria-label="Update"
        const updateBtn = this.page.locator(
            'button[aria-label="Update"], button.e-tbar-btn:has(.e-update)'
        ).first();
        await updateBtn.waitFor({ state: 'visible', timeout: 10000 });
        await updateBtn.click();
        await this.page.waitForTimeout(200);
        console.log('✓ Clicked Update button in Ranking Criteria grid');
    }

    async clickCreateButton() {
        // Syncfusion progress button with aria-label="Create progress"
        const createBtn = this.page.locator(
            'button[aria-label="Create progress"], button:has(span.e-btn-content:has-text("Create"))'
        ).first();
        await createBtn.waitFor({ state: 'visible', timeout: 10000 });
        await createBtn.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Clicked Create button for Ranking Template');
    }

    async saveTemplate() {
        await this.templateSaveBtn.waitFor({ state: 'visible', timeout: 10000 });
        await this.templateSaveBtn.scrollIntoViewIfNeeded().catch(() => {});
        await this.templateSaveBtn.click();
        await this.page.waitForTimeout(1500);
        console.log('✓ Clicked Save button for Ranking Template');
    }

    // ─────────────────────────────────────────────────────────────────
    // SEARCH & NAVIGATE TO RECORD
    // ─────────────────────────────────────────────────────────────────

    async searchRankingTemplate() {
        // 1. Click the quick search icon button (identified by search-icon.svg in style)
        const searchIconBtn = this.page.locator(
            'button:has(span.sf-custom-icon[style*="search-icon.svg"])'
        ).first();
        await searchIconBtn.waitFor({ state: 'visible', timeout: 10000 });
        await searchIconBtn.click();
        await this.page.waitForTimeout(800);

        // 2. Fill the quick search input (placeholder="Search by Template name")
        const searchInput = this.page.locator(
            '//input[@placeholder="Search by Template name"]'
        ).first();
        await searchInput.waitFor({ state: 'visible', timeout: 8000 });
        await searchInput.clear();
        const searchPrefix = DataUtil.getTodayClubNamePrefix('TemplateRBFA2026');
        await searchInput.fill(searchPrefix);

        // 3. Wait for the filtered list to appear
        await this.page.waitForTimeout(1500);

        // 4. Close the search panel so the grid row is accessible
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
        console.log(`✓ Quick searched for Ranking Template with prefix: "${searchPrefix}"`);
    }

    async clickFirstRankingTemplateRecord() {
        // Click the first column of the first row (navigates to detail page)
        const firstCell = this.page.locator(
            "//div[contains(@class,'e-gridcontent')]//table//tbody//tr[1]//td[1]"
        );
        await firstCell.waitFor({ state: 'visible', timeout: 10000 });
        await firstCell.click({ force: true });
        await this.page.waitForTimeout(2000);
        console.log('✓ Clicked first column of first Ranking Template record');
    }

    async clickFirstRecordToNavigateDetail() {
        const firstCell = this.page.locator(
            "//div[contains(@class,'e-gridcontent')]//table//tbody//tr[1]//td[1]"
        );
        await firstCell.waitFor({ state: 'visible', timeout: 10000 });
        await firstCell.click({ force: true });
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1000);
        console.log('✓ Clicked first record and navigated to detail page');
    }

    // ─────────────────────────────────────────────────────────────────
    // EDIT TEMPLATE INFORMATION
    // ─────────────────────────────────────────────────────────────────

    async clickEditTemplateInfoButton() {
        // Round edit button for the Template Information section (first on page)
        const editBtn = this.page.locator(
            'button[title="Edit"]:has(span.e-edit), button[title="Edit"]:has(.e-edit)'
        ).first();
        await editBtn.waitFor({ state: 'visible', timeout: 10000 });
        await editBtn.click();
        // Wait longer so the edit form fully renders before looking for inputs
        await this.page.waitForTimeout(1500);
        console.log('✓ Clicked Edit button for Template Information');
    }

    async editTemplateName() {
        this._editedTemplateName = DataUtil.generateRandomClubName('TemplateRBFA_Edit', 4);

        const nameInput = this.page.locator(
            'input[name="name_templateName"], #templateName, input[placeholder="Enter Template Name"]'
        ).first();

        await nameInput.waitFor({ state: 'visible', timeout: 10000 });
        await nameInput.click({ clickCount: 3 });
        await nameInput.fill(this._editedTemplateName);
        console.log(`✓ Edited Template Name: "${this._editedTemplateName}"`);
    }

    async editDescription(text) {
        const truncated = text.substring(0, 255);
        const descInput = this.page.locator(
            'textarea[name="name_description"], #description, textarea[placeholder="Enter Description"]'
        ).first();
        await descInput.waitFor({ state: 'visible', timeout: 10000 });
        await descInput.click({ clickCount: 3 });
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.type(truncated);
        console.log(`✓ Edited Description: "${truncated.substring(0, 60)}"`);
    }

    async clickUpdateTemplateButton() {
        // Syncfusion Progress Button for saving template info (aria-label="Update progress")
        const updateBtn = this.page.locator('button[aria-label="Update progress"]').first();
        await updateBtn.waitFor({ state: 'visible', timeout: 10000 });
        await updateBtn.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(1000);
        console.log('✓ Clicked Update button for Ranking Template');
    }

    // ─────────────────────────────────────────────────────────────────
    // EDIT RANKING CRITERIA CONFIGURATION
    // ─────────────────────────────────────────────────────────────────

    async clickEditCriteriaSectionButton() {
        // Round edit button for the Ranking Criteria Configuration section
        // If template info edit button also exists, criteria section button is the last one
        const editBtns = this.page.locator(
            'button[title="Edit"]:has(span.e-edit), button[title="Edit"]:has(.e-edit)'
        );
        const count = await editBtns.count();
        const targetBtn = count > 1 ? editBtns.last() : editBtns.first();
        await targetBtn.waitFor({ state: 'visible', timeout: 10000 });
        await targetBtn.click();
        await this.page.waitForTimeout(800);
        console.log('✓ Clicked Edit button for Ranking Criteria Configuration section');
    }

    async clickFirstCriteriaGridRow() {
        const firstRow = this.page.locator('tr.e-row').first();
        await firstRow.waitFor({ state: 'visible', timeout: 10000 });
        await firstRow.click();
        await this.page.waitForTimeout(500);
        console.log('✓ Selected first row in Ranking Criteria grid');
    }

    async clickGridRowEditButton() {
        // Grid toolbar Edit button — opens inline edit for the selected row
        const editBtn = this.page.locator(
            'button[aria-label="Edit"].e-tbar-btn, button.e-tbar-btn:has(span.e-tbar-btn-text):has(.e-edit)'
        ).first();
        await editBtn.waitFor({ state: 'visible', timeout: 10000 });
        await editBtn.click();
        await this.page.waitForTimeout(800);
        console.log('✓ Clicked Edit button in Ranking Criteria grid toolbar');
    }

    async editCriteriaValue(value) {
        await this._selectGridDropdown(this.criteriaDropdown, value);
        console.log(`✓ Edited Criteria to "${value}"`);
    }

    async clickCriteriaGridDeleteButton() {
        const deleteBtn = this.page.locator(
            'button[aria-label="Delete"].e-tbar-btn, button.e-tbar-btn:has(span.e-delete)'
        ).first();
        await deleteBtn.waitFor({ state: 'visible', timeout: 10000 });
        await deleteBtn.click();
        await this.page.waitForTimeout(800);
        console.log('✓ Clicked Delete button in Ranking Criteria grid');
    }

    async clickConfirmButton() {
        const confirmBtn = this.page.locator(
            'button[aria-label*="Confirm"], button:has(span.e-btn-content:has-text("Confirm"))'
        ).first();
        await confirmBtn.waitFor({ state: 'visible', timeout: 10000 });
        await confirmBtn.click();
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(800);
        console.log('✓ Clicked Confirm button');
    }

    // ─────────────────────────────────────────────────────────────────
    // PRIVATE HELPERS
    // ─────────────────────────────────────────────────────────────────

    /**
     * Open an EJ2 Dropdown in the grid inline-edit row and select a value.
     * Must click the parent <span class="e-input-group"> wrapper — the inner
     * <input readonly> is intercepted by the wrapper and cannot be clicked directly.
     */
    async _selectGridDropdown(inputLocator, value) {
        await inputLocator.waitFor({ state: 'visible', timeout: 10000 });
        // Navigate to the ancestor e-input-group span which is the real click target
        const wrapper = inputLocator.locator('xpath=ancestor::span[contains(@class,"e-input-group")][1]');
        await wrapper.click();
        await this.page.waitForTimeout(400);

        const popup = this.page.locator(
            `xpath=//div[contains(@class,'e-popup-open')]//li[contains(@class,'e-list-item') and contains(normalize-space(),'${value}')]`
        ).first();

        try {
            await popup.waitFor({ state: 'visible', timeout: 10000 });
            await popup.click();
            await this.page.waitForTimeout(300);
            console.log(`✓ Selected "${value}" from grid dropdown`);
        } catch {
            // Type to filter then select
            await inputLocator.fill(value);
            await this.page.waitForTimeout(500);
            const typed = this.page.locator(
                `xpath=//div[contains(@class,'e-popup-open')]//li[contains(@class,'e-list-item')]`
            ).first();
            if (await typed.isVisible().catch(() => false)) {
                await typed.click();
                console.log(`✓ Selected first suggestion for "${value}" from grid dropdown`);
            } else {
                console.warn(`⚠ Could not find option "${value}" in dropdown`);
            }
        }
    }

    // ─────────────────────────────────────────────────────────────────
    // API CAPTURE & VALIDATION
    // ─────────────────────────────────────────────────────────────────

    startCapturingRankingAPI() {
        // Debug: log all non-static responses for 10 s to identify the save endpoint
        const debugHandler = (response) => {
            const url = response.url();
            if (!url.match(/\.(js|css|png|jpg|svg|woff|ico)(\?|$)/i)) {
                console.log(`[API Debug] ${response.status()} ${response.request().method()} ${url}`);
            }
        };
        this.page.on('response', debugHandler);
        setTimeout(() => this.page.off('response', debugHandler), 15000);

        this._apiResponsePromise = this.page.waitForResponse(
            (response) => {
                const url = response.url().toLowerCase();
                const method = response.request().method();
                const status = response.status();
                // Capture POST/PUT to a ranking-related endpoint
                return url.includes('ranking') &&
                    (method === 'POST' || method === 'PUT') &&
                    status >= 200 && status < 400;
            },
            { timeout: 90000 }
        );
        console.log('✓ Started capturing Ranking Template API response');
    }

    async awaitAndPrintRankingAPIResponse() {
        const response = await this._apiResponsePromise;
        console.log(`✓ Ranking API matched URL: ${response.url()}`);
        console.log(`✓ Ranking API method: ${response.request().method()}`);
        const body = await response.json();
        console.log('── Ranking Template API Response JSON ──────────────────');
        console.log(JSON.stringify(body, null, 2));
        console.log('────────────────────────────────────────────────────────');
        this._lastAPIResponse = body;
        return body;
    }

    async verifyAPIResponseSuccessful(responseBody) {
        const body = responseBody || this._lastAPIResponse;
        expect(body).toBeTruthy();
        // Accept either a direct _id or a wrapped data object
        const id = body._id || body.id || body.data?._id || body.data?.id;
        if (id) {
            console.log(`✓ Ranking Template created successfully — ID: ${id}`);
        } else {
            console.log(`✓ Ranking Template API response received`);
            console.log(`  Template Name used: "${this._generatedTemplateName}"`);
        }
    }
}

module.exports = CompetitionRankingCreatePage;
