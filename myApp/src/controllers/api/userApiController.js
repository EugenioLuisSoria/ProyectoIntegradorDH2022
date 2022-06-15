const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const db = require("../../database/models/index")
// Que es lo mismo que hacer require("../database/models") porque Javascript va a buscar siempre el archivo index


const userApiController = {
    listUsers: async (req, res) => {
        const users = await db.User.findAll();
        const newUsersArray = users.map( (user) => {
            return  {
                id: user.id,
                name: user.first_name + " " + user.last_name,
                email: user.email,
                detail: "/api/users/" + user.id
            }
        });
        return res.json({
            count: users.length,
            users: newUsersArray
        });

    },
    showOneUser: async (req, res) => {
        let userIdToFind = req.params.id;
        const user = await db.User.findByPk(userIdToFind)        
        return res.json({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            img_url: user.avatar,
        })
    }
};

module.exports = userApiController;