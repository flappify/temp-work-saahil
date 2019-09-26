//navbar
var hamburger=document.querySelector('.hamburger');
var menu=document.querySelector('.menu');
hamburger.addEventListener('click',showmenu);

function showmenu(){
  hamburger.classList.toggle('hamactive');
  menu.classList.toggle('menuactive');
}



var swiper = new Swiper('.swiper-container', {
    autoplay: {
        delay: 5000,
      }, 
      zoom: {
        maxRatio: 2,
        toggle:false
      },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  /** HELP-DESK **/
  var firebaseConfig = {
    apiKey: "AIzaSyBr4rgN0lMD9vGmqWtfWc1XBwxGyRVeDBg",
    authDomain: "aief-d.firebaseapp.com",
    databaseURL: "https://aief-d.firebaseio.com",
    projectId: "aief-d",
    storageBucket: "aief-d.appspot.com",
    messagingSenderId: "678605570021",
    appId: "1:678605570021:web:d1b2353fa65004f2cd790c"
  };
  // Initialize Firebase
  var app=firebase.initializeApp(firebaseConfig);
  var contactRef = firebase.firestore(app);

$( "#contact" ).submit(function( event ) {
  var name=document.getElementById("name").value;
var email=document.getElementById("email").value;
var phone=document.getElementById("phone").value;
var message=document.getElementById("message").value;
  event.preventDefault();
  var err=validateFormOnSubmit(contact);
  if(err===true)
  {
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
    firebasePush(name,email,phone,message,dateTime);
    document.querySelector('.alert').style.display = 'block';
    setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
    },3000);
    $("#contact").trigger("reset");
  }
});

function validateFormOnSubmit(contact) {
    var error=0;
    error += validateName(contact.name);
    error += validateEmail(contact.email);
    error += validatePhone(contact.phone);
    error += validateMessage(contact.message);
    if (error > 0) {
        return false;
    }
    else {
    return true;
    }
}

// validate required fields
function validateName(name) {
  var error=0;
    if (name.value.length == 0) {
        name.style.outline = "2px solid #ff9f9f";
        document.getElementById('name-error').innerHTML = "The required field has not been filled in";
        error = error + 1;
    } else {
        name.style.outline = '0';
        document.getElementById('name-error').innerHTML = '';
    }
    return error;
}

// validate email as required field and format
function trim(s) {
    return s.replace(/^\s+|\s+$/, '');
}

function validateEmail(email) {
  var error=0;
    var temail = trim(email.value); // value of field with whitespace trimmed off
    var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
    var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;

    if (email.value == "") {
        email.style.outline = "2px solid #ff9f9f";
        document.getElementById('email-error').innerHTML = "Please enter an email address.";
        error = error + 1;
    } else if (!emailFilter.test(temail)) { //test email for illegal characters
        email.style.outline = "2px solid #ff9f9f";
        document.getElementById('email-error').innerHTML = "Please enter a valid email address.";
        error = error + 1;
    } else if (email.value.match(illegalChars)) {
        email.style.outline = "2px solid #ff9f9f";
        error = error + 1;
        document.getElementById('email-error').innerHTML = "Email contains invalid characters.";
    } else {
        email.style.outline = '0';
        document.getElementById('email-error').innerHTML = '';
    }
    return error;
}

// validate phone for required and format
function validatePhone(phone) {
    var error = "0";
    var stripped = phone.value.replace(/[\(\)\.\-\ ]/g, '');

    if (phone.value == "") {
        document.getElementById('phone-error').innerHTML = "Please enter a phone number";
        phone.style.outline = "2px solid #ff9f9f";
        error = error + 1;
    } else if (isNaN(parseInt(stripped))) {
      error = error + 1;
        document.getElementById('phone-error').innerHTML = "The phone number contains illegal characters.";
        phone.style.outline = "2px solid #ff9f9f";
    } else if (stripped.length < 10) {
      error = error + 1;
        document.getElementById('phone-error').innerHTML = "The phone number is too short.";
        phone.style.outline = "2px solid #ff9f9f";
    } else {
        phone.style.outline = '0';
        document.getElementById('phone-error').innerHTML = '';
    }
    return error;
}

function validateMessage(message) {
  var error=0;
    if (message.value.length == 0) {
        message.style.outline = "2px solid #ff9f9f";
        document.getElementById('message-error').innerHTML = "The required field has not been filled in";
        error = error + 1;
    } else {
      message.style.outline = '0';
      document.getElementById('message-error').innerHTML = '';
    }
    return error;
}

function firebasePush(name,email,phone,message,dateTime) {
  //push itself
  contactRef.collection("helpDesk").doc().set({
    name: name,
    email:email,
    phone:phone,
    message:message,
    dateTime:dateTime
})
}