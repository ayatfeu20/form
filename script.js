// Input fields
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const output = document.querySelector('#output');



// Form
const form = document.getElementById('myForm');
// Validation colors
const green = '#4CAF50';
const red = '#F44336';

let users = [];

const renderUsers = () => {

  output.innerHTML = '';
  users.forEach(user => {

    let html = `
    <div class="user">
      <div class="text">
        <h5>${user.firstName} ${user.lastName}</h5>
        <small>${user.email}</small>
      </div>
        <button class="btn red accent-4">delete</button>
      </div>
    </div>
`

    output.innerHTML += html
  })
}



// Handle form
form.addEventListener('submit', function(event) {
  // Prevent default behaviour
  event.preventDefault();
  if (
    validateFirstName() &&
    validateLastName() &&
    validateEmail()
  ) {
    const name = firstName.value;
    const container = document.querySelector('div.container');
    const loader = document.createElement('div');
    loader.className = 'progress';
    const loadingBar = document.createElement('div');
    loadingBar.className = 'indeterminate';
    loader.appendChild(loadingBar);
    container.appendChild(loader);
    
    setTimeout(function() {
      const loaderDiv = document.querySelector('div.progress');
      const panel = document.createElement('div');
      panel.className = 'card-panel green';
      const text = document.createElement('span');
      text.className = 'white-text';
      text.appendChild(
        document.createTextNode(
          `Register successful, ${name}`
        )
      );
      panel.appendChild(text);
      container.replaceChild(panel, loaderDiv);
    }, 1000);


    const createUser = (firstName, lastName, email) => {
        let user = {
          id: Date.now().toString(),
          firstName,
          lastName,
          email
        }
      
        users.push(user);
        console.log(users);
      }
      
      renderUsers();
      
      createUser(firstName.value, lastName.value, email.value);
      renderUsers();
        
      }    
    
    })  

     
    

    output.addEventListener('click', function (event) {

      if(event.target.classList.contains('btn red accent-4'))
      deleteUser(event.target.parentNode.id)
  
  })
  
  const deleteUser = id => {
    users = users.filter(user => user.id != id);
    listUsers(users);
  }

    
    
    
   

// Validators
function validateFirstName() {
  // check if is empty
  if (checkIfEmpty(firstName)) return;
  // is if it has only letters
  if (!checkIfOnlyLetters(firstName)) return;
  return true;
}
function validateLastName() {
  // check if is empty
  if (checkIfEmpty(lastName)) return;
  // is if it has only letters
  if (!checkIfOnlyLetters(lastName)) return;
  return true;
}

function validateEmail() {
  if (checkIfEmpty(email)) return;
  if (!containsCharacters(email)) return;
  return true;
}
// Utility functions
function checkIfEmpty(field) {
  if (isEmpty(field.value.trim())) {
    // set field invalid
    setInvalid(field, `${field.name} must not be empty`);
    return true;
  } else {
    // set field valid
    setValid(field);
    return false;
  }
}
function isEmpty(value) {
  if (value === '') return true;
  return false;
}
function setInvalid(field, message) {
  field.className = 'invalid';
  field.nextElementSibling.innerHTML = message;
  field.nextElementSibling.style.color = red;
}
function setValid(field) {
  field.className = 'valid';
  field.nextElementSibling.innerHTML = '';
  //field.nextElementSibling.style.color = green;
}
function checkIfOnlyLetters(field) {
  if (/^[a-zA-Z ]+$/.test(field.value)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} must contain only letters`);
    return false;
  }
}

function containsCharacters (email){
    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email.value)) {
        setValid(email);
        return true;
      } else {
        setInvalid(email, ` must be valid email`);
        return false;
      }
    }

    

    
    
    
    

