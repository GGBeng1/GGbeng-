var client = require("scp2")
client.scp(
  "./dist",
  {
    host: "154.202.60.246",
    username: "root",
    password: "u}A$mZm~/K+FRm2I",
    path: "/www/wwwroot/ggbeng"
  },
  function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log("上传成功")
    }
  }
)
