# Create solution directory
mkdir HealthRiskMicroservices
cd HealthRiskMicroservices

# Create solution file
dotnet new sln --name HealthRiskMicroservices

# Create services
dotnet new webapi -n PatientService
dotnet new webapi -n AssessmentService
dotnet new webapi -n NotificationService

# Add projects to solution
dotnet sln add PatientService/PatientService.csproj
dotnet sln add AssessmentService/AssessmentService.csproj
dotnet sln add NotificationService/NotificationService.csproj

# Add shared class library (for DTOs)
dotnet new classlib -n SharedModels
dotnet sln add SharedModels/SharedModels.csproj


## after adding shared models make models folder in shared folder and add model classes


# Implement Patient Service
## Add required packages

cd PatientService
dotnet add package Microsoft.EntityFrameworkCore.InMemory
dotnet add package Microsoft.EntityFrameworkCore.SqlServer



## jis b servbice mai shared models use krny waha waha use this command 
dotnet add reference ../SharedModels/SharedModels.csproj

# Add Service Discovery and Communication Using MassTransit with RabbitMQ
# In each service
dotnet add package MassTransit
dotnet add package MassTransit.RabbitMQ

# Configure in each service's Program.cs:
builder.Services.AddMassTransit(x =>
{
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host("localhost", "/", h =>
        {
            h.Username("guest");
            h.Password("guest");
        });
        
        cfg.ConfigureEndpoints(context);
    });
});

# Add API Gateway
Create a new project:
dotnet new webapi -n ApiGateway
dotnet sln add ApiGateway/ApiGateway.csproj
cd ApiGateway
dotnet add package Ocelot

## Create ocelot.json:

{
  "Routes": [
    {
      "DownstreamPathTemplate": "/api/patients",
      "DownstreamScheme": "https",
      "DownstreamHostAndPorts": [
        {
          "Host": "localhost",
          "Port": 5001
        }
      ],
      "UpstreamPathTemplate": "/patients",
      "UpstreamHttpMethod": [ "GET", "POST" ]
    },
    {
      "DownstreamPathTemplate": "/api/assessment/diabetes",
      "DownstreamScheme": "https",
      "DownstreamHostAndPorts": [
        {
          "Host": "localhost",
          "Port": 5002
        }
      ],
      "UpstreamPathTemplate": "/assessments/diabetes",
      "UpstreamHttpMethod": [ "POST" ]
    }
  ],
  "GlobalConfiguration": {
    "BaseUrl": "https://localhost:5000"
  }
}

# update program.cs 
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Configuration.AddJsonFile("ocelot.json");
builder.Services.AddOcelot(builder.Configuration);

var app = builder.Build();

app.UseOcelot().Wait();
app.Run();

# Run the Services
## In separate terminals
cd PatientService && dotnet run --urls "http://localhost:5001"
cd AssessmentService && dotnet run --urls "http://localhost:5002"
cd NotificationService && dotnet run --urls "http://localhost:5003"
cd ApiGateway && dotnet run --urls "http://localhost:5000"

# Dockerize the Microservices
## Create docker-compose.yml:
add docker files for each service then make a universal docker-compose.yml

# Steps to run SQL Server container:

docker pull mcr.microsoft.com/mssql/server:2022-latest

docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=my_password0" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest
Use Azure SQL Edge container (smaller, for dev)

## Azure SQL Edge is a lightweight version of SQL Server, smaller in size (~500MB). Could be easier on disk space.

docker pull mcr.microsoft.com/azure-sql-edge
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=my_password0" -p 1433:1433 --name azuresqledge -d mcr.microsoft.com/azure-sql-edge

# create angular project 
ng new health-risk-ui --standalone --style=scss --routing

npm install @angular/material @angular/cdk @angular/flex-layout
npm install chart.js @types/chart.js
npm install ngx-toastr
