export const createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    const scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Create the GUI
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // Create a stack panel to hold the controls vertically
    const stackPanel = new BABYLON.GUI.StackPanel();
    stackPanel.width = "95%";
    stackPanel.left = "3%";
    stackPanel.top = "37%"
    stackPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    stackPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(stackPanel);

    // Create the text block for the integer number display
    const textBlockInteger = new BABYLON.GUI.TextBlock();
    textBlockInteger.textHorizontalAlignment = BABYLON.GUI.TextBlock.HORIZONTAL_ALIGNMENT_LEFT;
    textBlockInteger.text = "0";
    textBlockInteger.color = "white";
    textBlockInteger.fontSize = 24;
    textBlockInteger.height = "50px";
    stackPanel.addControl(textBlockInteger);

    // Create the horizontal slider GUI for the integer number switch
    const sliderInteger = new BABYLON.GUI.Slider();
    sliderInteger.thumbColor = "blue";
    sliderInteger.minimum = 0;
    sliderInteger.maximum = 100;
    sliderInteger.value = 0;
    sliderInteger.height = "20px";
    sliderInteger.width = "95%";
    sliderInteger.isVertical = false; // Ensure horizontal
    sliderInteger.isPointerBlocker = true; // Ensure the slider captures pointer (mouse/touch) events
    stackPanel.addControl(sliderInteger);

    // Update the text block when slider value changes the integer number
    sliderInteger.onValueChangedObservable.add(function (value) {
        let textNumber = Math.round(value)
        console.log(textNumber + " is " + typeof textNumber);
        textBlockInteger.text = textNumber.toString(); // Round to nearest integer for display
    });

    // Create the text block for the decimal number display
    const textBlockDecimal = new BABYLON.GUI.TextBlock();
    textBlockDecimal.textHorizontalAlignment = BABYLON.GUI.TextBlock.HORIZONTAL_ALIGNMENT_LEFT;
    textBlockDecimal.text = "1.00";
    textBlockDecimal.color = "white";
    textBlockDecimal.fontSize = 24;
    textBlockDecimal.height = "50px";
    stackPanel.addControl(textBlockDecimal);

    // Create the horizontal slider GUI for the decimal number switch
    const sliderDecimal = new BABYLON.GUI.Slider();
    sliderDecimal.thumbColor = "blue";
    sliderDecimal.minimum = 0;
    sliderDecimal.maximum = 1;
    sliderDecimal.value = 0;
    sliderDecimal.height = "20px";
    sliderDecimal.width = "95%";
    sliderDecimal.isVertical = false; // Ensure horizontal
    sliderDecimal.isPointerBlocker = true; // Ensure the slider captures pointer (mouse/touch) events
    stackPanel.addControl(sliderDecimal);

    // Update the text block when slider value changes the decimal number
    sliderDecimal.onValueChangedObservable.add(function (value) {
        // 'value' is a number between 0 (left) and 1 (right), based on our minimum/maximum.
        // We need to map this simple 0-to-1 range to the client's desired range of 1.5 down to 0.5.
        // The formula for this mapping is:
        // New Value = Max Range + (Slider Value * (Min Range - Max Range))
        // New Value = 1.5 + (value * (0.5 - 1.5))
        // New Value = 1.5 + (value * -1)
        const mappedValue = 1.5 + (value * -1);
        // Print the variable mappedValue at the console
        console.log(mappedValue + " is " + typeof mappedValue);
        // Format the number to two decimal places for display in the text box.
        textBlockDecimal.text = mappedValue.toFixed(2);
    });

    return scene;
};
