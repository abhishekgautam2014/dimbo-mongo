"use strict";

const { Command } = require("@adonisjs/ace");
const makeDir = require("make-dir");
const path = require("path");
const fs = require("fs");
const execa = require('execa');
const ora = require("ora");
const Listr = require('listr');
const templates = require("../templates/controllerTemplate");

class Init extends Command {
    /**
     * The method signature describes the comannd, arguments and flags/aliases
     * The words flags and aliases mean the same thing in this context 😃
     */
    static get signature() {
        return `init`;
    }

    /**
     * Use this description to provide additional details
     * about the command
     */
    static get description() {
        return "Setup Project Structure.";
    }

    /**
     * Handle the command
     *
     * @param {*} args   arguments object
     * @param {*} flags  arguments object
     */
    async handle({ name }) {

        const tasks = new Listr([
            {
                title: 'Creating Project Sturcture.',
                task: async () => {

                    if (!fs.existsSync("router")) {
                        fs.mkdirSync("router");
                    }

                    if (!fs.existsSync("config")) {
                        fs.mkdirSync("config");
                    }

                    fs.writeFile('router/router.js', templates.mainRouteTemplate(name), function (err) {
                        if (err) throw err;
                        console.log(err);
                    })

                    fs.writeFile('server.js', templates.indexTemplate(), function (err) {
                        if (err) throw err;
                        console.log(err);
                    })

                    fs.writeFile('config/config.js', templates.configTemplate(), function (err) {
                        if (err) throw err;
                        console.log(err);
                    })
                }
            },
            {
                title: 'Installing Dependencies',
                task: async () => {
                    try {
                        await execa("npm install express mongoose cors dotenv body-parser")
                    } catch (error) {
                        console.log(error)
                    }
                }
            },
            {
                title: 'Setting up your project',
                task: async () => {
                    try {
                        await execa("npm install nodemon helmet jsonwebtoken bcryptjs")
                    } catch (error) {
                        console.log(error)
                    }

                }
            }
        ])
        tasks.run().catch(err => {
            console.error(err);
        });
    }
}

module.exports = Init;
