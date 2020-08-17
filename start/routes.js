"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", ({ view }) => view.render("home.index")).as("home.index");
Route.get("/sobre", ({ view }) => view.render("sobre.index")).as("sobre.index");

// unauthenticated users
Route.group("admin", () => {
  Route.resource("sessions", "SessionController").only(["index", "store"]);
})
  .prefix("admin")
  .middleware("guest");

// authenticated users
Route.get("admin", async ({ response }) => response.redirect("/admin/users"));

Route.group("admin", () => {
  Route.resource("users", "UserController").validator(
    new Map([
      [["admin.users.store"], ["StoreUser"]],
      [["admin.users.update"], ["UpdateUser"]],
    ])
  );

  Route.resource("configuracoes", "ConfiguracaoController");

  Route.delete("sessions", "SessionController.destroy").as(
    "admin.sessions.destroy"
  );
})
  .prefix("admin")
  .middleware(["admin"]);
