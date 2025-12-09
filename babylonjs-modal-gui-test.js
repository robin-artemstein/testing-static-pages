export const createScene = function () {
    // Create a new scene object, which is like the world where everything happens.
    const scene = new BABYLON.Scene(engine);

    // Set up a camera that can rotate around the scene, positioned to look at the origin (0,0,0).
    const camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(45), BABYLON.Tools.ToRadians(45), 10, BABYLON.Vector3.Zero(), scene);
    // Attach the camera to the canvas so it responds to user inputs like mouse and touch.
    camera.attachControl(canvas, true);

    // Add a light to illuminate the scene, coming from above.
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Create a simple cube mesh (3D object) in the scene.
    const cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 2 }, scene);

    // Create a GUI texture that covers the full screen for 2D elements like buttons and text.
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true);

    // Create the "Need help?" button in the lower right corner.
    const helpButton = BABYLON.GUI.Button.CreateSimpleButton("helpButton", "Need help?");
    helpButton.width = "150px"; // Set the width of the button.
    helpButton.height = "70px"; // Set the height of the button.
    helpButton.cornerRadius = 30;
    helpButton.color = "white"; // Text color.
    helpButton.background = "blue"; // Background color for visibility.
    helpButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT; // Align to the right side.
    helpButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM; // Align to the bottom.
    helpButton.paddingBottom = "20px"; // Add some space from the bottom edge.
    helpButton.paddingRight = "20px"; // Add some space from the right edge.
    advancedTexture.addControl(helpButton); // Add the button to the GUI.

    // Create the modal rectangle that will appear in the center.
    const modalRect = new BABYLON.GUI.Rectangle("modalRect");
    modalRect.width = "100%"; // Width of the modal.
    modalRect.height = "75%"; // Height of the modal.
    modalRect.cornerRadius = 30; // Rounded corners.
    modalRect.color = "white"; // Border color.
    modalRect.thickness = 3; // Border thickness.
    modalRect.background = "#333333"; // Dark gray background.
    modalRect.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER; // Center horizontally.
    modalRect.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER; // Center vertically.
    modalRect.isVisible = false; // Invisible by default.
    advancedTexture.addControl(modalRect); // Add to the GUI.

    // Use a vertical stack panel inside the modal to organize elements top to bottom.
    const modalStack = new BABYLON.GUI.StackPanel();
    modalStack.top = "10px";
    modalStack.width = "100%"; // Full width of the modal.
    modalStack.paddingTop = "20px"; // Some padding at the top.
    modalStack.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP; // Top vertically.
    modalRect.addControl(modalStack); // Add the stack to the modal.

    // Create the headline text block.
    const headLine = new BABYLON.GUI.TextBlock("headLine", "Instructions...");
    headLine.height = "40px"; // Height for the text.
    headLine.fontSize = 30; // Font size as specified.
    headLine.color = "white"; // White text.
    headLine.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER; // Center the text.
    modalStack.addControl(headLine); // Add to the stack.

    // Create a horizontal stack panel for the Rotate, Zoom, Pan buttons.
    const buttonStack = new BABYLON.GUI.StackPanel();
    buttonStack.isVertical = false; // Horizontal layout.
    buttonStack.height = "70px"; // Height for the buttons.
    buttonStack.paddingTop = "20px"; // Space above.
    modalStack.addControl(buttonStack); // Add to the main stack.

    // Create the Rotate button.
    const rotateButton = BABYLON.GUI.Button.CreateSimpleButton("rotateButton", "Rotate");
    rotateButton.fontSize = "50%";
    rotateButton.width = "100px";
    rotateButton.height = "50px";
    rotateButton.color = "white";
    rotateButton.background = "gray";
    rotateButton.thickness = 3;
    buttonStack.addControl(rotateButton);

    // Create the Zoom button.
    const zoomButton = BABYLON.GUI.Button.CreateSimpleButton("zoomButton", "Zoom");
    zoomButton.fontSize = "50%";
    zoomButton.width = "100px";
    zoomButton.height = "50px";
    zoomButton.color = "white";
    zoomButton.background = "gray";
    zoomButton.thickness = 3;
    buttonStack.addControl(zoomButton);

    // Create the Pan button.
    const panButton = BABYLON.GUI.Button.CreateSimpleButton("panButton", "Pan");
    panButton.fontSize = "50%";
    panButton.width = "100px";
    panButton.height = "50px";
    panButton.color = "white";
    panButton.background = "gray";
    panButton.thickness = 3;
    buttonStack.addControl(panButton);

    // Create a container for the instruction texts (we'll add them to the main stack).
    // But since they overlap in position, we'll add them separately and control visibility.

    // Create the rotation text block.
    const rotateText = new BABYLON.GUI.TextBlock("rotationText", "Rotate\nLeft click + Drag (Mouse)\nOne finger drag (Touch)");
    rotateText.height = "150px"; // Enough height for multi-line text.
    rotateText.fontSize = 25;
    rotateText.color = "white";
    rotateText.textWrapping = true; // Allow wrapping if needed.
    rotateText.paddingTop = "20px";
    rotateText.paddingLeft = "20px";
    rotateText.paddingRight = "20px";
    rotateText.isVisible = true; // Visible by default.
    modalStack.addControl(rotateText); // Add to stack.

    // Create the zoom text block.
    const zoomText = new BABYLON.GUI.TextBlock("zoomText", "Zoom\nScrolling (Mouse)\nTwo fingers pinch (Touch)");
    zoomText.height = "150px";
    zoomText.fontSize = 25;
    zoomText.color = "white";
    zoomText.textWrapping = true;
    zoomText.paddingTop = "20px";
    zoomText.paddingLeft = "20px";
    zoomText.paddingRight = "20px";
    zoomText.isVisible = false; // Invisible by default.
    modalStack.addControl(zoomText); // Add to stack.

    // Create the pan text block.
    const panText = new BABYLON.GUI.TextBlock("panText", "Pan\nRight click + Drag (Mouse)\nTwo fingers drag (Touch)");
    panText.height = "150px";
    panText.fontSize = 25;
    panText.color = "white";
    panText.textWrapping = true;
    panText.paddingTop = "20px";
    panText.paddingLeft = "20px";
    panText.paddingRight = "20px";
    panText.isVisible = false; // Invisible by default.
    modalStack.addControl(panText); // Add to stack.

    // Note: Since stack panel stacks them vertically, but we want only one visible at a time,
    // hiding will collapse the space, which is fine as heights are fixed.

    // Create the Close button at the bottom.
    const closeButton = BABYLON.GUI.Button.CreateSimpleButton("closeButton", "Close");
    closeButton.fontSize = "7%";
    closeButton.width = "150px";
    closeButton.height = "70px";
    closeButton.cornerRadius = 30;
    closeButton.color = "white";
    closeButton.background = "red"; // Red for close.
    closeButton.thickness = 3;
    closeButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    closeButton.paddingTop = "20px"; // Space above.
    modalStack.addControl(closeButton); // Add to the stack.

    // Event: When "Need help?" is clicked, show the modal.
    helpButton.onPointerUpObservable.add(function () {
        modalRect.isVisible = true; // Make modal visible.
    });

    // Event: When Rotate button is clicked, show rotation text, hide others.
    rotateButton.onPointerUpObservable.add(function () {
        rotateText.isVisible = true;
        zoomText.isVisible = false;
        panText.isVisible = false;
    });

    // Event: When Zoom button is clicked, show zoom text, hide others.
    zoomButton.onPointerUpObservable.add(function () {
        rotateText.isVisible = false;
        zoomText.isVisible = true;
        panText.isVisible = false;
    });

    // Event: When Pan button is clicked, show pan text, hide others.
    panButton.onPointerUpObservable.add(function () {
        rotateText.isVisible = false;
        zoomText.isVisible = false;
        panText.isVisible = true;
    });

    // Event: When Close is clicked, hide the modal.
    closeButton.onPointerUpObservable.add(function () {
        modalRect.isVisible = false; // Hide the entire modal.
    });

    // Return the scene to be rendered.
    return scene;
};
