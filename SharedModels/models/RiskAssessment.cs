using System;
using System.ComponentModel.DataAnnotations;

namespace SharedModels.Models
{
    public class RiskAssessmentRequest
    {
        public int PatientId { get; set; }
        public bool Gender { get; set; }
        public bool Hypertension { get; set; }
        public bool HeartDisease { get; set; }
        public SmokingHistory SmokingHistory { get; set; }
        [Range(10, 100)]
        public double BMI { get; set; }
        [Range(3, 15)]
        public double HbA1cLevel { get; set; }
        [Range(50, 300)]
        public double BloodGlucoseLevel { get; set; }
        [Range(1, 120)]
        public int Age { get; set; }
    }
public enum SmokingHistory
{
    Never,
    Former,
    Current,
    Ever,
    NotCurrent
}
    public class RiskAssessmentResult
    {
        public int PatientId { get; set; }
        public bool AtRisk { get; set; }
        public double RiskProbability { get; set; }
        public string RiskLevel { get; set; } = string.Empty;
        public string Recommendation { get; set; } = string.Empty;
        public DateTime AssessmentDate { get; set; }
    }
}