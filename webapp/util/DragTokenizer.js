
sap.ui.define([
	"sap/m/Tokenizer"
], function (Tokenizer) {
	"use strict";
	return Tokenizer.extend("odatacrud.util.DragTokenizer", {
		metadata: {
			aggregations : {
		      tokens : { type: 'sap.ui.core.Control', multiple : true, dnd : {draggable: true, droppable: true, layout: "Horizontal" } },
		      header : {type : "sap.ui.core.Control", multiple : false, dnd : true }
		    }
		},
		renderer: {}
	});
});