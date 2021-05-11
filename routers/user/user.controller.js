const {User} = require('../../models')


let join = (req,res)=>{
    res.render('./user/join.html');
}

let join_success = async(req,res)=>{
    let userid = req.body.userid;
    let userpw = req.body.userpw;
    let username = req.body.username;
    let gender = req.body.gender;
    let userimage = req.file ==undefined ? '' : req.file.filename; 

    await User.create({
        userid,userpw,username, gender, userimage
    })

    res.render('./user/join_success.html',{
        userid, userpw, username, gender, userimage
    });
}

let login = (req,res)=>{
    let flag = req.query.flag;
    res.render('./user/login.html',{flag});
}

let login_check = async (req,res)=>{
    let userid = req.body.userid;
    let userpw = req.body.userpw;

    let result = await User.findOne({
        where:{userid, userpw}
    })

    if(result==null){
        res.redirect('/user/login?flag=0')
    }else{
        req.session.uid = userid;
        req.session.isLogin = true;
    
        req.session.save(()=>{
            res.redirect('/');
        })
    }
}

let logout = (req,res)=>{
    delete req.session.isLogin;
    delete req.session.uid;

    req.session.save(()=>{
        res.redirect('/');
    })
}

let info = async (req,res)=>{
    let userid = req.query.userid;
    let result = await User.findAll({
        where:{userid,}
    });
    console.log(result);
    res.render('./user/info.html',{
        result:result[0]
    })
    // console.log(result)
}

let userid_check = async (req,res)=>{
    let userid = req.query.userid;
    let flag = false;
    
    let result = await User.findOne({
        where:{userid}
    })
    if(result == undefined){
        flag = true;
    }else{
        flag = false;
    }

    res.json({
        login:flag,
        userid
    })
}

module.exports ={
    join, join_success, login, login_check, logout, info, userid_check,
}