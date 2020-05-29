// 客服美洽
function initServer(appkey,mq) {
    //配置初始化美洽需要的appkey
    var param = {
        appkey: appkey
    };
    //初始化美洽
    mq.initMeiQia(param, function(ret, err) {
        if (ret) {
            // alert("初始化成功：\n\n" + JSON.stringify(ret) + "\n\n点击按钮继续");

            // show();
            if(ret.info!="success"){
              _msg("请检查客服配置")
            }else{
              tapService(mq)
            }
        } else {
            alert("初始化失败：\n\n" + JSON.stringify(err));
        }
    });
};

function tapService(mq) {
    //配置功能参数，并显示美洽窗口
    //设置指定分配给某某客服
    //var scheduleParam = {
    //    agentId:"美洽客服的ID"
    //};
    //mq.setScheduledAgentOrAgentGroup(scheduleParam);

    //设置用户信息
    var infoParam = {
        email: "dev@meiqia.com",
        comment: "这是备注",
        avatar: "https://app.meiqia.com/images/logo.png",
        tags: ["手机APP", "北京"],
        "服务器": "电信一区"
    };
    mq.setClientInfo(infoParam);
    //设置自定义用户Id
    var customizedIdParam = {
        id: "id00001"
    };
    mq.setLoginCustomizedId(customizedIdParam);

    //设置美洽ID
    //var clientIdParam = {
    //    id:"9f0b2d3339edeec591a6e3be5dbafd64"
    //};
    //mq.setLoginMQClientId(clientIdParam);

    //设置标题栏背景颜色
    var titleBarColor = {
        color: "#157EFF"
    };
    mq.setTitleBarColor(titleBarColor);
    //设置title以及按钮颜色
    var titleColor = {
        color: "#ffffff"
    };
    // mq.configChat({backConfig:{img:'fs://back.png'}});
    mq.setTitleColor(titleColor);
    //打开美洽客服界面
    mq.show();
};
