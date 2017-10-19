// Start Document Ready
$(document).ready(function(){
	console.log("Sanity Check!")

	$('.remove-workspaceItem').on('click', function(event){
		event.preventDefault();
		removeWorkspaceItem(this);
	});
});
// End Doctument Ready 

function removeWorkspaceItem(clickedItem){
	console.log('Rmove clicked');
	console.log(clickedItem);
	let workspaceItem_id = $(clickedItem).attr('_id');
	console.log(workspaceItem_id);
}