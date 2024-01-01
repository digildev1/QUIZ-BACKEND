const mongosoe = require("mongoose");

const mrSchema = new mongosoe.Schema({

    USERNAME: {
        type: String,
        // required: true,
    },
    MRID: {
        type: String,
        // required: true,
        unique: true
    },
    PASSWORD: {
        type: String,
        // required: true,
    },
    EMAIL: {
        type: String,
        // required: true,
        // unique: true,
    },
    ROLE: {
        type: String,
        // required: true,
    },
    HQ: {
        type: String,
        // required : true,
    },

    REGION: {
        type: String,
        // required:true,
    },
    BUSINESSUNIT: {
        type: String,
        // required:true

    },
    DOJ: {
        type: String,
        // required:true
    },



    loginLogs: [
        {
            timestamp: {
                type: Date,
                default: Date.now,
            },
            cnt: {
                type: Number,
                required: false,
                default: 0
            },
        },
    ],
})


module.exports = mongosoe.model("Mr", mrSchema);