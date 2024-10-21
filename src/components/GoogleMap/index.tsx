'use client'

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import React from 'react'

export type Coordinates = {
  longitude: number
  latitude: number
}

export type Props = {
  coordinates: Coordinates[]
}

const GoogleMap: React.FC<Props> = (props) => {
  const { coordinates } = props

  if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: '500px', height: '500px' }}
          defaultCenter={{
            lng: -74.09044920524293,
            lat: 4.668820678731278,
          }}
          defaultZoom={12}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {coordinates.map(coordinatesItem => (
            <Marker
              position={{
                lat: coordinatesItem.latitude,
                lng: coordinatesItem.longitude
              }}
              key={coordinatesItem.latitude}
            />
          ))}
        </Map>
      </APIProvider>
    )
  }

  return <p>No se pudo cargar el mapa. sorry</p>
}

export default GoogleMap