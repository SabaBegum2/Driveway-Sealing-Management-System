
// This is the frontEnd calls that interact with the HTML pages directly
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = document.body.getAttribute('data-page');  // Identify the current page
    console.log(`Current page: ${currentPage}`);


    // Execute the correct setup function based on the page
    if(currentPage === 'LoginPage') {
            const loginForm = document.getElementById("login-form");
            loginForm.addEventListener("submit", submitLoginForm);
            submitLoginForm();  // Fetch data for the search page
    }
    else if (currentPage === 'RegistrationPage') {
            const registrationForm = document.getElementById('registrationForm');
            registrationForm.addEventListener("submit", submitRegistrationForm);
            submitRegistrationForm();  // Setup registration form event
    }
    else {
    fetch('http://localhost:5050/getall')     
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    }
});


//// PURPOSE: LOGIN FORM
function submitLoginForm(event) {
    event.preventDefault(); // Prevent default form submission

    const client_id = document.getElementById("ClientID-input").value;
    const password = document.getElementById("password-input").value;

    console.log("ClientID:", client_id); // debugging
    console.log("password:", password); // debugging

    // Send the login data to the server
    fetch('http://localhost:5050/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ client_id, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login successful');
            window.location.href = 'http://127.0.0.1:5500/Client/SearchDirectory.html'; // Redirect after successful login
        } else {
            alert(data.error); // Show error message from the server
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during login. Please try again.');
    });
}



//// PURPOSE: REGISTRATION FORM
function submitRegistrationForm(event) {

        // prevent the default reload action of the page
        event.preventDefault();

        // Get the registration form inputs
        const client_id = document.getElementById("#clientID-input").value;
        const email = document.querySelector('#email-input').value.trim();
        const password = document.querySelector('#password-input').value.trim();
        const firstName = document.querySelector('#firstName-input').value.trim();
        const lastName = document.querySelector('#lastName-input').value.trim();
        const phoneNumber = document.querySelector('#phoneNumber-input').value.trim();
        const creditCardNum = document.querySelector('#creditCardNum-input').value.trim();
        const creditCardCVV = document.querySelector('#creditCardCVV-input').value.trim();
        const creditCardExp = document.querySelector('#creditCardExp-input').value.trim();
        // Get values from individual address fields
        const streetAddress = document.getElementById("#streetAddress-input").value.trim();
        const city = document.getElementById("#city-input").value.trim();
        const state = document.getElementById("#state-input").value.trim();
        const zipCode = document.getElementById("#zipCode-input").value.trim();

        // Concatenate address components
        const homeAddress = `${streetAddress}, ${city}, ${state}, ${zipCode}`;

        // Assign concatenated address to the hidden input field
        //const homeAddress = document.querySelector('#homeAddress-input').value.trim();

        // Check values against these characters
        const invalidChars = /[@#$%^&*()_+=[\]{};:"\\|,.<>/?]+/;
        const invalidClientIDChars = /[@#$%^&*()+=[\]{};:"\\|,.<>/?]+/;
        const invalidEmailChars = /[[\](){};:\\|,<>/?]+/;
        const invalidPasswordChars = /[[\]{};:\\|,<>/]+/;

        // Check if firstName or lastName is less than 2 characters
        if (firstName.length < 2 || lastName.length < 2) {          // Check if firstName is less than 2 characters
            alert("Not enough characters in first or last name.");  // Throw error to user
            return; // Exit function
        }
        // Check if first or last name contains special characters
        if (invalidChars.test(firstName) || invalidChars.test(lastName)) {
            alert("First or Last name cannot contain special characters"); // Throw error to user
            return;
        }

        // Check if client_id has whitespace
        if (client_id.includes(" ")) { // Check if client_id contains whitespace
            alert("User ID cannot contain whitespace"); // Throw error to user
            return; // Exit function
        }
        // Check if client_id is less than 4 characters
        if (client_id.length < 4) { // Check if client_id is less than 2 characters
            alert("User ID must be at least 2 characters"); // Throw error to user
            return; // Exit function
        }
        // Check if Client_ID contains special characters
        if (invalidClientIDChars.test(client_id)) {
            alert("User ID cannot contain special characters"); // Throw error to user
            return;
        }

        // Check if email has whitespace
        if (email.includes(" ")) { // Check if email contains whitespace
            alert("Email cannot contain whitespace"); // Throw error to user
            return; // Exit function
        }
        // Check if email is less than 4 characters
        if (email.length < 8) { // Check if email is less than 2 characters
            alert("Please enter valid email length."); // Throw error to user
            return; // Exit function
        }
        // Check if email contains special characters
        if (invalidEmailChars.test(email)) {
            alert("Invalid email address characters"); // Throw error to user
            return;
        }

        // Check if password has whitespace
        if (password.includes(" ")) { // Check if password contains whitespace
            alert("Password cannot contain whitespace"); // Throw error to user
            return;
        }
        // Check if password is less than 8 characters
        if (password.length < 8) { // Check if password is less than 8 characters
            alert("Password must be at least 8 characters"); // Throw error to user
            return; // Exit function
        }
        // Check if password contains special characters
        if (invalidPasswordChars.test(password)) {
            alert("Password cannot contain special characters: []{};:\\|.<>/?"); // Throw error to user
            return;
        }

 
        fetch('http://localhost:5050/register', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({client_id, email, password, firstName, lastName, phoneNumber, creditCardNum, creditCardCVV, creditCardExp, homeAddress})
        })
        .then(response => response.json())
        .then(data => {
            alert("New registration successful!");
            console.log(data);  // debugging
            window.location.href = 'http://127.0.0.1:5500/Client/LoginPage.html'; // Redirect after successful login
        })
        .catch(error => console.error("Error: ", error));
    //}
}

// PURPOSE: SEARCH DATABASE FOR VALUES
// when the searchBtn is clicked
const searchBtn =  document.querySelector('#search-btn');
searchBtn.onclick = function (){
    console.log("Search button clicked for first name");
    const searchInput = document.querySelector('#search-input');
    console.log("Search input: ", searchInput);
    const searchValue = searchInput.value;
    console.log("Search value: ", searchValue);
    searchInput.value = "";

    fetch('http://localhost:5050/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    console.log("Search button clicked for first name");
}

// when the searchBtn is clicked
const searchLastNameBtn =  document.querySelector('#search-lastName-btn');
searchLastNameBtn.onclick = function (){
    console.log("Search button clicked for last name");
    const searchInput = document.querySelector('#search-lastName-input');
    console.log("Search input: ", searchInput);
    const searchValue = searchInput.value;
    console.log("Search value: ", searchValue);
    searchInput.value = "";

    fetch('http://localhost:5050/searchLastName/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    console.log("Search button clicked for last name");
}


// when the searchBtn is clicked
const searchFullNameBtn =  document.querySelector('#search-full-name-btn');
searchFullNameBtn.onclick = function (){
    const firstInput = document.querySelector('#firstName-input');
    const firstName = firstInput.value;
    firstInput.value = "";

    const lastInput = document.querySelector('#lastName-input');
    const lastName = lastInput.value;
    lastInput.value = "";

    fetch(`http://localhost:5050/search/fullname/${firstName}/${lastName}`)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}


// When client_id search button is clicked
const searchClientIDBtn =  document.querySelector('#search-ClientID-btn');
searchClientIDBtn.onclick = function (){
    console.log("Search button clicked for client_id");
    const searchInput = document.querySelector('#search-ClientID-input');
    console.log("Search input: ", searchInput);
    const searchValue = searchInput.value;
    console.log("Search value: ", searchValue);
    searchInput.value = "";

    fetch('http://localhost:5050/searchClientID/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    console.log("Search button clicked for last name");
}


// When Salary search button is clicked
const searchSalaryBtn =  document.querySelector('#search-salary-btn');
searchSalaryBtn.onclick = function (){
    const minInput = document.querySelector('#min-salary-input');
    const minSalary = minInput.value;
    minInput.value = "";

    const maxInput = document.querySelector('#max-salary-input');
    const maxSalary = maxInput.value;
    maxInput.value = "";

    fetch(`http://localhost:5050/search/salary/${minSalary}/${maxSalary}`)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}


// When Salary search button is clicked
const searchAgeBtn =  document.querySelector('#search-age-btn');
searchAgeBtn.onclick = function (){
    const minInput = document.querySelector('#min-age-input');
    const minAge = minInput.value;
    minInput.value = "";

    const maxInput = document.querySelector('#max-age-input');
    const maxAge = maxInput.value;
    maxInput.value = "";

    fetch(`http://localhost:5050/search/age/${minAge}/${maxAge}`)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}


// Search registered after a specific user
const searchRegAfterUserBtn = document.querySelector('#search-reg-after-btn');
searchRegAfterUserBtn.onclick = function () {
    const ClientIDInput = document.querySelector('#after-reg-input');
    const client_id = ClientIDInput.value;
    ClientIDInput.value = "";

    fetch(`http://localhost:5050/search/regAfter/${client_id}`)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}


// Search registered on same day as a specific user
const searchRegSameDayAsUserBtn = document.querySelector('#search-same-day-reg-btn');
searchRegSameDayAsUserBtn.onclick = function () {
    const ClientIDInput = document.querySelector('#same-day-reg-input');
    const client_id = ClientIDInput.value;
    ClientIDInput.value = "";

    fetch(`http://localhost:5050/search/regSameDay/${client_id}`)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}


// Search ClientDB who never signed in
const searchNeverSignedInBtn = document.querySelector('#search-never-signedin-btn');
searchNeverSignedInBtn.onclick = function () {
    fetch(`http://localhost:5050/search/neverSignedIn`)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

// Search ClientDB who never signed in
const searchRegToday = document.querySelector('#search-new-reg-btn');
searchRegToday.onclick = function () {

    fetch(`http://localhost:5050/search/regToday`)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}



// this function is used for debugging only, and should be deleted afterwards
function debug(data)
{
    fetch('http://localhost:5050/debug', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({debug: data})
    })
}


// Insert new row into the table from the Registration page
function insertRowIntoTable(data){

   debug("userindex.js: insertRowIntoTable called: ");
   debug(data);

   const table = document.querySelector('table tbody');
   debug(table);

   const isTableData = table.querySelector('.no-data');

   // debug(isTableData);

   let tableHtml = "<tr>";
   
   for(var key in data){                // iterating over the each property key of an object data
      if(data.hasOwnProperty(key)){     // key is a direct property for data
            if(key === 'registerday'){  // the property is 'registerday'
                data[key] = new Date(data[key]).toISOString().split('T')[0];
            }
            else if (key === 'signintime'){
                data[key] = new Date(data[key]).toLocaleString(); // format to javascript string
            }
            tableHtml += `<td>${data[key]}</td>`;
      }
   }

   tableHtml += "</tr>";

    if(isTableData){
       debug("case 1");
       table.innerHTML = tableHtml;
    }
    else {
        debug("case 2");
        // debug(tableHtml);

        const newrow = table.insertRow();
        newrow.innerHTML = tableHtml;
    }
}

function loadHTMLTable(data){
    debug("userindex.js: loadHTMLTable called.");

    const table = document.querySelector('table tbody'); 
    
    if(data.length === 0){
        table.innerHTML = "<tr><td class='no-data' colspan='8'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";
    data.forEach(function ({client_id, email, password, firstName, lastName, phoneNumber, creditCardNum, creditCardCVV, creditCardExp, homeAddress}){
        tableHtml += "<tr>";
        tableHtml +=`<td>${client_id}</td>`;
        tableHtml +=`<td>${email}</td>`;
        tableHtml +=`<td>${password}</td>`;
        tableHtml +=`<td>${firstName}</td>`;
        tableHtml +=`<td>${lastName}</td>`;
        tableHtml +=`<td>${phoneNumber}</td>`;
        tableHtml +=`<td>${creditCardNum}</td>`;
        tableHtml +=`<td>${creditCardCVV}</td>`;
        tableHtml +=`<td>${creditCardExp}</td>`;
        tableHtml +=`<td>${homeAddress}</td>`;
        tableHtml +=`<td>${new Date(registerDate).toISOString().split('T')[0]}</td>`;
        tableHtml +=`<td>${loginTime ? new Date(loginTime).toLocaleString() : "" }</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}