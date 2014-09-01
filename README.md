phoenix-client
==============

a nodejs project for connecting apache phoenix (a hbase SQL interface)

dependency:

npm install java


usage:

phoenix = require("phoenix-client");
var db = new phoenix("jdbc:phoenix:nn1,192.168.0.121","username","passwd");
db.query("select * from t1 limit 1");

db.insert("upsert into t1(name) values('gaozhu')");

db.upsertMuti(["sql1","sql2"]);
