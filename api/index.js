import express from "express";
import EmployeeModel from "./models/EmployeesModel.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
mongoose.connect(process.env.DATABASEURL).then(() => console.log("Connection succeded"));

app.use(express.json());
app.use(cors());

app.get('/api/get-employees', async (req, res) => {
    const employees = await EmployeeModel.find();
    res.status(200).json(employees);
})

app.post('/api/create-employ', async (req, res) => {

    await EmployeeModel.create(req.body);
    res.status(200).json({ msg: "Empleado creado con exito" });
});

app.put('/api/update-employ/:id', async (req, res) => {
    delete req.body._id
    await EmployeeModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    })
    res.status(200).json({ msg: "Empleado actualizado con exito" })
})

app.delete('/api/delete-employ/:id', async (req, res) => {
    await EmployeeModel.deleteOne({ _id: req.params.id })
    res.status(200).json({ msg: "Empleado eliminado con exito" })
})

app.listen(4000, () => console.log("Server running..."));