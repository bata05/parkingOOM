# parkingOOM

Install all dependencies (testing dependent packages)
"npm install"

Run the main program
"node index.js"

When the prompt is ready to add the following:

Inputs:
----------------------
● Set the number of entry points: entrypoint <number of entrypoints><br />
● Set the map of the parking slot: <br />
   slotMap <list value, comma seperated, array per tupple base on the number of entry points>  <br />
   Example: with 3 entry points, "slotMap (1,4,5),(3,2,3)" <br />

● Set the parking slot size, where S(0), M(1), L(2): <br />
   slotSizeMap <--list value, comma seperated, array per tupple base on the number of entry points, values should be the valid sizes--> <br /> 
   Example: with 3 entry points, "slotSizeMap (1,2,0),(2,0,1)" <br />  
   
● Park a car based on category S(Small), M(Medium), L(Large)<br />
   park <--car category--> <br />
   Example: "park S" <br />
   
● Un-Park a car based on category S(Small), M(Medium), L(Large)<br /> 
   unpark <--car category--> <br />
   Example: "unpark S" <br />

● Un-Park a car based on category S(Small), M(Medium), L(Large) and define time exited the parking<br />
   unpark <--car category--> <date MM/dd/YYYY_HH:MM:SS><br />
   Example: "unpark S 03/30/2022_09:10:00" <br />
   
