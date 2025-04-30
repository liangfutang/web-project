
## Project Setup

### Create Project
```bash
npm create @quick-start/electron@latest wechat-exe
```

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
# For windows
npm run build:win

# For macOS
npm run build:mac

# For Linux
npm run build:linux
```

## 打包
打包参数说明
```
  "build": {
    "productName": "wechat-app", //项目名 这也是生成的exe文件的前缀名，也可以在每个环境中自行配置
    "appId": "com.wechat-app", //应用程序的唯一标识符，通常是反转的域名格式 
    "copyright": "dyy.dongyuanwai © 2024", //版权信息，显示在应用程序中说明版权归属的地方
    "compression": "maximum", //压缩级别，指定打包时使用的压缩级别。这里设置为"maximum"表示最大压缩
    "asar": true,   // 是否启用 asar 打包，asar 是 Electron 提供的一种文件打包方式，能够提高应用程序的性能和安全性。
    "directories": {
      "output": "release/" //指定输出目录，打包完成后的文件会放置在该目录下。
    },
    "nsis": {
      "oneClick": false, // 是否一键安装
      "perMachine": true, //设置为 true 时，将在计算机上所有用户账户中安装应用程序；false 则只会在当前用户账户下安装
      "allowElevation": true, // 允许提升权限进行安装，设置为 true 时，安装过程可能会请求管理员权限
      "allowToChangeInstallationDirectory": true, // 允许修改安装目录
      // "installerIcon": "xxx/xxxx.ico",// 安装图标
      // "uninstallerIcon": "xxx/xxxx.ico",//卸载图标
      // "installerHeaderIcon": "xxx/xxxx.ico", // 安装时头部图标
      "deleteAppDataOnUninstall": true, // 设置为 true 时，卸载应用程序时会删除应用程序的数据文件
      "createDesktopShortcut": true, // 创建桌面图标
      "createStartMenuShortcut": true,// 创建开始菜单图标
      "shortcutName": "xxxx", // 图标名称
    },
    "win": {
      "icon": "./public/logo.ico", //图标路径 
      "artifactName": "${productName}-v${version}-${platform}-setup.${ext}",//安装包名称
      "target": [
        {
          "target": "nsis"
        }
      ]
    },
    // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大，所以建议直接打32的安装包。
    "arch": [
      "x64",
      "ia32"
    ],
    "mac": {
      "icon": "./public/logo.ico",
      "artifactName": "${productName}-v${version}-${platform}-setup.${ext}"
    },
    "linux": {
      "icon": "./public/logo.ico",
      "artifactName": "${productName}-v${version}-${platform}-setup.${ext}"
    }
  },
```

## 资料
[electron-vue](https://blog.csdn.net/qq_42365534/article/details/129887911?spm=1001.2014.3001.5502)