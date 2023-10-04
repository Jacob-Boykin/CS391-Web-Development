function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': 'c505061fabac423ba15709a84f61f3c4'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            for (i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
            $('#searchResults').dialog();
        })
        .fail(function () {
            alert('error');
        });
}

// Define a function to handle the click event on the search button
function handleSearchButtonClick() {
    apiSearch(); // Call the apiSearch function
}

// Add a click event listener to the search button
document.getElementById("searchButton").addEventListener("click", handleSearchButtonClick);


let isOriginalImage = true;
function changeBackgroundImage() {
    if (isOriginalImage) {
        document.body.style.backgroundImage = "url(/Images/Bored-2.jpg)"; // Set the new background image
    } else {
        document.body.style.backgroundImage = "url(/Images/Bored-1.jpg)"; // Set the original background image
    }

    // Toggle the state of the variable
    isOriginalImage = !isOriginalImage;
}
// Add a click event listener to the search engine name
document.getElementById("searchEngineName").addEventListener("click", changeBackgroundImage);


function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Function to display the current time in a dialog
function displayCurrentTime() {
    const currentTime = getCurrentTime();

    // Set the "time" div content
    $('#time').text("Current Time: " + currentTime);

    // Create a jQueryUI dialog
    $('#time').dialog({
        title: 'Current Time',
        modal: true,
        width: 'auto',
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });
}

// Add a click event listener to the "Display Current Time" button
document.getElementById("timeButton").addEventListener("click", displayCurrentTime);

// Function to get the current time in HH:MM format
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

let data = null;

document.getElementById("luckyButton").addEventListener("click", function () {
    // Check if the search results are available
    if (data && data.webPages && data.webPages.value && data.webPages.value.length > 0) {
        // Get the URL of the first search result
        const firstResultUrl = data.webPages.value[0].url;

        // Redirect the user to the first result URL
        window.location.href = firstResultUrl;
    } else {
        // Handle the case where there are no search results or data is not available
        alert("No search results available.");
    }
});