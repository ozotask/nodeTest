const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }

})

// 스키마를 감싸주는 'User' 모델 생성
const User = mongoose.model('User',userSchema)

// 모듈화해서 사용할 수 있도록
module.exports ={User}