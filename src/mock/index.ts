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
                  templateId: "m6486767",
                  groupName: "表情名称",
                  coverUrl: "https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800"
                },{
                    templateId: "m6486767",
                    groupName: "表情名称",
                    coverUrl: "https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800"
                  },{
                    templateId: "m6486767",
                    groupName: "表情名称",
                    coverUrl: "https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800"
                  }]
            };
        },
    },
] as MockMethod[];