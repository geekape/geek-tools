/*
 * @Author: geekape
 * @Date: 2024-08-05 11:08:53
 * @LastEditTime: 2024-08-05 19:27:28
 * @Description: 
 */
'use strict';

// ========================================常用 require start===========================================
const Service = require('egg').Service;
// ========================================常用 require end=============================================
const actionDataScheme = Object.freeze({
  
});

class PageService extends Service {
  
    async getPageDetail() {
        const { knex, jianghuKnex } = this.app;
      
        const pathArr = this.ctx.path.split('/')
        // 取最后一个 / 后面的内容
        let pageId = pathArr.pop();
        // 如果为空，就取最后一个 / 前面的内容
        if (!pageId) {
            pageId = pathArr.pop(); 
        }

        const result = await knex('_page').where('pageId', 'like', `%${pageId}%`).first();
        return result || {};
    }
}

module.exports = PageService;
