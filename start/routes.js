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

Route.get("/", "HomeController.index").as("home.index");
Route.post("/", "HomeController.store").as("home.store");

Route.get("/sobre", ({ view }) => view.render("sobre.index")).as("sobre.index");

Route.resource("cursos", "CursoController").only(["show"]);

// api

Route.group("api", () => {
  Route.get("collections", "ApiController.collections");
  Route.resource("cursos", "CursoController").only(["store", "update"]);
}).prefix("api");

// unauthenticated users
Route.group("admin", () => {
  Route.resource("sessions", "SessionController").only(["index", "store"]);
}).prefix("admin");

// authenticated users
Route.get("admin", async ({ response }) => response.redirect("/admin/users"));

Route.group("admin", () => {
  Route.resource("users", "UserController")
    .validator(
      new Map([
        [["admin.users.store"], ["StoreUser"]],
        [["admin.users.update"], ["UpdateUser"]],
      ])
    )
    .except(["show"]);

  Route.resource("configuracoes", "ConfiguracaoController").only([
    "index",
    "store",
  ]);

  Route.resource("areas", "AreaEstudoController").except(["show"]);
  Route.resource("modalidades", "ModalidadeController").except(["show"]);
  Route.resource("cursos", "CursoController")
    .validator(
      new Map([
        [["admin.cursos.store"], ["StoreCurso"]],
        [["admin.cursos.update"], ["UpdateCurso"]],
      ])
    )
    .except(["show", "store", "update"]);

  Route.resource("sessions", "SessionController").only(["destroy"]);
})
  .prefix("admin")
  .middleware(["admin"]);
