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

Route.get("/", ({ response }) => response.redirect("/admin/users"));

// unauthenticated users
Route.group("admin", () => {
  Route.resource("sessions", "SessionController").only(["index", "store"]);
})
  .prefix("admin")
  .middleware("guest");

// authenticated users
Route.group("admin", () => {
  Route.resource("users", "UserController").validator(
    new Map([[["admin.users.store"], ["StoreUser"]]])
  );

  Route.delete("sessions", "SessionController.destroy").as(
    "admin.sessions.destroy"
  );
})
  .prefix("admin")
  .middleware("auth");
