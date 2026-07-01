
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { 
    App, GpsReceivedEvent
 } from 'locar';

const app = new App({ 
    cameraOptions: { hFov: 80, near: 0.001, far: 1000 },
    canvas: document.getElementById('glscene') as HTMLCanvasElement,
});



try {
    let firstLocation = true;
    const locar = await app.start();
    locar.on("gpserror", (error : GeolocationPositionError) =>{ 
        alert(`GPS error: ${error.code}`);
    });

    locar.on("gpsupdate", (ev: GpsReceivedEvent) => {
        if(firstLocation) {
            alert(`Got the initial location: longitude ${ev.position.coords.longitude}, latitude ${ev.position.coords.latitude}`);

            
			const loader = new GLTFLoader();
			const url = import.meta.env.BASE_URL + 'Assets/ironman.obj';


			loader.load(url, function ( gltf ){
				scene.add( gltf.scene );
			}, undefined, function ( error ) {
				console.error( error )
			}

      // Scale fix
    object.scale.set(0.01, 0.01, 0.01);

    // Keep origin-centered
    object.position.set(0, 0, 0);

    // Add to GPS location
    locar.add(
      object,
      ev.position.coords.longitude + 0.0005,
      ev.position.coords.latitude
    );
  },
  undefined,
  (error) => {
    console.error("Error loading OBJ:", error);
  }
);


        
            firstLocation = false;
        }
    });

     document.getElementById("setFakeLoc")!.addEventListener("click", e => {
        alert("Using fake input GPS, not real GPS location");
        locar.stopGps();
        locar.fakeGps(
            parseFloat((document.getElementById("fakeLon") as HTMLInputElement).value),
            parseFloat((document.getElementById("fakeLat") as HTMLInputElement).value)
        );
    });

    locar.startGps();
}
catch(e: any) {
    alert(`${e.code} ${e.message}`);
}
