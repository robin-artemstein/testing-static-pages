export const createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    const scene = new BABYLON.Scene(engine);

    // 1. Setup Camera and Lighting
    // ArcRotateCamera is ideal for 3D object interaction (rotate, zoom, pan are built-in)
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.5, 5, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // Customize camera controls for the instructions provided in the requirements
    // Default controls match the requirements perfectly:
    // Left-click/One-finger-drag = Rotate
    // Scroll/Two-fingers-pinch = Zoom
    // Right-click/Two-fingers-drag = Pan (requires Babylon.js default behavior or setting up specific inputs)

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // 2. Load a cube model on the canvas
    // Using the built-in CreateBox for simplicity and immediate functionality in the Playground.
    const cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 1 }, scene);
    cube.position.y = 0;

    // --- GUI Implementation using Babylon.GUI ---
    
    // Create an AdvancedDynamicTexture to overlay GUI elements on the 3D scene
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // 2. The "Need help?" button GUI in the lower right corner
    const helpButton = BABYLON.GUI.Button.CreateSimpleButton("helpButton", "Need help?");
    helpButton.width = "150px";
    helpButton.height = "40px";
    helpButton.color = "white";
    helpButton.background = "green";
    helpButton.cornerRadius = 5;
    helpButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    helpButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    helpButton.paddingRight = "20px";
    helpButton.paddingBottom = "20px";
    
    // 3-2. When tapped, make the modal visible
    helpButton.onPointerUpObservable.add(function() {
        modalContainer.isVisible = true;
    });

    advancedTexture.addControl(helpButton);

    // 3. Create the main rectangle modal GUI container in the center
    const modalContainer = new BABYLON.GUI.Rectangle();
    modalContainer.width = "400px";
    modalContainer.height = "350px";
    modalContainer.cornerRadius = 20; // 3-3. Rounded corners
    modalContainer.color = "white";    // 3-3. White border
    modalContainer.thickness = 2;
    modalContainer.background = "darkgray"; // 3-3. Dark gray background
    modalContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    modalContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    modalContainer.isVisible = false; // 3-1. Invisible by default
    advancedTexture.addControl(modalContainer);

    // Use a StackPanel inside the modal to arrange items vertically easily
    const stackPanel = new BABYLON.GUI.StackPanel();
    stackPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    stackPanel.paddingTop = "20px";
    stackPanel.height = "100%";
    modalContainer.addControl(stackPanel);

    // 3-4. Headline text block
    const headlineText = new BABYLON.GUI.TextBlock("headline", "Instructions...");
    headlineText.fontSize = 30;
    headlineText.color = "white";
    headlineText.height = "40px";
    stackPanel.addControl(headlineText);

    // --- Create instruction text blocks (3-5 to 3-8)
    
    // 3-6. Rotate Text
    const rotateText = new BABYLON.GUI.TextBlock("rotateText", "Rotate\nLeft click + Drag (Mouse)\nOne finger drag (Touch)");
    rotateText.fontSize = 25;
    rotateText.color = "white";
    rotateText.height = "100px";
    rotateText.isVisible = true;
    rotateText.textWrapping = BABYLON.GUI.TextWrapping.WordWrap;
    stackPanel.addControl(rotateText);

    // 3-7. Zoom Text
    const zoomText = new BABYLON.GUI.TextBlock("zoomText", "Zoom\nScrolling (Mouse)\nTwo fingers pinch (Touch)");
    zoomText.fontSize = 25;
    zoomText.color = "white";
    zoomText.height = "100px";
    zoomText.isVisible = false; // 3-9. Invisible by default
    zoomText.textWrapping = BABYLON.GUI.TextWrapping.WordWrap;
    stackPanel.addControl(zoomText);

    // 3-8. Pan Text
    const panText = new BABYLON.GUI.TextBlock("panText", "Pan\nRight click + Drag (Mouse)\nTwo fingers drag (Touch)");
    panText.fontSize = 25;
    panText.color = "white";
    panText.height = "100px";
    panText.isVisible = false; // 3-9. Invisible by default
    panText.textWrapping = BABYLON.GUI.TextWrapping.WordWrap;
    stackPanel.addControl(panText);

    // Helper function to manage text visibility
    function showInstructionText(textToShow) {
        rotateText.isVisible = (textToShow === rotateText);
        zoomText.isVisible = (textToShow === zoomText);
        panText.isVisible = (textToShow === panText);
    }

    // 3-10. Horizontal Stack Panel for the 3 buttons
    const buttonPanel = new BABYLON.GUI.StackPanel();
    buttonPanel.isHorizontal = true;
    buttonPanel.height = "50px";
    buttonPanel.paddingTop = "10px";
    stackPanel.addControl(buttonPanel);

    // Function to create standard instruction buttons
    function createInstructionButton(name, textBlock) {
        const button = BABYLON.GUI.Button.CreateSimpleButton(name + "Btn", name);
        button.width = "100px";
        button.height = "40px";
        button.color = "white";
        button.background = "gray";
        button.cornerRadius = 5;
        button.paddingLeft = "5px";
        button.paddingRight = "5px";
        
        // 3-11, 3-12, 3-13. Change visibility when clicked
        button.onPointerUpObservable.add(function() {
            showInstructionText(textBlock);
        });
        return button;
    }

    const rotateBtn = createInstructionButton("Rotate", rotateText);
    const zoomBtn = createInstructionButton("Zoom", zoomText);
    const panBtn = createInstructionButton("Pan", panText);
    
    buttonPanel.addControl(rotateBtn);
    buttonPanel.addControl(zoomBtn);
    buttonPanel.addControl(panBtn);

    // 3-14. "Close" button GUI at the bottom of the modal
    const closeButton = BABYLON.GUI.Button.CreateSimpleButton("closeButton", "Close");
    closeButton.width = "150px";
    closeButton.height = "40px";
    closeButton.color = "white";
    closeButton.background = "darkred";
    closeButton.cornerRadius = 5;
    closeButton.paddingTop = "20px";
    
    // 3-15. When tapped, hide the main modal container
    closeButton.onPointerUpObservable.add(function() {
        // Hiding the main container hides all children automatically
        modalContainer.isVisible = false;
        // Reset the view to the default Rotate text for the next time it opens
        showInstructionText(rotateText); 
    });

    stackPanel.addControl(closeButton);

    return scene;
};
