<img alt="GoStack" src=".github/gostack.png" />
<p align="center">
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-rodar">Como rodar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>&nbsp;&nbsp;&nbsp;
  </p>

<br>

<p align="center">
  <img alt="gostack" src=".github/codigo.PNG" width="100%">
</p>

## GoStack - Back-end com Node.js

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/) - v14.4.0
- [Yarn](https://yarnpkg.com/) - 1.22.4
- [Npm](https://www.npmjs.com/) - 6.14.5
- [Docker](https://docs.docker.com/engine/reference/commandline/ps/) - 19.03.8
- [MongoDB](https://www.mongodb.com/)
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)

## 💻 Projeto

Uma API simples e sem banco de dados onde é possível executar a rota de listagem(com filtro), cadastro, alteração e exclusão.

Projeto rodando na porta 3333 e recebe e retorna JSON.

## 👩🏿‍💻 Rotas

- **`POST /sessions`**:
Envio:
```
{
    "email": "joao3@joao.com",
    "password": "123456"
}
```
Resposta:
```
{
    {
        "user": {
            "id": "a4222c53-b962-490b-9ecd-bad7382f4b6e",
            "name": "João Manguera 3 Modificado",
            "email": "joao3@joao.com",
            "avatar": "c312735789197cf5877f-99926566-Edi1XzDkRePh7IPFDWrVL2ZelVX7QNnX-cropped-5x7-browser.png",
            "created_at": "2020-11-07T18:50:54.251Z",
            "updated_at": "2020-12-18T03:37:42.264Z",
            "avatar_url": "http://192.168.0.12:3333/files/c312735789197cf5877f-99926566-Edi1XzDkRePh7IPFDWrVL2ZelVX7QNnX-cropped-5x7-browser.png"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDkyMDA3NDEsImV4cCI6MTYwOTI4NzE0MSwic3ViIjoiYTQyMjJjNTMtYjk2Mi00OTBiLTllY2QtYmFkNzM4MmY0YjZlIn0.MrJTbEFDq9q3HC6gPc_po5bBmdKoHp-rdrT0NIRD1t4"
    }
}
```

- **`GET //appointments/me`**: Precisa está logado
Envio:
```
?year=2020&month=12&day=2
```
Resposta:
```
[
    {
        "id": "94735754-0bb7-4604-9070-4b2edbe556e6",
        "provider_id": "a4222c53-b962-490b-9ecd-bad7382f4b6e",
        "user_id": "2b19b019-2801-4eb8-823f-d38bb321b07b",
        "date": "2020-12-22T14:00:00.000Z",
        "created_at": "2020-12-19T00:48:11.021Z",
        "updated_at": "2020-12-19T00:48:11.021Z",
        "user": {
            "id": "2b19b019-2801-4eb8-823f-d38bb321b07b",
            "name": "João User - 5",
            "email": "joao5@joao.com",
            "avatar": "f930319be70e2e419157-afafds.jpg",
            "created_at": "2020-11-21T04:43:17.846Z",
            "updated_at": "2020-12-24T01:54:19.061Z",
            "avatar_url": "http://192.168.0.12:3333/files/f930319be70e2e419157-afafds.jpg"
        }
    }
]
```

- **`POST /appointments`**: Precisa está logado
Envio:
```
{
    "provider_id": "2b19b019-2801-4eb8-823f-d38bb321b07b",
    "date": "2020-12-22 15:00:00"
}
```
Resposta:
```
{
    "provider_id": "2b19b019-2801-4eb8-823f-d38bb321b07b",
    "user_id": "a4222c53-b962-490b-9ecd-bad7382f4b6e",
    "date": "2020-12-29T19:00:00.000Z",
    "id": "25098acc-1214-44c8-adf3-3153fd61e79b",
    "created_at": "2020-12-29T03:15:20.712Z",
    "updated_at": "2020-12-29T03:15:20.712Z"
}
```

- **`POST /users`**:
Envio:
```
{
    "name": "João Manguera 6",
    "email": "joao8@joao.com",
    "password": "123456"
}
```
Resposta:
```
{
    "name": "João Manguera 6",
    "email": "joao8@joao.com",
    "id": "3551e11c-692f-47e0-bfa0-5ebe4c96c795",
    "created_at": "2020-12-29T03:16:17.654Z",
    "updated_at": "2020-12-29T03:16:17.654Z",
    "avatar_url": null
}
```

- **`PATCH /users/avatar`**: Precisa está logado
Envio:
```
{
    avatar: FILE 99926566-Edi1XzDkRePh7IPFDWrVL2ZelVX7QNnX-cropped-5x7-browser.png
}
```
Resposta:
```
{
    "id": "a4222c53-b962-490b-9ecd-bad7382f4b6e",
    "name": "João Manguera 3 Modificado",
    "email": "joao3@joao.com",
    "avatar": "cb3417d226f2dec7b521-99926566-Edi1XzDkRePh7IPFDWrVL2ZelVX7QNnX-cropped-5x7-browser.png",
    "created_at": "2020-11-07T18:50:54.251Z",
    "updated_at": "2020-12-29T03:18:23.083Z",
    "avatar_url": "http://192.168.0.12:3333/files/cb3417d226f2dec7b521-99926566-Edi1XzDkRePh7IPFDWrVL2ZelVX7QNnX-cropped-5x7-browser.png"
}
```

- **`POST /password/forgot`**:
Envio:
```
{
    "email": "joao5@joao.com"
}
```
Resposta:
```
```

- **`POST /password/reset`**:
Envio:
```
{
    "password": "654321",
    "password_confirmation": "654321",
    "token": "0f091599-db0e-4500-8fd6-a1238a482c6c"
}
```
Resposta:
```
```

- **`GET /profile`**: Precisa está logado
Envio:
```
{
    "password": "654321",
    "password_confirmation": "654321",
    "token": "0f091599-db0e-4500-8fd6-a1238a482c6c"
}
```
Resposta:
```
{
    "id": "a4222c53-b962-490b-9ecd-bad7382f4b6e",
    "name": "João Manguera 3 Modificado",
    "email": "joao3@joao.com",
    "avatar": "cb3417d226f2dec7b521-99926566-Edi1XzDkRePh7IPFDWrVL2ZelVX7QNnX-cropped-5x7-browser.png",
    "created_at": "2020-11-07T18:50:54.251Z",
    "updated_at": "2020-12-29T03:18:23.083Z",
    "avatar_url": "http://192.168.0.12:3333/files/cb3417d226f2dec7b521-99926566-Edi1XzDkRePh7IPFDWrVL2ZelVX7QNnX-cropped-5x7-browser.png"
}
```

- **`PUT /profile`**: Precisa está logado
Envio:
```
{
    "name": "João Manguera 3 Modificado",
    "email": "joao3@joao.com",
    "password": "123456",
    "old_password": "654321"
}
```
Resposta:
```
{
    "id": "a4222c53-b962-490b-9ecd-bad7382f4b6e",
    "name": "João Manguera 3",
    "email": "joao3@joao.com",
    "avatar": "cb3417d226f2dec7b521-99926566-Edi1XzDkRePh7IPFDWrVL2ZelVX7QNnX-cropped-5x7-browser.png",
    "created_at": "2020-11-07T18:50:54.251Z",
    "updated_at": "2020-12-29T03:28:42.928Z",
    "avatar_url": "http://192.168.0.12:3333/files/cb3417d226f2dec7b521-99926566-Edi1XzDkRePh7IPFDWrVL2ZelVX7QNnX-cropped-5x7-browser.png"
}
```

- **`GET /providers`**: Precisa está logado
Envio:
```
```
Resposta:
```
[
    {
        "id": "73333360-a80f-4e0f-89ac-fceb8e894e11",
        "name": "João Manguera",
        "email": "joao@joao.com",
        "avatar": null,
        "created_at": "2020-11-07T18:41:08.177Z",
        "updated_at": "2020-11-07T18:41:08.177Z",
        "avatar_url": null
    },
    {
        "id": "a44a3357-cd80-4480-8874-fcb0a351eebb",
        "name": "João Manguera 2",
        "email": "joao2@joao.com",
        "avatar": null,
        "created_at": "2020-11-07T18:49:31.544Z",
        "updated_at": "2020-11-07T18:49:31.544Z",
        "avatar_url": null
    }
]
```

- **`GET /providers/:ID/month-availability`**: Precisa está logado
Envio:
```
?year=2020&month=12
```
Resposta:
```
[
    {
        "day": 1,
        "available": false
    },
    {
        "day": 2,
        "available": false
    },
    {
        "day": 3,
        "available": false
    },
    {
        "day": 4,
        "available": false
    },
    {
        "day": 5,
        "available": false
    },
    {
        "day": 6,
        "available": false
    },
    {
        "day": 7,
        "available": false
    },
    {
        "day": 8,
        "available": false
    },
    {
        "day": 9,
        "available": false
    },
    {
        "day": 10,
        "available": false
    },
    {
        "day": 11,
        "available": false
    },
    {
        "day": 12,
        "available": false
    },
    {
        "day": 13,
        "available": false
    },
    {
        "day": 14,
        "available": false
    },
    {
        "day": 15,
        "available": false
    },
    {
        "day": 16,
        "available": false
    },
    {
        "day": 17,
        "available": false
    },
    {
        "day": 18,
        "available": false
    },
    {
        "day": 19,
        "available": false
    },
    {
        "day": 20,
        "available": false
    },
    {
        "day": 21,
        "available": false
    },
    {
        "day": 22,
        "available": false
    },
    {
        "day": 23,
        "available": false
    },
    {
        "day": 24,
        "available": false
    },
    {
        "day": 25,
        "available": false
    },
    {
        "day": 26,
        "available": false
    },
    {
        "day": 27,
        "available": false
    },
    {
        "day": 28,
        "available": true
    },
    {
        "day": 29,
        "available": true
    },
    {
        "day": 30,
        "available": true
    },
    {
        "day": 31,
        "available": true
    }
]
```

- **`GET /providers/:ID/providers/day-availability`**: Precisa está logado
Envio:
```
?year=2020&month=12&day=18
```
Resposta:
```
[
    {
        "hour": 8,
        "available": false
    },
    {
        "hour": 9,
        "available": false
    },
    {
        "hour": 10,
        "available": false
    },
    {
        "hour": 11,
        "available": false
    },
    {
        "hour": 12,
        "available": false
    },
    {
        "hour": 13,
        "available": false
    },
    {
        "hour": 14,
        "available": false
    },
    {
        "hour": 15,
        "available": false
    },
    {
        "hour": 16,
        "available": false
    },
    {
        "hour": 17,
        "available": false
    }
]
```

## 🚀 Como Rodar

- Clone o projeto.
- Entre na pasta do projeto e rode yarn install (pode usar npm install de acordo com a sua configuração).
- Rodar o Postgres com docker:
docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
- Criar banco gostack_postgres.
- Rodar o MongoDB com docker:
docker run --name mongodb -p 27017:27017 -d -t mongo
- Criar banco gobarber.
- Rodar o Redis com docker:
docker run --name redis -p 6379:6379 -d -t redis:alpine
- Rodar migrates: yarn typeorm migration:run
- yarn dev:server.

## 🤔 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## 📝 Licença

Esse projeto está sob a licença MIT.
