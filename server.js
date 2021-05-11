const express = require('express');
const app = express();
const {sequelize}=require('./models')

const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')
const routers = require('./routers')
const session = require('express-session')
const cors = require('cors');

app.use(express.static('uploads'))
app.use(session({
    secret:'aaa',
    resave:false,
    saveUninitialized:true,
}))

app.use(bodyParser.urlencoded({extended:false}));
nunjucks.configure('views',{
    express:app,
})
app.set('view engine', 'html')
app.use(cors());

sequelize.sync({force:false})
.then(()=>{
    console.log('접속 성공')
}).catch(()=>{
    console.log('접속 실패')
})

app.use('/',routers);

app.listen(3000,()=>{
    console.log('server start port : 3000')
})