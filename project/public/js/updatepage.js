
var myAlert =  function(){ alert("You must select a class!");};
document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('select[id="project"]').onchange=changeEventHandler;
}, false);

document.addEventListener('DOMContentLoaded',function() {
	var tablinks = document.getElementsByClassName("tablinks");
	for(var i = 0; i < tablinks.length; i++){
		tablinks[i].addEventListener('click', myAlert);
	}
}, false);

function changeEventHandler(event) {
	var project = document.getElementById("project");
	var projectPDF = document.getElementById("projectInfoPDF");
	var selectedValue = project.options[project.selectedIndex];
    projectPDF.src = "";
    projectPDF.src = "/static/documents/Project/" + selectedValue.text;
}

function bindButtons(event, Class_ID, Class_Name, Semester_Taken, Prof_Name, SyllabusFilePath, FinalGrade){
	var tablinks = document.getElementsByClassName("tablinks");
	var functionArray = [];
	var btnClass = document.getElementById("btnClass");
	var btnSyllabus = document.getElementById("btnSyllabus");
	var btnProject = document.getElementById("btnProject");

	var classEvents = function(event){
		updateClass(Class_ID, Class_Name, Semester_Taken, Prof_Name, SyllabusFilePath, FinalGrade);
		openTab(event, 'classInfo');
		btnClass.removeEventListener('click', classEvents);
	}
	var syllabusEvents = function(event){
		updateSyllabus(SyllabusFilePath);
		openTab(event, 'syllabusInfo');
		btnSyllabus.removeEventListener('click', syllabusEvents);
	}
	var projectEvents = function(event){
		updateProject(Class_ID);
		openTab(event, 'projectInfo');
		btnProject.removeEventListener('click', projectEvents);
	}

	activeLink(event, "classLinks");
	updateClass(Class_ID, Class_Name, Semester_Taken, Prof_Name, SyllabusFilePath, FinalGrade);
	openTab("btnClass", "classInfo");

	functionArray.push(classEvents, syllabusEvents, projectEvents);
	for(var i = 0; i < tablinks.length; i++){ 
		tablinks[i].removeEventListener('click', myAlert);
		tablinks[i].addEventListener('click', functionArray[i]);
	}
	displayProjects();
}

function updateClass(Class_ID, Class_Name, Semester_Taken, Prof_Name, SyllabusFilePath, FinalGrade){
	document.getElementById("Class_ID").innerHTML = (Class_ID);
	document.getElementById("Class_Name").innerHTML = (Class_Name);
	document.getElementById("Semester_Taken").innerHTML = (Semester_Taken);
	document.getElementById("Prof_Name").innerHTML = (Prof_Name);
	document.getElementById("SyllabusFilePath").innerHTML = (SyllabusFilePath);
	document.getElementById("FinalGrade").innerHTML = (FinalGrade);
}
function updateSyllabus(SyllabusFilePath){
	var syllabus = document.getElementById("syllabusInfo"); // <div> parent
	var syllabusChild = syllabus.firstElementChild; // <iframe> child node
	syllabusChild.src = ""; // Clear the src in the <iframe>
	syllabusChild.src = "/static/documents/Syllabus/" + SyllabusFilePath; // embed the pdf file
}
function displayProjects(){
	var class_ID = document.querySelectorAll("option.projects");
	console.log(class_ID.length + " length in displayProjects.");
	for(var i = 0; i < class_ID.length; i++){
		class_ID[i].style.display = "block";
	}
}
function updateProject(id){
	var project = document.getElementById("projectInfoPDF");
	var class_ID = document.querySelectorAll("option.projects");
	for(var i = 0; i < class_ID.length; i++){
		if(class_ID[i].value === id && class_ID[i].text !== ""){
			class_ID[i].style.display = "block";
			class_ID[i].selected = "selected";
			project.src = "";
			project.src = "/static/documents/Project/" + class_ID[i].text;
		}
		else
			class_ID[i].style.display = "none";
	}
}
function openTab(event, tabName) {
    var tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    activeLink(event, "tablinks");
    document.getElementById(tabName).style.display = "block";
}
function activeLink(event, className) {
    var tabcontent, tablinks;
    myLinks = document.getElementsByClassName(className);
    for (var i = 0; i < myLinks.length; i++) {
        myLinks[i].className = myLinks[i].className.replace(" active", "");
    }
    if(event === "btnClass") 
    	document.getElementById("btnClass").className += " active";
    else
    	event.target.className += " active";
}