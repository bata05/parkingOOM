//A parking Lot will have 15 slots
//It will be able to support 3 car sizes(S,M,L)
//Each will have 5 slots allocation per car size
//it will have SMALL, MEDIUM, LARGE order e.g [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
//NEAREST TO ENTRANCE will be from LEFT-RIGHT (FARTHEST)
const attribTxType = {
    SLOT_LOCATION: 0,
    SLOT_SIZE: 1,
}

const parkingSpace = {
    SP: 0,
    MP: 1,
    LP: 2
}

const carCategoriesNumVal = {
    S: 0,
    M: 1,
    L: 2
}

const carCategoriesInputVal = {
    SMALL: 'S',
    MEDIUM: 'M',
    LARGE: 'L'
}


let parkingApp = {
    entryPoints: 3
}

let availableParkSlot = [];

let unparked = [];

const getNumCarCategory = (carCategory) => {
    if(carCategory == carCategoriesInputVal.SMALL){
        return carCategoriesNumVal.S;
    } else if(carCategory == carCategoriesInputVal.MEDIUM){
        return carCategoriesNumVal.M;
    }  else {
        return carCategoriesNumVal.L;
    }
}

let entryPoint = async (entryPointCount) => {
    try {
        let entryPointvalue = parseInt(entryPointCount);
        if(entryPointvalue<3){
            return "EntryPoint can't be less than 3!";
        } else {
            parkingApp.entryPoints =  entryPointvalue;
            return `Successfully set EntryPoint to ${entryPointvalue}!`;
        }
    } catch (e) {
        return "EntryPoint defined is not a number!";
    }
}

let updateAttributes = async (listOfParkSlot, txnType) => {
    const slotMapEntry = listOfParkSlot.split("),(");
    var arrayLength = slotMapEntry.length;
    for (var dataCount = 0; dataCount < arrayLength; dataCount++) {
        let data = slotMapEntry[dataCount].replace(/[()]/g,'');
        const slots = data.split(",")
        if(slots.length > parkingApp.entryPoints)
        {
            return "Data Entries are more than the number of entry points";
        }
        slots.forEach((slotEntry, slotIndex) => {
                if(txnType === attribTxType.SLOT_LOCATION)
                {
                    let newSlot =   {
                        uniqueId: `${slotIndex}${dataCount}`,
                        entryPointNum: `${slotIndex}`,
                        distance: parseInt(slotEntry),
                        slotSize: 0,
                        isAvailable: true,
                        parkTimeIn: null,
                        parkTimeOut: null,
                    }
                    availableParkSlot.push(newSlot);
                    availableParkSlot.sort((a,b) => a.distance - b.distance);
                } else {
                    let existingSlot = availableParkSlot.find(item => item.uniqueId === `${slotIndex}${dataCount}`);
                    existingSlot.slotSize = parseInt(slotEntry);
                    if(existingSlot.slotSize === parkingSpace.SP)
                    {
                        existingSlot.excessHourRate = 20; 
                    } else if(existingSlot.slotSize === parkingSpace.MP) {
                        existingSlot.excessHourRate = 60; 
                    } else {
                        existingSlot.excessHourRate = 100; 
                    }
                }
            }
        );
    }
    return 'Successfully Performed Transaction'
}

let park = async (carCategoryInput) => {
    let carCategory = getNumCarCategory(carCategoryInput);    
    let nearestParkingSlot = availableParkSlot.find(item => (item.slotSize >=  parseInt(carCategory) && item.isAvailable));
    
    if(nearestParkingSlot)
    {
        nearestParkingSlot.isAvailable = false;
        let today = new Date();
        let date = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`;
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTimeIn = `${date} ${time}`;
        let hasContinouseRate = unparked.find(item => (item.slotSize >=  parseInt(carCategory) && (new Date(dateTimeIn).getMinutes() - new Date(item.parkTimeOut).getMinutes()) < 60));
        if(hasContinouseRate)
        {
            nearestParkingSlot.parkTimeIn = hasContinouseRate.parkTimeIn;
            const index = unparked.indexOf(hasContinouseRate);
            unparked.splice(index,1);
        } else {
            nearestParkingSlot.parkTimeIn = dateTimeIn;
        }
        
        return `Successfully park with ${carCategoryInput} category on parking entry point ${nearestParkingSlot.entryPointNum} with distance unit ${nearestParkingSlot.distance}`;
    } else {
        return `No available park for Car with ${carCategoryInput} category`;
    }
}

let unpark = async (carCategoryInput, inputDateTimeOut) => {
    let carCategory = getNumCarCategory(carCategoryInput);    
    let parkSlot = availableParkSlot.find(item => (item.slotSize >=  parseInt(carCategory) && !item.isAvailable));
    if(parkSlot)
    {
        parkSlot.isAvailable = true;
        let totalParkTime = 0;
        if(inputDateTimeOut)
        {
            let dateDefined = inputDateTimeOut.replace(/[_]/g,' ');
            parkSlot.parkTimeOut = dateDefined;
            let hoursTimeOut = new Date(dateDefined);
            let hoursTimeIn = new Date(parkSlot.parkTimeIn);
            totalParkTime = Math.abs(hoursTimeOut - hoursTimeIn) / 36e5;
        } else {
            let today = new Date();
            let date = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`;
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTimeOut = `${date} ${time}`;
            parkSlot.parkTimeOut = dateTimeOut;
            let hoursTimeOut = new Date(dateTimeOut)
            let hoursTimeIn = new Date(parkSlot.parkTimeIn)
            totalParkTime = Math.abs(hoursTimeOut - hoursTimeIn) / 36e5;
        }
        let parkFee = 40; 
        if(totalParkTime > 24){
            let remainder24 = Math.trunc(totalParkTime % 24);
            parkFee = Math.round(5000+(parkSlot.excessHourRate * remainder24))
        }
        else if(totalParkTime > 3)
        {
            parkFee = Math.round(parkSlot.excessHourRate * Math.trunc(totalParkTime));
        }
        //parkSlot.parkTimeIn = 0;
        unparked.push(parkSlot);
        return `Successfully unpark ${carCategoryInput} category car with total fee of ${parkFee}`;
    } else {
        return `No parked Car, with ${carCategoryInput} category`;
    }
}

 

module.exports = {
    attribTxType,
    entryPoint,
    park,
    unpark,
    updateAttributes,
}
  