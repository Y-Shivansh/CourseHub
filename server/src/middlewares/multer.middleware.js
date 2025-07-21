import multer from 'multer';
import path from 'path';


// multer takes file from frontend, when you click upload image, and stores it temporarily in diskStorage., and then uploads to cloudinary.
// it takes multi-part form data (i.e. formdata from our frontend)
const storage = multer.diskStorage({
    destination: function (req, file, cb) { // req: req fron user any JSON || file: it is the actual file apart from JSON that is from user.
        const uploadPath = path.join(process.cwd(), 'public', 'temp'); // process.cwd() = current working directory (i.e., root of your projec
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
})

export const upload = multer({
    storage,
});
