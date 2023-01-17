
"use strict"; 


var waitingTime;
var autoAdvance; 
var currentFigureIndex = 0;
var jsonFile = {};


function loadJsonFile()
{
   var client = new XMLHttpRequest();
   client.open("GET", "imageList.json", true);
   client.send();
   client.onreadystatechange = function () {
      if (client.readyState == 4) {
         if(client.status === 200) { 
            jsonFile = JSON.parse(client.responseText);
            populateFigures(true);
        } else {
            alert('An error occurred during your request: ' +  client.status + ' ' + client.statusText);
        } 
      };
   };
}

function populateFigures(advance) {

   
   if (!advance && advance !== undefined)
   {
      currentFigureIndex -= 1;

      
      if(currentFigureIndex < 0)
      {
         currentFigureIndex = jsonFile.ImageList.length + currentFigureIndex;
      }
   }
   
   else 
   {
     
      if (currentFigureIndex === (jsonFile.ImageList.length - 1))
      {
         currentFigureIndex = 0 ;
      }
      else {
         
         currentFigureIndex++;
      }
   }
         
   
   var currentFigure = jsonFile.ImageList[currentFigureIndex];
   document.getElementById("image").src = currentFigure.name;
   document.getElementById("imgName").innerText = currentFigure.name.substring(currentFigure.name.indexOf("/")+1);
   waitingTime = currentFigure.time;

   
   clearInterval(autoAdvance);
   autoAdvance = setInterval(rightAdvance,waitingTime);
}


function rightArrow() {
   rightAdvance();
}


function rightAdvance() {   
   populateFigures(true);
}


function leftArrow() {   
   populateFigures(false);
}


function createEventListeners() {
   var leftarrow = document.getElementById("leftarrow");
   if (leftarrow.addEventListener) {
     leftarrow.addEventListener("click", leftArrow, false); 
   } else if (leftarrow.attachEvent)  {
     leftarrow.attachEvent("onclick", leftArrow);
   }

   var rightarrow = document.getElementById("rightarrow");
   if (rightarrow.addEventListener) {
     rightarrow.addEventListener("click", rightArrow, false); 
   } else if (rightarrow.attachEvent)  {
     rightarrow.attachEvent("onclick", rightArrow);
   }  
}


function setUpPage() {
   createEventListeners();
   loadJsonFile();
   
}


if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false); 
} else if (window.attachEvent)  {
  window.attachEvent("onload", setUpPage);
}
