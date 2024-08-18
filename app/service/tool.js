/*
 * @Author: geekape
 * @Date: 2024-08-05 11:08:53
 * @LastEditTime: 2024-08-05 19:09:31
 * @Description: 
 */
'use strict';

// ========================================常用 require start===========================================
const Service = require('egg').Service;
// ========================================常用 require end=============================================
const actionDataScheme = Object.freeze({
  
});

class ToolService extends Service {
    async getToolList() {
        const { knex, jianghuKnex } = this.app;
        const result = await jianghuKnex('tool').where({status: '启用'}).select();
        return result;
    }
    async getToolDetail() {
        const { knex, jianghuKnex } = this.app;
      
        const pathArr = this.ctx.path.split('/')
        // 取最后一个 / 后面的内容
        let pageId = pathArr.pop();
        // 如果为空，就取最后一个 / 前面的内容
        if (!pageId) {
            pageId = pathArr.pop(); 
        }

        const result = await knex('tool').where('url', 'like', `%${pageId}%`).first();
        return result || {};
    }
}

module.exports = ToolService;
