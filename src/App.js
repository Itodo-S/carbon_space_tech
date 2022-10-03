import React, { useMemo, useState } from 'react';
import { GoogleMap, Marker, MarkerClusterer, useJsApiLoader } from '@react-google-maps/api';
import SidePanel from './Components/SidePanel';
import data from './db/data.json';
import _flattenDeep from 'lodash/flattenDeep';

const containerStyle = {
  width: '100%',
  height: '100vh'
};


const features = data.features;

const processedCoordinates = (coordinates, properties) => {
  let firstLat, firstLng, secondLat, secondLng = null;

  const result = [];

  for ([[firstLat, firstLng], [secondLat, secondLng]] of coordinates) {
    const firstResult = {
      lat: firstLat,
      lng: firstLng,
      ...properties
    };

    const secondResult = {
      lat: secondLat,
      lng: secondLng,
      ...properties
    };

    result.push(firstResult);
    result.push(secondResult);
  }

  return result;
}

const oldLocations = features.map((feature) => {
  return processedCoordinates(feature.geometry.coordinates[0], feature.properties);

});


const locations = _flattenDeep(oldLocations);


function App() {
  const [locate, setLocate] = useState('')
  const center = useMemo(() => ({ lat: 12.2502, lng: 64.3372 }), []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB-iKQ7LCZ3YOsWtljX7b_tjOCFbdEUOoU'
  })

  return isLoaded ? (

    <div className=''>

      <div className='grid grid-cols-5'>
        <div className='bg-black'>
          <SidePanel locate={locate} />
        </div>

        <div className='col-span-4 bg-slate-300'>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={5}
          >
            <MarkerClusterer >
              {(clusterer) =>
                locations.map((location, index) => (
                  <Marker key={index} position={location} clusterer={clusterer} onClick={() => { setLocate(location) }} />
                ))
              }
            </MarkerClusterer>
          </GoogleMap>
        </div>
      </div>
    </div>
  ) : <></>
}

export default App;
