### Warning

1. All the tests are based on Node.js v0.11.2, DO NOT USE ANY OTHER RELEASE!!!
2. Only for development, not production.

### Installation

1. You need a Node.js v0.11.2 installed.
2. Clone the source code from git.
3. Run `npm install` under the root of the source code.
5. Copy and rename the config file `/modules/config.sample.js` and do the necessary configure.
6. Import the `init.sql` file into the database you configured.
7. If nothing wrong, you can start the server by samply type `node ./bin/www` and press Enter.
8. Then you can find your web at `http://127.0.0.1:3000`.

### Notice

1. You do have a connectively network and a Xbee node server to pass all the test.
2. If not work, check the config file first.
3. When the Xbee node server connect to this server successfully, you can see a debug message in you console.

### Error code

* -1： Missing parameter
* -2： Authentication failed
* -3： Username, password or user info wrong
* -4： Username incorrect
* -5： Server error
* -6： Reached borrowing limit
* -7： Missing sessionid
* -8： Wrong sessionid
* -9： Wrong UID
* -10：Wrong tagId
