using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using AIAgentPlatform.Models;
using AIAgentPlatform.Services;

namespace AIAgentPlatform.Pages;

public class DashboardModel : PageModel
{
    private readonly ILogger<DashboardModel> _logger;
    private readonly DataService _dataService;

    public DashboardModel(ILogger<DashboardModel> logger, DataService dataService)
    {
        _logger = logger;
        _dataService = dataService;
    }

    public bool IsLoggedIn { get; set; }
    public string CurrentCustomerName { get; set; } = string.Empty;
    public string CurrentCustomerId { get; set; } = string.Empty;
    public string SavedText { get; set; } = string.Empty;
    public DateTime? LastUpdated { get; set; }

    public void OnGet()
    {
        var customerId = HttpContext.Session.GetString("CustomerId");
        IsLoggedIn = !string.IsNullOrEmpty(customerId);

        if (IsLoggedIn)
        {
            CurrentCustomerId = customerId!;
            var customers = _dataService.GetCustomers();
            var customer = customers.FirstOrDefault(c => c.Id == CurrentCustomerId);
            CurrentCustomerName = customer?.Name ?? "Unknown";

            var dashboardData = _dataService.GetDashboardData(CurrentCustomerId);
            if (dashboardData != null)
            {
                SavedText = dashboardData.TextContent;
                LastUpdated = dashboardData.UpdatedAt;
            }
        }
    }

    public IActionResult OnPostSaveData(string textContent)
    {
        var customerId = HttpContext.Session.GetString("CustomerId");
        if (string.IsNullOrEmpty(customerId))
        {
            return RedirectToPage("/index");
        }

        _dataService.SaveDashboardDataForCustomer(customerId, textContent ?? string.Empty);
        return RedirectToPage();
    }

    public IActionResult OnPostLogout()
    {
        HttpContext.Session.Remove("CustomerId");
        return RedirectToPage("/index");
    }
}
