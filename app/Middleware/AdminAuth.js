"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AdminAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ session, response, auth }, next) {
    try {
      await auth.check();
    } catch (error) {
      session.flash({ error: "Faça login para continuar!" });
      return response.route("admin.sessions.index");
    }

    await next();
  }
}

module.exports = AdminAuth;
