
import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Curve } from 'recharts';
import { Suspense, useEffect, useState } from 'react';
import { getCropActuadores, getCropAreas, getCrops } from '@/src/app/lib/cropUtils';
import { getMeanHumArea, getMeanSoilHumArea, getMeanSoilTempArea, getMeanTempArea } from '@/src/app/lib/areasUtils';
import CircularIndeterminate from '../info/CircularFallback';

export class CustomBarChart extends PureComponent{

  render() {
    const { data } = this.props;
    return (
        data === undefined || (data !== undefined && data.length === 0) ? <h1 className='w-full h-full flex items-center justify-center'>No hay datos</h1> :
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="blue"  radius={[10,10,0,0]} activeBar={<Rectangle fill="cyan" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export const CropHumBarChart = ({crop}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchInfo = async () => {
        let resData = []
        if (crop == "all"){
            const crops = await getCrops()
            for (let crop of crops){
                const areas = await getCropAreas(crop.id)
                for (let area of areas){
                    let mean = await getMeanHumArea(area.id)
                    if (mean !== undefined && mean.mean != null){
                        resData.push({name: area.name, value: mean.mean})
                    } else {
                        resData.push({name: area.name == null ? "Indefinido" : area.name, value: 0})
                    }
                }
            }
        } else {
            const areas = await getCropAreas(crop)
            for (let area of areas){
                let mean = await getMeanHumArea(area.id)
                if (mean !== undefined && mean.mean != null){
                    resData.push({name: area.name, value: mean.mean})
                } else {
                    resData.push({name: area.name == null ? "Indefinido" : area.name, value: 0})
                }
            }
        }
        setData(resData)
        setLoading(false)
    }

    useEffect(() => {
      if (crop !== undefined){
          fetchInfo()
          const interval = setInterval(() => {
            fetchInfo()
          }, 3000)
          return () => clearInterval(interval)
      }
  }, [crop])

    return (
        <div className="w-full h-full flex flex-col gap-y-2 justify-center items-center p-3">
            <h1 className="w-full flex font-medium justify-center items-center text-slate-400">Humedad (%RH)</h1>
            <Suspense fallback={<CircularIndeterminate/>}>
                {
                    loading ? <CircularIndeterminate/> : <CustomBarChart data={data}/>
                }
            </Suspense>
        </div>
    )
}

export const CropTempBarChart = ({crop}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchInfo = async () => {
    let resData = []
    if (crop == "all"){
        const crops = await getCrops()
        for (let crop of crops){
            const areas = await getCropAreas(crop.id)
            for (let area of areas){
                let mean = await getMeanTempArea(area.id)
                if (mean !== undefined && mean.mean != null){
                    resData.push({name: area.name, value: mean.mean})
                } else {
                    resData.push({name: area.name == null ? "Indefinido" : area.name, value: 0})
                }
            }
        }
    } else {
        const areas = await getCropAreas(crop)
        for (let area of areas){
            let mean = await getMeanTempArea(area.id)
            if (mean !== undefined && mean.mean != null){
                resData.push({name: area.name, value: mean.mean})
            } else {
                resData.push({name: area.name == null ? "Indefinido" : area.name, value: 0})
            }
        }
    }
    setData(resData)
    setLoading(false)
}

  useEffect(() => {
    if (crop !== undefined){
        fetchInfo()
        const interval = setInterval(() => {
          fetchInfo()
        }, 3000)
        return () => clearInterval(interval)
    }
}, [crop])

  return (
    <div className="w-full h-full flex flex-col gap-y-2 justify-center items-center p-3">
        <h1 className="w-full flex font-medium justify-center items-center text-slate-400">Humedad (%RH)</h1>
        <Suspense fallback={<CircularIndeterminate/>}>
            {
                loading ? <CircularIndeterminate/> : <CustomBarChart data={data}/>
            }
        </Suspense>
    </div>
  )
}

export const CropSoilTempBarChart = ({crop}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchInfo = async () => {
    let resData = []
    if (crop == "all"){
        const crops = await getCrops()
        for (let crop of crops){
            const areas = await getCropAreas(crop.id)
            for (let area of areas){
                let mean = await getMeanSoilTempArea(area.id)
                if (mean !== undefined && mean.mean != null){
                    resData.push({name: area.name, value: mean.mean})
                } else {
                    resData.push({name: area.name == null ? "Indefinido" : area.name, value: 0})
                }
            }
        }
    } else {
        const areas = await getCropAreas(crop)
        for (let area of areas){
            let mean = await getMeanSoilTempArea(area.id)
            if (mean !== undefined && mean.mean != null){
                resData.push({name: area.name, value: mean.mean})
            } else {
                resData.push({name: area.name == null ? "Indefinido" : area.name, value: 0})
            }
        }
    }
    setData(resData)
    setLoading(false)
}

  useEffect(() => {
    if (crop !== undefined){
        fetchInfo()
        const interval = setInterval(() => {
          fetchInfo()
        }, 3000)
        return () => clearInterval(interval)
    }
}, [crop])

  return (
    <div className="w-full h-full flex flex-col gap-y-2 justify-center items-center p-3">
        <h1 className="w-full flex font-medium justify-center items-center text-slate-400">Humedad (%RH)</h1>
        <Suspense fallback={<CircularIndeterminate/>}>
            {
                loading ? <CircularIndeterminate/> : <CustomBarChart data={data}/>
            }
        </Suspense>
    </div>
  )
}

export const CropSoilHumBarChart = ({crop}) => {
  const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

  const fetchInfo = async () => {
    let resData = []
    if (crop == "all"){
        const crops = await getCrops()
        for (let crop of crops){
            const areas = await getCropAreas(crop.id)
            for (let area of areas){
                let mean = await getMeanSoilHumArea(area.id)
                if (mean !== undefined && mean.mean != null){
                    resData.push({name: area.name, value: mean.mean})
                } else {
                    resData.push({name: area.name == null ? "Indefinido" : area.name, value: 0})
                }
            }
        }
    } else {
        const areas = await getCropAreas(crop)
        for (let area of areas){
            let mean = await getMeanSoilHumArea(area.id)
            if (mean !== undefined && mean.mean != null){
                resData.push({name: area.name, value: mean.mean})
            } else {
                resData.push({name: area.name == null ? "Indefinido" : area.name, value: 0})
            }
        }
    }
    setData(resData)
    setLoading(false)
}

  useEffect(() => {
      if (crop !== undefined){
          fetchInfo()
          const interval = setInterval(() => {
            fetchInfo()
          }, 3000)
          return () => clearInterval(interval)
      }
  }, [crop])

  return (
    <div className="w-full h-full flex flex-col gap-y-2 justify-center items-center p-3">
        <h1 className="w-full flex font-medium justify-center items-center text-slate-400">Humedad (%RH)</h1>
        <Suspense fallback={<CircularIndeterminate/>}>
            {
                loading ? <CircularIndeterminate/> : <CustomBarChart data={data}/>
            }
        </Suspense>
    </div>
  )
}

export const ActuadorAccumulatedFlowBarChart = ({crop}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
  
    const fetchInfo = async () => {
        let resData = []
        let actuadores = await getCropActuadores(crop)
        for (let actuador of actuadores){
            resData.push({name: actuador.name, value: actuador.acumulatedFlow})
        }
        setData(resData)
        setLoading(false)
    }
  
    useEffect(() => {
        if (crop !== undefined){
            fetchInfo()
            const interval = setInterval(() => {
              fetchInfo()
            }, 3000)
            return () => clearInterval(interval)
        }
    }, [crop])
  
    return (
        <div className="w-full h-full flex flex-col gap-y-2 justify-center items-center p-3">
            <h1 className="w-full flex font-medium justify-center items-center text-slate-400">Humedad (%RH)</h1>
            <Suspense fallback={<CircularIndeterminate/>}>
                {
                    loading ? <CircularIndeterminate/> : <CustomBarChart data={data}/>
                }
            </Suspense>
        </div>
    )
  }

