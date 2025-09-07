$(document).ready(function () {
  let currentYear = new Date().getFullYear();

  var footerElement = document.createElement("footer");

  footerElement.className = "footer";

  footerElement.innerHTML =
    '<div class="container-fluid"> ' +
    '    <div class="row">' +
    '        <div class="col-sm-6"> ' +
    "            © " +
    currentYear +
    " Zoftware Solutions" +
    "        </div>" +
    '        <div class="col-sm-6">' +
    '            <div class="text-sm-end d-none d-sm-block">' +
    "                Desarrollado por" +
    '                <i class="mdi mdi-heart text-danger"></i> by' +
    '                <a href="https://dev.zoftwaresolutions.pro">Zoftware Solutions</a>' +
    "            </div>" +
    "        </div>" +
    "    </div>" +
    "</div>";

  // Buscar el contenedor wrapper y agregar el footer
  var wrapperContainer = document.querySelector(".wrapper");
  if (wrapperContainer) {
    wrapperContainer.appendChild(footerElement);
  }
});
