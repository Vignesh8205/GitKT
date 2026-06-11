module.exports = {
    default: {
        require: ['features/step-definitions/*.js', 'features/support/*.js'],
        format: ['progress-bar', 'html:cucumber-report.html', './utils/reporter.js'],
        formatOptions: {
            snippetInterface: 'async-await',
            allure: {
                resultsDir: './allure-results'
            }
        }
    },
    allure: {
        require: ['features/step-definitions/*.js', 'features/support/*.js'],
        format: ['progress-bar', './utils/reporter.js'],
        formatOptions: {
            snippetInterface: 'async-await',
            allure: {
                resultsDir: './allure-results'
            }
        }
    },
    parallel: {
        require: ['features/step-definitions/*.js', 'features/support/*.js'],
        format: ['progress-bar', './utils/reporter.js'],
        formatOptions: {
            snippetInterface: 'async-await',
            allure: {
                resultsDir: './allure-results'
            }
        },
        parallel:  2
    }
};