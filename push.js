var client = require('scp2')
client.scp(
  './dist',
  {
    host: '185.251.249.13',
    username: 'root',
    password: 'Cao5211314',
    path: '/www/wwwroot/ggbeng'
  },
  function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('上传成功')
    }
  }
)
