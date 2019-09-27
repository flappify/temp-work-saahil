function profileURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#profile-pic')
                .attr('src', e.target.result)
                .width(200)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function docreqURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#docreq')
                .attr('src', e.target.result)
                .width(200)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
var time = new Date();
document.getElementById("curr-time").innerHTML = time;


/*var firebaseConfig = {
    apiKey: "AIzaSyBr4rgN0lMD9vGmqWtfWc1XBwxGyRVeDBg",
    authDomain: "aief-d.firebaseapp.com",
    databaseURL: "https://aief-d.firebaseio.com",
    projectId: "aief-d",
    storageBucket: "aief-d.appspot.com",
    messagingSenderId: "678605570021",
    appId: "1:678605570021:web:d1b2353fa65004f2cd790c"
  };
  */
  // Initialize Firebase
  //var app=firebase.initializeApp(firebaseConfig);
 // var contactRef = firebase.firestore(app);

$( "#signup" ).submit(function( event ) {
  var name=document.getElementById("name").value;
var email=document.getElementById("email").value;
var phone=document.getElementById("phone").value;
var dob=document.getElementById("dob").value;
console.log(name,email,phone,dob)
  event.preventDefault();
  var err=validateSignUpSubmit(signup);
  if(err===true)
  {
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
    //firebasePush(name,email,phone,message,dateTime);
    $("#signup").trigger("reset");
  }
});

function validateSignUpSubmit(signup) {
    var error=0;
    error += validateName(signup.name);
    error += validateEmail(signup.email);
    error += validatePhone(signup.phone);
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
  console.log(name.value);
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
  console.log(email.value);
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
    console.log(phone.value);
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