const firebaseConfig = {
    apiKey: "AIzaSyBAfxQYO6TNJIdqOB6_DRM4e9NUa1NrWJ0",
    authDomain: "voting-gathery.firebaseapp.com",
    databaseURL: "https://voting-gathery-default-rtdb.firebaseio.com",
    projectId: "voting-gathery",
    storageBucket: "voting-gathery.appspot.com",
    messagingSenderId: "236437354667",
    appId: "1:236437354667:web:48c06bee64b290f4b35fee"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firebaseConfig_ = {
    apiKey: "AIzaSyARKCyiAbxjZ6PbmTasZeQamQvEyCXKl3c",
    authDomain: "gathery-judge.firebaseapp.com",
    databaseURL: "https://gathery-judge-default-rtdb.firebaseio.com",
    projectId: "gathery-judge",
    storageBucket: "gathery-judge.appspot.com",
    messagingSenderId: "292987022887",
    appId: "1:292987022887:web:be06fd10ebbd94b338a802"
  };
// Get reference to the databas
// Get a reference to the Firebase Realtime Database
const database = firebase.database();
firebase.initializeApp(firebaseConfig_, "judge");
function updateMaxValue() {
  const maxSelect = document.getElementById('max');
  const selectedMax = maxSelect.value;

  firebase.database().ref('settings/max').set(selectedMax);
  console.log(selectedMax)

}
// Function to add a word to the database
function addUser() {
  const log = document.getElementById('login');
  const pwd = document.getElementById('pwd');
  const ml = document.getElementById('mail');
  
  const teach = document.getElementById('tch');
  const login = log.value.trim();
  const pas = pwd.value.trim();
  
  const tch = teach.value.trim();
  const mail = ml.value.trim();


  // Check if the user already exists
  const userRef = database.ref('users').child(login);
  userRef.once('value')
      .then(snapshot => {
          if (snapshot.exists()) {
              // User already exists, show confirm dialog
              const confirmUpdate = confirm(`User '${login}' already exists in the database. Do you want to update the data?`);
              
              if (confirmUpdate) {
                  // Update data in Firebase
                  userRef.update({
                    login: login,
                      pwd: pas,
                      mail: mail,
                      teacher: tch,
                  });

                  console.log('User data updated successfully.');
              }
          } else {
              // User does not exist, proceed to add
              userRef.set({
                  login: login,
                  pwd: pas,
                  mail: mail,
                  teacher: tch,

              });

              console.log('User added successfully.');
          }

          // Clear input fields after adding/updating user
          log.value = '';
          pwd.value = '';
        
          teach.value = '';
          ml.value = ''
      })
      .catch(error => {
          console.error('Error checking user existence:', error);
      });
}

// Get a reference to the root of your data structure
const dataRef = database.ref('/');

function updateMaxValue() {
  // Implement your logic to update the maximum prize places in Firebase
  var maxSelect = document.getElementById("max");
  var selectedMax = maxSelect.value;  // Use .value directly to get the selected value

  console.log("Selected Max Value:", selectedMax);  // Log to check if the value is captured correctly

  // Example: update value in Firebase
  firebase.app("judge").database().ref('sets/places').set(selectedMax)
      .then(() => {
          console.log('Max value updated successfully.');
      })
      .catch(error => {
          console.error('Error updating max value:', error);
      });
}
document.querySelectorAll('.btn-check').forEach(function (element) {
  element.addEventListener('change', function () {
      document.querySelectorAll('.collapse').forEach(function (collapse) {
          collapse.classList.remove('show');
      });
      var targetId = this.getAttribute('data-bs-target').substring(1);
      document.getElementById(targetId).classList.add('show');
  });
});

document.addEventListener("DOMContentLoaded", function() {

    // Your code here
    function add_member() {
        mail = document.getElementById("mail").value.trim()
        teach = document.getElementById("teacher_").value.trim()
        login = mail.split(".").join("-")


        database.ref('users').child(login).set({
    
            teacher: teach,
            mail: mail
            
        })

        
    }

    function addPart() {
        const log = document.getElementById('login');
        const tch = document.getElementById('teacher');
        const login = log.value.trim();
        const teacher = tch.value.trim().split(' '); // Split teachers by space
    
        // Check if the login and teachers are not empty
        if (login && teacher.length > 0) {
            const teacherArray = teacher.reduce((acc, teacher) => {
                if (teacher.trim() !== '') {
                    acc.push(teacher.trim());
                }
                return acc;
            }, []);
    
        database.ref('part').child(login).set({
        
                teacher: teacherArray,
                votes: 0,
            }, function (error) {
                if (error) {
                    console.error('Data could not be saved.', error);
                } else {
                    console.log('Data saved successfully.');
                    log.value = '';
                    tch.value = '';
    
                }
            });
        } else {
            console.log('Please enter a login and at least one teacher.');
        }
        firebase.app("judge").database().ref("/primon/").set("hi")
        const teacherArray = teacher.reduce((acc, teacher) => {
            if (teacher.trim() !== '') {
                acc.push(teacher.trim());
            }
            return acc;
        }, []);
        firebase.app("judge").database().ref(`part/${login}`).set({
            teacher: teacherArray,
        }, function (error) {
            if (error) {
                console.error('Data could not be saved.', error);
            } else {
                console.log('Data saved successfully.');
                log.value = '';
                tch.value = '';

            }
        })
    }

    document.getElementById("save_btn").addEventListener("click", add_member);
    document.getElementById("save").addEventListener("click", addPart);
});

const db = firebase.app("judge").database();
db.ref("/").on("value", snap => {
    db.ref("/").get().then(snapshot => {
        const readyCount = Object.keys(snap.val().ready || {}).length;
        const usersCount = Object.keys(snap.val().users || {}).length;
        document.getElementById("readyCount").textContent = `${readyCount}/${usersCount}`;
})

})


