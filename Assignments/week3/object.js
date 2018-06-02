

	
	var studentArr = [];
		var student = {
			id: 1,
			fName: "Jonathan",
			lName: "Perry",
			grade: 95,
			fullName : function() {
				return this.fName + " " + this.lName;
			}
		};
document.getElementById("output1").textContent = student.fullName();

	// document.getElementById("output1").textContent = "Jonathan";
	//var classRoom = {
	//teacherID: 4,
	//teacherFName: "Harold",
	//teacherLName: "Kumar" 
	// ARRAY TO HOLD NEW STUDENT OBJECTS

// STUDENT OBJECT CONSTRUCTOR
function createStudent(id, fName, lName, grade){
 		this.id = id;
		this.fName = fName;
		this.lName = lName;
		this.grade = grade;
	}
	this.changeFName = function(FName){
		this.fName = FName;
	}
	this.changeLName = function(LName){
		this.lName = LName;
	}
	this.changeGrade = function(grade){
		this.grade = grade;
	}
};


//document.getElementById("output2").textContent = classRoom.student.fName + ' ' + classRoom.student.lName;