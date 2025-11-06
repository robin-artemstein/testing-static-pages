// This function creates the main scene for our Babylon.js application.
// The Playground automatically calls this 'createScene' function.
class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // 1. Setup the basics of our 3D world.
        const scene = new BABYLON.Scene(engine);

        // Add a basic camera so we can see things.
        // The last '1' is the radius from the center of the scene.
        const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 1, new BABYLON.Vector3(0, 0, 0), scene);
        camera.setTarget(BABYLON.Vector3.Zero());

        // This makes the camera respond to mouse/touch input.
        camera.attachControl(canvas, true);

        // Add some light so our 3D objects aren't completely dark (though we don't have any in this specific example).
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        // 2. Setup the Graphical User Interface (GUI) on top of the canvas.
        // This is like an invisible, flat panel that sits on top of our 3D world.
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui");

        // Create a container to hold our slider and text box together.
        const panel = new BABYLON.GUI.StackPanel();
        panel.width = "400px"; // Make the panel a fixed width.
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER; // Center it vertically.
        advancedTexture.addControl(panel);

        // 3. Create the Text Box GUI element.
        const valueText = new BABYLON.GUI.TextBlock();
        valueText.text = "1.00"; // Set an initial display value.
        valueText.height = "50px";
        valueText.color = "white";
        valueText.fontSize = 24;
        panel.addControl(valueText); // Add the text box to our panel.

        // 4. Create the Horizontal Slider GUI element.
        const slider = new BABYLON.GUI.Slider();
        slider.minimum = 0; // The left-most position of the slider.
        slider.maximum = 1; // The right-most position of the slider.
        slider.value = 0;   // Start the thumb position at the far left (minimum).
        slider.height = "20px";
        slider.width = "200px";
        slider.thumbWidth = 10; // Make the thumb a little chunkier.
        slider.color = "green";
        slider.background = "grey";
        panel.addControl(slider); // Add the slider to our panel.

        // 5. Define the function to run every time the slider is moved.
        slider.onValueChangedObservable.add(function (value) {
            // 'value' is a number between 0 (left) and 1 (right), based on our minimum/maximum.

            // We need to map this simple 0-to-1 range to the client's desired range of 1.5 down to 0.5.
            // The formula for this mapping is:
            // New Value = Max Range + (Slider Value * (Min Range - Max Range))
            // New Value = 1.5 + (value * (0.5 - 1.5))
            // New Value = 1.5 + (value * -1)

            const mappedValue = 1.5 + (value * -1);

            // Format the number to two decimal places for display in the text box.
            valueText.text = mappedValue.toFixed(2);
        });

        // We can also set the initial value of the slider to match the text box value on load.
        // When the slider starts at value 0 (left), the text box will show 1.5.
        // We explicitly call the observable once to set the initial text correctly.
        slider.onValueChangedObservable.notifyObservers(slider.value);

        // Return the scene object so Babylon.js can start rendering it.
        return scene;

    }
}
export { Playground };
