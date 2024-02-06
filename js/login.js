$(document).ready(function(){
    document.getElementById("goToRegistration").addEventListener("click", showRegistration);
    $.getJSON('php/ajax/errors.php', function(result){
        if(result == 1){
            oneButtonBoxFromIndex({ title: "ATTENTO!", content:"Username già esistente!" });
        }
        else if(result == 2)
            oneButtonBoxFromIndex({ title: "ATTENTO!", content:"Account non trovato!" });
        else if(result == 3)
            oneButtonBoxFromIndex({ title: "ATTENTO!", content:"Password errata" });
    });

    myForm.onsubmit = function(){
        let patt = /^[a-zA-Z0-9]{1,15}$/m;
        if(!patt.test(myForm.user.value)){
            oneButtonBoxFromIndex({ title: "ATTENTO!", content:"Lo username deve essere composto da al più 15 caratteri (solo lettere o numeri)"});
            return false;
        }

        if(myForm.repassword.value != myForm.password.value){
            oneButtonBoxFromIndex({ title: "ATTENTO!", content:"Le due password inserite non combaciano!" });
            return false;
        }
        else
            return true;
    }
});

function showRegistration() {
    var label = document.createElement("label");
    label.innerText = "Conferma Password";
    document.myForm.insertBefore(label, document.getElementById("formBtn"));
    
    var repPassword = document.createElement("input");
    repPassword.setAttribute("class", "formInput");
    repPassword.setAttribute("type", "password");
    repPassword.setAttribute("name", "repassword");
    repPassword.required = true;

    document.myForm.insertBefore(repPassword, document.getElementById("formBtn"));
    document.getElementById("formBtn").innerText = "REGISTRATI";
    document.myForm.setAttribute("action", "./php/register.php");
    document.getElementById("goToRegistration").disabled = true;
    document.getElementById("containerFormLogin").style.height = "300px";
    document.myForm.removeChild(document.getElementsByTagName("p")[0]);
}

