namespace AIAgentPlatform.Models;

public class DashboardData
{
    public string CustomerId { get; set; } = string.Empty;
    public string TextContent { get; set; } = string.Empty;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
