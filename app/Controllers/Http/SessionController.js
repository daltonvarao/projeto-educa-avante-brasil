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
  index = async ({ view }) => view.render("sessions.index");

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
      await auth.attempt(email, password);

      return response.redirect("/admin/users");
    } catch (error) {
      session
        .withErrors([{ field: "email", message: "Email ou senha incorretos." }])
        .flashAll();

      console.log(error);

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

    return response.redirect("/admin/sessions");
  }
}

module.exports = SessionController;
