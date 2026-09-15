/* =========================================
   JAVASCRIPT WEBSITE
========================================= */


/* =========================================
   POPUP GALERI
========================================= */

function bukaFoto(foto) {

    const popup =
        document.getElementById("popup");

    const popupImg =
        document.getElementById("popup-img");


    popup.style.display = "flex";

    popupImg.src = foto.src;

}


/* =========================================
   TUTUP FOTO
========================================= */

function tutupFoto() {

    const popup =
        document.getElementById("popup");

    popup.style.display = "none";

}
