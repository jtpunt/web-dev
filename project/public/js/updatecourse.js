function updateCourse(id){
    $.ajax({
        url: '/courses/' + id,
        type: 'PUT',
        data: $('#update-course').serialize(), // #update-person: this is our form. 
        // serialize() encodes a set of form elements as a string
        success: function(result){ 
            window.location.replace("./"); // navigate back to the previous page
        }
    })
};