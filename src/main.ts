
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { 
    App, GpsReceivedEvent
 } from 'locar';


const loader = new OBJLoader();

const url = import.meta.env.BASE_URL + 'Assets/ironman.obj';

const app = new App({ 
    cameraOptions: { hFov: 80, near: 0.001, far: 1000 },
    canvas: document.getElementById('glscene') as HTMLCanvasElement,
});



try {
    let firstLocation = true;
    const locar = await app.start();
    locar.on("gpserror", (error : GeolocationPositionError) => {
        alert(`GPS error: ${error.code}`);
    });

    locar.on("gpsupdate", (ev: GpsReceivedEvent) => {
        if(firstLocation) {
            alert(`Got the initial location: longitude ${ev.position.coords.longitude}, latitude ${ev.position.coords.latitude}`);

            
			const loader = new OBJLoader();
			const url = import.meta.env.BASE_URL + 'Assets/ironman.obj';

			loader.load(
			  url,
			  (object) => {
				object.scale.set(1, 1, 1); // waarschijnlijk nodig
				object.position.set(0, 0, 0);

				// 👉 voeg toe aan LocAR op GPS positie
				locar.add(
				  object,
				  ev.position.coords.longitude + 0.0002, // beetje offset
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
