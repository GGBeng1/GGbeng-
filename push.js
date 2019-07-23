var client = require("scp2");
client.scp(
  "./dist",
  {
    host: "185.251.45.12",
    username: "root",
    password: "Cao5211314",
    path: "/www/wwwroot/ggbeng/vuepage/static"
  },
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("上传成功");
    }
  }
);
