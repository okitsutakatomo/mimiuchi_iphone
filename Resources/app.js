// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.App.AppConfig = require("config");

/***********************
 //tab group
 ************************/

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var win0 = Titanium.UI.createWindow({
    url: "webViewWindow.js",
    tabBarHidden: true,
});

var tab0 = Titanium.UI.createTab({
    // title:'みみうち',
    window:win0
});

tabGroup.addTab(tab0);
tabGroup.open();