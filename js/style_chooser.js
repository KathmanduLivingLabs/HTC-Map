/////////////////////styleChooserDiv = $('#styleChooser');
var styleChooserDiv = document.getElementById("styleChooser");
htcStyles = ["supported", "cases"];
var rdiv = document.createElement('div');
/***********/
//rdiv.setAttribute("class", "btn-group-vertical");
//rdiv.setAttribute("data-toggle", "modal");
//styleChooserDiv.appendChild(rdiv);
/**********/

function clickfunction(id) {
    alert(id);
    // HTC_sites.redraw();
    HTC_sites.setStyle();
}

$.each(htcStyles, function(index, val) {
    button = document.createElement('input');
    button.setAttribute("class", "btn btn-primary");
    button.value = val;
    button.innerHtml = val;
    button.id = index;
    button.type = 'button';
    button.name = "htcStyles";
    button.setAttribute("onclick", "clickfunction(this.value)");
    rdiv.appendChild(button);
});

$.each(styles, function(index, val1) {
    switch (val1['geometry']) {
        case "point":
            // console.log(val['geometry']);
            nameDiv = $('<div>', {
                text: val1['display']
            }).appendTo(styleChooserDiv);
            $.each(val1['styles'], function(index, val2) {
                styleDiv = $("<button>", {
                    text: index,
                    click: function() {
                        val1['layer'].eachLayer(val1['styles'][index]);
                    }
                }).appendTo(nameDiv);
            });
            break;
        default:
            // console.log(val['geometry']);
            nameDiv = $('<div>', {
                text: val1['display']
            }).appendTo(styleChooserDiv);
            $.each(val1['styles'], function(index, val2) {
                styleDiv = $('<button>', {
                    text: index,
                    click: function() {
                        console.log("val1=", val1);
                        val1['layer'].setStyle(val1['styles'][index])
                    }
                }).appendTo(nameDiv);
            });
            break;
    }
});
