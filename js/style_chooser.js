styleChooserDiv = $('#styleChooser');
// var styleChooserDiv = document.getElementById("styleChooser");

$.each(styles, function(index1, val1) {
    switch (val1['geometry']) {
        case "point":
            // console.log(val['geometry']);
            nameDiv = $('<div>', {
                text: val1['display']
            }).appendTo(styleChooserDiv);
            buttonsDiv = $('<div>', {
                class: 'btn-group'
            }).appendTo(nameDiv)
            buttonsDiv.attr(
                'data-toggle', 'buttons'
            );
            labelDiv = $.each(val1['styles'], function(index, val2) {
                styleDiv = $('<label>', {
                    text: index,
                    class: 'btn btn-default style-radio',
                    click: function() {
                        val1['layer'].eachLayer(val1['styles'][index]['style']);
                        legendObj = {};
                        legendObj[index1] = val1['styles'][index]['legend'];
                        legend.update(legendObj);
                    }
                }).appendTo(nameDiv);
                styleDiv.prepend('<input type="radio" name="options" id="options_' + index + '"></input>');
            });

            break;
        default:
            // console.log(val['geometry']);
            nameDiv = $('<div>', {
                text: val1['display']
            }).appendTo(styleChooserDiv);
            buttonsDiv = $('<div>', {
                class: 'btn-group'
            }).appendTo(nameDiv)
            buttonsDiv.attr(
                'data-toggle', 'buttons'
            );
            labelDiv = $.each(val1['styles'], function(index, val2) {
                styleDiv = $('<label>', {
                    text: index,
                    class: 'btn btn-default style-radio',
                    click: function() {
                        val1['layer'].setStyle(val1['styles'][index]['style']);
                        legendObj = {};
                        legendObj[index1] = val1['styles'][index]['legend'];
                        legend.update(legendObj);
                    }
                }).appendTo(nameDiv);
                styleDiv.prepend('<input type="radio" name="options" id="options_' + index + '"></input>');
            });
            break;
    }
});