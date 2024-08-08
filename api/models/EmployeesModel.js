import {Schema, model} from "mongoose";

const EmploySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    direction:{
        type:String,
        required:true
    }
});

const EmployeeModel = model('employees', EmploySchema);

export default EmployeeModel;