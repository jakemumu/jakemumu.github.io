
var num_columns = 10
var num_rows = 10

var ellipse_width = 2

let positions = []
let x_phases = []
let y_phases = []

let x_sine_outputs = []
let y_sine_outputs = []

let x_sine_freq = []
let y_sine_freq = []

let canvas_width;
let canvas_height;

function windowResized() {

    var parent_div = select('#homepage_animation');

    canvas_width = parent_div.elt.offsetWidth
    canvas_height = screen.height * 0.6
    
    resizeCanvas(canvas_width, canvas_height);
}

function setup() {

    var canvas = createCanvas(0, 0);
    canvas.parent('homepage_animation')

    windowResized();

    background(255);

    var column_offset = canvas_width / num_columns;
    var row_offset = canvas_height / num_rows;

    for (var column = 0; column < num_columns; column++) {

        x_phases_column_data = []
        y_phases_column_data = []
        x_sine_outputs_column_data = []
        y_sine_outputs_column_data = []
        x_sine_freq_column_data = []
        y_sine_freq_column_data = []

        positions_column_data = []

        for (var row = 0; row < num_rows; row++) {

            x_phases_column_data.push(0)
            y_phases_column_data.push(0)
            x_sine_outputs_column_data.push(0)
            y_sine_outputs_column_data.push(0)

            positions_column_data.push(createVector(((column_offset / 2.0) + column * column_offset),
                                                    ((row_offset / 2.0) + row * row_offset)))

            x_sine_freq_column_data.push(map(random(), 0, 1, 0.005, 0.02))
            y_sine_freq_column_data.push(map(random(), 0, 1, 0.005, 0.02))

        }

        x_phases.push(x_phases_column_data)
        y_phases.push(y_phases_column_data)
    
        x_sine_outputs.push(x_sine_outputs_column_data)
        y_sine_outputs.push(y_sine_outputs_column_data)
    
        x_sine_freq.push(x_sine_freq_column_data)
        y_sine_freq.push(y_sine_freq_column_data)

        positions.push(positions_column_data)
    }
  }
  
function draw() {
    
    update()

    background(255, 255, 255, 2)
    fill(0)
    stroke(0);

    var column_offset = canvas_width / num_columns;
    var row_offset = canvas_height / num_rows;
    
    for (var column = 0; column < num_columns; column++) {
        for(var row = 0; row < num_rows; row++) {
            
            var xPos = ((column_offset / 2.0) + column * column_offset);
            var yPos = ((row_offset / 2.0) + row * row_offset);

            xPos += (x_sine_outputs[column][row] * (column_offset/2.0)) * 0.95;
            yPos += (y_sine_outputs[column][row] * (row_offset/2.0))  * 0.95;

            strokeWeight(2);

            line(positions[column][row].x, 
                positions[column][row].y, 
                xPos, 
                yPos);

            positions[column][row].x = xPos
            positions[column][row].y = yPos

            // ellipse(xPos,
            //         yPos,
            //         ellipse_width,
            //         ellipse_width);
            
        }
    }
}

function update() {

    for (var column = 0; column < num_columns; column++) {
        for (var row = 0; row < num_rows; row++) {

            var current_x_phase = x_phases[column][row];
            var x_sine_output = Math.sin(current_x_phase * 2 * Math.PI);

            current_x_phase += x_sine_freq[column][row];
            
            if (current_x_phase > 1) {
                current_x_phase -= 1;
            }
            
            x_phases[column][row] = current_x_phase;
            x_sine_outputs[column][row] = x_sine_output;
            
            
            var current_y_phase = y_phases[column][row];
            var y_sine_output = Math.sin(current_y_phase * 2 * Math.PI);
            
            current_y_phase += y_sine_freq[column][row];
            
            if (current_y_phase > 1) {
                current_y_phase -= 1;
            }
            
            y_phases[column][row] = current_y_phase;
            y_sine_outputs[column][row] = y_sine_output;

        }
    }

}