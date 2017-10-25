
function initDBChangePwdPage() {

	$("#dbChangePwdGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getDBChangePwdList',
				datatype : "json",
				colNames : [ ' Client ','Connect String ','Lock/Unlock ', ' Scheduled Time','DBO Password', 'BENDEV Password',
				             'Other User','Username','Password','Status','Requested By','Requested Date', 'Email Notification' ],

				colModel : [ {
					name : 'client',
					index : 'client',
					width : 150,
					editrules : {
						required : true
					},
					editable : true,
					edittype : "select",
					formoptions : {
						rowpos : 1,
						colpos : 1
					},
					editoptions : {
						width : 250,
						dataUrl : "rest/DBAUtilRestService/getClientList",
						buildSelect : function(data) {

							var response = jQuery
									.parseJSON(data);
							var s = '<select id="client" name="client">';
							var options = "<option value=''>Select</option>";
							for (var i = 0; i < response.length; i++) {
								options = options
										+ '<option value="'
										+ response[i] + '">'
										+ response[i]
										+ '</option>';
							}
							s = s + options + "</select>";

							return s;
						},

						dataInit : function(element) {

							$(element).attr('id', 'client');
							$(element).change(function() {
								debugger;
								var client = $(element).val();
								if (client) {
									loadSrcDBValues(client);
									loadEmailValues(client);
								}
							});
						}
					},
					fixed : true,
					sortable : true
				}, {
					name : 'dbConnectString', 
					index : 'dbConnectString',
					width : 150,
					editrules : {
						required : true
					},
					fixed : true,
					formoptions : {
						rowpos : 2,
						colpos : 1
					},
					editable : true,
					edittype : "select",
					editoptions : {
						dataInit : function(element) {
							var option = $("<option>");
							option.val('');
							option.text("Select");
							$(element).append(option);
							$(element).attr('id',
									'dbConnectString');
						}
					}
				}, {
					name : 'lockAccounts',
					index : 'lockAccounts',
					width : 150,
					fixed : true,
					formoptions : {
						rowpos : 3,
						colpos : 1
					},
					editable : true,
					edittype : "select",
					editrules : {
						required : true
					},
					editoptions : {
						value : ":Select;lock:Lock;unlock:UnLock",
						dataInit : function(element) {
									$(element).change(function() {
													var val = $(element).val();
													if(val== 'lock'){
														$('#dboPwd').val("");
														$('#dboPwd').prop("disabled",true);
														$('#otherUser').prop('checked', false);
														$('#otherUser').prop("disabled",true);
														$('#username').val("");
														$('#username').prop("disabled",true);
														$('#pwd').val("");
														$('#pwd').prop("disabled",true);
													} else {
														$('#dboPwd').prop("disabled",false);
														$('#otherUser').prop("disabled",false);
														$('#username').val("");
														$('#username').prop("disabled",true);
														$('#pwd').val("");
														$('#pwd').prop("disabled",true);
													}
												});
							}
						}
				}, {
					name : 'scheduledTime',
					index : 'scheduledTime',
					width : 150,
					editable : true,
					edittype : "text",
					editrules : {
						required : true
					},
					editoptions : {
						dataInit : function(element) {
							$(element).datetimepicker({
								dateFormat : 'yy-mm-dd',
								timeFormat : 'HH:mm',
								minDate : new Date(),
								autoSize : false,
								height : 35,
								width : 250,
								maxDate : "+5Y",
								showOn : 'focus'
							});
						}
					},
					formoptions : {
						rowpos : 4,
						colpos : 1
					}
				}, {
					name : 'dboPwd',
					index : 'dboPwd',
					hidden : true,
					width : 150,
					formoptions : {
						rowpos : 5,
						colpos : 1
					},
					editable : true,
					edittype : "text",
					editrules: {
						edithidden:true
					} 
				}, {
					name : 'bendevPwd',
					index : 'bendevPwd',
					hidden : true,
					width : 150,
					formoptions : {
						rowpos : 5,
						colpos : 2
					},
					editable : true,
					edittype : "text",
					
					editrules: {
						edithidden:true,
						required: true
					} 
				}, {
					name : 'otherUser',
					index : 'otherUser',
					width : 150,
					hidden : true,
					editable : true,
					edittype : "checkbox",
					editoptions : {
//						value : "Y:N",
//						defaultValue : 'N',
						dataInit : function(element) {
							$(element).change(function() {
								var val = $(element).val();
//								if(val== 'Y'){
								if($(this).prop("checked") == true) {
									$('#username').prop("disabled",false);
									$('#pwd').prop("disabled",false);
								} else {
									$('#username').val("");
									$('#username').prop("disabled",true);
									$('#pwd').val("");
									$('#pwd').prop("disabled",true);
								}
							});
						}
					},
					editrules: {
						edithidden:true
					},
					formoptions : {
						rowpos : 6,
						colpos : 1
					},
				}, {
					name : 'username',
					index : 'username',
					width : 150,
					formoptions : {
						rowpos : 7,
						colpos : 1
					},
					editable : true,
					edittype : "text",
				}, {
					name : 'pwd',
					index : 'pwd',
					hidden : true,
					width : 150,
					formoptions : {
						rowpos : 7,
						colpos : 2
					},
					editable : true,
					edittype : "text",
					editrules: {
						edithidden:true
					}
				}, {
					name : 'status',
					index : 'status',
					width : 150
				
				}, {
					name : 'pwdResetRequestedBy',
					index : 'pwdResetRequestedBy',
					width : 150
				}, {
					name : 'pwdResetRequestedDate',
					index : 'pwdResetRequestedDate',
					width : 150
				}, {
					name : 'email',
					index : 'email',
					width : 150,
					editrules : {
						required : true
					},
					editable : true,
					edittype : "textarea",
					editoptions : {
						rows : 2,
						cols : 30
					},
					formoptions : {
						rowpos : 8,
						colpos : 1
					}
				} ],
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				pager : '#dbChangePwdPager',
				paging : true,
				height : '225',
				width : $("#tabs-20").width(),
				modal : true,
				jqModal : true,
				loadonce : true,
				viewrecords : true,
				rownumbers : true,
				gridview : true,
				shrinkToFit : false,
				hoverrows : true,
				reloadAfterSubmit : true,
				scroller : true,
				caption : " DB Change Password ",
				ondblClickRow : function(rowId) {
					rowPopup($(this),rowId,[5,6,7,9],'y');
				}
			});
	jQuery("#dbChangePwdGrid")
			.jqGrid('navGrid', '#dbChangePwdPager', {
				edit : true,
				edittext : ' Edit ',
				add : true,
				addtext : ' Add ',
				del : false,
//				deltext : ' Delete ',
				search : false,
				refresh : true,
				refreshtext : 'Refresh',
				beforeRefresh : function() {
					jQuery("#dbChangePwdGrid").setGridParam({
						datatype : 'json'
					});
					jQuery("#dbChangePwdGrid").trigger("reloadGrid");
				},
			}, {
			// edit Analyze
				width : 1000,
				url : 'rest/DBAUtilRestService/updateDBChangePwd',
				modal : true,
				jqModal : true,
				reloadAfterSubmit : true,
				recreateForm : true,
				closeAfterEdit : true,
				viewPagerButtons : false,
				beforeShowForm : callBeforeShowFormForEdit,
				beforeSubmit : callBeforeSubmit,
				afterSubmit : callAfterSubmit
			}, {
			// add Analyze
				width : 1000,
				url : 'rest/DBAUtilRestService/updateDBChangePwd',
				modal : true,
				jqModal : true,
				reloadAfterSubmit : true,
				recreateForm : true,
				closeAfterAdd : true,
				beforeShowForm : callBeforeShowFormForAdd,
				beforeSubmit : callBeforeSubmit,
				afterSubmit : callAfterSubmit
			}, {
				// delete Analyze
			}, {
			// search options
			});	
	
	function callAfterSubmit(response, postdata) {

		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#dbChangePwdGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}
	
	function callBeforeShowFormForAdd(formid) {

		var connectStringEle = $('#dbConnectString');		
		connectStringEle.attr('name', 'dbConnectString');
		connectStringEle.prop("disabled", true);
		
		$('#otherUser').prop("disabled", true);
		$('#username').prop("disabled", true);
		$('#pwd').prop("disabled", true);
		
		$("#scheduledTime").datetimepicker('setTime', new Date());

	}
	
	function callBeforeShowFormForEdit(formid) {
		var myGrid = $('#dbChangePwdGrid');
		var selRowId = myGrid.jqGrid('getGridParam', 'selrow');
		var clientValue = myGrid.jqGrid('getCell', selRowId, 'client');
		var connectStringValue = myGrid.jqGrid('getCell', selRowId, 'dbConnectString');
		var lockAccountsValue = myGrid.jqGrid('getCell', selRowId, 'lockAccounts');
		
		loadSrcDBValues(clientValue, connectStringValue);
		
		$('#client').prop("disabled", true);
		$('#dbConnectString').prop("disabled", true);
		
		var scheduledTime=$("#scheduledTime").val()+"";
		if(new Date(scheduledTime) < new Date()) {
			$("#scheduledTime").datetimepicker('setTime',new Date());
			var d = new Date();
			currDate = d.getFullYear() + "-" +
			    ("00" + (d.getMonth() + 1)).slice(-2) + "-" + 
			    ("00" + d.getDate()).slice(-2) + " " + 
			    ("00" + d.getHours()).slice(-2) + ":" + 
			    ("00" + d.getMinutes()).slice(-2);
			$("#scheduledTime").val(currDate);
		}
			
		if(lockAccountsValue=='Y') {
			$("#lockAccounts").val('lock').change();
		}else {
			$("#lockAccounts").val('unlock').change();
		}
		
	}
	
	function callBeforeSubmit(response, postdata) {
		debugger;
		var lockAccountsEle=$('#lockAccounts').val();
		if (lockAccountsEle == "unlock") {
			if ($('#dboPwd').val() == "") {
				$("#reqfield").css("display", "inline");
				return [ false, 'DBO Password : Field is required' ]; // error			
			}
			
			if( $('#otherUser').prop("checked") == true) {
				if($('#username').val() == "") {
					$("#reqfield").css("display", "inline");
					return [ false, 'Username : Field is required' ]; // error					
				}
				if($('#pwd').val() == "") {
					$("#reqfield").css("display", "inline");
					return [ false, 'Password : Field is required' ]; // error					
				}
			}
		}
		return [true,'']; // no error
	}
	
	
	function loadEmailValues(client) {

		var urlVal = "rest/DBAUtilRestService/getEmailValueForClient/" + client;
		var emailEle = $('#email');
		emailEle.attr('name', 'email');
		emailEle.empty();
		$.ajax({
			url : urlVal
		}).done(function(response) {

			$('#email').val(response.email);
		});

	}

	function loadSrcDBValues(client, srcDBValue) {
		var srcDBNameEle = $('#dbConnectString');
		srcDBNameEle.attr('name', 'dbConnectString');
		srcDBNameEle.empty();
		if (!client) {
			var option = $("<option>");
			option.val('');
			option.text("Select");
			srcDBNameEle.append(option);

			srcDBNameEle.prop("disabled", true);

		} else {
			srcDBNameEle.prop("disabled", false);
			var urlVal = "rest/DBAUtilRestService/getClientDBList/" + client;

			$.ajax({
				url : urlVal
			}).done(function(data) {
				var selOption = $("<option>");
				selOption.val('');
				selOption.text("Select");
				srcDBNameEle.append(selOption);
				for (var i = 0; i < data.length; i++) {
					var option = $("<option>");
					if (srcDBValue) {
						if (data[i] == srcDBValue) {

							option.attr('selected', 'selected');
						}
					}
					option.val(data[i]);
					option.text(data[i]);
					srcDBNameEle.append(option);
				}
			});
		}
	}
}