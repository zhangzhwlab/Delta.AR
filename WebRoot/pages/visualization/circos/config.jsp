
<div id="dialog_config">
<div class="header_content" >
	
	<p>Maximum track number:&nbsp;<input type="text" value="8" id="tracknumberid" style="width:80px;" /></p>
	
</div>
<div class="header_content"><input type="button" value="Submit" onClick="changeConfig()"></div>
</div>
<script type="text/javascript" language="javascript">
	function loadConfigParam(){
		var canvas_size = window.parent.config_getConfig();

		$("#tracknumberid").val(canvas_size[0]);
	
	}
	
	function changeConfig(){

		var e = $("#tracknumberid").val();
		window.parent.modify_config_setConfig(e);
		$("#dialog_config").dialog("close");
		
	}
</script>

