let backgroundC = 0;
var isAnonymous;
var uid;
let currentPage;
let selectedImages;
let selectedImages2;

// getting page url and loading appropriate page 
var currentUrl = window.location.href;
currentPage= currentUrl.split("/")[3]
console.log(currentPage);
var pagesArr = ['home','islander','spa','boatY','ecoCamp','admin']
var defaultPage = "foodMenu"
if(pagesArr.indexOf(currentPage)>-1) {
    loadContent(currentPage);
} else {
    loadContent(defaultPage);
}

window.addEventListener("scroll", scrollAppear);
// firebase config
var firebaseConfig = {
    apiKey: "AIzaSyDDHbLbjatJM6QZfpJyjEzTCCMS2Dql5q0",
    authDomain: "mabuhay-15b29.firebaseapp.com",
    projectId: "mabuhay-15b29",
    storageBucket: "mabuhay-15b29.appspot.com",
    messagingSenderId: "466179403967",
    appId: "1:466179403967:web:572d5ca4b7a1fa1c70160a",
    measurementId: "G-3E6K0KJ2PE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
console.log(firebase);

setInterval(function(){
    const backgroundsss = document.querySelectorAll(".background")
    backgroundsss.forEach(element => {
        element.style.opacity = "0";
    });
     backgroundsss[backgroundC].style.opacity= "1";
     backgroundC++;
     if(backgroundC ===backgroundsss.length) {
         backgroundC = 0
     }
}, 10000);
firebase.auth().onAuthStateChanged(function(user) {
    var bacccs = document.querySelector(".fillOne");
    var faccc1 = document.querySelectorAll(".fillTwo")[0];
    var faccc2 = document.querySelectorAll(".fillTwo")[1];
    if (user) {
        // User is signed in.
        isAnonymous = user.isAnonymous;
        uid = user.uid;
        console.log(uid,isAnonymous);
        if(uid && !isAnonymous) {
            bacccs.style.fill = "orange";
            faccc1.style.fill = "black";
            faccc2.style.fill = "black";
            var admins = document.querySelectorAll(".admin");
            admins.forEach(element => {
                element.style.display = "block"
            });
            
            loadContent('eventsNews');
        } else {
            bacccs.style.fill = "#BDBFC1";
            faccc1.style.fill = "#6B809B";
            faccc2.style.fill = "#6B809B";
            loadContent(currentPage);
            var admins = document.querySelectorAll(".admin");
            admins.forEach(element => {
                element.style.display = "none"
            });
        }
    } else {
        // User is signed out.
        // ...
        bacccs.style.fill = "#BDBFC1";
        faccc1.style.fill = "#6B809B";
        faccc2.style.fill = "#6B809B";
        var admins = document.querySelectorAll(".admin");
            admins.forEach(element => {
                element.style.display = "none"
            });
        firebase.auth().signInAnonymously().catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            
        });
        
        // admin(false);
    }
// ...
});


function loging() {
    const email = document.getElementById("emailID").value;
    const password = document.getElementById("passwordID").value;
    if (!validateEmail(email)) {
        return alert("Kindly input email correctly")
    }
    if (!password) {
        return alert("kindly input the password")
    }
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    loadContent("admin")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  });
}
const db = firebase.firestore();
let newss = []
console.log("this DB",db);
db.collection("events")
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // book_info = {id: doc.id, ...doc.data()}
      newss.push({ id: doc.id, ...doc.data() });
    });
    // add data to the DOM
    let listPlaceHolder = document.getElementById("newsBody");
    let designss = "";
    console.log(newss)
    newss.forEach(element => {
        if(element) {
            let imgss='',titile23='',from23='',to23='',descripttt='',cost344='';
            if(element.pictures) {
                element.pictures.forEach(img =>{
                    imgss = imgss + `<img src="`+ img +`" ></img>`
                });
            }
            
            
            if(element.title){titile23 = element.title};
            if(element.from) {
                console.log(element.from)
                let dt = new Date(element.from.seconds * 1000);
                console.log(dt)
                from23 =''+ dt;
            }
            if(element.to) {
                let dt = new Date(element.to.seconds * 1000)
                to23 =''+ dt;
            }
            if(element.description) {descripttt = element.description}
            if (element.cost) { cost344 = element.cost}
            designss= designss+  `<div class="carrd">
                                    <div class="text">
                                        <h3 class="title">`+titile23+`</h3>
                                        <h4 class="from"><b>from: `+ from23 +`</b></h4>
                                        <p class="to">To:`+ to23+`</p>
                                        <div class="imgageDig smallsc">
                                            <div class="holder">`+imgss+`</div>
                                        </div>
                                        <p class="maneno">`+ descripttt+`</p>
                                        <p class="doo">`+ cost344 +`</p>
                                    </div>
                                    <div class="imgageDig bigscrr">
                                        <div class="holder">`+imgss+`</div>
                                    </div>
                                </div>`;
        }
    });
    listPlaceHolder.innerHTML = designss;

    
  })
  .catch(function (error) {
    console.log("Error getting documents ", error);
  });
function toFirebase(){
    var name = document.getElementById("nameIY");
    var company = document.getElementById("company");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var details = document.getElementById("moreD");
    if (!name.value) {
        return alert("Kindly input your Name");
    }
    if (!phone.value) {
        return alert("Kindly input your Phone number");
    }
    if (!email.value)  {
        return alert("kindly input email")
    }
    if (!validateEmail(email.value)) {
        return alert("Kindly input your email correctly");
    }
    if (!details.value) {
        return alert("Kindly input details of service you want");
    }
    let data = {
        email: email.value,
        name: name.value,
        phone: phone.value,
        details: details.value        
        }
    if(company) {
        data.company = company.value;
    }
    db.collection("qoatationRequest").add(data)
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            email.value ="";
            name.value="";
            phone.value="";
            details.value="";
            company.value="";
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
  function validateE(){
      var email = document.getElementById("email");
      if (validateEmail(email.value)) {
         // alert("correct");
      } else {
          alert("Kindly input your email correctly");
      }
  }
function scrollAppear() {
    var dissss = document.querySelectorAll('.background');
    for(let back of dissss) {
      back.style.transform = "translate3d(0px,-"+ window.pageYOffset*0.2 + "px, 0px)";
    }
}
function loadContent(id) {
    currentPage=id;
    const menusss = document.querySelectorAll(".menuuus");
    const pages = document.querySelectorAll(".page")
    const selectedpage = document.getElementById(id+"page")
    const selected = document.getElementById(id)
    menusss.forEach(element => {
        element.classList.remove("active");
        element.classList.add("notActive");
    });
    selected.classList.remove("notActive");
    selected.classList.add("active");
    pages.forEach(element => {
       element.style.display = "none";
    });
    selectedpage.style.display = "grid";
    window.scrollTo(0,0);
    if(id ==="eventsNews") {
        selectedpage.style.display = "block";
    }
    if(id==="admin") {
        const login = document.getElementById("login")
        const contest = document.getElementById("admincontent")
        if(uid && !isAnonymous) {
            login.style.display = "none";
            contest.style.display = "block";
        } else {
            login.style.display = "block";
            contest.style.display = "none";
        }
    }
}
function showPrev(event) {
    let imgSrc="";
    if (event.target.files && event.target.files[0]) {
        selectedImages = event.target.files;

        for(let q = 0; q<event.target.files.length; q++) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[q]);
            const selectedImage = event.target.files[q];
            const ppUploaded = false;
            reader.onload = readerEvent => {
                var content = readerEvent.target.result; // this is the content!
                imgSrc = imgSrc +'<img src="'+ content +'"/>'
                document.getElementById('photodisplas').innerHTML = imgSrc;
            }
        }
        // document.getElementById('photodisplas').innerHTML = '<h1>title skljfsdklfhjskld</>'
    }
    else {
      selectedImages = null;
    }
}
function showPrev2(event) {
    let imgSrc="";
    if (event.target.files && event.target.files[0]) {
        selectedImages2 = event.target.files;

        for(let q = 0; q<event.target.files.length; q++) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[q]);
            const selectedImage = event.target.files[q];
            const ppUploaded = false;
            reader.onload = readerEvent => {
                var content = readerEvent.target.result; // this is the content!
                imgSrc = imgSrc +'<img src="'+ content +'"/>'
                document.getElementById('photodisplasNews').innerHTML = imgSrc;
            }
        }
        // document.getElementById('photodisplas').innerHTML = '<h1>title skljfsdklfhjskld</>'
    }
    else {
      selectedImages2 = null;
    }
}
function uploadEvent(){
var eventi = document.getElementById("enventTTT").value;
var fromD = document.getElementById("fromDDD").value;
var fromT = document.getElementById("fromTTT").value;
var toD = document.getElementById("toDDD").value;
var toT = document.getElementById("toTTT").value;
var cost = document.getElementById("costTTT").value;
var description = document.getElementById("descripID").value;

// const dateTime = moment(`${fromD} ${fromT}`, 'YYYY-MM-DD HH:mm:ss').format();

console.log();

if(!eventi){
    return alert("Event needs a Titile");
}
if(!fromD){
    return alert("Event needs Start's Date");
}
if(!fromT){
    return alert("Event needs Start's time");
}
if(!toD){
    return alert("Event needs End's Date");
}
if(!toT){
    return alert("Event needs End's Time");
}
if(!cost){
    return alert("Enter events entry fee");
}
const fromEx = new Date(new Date(fromD+'T'+fromT+':00z').setHours(new Date(fromD+'T'+fromT+':00z').getHours() - 3));
const toEx = new Date(new Date(toD+'T'+toT+':00z').setHours(new Date(toD+'T'+toT+':00z').getHours() - 3));

if(+toEx < +fromEx) {
    return alert("End time is greater than start time")
}
var buttonSS = document.getElementById("updateButon");
buttonSS.style.opacity = '0.5';
buttonSS.innerHTML = 'Uploading.... Please wait'
if (selectedImages) {

    const uploadPromises = [];
    const storage = firebase.storage()
    for (let i = 0; i < selectedImages.length; i++) {
    uploadPromises.push(
        storage.ref(`images/${selectedImages[i].name}`+Math.random()).put(selectedImages[i])
    );
    }
    Promise.all(uploadPromises)
    .then((uploadTaskSnapshots) => {
        const urlPromises = [];

        uploadTaskSnapshots.forEach((uploadTaskSnapshot) => {
        urlPromises.push(uploadTaskSnapshot.ref.getDownloadURL());
        });

        return Promise.all(urlPromises);
    })
    .then((urls) => {
        var dzzedata = {
            title: eventi,
            from : fromEx,
            to: toEx,
            cost: cost,
            pictures: urls,
            type: 'event'    
        }
        if(description) { dzzedata.description = description.replace(/\r?\n/g, '<br />');}
        console.log(dzzedata)
        firebase.firestore().collection("events").add(dzzedata).then(()=>{
            console.log('worked');
            resetEvent();
        });
    });
} else {
    var dzzedata = {
        title: eventi,
        from : new Date(new Date(fromD+'T'+fromT+':00z').setHours(new Date(fromD+'T'+fromT+':00z').getHours() - 3)),
        to: new Date(new Date(toD+'T'+toT+':00z').setHours(new Date(toD+'T'+toT+':00z').getHours() - 3)),
        cost: cost,
        type: 'event'    
    }
    if(description) { dzzedata.description = description.replace(/\r?\n/g, '<br />');}
    console.log(dzzedata)
    firebase.firestore().collection("events").add(dzzedata).then(()=>{
        console.log('worked')
        resetEvent();
    });
}
}
function uploadNews(){
    var eventi = document.getElementById("newsTTT").value;
    var description = document.getElementById("detailsIDNews").value;
    
    
    if(!eventi){
        return alert("News needs a Titile");
    }
    if(!description){
        return alert("News needs Details");
    }
    
    
    var buttonSS = document.getElementById("updateButonNews");
    buttonSS.style.opacity = '0.5';
    buttonSS.innerHTML = 'Uploading.... Please wait'
    if (selectedImages2) {
    
        const uploadPromises = [];
        const storage = firebase.storage()
        for (let i = 0; i < selectedImages2.length; i++) {
        uploadPromises.push(
            storage.ref(`images/${selectedImages2[i].name}`+ Math.random()).put(selectedImages2[i])
        );
        }
        Promise.all(uploadPromises)
        .then((uploadTaskSnapshots) => {
            const urlPromises = [];
    
            uploadTaskSnapshots.forEach((uploadTaskSnapshot) => {
            urlPromises.push(uploadTaskSnapshot.ref.getDownloadURL());
            });
    
            return Promise.all(urlPromises);
        })
        .then((urls) => {
            var dzzedata = {
                title: eventi,
                pictures: urls,
                type: 'news',
                publishingDate: new Date()   
            }
            if(description) { dzzedata.description = description.replace(/\r?\n/g, '<br />');}
            console.log(dzzedata)
            firebase.firestore().collection("events").add(dzzedata).then(()=>{
                console.log('worked');
                resetEvent2();
            });
        });
    } else {
        var dzzedata = {
            title: eventi,
            type: 'news',
            publishingDate: new Date()     
        }
        if(description) { dzzedata.description = description.replace(/\r?\n/g, '<br />');}
        console.log(dzzedata)
        firebase.firestore().collection("events").add(dzzedata).then(()=>{
            console.log('worked')
            resetEvent2();
        });
    }
}
function resetEvent() {
document.getElementById("enventTTT").value = '';
document.getElementById("fromDDD").value = '';
document.getElementById("fromTTT").value = '';
document.getElementById("toDDD").value = '';
document.getElementById("toTTT").value = '';
document.getElementById("costTTT").value = '';
document.getElementById("descripID").value = '';
var buttonSS = document.getElementById("updateButon");
buttonSS.style.opacity = '1';
buttonSS.innerHTML = 'Update Event'
selectedImages = undefined;
document.getElementById('photodisplas').innerHTML = '';
document.getElementById('theINput').value = '';
}
function resetEvent2() {
    document.getElementById("newsTTT").value = '';
    document.getElementById("detailsIDNews").value = '';
    var buttonSS = document.getElementById("updateButonNews");
    buttonSS.style.opacity = '1';
    buttonSS.innerHTML = 'Update News'
    selectedImages2 = undefined;
    document.getElementById('photodisplasNews').innerHTML = '';
    document.getElementById('theINputNews').value = '';
}

function signOut() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });
}