"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with sessions
 */
class SessionController {
  /**
   * Create/save a new session.
   * POST sessions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ view, auth, response }) {
    try {
      await auth.check();

      return response.route("admin.cursos.index");
    } catch (error) {
      console.log(error);
      return view.render("sessions.index");
    }
  }

  /**
   * Create/save a new session.
   * POST sessions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth, session }) {
    const { email, password } = request.only(["email", "password"]);

    try {
      const user = await auth.attempt(email, password);

      session.flash({
        success: `Bem vindo de volta, ${user.name.split(" ")[0]}!`,
      });

      return response.route("admin.users.index");
    } catch (error) {
      session.flash({ error: "Email ou senha inválidos." });

      return response.redirect("back");
    }
  }

  /**
   * Delete a session with id.
   * DELETE sessions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ response, auth }) {
    await auth.logout();

    return response.route("admin.sessions.index");
  }
}

module.exports = SessionController;
