FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy all project files (keeping layer caching for restore)
COPY AssessmentService/AssessmentService.csproj AssessmentService/
COPY SharedModels/SharedModels.csproj SharedModels/
RUN dotnet restore AssessmentService/AssessmentService.csproj

# Copy the rest of the code
COPY . .

WORKDIR /src/AssessmentService
RUN dotnet publish AssessmentService.csproj -c Release -o /app/publish /p:UseAppHost=false

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "AssessmentService.dll"]
