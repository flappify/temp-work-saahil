var firebaseConfig = {
    apiKey: "AIzaSyDkuenjxrzaJoOapuflSbc9yajDm-G4xf8",
    authDomain: "demoupload-a56aa.firebaseapp.com",
    databaseURL: "https://demoupload-a56aa.firebaseio.com",
    projectId: "demoupload-a56aa",
    storageBucket: "demoupload-a56aa.appspot.com",
    messagingSenderId: "890074596979",
    appId: "1:890074596979:web:1b368c0657f60bf8d68c06"
  };
  var app=firebase.initializeApp(firebaseConfig);
  var contactRef = firebase.firestore(app);
  var FileSize,file,metadata;
  var storage = firebase.storage();
  var storageRef = storage.ref();
  var fileButton=document.getElementById('uploadbutton');
  fileButton.addEventListener('change',function (e){
    file=e.target.files[0];
    FileSize = file.size / 1024;
    console.log(FileSize);
  })
  /*function filechecker(file){
    const acceptedImageTypes = ['image/jpeg', 'image/png'];
    if(file && acceptedImageTypes.includes(file['type'])){
      return true
    }
    else{
      return false
    }
  }*/
  $( "#contact" ).submit(function( event ) {
    var name=document.getElementById("name").value;
    event.preventDefault();
    var err=validateFormOnSubmit(contact);
    if(err===true)
    {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
      firebasePush(name,dateTime);
      metadata = {
        'contentType': file.type
      };
  storageRef.child('images/'+name).put(file, metadata).then(function(snapshot) {
    storageRef.child('images/'+name).getDownloadURL().then(function(url) {
      var test = url;
      document.getElementById('upimage').src=test;
    }).catch(function(error) {
    
    });
  }).catch(function(error) {
    console.error('Upload failed:', error);
  });
      alert('form submitted');
      $("#contact").trigger("reset");
    }
  });
  
  function validateFormOnSubmit(contact) {
      var error=0;
      error += validateName(contact.name);
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
          error = error + 1;
      } else {
          name.style.outline = '0';
      }
      return error;
  }

  function firebasePush(name,dateTime) {
    //push itself
    contactRef.collection("signUP").doc().set({
      name: name,
      dateTime:dateTime
  })
  }

  