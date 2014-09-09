phoenix-client
==============

a nodejs project for connecting apache phoenix (a hbase SQL interface)
#install

npm install phoenix-client

#dependency:

npm install java

#attention

According to your hbase version ,please change the /java/phoenix-4.0.0-incubating-client.jar

HBase 0.94 requires Apache Phoenix version 3.0

HBase 0.98.x requires Apache Phoenix version 4.0

.etc

#usage:

phoenix = require("phoenix-client");

//first param 'url' is required;

var db = new phoenix("jdbc:phoenix:nn1,192.168.0.121","username","passwd",["-Xmx1024m"]);


db.query("select * from t1 limit 1",function success(dataJson){
    console.info(dataJson);
},function error(e){
});

db.upsert("upsert into t1(name) values('gaozhu')",function success(){
    console.info("upsert successfully");
},function error(e){
});

db.upsertMuti(["sql1","sql2"],function success(){
    console.info("upsert successfully");
},function error(e){
});;
