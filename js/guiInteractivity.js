//var layersControlLabel = "<div class='trigger layers passive'> Layers</div>";

function listenToElementChange(selector, fn, trigger){
    if(trigger==="countchanged"){
        //console.log("inside..what??");
        $(selector).parent().bind(trigger, fn);
        m = $(selector).length;
    }else if(trigger==="childnodecountchanged"){
        $(selector).bind(trigger,fn);
        n=$(selector).children().length;
    }else{
        return;
    };
    
    id = setInterval(function(){    
        if(trigger==="countchanged"){
            if(($(selector).length - m) !== 0){
                $(selector).parent().trigger(trigger);
                m = $(selector).length;
            };
        }else{
            if(($(selector).children().length - n) !== 0){
                $(selector).trigger(trigger);
                n = $(selector).children().length;
            };
        };
        
    }, 30);
    
}



$(document).ready(function() {
    
    
    //$(".leaflet-control-layers").prepend(layersControlLabel);
    $("#styleChooser").hide(1000);
    
    /**zoom-to-full-extent button position**/
    $("div.leaflet-control-zoom").append("<a class='new-control' href=# title='Zoom to extent' onclick = 'fullextent()'><div id = 'zoom'><img src = 'img/MapFullExtent.png'></div></a>");
    /****/
    
    /**resize legend width according to number of items**/
    listenToElementChange(".leaflet-bottom.leaflet-left .info1.leaflet-control>div", function(){
        console.log("inside triggered function");
        if($(".leaflet-bottom.leaflet-left .info1.leaflet-control>div").length > 1){
            $(".leaflet-bottom.leaflet-left .info1.leaflet-control").css("max-width","300px");
        }else{
            $(".leaflet-bottom.leaflet-left .info1.leaflet-control").css("max-width","160px");
        };
    }, "countchanged");
    /****/

    $(".trigger.styles").click(function() {
        $(this).next().toggle(100);
        $(".trigger.styles .lever").toggleClass("on off");
    });
    
    /**popup styling**/
    sublist = ["GoV","FHI360","Save","FPAN","Others"];
    listenToElementChange(".leaflet-popup-pane", function(){
        $("#popup tr").addClass("listitem");
        for(txt in sublist){
            $("#popup td:contains('"+sublist[txt]+"')").parent().toggleClass("listitem sublist");
        };
        $("#popup tr.sublist").prev(".listitem").addClass("expandable");
    }, "childnodecountchanged");
    /****/
    
    
    //map.setZoom(7.4);
    

    /**this code block can be safely removed**/
    
    xmark = 2; //switch for trying different markers:
                        //set xmark=1 for pink-white balloons, set xmark = 2 for red balloons
    // map.on("zoomend", function() {
    //     $(".leaflet-marker-icon").css("width", Math.ceil(map.getZoom() / 9) * 10 + Math.floor(map.getZoom() / 11) * 10 + "px");
    //     $(".leaflet-marker-icon").css("height", Math.ceil(map.getZoom() / 9) * 15+ Math.floor(map.getZoom() / 11) * 15 + "px");
    //             //sets marker width and height for zoom levels:
    //                     //upto 9: 10px*15px
    //                     //10-11: 20px*30px
    //                     //above 11: 30px*45px
    //     $(".leaflet-marker-icon").attr("src", "img/marker" + xmark + Math.ceil(map.getZoom() / 10) + ".png");
    //             //sets markers for zoom levels:
    //                 //upto 10: coloured balloon
    //                 //above 10: coloured balloon with icon
    // });
    
    /****/
    
    

});
