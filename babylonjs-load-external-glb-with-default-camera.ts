class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        const scene = new BABYLON.Scene(engine);
	
        const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.dds", scene);
        const currentSkybox = scene.createDefaultSkybox(hdrTexture, true);

        const katana = BABYLON.AppendSceneAsync("https://raw.githubusercontent.com/robin-artemstein/testing-static-pages/main/Katana4.glb", scene);

        scene.createDefaultCamera(true, true, true);
        scene.createDefaultLight();

        const helperCamera = scene.cameras.pop();
        scene.cameras.push(helperCamera);
    
        helperCamera.radius = 1;
        helperCamera.alpha = -Math.PI / 2;
        helperCamera.beta = Math.PI / 2;
    
        return scene;
    }
}
export { Playground };
