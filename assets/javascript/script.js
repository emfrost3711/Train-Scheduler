
var firebaseConfig = {
    apiKey: "AIzaSyDaVX16UUxkKPQlN06kMCOXrry_OY4Byj0",
    authDomain: "test-project-3711.firebaseapp.com",
    databaseURL: "https://test-project-3711.firebaseio.com",
    projectId: "test-project-3711",
    storageBucket: "test-project-3711.appspot.com",
    messagingSenderId: "600067014908",
    appId: "1:600067014908:web:9e48f9e8015fbc00"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

$("#add-train-btn").on("click", function(event){
    event.preventDefault();

    var name = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var time = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();


    database.ref().push({

        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
      });

    })

database.ref().on("child_added", function (childSnapshot) {
    console.log("in td area", childSnapshot.val()); 

       var tFrequency = childSnapshot.val().frequency;

       // Time is 3:30 AM
       var firstTime = childSnapshot.val().time;
   
       // First Time (pushed back 1 year to make sure it comes before current time)
       var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
       console.log(firstTimeConverted);
   
       // Current Time
       var currentTime = moment();
       console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
   
       // Difference between the times
       var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
       console.log("DIFFERENCE IN TIME: " + diffTime);
   
       // Time apart (remainder)
       var tRemainder = diffTime % tFrequency;
       console.log(tRemainder);
   
       // Minute Until Train
       var tMinutesTillTrain = tFrequency - tRemainder;
       console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
   
       // Next Train
       var nextTrain = moment().add(tMinutesTillTrain, "minutes");
       console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


       var row = $("<tr>");
       var nameTD = $("<td>").text(childSnapshot.val().name);
       var destinationTD = $("<td>").text(childSnapshot.val().destination);
       var frequencyTD = $("<td>").text(childSnapshot.val().frequency);
       var nextArrivalTD = $("<td>").text(moment(nextTrain).format("HH:mm"));
       var minutesAwayTD = $("<td>").text(tMinutesTillTrain);

       row.append(nameTD, destinationTD, frequencyTD, nextArrivalTD, minutesAwayTD); 
       $("tbody").append(row);

}); 
