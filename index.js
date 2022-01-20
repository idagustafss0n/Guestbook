const express = require("express"); 
const app = express();
let fs = require("fs"); 

app.get("/", function(req, res) {   
    res.sendFile(__dirname + "/exempel.html")
});
app.listen(3000);  
console.log("Kör servern på localhost:3000");

app.use(express.static("publik"));


// Gästbok

app.use(express.urlencoded({extended: true})); 

app.get("/hamta-json", (req, res) => {
    console.log("Mottog förfrågan med XMLHttpRequest från klienten");
    fs.readFile("Text.json", function(err, data) {
        if (err) throw err; 
        res.send(data);
    });
});

app.use(express.urlencoded({extended: true}));  
app.post("/", (req, res) => {
    fs.readFile("exempel.html", function(err, data){
        // Ondsefulll input
        let text1 = req.body.text1;
        let text2 = req.body.text2;
        let text3 = req.body.text3;
        text1 = text1.replace(/</g, "&lt;");
        text2 = text2.replace(/</g, "&lt;");
        text3 = text3.replace(/</g, "&lt;");

        fs.readFile("Text.json", function(err, minJson) {
            let falt = JSON.parse(minJson);
            let nyKommentar = { 
                epost: "E-post: " + text1,
                namn: "Namn: " + text2,
                kommentar: "Meddelande: " + text3
            };
            

            console.log(nyKommentar);
            falt.push(nyKommentar);    
            let nyJson = JSON.stringify(falt);
            fs.writeFile("Text.json", nyJson, (err) => {
                if (err) throw err;
            });
            let output = "";
            for (larare in falt) {
                for (attribut in larare) {
                    output += larare[attribut] + " ";
                }
                output += "<br>";
            }
            
            let html = data.toString();
            res.send(html);
        });
    });
});