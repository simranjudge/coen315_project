
$('.popup').click(function() {
    var id = $(this).attr('id').split("-");
    id = "#" + id[0] + "Inf" + id[1];
    console.log(id);
    $(id).popup({closebutton: true});
});
