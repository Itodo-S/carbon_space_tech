import React, { useMemo, useState } from 'react';
import { GoogleMap, Marker, MarkerClusterer, useJsApiLoader } from '@react-google-maps/api';
import data from './db/data.json';
import SidePanel from './Components/SidePanel';

const containerStyle = {
  width: '100%',
  height: '100vh'
};


// const locations = [
//   { lat: -31.56391, lng: 147.154312 },
//   { lat: -33.718234, lng: 150.363181 },
//   { lat: -33.727111, lng: 150.371124 },
//   { lat: -33.848588, lng: 151.209834 },
//   { lat: -33.851702, lng: 151.216968 },
//   { lat: -34.671264, lng: 150.863657 },
//   { lat: -35.304724, lng: 148.662905 },
//   { lat: -36.817685, lng: 175.699196 },
//   { lat: -36.828611, lng: 175.790222 },
//   { lat: -37.75, lng: 145.116667 },
//   { lat: -37.759859, lng: 145.128708 },
//   { lat: -37.765015, lng: 145.133858 },
//   { lat: -37.770104, lng: 145.143299 },
//   { lat: -37.7737, lng: 145.145187 },
//   { lat: -37.774785, lng: 145.137978 },
//   { lat: -37.819616, lng: 144.968119 },
//   { lat: -38.330766, lng: 144.695692 },
//   { lat: -39.927193, lng: 175.053218 },
//   { lat: -41.330162, lng: 174.865694 },
//   { lat: -42.734358, lng: 147.439506 },
//   { lat: -42.734358, lng: 147.501315 },
//   { lat: -42.735258, lng: 147.438 },
//   { lat: -43.999792, lng: 170.463352 },
// ]


function myArr(arr) {
  return {
    lat: arr[0],
    lng: arr[1],
  }
}
const locations = (data.features[0].geometry.coordinates.map((items) => items[0].map((item) => myArr(item))));

// console.log(locations[0]);

// const options = {
//   imagePath:
//     'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
// }

function createKey(location) {
  return location.lat + location.lng
}

function App() {

  const [locate, setLocate] = useState('')
  // console.log({ locate });
  const center = useMemo(() => ({ lat: 12.2502, lng: 64.3372 }), []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])



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
            zoom={3}
            onLoad={onLoad}
            onUnmount={onUnmount}

          >

            <MarkerClusterer >
              {(clusterer) =>
                locations[0].map((location) => (
                  <Marker key={createKey(location)} position={location} clusterer={clusterer} onClick={() => { setLocate(location) }} />
                ))
              }
            </MarkerClusterer>

            { /* Child components, such as markers, info windows, etc. */}
          </GoogleMap>
        </div>

      </div>
    </div>
  ) : <></>
}

export default App;
