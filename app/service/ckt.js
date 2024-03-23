'use strict';

// ========================================常用 require start===========================================
const Service = require('egg').Service;
// ========================================常用 require end=============================================
const axios = require('axios');
const actionDataScheme = Object.freeze({

});

class CktService extends Service {
    // 获取分享的设计信息
    async getDesignInfo(actionData) {
        const { designId } = actionData
        let data = {
            'd': designId,
            '_dataClientType': '0',
            'client_type': '0'
        };

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.chuangkit.com/share/getShareInfoV3.do?_dataType=json',
            headers: {
                'authority': 'api.chuangkit.com',
                'accept': '*/*',
                'accept-language': 'zh',
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded',
                'origin': 'https://www.chuangkit.com',
                'pragma': 'no-cache',
                'referer': 'https://www.chuangkit.com/',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Microsoft Edge";v="102"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44',
                'Cookie': 'SEC_SESSION=DF52FA85FD0D3EF52B30C492E70D99AA'
            },
            data: data
        };

        const res = await axios.request(config)

        return res.data.body
    }

    // 解析分享链接
    async parseDesignUrl(actionData) {
        const { designId, scale = '1000' } = actionData
        let data = {
            'design_id': designId,
            'scale_width': scale
        };

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://gw.chuangkit.com/imagehub/task/generateAppointScaleThumb.do?_dataType=json',
            headers: {
                'authority': 'gw.chuangkit.com',
                'accept': '*/*',
                'accept-language': 'zh',
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': 'SEC_SESSION=C3ED7F83E028F0D6BFD3750D369FD026; SEC_SESSION=DF52FA85FD0D3EF52B30C492E70D99AA',
                'origin': 'https://www.chuangkit.com',
                'pragma': 'no-cache',
                'referer': 'https://www.chuangkit.com/',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Microsoft Edge";v="102"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44'
            },
            data: data
        };

        const res = await axios.request(config)

        return res.data.body
    }

    // 下载ckt图片
    async downloadDesignUrl(actionData) {
        const response = await this._addCktDownloadTask(actionData)

        actionData.requestId = response.requestId
        const res = await this._getCktDownloadTask(actionData)

        return res
    }

    // 添加下载任务
    async _addCktDownloadTask(actionData) {
        const { designId, cktToken, renderType = '101', scale = '0.5', prediction = '0' } = actionData
        let data = {
            'design_id': designId,
            'render_type': renderType,
            'package_type': '5',
            'range': '#1',
            'watermark': '0',
            'watermark_type': '0',
            'scale': scale,
            'reduce_num': '0',
            'use_type': '2',
            'out_type': '0',
            'prediction': prediction,
            'client_type': '0'
        };

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://gw.chuangkit.com/team/task/addAsyncDownloadTask.do?_dataType=json&client_type=0',
            headers: {
                'authority': 'gw.chuangkit.com',
                'accept': '*/*',
                'accept-language': 'zh,en-US;q=0.9,en;q=0.8',
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': cktToken,
                'origin': 'https://www.chuangkit.com',
                'pragma': 'no-cache',
                'referer': 'https://www.chuangkit.com/',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36'
            },
            data: data
        };

        const res = await axios.request(config)

        return res.data.body

    }

    // 获取下载任务信息
    async _getCktDownloadTask(actionData) {
        const { requestId, designId, cktToken } = actionData
        let data = {
            'request_id': requestId,
            'design_id': designId,
            'result_type': '0',
            'client_type': '0'
        };

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://gw.chuangkit.com/team/task/getAsyncDownloadTaskState.do?_dataType=json&client_type=0',
            headers: {
                'authority': 'gw.chuangkit.com',
                'accept': '*/*',
                'accept-language': 'zh,en-US;q=0.9,en;q=0.8',
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': cktToken,
                'origin': 'https://www.chuangkit.com',
                'pragma': 'no-cache',
                'referer': 'https://www.chuangkit.com/',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36'
            },
            data: data
        };

        const res = await axios.request(config)

        return res.data.body

    }
}

module.exports = CktService;
