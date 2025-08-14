# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0-preview AS build
WORKDIR /src

COPY ["ApiGateway/ApiGateway.csproj", "ApiGateway/"]
COPY ["SharedModels/SharedModels.csproj", "SharedModels/"]

RUN dotnet restore "ApiGateway/ApiGateway.csproj"

COPY . .

WORKDIR "/src/ApiGateway"
RUN dotnet build "ApiGateway.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ApiGateway.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0-preview
WORKDIR /app

COPY --from=publish /app/publish .

COPY ["ApiGateway/ocelot.json", "."]

HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost/health || exit 1

ENTRYPOINT ["dotnet", "ApiGateway.dll"]
