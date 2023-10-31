var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        products(this);
    }
    if (this.readyState == 4 && this.status == 404){
        window.location.assign('404.php');
    }
};
xhttp.open("GET", "LeBon.xml", true);
xhttp.send();

function menus(xml) {
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName('menu');
    for (i = 0; i < x.length; i++) {
        var txt = "";
        var coffeename, price, media, link;
        var y = x[i].children;

        for(a=0; a < y.length; a++){
            var e = y[a].nodeName;

            if(e == "name"){
                coffeename = y[a].childNodes[0].nodeValue;
            } 
            else if(e == "price") {
                price = y[a].childNodes[0].nodeValue;
            }
            else if(e == "media") {
                media = y[a].childNodes[0].nodeValue;
            }
        }
	

        // Display Image data in img tag
        var productImg = document.getElementById("product-img"+ i);
        productImg.setAttribute("src", media);

        //Display product name h2 tag
        document.getElementById("product-name"+ i).innerHTML = coffeename;

        // Display price and description in p tag
        document.getElementById("product-price"+ i ).innerHTML = "Price: $" + price;
    }
}
