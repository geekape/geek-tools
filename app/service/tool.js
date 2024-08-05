'use strict';

// ========================================常用 require start===========================================
const Service = require('egg').Service;
// ========================================常用 require end=============================================
const actionDataScheme = Object.freeze({
  
});

class ToolService extends Service {
    async getToolList() {
        const { knex, jianghuKnex } = this.app;
        const result = await jianghuKnex('tool').select();
        return result;
    }
}

module.exports = ToolService;
