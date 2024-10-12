'use strict';

// ========================================常用 require start===========================================
const Service = require('egg').Service;
// ========================================常用 require end=============================================
const actionDataScheme = Object.freeze({
  
});

class WordpressService extends Service {
    async publishToWordPress(page, icon, content) {
        const wordpressApiUrl = 'https://geekape.net/wp-json/wp/v2/posts';
        const wordpressToken = 'your_wordpress_application_password_or_jwt_token'; // 替换为你的 WordPress 应用密码或 JWT Token
    
        const postData = {
          title: page.properties.Name.title[0]?.text?.content || 'Untitled',
          content: this.formatContent(content),
          status: 'publish', // 可以是 'publish', 'draft', 'private', 等等
          meta: {
            notion_icon: icon?.emoji || icon?.external?.url || '', // 如果你有在 WordPress 中存储 Notion 图标的自定义字段
          },
        };
    
        try {
          const response = await axios.post(
            wordpressApiUrl,
            postData,
            {
              headers: {
                'Authorization': `Bearer ${wordpressToken}`,
                'Content-Type': 'application/json',
              },
            }
          );
    
          this.ctx.logger.info(`Post created in WordPress: ${response.data.id}`);
          return response.data;
        } catch (error) {
          this.ctx.logger.error('Failed to publish post to WordPress:', error);
          throw error;
        }
      }
    
      // 格式化 Notion 页面内容为 HTML
      formatContent(content) {
        // 这里你需要根据 Notion 的内容块将其格式化为 HTML 或者适合 WordPress 的格式
        // 示例：将每个段落转化为 <p> 标签
        return content.map(block => {
          switch (block.type) {
            case 'paragraph':
              return `<p>${block.paragraph.text.map(text => text.plain_text).join('')}</p>`;
            // 处理其他类型的块
            default:
              return '';
          }
        }).join('');
      }
}

module.exports = WordpressService;
