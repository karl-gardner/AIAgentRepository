using System.Text.Json;
using AIAgentPlatform.Models;

namespace AIAgentPlatform.Services;

public class DataService
{
    private readonly string _dataPath;
    private readonly string _customersFile;
    private readonly string _dashboardFile;

    public DataService()
    {
        _dataPath = Path.Combine(Directory.GetCurrentDirectory(), "Data");
        _customersFile = Path.Combine(_dataPath, "customers.json");
        _dashboardFile = Path.Combine(_dataPath, "dashboard.json");

        if (!Directory.Exists(_dataPath))
        {
            Directory.CreateDirectory(_dataPath);
        }

        InitializeDefaultData();
    }

    private void InitializeDefaultData()
    {
        if (!File.Exists(_customersFile))
        {
            var defaultCustomers = new List<Customer>
            {
                new Customer { Name = "John Doe", Email = "john@example.com" },
                new Customer { Name = "Jane Smith", Email = "jane@example.com" },
                new Customer { Name = "Bob Johnson", Email = "bob@example.com" }
            };
            SaveCustomers(defaultCustomers);
        }

        if (!File.Exists(_dashboardFile))
        {
            var defaultDashboard = new Dictionary<string, DashboardData>();
            SaveDashboardData(defaultDashboard);
        }
    }

    public List<Customer> GetCustomers()
    {
        if (!File.Exists(_customersFile))
            return new List<Customer>();

        var json = File.ReadAllText(_customersFile);
        return JsonSerializer.Deserialize<List<Customer>>(json) ?? new List<Customer>();
    }

    public void SaveCustomers(List<Customer> customers)
    {
        var json = JsonSerializer.Serialize(customers, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(_customersFile, json);
    }

    public void AddCustomer(Customer customer)
    {
        var customers = GetCustomers();
        customers.Add(customer);
        SaveCustomers(customers);
    }

    public DashboardData? GetDashboardData(string customerId)
    {
        var allData = GetAllDashboardData();
        allData.TryGetValue(customerId, out var data);
        return data;
    }

    public void SaveDashboardDataForCustomer(string customerId, string textContent)
    {
        var allData = GetAllDashboardData();
        allData[customerId] = new DashboardData
        {
            CustomerId = customerId,
            TextContent = textContent,
            UpdatedAt = DateTime.UtcNow
        };
        SaveDashboardData(allData);
    }

    private Dictionary<string, DashboardData> GetAllDashboardData()
    {
        if (!File.Exists(_dashboardFile))
            return new Dictionary<string, DashboardData>();

        var json = File.ReadAllText(_dashboardFile);
        return JsonSerializer.Deserialize<Dictionary<string, DashboardData>>(json) ?? new Dictionary<string, DashboardData>();
    }

    private void SaveDashboardData(Dictionary<string, DashboardData> data)
    {
        var json = JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(_dashboardFile, json);
    }
}
