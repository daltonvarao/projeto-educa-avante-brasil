"use strict";

class StoreUser {
  get rules() {
    const userId = this.ctx.params.id;

    return {
      name: "required",
      email: `required|email|unique:users,email,id,${userId}`,
      password: "required|confirmed|min:8",
    };
  }

  get messages() {
    return {
      "name.required": "O Nome é obrigatório.",
      "email.required": "O Email é obrigatório.",
      "email.email": "Email inválido.",
      "email.unique": "O Email já foi cadastrado, tente outro.",
      "password.required": "A Senha é obrigatória.",
      "password.min": "A Senha deve ter no mínimo 8 caracteres.",
      "password.confirmed": "As senhas não correspondem.",
    };
  }
}

module.exports = StoreUser;
