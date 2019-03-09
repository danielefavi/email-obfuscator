/*
    Antispam EMail Code Generator
    Developed by Daniele Favi
    Contact: info@danielefavi.com
*/


function getCodes() {

    var stringToEncode = '<a href="mailto:' + $("#emailTxt").val() + '">' + $("#linkTxt").val() + '</a>';
    $("#result").html(buildCode(stringToEncode));

}

function mixString(str) {

    var arrCor = [];
    var randomPos = 0;
    var buffer = [];

    for (var i=0; i<str.length; i++) {
        arrCor[i] = [i, str.substr(i,1)];
    }


    for (var i=0; i<str.length; i++) {

        randomPos = Math.floor(Math.random()*str.length);

        buffer = arrCor[i];
        arrCor[i] = arrCor[randomPos];
        arrCor[randomPos] = buffer;

    }

    return arrCor;

}


function buildCode(str) {

    var arrayCor = mixString(str);

    var header = " &lt;script type=&quot;text/javascript&quot;&gt; var c=new Array(); ";
    var footer = " for(var i=0;i&lt;a.length;i++){c[a[i]] = b[i]; } for(var i=0;i&lt;c.length;i++){document.write(c[i]);} &lt;/script&gt; ";

    var varPosition = "var a = [";
    var varLetters = "var b = [";

    for (var i=0; i<arrayCor.length; i++) {
        varPosition += arrayCor[i][0];
        varLetters += "'" + arrayCor[i][1] + "'";
        if (i < (arrayCor.length-1)) {
            varPosition += ",";
            varLetters += ",";
        }

    }
    varPosition += "];";
    varLetters += "];";

    return (header + varPosition + varLetters + footer);

}
