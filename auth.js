import express from "express";
import addmid from "../midd/addmin.js";
import { createEmployee,deleteEmp,searchEmp, updateEmp } from "../modle/employee.js";
import searchmid from "../midd/search.js";
import deletemid from "../midd/delete.js";
import updatemid from "../midd/update.js";
import authentic from "../authorize/auth.js";
import { deleteaAdmin, login, reg, updateAdmin } from "../payroll/admin/admin.js";


let router = express.Router();

router.post("/admin",reg);
router.get("/login",login);
router.delete("/delete",deleteaAdmin);
router.put("/update", updateAdmin);

router.post("/create",authentic,addmid,createEmployee);
router.get("/search",authentic,searchmid,searchEmp);
router.delete("/delete", authentic,deletemid,deleteEmp);
router.put("/update", authentic, updatemid,updateEmp);

export default router;