// Start Document Ready
$(document).ready(function(){
	console.log("Sanity Check!")

	$('.remove-workspaceItem').on('click', function(event){
		event.preventDefault();
		removeWorkspaceItem(this);
	});

	$('#software-search').on('keydown',function(event){
		updateSearchBox(this);
	})

	$('#search-dropdown').on('click','.search-result', function(event){
		event.preventDefault();
		populateSearchField(this);
	})
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

function updateSearchBox(formUpdated){
	$.ajax({
		url: `/software/search/${$(formUpdated).val()}`,
		method: 'GET',
		success: softwareSearchSuccess,
		error: softwareSearchError
	})
}

function softwareSearchSuccess(json){
	console.log(json);
	$('#search-dropdown').empty();
	json.forEach(function(result){
		let searchItem = `<li><a class='search-result' _id='${result._id}'>${result.name}</a></li>`;
		$('#search-dropdown').append(searchItem)
	})
}

function softwareSearchError(){
	console.log('Software search failed'); 
}

function populateSearchField(clickedResult){
	$('#software-search').val($(clickedResult).text());
}