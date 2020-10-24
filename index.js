const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key')

const { User } = require("./models/User");

// bodyparser => 클라이언트에서 오는 정보를 서버에서 분석해서 가져오게 할 수 있게 해줌
// application/x-www-form-urlencoded 파일을 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({extended: true}));
// application/json 파일을 분석해서 가져올 수 있게 해줌
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요')
})

app.post('/register',(req, res) => {

  // 클라이언트에서 보내주는 회원가입 정보들을
  // 데이터 베이스에 넣어준다.

  // req.body에 bodyparser가 정보가 들어오게 해줌.
  const user = new User(req.body)

  // .save는 몽고디비에서 오는 메서드 / 정보들을 저장
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})