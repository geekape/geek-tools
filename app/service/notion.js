'use strict';

// ========================================常用 require start===========================================
const Service = require('egg').Service;
// ========================================常用 require end=============================================
const axios = require('axios');


const actionDataScheme = Object.freeze({

});
class NotionService extends Service {
    async fetchAndSyncNotionData() {
        const { ctx } = this;
        const { databaseId, notionToken } = this.ctx.app.config
        const notionApiUrl = `https://api.notion.com/v1/databases/${databaseId}/query`; // 替换为实际的Notion数据库API地址

        try {
            const response = await axios.post(
                notionApiUrl,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${notionToken}`,
                        'Content-Type': 'application/json',
                        'Notion-Version': '2022-06-28', // 使用正确的Notion API版本
                    },
                }
            );

            const notionData = response.data;

            // 在这里将获取的数据同步到Egg.js的后台，比如存储到数据库
            await this.syncToDatabase(notionData);

            return notionData;

        } catch (error) {
            ctx.logger.error('Failed to fetch data from Notion:', error);
            throw error;
        }
    }

    async syncToDatabase(notionData) {
        const { knex, jianghuKnex } = this.app;
        // 处理同步数据的逻辑，可以根据你的需求存储到MySQL、MongoDB等数据库中
        const { app } = this;
        // notionData.results是个数组
        for (const item of notionData.results) {
            const { Category, CreateAt, Desc, Tag, Title, URL } = item.properties;
            const data = {
                title: Title.title[0].plain_text,
                desc: Desc.rich_text[0].plain_text,
                url: URL.url,
                category: Category.select.name,
                createAt: CreateAt.created_time,
                notionId: item.id,
            };

            // 判断title是否已经存在
            const exist = await jianghuKnex('notion').where({ title: data.title }).first()
            if (exist) {
                await jianghuKnex('notion').where({ id: exist.id }).jhUpdate(data);
            } else {
                // 同步icon
                const page = await this.syncNotionPageInfo(item.id)
                if (page.icon) {
                    data.logo = page.icon.external.url
                }


                await jianghuKnex('notion').jhInsert(data);
            }
        }
    }

    async syncNotionPage() {
        const { knex, jianghuKnex } = this.app;
        let list = await jianghuKnex('notion').select();
        // 查logo为空的
        list = list.filter(item => !item.logo)

        for (const item of list) {
            const page = await this.syncNotionPageInfo(item.notionId)
            if (!page.icon) {
                continue
            }
            item.logo = page.icon.external.url
            await jianghuKnex('notion').where({ id: item.id }).jhUpdate(item);
        }
    }
    // 页面信息,icon
    async syncNotionPageInfo(pageId) {
        const { databaseId, notionToken } = this.ctx.app.config

        const notionApiUrl = `https://api.notion.com/v1/pages/${pageId}`;

        try {
            const response = await axios.get(notionApiUrl, {
                headers: {
                    'Authorization': `Bearer ${notionToken}`,
                    'Notion-Version': '2022-06-28', // 使用正确的Notion API版本
                },
            });

            return response.data;
        } catch (error) {
            console.error('Failed to fetch page icon from Notion:', error);
            throw error;
        }
    }

    async syncNotionContent(pageId) {
        const { databaseId, notionToken } = this.ctx.app.config

        const notionApiUrl = `https://api.notion.com/v1/blocks/${pageId}/children`;

        try {
            const response = await axios.get(notionApiUrl, {
                headers: {
                    'Authorization': `Bearer ${notionToken}`,
                    'Notion-Version': '2022-06-28', // 使用正确的Notion API版本
                },
            });

            const pageContent = response.data.results; // 获取页面内容
            return pageContent;
        } catch (error) {
            console.error('Failed to fetch page content from Notion:', error);
            throw error;
        }
    }

    // 同步notionpage到tool
    async syncNotion(actionData) {
        const { knex, jianghuKnex } = this.app;
        // 同步的id数据
        const { idList } = actionData

        // 读notion，idList，whereIn
        const list = await jianghuKnex('notion').whereIn('id', idList).select();
        for (const item of list) {
            const data = {
                title: item.title,
                logo: item.logo,
                desc: item.desc,
                url: item.url,
                category: item.category,
                status: '启用'
            }

            // 判断title是否已经存在
            const exist = await jianghuKnex('tool').where({ title: data.title }).first()

            if (exist) {
                await jianghuKnex('tool').where({ id: exist.id }).jhUpdate(data);
            } else {
                await jianghuKnex('tool').jhInsert(data);
            }
        }
    }
}

module.exports = NotionService;
