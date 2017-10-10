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

var list = [];
for(var i=0; i<8; i++){
    list.push('<tr>');
    for(var j=0; j<8; j++) {
        var colorata = i % 2 ? j % 2 : ((j+1) % 2);
        list.push('<td class="square ' + (colorata ? 'color' : '')+ ' "></td>');
    }
    list.push('</tr>');
}
$('#mainBoard').html(list.join(''));

