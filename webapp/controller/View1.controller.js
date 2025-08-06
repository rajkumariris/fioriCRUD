sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("odatacrud.controller.View1", {
        onInit() {
            this.onReadAll();
        },
        onReadAll : function(){
          var oModel =  this.getOwnerComponent().getModel();
          var that = this;
          oModel.read("/Products", {
            success : function(odata){
                console.log(odata);
                  var jModel =  new sap.ui.model.json.JSONModel(odata);
                  that.getView().byId("idProducts").setModel(jModel);
            },
            error : function(oError){
                console.log(oError);
            }
          })
        },
        onReadFilter : function(){
            var oModel =  this.getOwnerComponent().getModel();
            var that = this;
            var oFilter = new sap.ui.model.Filter('Rating', 'EQ', '3');
            oModel.read("/Products", {
                filters : [oFilter],
                success: function(odata){
                    console.log(odata);
                      var jModel =  new sap.ui.model.json.JSONModel(odata);
                      that.getView().byId("idProducts").setModel(jModel);
                },
                error : function(oError){
                    console.log(oError);
                }
              })
        },

        onSorter : function(){
            var oModel = this.getOwnerComponent().getModel();
            var that = this;
            var oSorter = new sap.ui.model.Sorter('Price',true);
            oModel.read("/Products", {
                sorters : [oSorter],
                success: function(odata){
                    console.log(odata);
                      var jModel =  new sap.ui.model.json.JSONModel(odata);
                      that.getView().byId("idProducts").setModel(jModel);
                },
                error : function(oError){
                    console.log(oError);
                }
              })
        },

        onEdit: function(oEvent){
            var oModel = this.getOwnerComponent().getModel();
            var that = this;
            oModel.setUseBatch(false);
            if(oEvent.getSource().getText() === "Edit"){
                oEvent.getSource().setText("Submit");
                oEvent.getSource().getParent().getParent().getCells()[3].setEditable(true); 
            }
            else{
                oEvent.getSource().setText("Edit");
                oEvent.getSource().getParent().getParent().getCells()[3].setEditable(false);
                var oInput = oEvent.getSource().getParent().getParent().getCells()[3].getValue();
                var oId = oEvent.getSource().getBindingContext().getProperty("ID");
                console.log(oId);
                console.log(oInput);
                oModel.update("/Products("+oId+")", {Rating:oInput}, {success:function(odata){
                    console.log("sucess")
                        that.onReadAll();
                },
                    error : function(oError){
                        console.log(oError);
                    }})
                
            }
        },
        onDuplicate : function(oEvent){
            var that = this;
          var oModel =   this.getOwnerComponent().getModel();
          oModel.setUseBatch(false);
           var oDupliData = oEvent.getSource().getBindingContext().getObject();
           oDupliData.ID = 100+ oDupliData.ID;
           oModel.create("/Products", oDupliData, {success: function(odata){
                that.onReadAll();
           },
        error: function(oError){
            console.log(oError);
        }})
        }
    });
});