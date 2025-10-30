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
        const textBlock = new BABYLON.GUI.TextBlock();
        textBlock.text = "0";
        textBlock.color = "white";
        textBlock.fontSize = 24;
        textBlock.height = "50px";
        stackPanel.addControl(textBlock);

        // Create the horizontal slider
        const slider = new BABYLON.GUI.Slider();
        slider.minimum = 0;
        slider.maximum = 100;
        slider.value = 0;
        slider.height = "20px";
        slider.width = "200px";
        slider.isVertical = false; // Ensure horizontal
        slider.isPointerBlocker = true; // Ensure the slider captures pointer (mouse/touch) events
        stackPanel.addControl(slider);

        // Update the text block when slider value changes
        slider.onValueChangedObservable.add(function (value) {
            let textNumber = Math.round(value)
            console.log(textNumber + "  " + typeof textNumber);
            textBlock.text = textNumber.toString(); // Round to nearest integer for display
        });

        return scene;
    }
}
export { Playground };
