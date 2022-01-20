// Kollar mejladress
function ValidateEmail(input) {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;  
    
    if (input.value.match(validRegex)) {
        console.log("Godkänd mejladress!"); // Enbart för avstämning i consolen
        document.getElementById("validering1").innerHTML = "";
        document.getElementById("submit").style.visibility="visible"
        return true;  
    } else { 
        document.getElementById("validering1").innerHTML = "ogiltig mejladress";
        document.getElementById("submit").style.visibility="Hidden"
        return false;
    }
}
// Kollar namn
function ValidateName(input) {
    let validRegex2 = /^[a-zA-Z'`-]/;  
    
    if (input.value.match(validRegex2)) {
        console.log("Godkänt namn") // Enbart för avstämning i consolen
        document.getElementById("validering2").innerHTML = "";
        document.getElementById("submit").style.visibility="visible"
        return true;  
    } else { 
        document.getElementById("validering2").innerHTML = "Ogiltigt namn!";
        document.getElementById("submit").style.visibility="Hidden"
        return false;
    }
}

// Validering tomma fält efter submit
function validateForm() {
  let x = document.forms["form1"]["text1"].value;
  if (x == "") {
    alert("E-mail must be filled out");
    return false;
  }
  let y = document.forms["form1"]["text2"].value;
  if (y == "") {
    alert("Name must be filled out");
    return false;
  }
  let z = document.forms["form1"]["text3"].value;
  if (z == "") {
    alert("Message must be filled out");
    return false;
  }
}


let hamtaData = function() {
    let forfragan = new XMLHttpRequest(); 
    forfragan.open("GET", "/hamta-json"); 
    forfragan.onload = function() {         
        console.log("Mottog svar från servern!");
        console.log(this.response);         
        data = JSON.parse(this.response);   
        console.log(data);
        for (let i = 0; i < data.length; i++) { 
            for (attribut in data[i]) {
                document.getElementById("output").innerHTML += data[i][attribut] + "<br>";
                
            }
            document.getElementById("output").innerHTML += "<br>";
        }
    }
    forfragan.send();                      
}
hamtaData();

