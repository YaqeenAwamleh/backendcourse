let students = [];
function createStudent(name, age, mark) {
    return { name: name, age: age, mark: mark};
} 
students.push(createStudent("yaqeen",22,86));
students.push(createStudent("taleen",22,90));
students.push(createStudent("sanabel",22,49));
students.push(createStudent("amera",22,70));
students.push( createStudent("nada",22,55));
 let successStudents = [];
 let fialedStudents = [];
 
 for ( let i = 0; i < students.length; i++) {
    if(students[i].mark>=50){

    successStudents.push(students[i]);}
    else{
        fialedStudents.push(students[i]);
    }
 }
 console.log("success student", successStudents);
 console.log("failed student", fialedStudentsStudents);