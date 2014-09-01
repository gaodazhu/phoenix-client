phoenix-client
==============

a nodejs project for connecting apache phoenix (a hbase SQL interface)
#install

npm install phoenix-client

#dependency:

npm install java


#usage:

phoenix = require("phoenix-client");

//first param 'url' is required
var db = new phoenix("jdbc:phoenix:nn1,192.168.0.121","username","passwd",["-Xmx1024m"]);


var dataJson = db.query("select * from t1 limit 1");

var bool = db.insert("upsert into t1(name) values('gaozhu')");

var bool = db.upsertMuti(["sql1","sql2"]);
