const MenuService = require("../../services/MenuService/MenuService");

class MenuController {
    async createMenu(req, res, next) {
        try {
            const newMenu = await MenuService.createMenu(req.body);
            res.status(201).json(newMenu);
        } catch (error) {
            next(error);
        }
    }

    async getAllMenus(req, res, next) {
        try {
            const menus = await MenuService.getAllMenus();
            res.status(200).json(menus);
        } catch (error) {
            next(error);
        }
    }

    async getMenuById(req, res, next) {
        try {
            const menu = await MenuService.getMenuById(req.params.id);
            if (!menu) {
                return res.status(404).json({ message: "Menu not found" });
            }
            res.status(200).json(menu);
        } catch (error) {
            next(error);
        }
    }

    async updateMenu(req, res, next) {
        try {
            const updatedMenu = await MenuService.updateMenu(req.params.id, req.body);
            if (!updatedMenu) {
                return res.status(404).json({ message: "Menu not found" });
            }
            res.status(200).json(updatedMenu);
        } catch (error) {
            next(error);
        }
    }

    async deleteMenu(req, res, next) {
        try {
            const menu = await MenuService.deleteMenu(req.params.id);
            if (!menu) {
                return res.status(404).json({ message: "Menu not found" });
            }
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MenuController();
