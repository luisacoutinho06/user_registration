using Application.Interfaces;
using Domain.Interfaces;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Application.Handlers.Users;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMediatR(cfg =>
{
    // Passa o assembly onde os handlers estão
    cfg.RegisterServicesFromAssembly(typeof(CreateUserHandler).Assembly);
}); 

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Injeção de dependência
// Registra todos os repositórios que implementam IRepositoryBase<T>
builder.Services.Scan(scan => scan
    .FromAssembliesOf(typeof(IRepositoryBase<>))
    .AddClasses(classes => classes.AssignableTo(typeof(IRepositoryBase<>)))
    .AsImplementedInterfaces()
    .WithScopedLifetime());

// Mesma lógica para serviços
builder.Services.Scan(scan => scan
    .FromAssembliesOf(typeof(IServiceBase<>))
    .AddClasses(classes => classes.AssignableTo(typeof(IServiceBase<>)))
    .AsImplementedInterfaces()
    .WithScopedLifetime());


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
