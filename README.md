# parkingOOM

Install all dependencies (testing dependent packages)
"npm install"

Run the main program
"node index.js"

When the prompt is ready to add the following:

Set the number of entry points: entrypoint <number of entrypoints>
Set the map of the parking slot: 
   slotMap <list value, comma seperated, array per tupple base on the number of entry points>  
   Example: with 3 entry points, "slotMap (1,4,5),(3,2,3)"

Set the parking slot size, where S(0), M(1), L(2): 
   slotSizeMap <list value, comma seperated, array per tupple base on the number of entry points, values should be the valid sizes>  
   Example: with 3 entry points, "slotSizeMap (1,2,0),(2,0,1)"  
