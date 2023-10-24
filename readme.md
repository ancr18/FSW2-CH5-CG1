# Challenge 5 - Car Management API

Pada Challenge kali ini membuat CRUD menggunakan sebuah database

## Duplikat porjek dan jalankan

1. Clone Repositori github

```bash
https://github.com/ancr18/FSW2-CH5-CG1.git
```

2. Install package

```bash
npm install
```

3. Membuat file .env berdasarkan .env.example

```bash
DB_USERNAME= name_user_db
DB_PASSWORD= password_db
DB_NAME= name_db
PORT= 8000
JWT_SECRET=

IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL=
```

4. Perintah untuk membuat database baru pada sequelize

```bash
npx sequelize db:create
```

5. Perintah untuk migrate table pada sequelize

```bash
npx sequelize db:migrate
```

6. Perintah untuk membuat seeder

```bash
npx sequelize-cli db:seed:all
```

7. Menjalankan projek

```bash
npm run dev
```

8. Buka browser untuk buka OpenAPI Swagger

```bash
http://localhost:8000/api-docs
```

## Routs

#### Routes API

```bash
http://localhost:8000/api/v1
```

#### API AUTH

- [POST] Registrasi Member => /auth/register

```bash
http://localhost:8000/api/v1/auth/register
```

- [POST] Login User => /auth/login

```bash
http://localhost:8000/api/v1/auth/login
```

- [GET] Check Token /auth/me

```bash
http://localhost:8000/api/v1/auth/me
```

#### API USER

- [GET] Find All User => /users/

```bash
http://localhost:8000/api/v1/users/
```

- [GET] Find User by ID => /users:id

```bash
http://localhost:8000/api/v1/users/5
```

- [POST] Create Admin => /users/

```bash
http://localhost:8000/api/v1/users/
```

- [PATCH] Update User => /users/:id

```bash
http://localhost:8000/api/v1/users/5
```

- [DELETE] Delete User => /users/:id

```bash
http://localhost:8000/api/v1/users/5
```

#### API CARS

- [GET] Find All Cars => /cars/

```bash
http://localhost:8000/api/v1/cars/
```

- [GET] Find All Cars Available => /cars/avail

```bash
http://localhost:8000/api/v1/cars/avail
```

- [GET] Find User by ID => /cars:id

```bash
http://localhost:8000/api/v1/cars/5
```

- [POST] Create Car => /cars/

```bash
http://localhost:8000/api/v1/cars/
```

- [PATCH] Update User => /users/:id

```bash
http://localhost:8000/api/v1/users/5
```

- [DELETE] Delete User => /users/:id

```bash
http://localhost:8000/api/v1/users/5
```

## Akun Super Admin

Akun super admin adalah akun yang memiliki hak akses penuh terhadap aplikasi

```
email: superadmin1@gmail.com
password: superadmin
```

## Database Diagram

Database menggunakan PostgreSQL

![[Database]](public/img/db-diagram.png)
