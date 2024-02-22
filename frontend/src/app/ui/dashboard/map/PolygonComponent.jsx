import { getCoordsArea } from "@/src/app/lib/coordsUtils"
import { getCookie } from "cookies-next"
import { useState, useEffect, createRef } from "react"

const PolygonComponent = ({ area, editMode}) => {
    const [polygonRef, setPolygonRef] = useState(null)
    const [coords, setCoords] = useState([])

    const handleDragPolygon = (area, polygon) => {
        let newCoords = []
        // Eliminar coordenadas que tenga el id del area
        for (let coord of coords) {
          if (coord.area != area) {
            newCoords.push(coord)
          }
        }
    
        // Agregar las coordenadas del poligono
        if (polygon.latLngs.Fg[0] !== undefined && polygon.latLngs.Fg[0].Fg.length > 0){
            polygon.latLngs.Fg[0].Fg.map(async (point, index) => {
              let newCoord = {
                  Latitud: point.lat(), 
                  Longitud: point.lng(), 
                  area: area, 
                  index: index
              }
              newCoords.push(newCoord)
          })
        }
    
        setCoords(newCoords)
    }

    const orderCoords = (coords) => {
        let orderedCoords = []
        for (let i = 0; i < coords.length; i++) {
          let coord = coords.find(coord => coord.index == i)
          orderedCoords.push(coord)
        }
        return orderedCoords
      }

    useEffect(async () => {
        const token = getCookie('token')
        if (area !== undefined && area !== null) {
            let polCoords = await getCoordsArea(area, token)
            setCoords(orderCoords(polCoords))
        }
    }, [area])
    
    useEffect(() => {
        if (!polygonRef) {
            setPolygonRef(createRef())
        }
    }, [polygonRef])

    return (
        <Polygon
            ref={polygonRef}
            onMouseOut={() => {
                if (editMode){
                  const polygonNew = polygonRef.current
                  let newCoords = []
                  if (polygonNew !== undefined && polygonNew != null){
                      for (let coord of polygonNew.getPath().getArray()) {
                        newCoords.push({lat: coord.lat(), lng: coord.lng()})
                      }
                      let different = false
                      if (newCoords.length == coords.length) {
                      for (let i = 0; i < newCoords.length && !different; i++) {
                          if (newCoords[i].lat != coords[i].lat || newCoords[i].lng != coords[i].lng) {
                            different = true
                            handleDragPolygon(area, polygonNew)
                          }
                      }
                      } else {
                        handleDragPolygon(area, polygonNew)
                      }
                  }
                }
            }}
            paths={[
                coords
            ]}
            options={{
                fillColor: 'red',
                fillOpacity: 0.2,
                strokeColor: 'red',
                strokeOpacity: 0.4,
                strokeWeight: 2,
            }}
            editable={editMode}
            draggable={editMode}
        />
    )
  } 

export default PolygonComponent