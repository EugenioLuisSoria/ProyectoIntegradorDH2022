const multer = require ('multer');
const path = require ('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {          
        cb(null, path.join('public/images/userAvatars'))  
        //cb(null, path.resolve('public/images/userAvatars'))
        //NOTA: el resolve funciona, pero es muy largo el path que escribe
    },
    filename: function (req, file, cb) {   
        // cb(null,file.originalname.replace(/ /g, "aaa") + Date.now() + path.extname(file.originalname));
        let imageName = `userImg-${Date.now()}${path.extname(file.originalname)}`;
        
        cb(null, imageName);
    }
});
const uploadUser = multer({storage:storage});

module.exports = uploadUser;


