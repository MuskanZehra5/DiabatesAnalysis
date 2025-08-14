using Microsoft.AspNetCore.Mvc;
using NotificationService.Services;
using SharedModels.Models;

namespace NotificationService.Controllers;

[ApiController]
[Route("[controller]")]
public class NotificationController : ControllerBase
{

    private readonly INotificationService _notificationService;

    public NotificationController(INotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    [HttpPost]
    public async Task<IActionResult> SendNotification(Notification notification)
    {
        await _notificationService.SendNotification(notification);
        return Ok();
    }
}
