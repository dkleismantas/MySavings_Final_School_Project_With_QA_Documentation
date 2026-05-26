using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySavings.Services.SavingsGoal;
using System.Security.Claims;
 
namespace MySavings.API.Controllers;
 
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SavingsGoalController : ControllerBase
{
    private readonly ISavingsGoalService _savingsGoalService;
 
    public SavingsGoalController(ISavingsGoalService savingsGoalService)
    {
        _savingsGoalService = savingsGoalService;
    }
 
    [HttpGet("goals")]
    public async Task<IActionResult> GetGoals()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
 
        if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            return Unauthorized();
 
        var goals = await _savingsGoalService.GetGoalsAsync(userId);
 
        return Ok(goals);
    }
}