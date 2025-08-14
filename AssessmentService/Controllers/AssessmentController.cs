using AssessmentService.Services;
using Microsoft.AspNetCore.Mvc;
using SharedModels.Models;

namespace AssessmentService.Controllers;

[ApiController]
[Route("[controller]")]
public class AssessmentController : ControllerBase
{
    private readonly IDiabetesRiskCalculator _calculator;
    private readonly HttpClient _httpClient;
    private readonly ILogger<AssessmentController> _logger;

    public AssessmentController(IDiabetesRiskCalculator calculator, IHttpClientFactory httpClientFactory)
    {
        _calculator = calculator;
        _httpClient = httpClientFactory.CreateClient();
    }

    [HttpPost("diabetes")]
    public async Task<ActionResult<RiskAssessmentResult>> AssessDiabetesRiskAsync(RiskAssessmentRequest request)
    {
         var result = await _calculator.CalculateRisk(request);
        _logger.Log(LogLevel.Information, "Assess Diabetes");
        return Ok(result);
    }
}
