// AssessmentService/Services/DiabetesRiskCalculator.cs
using System.Net.Http.Json;
using Microsoft.AspNetCore.Http.HttpResults;
using SharedModels.Models;

namespace AssessmentService.Services;

public interface IDiabetesRiskCalculator
{
    Task<RiskAssessmentResult> CalculateRisk(RiskAssessmentRequest request);
}

public class DiabetesRiskCalculator : IDiabetesRiskCalculator
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<DiabetesRiskCalculator> _logger;

    public DiabetesRiskCalculator(HttpClient httpClient, ILogger<DiabetesRiskCalculator> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }

    public async Task<RiskAssessmentResult> CalculateRisk(RiskAssessmentRequest request)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync(
                "predict/diabetes", 
                new
                {
                    gender = request.Gender,
                    age = request.Age,
                    hypertension = request.Hypertension,
                    heart_disease = request.HeartDisease,
                    bmi = request.BMI,
                    hbA1c_level = request.HbA1cLevel,
                    blood_glucose_level = request.BloodGlucoseLevel,
                    smoking_history = request.SmokingHistory.ToString().ToLower()
                });

            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadFromJsonAsync<PythonPredictionResponse>();

            return new RiskAssessmentResult
            {
                PatientId = request.PatientId,
                AtRisk = result!.AtRisk,
                RiskProbability = result.RiskProbability,
                RiskLevel = result.RiskLevel,
                AssessmentDate = DateTime.UtcNow
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calculating diabetes risk");
            throw;
        }
    }

    private record PythonPredictionResponse
    {
        public bool AtRisk { get; init; }
        public double RiskProbability { get; init; }
        public required string RiskLevel { get; init; }
        public string? Recommendation { get; init; }
    }
}