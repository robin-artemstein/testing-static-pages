import { useEffect, useRef } from "react"
import * as BABYLON from "@babylonjs/core"
import '@babylonjs/loaders';
import * as GUI from "@babylonjs/gui"

export default function BabylonjsScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const engine = new BABYLON.Engine(canvas, true)
    const scene = new BABYLON.Scene(engine)
    
    // Default camera & light
    
    scene.createDefaultCameraOrLight(true, true, true)

    // ArcRotateCamera (explicit config)
    
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.alpha = -Math.PI / 2;
    camera.beta =  Math.PI / 2;
    camera.radius = 1.5;
    camera.lowerRadiusLimit = 0.25
    camera.upperRadiusLimit = 10
    camera.attachControl(canvas, true)

     // Environment (ground + skybox)
    
    scene.createDefaultEnvironment({createGround: true, createSkybox: true, groundSize: 10, skyboxSize: 50,})

    // Load GLB model
    
    BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "https://raw.githubusercontent.com/robin-artemstein/testing-static-pages/main/",
      "bullet-for-assult-2025-11-7-1.glb",
      scene
    ).then((result) => {
      result.meshes.forEach((mesh) => {
        mesh.position = new BABYLON.Vector3(0.15, 0.1, 0);
        mesh.scaling = new BABYLON.Vector3(0.15, 0.15, 0.15);

      })
    })

    
    // GUI Button (inside canvas)
    
    const guiTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene)

    const button = GUI.Button.CreateSimpleButton("btn", "Reset Camera")
    button.width = "160px"
    button.height = "40px"
    button.color = "white"
    button.background = "#2563eb"
    button.cornerRadius = 8
    button.thickness = 0
    button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
    button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    button.top = "-20px"

    button.onPointerUpObservable.add(() => {
      camera.alpha = -Math.PI / 2
      camera.beta = Math.PI / 2
      camera.radius = 1.5
    })

    guiTexture.addControl(button)

    
    // Render loop & resize
    
    engine.runRenderLoop(() => {
      scene.render()

    })

    const handleResize = () => {
      engine.resize()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      scene.dispose()
      engine.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
    />
  )
}
