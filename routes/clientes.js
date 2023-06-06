const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/clientes", async function (req, res) {
  // consulta de clientes con filtro

  let where = {};
  if (req.query.ApellidoYNombre != undefined && req.query.ApellidoYNombre !== "") {
    where.ApellidoYNombre = {
      [Op.like]: "%" + req.query.ApellidoYNombre + "%",
    };
  }
  
  let items = await db.clientes.findAndCountAll({
    attributes: [
      "IdCliente",
      "ApellidoYNombre",
      "DNI",
    ],
    order: [["ApellidoYNombre", "ASC"]],
    where,
  });

  res.json(items.rows);
});

module.exports = router;
