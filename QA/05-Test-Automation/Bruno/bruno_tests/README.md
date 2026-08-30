## Instructions

1. Open the Bruno application
2. Open the MySavings_Tests collection
3. Select Collection Environments: Local
4. Run the tests

## Before running the tests

- the API project must be running;
- MySQL must be running with a prepared test database;
- the `Local` environment must be selected;
- `userPassword` is used to log in newly created test users;
- `adminToken`, `user1Token`, `user2Token`, and `user3Token` are obtained by running the corresponding login tests;
- `invalidToken` is defined in `Local.yml` and used for unauthorized request tests.

When run against a clean database, the tests create their own test users and goals, and store the created IDs in environment variables. User creation tests must run before goal, deposit, and wallet tests, and login tests must run before any tests that need a token.

The admin account must be prepared with the `admin` role, since the public registration endpoint only assigns the `user` role to new users. After running the `create-valid-admin` test, select the `MySavings` database in your MySQL tool and run:

```sql
UPDATE `Users`
SET `Role` = 'admin'
WHERE `Id` = 1;
```

This query must be run before the `login-valid-admin` test. It assumes the admin user has been assigned ID `1`, as specified in `Local.yml`. If the DB already has other users, use the actual admin user's ID in the `WHERE` clause.

The collection's tests modify data, so it is recommended to run them against a prepared test database and restore its initial state before running the full suite again.
