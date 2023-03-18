import { useEffect } from "react"
import { Marker, Popup, useMapEvents } from "react-leaflet"

interface MakerPointProps {
  onClick: (lat: number, lont: number) => void,
  position: [number, number]
}

export function MakerPoint({ onClick, position }: MakerPointProps) {
  const map = useMapEvents({
    click(event) {
      onClick(event.latlng.lat, event.latlng.lng)
    },
    locationfound(e) {
      onClick(e.latlng.lat, e.latlng.lng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  useEffect(() => {
    map.locate()
  }, [map])

  return (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}