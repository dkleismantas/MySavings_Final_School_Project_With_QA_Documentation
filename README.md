# TECHIN_sudormrf
Baigiamasis projektas


## Projekto paleidimas

### 1. Docker konteinerio sukūrimo komanda
```
docker run --name MySavings -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 mysql:lts
```
### 2. API projekto paleidimas
\*leidžiama iš ./MySavings.API/ direktorijos
```
dotnet run
```

### 3. React projekto paleidimas
\*leidžiama iš ./frontend/ direktorijos, prieš tai dar paleisti komandą npm install, kad parsisiustų visi npm packages
```
npm install
npm run dev
```

## DB migracijos komandos
### Migracijų atnaujinimas rankiniu būdu
```
dotnet ef database update
```
### Migracijos pridėjimas
\*Čia pavyzdys. Kuriant naują migraciją reikia pakeisti pavadinimą
\*leidžiama iš *projekto* root direktorijos
```
dotnet ef migrations add AddTestMigration -p MySavings.API/ -s MySavings.Data/
```

## Swagger nuoroda
http://localhost:5141/swagger/index.html
