/* 
File: main.js
GUI Assignment: Update the dynamic multiplication table to use JQuery Validation plug-in
Jayendra Rathore, Jayendra_Rathore@student.uml.edu 
Date Created: June 18, 2023
Description: This is the js for the multiplcation table, it has the JQuery code that uses the validation plug-in and also handles valid forms to create a multiplication table
*/

// after document is ready the rules and messages get set up
$(document).ready(function() {

    // hold val for the start value and end value
    //let xS = parseInt($('#xStart').val()) || -50;
    //let yS = parseInt($('#yStart').val()) || -50;

    $('#myForm').validate({
        rules: {
            /*
            xStart: {
                required: true, // required field
                number: true, // requires a number
                range: [-50, 50] // sets range from -50 to 50, it's inclusive 
            },
            xEnd: {
                required: true,
                number: true,
                range: [xS, 50] // sets range from the xS to 50
            },
            yStart: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            yEnd: {
                required: true,
                number: true,
                range: [yS, 50]
            }
            */
        },
        messages: {
            /*
            // sets messages for corresponding errors in the input
            xStart: {
                required: 'Please enter a value for Horizontal Start Point',
                number: 'Please enter a valid number for Horizontal Start Point',
                range: "MUST be greater than or equal to -50 and lower than or equal to 50"
            },
            xEnd: {
                required: 'Please enter a value for Horizontal End Point',
                number: 'Please enter a valid number for Horizontal End Point',
                range: "The number for the Horizontal End Point must be larger than the Horizontal Start Point and less than or equal to 50" 
            },
            yStart: {
                required: 'Please enter a value for Vertical Start Point',
                number: 'Please enter a valid number for Vertical Start Point',
                range: "MUST be greater than or equal to -50 and lower than or equal to 50"
            },
            yEnd: {
                required: 'Please enter a value for Vertical End Point',
                number: 'Please enter a valid number for Vertical End Point',
                range: "The number for the Vertical End Point must be larger than the Vertical Start Point and less than or equal to 50" 
            }
            */
        }
    });

    // when xStart is input it will add rules to xEnd so that it knows what the current xStart val is 
    $('#xStart').on('input', function() {
        let xS2 = parseInt($('#xStart').val()) || -50;
        $('#xEnd').rules('add', {
            required: true,
            number: true,
            range: [xS2, 50],
            messages: {
                required: "MUST fill in",
                number: "MUST be a number input (ie. 4, 3.3, etc.)",
                range: "MUST be greater than or equal to the horizontal start point and less than or equal to 50"
            }
        });
        $('#yStart').rules('remove'); // disable validation for yStart
    });
      
    // when yStart is input it will add rules to xEnd so that it knows what the current yStart val is 
    $('#yStart').on('input', function() {
        let yS2 = parseInt($('#yStart').val()) || -50;
        $('#yEnd').rules('add', {
            required: true,
            number: true,
            range: [yS2, 50],
            messages: {
                required: "MUST fill in",
                number: "MUST be a number input (ie. 4, 3.3, etc.)",
                range: "MUST be greater than or equal to the horizontal start point and less than or equal to 50"
            }
        });
        $('#xStart').rules('remove'); // disable validation for yStart
    }).off('focusout');
    
    // adds rules for xStart
    $('#xStart').rules("add", {
        required: true,
        number: true,
        range: [-50, 50],
        messages: {
            required: "MUST fill in",
            number: "MUST be a number input (ie. 4, 3.3, etc.)",
            range: "MUST be greater than or equal to -50 and lower than or equal to 50"
        }
    });

    // adds rules for xEnd
    $('#xEnd').rules("add", {
        required: true,
        number: true,
        range: [-50, 50],
        messages: {
            required: "MUST fill in",
            number: "MUST be a number input (ie. 4, 3.3, etc.)",
            range: "The number for the Horizontal End Point must be larger than the Horizontal Start Point and less than or equal to 50"
        }
    });

    // adds rules for yStart
    $('#yStart').rules("add", {
        required: true,
        number: true,
        range: [-50, 50],
        messages: {
            required: "MUST fill in",
            number: "MUST be a number input (ie. 4, 3.3, etc.)",
            range: "MUST be greater than or equal to -50 and lower than or equal to 50",
        }
    });

    // adds rules for yEnd
    $('#yEnd').rules("add", {
        required: true,
        number: true,
        range: [-50, 50],
        messages: {
            required: "MUST fill in",
            number: "MUST be a number input (ie. 4, 3.3, etc.)",
            range: "The number for the Vertical End Point must be larger than the Vertical Start Point and less than or equal to 50"
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
            console.log('valid');
            createTable();
        } else {
            console.log("not valid");
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