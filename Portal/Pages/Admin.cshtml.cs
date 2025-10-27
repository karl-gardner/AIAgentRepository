using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using AIAgentPlatform.Models;
using AIAgentPlatform.Services;

namespace AIAgentPlatform.Pages;

public class AdminModel : PageModel
{
    private readonly ILogger<AdminModel> _logger;
    private readonly DataService _dataService;

    public AdminModel(ILogger<AdminModel> logger, DataService dataService)
    {
        _logger = logger;
        _dataService = dataService;
    }

    public List<Customer> Customers { get; set; } = new();

    public void OnGet()
    {
        Customers = _dataService.GetCustomers();
    }

    public IActionResult OnPostAddCustomer(string name, string email)
    {
        if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(email))
        {
            return RedirectToPage();
        }

        var newCustomer = new Customer
        {
            Name = name,
            Email = email
        };

        _dataService.AddCustomer(newCustomer);
        return RedirectToPage();
    }

    public IActionResult OnPostLoginAsCustomer(string customerId)
    {
        if (string.IsNullOrEmpty(customerId))
        {
            return RedirectToPage();
        }

        HttpContext.Session.SetString("CustomerId", customerId);

        return RedirectToPage("/dashboard");
    }
}
