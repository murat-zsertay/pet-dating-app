import "../mongodb_helper";
import {User} from "../../models/user";
import {beforeEach, describe} from "@jest/globals"

describe("User model", () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it("has an email address", () => {
        const user = new User({
            firstName: "some",
            lastName: "one",
            email: "someone1@example.com",
            password: "password",
            postcode: "N19 0BG"
        });
        expect(user.email).toEqual("someone1@example.com");
    });

    it("has a password", () => {
        const user = new User({
            firstName: "some",
            lastName: "one",
            email: "someone1@example.com",
            password: "password",
            postcode: "N19 0BG"
        });
        expect(user.password).toEqual("password");
    });


    it("can list all users", async () => {
        await User.create({firstName: "some",  lastName: "one", email: "someone1@email.com", password: "password", postcode: "N19 0BG"})
        await User.create({firstName: "some",  lastName: "one", email: "someone2@email.com", password: "password", postcode: "LE2 2VB"})
        // Retrieve all users from the database
        const retrievedUsers = await User.find();
        // check if it is an array
        expect(Array.isArray(retrievedUsers)).toBe(true)
        const expectedArr = [
            expect.objectContaining({email: "someone1@email.com", password: "password"}),
            expect.objectContaining({email: "someone2@email.com", password: "password"}),
        ];
        expect(retrievedUsers).toEqual(expect.arrayContaining(expectedArr))
    });

    it("can save a user when both email address and password are valid", async () => {
    await User.create({
          firstName: "some",
          lastName: "one",
          email: "someone3@example.com",
          password: "password",
          postcode: "N19 0BG"
        });
        // expect(user).not.toBeNull();
        let users = await User.find();
        expect(users).not.toBeNull();
        let foundUser = users.filter(item => item.email === "someone3@example.com")[0]
        expect(foundUser).toHaveProperty("email", "someone3@example.com");
        expect(foundUser).toHaveProperty("password", "password");
    });

    it("throws an error message when email address is invalid", (done) => {
        const user = new User({
            firstName: "some",
            lastName: "one",
            email: "someone1xample.com",
            password: "password",
            postcode: "N19 0BG"
        });

        user.validate(function (err) {
            expect(err.message).toBe(
                "User validation failed: email: Please use a valid email address"
            );
            done();
        });
    });

    it("throws an error message when password does not meet minimum requirement of password length", (done) => {
        const user = new User({
            firstName: "some",
            lastName: "one",
            email: "someone6@example.com",
            password: "123",
            postcode: "N19 0BG"
        });

        user.validate(function (err) {
            expect(err.message).toBe(
                "User validation failed: password: must be at least 4 characters long"
            );
            done();
        });
    });

    it("can save a new user when password length meets the requirement of minimum length of 4 or more characters", (done) => {
        const user = new User({
            firstName: "some",
            lastName: "one",
            email: "someone1@example.com",
            password: "pass",
            postcode: "N19 0BG"
        });

        user.validate(function (err) {
            expect(err).toBe(null);
            done();
        });
    });

    it("throws an error message when password exceeds the maximum allowed length of 10 characters", (done) => {
        const user = new User({
            firstName: "some",
            lastName: "one",
            email: "someone1@example.com",
            password: "passwordpassword",
            postcode: "N19 0BG"
        });

        user.validate(function (err) {
            expect(err.message).toBe(
                "User validation failed: password: Path `password` (`passwordpassword`) is longer than the maximum allowed length (10)."
            );
            done();
        });
    });
});
