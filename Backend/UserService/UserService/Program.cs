using Microsoft.EntityFrameworkCore;
using UserService.Database;
using UserService.Models;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<InstaDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));



// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<UsersService>();

// Set memory cache distribution
builder.Services.AddDistributedMemoryCache();

// Add sessions
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddSession(options =>
            options.IdleTimeout = TimeSpan.FromHours(24));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseSession();

app.MapControllers();

app.Run();
