/*$(document).ready(
		function() {
			vmCatalogDialog = $("#vmCatalogDiv").dialog({
				autoOpen : false,
				height : '600',
				width : $("#tabs-2").width()+40,
				modal : true,
				scroller : true,
				resize: function() {
					var outerwidth = $('#vmCatalogDiv').width()-10;
					var outerheight= $('#vmCatalogDiv').height()-225;
					$('#VMCatalogForDBAGrid').setGridWidth(outerwidth);
					$('#VMCatalogForDBAGrid').setGridHeight(outerheight);
				},
				close : function() {
					vmCatalogDialog.dialog("close");
				}
			});

			dbCatalogDialog = $("#dbCatalogDiv").dialog({
				autoOpen : false,
				height : '600',
				width : $("#tabs-2").width()+40,
				modal : true,
				scroller : true,
				resize: function() {
					var outerwidth = $('#dbCatalogDiv').width()-10;
					var outerheight= $('#dbCatalogDiv').height()-225;
					$('#DBCatalogForDBAGrid').setGridWidth(outerwidth);
					$('#DBCatalogForDBAGrid').setGridHeight(outerheight);
				},				
				close : function() {
					dbCatalogDialog.dialog("close");
				}
			});

			appCatalogDialog = $("#appCatalogDiv").dialog({
				autoOpen : false,
				height : '600',
				width : $("#tabs-2").width()+40,
				modal : true,
				scroller : true,
				resize: function() {
					var outerwidth = $('#appCatalogDiv').width()-10;
					var outerheight= $('#appCatalogDiv').height()-225;
					$('#APPCatalogGrid').setGridWidth(outerwidth);
					$('#APPCatalogGrid').setGridHeight(outerheight);
				},		
				close : function() {
					appCatalogDialog.dialog("close");
				}
			});

});*/

$(document).ready(
		function() {
			
			$("#vmCatalog").click(
					function() {
						$( "#tabs" ).tabs( "option", "active",10 );
					});

			$("#dbCatalog").click(
					function() {
						$( "#tabs" ).tabs( "option", "active",11 );
					});

			$("#appCatalog").click(
					function() {
						$( "#tabs" ).tabs( "option", "active",12 );
					});
});
