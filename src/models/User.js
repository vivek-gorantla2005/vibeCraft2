import { Schema,model,models } from "mongoose";

const UserSchema = new Schema({
    id:{
        type:String,
        unique:true
    },
    firstname : {
        type:String,
        default:null
    },
    lastname:{
        type:String,
        default:null
    },
    username:{
        type:String,
        default:null
    },
    fullname:{
        type:String,
        default:null
    },
    EmailAddress:{
        type:String,
        default:null
    },
    createdAt:{
        type:Date
    },
    updatedAt:{
        type:Date
    }
})

const User = models.User || model("User",UserSchema)

export default User
