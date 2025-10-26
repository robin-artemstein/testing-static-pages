class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        const scene = new BABYLON.Scene(engine);
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/robin-artemstein/testing-static-pages/main/", "Katana4.glb", scene).then((result) => {
                // 獲取載入的模型（假設模型為第一個根節點）
                const model = result.meshes[0];

                // 調整模型的座標位置，例如移動到 (x: 2, y: 1, z: -3)
                model.position = new BABYLON.Vector3(-0.25, -0.1, 0);

                // 可選：調整模型縮放（如果模型太小或太大）
                model.scaling = new BABYLON.Vector3(1, 1, 1); // 按需求調整縮放比例

                // 可選：旋轉模型（以弧度為單位）
                model.rotation = new BABYLON.Vector3(0, Math.PI / 1, 0); // 例如沿 Y 軸旋轉 90 度
            }).catch((error) => {
                console.error("模型載入失敗:", error);
            });

        scene.createDefaultCameraOrLight(true, true, true);
        scene.createDefaultEnvironment();
        const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
        camera.alpha = -Math.PI / 2;
        camera.beta =  Math.PI / 2;;
        camera.radius = 1.5;

        return scene;
    }
}
export { Playground };
