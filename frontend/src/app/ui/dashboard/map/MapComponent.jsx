import {APIProvider, Map, Marker, MapControl, ControlPosition, useMapsLibrary} from '@vis.gl/react-google-maps';
import { MdAddLocationAlt } from "react-icons/md";
import { Circle } from "./Circle.tsx"
import { Polygon } from "./Polygon.tsx"

const App = () => (
  <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
    <Map defaultZoom={10} defaultCenter={{lat: 53.54992, lng: 10.00678}}>
      <Marker
        draggable  
        position={{lat: 53.54992, lng: 10.00678}}>
      </Marker>
      <MapControl  position={ControlPosition.RIGHT_BOTTOM}>
        <div id='add-sensor-button' style={{ height: '50px', width: '60px' } } className='px-2.5 pb-2.5'>
          <button className='w-full h-full flex justify-center items-center bg-gray-50 hover:bg-gray-200 rounded-sm shadow-md'>
            <MdAddLocationAlt size={24} className="w-6"/>
          </button>
        </div>
        <div id='add-actuador-button' style={{ height: '50px', width: '60px' } } className='px-2.5 pb-2.5'>
          <button className='w-full h-full flex justify-center items-center bg-gray-50 hover:bg-gray-200 rounded-sm shadow-md'>
            <MdAddLocationAlt size={24} className="w-6"/>
          </button>
        </div>
        <div id='add-device-button' style={{ height: '50px', width: '60px' } } className='px-2.5 pb-2.5'>
          <button className='w-full h-full flex justify-center items-center bg-gray-50 hover:bg-gray-200 rounded-sm shadow-md'>
            <MdAddLocationAlt size={24} className="w-6"/>
          </button>
        </div>
      </MapControl>
      <Circle
        center={{lat: 53.54992, lng: 10.00678}}
        radius={1000}
        options={{
          fillColor: 'red',
          fillOpacity: 0.2,
          strokeColor: 'red',
          strokeOpacity: 0.4,
          strokeWeight: 2,
        }}
        editable
        draggable
      />
      <Polygon
        paths={[
          {lat: 53.54992, lng: 10.00678},
          {lat: 53.54992, lng: 10.08678},
          {lat: 53.56002, lng: 10.04678},
        ]}
        options={{
          fillColor: 'red',
          fillOpacity: 0.2,
          strokeColor: 'red',
          strokeOpacity: 0.4,
          strokeWeight: 2,
        }}
        editable
        draggable
      />
    </Map>
  </APIProvider>
);

export default App