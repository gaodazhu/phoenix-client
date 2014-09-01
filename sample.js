/**
 * Created by gaozhu on 2014/9/1.
 */
phoenix = require("./phoenix.js");
var db = new phoenix("jdbc:phoenix:192.168.252.131,192.168.252.132,192.168.252.133");
var datajson = db.query("select * from waterreal limit 1");
console.info(datajson);