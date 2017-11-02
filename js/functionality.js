var nextPlayer = 1;
var matrix = [];


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
        matrix = raspuns.table;
        nextPlayer = raspuns.nextPlayer;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var piesa = matrix[i][j];
                if (piesa) {
                    var td = $('#mainBoard tr').eq(i).find('td').eq(j);
                    td.append('<div class="piesa player' + piesa + '"></div>');
                }
            }
        }
    });

}

generateEmptyTable();
load();

function checkNeighbours(rowIndex, cellIndex) {
    //direction top-left (-1, -1)
    if (matrix[rowIndex - 1][cellIndex - 1] == (nextPlayer == 1 ? 2 : 1)) {
        console.log("Found enemy on top left");
    }

    //direction top (-1, 0)
    if (matrix[rowIndex - 1][cellIndex] == (nextPlayer == 1 ? 2 : 1)) {
        console.log("Found enemy on top");
    }

    //direction top-right (-1, +1)
    if (matrix[rowIndex - 1][cellIndex + 1] == (nextPlayer == 1 ? 2 : 1)) {
        console.log("Found enemy on top right");
    }

    //direction right (0, +1)
    if (matrix[rowIndex][cellIndex + 1] == (nextPlayer == 1 ? 2 : 1)) {
        console.log("Found enemy on right");
    }

    //direction bottom-right (+1, +1)
    if (matrix[rowIndex + 1][cellIndex + 1] == (nextPlayer == 1 ? 2 : 1)) {
        console.log("Found enemy on bottom right");
    }

    //direction bottom (+1, 0)
    if (matrix[rowIndex + 1][cellIndex] == (nextPlayer == 1 ? 2 : 1)) {
        console.log("Found enemy on bottom");
    }

    //direction bottom-left (+1, -1)
    if (matrix[rowIndex + 1][cellIndex - 1] == (nextPlayer == 1 ? 2 : 1)) {
        console.log("Found enemy on bottom left");
    }

    //direction left (0, -1)
    if (matrix[rowIndex][cellIndex - 1] == (nextPlayer == 1 ? 2 : 1)) {
        console.log("Found enemy on left");
    }
    console.log("________________"); //just empty space to separate messages
}

$("#mainBoard").on("click", "td", function () {
    var td = $(this);
    // nextPlayer = nextPlayer==1 ? 2 : 1;


    if (td.find('.piesa').length == 0) { //if the clicked cell is empty then put a piece
        td.append('<div class="piesa player' + nextPlayer + '"></div>');
        matrix[this.parentNode.rowIndex][this.cellIndex]= nextPlayer;

        checkNeighbours(this.parentNode.rowIndex, this.cellIndex);

        nextPlayer = nextPlayer == 1 ? 2 : 1;
    } else { //if the clicked cell is busy
        console.log("Cell Busy!");
    }

});

