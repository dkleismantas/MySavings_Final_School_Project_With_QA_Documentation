# TECHIN_sudormrf

Baigiamasis projektas

## Setup prieš paleidžiant projektą

- #### Įsirašyti .NET 10 SDK

    https://dotnet.microsoft.com/en-us/download

- #### Įsirašyti React projekto dependencies

    *\*leidžiama iš ./frontend/ direktorijos*
    ```
    npm install
    ```

## Projekto paleidimas

#### 1. Docker konteinerio sukūrimo komanda

```
docker run --name MySavings -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 mysql:lts
```

#### 2. API projekto paleidimas

*\*leidžiama iš ./backend/MySavings.API/ direktorijos*
```
dotnet run
```

#### 3. React projekto paleidimas

*\*leidžiama iš ./frontend/ direktorijos*
```
npm run dev
```

### DB migracijos komandos

#### Migracijų atnaujinimas rankiniu būdu

```
dotnet ef database update
```

#### Migracijos pridėjimas

*\*leidžiama iš projekto root direktorijos*  
*\*Čia pavyzdys. Kuriant naują migraciją reikia pakeisti pavadinimą*
```
dotnet ef migrations add UpdateUserTable -p ./backend/MySavings.Data/ -s ./backend/MySavings.API/
```

### Swagger nuoroda

http://localhost:5141/swagger/index.html


### JWT debugger (skaityti JWT tokenams)

https://jwt.io


### Postman (tikrinti autorizavimui)

https://www.postman.com/downloads/

### Unit test paleidimas

*\*leidžiama iš ./backend/MysSavings.Services.Tests direktorijos*
```
dotnet test
```