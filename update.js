import fs from "fs";
function deleteStudent(id){
    try{
        if(fs.existsSync("student.json")){
            let data = JSON.parse(fs.readFileSync("student.json","utf-8"))
            let res = data.filter((value)=> value.id !=id)

            fs.writeFileSync("student.json",JSON.stringify(res,null,2))
        }
    }
    catch(error){
        console.log(error);
    }

}
