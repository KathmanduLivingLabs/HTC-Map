function listenToElementChange(selector, fn){
    $(selector).bind("childcountchanged",fn);
    n=$(selector).children().length;
    setInterval(function(){    
        if(($(selector).children().length - n) !== 0){
                $(selector).trigger("childcountchanged");
                n = $(selector).children().length;
        };        
    }, 30);
    
}



$(document).ready(function() {
    /**temporary solution for stylechooser**/
    z=[];
    $("div.control-styles div#styleChooser div").hide();
    z.push($("div.control-styles div#styleChooser div")[2]);
    $(z).show();
    /****/
    
    /**zoom-to-full-extent button position**/
    $("div.leaflet-control-zoom").append("<a class='new-control' href=# title='Zoom to extent' onclick = 'fullextent()'><div id = 'zoom'><img src = 'img/MapFullExtent.png'></div></a>");
    /****/
    
    $(".trigger.styles").click(function() {
        $(this).next().toggle(100);
        $(".trigger.styles .lever").toggleClass("on off");
    });
    /**disable pan on when dragging on legend**/
    $(".leaflet-control").mouseover(function(){
        map.dragging.disable();
    });
    $(".leaflet-control").mouseout(function(){
        map.dragging.enable();
    });
    /****/
    
    /**popup styling**/
    sublist = ["Gov","GoV","FHI360","Save","FPAN","Others"];
    listenToElementChange(".leaflet-popup-pane", function(){
        $("#popup tr").addClass("listitem");
        for(txt in sublist){
            $("#popup td:contains('"+sublist[txt]+"')").parent().toggleClass("listitem sublist");
        };
        $("#popup tr.sublist").prev(".listitem").addClass("expandable");
    });
    /****/    
    //map.setZoom(7.4);
    /**this code block can be safely removed**/
    xmark = 2; //switch for trying different markers:
                        //set xmark=1 for pink-white balloons, set xmark = 2 for red balloons
});
