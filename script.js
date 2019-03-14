

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

async function getResults() {
	const result = await
	fetch('http://instaplants.sim315.com/plants');
	const data = await result.json();
	console.log(data);
}

getResults();
