import adminService from "../services/admin.service"
import dotenv from "dotenv"

dotenv.config()
const {create, findAll} = adminService;

export default class AdminController{
    static async createAdmin(req, res) {

        const admin1 = {username: req.body.username, password:process.env.ADMIN_PASSWORD }
        
        console.log(admin1)
        const admin = await create(admin1);
        return res.status(200).json({admin});
    }
    static async getAll(req, res) {
        const admins = await findAll()
        return res.status(200).json({admins})
    }
}