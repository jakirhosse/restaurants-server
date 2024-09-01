const express = require("express");
const MenuControler = require("../../controler/MenuControler/MenuControler");

const router = express.Router();

// Define specific controller methods for each route
router.post("/menus", MenuControler.createMenu);
router.get("/menus",MenuControler.getAllMenus);
router.get("/menus/:id", MenuControler.getMenuById);
router.put("/menus/:id",MenuControler.updateMenu);
router.delete("/menus/:id", MenuControler.deleteMenu);

module.exports = router;
