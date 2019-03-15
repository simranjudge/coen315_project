

/*
$('.popup').click(function() {
    var id = $(this).attr('id').split("-");
    id = "#" + id[0] + "Inf" + id[1];
    console.log(id);
    $(id).popup({closebutton: true});
});


document.querySelector('.action').addEventListener('click', (event) => {
    console.log("clicked");
    let id = event.target.parentNode.id;
    console.log(id);
});
*/

$('.action').click(function() {
    var id = $(this).attr('id').split("-");
    console.log(id);
    // turn light ON / OFF
    if(id[0] === "light") {
        console.log("switch light ON / OFF of plant " + id[1]);
    }
    // feed the water manually to the plant
    else if(id[0] === "moisture") {
        console.log("water the plant number " + id[1]);
    }
    else {
        console.log("unhandled exception");
    }
});

/* receive data from the server API and update the UI */
async function getResults() {
    try {
        const result = await
        fetch('http://instaplants.sim315.com/plants');
        const data = await result.json();
        console.log(data);

        // 1) update water level and display corresponding arrow
        const waterLevel = data.waterLevels[0];
        console.log(waterLevel);
        
            // hide the current displayed arrow
            document.querySelectorAll('div.arrow').forEach( el => el.classList.add('hide'));
            if(waterLevel >= 80) {
                // show top (green) arrow
                document.getElementById('arrow-0').classList.remove('hide');
            }
            else if(waterLevel >= 40) {
                document.getElementById('arrow-1').classList.remove('hide');
            }
            else {
                document.getElementById('arrow-2').classList.remove('hide');
                document.querySelector('.tank').innerHTML = "<h1 style=\"color:red;\">! REFILL WATER !</h1>";
            }
        
        // 2) loop through each station and update all the values
        for(let i = 0; i < 3; i++) {
            // update hours of light received
            document.getElementById(`lightInfo-${i}`).textContent = "dark";
            
            // update state of the light bulb
            if(data.lightBulbs[i] == 1) {
                document.getElementById(`bulbState-${i}`).textContent = "ON";
            }
            else {
                document.getElementById(`bulbState-${i}`).textContent = "OFF";
            }
            
            // update moisture
            document.getElementById(`moistureInf-${i}`).textContent = `${data.moistureLevels[i]} %`;
            
            // lightSensors?
        }
    }
    catch(error) {
        alert(error);
    }
};

getResults();
setInterval(getResults,10000);
