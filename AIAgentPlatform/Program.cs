using AIAgentPlatform.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddSingleton<DataService>();

builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true;
    options.LowercaseQueryStrings = false;
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseSession();

app.Use(async (context, next) =>
{
    var host = context.Request.Host.Host.ToLower();
    var path = context.Request.Path.Value?.ToLower() ?? "/";

    if (!host.Contains("localhost"))
    {
        if (host.StartsWith("app."))
        {
            if (path == "/")
            {
                context.Response.Redirect("/login");
                return;
            }

            if (!path.StartsWith("/login") && !path.StartsWith("/dashboard") && !path.StartsWith("/admin"))
            {
                context.Response.Redirect("/login");
                return;
            }
        }
        else if (host.StartsWith("www.") || host == "callflow.com")
        {
            if (!path.Equals("/") && !path.StartsWith("/contact"))
            {
                context.Response.Redirect("/");
                return;
            }
        }
    }

    await next();
});

app.UseAuthorization();

app.MapStaticAssets();
app.MapRazorPages()
   .WithStaticAssets();

app.Run();
