# Proyecto NOC

# dev

1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno

```
PORT=3000

MAILER_SERVICE=
MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=

MONGO_URL=
MONGO_DB_NAME=
MONGO_USER=
MONGO_PASS=

POSTGRES_URL=
POSTGRES_USER=
POSTGRES_DB=
```
3. Ejecutar el comando ```npm install```
4. Leventas las bases de datos con el comando ```docker compose up -d```
5. Ejecutar el comando 
```
npx prisma migrate dev --name init
```
6. Ejecutar el comando
```
npx prisma generate
```
6. Ejecutar ```npm run dev```