// Start Document Ready
$(document).ready(function(){
	console.log("Sanity Check!")

	$('.remove-workspaceItem').on('click', function(event){
		console.log('remove clicked');
		event.preventDefault();
		removeWorkspaceItem(this);
	});
});
// End Doctument Ready 

function removeWorkspaceItem(clickedItem){
	let workspaceItem_id = $(clickedItem).attr('_id');

	$.ajax({
		url: `/workspaceItems/${workspaceItem_id}`,
		method: 'DELETE',
		success: workspaceItemDeleteSuccess,
		error: workspaceItemDeleteError
	});
}

function workspaceItemDeleteSuccess(json){
	console.log(json);
	$(`li[_id="${json._id}"]`).remove();
}

function workspaceItemDeleteError(){
	console.log("Delete error!");
}