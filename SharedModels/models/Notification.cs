using System;

namespace SharedModels.Models
{
    public class Notification
    {
        public int PatientId { get; set; }
        public string Message { get; set; } = string.Empty;
        public DateTime date { get; set; }
        public string Channel { get; set; } = "Email"; // Email, SMS, etc.
    }
}