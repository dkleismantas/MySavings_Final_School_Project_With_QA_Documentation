# MySavings

Final project (TECHIN).

## Setup before running the project

- #### Install the .NET 10 SDK

    https://dotnet.microsoft.com/en-us/download

- #### Install the React project dependencies

    *\*run from the ./frontend/ directory*
    ```
    npm install
    ```

    If `npm run dev` then fails with an error about a missing native module (for example something mentioning `lightningcss` or a `@tailwindcss/oxide-*` binary), run:
    ```
    npm audit fix
    ```
    This is a known npm issue with platform-specific optional dependencies: Tailwind CSS v4 (via `lightningcss` and `@tailwindcss/oxide`) ships a separate native binary package per OS/architecture, and a plain `npm install` doesn't always resolve the right one for your machine on the first try. `npm audit fix` re-resolves the dependency tree and fixes it.

## Running the project

#### 1. Command to create the database Docker container

```
docker run --name MySavings -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 mysql:lts
```

#### 2. Running the API project

*\*run from the ./backend/MySavings.API/ directory*
```
dotnet run
```

#### 3. Running the React project

*\*run from the ./frontend/ directory*
```
npm run dev
```

#### 4. Command to create the Seq (logging) Docker container

```
docker run -d --name seq -p 5341:5341 -p 8081:80 -e ACCEPT_EULA=Y -e SEQ_FIRSTRUN_NOAUTHENTICATION=True datalust/seq:latest
```

### Database migration commands

#### Applying migrations manually

```
dotnet ef database update
```

#### Adding a migration

*\*run from the project root directory*
*\*This is an example — rename it when creating a new migration*
```
dotnet ef migrations add UpdateUserTable -p ./backend/MySavings.Data/ -s ./backend/MySavings.API/
```

### Swagger link

http://localhost:5141/swagger/index.html

### JWT debugger (for reading JWT tokens)

https://jwt.io

### Postman (for testing authorization)

https://www.postman.com/downloads/

### Serilog (log server)

http://localhost:8081/

### Running unit tests

*\*run from the ./backend/MySavings.Services.Tests directory*
```
dotnet test
```
