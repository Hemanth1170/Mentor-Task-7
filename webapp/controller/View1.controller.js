sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
  "use strict";

  return Controller.extend("com.mindset.project7.controller.View1", {
      onInit: function () {
          var oModel = new JSONModel();
          oModel.attachRequestCompleted(function () {
              this.getView().setModel(oModel);
              oModel.setProperty("/filteredProducts", oModel.getProperty("/products"));
          }.bind(this));
          oModel.loadData("/model/data.json");
      },

      onAddToCartPress: function () {
          var oModel = this.getView().getModel();
          var aProducts = oModel.getProperty("/products");
          var aCart = oModel.getProperty("/cart");

          var selectedProducts = aProducts.filter(function (product) {
              return product.selected;
          });

          if (selectedProducts.length === 0) {
              alert("Select at least one item");
          } else {
              aCart = aCart.concat(selectedProducts);
              oModel.setProperty("/cart", aCart);

              aProducts.forEach(function (product) {
                  product.selected = false;
              });

              oModel.refresh();
          }
      },

      onSearch: function (oEvent) {
          var oModel = this.getView().getModel();
          var sSearchValue = oEvent.getParameters().newValue;
          var aProducts = oModel.getProperty("/products");

          var filteredProducts = aProducts.filter(function (product) {
              return product.name.toLowerCase().includes(sSearchValue.toLowerCase());
          });

          oModel.setProperty("/filteredProducts", filteredProducts);
      }
  });
});
