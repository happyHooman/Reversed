// var $ = jQuery;
// $(document).ready(function () {
// });
//
// for (var i=0; i< 64; i++){
//     // document.getElementById("mainBoard").appendChild(document.createElement("div")).style.backgroundColor = parseInt
//     // ((i / 8) + i) % 2 == 1 ? '#ababab' : 'white';
//
//
// }
var nextPlayer = 1;

function generateEmptyTable() {
    var list = [];
    for (var i = 0; i < 8; i++) {
        list.push('<tr>');
        for (var j = 0; j < 8; j++) {
            var colorata = i % 2 ? j % 2 : ((j + 1) % 2);
            list.push('<td class="square ' + (colorata ? 'color' : '') + ' "></td>');
        }
        list.push('</tr>');
    }
    $('#mainBoard').html(list.join(''));
}

function load() {
    $.ajax('date.json', {
        cache: false,
        dataType: 'json'
    }).done(function (raspuns) {
        console.debug('contacts loaded', raspuns);
        var status = raspuns.table;
        nextPlayer = raspuns.nextPlayer;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var piesa = status [i][j];
                if (piesa){
                    var td = $('#mainBoard tr').eq(i).find('td').eq(j);
                    td.append('<div class="piesa player' + piesa +'"></div>');
                }
            }
        }
    });

}

generateEmptyTable();
load();

$("#mainBoard").on("click", "td", function () {
    var td = $(this);
    if (td.find('.piesa').length == 0) {
        td.append('<div class="piesa player' + nextPlayer + '"></div>');
        if (nextPlayer == 1) {
            nextPlayer = 2
        } else if (nextPlayer == 2) {
            nextPlayer = 1
        }
    }
});

