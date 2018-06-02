function deleteCourse(id){
    $.ajax({
        url: '/courses/' + id,
        type: 'DELETE',
        // serialize() encodes a set of form elements as a string
        success: function(result){ 
            window.location.reload(true);
        }
    })
};