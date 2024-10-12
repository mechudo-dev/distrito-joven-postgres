'use client'

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import React from 'react'

export type Props = {
  latitude: number
  longitude: number
}

const GoogleMap: React.FC<Props> = (props) => {
  const { latitude, longitude } = props

  console.log(latitude);
  console.log(longitude);
  

  if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: '500px', height: '500px' }}
          defaultCenter={{ lat: latitude, lng: longitude }}
          defaultZoom={17}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >

          <Marker position={{ lat: latitude, lng: longitude }} />
        </Map>
      </APIProvider>
    )
  }

  return <p>No se pudo cargar el mapa. sorry</p>
}

export default GoogleMap