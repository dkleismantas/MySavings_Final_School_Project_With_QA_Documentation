# ModernTests

A new Selenium/JUnit 5 UI test suite for the current MySavings React application.

## Running

1. Start the MySavings API and React frontend.
2. Make sure a test user exists.
3. From the `ModernTests` directory, run:

```powershell
mvn test -DtestEmail=user41314@example.com -DtestPassword=Password123!
```

The default frontend address is `http://localhost:5173`. It can be changed with:

```powershell
mvn test -DbaseUrl=http://localhost:5173
```

## Test Coverage

- `AuthTest` – login, logout, login validation, password mismatch.
- `DashboardTest` – goal sort selection and name filter.
- `GoalCreationTest` – new goal modal and its required fields.

Last run result: **7/7 tests passed (100%)**.

Tests run with JUnit 5 and Selenium 4.44.0, using the Chrome browser in `--headless=new` mode by default. `-Dheadless=false` can be used to watch the tests run in a browser window.

The old `Automatic_tests` and `Automatic_tests_2` projects (hand-written, for an earlier UI version) have been replaced by this suite and removed.
