const { AllureRuntime } = require('allure-js-commons');
const { CucumberJSAllureFormatter } = require('allure-cucumberjs');
const fs = require('fs');
const path = require('path');

class AllureReporter extends CucumberJSAllureFormatter {
    constructor(options) {
        const resultsDir = path.join(process.cwd(), 'allure-results');
        const reportDir  = path.join(process.cwd(), 'allure-report');

        // We do not clean old results here so that multiple runs can be merged
        for (const dir of [resultsDir, reportDir]) {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        }

        super(options, new AllureRuntime({ resultsDir }), {
            labels: [
                { pattern: [/@feature:(.*)/], name: 'epic' },
                { pattern: [/@severity:(.*)/], name: 'severity' },
            ],
            links: [
                {
                    pattern: [/@issue=(.*)/],
                    type: 'issue',
                    urlTemplate: 'https://example.org/browse/%s',
                },
            ],
        });

        this.resultsDir = resultsDir;
        this.reportDir  = reportDir;
    }
}

module.exports = AllureReporter;
