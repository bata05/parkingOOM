const readline = require('readline');
const parkingHandler = require('./parkingHandler')
const cli_listener = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let main = () => {
    cli_listener.on('line', async (cliInput) => {
        cliInput = cliInput.split(" ");
        switch (cliInput[0]) {
            case ('entrypoint'):
                try {
                    const result = await parkingHandler.entryPoint(cliInput[1]);
                    console.log(result);
                } catch (e) {
                    console.log(`An error occurred: ${e}`);
                }
                break;
            case ('slotMap'):
                try {
                    const result = await parkingHandler.updateAttributes(cliInput[1], parkingHandler.attribTxType.SLOT_LOCATION);
                    console.log(result);
                } catch (e) {
                    console.log(`An error occurred: ${e}`);
                }
                break;
            case ('slotSizeMap'):
                try {
                    const result = await parkingHandler.updateAttributes(cliInput[1], parkingHandler.attribTxType.SLOT_SIZE);
                    console.log(result);
                } catch (e) {
                    console.log(`An error occurred: ${e}`);
                }
                break;                
            case ('park'):
                    try {
                        const result = await parkingHandler.park(cliInput[1]);
                        console.log(result);
                    } catch (e) {
                        console.log(`An error occurred: ${e}`);
                    }
                    break;  
            case ('unpark'):
                try {
                    const result = await parkingHandler.unpark(cliInput[1], cliInput[2]);
                    console.log(result);
                } catch (e) {
                    console.log(`An error occurred: ${e}`);
                }
                break;                                   
            default:
                console.log(`That command is not supported or there's a typo!`);
        }
    });
}

cli_listener.on('SIGINT', () => {
    cli_listener.question('Exit Program? (y/n) ', (answer) => {
        if (answer.match(/^y?$/i)) cli_listener.pause();
    });
}); 
 
main();