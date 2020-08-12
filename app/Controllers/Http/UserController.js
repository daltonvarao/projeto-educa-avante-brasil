"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User");

class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ view }) {
    const users = await User.all();

    return view.render("users.index", { users: users.toJSON() });
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  create = async ({ view }) => view.render("users.create");

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, session }) {
    const userData = request.only(["name", "email", "password", "is_admin"]);

    try {
      await User.create({
        ...userData,
        is_admin: userData.is_admin ? true : false,
      });

      session.flash({ success: "Usuário cadastrado!" });

      return response.redirect("/admin/users");
    } catch (error) {
      session.flash({ error: error.message });

      return response.redirect("back");
    }
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ view, params }) {
    const user = await User.find(params.id);

    return view.render("users.edit", { user });
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, session }) {
    const userData = request.only(["name", "email", "password", "is_admin"]);

    const user = await User.find(params.id);

    user.merge({
      ...userData,
      is_admin: userData.is_admin ? true : false,
    });

    try {
      await user.save();
      session.flash({ success: "Usuário atualizado!" });

      return response.redirect("/admin/users");
    } catch (error) {
      session.flash({ error: error.message });

      return response.redirect("back");
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response, session }) {
    try {
      await User.query().where("id", params.id).delete();
      session.flash({ success: "Usuário deletado!" });

      return response.redirect("back");
    } catch (error) {
      session.flash({ error: error.message });
      return response.redirect("back");
    }
  }
}

module.exports = UserController;
