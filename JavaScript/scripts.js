
$(document).ready(function() {
    // Event listener for form submission
    $('#addSongForm').submit(function(event) {
        // Prevent default form submission
        event.preventDefault();

        // Get the values entered by the user
        var songTitle = $('#songTitle').val();
        var artist = $('#artist').val();

        // Create a new row element
        var newRow = $('<tr>');

        // Append <td> elements for song title and artist
        newRow.append('<td>' + songTitle + '</td>');
        newRow.append('<td>' + artist + '</td>');

        // Append a delete button
        newRow.append('<td><button class="btn btn-danger delete">Delete</button></td>');

        // Append the new row to the table body
        $('#songList').append(newRow);

        // Clear input fields after adding song
        $('#songTitle').val('');
        $('#artist').val('');
    });

    // Event listener for delete button click
    $('#songList').on('click', '.delete', function() {
        // Remove the row when delete button is clicked
        $(this).closest('tr').remove();
    });

    // Event listener for sorting
    $('.sortable').on('click', function() {
        var column = $(this).data('sort');
        var table = $(this).closest('table');
        var rows = table.find('tbody tr').get(); // Get all rows in tbody

        // Update arrow icons based on sorting direction
        $('.sortable i').removeClass('fa-sort-up fa-sort-down');
        var sortOrder = $(this).find('i').hasClass('fa-sort-up') ? 'desc' : 'asc';
        $(this).find('i').addClass(sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down');

        // Sort the rows based on the selected column
        rows.sort(compare(column, sortOrder));
    
        // Re-append sorted rows to the table
        $.each(rows, function(index, row) {
            table.find('tbody').append(row);
        });
    });

    /**
     * 
     * @param {string} index - The index of the column to sort by ('title' or 'artist')
     * @param {string} sortOrder - The sorting order ('asc' or 'desc')
     * @returns {function} - A comparison function for sorting rows based on the specified column and sorting order.
     */
    function compare(index, sortOrder) {
        return function(a, b) {
            var valA, valB;

            // Get the text values of the cells in the specified column and convert them to uppercase
            if (index === 'title') {
                valA = $(a).find('td:eq(0)').text().toUpperCase();
                valB = $(b).find('td:eq(0)').text().toUpperCase();
            } 
            else if (index === 'artist') {
                valA = $(a).find('td:eq(1)').text().toUpperCase();
                valB = $(b).find('td:eq(1)').text().toUpperCase();
            }
            
            // If the values are equal, return 0
            if (valA === valB) return 0;
            
            // Return -1 if valA should come before valB, 1 otherwise, based on the sorting order
            if (sortOrder === 'asc') {
                return valA < valB ? -1 : 1;
            } 
            else {
                return valA > valB ? -1 : 1;
            }
        };
    }

    // Event listener for form submission
    $('#contact-form').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        var formData = $(this).serialize();

        // Display submitted data in a modal
        $('#exampleModal .modal-body').text(formData);
        $('#exampleModal').modal('show');
    });

    // Scroll to top functionality
    $('.footer-link').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });
});