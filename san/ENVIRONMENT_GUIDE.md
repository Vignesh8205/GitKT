# Environment Configuration Guide

## Available Environments

| Environment | URL | Usage |
|------------|-----|-------|
| **QA** | https://backoffice.qa.tod-multiverse.com/ | QA environment |
| **STAGE** | https://backoffice-stg.tod-multiverse.com/ | Staging environment |

## How to Use

### Run Tests in DEV (Default)
```bash
npm test
```
or
```bash
set ENVIRONMENT=DEV && npm test
```

### Run Tests in QA
```bash
set ENVIRONMENT=QA && npm test
```

### Run Tests in STAGE
```bash
set ENVIRONMENT=STAGE && npm test
```

### Run Tests with Specific Environment and Browser
```bash
# DEV with Chrome
set ENVIRONMENT=DEV && npm run test:chrome

# QA with headed mode
set ENVIRONMENT=QA && npm run test:headed

# STAGE with Firefox
set ENVIRONMENT=STAGE && npm run test:firefox
```

## Environment-Specific Credentials

You can create separate credential files for each environment:

### Structure
```
test-data/
├── credentials.json          # DEV credentials (default)
├── credentials-qa.json       # QA credentials
└── credentials-stage.json    # STAGE credentials
```

### Update Feature File (Optional)
If you want to use environment-specific credentials:

```gherkin
Background:
    Given I am on the login page
    And I load credentials from "test-data/credentials-qa.json"
```

## Current Setup

- **Default Environment**: DEV
- **Default URL**: https://opensource-demo.orangehrmlive.com/
- **Credentials File**: test-data/credentials.json

## Examples

```powershell
# Windows PowerShell
$env:ENVIRONMENT="QA"; npm test
$env:ENVIRONMENT="STAGE"; npm run test:headed
$env:ENVIRONMENT="DEV"; npm run test:chrome

# Windows CMD
set ENVIRONMENT=QA && npm test
set ENVIRONMENT=STAGE && npm run test:headed
set ENVIRONMENT=DEV && npm run test:chrome
```
