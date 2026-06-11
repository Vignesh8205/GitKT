# Cucumber-Playwright Test Automation Framework

A comprehensive BDD (Behavior-Driven Development) test automation framework built with Cucumber.js and Playwright for automated testing of web applications. This framework features multi-browser support, parallel execution, and advanced reporting capabilities with Allure integration.

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Reporting](#reporting)
- [Framework Architecture](#framework-architecture)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This framework provides a robust solution for end-to-end testing using the power of Cucumber's BDD approach combined with Playwright's cross-browser automation capabilities. It's designed to be scalable, maintainable, and easy to understand for both technical and non-technical team members.

**Current Implementation**: Login functionality testing for OrangeHRM demo application.

## ✨ Key Features

- **BDD with Cucumber**: Write tests in Gherkin syntax for better collaboration
- **Multi-Browser Support**: Test on Chromium, Firefox, and WebKit
- **Parallel Execution**: Run tests concurrently for faster feedback
- **Page Object Model**: Maintainable and reusable page components
- **Allure Reporting**: Rich, interactive test reports with detailed insights
- **Environment Management**: Support for multiple environments (DEV, QA, STAGE)
- **Data-Driven Testing**: External JSON-based test data management
- **Headless & Headed Mode**: Flexible execution options for debugging and CI/CD
- **Custom World**: Shared context across test steps
- **Utility Libraries**: Common page utilities for complex interactions

## 🛠 Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | JavaScript runtime |
| **Cucumber.js** | ^10.0.1 | BDD test framework |
| **Playwright** | ^1.40.0 | Browser automation |
| **Allure** | ^2.24.1 | Test reporting |
| **Chai** | ^4.3.10 | Assertion library |
| **Rimraf** | ^6.1.2 | Cross-platform file cleanup |

## 📁 Project Structure

```
cucumber-playwright-framework/
├── features/                     # BDD feature files and test implementation
│   ├── feature/                      # Gherkin feature files
│   │   ├── LoginPage.feature         # Login scenarios
│   │   ├── DivisionPage.feature      # Division management scenarios
│   │   ├── FormManagement.feature    # Form handling scenarios
│   │   ├── clubManagement.feature    # Club management scenarios
│   │   ├── personManagement.feature  # person Management scenarios
│   │   ├── divisionCategory.feature  # Division category scenarios
│   │   ├── seasonPage.feature        # season scenarios
│   │   ├── competitionConfiguration.feature  # competition scenarios
│   │   ├── matchGrid.feature         # match grid  scenarios
│   │   └── dateGrid.feature          # Date grid scenarios
│
│
│   ├── step-definitions/               # Step definition implementations
│   │   ├── Loginpage.js                # Login 
│   │   ├── Divisionstep.js             # Division 
│   │   ├── FormManagementstep.js       # Form Management 
│   │   ├── clubManagementstep.js       # Club Management
│   │   ├── personManagement.js         # Person management 
│   │   ├── divisionCategory.js         # Division Category 
│   │   ├── seasonPage.js               # Season 
│   │   ├── competitionConfiguration.js # competition scenarios            
│   │   ├── matchGrid.js                # Match grid
│   │   └── dateGrid.js                 # Date grid  
│   │
│   └── support/                       # Test support files
│       ├── hooks.js                   # Before/After hooks for setup/teardown
│       └── world.js                   # Handles browser, context, and page creation
│
├── pages/                             # Page Object Model classes
│   ├── LoginPage.js                   # Login 
│   ├── DivisionPage.js                # Division 
│   ├── FormManagementPage.js          # Form management
│   ├── ClubManagementPage.js          # Club management
│   ├──personManagement.js             # Person management 
│   ├── divisionCategory.js            # Division Category
│   ├── seasonPage.js                  # Season 
│   ├── competitionConfiguration.js    # competition scenarios
│   ├── matchGrid.js                   # Match grid
│   ├── dateGrid.js                    # Date grid  
│   ├── PageManager.js                 #PageObjectManager-Handle page Object 
│   └── commonUtils/                   # Common page utilities
│       └── PageUtils.js               # Reusable page utility methods
│
├── utils/                             # Utility and helper modules
│   ├── environment.js                 # Environment configuration management
│   ├── reporter.js                    # Custom Allure reporter
│   └── dataUtil.js                    # Test data utilities
│
├── test-data/                         # Test data files
│   └── credentials.json               # User credentials for different scenarios
│
├── allure-results/                     # Allure test results (auto-generated)
├── allure-report/                      # Allure HTML reports (auto-generated)
├── test-results/                       # Test execution artifacts
│
├── cucumber.js                         # Cucumber configuration
├── playwright.config.js                # Playwright browser configuration
├── package.json                        # Project dependencies and scripts
└── .env                                # Environment variables



```

## 📋 Prerequisites

Before setting up the framework, ensure you have the following installed:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **Git** (for version control)

### System Requirements

- **OS**: Windows 10/11, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB (8GB recommended for parallel execution)
- **Disk Space**: 500MB for dependencies

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd saranya
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Cucumber.js and related packages
- Playwright browsers (Chromium, Firefox, WebKit)
- Allure reporting tools
- All testing dependencies

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Verify Installation

```bash
npm test
```

## ⚙️ Configuration

### Environment Configuration

The framework supports multiple environments configured in [utils/environment.js](utils/environment.js):

```javascript
// Set environment variable
$env:ENVIRONMENT = "DEV"    # Windows PowerShell
export ENVIRONMENT="QA"     # Linux/Mac

// Supported environments:
// - DEV (default): https://opensource-demo.orangehrmlive.com/
// - QA: https://backoffice.qa.tod-multiverse.com/
// - STAGE: https://backoffice-stg.tod-multiverse.com/
```

### Test Data Configuration

User credentials are managed in [test-data/credentials.json](test-data/credentials.json):

```json
{
  "validUser": {
    "username": "Admin",
    "password": "admin123"
  },
  "invalidUser": {
    "username": "invalid@email.com",
    "password": "wrongpassword"
  }
}
```

### Cucumber Configuration

Configure test execution in [cucumber.js](cucumber.js):

```javascript
{
  default: {
    require: ['features/step-definitions/*.js', 'features/support/*.js'],
    format: ['progress-bar', 'html:cucumber-report.html', './utils/reporter.js'],
    formatOptions: { 
      snippetInterface: 'async-await',
      allure: { resultsDir: './allure-results' }
    }
  }
}
```

## 🏃 Running Tests

### Basic Test Execution

```bash
# Run all tests with default configuration
npm test

# Run with clean results (recommended)
npm run test:clean
```

### Browser-Specific Execution

```bash
# Run tests on Chrome
npm run test:chrome

# Run tests on Firefox
npm run test:firefox

# Run tests on WebKit (Safari)
npm run test:webkit

# Debug mode on Chrome (single thread)
npm run test:chrome:debug
```

### Headless vs Headed Mode

```bash
# Run in headless mode (no browser window)
npm run test:headless

# Run in headed mode (visible browser)
npm run test:headed

# Run in headed mode with parallel execution
npm run test:headed:parallel -- --threads=3
```

### Tag-Based Execution

Run specific scenarios using Cucumber tags:

```bash
# Run only regression tests
npx cucumber-js --tags "@regression"

# Run login-specific tests
npx cucumber-js --tags "@LoginPageModule"

# Run valid credential tests
npx cucumber-js --tags "@LoginValid-credentials"

# Exclude specific tags
npx cucumber-js --tags "not @EmptyCredentials-WithLogin"
```

## 📊 Reporting

### Allure Reports

The framework generates comprehensive Allure reports with detailed test execution information.

#### Generate and View Reports

```bash
# Clean old results
npm run allure:clean

# Generate report from results
npm run allure:generate

# Open existing report
npm run allure:open

# Generate and open report (one command)
npm run allure:report
```

#### Report Features

- **Test Suites**: Overview of all test suites and their status
- **Behaviors**: BDD features and scenarios organized by user stories
- **Timeline**: Visual representation of test execution over time
- **Graphs**: Pie charts and trend graphs for test results
- **Categories**: Categorization of failures (product bugs, test defects, etc.)
- **History**: Historical trends of test execution

### HTML Reports

Generate standard Cucumber HTML reports:

```bash
npm run report
```

This creates `cucumber-report.html` in the root directory.

## 🏗️ Framework Architecture

### Custom World Class

The [CustomWorld](features/support/world.js) class provides shared context across test steps:

```javascript
class CustomWorld {
  - browser        // Playwright browser instance
  - page          // Playwright page instance
  - context       // Browser context
  - baseUrl       // Application URL
  - headless      // Execution mode
  - browserType   // Browser selection
  - loginPage     // Page object instance
}
```

### Hooks System

[hooks.js](features/support/hooks.js) manages test lifecycle:

- **Before**: Browser initialization, parameter parsing
- **After**: Screenshot capture, browser cleanup
- **AfterAll**: Final cleanup and reporting

### Page Object Model

The framework implements the Page Object Model pattern for maintainability:

#### LoginPage Class Structure

```javascript
class LoginPage {
  constructor(page)
  
  // Navigation
  navigateToLoginPage(baseUrl)
  
  // Interactions
  enterUsername(username)
  enterPassword(password)
  clickLoginButton()
  
  // Validations
  isLoginFormVisible()
  getLoginTitle()
  getAllErrorMessages()
  
  // Utilities
  clearUsername()
  clearPassword()
  waitForNavigation()
}
```

### Utility Functions

[PageUtils.js](pages/commonUtils/PageUtils.js) provides common utilities:

- **scrollBottomThenUp**: Smooth scrolling operations
- **waitForPageLoad**: Page load state management
- **waitForElementToBeStable**: Element stability checks

## ✍️ Writing Tests

### Creating Feature Files

Feature files use Gherkin syntax ([LoginPage.feature](features/feature/LoginPage.feature)):

```gherkin
@regression @LoginPageModule
Feature: Login Functionality
  As a user
  I want to be able to log in to the application
  So that I can access the system

Background:
  Given I am on the login page
  And I load credentials from "test-data/credentials.json"

@LoginValid-credentials
Scenario: Successful login with valid credentials
  When I enter username from "validUser"
  And I enter password from "validUser"
  And I click the login button
  Then I should be logged in successfully
```

### Implementing Step Definitions

Define step implementations in [step-definitions/Loginpage.js](features/step-definitions/Loginpage.js):

```javascript
Given('I am on the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToLoginPage(this.baseUrl);
});

When('I enter username from {string}', async function (userKey) {
  const username = this.credentials[userKey].username;
  await this.loginPage.enterUsername(username);
});

Then('I should be logged in successfully', async function () {
  const navigated = await this.loginPage.waitForNavigation(20000);
  expect(navigated).to.be.true;
});
```

### Creating Page Objects

Extend the framework with new page objects:

```javascript
class NewPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      element1: 'selector1',
      element2: 'selector2'
    };
  }
  
  async performAction() {
    await this.page.click(this.selectors.element1);
  }
}

module.exports = NewPage;
```

## 📚 Best Practices

### Test Design

1. **Keep scenarios independent**: Each scenario should run independently
2. **Use Background wisely**: Common setup goes in Background
3. **Descriptive scenario names**: Use clear, business-focused names
4. **One assertion per Then**: Keep validations focused
5. **Use appropriate tags**: Tag scenarios for categorization

### Code Quality

1. **Follow Page Object Model**: Keep locators and actions in page objects
2. **Reusable step definitions**: Create generic, reusable steps
3. **Proper error handling**: Use try-catch for reliability
4. **Meaningful logging**: Add console logs for debugging
5. **Clean code**: Follow JavaScript best practices

### Performance

1. **Parallel execution**: Use for faster feedback
2. **Selective test runs**: Use tags to run relevant tests
3. **Clean test data**: Remove old results before runs
4. **Optimize waits**: Use explicit waits instead of fixed delays

### Maintenance

1. **Regular updates**: Keep dependencies updated
2. **Test data management**: Centralize test data
3. **Documentation**: Document complex scenarios
4. **Code reviews**: Review test code like production code

## 🐛 Troubleshooting

### Common Issues

#### Issue: Tests fail with timeout errors

```bash
# Solution: Increase timeout in cucumber.js or step definitions
setDefaultTimeout(120000); // 120 seconds
```

#### Issue: Browser not visible in headed mode

```bash
# Solution: Check headless configuration
npm run test:headed
```

#### Issue: Allure report not generating

```bash
# Solution: Clean and regenerate
npm run allure:clean
npm test
npm run allure:generate
```

#### Issue: Module not found errors

```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Browser installation fails

```bash
# Solution: Manually install browsers
npx playwright install --with-deps
```

### Debug Mode

Enable detailed logging:

```javascript
// In world.js or step definitions
console.log('Debug info:', variable);

// In browser context
await page.evaluate(() => console.log('Browser log'));
```

### Test Isolation

Ensure proper cleanup between tests:

```javascript
After(async function () {
  await this.cleanup();
});
```

## 📧 Support

For issues and questions:

1. Check existing documentation
2. Review error logs in terminal
3. Examine test-results folder for artifacts
4. Consult Allure reports for detailed execution info

## 📝 Additional Resources

- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [Playwright Documentation](https://playwright.dev/)
- [Allure Framework](https://docs.qameta.io/allure/)
- [BDD Best Practices](https://cucumber.io/docs/bdd/)

## 📄 License

ISC

---

**Framework Version**: 1.0.0  
**Last Updated**: December 2025  
**Maintained By**: Test Automation Team
