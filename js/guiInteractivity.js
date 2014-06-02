var layersControlLabel = "<div class='trigger layers passive'> Layers</div>";
$(document).ready(function(){
    $(".leaflet-control-layers").prepend(layersControlLabel);
    $("#styleChooser").hide(1000);
    
    $(".trigger.styles").click(function(){
        $(this).next().toggle(100);
        $(".trigger.styles .lever").toggleClass("on off");
    });
});
