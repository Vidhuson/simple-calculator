
// dark - light theme change 
var theme = document.getElementById('icon_moon');
       theme.onclick = function(){
           document.body.classList.toggle('dark-theme');
        // icon change 
           if(document.body.classList.contains('dark-theme'))
               document.getElementById('moon').setAttribute('class','fas fa-sun');
           else 
                document.getElementById('moon').setAttribute('class','fas fa-moon');
       }
     
// calculations 

// it is used to get history of innerhtml (inputs)
function getHistory(){
    return document.getElementById("history_value").innerText;
}
// used to print history 
function printHistory(num){
    document.getElementById("history_value").innerText=num;
 }

function getOutput(){
    return document.getElementById("output_value").innerText;
}

function printOutput(num){
        if(num=="")
             document.getElementById("output_value").innerText = num;
        else
             document.getElementById("output_value").innerText = commaSeparate(num);
}
// commaseparte function is used to achieve "," seaprate number by using number.tolocalestring("countrycode")
function commaSeparate(num){
   
    // for safety we converting number into number
     var x = Number(num);
    //  
    var value = x.toLocaleString("en");
    return value;
}

function removecomma(num){
    // regex is used  "g" refers to global match of "," & we fill by empty char
    return Number(num.replace(/,/g,""));
}

var number = document.getElementsByClassName("number");
// for loop is used to access numbers one by one
for(var i =0;i<number.length; i++) {
    number[i].addEventListener('click',function(){
        // clicking number will display(set) on output field
        var output = removecomma(getOutput());
        if(output!=NaN){
            // cancatenating input one after one by clicking 
            // "this refers clicking numbers id..., the id which holds the actual number"
            output=output+this.id; 
            printOutput(output);
        }
    
    });
}


var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length; i++) {
    operator[i].addEventListener('click',function(){

        // case 1 : Allclear - dispalying both history & output will be zero 
        if(this.id == "AC"){
            printHistory("");
            printOutput("");
        }
        //  case 2 : backspace - removing last number by coverting into string
        else if(this.id=="backspace"){
            var output = removecomma(getOutput()).toString();
            if(output){ //output has a value
                output = output.substr(0,output.length-1); //we extracting 0 to length-1 = which means we are omitting last number
                printOutput(output);
            }
        } 
        //case 3 : arthimetic operations
        else {
            var output = getOutput();
            var history = getHistory();
            if(output=="" && history!=""){ // to change history operators
                if(isNaN(history[history.length-1])){
                    history = history.substr(0,history.length-1);
                }
            }
            if(output!="" || history !=""){
                output= output==""? output: removecomma(output);
                history=history+output;
                if(this.id == "="){  //equal function
                    var result = eval(history); //it will do all operations +,-,*,/,%
                    printOutput(result);
                    printHistory("");
                }
                else{  // +,-,*,/,%
                    history = history+this.id;
                    printHistory(history);
                    printOutput("");
                }
            };
        }
        
    });
}















