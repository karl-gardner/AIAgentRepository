using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AIAgentPlatform.Pages;

public class ContactModel : PageModel
{
    private readonly ILogger<ContactModel> _logger;

    public ContactModel(ILogger<ContactModel> logger)
    {
        _logger = logger;
    }

    public bool SubmitSuccess { get; set; }

    public void OnGet()
    {
        SubmitSuccess = false;
    }

    public IActionResult OnPostSubmitContact(string name, string email, string? company, string? industry, string message)
    {
        if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(message))
        {
            return RedirectToPage();
        }

        _logger.LogInformation("Contact form submitted: {Name}, {Email}, {Company}, {Industry}",
            name, email, company ?? "N/A", industry ?? "N/A");

        SubmitSuccess = true;
        return Page();
    }
}
