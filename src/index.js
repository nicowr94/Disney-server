
require('dotenv').config();
import app from './app'
import './database';

// require('./database')

async function main() {
  await app.listen(app.get('port'));
  console.log("server on port ",app.get('port'));
}

main();
