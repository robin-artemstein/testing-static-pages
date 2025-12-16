class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);

        // Camera
        var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        // Light
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        // Cube model
        var box = BABYLON.MeshBuilder.CreateBox("box", {
            size: 2
        }, scene);

        // GUI
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true);

        // Horizontal stack panel for buttons
        var panel = new BABYLON.GUI.StackPanel();
        panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        panel.isVertical = false;
        panel.paddingBottomInPixels = 20;
        panel.paddingLeftInPixels = 20;
        advancedTexture.addControl(panel);

        // Buttons
        var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "😃");
        button1.width = "100px";
        button1.height = "50px";
        button1.color = "white";
        button1.background = "gray";
        button1.paddingRightInPixels = 10;

        var button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", "😐");
        button2.width = "100px";
        button2.height = "50px";
        button2.color = "white";
        button2.background = "gray";
        button2.paddingRightInPixels = 10;

        var button3 = BABYLON.GUI.Button.CreateSimpleButton("but3", "🙁");
        button3.width = "100px";
        button3.height = "50px";
        button3.color = "white";
        button3.background = "gray";

        // Add buttons to panel
        panel.addControl(button1);
        panel.addControl(button2);
        panel.addControl(button3);

        // Button click handling
        var buttons = [button1, button2, button3];
        var selectButton = function(selected: BABYLON.GUI.Button) {
            buttons.forEach(btn => {
                btn.background = "gray";
            });
            selected.background = "blue";
        };

        button1.onPointerUpObservable.add(() => selectButton(button1));
        button2.onPointerUpObservable.add(() => selectButton(button2));
        button3.onPointerUpObservable.add(() => selectButton(button3));

        return scene;
    }
}
export {
    Playground
};
