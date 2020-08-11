"use strict";

const { test, trait } = use("Test/Suite")("Users");

trait("Test/Browser");

const User = use("App/Models/User");

test("should be able to access user index page in GET /admin/users", async ({
  assert,
  browser,
}) => {
  const response = await browser.visit("/admin/users");

  await response.assertPath("/admin/users");
  await response.assertHas("Users");
});

test("should be able to create a user in POST /admin/users/store", async ({
  assert,
  browser,
}) => {
  const response = await browser.visit("/admin/users/create");

  await response.assertHas("Novo Usuário");

  await response
    .type('[name="name"]', "Dalton Felipe")
    .type('[name="email"]', "daltonvarao@gmail.com")
    .type('[name="password"]', "12345678")
    .type('[name="password_confirmation"]', "12345678")
    .check('[name="is_admin"]')
    .submitForm("form");

  const user = await User.findBy("email", "daltonvarao@gmail.com");

  assert.equal(user.name, "Dalton Felipe");
});
