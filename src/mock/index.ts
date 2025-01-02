import { MockMethod } from 'vite-plugin-mock';
export default [
    {
        url: '/mock/ProductPortal/tc/open/activity/configureId',
        method: 'get',
        timeout: 200,
        statusCode: 200,
        response: () => {
            return {
                "code": "200",
                "success": true,
                "message": "请求成功",
                "data": [{
                  templateId: "m6486767"
                }]
            };
        },
    },
] as MockMethod[];