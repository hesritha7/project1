let date=new Date();

let datetime=document.getElementById("datetime");

if(datetime){
datetime.innerHTML=date;
}

let projects=JSON.parse(localStorage.getItem("projects")) || [];

displayProjects();

function registerProject(){

let name=document.getElementById("name").value;
let regno=document.getElementById("regno").value;
let email=document.getElementById("email").value;
let mobile=document.getElementById("mobile").value;
let dept=document.getElementById("dept").value;
let year=document.getElementById("year").value;
let category=document.getElementById("category").value;
let title=document.getElementById("title").value;
let team=document.getElementById("team").value;
let members=document.getElementById("members").value;

let message=document.getElementById("message");

if(name==="" || regno==="" || email==="" || mobile==="" || dept==="" || year==="" || category==="" || title==="" || team==="" || members===""){

message.style.color="red";
message.textContent="Please Fill All Fields";
return;

}

if(mobile.length!==10){

message.style.color="red";
message.textContent="Mobile Number must be 10 digits";
return;

}

if(members<2 || members>4){

message.style.color="red";
message.textContent="Team size must be between 2 and 4";
return;

}

if(category==="Cyber Security" || category==="Cloud"){

message.style.color="red";
message.textContent="Selected Category is Closed";
return;

}

let duplicate=projects.some(function(project){

return(project.regno===regno || project.title.toLowerCase()===title.toLowerCase());

});

if(duplicate){

message.style.color="red";
message.textContent="Duplicate Registration Not Allowed";
return;

}

let project={

regno:regno,
name:name,
category:category,
title:title,
team:team,
members:members,
status:"Registered"

};

projects.push(project);

localStorage.setItem("projects",JSON.stringify(projects));

message.style.color="green";
message.textContent="Project Registered Successfully";

displayProjects();

document.getElementById("projectForm").reset();

}

function displayProjects(){

let tableBody=document.getElementById("tableBody");

if(!tableBody){
return;
}

tableBody.innerHTML="";

projects.forEach(function(project){

let row=`<tr>
<td>${project.regno}</td>
<td>${project.name}</td>
<td>${project.category}</td>
<td>${project.title}</td>
<td>${project.team}</td>
<td>${project.members}</td>
<td>${project.status}</td>
</tr>`;

tableBody.innerHTML+=row;

});

}

function searchProjects(){

let searchName=document.getElementById("searchName").value.toLowerCase();

let searchCategory=document.getElementById("searchCategory").value.toLowerCase();

let filteredProjects=projects.filter(function(project){

let nameMatch=project.name.toLowerCase().includes(searchName);

let categoryMatch=searchCategory==="" || project.category.toLowerCase()===searchCategory;

return(nameMatch && categoryMatch);

});

let tableBody=document.getElementById("tableBody");

tableBody.innerHTML="";

filteredProjects.forEach(function(project){

let row=`<tr>
<td>${project.regno}</td>
<td>${project.name}</td>
<td>${project.category}</td>
<td>${project.title}</td>
<td>${project.team}</td>
<td>${project.members}</td>
<td>${project.status}</td>
</tr>`;

tableBody.innerHTML+=row;

});

}

function resetSearch(){

document.getElementById("searchName").value="";

document.getElementById("searchCategory").value="";

displayProjects();

}

function submitFeedback(){

let fname=document.getElementById("fname").value;

let freg=document.getElementById("freg").value;

let category=document.getElementById("fcategory").value;

let rating=document.getElementById("rating").value;

let comments=document.getElementById("comments").value;

let feedbackMessage=document.getElementById("feedbackMessage");

if(fname==="" || freg==="" || category==="" || rating==="" || comments===""){

feedbackMessage.style.color="red";
feedbackMessage.textContent="Please Fill All Fields";
return;

}

if(comments.length<20){

feedbackMessage.style.color="red";
feedbackMessage.textContent="Comments must contain minimum 20 characters";
return;

}

feedbackMessage.style.color="green";
feedbackMessage.textContent="Feedback Submitted Successfully";

document.getElementById("feedbackForm").reset();

}