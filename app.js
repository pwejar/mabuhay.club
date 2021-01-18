let backgroundC = 0;
var isAnonymous;
let isAdmin = false;
var uid;
let currentPage;
let selectedImages;
let selectedImages2;
let selectedImages3;

let newss = [];
let menussArr = [];
let listPlaceHolder = document.getElementById("newsBody");

let checkOut = [];
let totalCheck =0;

let cardsC=0;

var today = new Date().toISOString().split('T')[0];
let editNewsId;
let editNewsRe;
let editmenuRR;

let click = false;
document.getElementById("boookingDate").setAttribute('min', today);
// getting page url and loading appropriate page 
var currentUrl = window.location.href;
currentPage= (currentUrl.split("/")[3]).split("?")[0];
// console.log(currentPage);
var pagesArr = ['home','islander','spa','boatY','ecoCamp','admin','checkOut','bookings']
var defaultPage = "home";
if(pagesArr.indexOf(currentPage)>-1) {
    loadContent(currentPage);
} else {
    loadContent(defaultPage);
}
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        closePreview();
    }
};
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
// console.log(firebase);

setInterval(function(){
    const backgroundsss = document.querySelectorAll(".background")
    backgroundsss.forEach(element => {
        element.style.opacity = "0";
    });
     backgroundsss[backgroundC].style.opacity= "1";
     backgroundC++;
     if(backgroundC ===backgroundsss.length) {
         backgroundC = 0;
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
            isAdmin=true;
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
            isAdmin=false;
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
setInterval(function(){
    const cardss = document.querySelectorAll(".cardSL");
    let secondCC = 0,nexttts,prevvvv;
    
    if(cardsC===cardss.length-1) {
        nexttts = 0;
    } else {
        nexttts = cardsC+1;
    }
    if(cardsC ===0) {
        prevvvv = cardss.length-1;
    } else {
        prevvvv = cardsC -1;
    }
    cardss.forEach(element => {
        if(secondCC===prevvvv) {
            element.getElementsByTagName('svg')[0].style.transform = "TranslateX(30%) scale(0.8)";
            setTimeout(function(){element.style.zIndex = "300";},200);
        } else if (secondCC ===cardsC) {
            element.getElementsByTagName('svg')[0].style.transform = "TranslateX(0%) scale(1)";
            setTimeout(function(){element.style.zIndex = "305";},100);
        } else if (secondCC ===nexttts) {
            element.getElementsByTagName('svg')[0].style.transform = "TranslateX(-30%) scale(0.8)";
            setTimeout(function(){element.style.zIndex = "300";},200);
        } else {
            element.getElementsByTagName('svg')[0].style.transform = "TranslateX(-30%) scale(0.8)";
            element.style.zIndex = "200"
        }
        secondCC++
    });
    cardsC ++;
    if (cardsC ===cardss.length) {
        cardsC =0;
    }
}, 3000);

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


db.collection("events")
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // book_info = {id: doc.id, ...doc.data()}
      newss.push({id: doc.id, ...doc.data() });
    });
    // add data to the DOM
    
    let designss = "",designss2="";
    let indexxxshe = 0;
    newss.sort(function(a,b){
        return b.created.seconds - a.created.seconds;
      });
    newss.forEach(element => {
        if(element) {
            let imgss='',imgss2,titile23='',from23='',to23='',descripttt='',cost344='',adminsss="";
            let rsex =''+ indexxxshe;

            if(element.pictures) {
                
                let indexxxshe2 = 0;
                element.pictures.forEach(img =>{
                    let rsex2 = ''+ indexxxshe2;
                    imgss = imgss + `<div class="imgholder" onclick="pictureView(`+rsex+`,`+rsex2+`)" ><img src="`+ img +`" ></img></div>`;
                    if(indexxxshe2===0) {
                        imgss2 = `<div class="imgholder" onclick="pictureView(`+rsex+`,`+rsex2+`)" ><img src="`+ img +`" ></img></div>`;
                    }
                    indexxxshe2++;
                });
            }
            

            if(element.title){titile23 = element.title};
            if(element.from) {
                let dt = timeConverter(element.from.seconds);
                from23 ='from: '+ dt;
            }
            if(element.to) {
                let dt = timeConverter(element.to.seconds)
                to23 ='To: '+ dt;
            }
            if(element.description) {descripttt = element.description}
            if (element.cost) { 
                cost344 = `<p class="doo" onclick="addtocart('`+rsex+`')"><b> Get Ticket:</b> Ksh. `+ numberWithCommas(+(""+element.cost)) +`</p>`
            }
            if ((""+element.cost) ==="0") {
                cost344 = `<p class="free" onclick="addtocart('`+rsex+`')">Free</p>`
            }

            if (!isAdmin) {
            adminsss = 'style="display:none;"';
            }
            if( indexxxshe<2) {
                if(!imgss2){
                    imgss2=""
                }
                designss2= designss2 + `<div class="mini">
                                            <div class="imggg">
                                                `+imgss2+`
                                            </div>
                                            <div class="tesst">
                                                <p class="title"><b>`+titile23+`</b> `+ from23 +`</p>
                                                <p class="maneno">`+ descripttt+`</p>`+cost344+`
                                            </div>
                                        </div>`
            }
            designss= designss+  `<div class="carrd">
                                    <p class="title">`+titile23+`</p>
                                    <div class="imgageDig smallsc">
                                        <div class="holder">`+imgss+`</div>
                                    </div>
                                    <p class="from"><b>`+ from23 +`</b></p>
                                    <p class="to">`+ to23+`</p>`+cost344+`
                                    <p class="maneno">`+ descripttt+`</p>
                                    <div `+adminsss+` class="admin buttonsGlob">
                                        <p  class="edit " onclick="editNews(`+indexxxshe+`)">Edit</p>
                                        <p  class="edit " onclick="deleteNews(`+indexxxshe+`,'events')">delete</p>
                                    </div>
                                </div>`;
            
        }
        indexxxshe++;
    });
    document.getElementById("shortNews").innerHTML = designss2;
    listPlaceHolder.innerHTML = designss;

    
  }).catch(function (error) {
    console.log("Error meee***", error);
    listPlaceHolder.innerHTML = 'Error getting documents';
  });
db.collection("foodmenu")
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // book_info = {id: doc.id, ...doc.data()}
      menussArr.push({id: doc.id, ...doc.data() });
    });
    // add data to the DOM
    
    let indexxxshe = 0;
    let htmlMeHouse="<h3>House specials</h3>";
    let htmlMeMain = "<h3>Main Course</h3>";
    let htmlMeVegg = "<h3>Vegetarian Corner</h3>";
    let htmlMeChild = "<h3>Children Menu</h3>";
    let htmlMeDer = "<h3>Desserts</h3>";
    let htmlMeCock = "<h3>Cocktail</h3>";
    let htmlMeSoup = "<h3>Soups & Side Salads</h3>";
    let hotDrinks = "<h4>Hot Drinks</h4>";
    let softDrinks = "<h4>Soft Drinks</h4>";
    let Sparkling = "<h4>Sparkling</h4>";
    let wines = "<h4>Wines</h4>";
    let beers = "<h4>Beers</h4>";
    let shots = "<h4>Shots Per Tot</h4>";
    
    menussArr.forEach(element => {
        let mePIc='',detailsss="",adminsss='',pepson="";
        if(element.picture) {
        mePIc = `<div class="imageHoldersss">
                    <img src="`+element.picture+`" alt="">   
                </div>`;
        }
        if(element.details) {
        detailsss = element.details;
        }
        if (!isAdmin) {
        adminsss = 'style="display:none;"';
        }
        if(element.category ==="House Specials") {
            pepson = "Per Person";
          }
        let weHtml = `
        <div class="cardi">
            <h4>`+element.name+`</h4>
            `+mePIc+`
            <p>`+detailsss+`</p>
            <p><b>`+numberWithCommas(+(""+element.price))+` KSH `+pepson+`</b></p>
            <div `+adminsss+` class="admin buttonsGlob">
                <p  class="edit " onclick="editMenuDetail(`+indexxxshe+`)">Edit</p>
                <p  class="edit " onclick="deleteNews(`+indexxxshe+`,'foodmenu')">delete</p>
            </div>
        </div>`
        if (element.name =="hot drink" ||
        element.name =="soft drink" ||
        element.name =="sparkling" ||
        element.name =="wine" ||
        element.name =="beer" ||
        element.name =="shot"  ){
            weHtml = `
            <div class="drinks">
                <p><span>`+detailsss+`</span></p> <p><b>Ksh `+numberWithCommas(+(""+element.price))+`</b></p>
                <div `+adminsss+` class="admin buttonsGlob">
                    <p  class="edit " onclick="editMenuDetail(`+indexxxshe+`)">Edit</p>
                    <p  class="edit " onclick="deleteNews(`+indexxxshe+`,'foodmenu')">delete</p>
                </div>
            </div>
            `
        }
        if(element.category ==="House Specials") {
          htmlMeHouse = htmlMeHouse + weHtml;
        }
        if(element.category ==="Main Course") {
            htmlMeMain = htmlMeMain + weHtml;
        }
        if(element.category ==="Vegetarian Corner") {
          htmlMeVegg = htmlMeVegg + weHtml;
        }
        if(element.category ==="Soups & Side Salads") {
            htmlMeSoup = htmlMeSoup + weHtml;
        }
        if(element.category ==="Children Menu") {
            htmlMeChild = htmlMeChild + weHtml;
        }
        if(element.category ==="Desserts") {
            htmlMeDer = htmlMeDer + weHtml;
        }
        if(element.category ==="Cocktail") {
            htmlMeCock = htmlMeCock + weHtml;
        }
        if(element.name ==="hot drink") {
            hotDrinks = hotDrinks + weHtml;
        }
        if(element.name ==="soft drink") {
            softDrinks = softDrinks + weHtml;
        }
        if(element.name ==="sparkling") {
            Sparkling = Sparkling + weHtml;
        }
        if(element.name ==="wine") {
            wines = wines + weHtml;
        }
        if(element.name ==="beer") {
            beers = beers + weHtml;
        }
        if(element.name ==="shots") {
            shots = shots + weHtml;
        }
        
        indexxxshe++;
    });
    document.getElementById("houseSpecial").innerHTML = htmlMeHouse;
    document.getElementById("mainaCourse").innerHTML = htmlMeMain;
    document.getElementById("veggieCon").innerHTML = htmlMeVegg;
    document.getElementById("soupsand").innerHTML = htmlMeSoup;
    document.getElementById("childMen").innerHTML = htmlMeChild;
    document.getElementById("Desserts").innerHTML = htmlMeDer;
    document.getElementById("cocktailser").innerHTML = htmlMeCock;
    document.getElementById("hotDrinks").innerHTML = hotDrinks;
    document.getElementById("softDrinks").innerHTML = softDrinks;
    document.getElementById("Sparkling").innerHTML = Sparkling;
    document.getElementById("wines").innerHTML = wines;
    document.getElementById("beers").innerHTML = beers;
    document.getElementById("shots").innerHTML = shots;
    
  }).catch(function (error) {
    console.log("Error meee***", error);
    listPlaceHolder.innerHTML = 'Error getting documents';
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
    if(click) {
        checked();
    }
    var dissss = document.querySelectorAll('.background');
    var speed = 0.2;
    if(currentPage ==="foodMenu") {
        speed = 0.05
    }
    for(let back of dissss) {
      back.style.transform = "translate3d(0px,-"+ window.pageYOffset*speed + "px, 0px)";
    }

    // for menu things
    var screenPosition = window.innerHeight;
    var disspia = document.querySelectorAll('.theMenu');
    var menuss = document.querySelectorAll('.menuBT');
    let index = 0 
    for( let tex of disspia) {
        if(!isAdmin && index ===disspia.length-1) {
            return;
        }
        var introPositon = tex.getBoundingClientRect().top;
        if(introPositon < (screenPosition* 0.2) && introPositon >-(screenPosition* 0.3)) {
            
            menuss.forEach(element => {
                element.style.backgroundColor = '#f5f5f5';  
                element.style.color = 'black';
                element.style.border = '2px solid black'                  
            });
            menuss[index].style.backgroundColor = 'black'
            menuss[index].style.color = '#f5f5f5';
            menuss[index].style.border = '2px solid #f5f5f5';
            // console.log(menuss[index])
         } else {
            // console.log('away')
         }
         index++;
    }
}
function loadContent(id) {
    if(click) {
        checked();
    }
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
    document.querySelector('title').innerHTML = 'Mabuhay |'+id;
    window.history.pushState({urlPath:'/index.html'},"",'/'+id);
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
    if(id === "foodMenu") {
        scrollAppear();
    }
}
function showPrev(event,id,key) {
    let imgSrc="";
    if (event.target.files && event.target.files[0]) {
        switch (key) {
            case 1:
                selectedImages = event.target.files;
                break;
            case 2:
                selectedImages2 = event.target.files;
                break;
            case 3:
                selectedImages3 = event.target.files;
                break;
            default:
                break;
        }
        

        for(let q = 0; q<event.target.files.length; q++) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[q]);
            const selectedImage = event.target.files[q];
            const ppUploaded = false;
            reader.onload = readerEvent => {
                var content = readerEvent.target.result; // this is the content!
                imgSrc = imgSrc +'<img src="'+ content +'"/>'
                document.getElementById(id).innerHTML = imgSrc;
            }
        }
        // document.getElementById('photodisplas').innerHTML = '<h1>title skljfsdklfhjskld</>'
    }
    else {
        switch (key) {
            case 1:
                selectedImages = null;
                break;
            case 2:
                selectedImages2 = null;
                break;
            case 3:
                selectedImages3 = null;
                break;
            default:
                break;
        }
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
            type: 'event',
            created: new Date()   
        }
        if(description) { dzzedata.description = description.replace(/\r?\n/g, '<br />');}
        console.log(dzzedata)
        if(editNewsId) {
            firebase.firestore().collection("events").doc(editNewsId).update(dzzedata).then(()=>{
                console.log('worked');
                resetEvent();
            });
        } else{
            firebase.firestore().collection("events").add(dzzedata).then(()=>{
                console.log('worked');
                resetEvent();
            });
        }
    });
} else {
    var dzzedata = {
        title: eventi,
        from : new Date(new Date(fromD+'T'+fromT+':00z').setHours(new Date(fromD+'T'+fromT+':00z').getHours() - 3)),
        to: new Date(new Date(toD+'T'+toT+':00z').setHours(new Date(toD+'T'+toT+':00z').getHours() - 3)),
        cost: cost,
        type: 'event',
        created: new Date()     
    }
    if(description) { dzzedata.description = description.replace(/\r?\n/g, '<br />');}
    console.log(dzzedata)
    if(editNewsId) {
        firebase.firestore().collection("events").doc(editNewsId).update(dzzedata).then(()=>{
            console.log('worked');
            resetEvent();
        });
    } else{
        firebase.firestore().collection("events").add(dzzedata).then(()=>{
            console.log('worked');
            resetEvent();
        });
    }
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
                publishingDate: new Date(),
                created: new Date()   
            }
            if(description) { dzzedata.description = description.replace(/\r?\n/g, '<br />');}
            console.log(dzzedata)
            if(editNewsRe) {
                firebase.firestore().collection("events").doc(editNewsId).update(dzzedata).then(()=>{
                    console.log('worked');
                    resetEvent();
                });
            } else{
                firebase.firestore().collection("events").add(dzzedata).then(()=>{
                    console.log('worked');
                    resetEvent();
                });
            }
        });
    } else {
        var dzzedata = {
            title: eventi,
            type: 'news',
            publishingDate: new Date(),
            created: new Date()      
        }
        if(description) { dzzedata.description = description.replace(/\r?\n/g, '<br />');}
        console.log(dzzedata)
        if(editNewsRe) {
            firebase.firestore().collection("events").doc(editNewsId).update(dzzedata).then(()=>{
                console.log('worked');
                resetEvent();
            });
        } else{
            firebase.firestore().collection("events").add(dzzedata).then(()=>{
                console.log('worked');
                resetEvent();
            });
        }
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
editNewsId= undefined;
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
    editNewsRe = undefined;
}
function signOut() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });
}
function smoothScroll(target, duration) {
    
    var theTarget = document.getElementById(target);
    var targetPosition = theTarget.offsetTop - 40;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;
    
    function animation(currentTime) {
        if(startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    function ease(t, b, c, d) {
        t/=d/2;
        if (t < 1) return c/2*t*t+b;
        t--;
        return -c/2 * (t * (t-2)-1)+b;
    }
    requestAnimationFrame(animation);
}
function pictureView(pic,nu) {
    const diss = document.getElementById('pictureDisplay');
    let thedisss =''
    let indoxou = 0;
    newss[pic].pictures.forEach(element => {
        let provous = '',next = '';
        if(indoxou>0) {
             provous = `<div class="provius" onclick="loadpic('`+(+indoxou-1)+`')">&#8249;</div>`
        }
        if (indoxou<newss[pic].pictures.length-1) {
            next = `<div class="next"  onclick="loadpic('`+(+indoxou +1)+`')">&#8250;</div>`
        }
        thedisss = thedisss + `<div class="imgholder2" ><img src="`+ element +`" ></img>`+provous+next+`<div class="close" onclick="closePreview()">&#10005;</div>`+`</div>`;  
        indoxou++;
    });
    diss.innerHTML = thedisss;
    diss.style.display = 'flex';
    diss.style.transform = "translateX(-"+nu+"00vw";
}
function closePreview() {
    const diss = document.getElementById('pictureDisplay');
    diss.style.display = "none"
}
function loadpic(nu) {
    const diss = document.getElementById('pictureDisplay');
    diss.style.transform = "translateX(-"+nu+"00vw";
}
function addtocart(pass){
    if (newss[pass].to.seconds*1000<new Date().getTime()) {
        return alert("The Event is already over")
    }
    if (!newss[pass].quantity) {
        newss[pass].quantity = 1;
    }
    let indeee = 0;
    let exits = false;
    checkOut.forEach(element => {
        if(element.title ===newss[pass].title && element.from.seconds ===newss[pass].from.seconds && element.cost ===newss[pass].cost) {
            exits = true;
        }
        indeee++
    });
    if(!exits) {
        newss[pass].seconds= newss[pass].from.seconds
        checkOut.push(newss[pass])
    }
    genCheckOut();
    loadContent('checkOut');

}
function genCheckOut(){
    let ourHtml ='', src='',countIt=0;
    totalCheck = 0 ;
    
    checkOut.forEach(element => {
        console.log(element.seconds)
        src='';
        if(element.pictures){
            src = element.pictures[0]
        }
        var options = '';
        let maxRes=4;
        if(element.title==="Reservation Down Payment") {
            maxRes =1
        }
        for (i=1;i<=maxRes;i++){
            if (i===element.quantity) {
                options += '<option val=' + i + ' selected="selected">' + i + '</option>';
            }else {
                options += '<option val=' + i + '>' + i + '</option>';
            }
            
        }
        totalCheck = totalCheck + (+element.cost*element.quantity);
        ourHtml =ourHtml+ `<div class="itemo">
                                <img src="`+src+`">
                                <p>`+element.title+`</p>
                                <p>`+timeConverter(element.seconds) +`</p>
                                <select onchange="updateCart(`+countIt+`)" id="inputI`+countIt+`" type="number" value="`+element.quantity+`" >
                                 `+options+`
                                </select>
                                <p>Ksh: `+numberWithCommas(+element.cost)+`</p>
                                <p>Ksh: `+numberWithCommas(+element.cost*element.quantity)+`</p>
                            </div>`;
        countIt++
    });
    document.getElementById('itemssl').innerHTML = ourHtml;
    document.getElementById('lissTotal').innerHTML = "<p><b>Total:<b> Ksh " + numberWithCommas(totalCheck) + "</p>";
}
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function updateCart(numb) {
    let valu = document.getElementById('inputI'+numb).value;
    checkOut[numb].quantity = +valu;
    genCheckOut();
}
function makeReserve() {
    var nameR = document.getElementById("bookingName");
    var phoneR = document.getElementById("bookingPhone");
    var dateR = document.getElementById("boookingDate");
    var timeR = document.getElementById("bookingTime");
    var guestR = document.getElementById("bookingGuest");
    if(nameR.value===''){
        return alert("Kindly insert your name")
    }
    if(phoneR.value.split("").length !=12) {
        return alert("kindly insert your phone number Correctly");
    }
    if(dateR.value ===''){
        return alert("kindy select the date");
    }
    if(timeR.value ===''){
        return alert("kindly select the time")
    }
    if(timeR.value ===''){
        return alert("kindly indicate number of guest");
    }
    var fromD = dateR.value;
    var fromT = timeR.value;
    var time = new Date(new Date(fromD+'T'+fromT+':00z').setHours(new Date(fromD+'T'+fromT+':00z').getHours() - 3));
    var theResav = {
        by:{
            name:nameR.value,
            phone: phoneR.value
        },
        date: time,
        totalGuest: +guestR.value,
        quantity: 1,
        cost: 1500,
        title: "Reservation Down Payment",
        seconds: (new Date(time).getTime())/1000
    };

    if(+guestR.value>4) {
        db.collection("Bookings").add(theResav)
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            nameR.value ="";
            phoneR.value="";
            dateR.value="";
            time.value="";
            guestR.value="";
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    } else {
        let indeee = 0;
        let exits = false;
        checkOut.forEach(element => {
            if(element.title ==="Reservation Down Payment") {
                checkOut[indeee]=theResav;
                exits = true;
            }
            indeee++
        });
        if(!exits) {
            checkOut.push(theResav)
        } 
        genCheckOut();
        loadContent('checkOut');
    }
    
}
function editNews(numb){
    
    function letaDau(dateppp) {
        var now = new Date(dateppp);
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        return today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    }
    function letaTime(timme) {
        var date = new Date(timme);
        return currentTime = date.getHours() + ':' + date.getMinutes();
    }
    if(newss[numb].type ==="event") {
        editNewsId = newss[numb].id;
        document.getElementById("enventTTT").value = newss[numb].title;
        document.getElementById("fromDDD").value = letaDau(newss[numb].from.seconds * 1000);
        document.getElementById("fromTTT").value = letaTime(newss[numb].from.seconds * 1000);
        document.getElementById("toDDD").value = letaDau(newss[numb].to.seconds * 1000);
        document.getElementById("toTTT").value = letaTime(newss[numb].to.seconds * 1000);
        document.getElementById("costTTT").value = newss[numb].cost;
        if(newss[numb].description){
            document.getElementById("descripID").value = newss[numb].description;
        }
        let imgSrc = '';
        if (newss[numb].pictures) {
            newss[numb].pictures.forEach(element => {
                imgSrc = imgSrc +'<img src="'+ element +'"/>'
            });
        }
        document.getElementById("loadd").scrollIntoView();
        document.getElementById('photodisplas').innerHTML = imgSrc;
    } else {
        editNewsRe = newss[numb].id;
        document.getElementById("newsTTT").value = newss[numb].title;
        if(newss[numb].description){
            document.getElementById("detailsIDNews").value = newss[numb].description;
        }
        let imgSrc = '';
        if (newss[numb].pictures) {
            newss[numb].pictures.forEach(element => {
                imgSrc = imgSrc +'<img src="'+ element +'"/>'
            });
        }
        document.getElementById("newss543").scrollIntoView();
        document.getElementById('photodisplasNews').innerHTML = imgSrc;
    }
}
function addtoFoodMenu(){
    const category = document.getElementById("categoryFoodMenu");
    const name = document.getElementById("nameFoodMenu");
    const details = document.getElementById("detailsFoodMenu");
    const price = document.getElementById("priceFoodMenu");
    if(category.value=="") {
        return alert("Kindly select category");
    }
    if(name.value =="") {
        return alert("Kindly Input the Name");
    }
    if(price.value =="") {
        return alert("Kindly Input the price")
    }
    if (selectedImages3) {

        const uploadPromises = [];
        const storage = firebase.storage()
        for (let i = 0; i < selectedImages3.length; i++) {
        uploadPromises.push(
            storage.ref(`images/${selectedImages3[i].name}`+Math.random()).put(selectedImages3[i])
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
                category: category.value,
                name : name.value.toLowerCase(),
                price: price.value,
                picture: urls[0]
            }
            if(details.value) { dzzedata.details = details.value;}
            if(editmenuRR) {
                firebase.firestore().collection("foodmenu").doc(editmenuRR).update(dzzedata).then(()=>{
                    resetMenu();
                });
            } else{
                firebase.firestore().collection("foodmenu").add(dzzedata).then(()=>{
                    resetMenu();
                });
            }
        });
    } else {
        var dzzedata = {
            category: category.value,
            name : name.value.toLowerCase(),
            price: price.value,
            
        }
        if(details.value) { dzzedata.details = details.value;}
        if(editmenuRR) {
            firebase.firestore().collection("foodmenu").doc(editmenuRR).update(dzzedata).then(()=>{
                resetMenu();
            });
        } else{
            firebase.firestore().collection("foodmenu").add(dzzedata).then(()=>{
                resetMenu();
            });
        }
    }
}
function editMenuDetail(numb){
    
    document.getElementById("categoryFoodMenu").value = menussArr[numb].category;
    document.getElementById("nameFoodMenu").value = menussArr[numb].name;
    document.getElementById("priceFoodMenu").value = menussArr[numb].price;
    if (menussArr[numb].details) {
        document.getElementById("detailsFoodMenu").value = menussArr[numb].details;
    }
    if (menussArr[numb].details) {
        document.getElementById("previewFoodMenu").innerHTML = '<img src="'+ menussArr[numb].details +'"/>'
    }
    document.getElementById("menuadmin").scrollIntoView();
    editmenuRR = menussArr[numb].id;
}
function resetMenu(){
    document.getElementById("categoryFoodMenu").value = "";
    document.getElementById("nameFoodMenu").value = "";
    document.getElementById("detailsFoodMenu").value = "";
    document.getElementById("priceFoodMenu").value = "";
    document.getElementById("previeFoodMenu").value = "";
    document.getElementById("previewFoodMenu").innerHTML = "";
    editmenuRR = undefined;
}
// alertControler();
function alertControler(defaultObject){
    // let defaultObject = {
    //     buttons: [
    //         {
    //             name: "yes",
    //             function: ""
    //         },
    //         {
    //             name: "no",
    //             function: ""
    //         },
    //     ],
    //     title: "Alert Controler",
    //     Message: "Confirm!"

    // }
    var iDiv = document.createElement('div');
    var stylo = document.createElement('style');
    iDiv.id = 'pwejarAlertV0001Container';
    stylo.id = 'pwejarAlertV0001Style';
    
    let buttonss= '';
    defaultObject.buttons.forEach(element => {
        buttonss = buttonss + `<div class="pwejarAlertV0001Buttons" onclick="`+element.function+`;document.getElementById('pwejarAlertV0001Style').remove();document.getElementById('pwejarAlertV0001Container').remove();">`+element.name+`</div>`        
    });
    let meHtml = `
    <div id="pwejarAlertV0001Card">
        <h3>`+defaultObject.title+`</h3>
        <p>`+defaultObject.Message+`</p>
        <div style=" display:flex; justify-content: space-around">`+buttonss+`</div>
    </div> 
    `
    let inerStyle = `
    #pwejarAlertV0001Container{
        display: grid;
        align-items: center;
        position: fixed;
        width: 100%;
        height: 100vh;
        background-color: #00000084;
        z-index: 1000000;
        top: 0;
        left: 0;
        text-align: center;
    }
    #pwejarAlertV0001Card{
        background-color:white; 
        max-width: 300px; 
        margin: 0 auto; 
        padding: 10px; 
        border-radius: 5px;
    }
    .pwejarAlertV0001Buttons{
        cursor: pointer;
        padding: 7px; 
        border-radius: 7px;
        margin: 5px; 
        border: 2px solid black;
    }
    .pwejarAlertV0001Buttons:hover{
        background-color: black;
        color: white; 
        border: 2px solid black;
    }
    `
    iDiv.innerHTML = meHtml;
    stylo.innerHTML = inerStyle;
    const body98787 = document.querySelector("body");
    body98787.appendChild(stylo)
    body98787.appendChild(iDiv)

}
function deleteNews(index,collection){
    let defaultObject = {
        buttons: [
            {
                name: "No",
                function: ""
            },
            {
                name: "Yes",
                function: "confirmDelete("+index+",'"+collection+"')"
            },
        ],
        title: "Confirm Delete",
        Message: "Kindly confirm delete!"

    }
    alertControler(defaultObject);
}
function confirmDelete(index,collection) {
    let docID;
    if (collection ==="events") {
        docID = newss[+(""+index)].id;
    }
    if (collection ==="foodmenu") {
        docID = menussArr[+(""+index)].id;
    }
    firebase.firestore().collection(collection).doc(docID).delete().then(function() {
        alert("Document successfully deleted!");
        window.location.href = window.location.pathname + window.location.search + window.location.hash;
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    // window.location.href = window.location.pathname + window.location.search + window.location.hash;
}
function checked() {
    var line1 = document.getElementById('lineOne');
    var line2 = document.getElementById('lineTwo')
    var line3 = document.getElementById('lineThree');
    var stick = document.getElementById('stickOut');
    var bigMenu = document.getElementById("phonemenu");
    if (line1 && line2 && line3 && stick) {
      if (!click) {
        line1.style.transform = 'rotate(45deg) translateY(25%)';
        line3.style.transform = 'rotate(-45deg) translateY(-25%) translateX(0%)';
        line2.style.transform = 'translate(-100%)';
        line1.style.fill = 'red';
        line3.style.fill = 'red';
        line2.style.fill = 'red';
        line2.style.opacity = '0';
        click= true;
    
        stick.style.transform = "none";
        stick.style.opacity = "1"
        bigMenu.style.backgroundColor = "rgba(0, 0, 0, 0.801)";
      } else {
        line1.style.transform = 'rotate(0)';
        line3.style.transform = 'rotate(0)';
        line2.style.transform = 'rotate(0)';
        line2.style.opacity = '1';
        line1.style.fill = '#373435';
        line3.style.fill = '#373435';
        line2.style.fill = '#373435';
        click= false;
    
        stick.style.transform = "translateX(-100%)";
        stick.style.opacity = "0";
        bigMenu.style.backgroundColor = "rgba(0, 0, 0, 0)"
      }
    }
    
  
  }