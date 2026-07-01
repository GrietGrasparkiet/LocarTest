import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { App, GpsReceivedEvent } from 'locar';

// Create app
const app = new App({
  cameraOptions: { hFov: 80, near: 0.001, far: 1000 },
  canvas: document.getElementById('glscene') as HTMLCanvasElement,
});

try {
  let firstLocation = true;

  const locar = await app.start();

  // Catch GPS errors
  locar.on("gpserror", (error: GeolocationPositionError) => {
    alert(`GPS error: ${error.code}`);
  });

  // When GPS updates
  locar.on("gpsupdate", (ev: GpsReceivedEvent) => {
    if (!firstLocation) return;

    firstLocation = false;

    const loader = new OBJLoader();

    // ✅ Correct path to OBJ file
    const url = import.meta.env.BASE_URL + 'Assets/ironman.obj';

    loader.load(
      url,
      (object) => {
        // ✅ Scale model (OBJ files are often huge)
        object.scale.set(0.01, 0.01, 0.01);

        // ✅ Optional: adjust height so it stands on ground
        object.position.set(0, 0, 0);

        // ✅ Add model to GPS location
        locar.add(
          object,
          ev.position.coords.longitude,
          ev.position.coords.latitude
        );

        console.log("Model placed at GPS location");
      },
      undefined,
      (error) => {
        console.error("Error loading OBJ:", error);
      }
    );

    alert(
      `GPS locked:\nLat: ${ev.position.coords.latitude}\nLon: ${ev.position.coords.longitude}`
    );
  });

  // ✅ Start GPS tracking
  locar.startGps();

} catch (e: any) {
  alert(`${e.code} ${e.message}`);
}
