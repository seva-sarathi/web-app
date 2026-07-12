# Seva Saarathi 
This is a AGV Intranet
- **Next.js (frontend)**
- **FastAPI (backend)**
- **PostgreSQL**
- **Redis**
- **Nginx**.  

All services run inside Docker containers for consistency, portability, and easy deployment.

---

## 📂 Project Structure

```text
sevasarathi/
├── frontend/        # Next.js app + Dockerfile
├── backend/         # FastAPI app + Dockerfile
├── nginx/           # Reverse proxy config
├── docker-compose.yml
└── .env             # Environment variables (optional)
```

---

## ⚙️ Prerequisites

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop)  
- Enable **WSL2** if prompted (Windows users)  
- Verify installation:

```bash
docker --version
docker compose version
```

## 🛠️ Setup Instructions

### 1. Create Project Folders
```bash
mkdir sevasarathi && cd sevasarathi
mkdir frontend backend nginx
```
### 2. Frontend (Next.js)
```bash
cd frontend
npx create-next-app@latest .
# Choose: TypeScript, ESLint, Tailwind, App Router, Turbopack
cd ..
```

#### _Dockerfile (frontend/Dockerfile):_
```dockerfile
dockerfile
FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### 3. Backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install fastapi uvicorn
```

### dockerfile
```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 4. Nginx Reverse Proxy
### nginx/nginx.conf:

```nginx
events {}
http {
  server {
    listen 80;
    location / {
      proxy_pass http://frontend;
    }
    location /api/ {
      proxy_pass http://backend/;
    }
  }
}
```

## 5. Docker Compose
### docker-compose.yml:

```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"

  backend:
    build: ./backend
    ports:
      - "8000:8000"

  postgres:
    image: postgres:17
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: sevasarathi
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - "6379:6379"

  nginx:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
```

## ▶️ Running the Stack
#### First Build
```bash
docker compose up --build
```
#### Start/Stop
```bash
docker compose up -d     # Start in background
docker compose stop      # Stop containers
docker compose start     # Restart stopped containers
docker compose down      # Remove containers
```
#### Logs & Status
```bash
docker ps
docker compose logs -f backend
docker compose logs postgres
```
## 🧰 Useful Commands

| Task              | Command                          |
|-------------------|----------------------------------|
| Build & start all | `docker compose up --build`      |
| Start existing    | `docker compose up`              |
| Detached mode     | `docker compose up -d`           |
| Stop containers   | `docker compose stop`            |
| Restart service   | `docker compose restart backend` |
| Remove containers | `docker compose down`            |
| Show running      | `docker ps`                      |
| Logs              | `docker compose logs -f backend` |
| Shell inside      | `docker exec -it backend bash`   |
