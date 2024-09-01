const MenuModel = require("../../model/MenuModel/MenuModel");

class MenuService {
    async createMenu(data) {
        return await MenuModel.create(data);
    }

    async getAllMenus() {
        return await MenuModel.find({});
    }

    async getMenuById(id) {
        return await MenuModel.findById(id);
    }

    async updateMenu(id, data) {
        return await MenuModel.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteMenu(id) {
        return await MenuModel.findByIdAndDelete(id);
    }
}

module.exports = new MenuService();
