const xhr = new XMLHttpRequest();
const url = "localhost:5000";
const selectedTable = null;


function submitQury() {
  var queary = document.querySelector('#textarea1');
  var text;
  // open a connection 
  xhr.open("POST", "http://localhost:5000/api/allquery", true);

  // Set the request header i.e. which type of content you are sending 
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST,  PATCH, DELETE');

  // Create a state> change callback 
  xhr.onload = () => {
    var data = JSON.parse(xhr.responseText)
    if (xhr.readyState == 4 && xhr.status == "201") {
      console.log(data);
    } else {
      let retunResponce = data;
      console.log(retunResponce)
      for (i = 0; i < retunResponce.returnData.length; i++) {
        text += retunResponce.returnData[i] + "<br>";
      }
      document.getElementById('returnData').innerHTML = text
    }
  };

  // Converting JSON data to string 
  var json = JSON.stringify({ "query": queary.value });

  // Sending data with the request 
  xhr.send(json)
}

function selectTable(par) {
  selectTable = par
}


const form = document.querySelector('form');
form.addEventListener('submit', e => {

  // disable default action
  e.preventDefault();

  var radios = document.querySelectorAll('input[type="radio"]:checked');
  var value = radios.length > 0 ? radios[0].value : null;
  console.log(value);
  const files = document.querySelector('[name=file]').files;
  var formData = new FormData();

  formData.append("table", selectTable);
  formData.append("insetType", value); // number 123456 is immediately converted to a string "123456"

  // HTML file input, chosen by user
  formData.append("userfile", files[0]);

  var request = new XMLHttpRequest();

  request.onload = () => {
    var data = JSON.parse(request.responseText)
    if (request.readyState == 4 && request.status == "201") {
      console.log(data);
    } else {
      let retunResponce = `Data inserted successfully in ${data.message} ${'sec'}`;

      var x = document.getElementById("snackbar");
      x.style.display = "block";
      document.getElementById("showAlert").innerHTML = retunResponce;

      console.log(retunResponce)
      //  for (i = 0; i < retunResponce.returnData.length; i++) {
      //   text +=  retunResponce.returnData[i] + "<br>";
      // }
      //  document.getElementById('returnData').innerHTML=  text        
    }
  };
  request.open("POST", "http://localhost:5000/api/upload");
  request.send(formData);
  // }
});

function deleteTable(tableName) {
  let tableNumber;
  switch (tableName) {
    case 'players':
      tableNumber = 1
      break;
    case 'play':
      tableNumber = 2
      break;
    case 'games':
      tableNumber = 3
      break;
    case 'teams':
      tableNumber = 4
      break;

  }

  var r = confirm("Are You Sure!");
  if (r == true) {
    var request = new XMLHttpRequest();
    request.onload = () => {
      var data = JSON.parse(request.responseText)
      if (request.readyState == 4 && request.status == "201") {
        console.log(data);
      } else {
        let retunResponce = `Deleted successfully`;

        var x = document.getElementById("snackbar");
        x.style.display = "block";
        document.getElementById("showAlert").innerHTML = retunResponce;

        console.log(retunResponce)
        //  for (i = 0; i < retunResponce.returnData.length; i++) {
        //   text +=  retunResponce.returnData[i] + "<br>";
        // }
        //  document.getElementById('returnData').innerHTML=  text        
      }
    };
    let url = `${'http://localhost:5000/api/delete'}/${tableNumber}`
    request.open("DELETE", url);
    var json = JSON.stringify({ "tableName": tableName });
    console.log(json)
    request.send(json);
  } else {
    txt = "You pressed Cancel!";
  }
}

function maxTable(params) {
  let tableName = params;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://localhost:5000/api/max', true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var data = JSON.parse(this.responseText);
      console.log(data)
      var text = "";
      var i;
      for (i = 0; i < data.length; i++) {
        text += Object.keys(data[i])+' of ' + tableName +' : '+ Object.values(data[i] )+ "<br>";
      }
      document.getElementById('max').innerHTML =text
    }
  }
  xhr.send(`${'table='}${tableName}`);
  // xhr.send(new Int8Array()); 
  // xhr.send(document);
}
