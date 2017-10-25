function showReportOFBenLoadSchemaSizeGrid() {
	debugger;
	$("#reportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportOfBenloadSchemaSize',
				datatype : "json",
				colNames : [ '  Client ', ' Oracle SID', ' Connect String',
						' Benload Size(gb)' ],
				colModel : [ {
					name : 'client',
					index : 'client',
					shrinkToFit : false,
					width : 150
				}, {
					name : 'oracleSID',
					index : 'oracleSID',
					width : 170,
					shrinkToFit : false
				}, {
					name : 'connectString',
					index : 'connectString',
					shrinkToFit : false,
					width : 170

				}, {
					name : 'schemaSize',
					index : 'schemaSize',
					shrinkToFit : false,
					sorttype : 'integer',
					align : 'center',
					width : 190

				} ],
				rowNum : 15,
				pager : '#reportPager',
				rowList : [ 10, 15, 20, 25, 30 ],
				paging : true,
				height : '375',
				width : '980',
				modal : true,
				jqModal : true,
				viewrecords : true,
				rownumbers : true,
				gridview : true,
				shrinkToFit : false,
				hoverrows : true,
				reloadAfterSubmit : true,
				scroller : true,
				loadonce : true,
				caption : " Report Of Benload  Schema Size "
			});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search" label
		// next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			exportDataToExcelByReflect("reportGrid", "Report Of Benload Schema Size");

		},
		position : "last"
	});
}

function exportDataToExcelByReflect(theGrid, excelFileName) {
	var fieldInfoMap = {};
//	fieldInfoMap['Client'] = 'client';
//	fieldInfoMap['VM Name'] = 'vmName';
//	fieldInfoMap['Oracle SID'] = 'oracleSID';
//	fieldInfoMap['Connect String'] = 'connectString';

	var content = {};
	content.dispFieldInfoMap = fieldInfoMap;
	content.gridName = excelFileName;

	var jsonStr = JSON.stringify(content);
	// alert('data = ' + jsonStr);
	$('#gridContent').val(jsonStr);
	document.fileServlet2.submit();
}
function exportDataToExcel(theGrid, excelFileName) {
	debugger;
	var table = theGrid;
	mya = $("#" + table).getDataIDs(); // Get All IDs
	var data = $("#" + table).getRowData(mya[0]); // Get First row to get the
	// labels
	var colNames = new Array();
	var ii = 0;
	for ( var i in data) {
		colNames[ii++] = i;
	} // capture col names

	var content = {};

	var colsArray = [];
	for (var k = 0; k < colNames.length; k++) {
		colsArray.push(colNames[k]);
	}
	content.cols = colsArray;

	for (i = 0; i < mya.length; i++) {
		var rowContent = {};
		data = $("#" + table).getRowData(mya[i]); // get each row
		for (var j = 0; j < colNames.length; j++) {
			rowContent[colsArray[j]] = data[colNames[j]]; // output each Row
			// as
			// tab delimited
		}
		if (!content.data) {
			content.data = new Array();
		}
		content.data.push(rowContent);

	}
	content.gridName = excelFileName;
	var jsonStr = JSON.stringify(content);
	// alert('data = ' + jsonStr);
	$('#gridContent').val(jsonStr);
	$('#fileName').val('employees');
	document.fileServlet2.submit();
}

function showReportOFBenDevSchemaSizeGrid() {
	debugger;
	$("#reportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportOfBendevSchemaSize',
				datatype : "json",
				colNames : [ '  Client ', ' Oracle SID', ' Connect String',
						' Bendev Size(gb)' ],
				colModel : [ {
					name : 'client',
					index : 'client',
					shrinkToFit : false,
					width : 150
				}, {
					name : 'oracleSID',
					index : 'oracleSID',
					width : 170,
					shrinkToFit : false
				}, {
					name : 'connectString',
					index : 'connectString',
					shrinkToFit : false,
					width : 170

				}, {
					name : 'schemaSize',
					index : 'schemaSize',
					align : 'center',
					shrinkToFit : false,
					sorttype : 'integer',
					width : 190

				} ],
				rowNum : 15,
				pager : '#reportPager',
				rowList : [ 10, 15, 20, 25, 30 ],
				paging : true,
				height : '375',
				width : '980',
				modal : true,
				jqModal : true,
				viewrecords : true,
				rownumbers : true,
				gridview : true,
				shrinkToFit : false,
				hoverrows : true,
				reloadAfterSubmit : true,
				scroller : true,
				loadonce : true,
				caption : " Report Of Bendev Schema Size "
			});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search" label
		// next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			exportDataToExcelByReflect("reportGrid", "Report Of Bendev Schema Size");

		},
		position : "last"
	});
}
