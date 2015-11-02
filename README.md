### Warning

1. All the tests are based on Node.js v0.11.2, DO NOT USE ANY OTHER RELEASE!!!
2. Only for development, not production.

### Installation

1. You need a Node.js v0.11.2 installed.
2. Clone the source code from git.
3. Run `npm install` under the root of the source code.
5. Copy and rename the `/modules/config.sample.js` to `/modules/config.js` and do the necessary configure.
6. Import the `init.sql` file into the database you configured.
7. If nothing wrong, you can start the server by samply type `node ./bin/www` and press Enter.
8. Then you can find your web at `http://127.0.0.1:3000`.

### Notice

1. You do have a connectively network and a Xbee node server to pass all the test.
2. If not work, check the config file first.
3. When the Xbee node server connect to this server successfully, you can see a debug message in you console.

### Error code

* -1： 参数不全
* -2： 接口验证失败
* -3： 用户名、密码或个人信息错误
* -4： 用户不存在
* -5： 服务器错误
* -6： 借书数量达到上限
* -7： sessionid为空
* -8： sessionid无效
* -9： UID不存在
* -10： tagId不存在
