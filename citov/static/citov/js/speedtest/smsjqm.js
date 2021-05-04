/*!
* Copyright protected 2011 ScanmySpeed.com - http://www.scanmyspeed.com/
* Terms and conditions - http://www.scanmyspeed.com/terms-and-conditions/
*/
var conn = null;
var scanstatus = false;
var ctask, cval1, cval2, cval3;
var gdtsval = "";
var gdts = 0;
var bts, btr;
var lat = 0;
var latd = 0;
var latu = 0;
var ds, us;
var lata = [];
var latda = [];
var latua = [];
var ra = [];
var sa = [];
var ts = 0;
var tf = 0;
var stype = 2;
var btype;
function getconn() {
    if (window.XMLHttpRequest) {
        conn = new XMLHttpRequest();
        if (conn.overrideMimeType) {
            conn.overrideMimeType("text/xml");
        }
    }
    else {
        if (window.ActiveXObject) {
            try {
                conn = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e) {
                try {
                    conn = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e) {
                    alert("Your web browser does not support AJAX!");
                    conn = false;
                }
            }
        }
        else {
            alert("Your web browser does not support AJAX!");
            conn = false;
        }
    }
    return conn;
}
function getdatatosend(xb) {
    if (xb == gdts) {
        return gdtsval;
    }
    else {
        var y = "";
        var x;
        gdts = xb;
        xb *= 1024;
        if (xb > 0) {
            for (x = 0; x < xb; x++) {
                if (x == 1) {
                    y += "=";
                }
                else {
                    y += String.fromCharCode((x % 26) + 65);
                }
            }
        }
        gdtsval = y;
        return y;
    }
}
function getfiletoreceive(xb) {
    var y = "";
    var x;
    xb *= 1024;
    for (x = 0; x < 7; x++) {
        y += (xb % 10);
        xb = Math.floor(xb / 10);
    }
    var z = y.split("");
    var zz = z.reverse();
    y = zz.join("") + ".aspx";
    return y;
}
function getandsend(gdts, dts, gdtr, ftr, cte) {
    var params, fr;
    if (conn) {
        conn.onreadystatechange = function () { };
        conn.abort();
    }
    conn = getconn();
    if (gdts == true) {
        params = getdatatosend(dts);
    }
    else {
        params = dts;

    }
    if (gdtr == true) {
        fr = getfiletoreceive(ftr);
    }
    else {
        fr = ftr;
    }
    conn.open("POST", "scan/speed/" + fr + "?ref_id=" + parseInt(Math.random() * 10000), true);
    conn.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    conn.setRequestHeader("Content-length", params.length);
    conn.setRequestHeader("Connection", "close");
    conn.onreadystatechange = function () {
        if (conn.readyState == 4) {
            var tfd = new Date();
            tf = tfd.getTime();
            if (scanstatus == true)
                setTimeout(cte, 0);
        }
    }
    var tsd = new Date();
    ts = tsd.getTime();
    conn.send(params);
}
function getdownspeed() {
    if (ra.length > 0) {
        ra.sort();
        var i = 0;
        var j = 0;
        var k = ra.length;
        var l = 0;
        if (ra.length >= 7) {
            var m = true;
            i = 1;
            while (m) {
                if ((ra[i] - ra[0]) <= (ra[ra.length - 1] - ra[i])) {
                    i++;
                }
                else {
                    m = false;
                }
                if (i >= ra.length - 1)
                    m = false;
            }
            var nra;
            if (i >= ra.length / 3)
                nra = ra.slice(0, i);
            else
                nra = ra.slice(i, ra.length);
            i = 1;
            while (m) {
                if ((nra[i] - nra[0]) <= (nra[nra.length - 1] - nra[i])) {
                    i++;
                }
                else {
                    m = false;
                }
                if (i >= nra.length - 1)
                    m = false;
            }
            if (i >= nra.length / 3)
                nra = nra.slice(0, i);
            else
                nra = nra.slice(i, nra.length);
            for (i = 0; i < nra.length; i++) {
                if (btype == 1) {
                    if (nra[i] - lat > 0) {
                        j += (nra[i] - lat);
                        l++;
                    }
                }
                else {
                    if (nra[i] - lat > 0) {
                        j += (nra[i] - latd);
                        l++;
                    }
                }

            }
        }
        else {
            for (i = 0; i < k; i++) {
                if (btype == 1) {
                    if (ra[i] - lat > 0) {
                        j += (ra[i] - lat);
                        l++;
                    }
                }
                else {
                    if (ra[i] - latd > 0) {
                        j += (ra[i] - latd);
                        l++;
                    }
                }
            }
        }
        if ((j > 0) && (l > 0)) {
            j /= l;
            if (btype == 1) {
                j = (btr) / (j / 1000);
            }
            else {
                j = (btr / 2) / (j / 1000);
            }
        }
        return j;
    }
    else {
        return 0;
    }
}
function getlatu() {
    var i, j, l;
    latua.sort();
    var m = true;
    i = 1;
    while (m) {
        if ((latua[i] - latua[0]) <= (latua[latua.length - 1] - latua[i])) {
            i++;
        }
        else {
            m = false;
        }
        if (i >= latua.length - 1)
            m = false;
    }
    var nra;
    if (i >= latua.length / 3)
        nra = latua.slice(0, i);
    else
        nra = latua.slice(i, latua.length);
    i = 1;
    while (m) {
        if ((nra[i] - nra[0]) <= (nra[nra.length - 1] - nra[i])) {
            i++;
        }
        else {
            m = false;
        }
        if (i >= nra.length - 1)
            m = false;
    }
    if (i >= nra.length / 3)
        nra = nra.slice(0, i);
    else
        nra = nra.slice(i, nra.length);
    l = 0; j = 0;
    for (i = 0; i < nra.length; i++) {
        j += nra[i];
        l++;
    }
    return j / l;
}
function getlatd() {
    var i, j, l;
    latda.sort();
    var m = true;
    i = 1;
    while (m) {
        if ((latda[i] - latda[0]) <= (latda[latda.length - 1] - latda[i])) {
            i++;
        }
        else {
            m = false;
        }
        if (i >= latda.length - 1)
            m = false;
    }
    var nra;
    if (i >= latda.length / 3)
        nra = latda.slice(0, i);
    else
        nra = latda.slice(i, latda.length);
    i = 1;
    while (m) {
        if ((nra[i] - nra[0]) <= (nra[nra.length - 1] - nra[i])) {
            i++;
        }
        else {
            m = false;
        }
        if (i >= nra.length - 1)
            m = false;
    }
    if (i >= nra.length / 3)
        nra = nra.slice(0, i);
    else
        nra = nra.slice(i, nra.length);
    l = 0; j = 0;
    for (i = 0; i < nra.length; i++) {
        j += nra[i];
        l++;
    }
    return j / l;
}
function getlat() {
    var i, j, l;
    lata.sort();
    var m = true;
    i = 1;
    while (m) {
        if ((lata[i] - lata[0]) <= (lata[lata.length - 1] - lata[i])) {
            i++;
        }
        else {
            m = false;
        }
        if (i >= lata.length - 1)
            m = false;
    }
    var nra;
    if (i >= lata.length / 3)
        nra = lata.slice(0, i);
    else
        nra = lata.slice(i, lata.length);
    i = 1;
    while (m) {
        if ((nra[i] - nra[0]) <= (nra[nra.length - 1] - nra[i])) {
            i++;
        }
        else {
            m = false;
        }
        if (i >= nra.length - 1)
            m = false;
    }
    if (i >= nra.length / 3)
        nra = nra.slice(0, i);
    else
        nra = nra.slice(i, nra.length);
    l = 0; j = 0;
    for (i = 0; i < nra.length; i++) {
        j += nra[i];
        l++;
    }
    return j / l;
}
function getupspeed() {
    if (sa.length > 0) {
        sa.sort();
        var i = 0;
        var j = 0;
        var k = sa.length;
        var l = 0;
        if (sa.length >= 7) {
            var m = true;
            i = 1;
            while (m) {
                if ((sa[i] - sa[0]) <= (sa[sa.length - 1] - sa[i])) {
                    i++;
                }
                else {
                    m = false;
                }
                if (i >= sa.length - 1)
                    m = false;
            }
            var nsa;
            if (i >= sa.length / 3)
                nsa = sa.slice(0, i);
            else
                nsa = sa.slice(i, sa.length);
            i = 1;
            while (m) {
                if ((nsa[i] - nsa[0]) <= (nsa[nsa.length - 1] - nsa[i])) {
                    i++;
                }
                else {
                    m = false;
                }
                if (i >= nsa.length - 1)
                    m = false;
            }
            if (i >= nsa.length / 3)
                nsa = nsa.slice(0, i);
            else
                nsa = nsa.slice(i, nsa.length);
            for (i = 0; i < nsa.length; i++) {
                if (btype == 1) {
                    if (nsa[i] - lat > 0) {
                        j += (nsa[i] - lat);
                        l++;
                    }
                }
                else {
                    if (nsa[i] - latu > 0) {
                        j += (nsa[i] - latu);
                        l++;
                    }
                }

            }
        }
        else {
            for (i = 0; i < k; i++) {
                if (btype == 1) {
                    if (sa[i] - lat > 0) {
                        j += (sa[i] - lat);
                        l++;
                    }
                }
                else {
                    if (sa[i] - latu > 0) {
                        j += (sa[i] - latu);
                        l++;
                    }
                }

            }
        }

        if ((j > 0) && (l > 0)) {
            j /= l;
            if (btype == 1) {
                j = (bts) / (j / 1000);
            }
            else {
                j = (bts / 2) / (j / 1000);
            }
        }
        return j;
    }
    else {
        return 0;
    }
}
function getbtype() {
    if (navigator.appName == "Netscape")
    { btype = 1; }
    else
    { btype = 2; }
}
function getbtx() {
    var i = true;
    var j = 1;
    var btx = 8192;
    while (i) {
        if (lat <= j) {
            i = false;
        }
        else {
            j *= 2;
            btx /= 2
            if (j > 4096) {
                i = false;
            }
        }
    }
    if ((stype == 1) && (btx > 1)) {
        btr = btx / 2;
        bts = btx / 2;
    }
    if ((stype == 3) && (btx < 8192)) {
        btr = btx * 2;
        bts = btx * 2;
    }
    if (stype == 2) {
        btr = btx;
        bts = btx;
    }
    if ((btype == 2) && (btr == 1)) {
        btr = 2; bts = 2;
    }
}
function showdownmeter() {
    var ds = getdownspeed();
    var x1;
    if (((ds * 8) / 1024) >= 100) {
        x1 = ((Math.round(((ds * 8) / 1024) * 10)) / 10);
    }
    else {
        if (((ds * 8) / 1024) >= 10) {
            x1 = ((Math.round(((ds * 8) / 1024) * 100)) / 100);
        }
        else {
            x1 = ((Math.round(((ds * 8) / 1024) * 1000)) / 1000);
        }
    }
    $("#scanresultdmbit,#scandmbit").html(x1);
    if ((ds / 1024) >= 10) {
        x1 = ((Math.round((ds / 1024) * 10)) / 10);
    }
    else {
        x1 = ((Math.round((ds / 1024) * 100)) / 100);
    }
    $("#scanresultdmbyte,#scandmbyte").html(x1);
    ds *= 8;
    if (ds < 2048) {
        $("#downgreenbar,#downredbar").hide();
        $("#downgoldbar").show();
        $("#scandmbit").css("color", "#ff6600");
        var ma = 80 / 2048;
        $("#downpusherdiv").clearQueue();
        var wdt = parseInt((236 - (ma * ds)) + "") + "px";
        $("#downpusherdiv").animate({ height: wdt }, "slow");
    }
    else {
        if (ds < 20480) {
            $("#downgoldbar,#downredbar").hide();
            $("#downgreenbar").show();
            $("#scandmbit").css("color", "#339900");
            var ma = 80 / 18432;
            $("#downpusherdiv").clearQueue();
            var wdt = parseInt((156 - (ma * (ds - 2048))) + "") + "px";
            $("#downpusherdiv").animate({ height: wdt }, "slow");
        }
        else {
            $("#downgoldbar,#downgreenbar").hide();
            $("#downredbar").show();
            $("#scandmbit").css("color", "#cc0000");
            var ma = 80 / 81920;
            $("#downpusherdiv").clearQueue();
            var wdt = parseInt((76 - (ma * (ds - 20480))) + "") + "px";
            $("#downpusherdiv").animate({ height: wdt }, "slow");
        }
    }
}
function showupmeter() {
    var ds = getupspeed();
    var x1;
    if (((ds * 8) / 1024) >= 100) {
        x1 = ((Math.round(((ds * 8) / 1024) * 10)) / 10);
    }
    else {
        if (((ds * 8) / 1024) >= 10) {
            x1 = ((Math.round(((ds * 8) / 1024) * 100)) / 100);
        }
        else {
            x1 = ((Math.round(((ds * 8) / 1024) * 1000)) / 1000);
        }
    }
    $("#scanresultumbit,#scanumbit").html(x1);
    if ((ds / 1024) >= 10) {
        x1 = ((Math.round((ds / 1024) * 10)) / 10);
    }
    else {
        x1 = ((Math.round((ds / 1024) * 100)) / 100);
    }
    $("#scanresultumbyte,#scanumbyte").html(x1);
    ds *= 8;
    if (ds < 2048) {
        $("#upgreenbar,#upredbar").hide();
        $("#upgoldbar").show();
        $("#scanumbit").css("color", "#ff6600");
        var ma = 80 / 2048;
        $("#uppusherdiv").clearQueue();
        var wdt = parseInt((236 - (ma * ds)) + "") + "px";
        $("#uppusherdiv").animate({ height: wdt }, "slow");
    }
    else {
        if (ds < 20480) {
            $("#upgoldbar,#upredbar").hide();
            $("#upgreenbar").show();
            $("#scanumbit").css("color", "#339900");
            var ma = 80 / 18432;
            $("#uppusherdiv").clearQueue();
            var wdt = parseInt((156 - (ma * (ds - 2048))) + "") + "px";
            $("#uppusherdiv").animate({ height: wdt }, "slow");
        }
        else {
            $("#upgoldbar,#upgreenbar").hide();
            $("#upredbar").show();
            $("#scanumbit").css("color", "#cc0000");
            var ma = 80 / 81920;
            $("#uppusherdiv").clearQueue();
            var wdt = parseInt((76 - (ma * (ds - 20480))) + "") + "px";
            $("#uppusherdiv").animate({ height: wdt }, "slow");
        }
    }
}
function showprogress() {
    switch (ctask) {
        case 0:
            {
                $("#pbarfront").width("4px");
                break;
            }
        case 1:
            {
                $("#pbarfront").width("4px");
                break;
            }
        case 2:
            {
                var x1 = 200 / (10 * stype);
                x1 *= ((10 * stype) - cval1);
                x1 += 4;
                $("#pbarfront").clearQueue();
                var wdt = parseInt(x1 + "") + "px";
                $("#pbarfront").animate({ width: wdt }, lat);
                break;
            }
        case 3:
            {
                var x1 = 200 / (20 * stype);
                x1 *= ((20 * stype) - cval1);
                x1 += 4;
                $("#pbarfront").clearQueue();
                var wdt = parseInt(x1 + "") + "px";
                $("#pbarfront").animate({ width: wdt }, (bts * 1000 / ds));
                break;
            }
        case 4:
            {
                var x1 = 200 / (10 * stype);
                x1 *= ((10 * stype) - cval1);
                x1 += 4;
                $("#pbarfront").clearQueue();
                var wdt = parseInt(x1 + "") + "px";
                $("#pbarfront").animate({ width: wdt }, (bts * 1000 / us));
                break;
            }
        case 6:
            {
                var x1 = 200 / (10 * stype);
                x1 *= ((10 * stype) - cval1);
                x1 += 4;
                $("#pbarfront").clearQueue();
                var wdt = parseInt(x1 + "") + "px";
                $("#pbarfront").animate({ width: wdt }, latd);
                break;
            }
        case 7:
            {
                var x1 = 200 / (10 * stype);
                x1 *= ((10 * stype) - cval1);
                x1 += 4;
                $("#pbarfront").clearQueue();
                var wdt = parseInt(x1 + "") + "px";
                $("#pbarfront").animate({ width: wdt }, latu);
                break;
            }
    }
}
function downtest(ct) {
    if (scanstatus == true) {
        ctask = ct;
        switch (ctask) {
            case 0:
                {
                    $("#scanningl").fadeIn("slow");
                    if (document.getElementById('scantypeexpress').checked == true) {
                        stype = 1;
                    }
                    else {
                        if (document.getElementById('scantypeextended').checked == true) {
                            stype = 3;
                        }
                        else {
                            stype = 2;
                        }
                    }
                    showprogress();
                    getandsend(true, 0, true, 0, "downtest(1);");
                    break;
                }
            case 1:
                {
                    cval1 = 10 * stype;
                    getandsend(true, 0, true, 0, "downtest(2);");
                    break;
                }
            case 2:
                {
                    lata.push(tf - ts);
                    lat = getlat();
                    if (--cval1 > 0) {
                        showprogress();
                        getandsend(true, 0, true, 0, "downtest(2);");
                    }
                    else {
                        lat = getlat();
                        showprogress();
                        getbtx();
                        if (btype == 1) {
                            cval1 = 20 * stype;
                            $("#scanningl").fadeOut("slow");
                            $("#scanningd").fadeIn("slow");
                            getandsend(true, 0, true, btr, "downtest(3);");
                        }
                        else {
                            cval1 = 10 * stype;
                            getandsend(true, 0, true, btr / 2, "downtest(6);");
                            break;
                        }
                    }
                    break;
                }
            case 3:
                {
                    ra.push(tf - ts);
                    ds = getdownspeed();
                    if (--cval1 > 0) {
                        showdownmeter();
                        showprogress();
                        getandsend(true, 0, true, btr, "downtest(3);");
                    }
                    else {
                        showdownmeter();
                        showprogress();
                        if (btype == 1) {
                            cval1 = 10 * stype;
                            $("#scanningd").fadeOut("slow");
                            $("#scanningu").fadeIn("slow");
                            getandsend(true, bts, true, 0, "downtest(4);");
                        }
                        else {
                            cval1 = 10 * stype;
                            $("#scanningd").fadeOut("slow");
                            $("#scanningl").fadeIn("slow");
                            getandsend(true, bts / 2, true, 0, "downtest(7);");
                            break;
                        }
                    }
                    break;
                }
            case 4:
                {
                    sa.push(tf - ts);
                    us = getupspeed();
                    if (--cval1 > 0) {
                        showupmeter();
                        showprogress();
                        getandsend(true, bts, true, 0, "downtest(4);");
                    }
                    else {
                        showupmeter();
                        showprogress();
                        stopthescan();
                    }
                    break;
                }
            case 6:
                {
                    latda.push(tf - ts);
                    latd = getlatd();
                    if (--cval1 > 0) {
                        showprogress();
                        getandsend(true, 0, true, btr / 2, "downtest(6);");
                    }
                    else {
                        latd = getlatd();
                        showprogress();
                        cval1 = 20 * stype;
                        $("#scanningl").fadeOut("slow");
                        $("#scanningd").fadeIn("slow");
                        getandsend(true, 0, true, btr, "downtest(3);");
                    }
                    break;
                }
            case 7:
                {
                    latua.push(tf - ts);
                    latu = getlatu();
                    if (--cval1 > 0) {
                        showprogress();
                        getandsend(true, bts / 2, true, 0, "downtest(7);");
                    }
                    else {
                        latu = getlatu();
                        showprogress();
                        cval1 = 10 * stype;
                        $("#scanningl").fadeOut("slow");
                        $("#scanningu").fadeIn("slow");
                        getandsend(true, bts, true, 0, "downtest(4);");
                    }
                    break;
                }
        }
    }
}

function dothescan() {
    scanstatus = true;
    $("#scanningd,#scanningu,#scanningl,#scanresult,#scantype,#scanstart").fadeOut("fast");
    $("#pbarback,#pbarfront,#scanstop").fadeIn('slow');
    var i;
    if (ra.length > 0) {
        for (i = 0; i < ra.length; i++)
            ra.pop();
    }
    if (sa.length > 0) {
        for (i = 0; i < sa.length; i++)
            sa.pop();
    }
    downtest(0);
}
function stopthescan() {
    scanstatus = false;
    $("#pbarback,#pbarfront,#scanstop,#scanningd,#scanningu,#scanningl,#scantype,#scanstart").fadeOut('fast');
    $("#scanresult").fadeIn('slow');
}
function setupcontrols() {
    $("#scanstart").click(function () {
        dothescan();
    });
    $("#scanagain").click(function () {
        setupscan()
        dothescan();
    });
    $("#sms").click(function () {
        window.location = "http://www.scanmyspeed.com/";
    });
    $("#scanstop").click(function () {
        stopthescan();
    });
    $("#scantypeexpress,#scantypeexpressdiv").click(function () {
        $("#scantypenormal,#scantypeextended").attr('checked', false);
        $("#scantypeexpress").attr('checked', true);
    });
    $("#scantypenormal,#scantypenormaldiv").click(function () {
        $("#scantypeexpress,#scantypeextended").attr('checked', false);
        $("#scantypenormal").attr('checked', true);
    });
    $("#scantypeextended,#sscantypeextendeddiv").click(function () {
        $("#scantypenormal,#scantypeexpress").attr('checked', false);
        $("#scantypeextended").attr('checked', true);
    });
}
function setupscan() {
    while (lata.length > 0)
        lata.pop();
    while (latda.length > 0)
        latda.pop();
    while (latua.length > 0)
        latua.pop();
    while (ra.length > 0)
        ra.pop();
    while (sa.length > 0)
        sa.pop();
    $(".greenbar,.redbar,.goldbar,#pbarback,#pbarfront,#scanstop,#scanningd,#scanningu,#scanningl,#scanresult,").hide();
    $("#pbarback,#pbarfront").height("29px");
    $("#pbarback,#pbarfront").width("204px");
    $("#pbarfront").width("4px");
    $("#scanstop,#scanningd,#scanningu,#scanningl").height("40px");
    $("#scanstop,#scanningd,#scanningu,#scanningl").width("200px");
    $("#scanresult").height("265px");
    $("#scanresult").width("210px");
    $("#scandmbit,#scanumbit").css("color", "#ff6600");
    $("#scanresultdmbit,#scanresultdmbyte,#scanresultumbit,#scanresultumbyte,#scandmbit,#scandmbyte,#scanumbit,#scanumbyte").html("0");
    $(".pusherdiv").height("240px");
    $("#scantype,#scanstart").show();
}
$(document).ready(function () {
    getbtype();
    setupcontrols();
    setupscan();
});
