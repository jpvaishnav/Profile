Getting started with Docker for .NET applications is simpler than you might think.

## What is Docker?

Docker packages your application and all its dependencies into a **container** — a lightweight, standalone unit that runs the same everywhere.

## Creating a Dockerfile

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY *.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "MyApp.dll"]
```

## Build and Run

```bash
docker build -t myapp .
docker run -p 8080:80 myapp
```

## Key Concepts

- **Image**: A read-only template (like a class)
- **Container**: A running instance of an image (like an object)
- **Volume**: Persistent storage that survives container restarts
- **Multi-stage builds**: Keep your final image small by separating build and runtime stages
