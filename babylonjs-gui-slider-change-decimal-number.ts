class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
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
        stackPanel.width = "200px";
        stackPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        stackPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        advancedTexture.addControl(stackPanel);

        // Create the text block (displaying the number)
        const valueText = new BABYLON.GUI.TextBlock();
        valueText.text = "1.00";
        valueText.color = "white";
        valueText.fontSize = 24;
        valueText.height = "50px";
        stackPanel.addControl(valueText);

        // Create the horizontal slider
        const slider = new BABYLON.GUI.Slider();
        slider.thumbColor = "blue";
        slider.minimum = 0;
        slider.maximum = 1;
        slider.value = 0;
        slider.height = "20px";
        slider.width = "200px";
        slider.isVertical = false; // Ensure horizontal
        slider.isPointerBlocker = true; // Ensure the slider captures pointer (mouse/touch) events
        stackPanel.addControl(slider);
        // Update the text block when slider value changes
        slider.onValueChangedObservable.add(function (value) {
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
            valueText.text = mappedValue.toFixed(2);
        });

        return scene;
    }
}
export { Playground };
