

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAFNUfdhbs-BK09v4tPHZiIbomKOhVZfCQ",
  authDomain: "event-scheduler-19045.firebaseapp.com",
  projectId: "event-scheduler-19045",
  storageBucket: "event-scheduler-19045.appspot.com",
  messagingSenderId: "382639271132",
  appId: "1:382639271132:web:6b2e772db2c4d18950d819",
  measurementId: "G-7JYF4SQ5DB"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

// ######################  Auth  ###################################3

let uid = "LL81YFAUXN8HqCYlKleq";;
//function for sign up
const register = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('pass').value;
  //   console.log(user,pwd);
  auth.createUserWithEmailAndPassword(email, password)
      .then((res) => { //promise which is sent is taken here
          uid = res.user.uid;
          alert('Registered...Kindly Click Next')
      window.location.href = '../userhomepg/userhomepg.html?uid=' + uid;
      }
      )
      .catch((err) => {
          alert(err.message)
          console.log(err.code);
          console.log(err.message)
      }
      )
}




var googleProvider = new firebase.auth.GoogleAuthProvider();
        var facebookProvider = new firebase.auth.FacebookAuthProvider();

        // Function to sign in with Google using a popup
        function signInWithGoogle() {
            firebase.auth().signInWithPopup(googleProvider)
                .then((result) => {
                    var token = result.credential.accessToken;
                    var user = result.user;
                    uid = result.user.uid;
                    console.log(uid)
                    console.log('registered')
                    // console.log("Google Token:", token);
                    // console.log("Google User:", user);
                }).catch((error) => {
                    handleError(error);
                });
        }

        // Function to sign in with Facebook using a popup
        function signInWithFacebook() {
            firebase.auth().signInWithPopup(facebookProvider)
                .then((result) => {
                    var token = result.credential.accessToken;
                    var user = result.user;
                    uid = result.user.uid;
                    console.log("Facebook User:", user);
                    console.log("Facebook Token:", token);
                }).catch((error) => {
                    handleError(error);
                });
        }

        // Error handling function
        function handleError(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.error("Error:", errorCode, errorMessage, email, credential);
                }
// #########################################################3


const fetchEvents = async () => {
    try {
      const eventsCollection = await db.collection('events').get();
      return eventsCollection.docs.map(doc => doc.data());
    } catch (error) {
      console.error("Error fetching events: ", error);
      return [];
    }
  };


  const fetchUsers = async () => {
    try {
      const eventsCollection = await db.collection('users').get();
      return eventsCollection.docs.map(doc => doc.data());
    } catch (error) {
      console.error("Error fetching users: ", error);
      return [];
    } 
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      // second: '2-digit', 
      hour12: true
    });
  };
  
  
  // Using an IIFE (Immediately Invoked Function Expression) to handle async/await in a script
  (async () => {
  
    // document.querySelector('.loading').style.display = 'block';
    // document.querySelector('.card').style.display = 'none';
  
  
    let event_collection = await fetchEvents(); // Await the fetchEvents function to get the actual events
  
    // Iterate over the fetched events and log each event
    event_collection.forEach(event => {
  
      let hero = document.querySelector('.hero')
  
      let div = document.createElement('div')
      div.className = 'card'
      let details = document.createElement('div')
      details.className = 'details'
      
      let nameEvent= document.createElement('div');
      nameEvent.className = 'name';
      nameEvent.textContent = `${event.event_name}`;
      details.appendChild(nameEvent);
      
      let orgName = document.createElement('div');
      orgName.className = 'organisation';
      orgName.textContent = `Hosted by: ${event.organisation_name}`;
      details.appendChild(orgName);
        
      let duration = document.createElement('div');
      duration.className = 'duration';
      duration.textContent = `Duration: ${event.duration}`;
      details.appendChild(duration);
      
      let time= document.createElement('div');
      time.className = 'time';
      time.textContent = `Date/Time : ${formatDate(event.time)}`;
      details.appendChild(time);
      
        let descriptionElement = document.createElement('div');
        descriptionElement.className = 'description';
        descriptionElement.textContent = 'This is a description of the event.';
        details.appendChild(descriptionElement);
       
        let contact= document.createElement('div');
        contact.className = 'contact';
        contact.textContent = `contact: ${event.contact}`;
        details.appendChild(contact);
      
        let address= document.createElement('div');
        address.className = 'address';
        address.textContent = `Address: ${event.address}`;
        details.appendChild(address);
      
        // let fees= document.createElement('div');
        // fees.className = 'fees';
        // fees.textContent = `Fees: ${event.fees}`;
        // details.appendChild(fees);
      
        let register=document.createElement('button');
        register.className="register";

        // if (uid.registered_events.includes(event.event_name)) {
        //   register.textContent = "Registered";
        // } else {
          register.textContent = "Register?";
        // }
      
        // register.addEventListener('click', goToSignInPage);
        details.appendChild(register)
      
        div.appendChild(details)
        hero.appendChild(div)
  

        // Hide loading indicator and show events
        // document.querySelector('.loading').style.display = 'none';
        // document.querySelector('.card').style.display = 'block';
    });
  })();


// ########################  Points #################################3

let userDocRef = db.collection('users').doc(uid); //doc(uid) is a method used to create a reference to a specific document in a Firestore collection
// Fetch the user's data
userDocRef.get().then((doc) => { //doc represents a document snapshot retrieved from Firestore.
  if (doc.exists) {  // If the document exists
    let userData = doc.data();
    //doc.data() is a method used to retrieve the data stored in a document snapshot. When you retrieve a document from Firestore, it's returned as a document snapshot. This method allows you to access the data stored in that document
    // it retrieves the data stored in the document snapshot doc and assigns it to the variable userData
    
    // Access the 'points' attribute from userData
    let points = userData.points;
    global_points=points;
    // Update the UI with the points
    let pointsElement = document.querySelector('.points');
    pointsElement.textContent ="Points:   "+ points;
  } else {
    console.log('No such document!');
  }
}).catch((error) => {
  console.log('Error getting document:', error);
});

  // Function to get user points from Firestore
  async function getPoints() {
      try {
          let userDocRef = db.collection('users').doc(uid);
          let doc = await userDocRef.get();
          if (doc.exists) {
              let userData = doc.data();
              let points = userData.points;
              
              // Update the UI with the points
              let pointsElement = document.querySelector('.points');
              pointsElement.textContent = "Points: " + points;
              
              // Change image based on points
           //   changeImageBasedOnPoints(points);
          } else {
              console.log('No such document!');
          }
      } catch (error) {
          console.log('Error getting document:', error);
      }
  }
  // Fetch the points and update the image
  getPoints();
//   const eventId="CqplgxOVMw9Toaf6fzkK";

// function fetchEventId(){
//   eventId=db.collection('events');  
// }
// function registerUser(uid){
//   let attendees = db.collection('attendees')
//   .add(
//     eventId:uid
//   )
// }

// let registerbtn = document.querySelector('.register');
// registerbtn.addEventListener('click',registerUser);


// ############################## Register event  ######################################

async function fetchEventId() {
  const eventDoc = await db.collection('events').doc('CqplgxOVMw9Toaf6fzkK').get(); // replace with actual doc ID
  return eventDoc.exists ? eventDoc.id : null;
}

document.addEventListener('DOMContentLoaded', async () => {
  // Your Firebase configuration and initialization...

  const eventId = await fetchEventId();

  function registerUser(uid) {
      db.collection('attendees').add({
          eventId: eventId,
          userId: uid
      })
      .then(() => {
          console.log("User registered successfully!");
          let registerbutton=document.querySelector('.register')
          registerbutton.textContent="Registered"
          // console.log(points)
          alert("Registered")
      })
      .catch((error) => {
          console.error("Error registering user: ", error);
      });
  }

  const registerBtn = document.querySelector('.register');
  registerBtn.addEventListener('click', () => {
      // const uid = "example-user-id"; // Replace with actual user ID logic
      registerUser(uid);
  });
});

// #########################################################3