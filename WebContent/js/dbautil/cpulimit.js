function initCpuLimitPage(client, vmName) {
	var lastSel = -1;
	
	$("#cpuResourceManager_cpuLimitGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getCPULimitDataForCPURManager/'
						+ client + "/" + vmName,
				datatype : "json",
				colNames : [ ' DB Name ', ' CPU Limit(%)' ],
				colModel : [ {
					name : 'dbName',
					index : 'dbName',
					width : 310,
					sortable : true,
					editable : false
				}, {
					name : 'cpuLimit',
					index : 'cpuLimit',
					width : 110,
					sortable : true,
					editable : true,
					editrules : {
						custom : true,
						custom_func : validateCpuLimit
					}
				}],

				rowNum : 5,
				rowList : [ 5, 10 ],
				// pager : '#cpuResourceManager_cpuLimitPager',
				paging : true,
				height : '150',
				width : 460,
				modal : true,
				jqModal : true,
				viewrecords : true,
				rownumbers : true,
				loadonce : true,
				gridview : true,
				shrinkToFit : false,
				reloadAfterSubmit : true,
				scroller : true,
				caption : "CPU Limit",

				editurl : 'clientArray',
				
				/*
				// Double click to edit and focus out/enter to save row data
				onSelectRow: function(id) { 
					if (id && id !== lastSel) {
						$("#cpuResourceManager_cpuLimitGrid").jqGrid('restoreRow',lastSel);
						lastSel = id; 
						} 
					},
				
				ondblClickRow : function(rowid, irow, icol, e) {
					$("#cpuResourceManager_cpuLimitGrid").jqGrid('editRow',
							rowid, true);
					$("input, select", e.target).focus().blur(
							function() {
								$("#cpuResourceManager_cpuLimitGrid").jqGrid(
										'saveRow', rowid);
							});
					return;
				}*/
				
				/*	
				// by default all rows are inline editable, but save row is having issues
 				loadComplete: function (rowId ) {
					debugger;
				    var $this = $(this), ids = $this.jqGrid('getDataIDs'), i, l = ids.length;
				    for (i = 0; i < l; i++) {
				        $this.jqGrid('editRow', ids[i], true);
				    }
				    
				    if (rowId && rowId !== lastSel) {
				    	$("#cpuResourceManager_cpuLimitGrid").jqGrid('saveRow', lastSel);
				        lastSel = rowId;
				    }
				    $("input, select", e.target).focus().blur(
							function() {
								$("#cpuResourceManager_cpuLimitGrid").jqGrid('saveRow', rowId);
					});
				    
				},
				 */
				
				onSelectRow : function(rowId, selected, e ) {
					debugger;
					$("#cpuResourceManager_cpuLimitGrid").jqGrid('editRow', rowId, { 
					    keys : true
					    });
					
					$("input, select", e.target).focus().blur(
							function() {
								$("#cpuResourceManager_cpuLimitGrid").jqGrid('saveRow', rowId);
					});
				}
					
			});
	
	function validateCpuLimit(value, colname) {

		if (isNaN(value)) {
			cpuLimitErrDialog1.dialog("open");
			$("#info_dialog").visible(false);
			return [false,""];
//            return [false, " Column '" + colname + "'\n expects only numeric input "];
		} else if (value > 100 || value < 0) {
			cpuLimitErrDialog2.dialog("open");
			$("#info_dialog").visible(false);
			return [false,""];
//			return [ false, " Column '" + colname + "'\n expects input from 0 to 100" ];
		}else if(value=="") {
			cpuLimitErrDialog3.dialog("open");
			$("#info_dialog").visible(false);
			return [false,""];
		} else {
			return [ true, "" ];
		}
		
	}

	cpuLimitErrDialog1 = $("#cpuRsrcManager_gridInlineEditErrDiv1").dialog({
		autoOpen : false,
		height : "auto",
		width : "auto",
		modal : true,
		buttons : {
			"Ok" : function() {
				cpuLimitErrDialog1.dialog("close");
			}
		},
		close : function() {
			cpuLimitErrDialog1.dialog("close");
		}
	});
	
	cpuLimitErrDialog2 = $("#cpuRsrcManager_gridInlineEditErrDiv2").dialog({
		autoOpen : false,
		height : "auto",
		width : "auto",
		modal : true,
		buttons : {
			"Ok" : function() {
				cpuLimitErrDialog2.dialog("close");
			}
		},
		close : function() {
			cpuLimitErrDialog2.dialog("close");
		}
	});
	
	cpuLimitErrDialog3 = $("#cpuRsrcManager_gridInlineEditErrDiv3").dialog({
		autoOpen : false,
		height : "auto",
		width : "auto",
		modal : true,
		buttons : {
			"Ok" : function() {
				cpuLimitErrDialog3.dialog("close");
			}
		},
		close : function() {
			cpuLimitErrDialog3.dialog("close");
		}
	});
	
	$("#cpuResourceManager_cpuLimitPager").css("width", "100%");
	$("#cpuResourceManager_cpuLimitPager_left").css("width", "20%");
	$("#cpuResourceManager_cpuLimitPager_right").css("width", "80%");
	
	// jQuery("#cpuResourceManager_cpuLimitGrid").jqGrid(
	// 'navGrid',
	// '#cpuResourceManager_cpuLimitPager',
	// {
	//
	// del : false,
	// add : false,
	// edit : false,
	// search : false,
	// refresh : false
	// // refreshtext : 'Refresh'
	// // beforeRefresh : function() {
	// // jQuery("#cpuResourceManager_cpuLimitGrid").setGridParam({
	// // datatype : 'json'
	// // });
	// // jQuery("#cpuResourceManager_cpuLimitGrid").trigger(
	// // "reloadGrid");
	// // },
	// });
	
}
