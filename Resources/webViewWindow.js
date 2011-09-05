Ti.App.AppConfig = require("config");

var win = Titanium.UI.currentWindow;
win.barColor = '#8FA5AB';
win.titleControl = null;
win.titleImage = 'images/header_logo_m.png';

var baseUrl = Ti.App.AppConfig.Server.url

var webView = Ti.UI.createWebView({
    url: baseUrl + "/?app=iphone",
    loading: true,
})

win.add(webView);

var settingButton = Titanium.UI.createButton({
    title:'設定'
});

win.rightNavButton = settingButton;

settingButton.addEventListener("click", function() {
    webView.url = baseUrl + "/account"
})
var actView = Titanium.UI.createView({
    width: 50,
    height: 50,
    backgroundColor:'#000',
    borderRadius:10,
    opacity:0.8,
});

var actInd = Titanium.UI.createActivityIndicator({
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
});

var actIndOverReload = Titanium.UI.createActivityIndicator({
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
});

actView.hide();
actView.add(actInd);
win.add(actView);

webView.addEventListener("beforeload", function(e) {
    actView.show();
    actInd.show();
})
webView.addEventListener('load', function(e) {
    actView.hide();
    actInd.hide();

    //もしお知らせ画面であれば、バッジをnullにする。
    if(e.url.indexOf("/home") != -1) {
        Titanium.UI.iPhone.appBadge = null;
    }

    // 画面ロード後、PushNotificationのデバイストークンを取得し、サーバに送信する。
    Titanium.Network.registerForPushNotifications({
        types: [
        Titanium.Network.NOTIFICATION_TYPE_BADGE,
        Titanium.Network.NOTIFICATION_TYPE_ALERT,
        Titanium.Network.NOTIFICATION_TYPE_SOUND
        ],
        success: function(e) {
            var deviceToken = e.deviceToken;
            var javascript = "javascript:send_iphone_device_token(\"" + deviceToken + "\");";
            webView.evalJS(javascript);
        },
        error: function(e) {
        },
        callback: function(e) {
            // called when a push notification is received.
        }
    });
});
//戻るボタン
var back = Titanium.UI.createButton({
    backgroundImage:'images/icon_back.png',
    width:30,
    height: 30
});

back.addEventListener("click", function() {
    if(webView.canGoBack()) {
        webView.goBack();
    }
});
//リロードボタン
var refresh = Titanium.UI.createButton({
    backgroundImage:'images/icon_refresh.png',
    width:30,
    height: 30
});

refresh.addEventListener("click", function() {
    //    webView.reload();
    webView.url = webView.url
});
//ホームボタン
var homeButton = Titanium.UI.createButton({
    backgroundImage:'images/icon_home.png',
    width:30,
    height: 30
});

homeButton.addEventListener("click", function() {
    webView.url = baseUrl + "/?app=iphone"
});
var flexSpace = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

win.setToolbar([back,flexSpace, refresh,flexSpace,flexSpace,flexSpace,flexSpace,flexSpace,homeButton]);