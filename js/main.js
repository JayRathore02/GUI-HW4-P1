/* 
File: main.js
GUI Assignment: Update the dynamic multiplication table to use JQuery Validation plug-in
Jayendra Rathore, Jayendra_Rathore@student.uml.edu 
Date Created: June 18, 2023
Description: This is the js for the multiplcation table, it has the JQuery code that uses the validation plug-in and also handles valid forms to create a multiplication table
*/


// after document is ready I can 
$(document).ready(function() {
    // added method called "greater than or equal to" to compare the lower bound of the x axis or y axis
    $.validator.addMethod("greaterTOET", function (value, element, param) {
        let $lowerBound = $(param);
        if (this.settings.onfocusout) {
            $lowerBound.off(".validate-greaterTOET").on("blur.validate-greaterTOET", function() {
                $(element).valid();
            });
        }
        return parseInt(value) >= parseInt($lowerBound.val());
    }, "Max must be greater than min");
    
    $('#myForm').validate({
        rules: {
            xStart: {
                required: true, // required field
                number: true, // requires a number
                range: [-50, 50] // sets range from -50 to 50, it's inclusive  
            },
            xEnd: {
                required: true, // required field
                number: true, // requires a number
                range: [-50, 50], // sets range from -50 to 50, it's inclusive 
                greaterTOET: '#xStart'
            },
            yStart: {
                required: true, // required field
                number: true, // requires a number
                range: [-50, 50] // sets range from -50 to 50, it's inclusive 
            },
            yEnd: {
                required: true, // required field
                number: true, // requires a number
                range: [-50, 50], // sets range from -50 to 50, it's inclusive 
                greaterTOET: '#yStart'
            }
        },
        messages: {
            // messages for each wrong input based on the rules above
            xStart: {
                required: "MUST fill in",
                number: "MUST be a number input (ie. 4, 3.3, etc.)",
                range: "MUST be greater than or equal to -50 and lower than or equal to 50" 
            },
            xEnd: {
                required: "MUST fill in",
                number: "MUST be a number input (ie. 4, 3.3, etc.)",
                range: "MUST be greater than or equal to -50 and lower than or equal to 50",
                greaterTOET: "MUST be larger than or equal the horizontal start val"
            },
            yStart: {
                required: "MUST fill in",
                number: "MUST be a number input (ie. 4, 3.3, etc.)",
                range: "MUST be greater than or equal to -50 and lower than or equal to 50"
            },
            yEnd: {
                required: "MUST fill in",
                number: "MUST be a number input (ie. 4, 3.3, etc.)",
                range: "MUST be greater than or equal to -50 and lower than or equal to 50",
                greaterTOET: "MUST be larger than or equal the vertical start val"
            }
        }
    });
    
    
});

// function that checks if the form is valid
$(document).ready(function() {
    // on the click of the form button this function starts
    $('#myForm').on('submit', function(event) {
        event.preventDefault();

        // checks if all input fields are valid
        if ($('#xStart').valid() && $('#xEnd').valid() && $('#yStart').valid() && $('#yEnd').valid()) {
            console.log($('#xStart').valid() + ' ' + $('#xEnd').valid() + ' ' + $('#yStart').valid() + ' ' + $('#yEnd').valid());
            createTable();
        } else {
            console.log($('#xStart').valid() + ' ' + $('#xEnd').valid() + ' ' + $('#yStart').valid() + ' ' + $('#yEnd').valid());
        }
        
    });
});

// function called to create a table if the input fields are valids
function createTable() {
    // sets variables to the integer values of the input fields
    let xStartVal = parseInt($('#xStart').val());
    let xEndVal = parseInt($('#xEnd').val());
    let yStartVal = parseInt($('#yStart').val());
    let yEndVal = parseInt($('#yEnd').val());

    // empties the table so if the button is pressed again the previous table is no longer shown
    $('#multTable').empty();

    // sets amount of columns and rows I need, also I add 2 to be inclusive of the start and end vals
    let cols = xEndVal - xStartVal + 2;
    let rows = yEndVal - yStartVal + 2;

    // arrays for the x values and y values, both first start with start values
    const xArr = [xStartVal];
    const yArr = [yStartVal];

    // populates arrays
    for (let i = xStartVal + 1; i <= xEndVal; i++) {
        xArr.push(i);
    }
    for (let i = yStartVal + 1; i <= yEndVal; i++) {
        yArr.push(i);
    }

    const table = $('#multTable');
    for (let i = 0; i < rows; i++) {
        const row = $('<tr></tr>'); // adds table row variable
        for (let j = 0; j < cols; j++) {
            let tElement = 0;

            if (i === 0 && j === 0) {
                tElement = ''; // if it's the very first element the content will be blank (top left of table)
            } else if (j === 0) {
                tElement = yArr[i - 1];  // puts down values of first row
            } else if (i === 0) {
                tElement = xArr[j - 1];  // puts down values of the first column
            } else {
                tElement = xArr[j - 1] * yArr[i - 1];  // puts down values of products
            }

            row.append($('<td></tr>').text(tElement));
        }
        table.append(row);
    }
} 