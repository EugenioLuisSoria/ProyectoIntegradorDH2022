window.addEventListener("load", function () {
  let form = document.querySelector(".create_form");
  let productName = document.querySelector("#create_form_product_name");
  let productDescription = document.querySelector("#create_form_product_description");
  let productImage = document.querySelector("#create_form_product_image");
  let productCategory = document.querySelector("#create_form_product_category");
  let productStock = document.querySelector("#create_form_product_stock");
  let productWeight = document.querySelector("#create_form_product_weight");
  let productPrice = document.querySelector("#create_form_product_price");
  let productDiscount = document.querySelector("#create_form_product_discount");




  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (productName.value.length < 5) {
      return alert("Ingrese un nombre válido, de al menos 5 caracteres");
    }

    if (productDescription.value.length < 20) {
      return alert("Ingrese una descripción válida, de al menos 20 caracteres");
    }

    /* verificacione de IMAGEN */
    let imageRegEx = /\.(jpg|jpeg|png|gif)$/i;
    let testeoImagen = imageRegEx.test(productImage.value);

    if (productImage.value == "" || testeoImagen == null) {
      testeoImagen = false;
      return alert("Ingrese una imagen");
    }
    if (testeoImagen == false) {
      return alert("Ingrese una imagen valida");
    }
    /* fin de verificacion IMAGEN */

    if (productCategory.value == 0) {
      return alert("Seleccione una categoría");
    }

    if (productStock.value == 0) {
      return alert("Ingrese un stock");
    }
    if (productWeight.value == 0) {
      productWeight.value = 1;
    }
    if(productPrice.value == 0){
      return alert("Ingrese precio del producto");
    }
    if(productDiscount.value == 0){
      productDiscount.value = 0;
    }

    if (
      productName.value.length >= 5 &&
      productDescription.value.length >= 20 &&
      testeoImagen == true &&
      productCategory.value != 0 &&
      productStock.value != 0
    ) {
      return form.submit();
    }
  });
});
