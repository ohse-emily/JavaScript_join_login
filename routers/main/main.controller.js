let main = (req,res)=>{
    console.log(req.session);
    res.render('index.html',{
        userid:req.session.uid,
        isLogin:req.session.isLogin
    });

}

module.exports.main = main; // (뒤에가 함수)