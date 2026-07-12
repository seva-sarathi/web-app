## Folder Structure
```text
backend/
│
├── app/
│   ├── core/
│   │   ├── config.py
│   │   └── database.py
│   │
│   ├── models/
│   │
│   ├── schemas/
│   │
│   ├── repositories/
|   |       user_repository.py
│   │
│   ├── services/
|   |       auth_service.py
|   |       user_service.py
|   |       controller_service.py
│   │
│   ├── api/
│   │      auth.py
|   |      users.py
|   |      controllers.py
|   |      admin.py
    ├── dependencies/
            current_user.py
            role_checker.py

│   └── main.py
│
├── .env
├── requirements.txt
└── Dockerfile

```