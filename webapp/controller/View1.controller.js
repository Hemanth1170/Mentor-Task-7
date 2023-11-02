

sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
  "use strict";

  return Controller.extend("com.mindset.project7.controller.View1", {
    onInit: function () {
      var oModel = new JSONModel();
      oModel.loadData("/model/data.json");

      // Attach a request completed handler to ensure the data is loaded before binding
      oModel.attachRequestCompleted(function () {
        this.getView().setModel(oModel);
        oModel.setProperty("/filteredProducts", oModel.getProperty("/products"));
      }.bind(this));
      
    },

    onProductSelect: function (oEvent) {
      var oItem = oEvent.getSource().getBindingContext().getObject();
      oItem.selected = oEvent.getParameter("selected");
    },

    onAddToCartPress: function () {
      var oModel = this.getView().getModel();
      var aProducts = oModel.getProperty("/products");
      var aCart = oModel.getProperty("/cart");

      // Add selected products to the cart
      var selectedProducts = aProducts.filter(function (product) {      // used Filter Function
        return product.selected;
      });
      if (selectedProducts.length === 0) {
        alert(" Select Atleast one item");
      }
      else {
        aCart = aCart.concat(selectedProducts);
        oModel.setProperty("/cart", aCart);

        // Deselect selected products
        aProducts.forEach(function (product) {
          product.selected = false;
        });

        oModel.refresh();
      }

    },

    onSearch: function (oEvent) {
      var oModel = this.getView().getModel();
      var sSearchValue = oEvent.getParameter("query");
      var aProducts = oModel.getProperty("/products");

      // Filter products based on the search value
      var filteredProducts = aProducts.filter(function (product) {
        return product.name.toLowerCase().includes(sSearchValue.toLowerCase());    // used String Function
      });

      oModel.setProperty("/filteredProducts", filteredProducts);
    }
  });
});
