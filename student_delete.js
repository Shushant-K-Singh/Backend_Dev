import fs from "fs"

function createStudent(name, id, classes){

    try {
         let studentsJson = [];
         let ob = {
            name, id, classes
         }
         if(fs.existsSync("student.json")){
            let data = fs.readFileSync("student.json", "utf-8")
            console.log(data);

            if(data){
                studentsJson = JSON.parse(data)
                console.log(data);
            }
         }
        //  let newRs = studentsJson.filter((value)=> value.id!=id);
            studentsJson.push(ob)
         fs.writeFileSync("student.json", JSON.stringify(studentsJson, null, 2))
         return "student create successful"
       
    } catch (error) {
        console.log("Error from create student ", error);
       
    }

}
export default createStudent

