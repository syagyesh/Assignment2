console.log("Hello World!");

const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

if(localStorage.getItem("peopleList") === null){
    localStorage.setItem("peopleList", JSON.stringify([]));
    
}

const ValidateForm = () => {
    if (name.value === "" || email.value === "" || phone.value === "" || email.value.includes("@") === false) {
        alert("Please fill all the fields");
        return false;
    } else {
        console.log(name.value, email.value, phone.value);
        return true;
    }
};

const showData = () => {
    console.log("clicked");
    let peopleList;
    if(localStorage.getItem("peopleList") === null){
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    let html = '';
    peopleList.forEach((person, index) => {
        html += `
        <tr>
            <td>${index + 1}</td>
            <td>${person.name}</td>
            <td>${person.email}</td>
            <td>${person.phone}</td>
            <td><button onclick="editPerson(${index})">Edit</button></td>
            <td><button onclick="deletePerson(${index})">Delete</button></td>
        </tr>
        `;
    });

    document.getElementById("tableBody").innerHTML = html;
};

document.onload = showData();

name.focus();

phone.onkeyup = (e) => {
    if(e.code === "Enter"){
        console.log("Enter Pressed");
        addPerson();
    }
};

const addPerson = () => {
    if(ValidateForm() == true) {
        let peopleList;
        if(localStorage.getItem("peopleList") === null){
            peopleList = [];
        }
        else{
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }
        const person = {
            name: name.value,
            email: email.value,
            phone: phone.value
        };
        peopleList.push(person);
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        name.value = "";
        email.value = "";
        phone.value = "";
        showData();
    }
};

const editPerson = (index) => {
    let peopleList = JSON.parse(localStorage.getItem("peopleList"));
    peopleList.forEach((person, i) => {
        if(i === index){
            name.value = person.name;
            email.value = person.email;
            phone.value = person.phone;
            peopleList.splice(index, 1);
        }
    });
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
};

const deletePerson = (index) => {
    let peopleList = JSON.parse(localStorage.getItem("peopleList"));
    peopleList.forEach((person, i) => {
        if(i === index){
            peopleList.splice(index, 1);
        }
    });
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
};