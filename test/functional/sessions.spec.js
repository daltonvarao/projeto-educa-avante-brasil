"use strict";

const { test, trait } = use("Test/Suite")("Sessions");

trait("Test/Browser");

const User = use("App/Models/User");

test("should be able to access login index page in GET /admin/sessions", async ({
  browser,
}) => {
  const response = await browser.visit("/admin/sessions");

  await response.assertPath("/admin/sessions");
  await response.assertHas("Login");
});

test("should be able to login in POST /admin/sessions", async ({ browser }) => {
  const user = await User.create({
    name: "Dalton Felipe",
    email: "daltonvarao@gmail.com",
    password: "12345678",
    is_admin: true,
  });

  const response = await browser.visit("/admin/sessions");

  await response
    .type('[name="email"]', user.email)
    .type('[name="password"]', "12345678")
    .submitForm("form");

  await response.assertPath("/admin/users");
});
