class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        const scene = new BABYLON.Scene(engine);

        //Create the the default camera in the scene.
        scene.createDefaultCameraOrLight(true, true, true);
        scene.createDefaultEnvironment();
        const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
        // Arc rotate camera setting
        camera.alpha = -Math.PI / 2;
        camera.beta =  Math.PI / 2;
        camera.radius = 1.5;
        camera.lowerRadiusLimit = 0.25;
        camera.upperRadiusLimit = 10;
        // Limit zooming speed for touch devices
        camera.pinchPrecision = 0.005;
        camera.pinchDeltaPercentage = 0.005;
        // Limit Zooming speed for mouse
        camera.wheelPrecision = 0.005;
        camera.wheelDeltaPercentage = 0.005;
        // Limit panning speed for both of mouse and touch devices
        camera.panningSensibility = 5000; // Panning speed setting, smaller means faster panning
        // Create cylinder
        const cylinder = BABYLON.MeshBuilder.CreateCylinder(
            "cylinder",
            { height: 2, diameter: 1.5 },
            scene
        );

        // Dynamic texture
        const textureSize = 1024;
        const dynamicTexture = new BABYLON.DynamicTexture(
            "dynamicTexture",
            { width: textureSize, height: textureSize },
            scene,
            true
        );

        const ctx = dynamicTexture.getContext();

        // Transparent background
        ctx.clearRect(0, 0, textureSize, textureSize);

        // Image
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = "https://i.imgur.com/ZyY3rbN.png";

        let posX = textureSize / 2;
        let posY = textureSize / 2;
        let scale = 1;

        const draw = () => {
            ctx.clearRect(0, 0, textureSize, textureSize);

            const w = image.width * scale;
            const h = image.height * scale;

            ctx.drawImage(
                image,
                posX - w / 2,
                posY - h / 2,
                w,
                h
            );

            dynamicTexture.update();
        };

        image.onload = () => {
            draw();
        };

        // PBR material
        const pbr = new BABYLON.PBRMaterial("pbr", scene);
        pbr.albedoColor = new BABYLON.Color3(1, 1, 1);
        pbr.metallic = 1.0;
        pbr.roughness = 0.1;
        pbr.albedoTexture = dynamicTexture;

        cylinder.material = pbr;

        // GUI
        const ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui");

        const panel = new BABYLON.GUI.StackPanel();
        panel.width = "220px";
        panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        ui.addControl(panel);

        function makeButton(text: string, callback: () => void) {
            const btn = BABYLON.GUI.Button.CreateSimpleButton(text, text);
            btn.height = "40px";
            btn.color = "white";
            btn.background = "black";
            btn.onPointerClickObservable.add(callback);
            panel.addControl(btn);
        }

        makeButton("Left", () => {
            posX -= 10;
            draw();
        });

        makeButton("Right", () => {
            posX += 10;
            draw();
        });

        makeButton("Up", () => {
            posY -= 10;
            draw();
        });

        makeButton("Down", () => {
            posY += 10;
            draw();
        });

        // Slider for resizing image
        const slider = new BABYLON.GUI.Slider();
        slider.minimum = 0.1;
        slider.maximum = 2;
        slider.value = 1;
        slider.height = "20px";
        slider.width = "200px";

        slider.onValueChangedObservable.add((v) => {
            scale = v;
            draw();
        });

        panel.addControl(slider);

        return scene;
    }
}
export { Playground };
