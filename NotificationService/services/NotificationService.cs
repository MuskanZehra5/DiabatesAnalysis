// AssessmentService/Services/DiabetesRiskCalculator.cs
using System.Net.Http.Json;
using Microsoft.AspNetCore.Http.HttpResults;
using SharedModels.Models;

namespace NotificationService.Services;

public interface INotificationService
{
    Task<Notification> SendNotification(Notification notification);
}

public class EmailNotificationService : INotificationService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<EmailNotificationService> _logger;
    public EmailNotificationService(HttpClient httpClient, ILogger<EmailNotificationService> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }
    public Task<Notification> SendNotification(Notification notification)
    {
        Console.WriteLine($"Sending email to patient {notification.PatientId}: {notification.Message}");
        return (Task<Notification>)Task.CompletedTask;
    }
}