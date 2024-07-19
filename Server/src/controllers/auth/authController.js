const User = require('../../model/UserModel')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require("bcrypt");
dotenv.config()

const authControllers = {
    regsiter: async (req, res) => {
        const { username, email, password } = req.body
        if (!req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).json({ message: "Vui lòng cung cấp địa chỉ email và mật khẩu" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser !== null) {
            return res.status(400).json({ message: "Email này đã được đăng ký" });
        }
        const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                status: false
            });
            const user = await newUser.save();
            res.status(200).json(user);
    },
    login: async (req,res)=>{
         try {
             const {email,password} = req.body;
             const user = await User.findOne({ email });
             if (!user) {
                return res.status(404).json({ message: "Email chưa được đăng kýav" })
            }
             const isPasswordValid = await bcrypt.compare(password , user.password);
             if (!isPasswordValid) {
                return res.status(401).json({ message: 'Mật khẩu không đúng' });
            }
            const token = jwt.sign({ userId: user._id, email: user.email , username:user.username ,role:user.admin }, process.env.JWT_SECRET)
            res.status(200).json({ token });
         } catch (error) {
            res.status(500).json({message: error.message})
         }
    },
    getUserInfo: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.userId;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }
            // Hiển thị tên người dùng
            res.status(200).json(user);

        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình lấy thông tin người dùng' });
        }
    },
    getAllUser: async (req,res)=>{
         try {
            const allUser = await User.find();
            res.status(200).json(allUser)
         } catch (error) {
            res.status(500).json({message:error.message});
         }
    },
    deleteUser: async (req,res)=>{
        try {
            const {id} = req.params;
            if(!id){
                return res.status(400).json({message:"Không tìm thấy id user"})
            }
            await User.findByIdAndDelete(id);
           res.status(200).json({message:"Xóa thành công"})
        } catch (error) {
           res.status(500).json({message:error.message});
        }
   },
}
module.exports = authControllers;