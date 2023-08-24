// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBV4xc_EmC5aAP3gPJlaHXlD5htR-4F7gs",
    authDomain: "buzz-buzz-buzz-e386c.firebaseapp.com",
    databaseURL: "https://buzz-buzz-buzz-e386c-default-rtdb.firebaseio.com/",
    projectId: "buzz-buzz-buzz-e386c",
    storageBucket: "gs://buzz-buzz-buzz-e386c.appspot.com",
    messagingSenderId: "926878856746",
    appId: "1:926878856746:web:15301db66e5b3e2602b553",
  };
  firebase.initializeApp(firebaseConfig);
  
  // Reference to Firebase database and storage
  var database = firebase.database();
  var storage = firebase.storage();
  
  // Post message function
  function postMessage() {
    var message = document.getElementById("message").value.trim();
    var file = document.getElementById("file").files[0];

      // Check file size
    if (file && file.size > 100 * 1024 * 1024) {
        alert("File size exceeds 20 MB limit.");
        return;
    }

    if (message !== '' || file) {
      var timestamp = new Date().getTime();
      var messageData = {
        message: message,
        timestamp: timestamp
      };
      if (file) {
        var storageRef = storage.ref();
        var fileRef = storageRef.child('files/' + timestamp + '_' + file.name);
        var fileType = file.type.split('/')[0];
        if (fileType === 'image') {
          fileRef.put(file).then(function(snapshot) {
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
              messageData.image = downloadURL;
              firebase.database().ref('messages/' + timestamp).set(messageData);
            });
          });
        } else if (fileType === 'video') {
          fileRef.put(file).then(function(snapshot) {
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
              messageData.video = downloadURL;
              firebase.database().ref('messages/' + timestamp).set(messageData);
            });
          });
        }
      } else {
        firebase.database().ref('messages/' + timestamp).set(messageData);
      }
      document.getElementById("message").value = "";
      document.getElementById("file").value = "";
    }
  
    // Get the messages container
    const messagesContainer = document.getElementById("messages");
  
    // Scroll to the latest message
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
  
  
// Display messages function
database.ref('messages').on('value', function(snapshot) {
    var messages = snapshot.val();
    var messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = "";
    for (var message in messages) {
    var messageDiv = document.createElement("div");
    var messageText = document.createElement("p");
    messageText.innerHTML = messages[message].message;
    messageDiv.appendChild(messageText);
    if (messages[message].image) {
    var messageImage = document.createElement("img");
    messageImage.src = messages[message].image;
    messageImage.style.maxWidth = "400px";
    messageImage.style.maxHeight = "400px";
    messageDiv.appendChild(messageImage);
    } else if (messages[message].video) {
    var messageVideo = document.createElement("video");
    messageVideo.src = messages[message].video;
    messageVideo.controls = true;
    messageVideo.style.maxWidth = "600px";
    messageVideo.style.maxHeight = "600px";
    messageDiv.appendChild(messageVideo);
    }
    var messageTime = document.createElement("p");
    var timestamp = messages[message].timestamp;
    var date = new Date(timestamp);
    messageTime.innerHTML = date.toLocaleString();
    messageDiv.appendChild(messageTime);
    messagesDiv.appendChild(messageDiv);
    var messageSpacer = document.createElement("hr");
    messageSpacer.style.border = "1px solid #21003d";
    messageSpacer.style.margin = "1px 0";
    messagesDiv.appendChild(messageSpacer);
    

    }
});

// Function to prompt for password and delete messages if the password is correct
function promptPassword() {
  var password = prompt("Enter the password to delete all chats:");

  // Check if the password matches a predefined password (you can replace this with your actual password)
  if (password === "BKL") {
    deleteMessages();
  } else {
    alert("Incorrect password. Chats were not deleted.");
  }
}

// Function to delete all messages from Firebase
function deleteMessages() {
  if (confirm("Are you sure you want to delete all chats? This action cannot be undone.")) {
    // Reference to the 'messages' node in the Firebase database
    var messagesRef = firebase.database().ref('messages');

    // Remove all messages
    messagesRef.remove()
      .then(function() {
        alert("All chats have been deleted successfully.");
      })
      .catch(function(error) {
        console.error("Error deleting chats: ", error);
        alert("An error occurred while deleting chats. Please try again.");
      });
  }
}
