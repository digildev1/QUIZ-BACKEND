
const AdminModel = require("../models/admin");
const MrModel = require("../models/Mr")
const handleAdminCreation = async (req, res) => {
    try {
        const { Name, AdminId, Password, Gender, MobileNumber } = req.body;
        const admin = await AdminModel.findOne({ AdminId: AdminId });

        if (admin) {
            return res.status(400).json({
                msg: "AdminId Already Exitsts",
                success: false,
            })
        }

        const newAdmin = await new AdminModel({
            Name,
            AdminId,
            Password,
            Gender,
            MobileNumber,
        })

        await newAdmin.save();

        return res.status(200).json({
            success: true,
            newAdmin
        });
    }
    catch (error) {
        console.log('Error in handleTopMrByDoctor');
        let err = error.message;
        return res.status(500).json({
            msg: 'Internal Server Error',
            err,
        });
    }
};


const handleAdminLogin = async (req, res) => {
    try {
        const { AdminId, Password } = req.body;
        console.log(req.body);
        const admin = await AdminModel.findOne({ AdminId });
        console.log({ admin })
        if (admin) {
            if (admin.Password === Password) {
                return res.status(200).json({
                    msg: "Login",
                    success: true,
                    admin
                })
            } else {
                return res.status(400).json({
                    msg: "Password is Incorrect",
                    success: false,
                })
            }
        } else {
            return res.status(400).json({
                msg: "Admin Not Found",
                success: false
            })
        }
    } catch (error) {
        const errMsg = error.message;
        console.log({ errMsg });
        return res.status(500).json({
            msg: "Internal Server Error",
            errMsg
        })
    }
}


const handleAdminGet = async (req, res) => {

    try {
        const id = req.params.id;
        const admin = await AdminModel.findById({ _id: id })
        if (!admin) {
            return res.status(400).json({
                msg: "Admin Not Found"
            })
        }
        return res.json(admin);
    }
    catch (error) {
        const errMsg = error.message;
        console.log({ errMsg });
        return res.status(500).json({
            msg: "Internal Server Error",
            errMsg
        })
    }
}

const handleUpdateAdmin = async (req, res) => {

    try {
        const id = req.params.id;
        const { Name, AdminId, Password, Gender, MobileNumber } = req.body;

        const admin = await AdminModel.findById({ _id: id });
        if (!admin) {
            return res.status(400).json({ msg: "Admin Not Found" });
        }
        const UpdatedOptions = {
            Name,
            MobileNumber,
            Gender,
            Password
        }
        const udpatedAdmin = await AdminModel.findByIdAndUpdate(id, UpdatedOptions, { new: true })
        console.log({ udpatedAdmin });
        return res.status(200).json({
            msg: "Admin Updated",
            success: true,
        });
    } catch (error) {
        const errMsg = error.message;
        console.log({ errMsg });
        return res.status(500).json({
            msg: "Internal Server Error",
            errMsg
        })
    }
}

const handleMrData = async (req, res) => {
    try {
        const id = req.params.id;
        const admin = await AdminModel.findById(id).populate('Mrs', 'MRID _id');

        if (!admin) {
            return res.status(400).json({ msg: "Admin not found" });
        }

        const mrData = admin.Mrs.map(mr => {
            return {
                MRID: mr.MRID,
                _id: mr._id
            };
        });

        return res.status(200).json(mrData);
    } catch (error) {
        const errMsg = error.message;
        console.log({ errMsg });
        return res.status(500).json({
            msg: "Internal Server Error",
            errMsg
        });
    }
};

module.exports = {
    handleAdminCreation,
    handleAdminLogin,
    handleAdminGet,
    handleUpdateAdmin,
    handleMrData
}

