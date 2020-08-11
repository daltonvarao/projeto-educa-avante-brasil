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

Route.get("admin/sessions", "SessionController.index").as(
  "admin.sessions.index"
);

Route.post("admin/sessions", "SessionController.store").as(
  "admin.sessions.store"
);

Route.group("admin", () => {
  Route.resource("users", "UserController").validator(
    new Map([[["admin.users.store"], ["StoreUser"]]])
  );
}).prefix("admin");
