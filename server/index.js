const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const authRoute = require('./routes/user.routes')
const postRoute = require('./routes/post.routes')
const commentRoute = require('./routes/comment.routes')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/auth', authRoute);
app.use('/api/post', postRoute);

app.use('/api/comment', commentRoute);

const PORT = process.env.PORT || 5000

const start = async() => {
  try {
      await mongoose.connect(process.env.DB_NAME)

      app.listen(PORT, () => {
          console.log('server started on port ', PORT);
      })
  } catch (e) {
      console.log(e, 'index error');
  }

}

start()