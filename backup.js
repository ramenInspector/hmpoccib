var totalAmount = 0;
var change = 0;
var price;
var sal;
var clothingRectangles = []; // An array to store the rectangles
var rectangleColors = []; // An array to store the random colors
var lastPriceValue = ''; // Store the last price value
var lastSalValue = ''; // Store the last salary value

function calculateAmount(itemprice, monthlysalary) {
  // Calculate monthly earnings by multiplying weekly salary by 4
  return (monthlysalary * 4) / itemprice;
}

function centerElements() {
  // Center the price input element
  price.position(windowWidth / 2 - price.width / 2, windowHeight / 2 - 30);

  // Center the sal input element
  sal.position(windowWidth / 2 - sal.width / 2, windowHeight / 2 + 30);
}

function updateChange() {
  // Check if the price or salary values have changed
  if (price.value() !== lastPriceValue || sal.value() !== lastSalValue) {
    lastPriceValue = price.value();
    lastSalValue = sal.value();

    // Check if both inputs have values
    if (lastPriceValue !== '' && lastSalValue !== '') {
      totalAmount = calculateAmount(parseFloat(lastPriceValue), parseFloat(lastSalValue));
      change = (parseFloat(lastSalValue) * 4) - totalAmount;

      // Generate random colors only when values change
      generateRandomColors();
    }
  }
}

function generateRandomColors() {
  // Generate random bright colors and store them in the rectangleColors array
  rectangleColors = [];
  for (var i = 0; i < Math.floor(totalAmount); i++) {
    var colorValue = color(random(100, 255), random(100, 255), random(100, 255));
    rectangleColors.push(colorValue);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerElements();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create price input element
  price = createInput();
  price.center();
  price.size(30, 20);
  price.value(20);
  price.style('text-align', 'center');

  // Create sal input element
  sal = createInput();
  sal.center();
  sal.value(70);
  sal.size(30, 20);
  sal.style('text-align', 'center');

  centerElements();
}

function draw() {
  background(255);
  noStroke();
  textAlign(CENTER);
  textSize(25);
  text("How many pieces of clothing can I buy this month?", width / 2, 100);

  // Update the change value when necessary
  updateChange();

  textSize(15);
  text('Avg price per item:', width / 2, height / 2 - 40);
  text('Weekly earnings:', width / 2, height / 2 + 20); // Updated label to "Monthly earnings"

  // Display the result
  text('You can buy approximately ' + Math.floor(totalAmount) + ' pieces of clothing this month.', width / 2, height / 2 + 120);

  // Draw rectangles for each piece of clothing you can buy
  var rectSpacing = 10; // Adjust the spacing between rectangles
  var centerX = width / 2; // Calculate the center of the canvas
  var startY = height / 2 - 200; // Adjust the vertical position
  for (var i = 0; i < Math.floor(totalAmount); i++) {
    var xPos = centerX + (i - Math.floor(totalAmount) / 2) * (60 + rectSpacing); // Position relative to the center
    var yPos = startY;
    var rectWidth = 60;
    var rectHeight = 60;

    push()
    // Use the stored random colors for filling rectangles
    fill(rectangleColors[i]);

    clothingRectangles.push({ x: xPos, y: yPos, w: rectWidth, h: rectHeight });
    rect(xPos, yPos, rectWidth, rectHeight);
    pop()
  }

  if (change.toFixed(2) > 0) {
    text('You will have $' + change.toFixed(2) + ' left over after buying the clothing.', width / 2, height / 2 + 150);
  } else if (change.toFixed(2) == 0) {
    text('You will not have any change.', width / 2, height / 2 + 150);
  }
}
