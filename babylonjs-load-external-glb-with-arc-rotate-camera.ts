class Playground {
    public static async CreateScene(engine: BABYLON.Engine): Promise<BABYLON.Scene> {
        const scene = new BABYLON.Scene(engine);

        // Create a default skybox with an environment.
        const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.dds", scene);
        const currentSkybox = scene.createDefaultSkybox(hdrTexture, true);

        const katana =  BABYLON.AppendSceneAsync("https://raw.githubusercontent.com/robin-artemstein/testing-static-pages/main/Katana14.glb", scene);

        scene.createDefaultCameraOrLight(true, true, true);
        const camera = scene.activeCamera as BABYLON.ArcRotateCamera;

        return scene;
    }
}
export default Playground
