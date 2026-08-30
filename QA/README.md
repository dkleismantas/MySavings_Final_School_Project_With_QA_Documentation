# QA Documentation

This folder contains the testing materials for the MySavings project.

## Structure

- `01-Requirements/` – functional and non-functional project requirements.
- `02-Test-Planning/` – test strategy and Sprint 1 and Sprint 2 test plans.
- `03-Test-Design/` – test scenarios, checklist, and equivalence partitioning tables.
- `04-Test-Execution/` – final summary of test results and defects.
- `05-Test-Automation/Bruno/` – Bruno API test collection and its run instructions.
- `05-Test-Automation/Selenium/` – Selenium automated test projects.
- `06-Test-Evidence/Figma/` – Figma design materials.

## Test Results

The final testing for the project covers both levels:

- Bruno API tests: 217 tests executed, 217 passed, 0 failed, 100% pass rate.
- Selenium UI tests: 7 UI scenarios executed, 7 passed, 0 failed, 100% pass rate.
- Total: 224 tests executed, 224 passed, 0 failed.

Previously found defects are listed in the test execution report and marked as resolved.

## Selenium UI Tests

The Selenium tests live in a separate project at `05-Test-Automation/Selenium/ModernTests/`.

- `AuthTest` – 4 tests: login, logout, empty form validation, and password mismatch.
- `DashboardTest` – 2 tests: sort selection and goal search by name.
- `GoalCreationTest` – 1 test: verification of the new goal modal and its required fields.

Selenium run result: **7/7 PASS (100%)**.

The old `Automatic_tests` and `Automatic_tests_2` projects are kept as an earlier learning version and are not included in the final 7 Selenium test result.
