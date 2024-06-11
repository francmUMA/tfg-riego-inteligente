import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import { getSensorLast24hValuesHum, getSensorLast24hValuesSoilHum, getSensorLast24hValuesSoilTemp, getSensorLast24hValuesTemp } from '../../lib/sensorsUtils';
import { getCookie } from 'cookies-next';
import { getSensorLast24hValuesFlow } from '../../lib/actuadorUtils';
import { getDeviceTempLast24, getTemperatureValues } from '../../lib/devicesUtils';

export const SensorChart = props => {
	const {
	    id,
        className,
		type,		
		colors: {
			backgroundColor = 'white',
			lineColor = '#2962FF',
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef = useRef();

    
    const [data, setData] = useState([])
    const fetchSensorData = async (id, type, token) => {
        let newData = type == 0 
			? await getSensorLast24hValuesTemp(id, token) 
			: type == 1 
				? await getSensorLast24hValuesSoilTemp(id, token)
				: type == 2
					? await getSensorLast24hValuesHum(id, token)
					: type == 3
						? await getSensorLast24hValuesSoilHum(id, token)
						: type == 4
							? await getSensorLast24hValuesFlow(id, token)
							: type == 5
								? await getTemperatureValues(id)
								: []
        if (newData !== undefined) {
            //Ordenar los datos por fecha
            newData = newData.sort((a, b) => {
                return a.time - b.time
            })
			// Elimina los datos con el mismo timestamp
			newData = newData.filter((value, index, self) =>
				index === self.findIndex((t) => (
					t.time === value.time
				))
			)
            setData(newData)
			return newData
        }
		return []
    }

	const updateData = async (id,type,lineSeries) => {
		const token = getCookie('token');
		let newData = type == 0 
			? await getSensorLast24hValuesTemp(id, token) 
			: type == 1 
				? await getSensorLast24hValuesSoilTemp(id, token)
				: type == 2
					? await getSensorLast24hValuesHum(id, token)
					: type == 3
						? await getSensorLast24hValuesSoilHum(id, token)
						: type == 4
							? await getSensorLast24hValuesFlow(id, token)
							: type == 5 
								? await getDeviceTempLast24(id)
								: []
        if (newData !== undefined) {
            //Ordenar los datos por fecha
            newData = newData.sort((a, b) => {
                return a.time - b.time
            })
			// Elimina los datos con el mismo timestamp
			newData = newData.filter((value, index, self) =>
				index === self.findIndex((t) => (
					t.time === value.time
				))
			)
			// Elimina los datos que ya estan en la grafica
			newData = newData.filter((value) => {
				return data.findIndex((data) => data.time == value.time) == -1
			})
			// Si no hay nuevos datos, no hacer nada
			if (newData.length == 0) return
			// Si hay nuevos datos, quedarnos con el atributo time y value
			newData = newData.map((value) => {
				return { time: value.time, value: value.value }
			})
			lineSeries.update({
				time: newData[newData.length - 1].time,
				value: newData[newData.length - 1].value
			})
		}
	}

    useEffect(() => {
        const token = getCookie('token');
		if (id === undefined || id == null) return
		fetchSensorData(id, type, token)
    }, [id])

	useEffect(
		() => {
			if (data.length == 0) return
			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: {
						type: ColorType.Solid, 
						color: backgroundColor,

					},
					textColor,
				},
				width: 0,
				height: 0,
				autoSize: true,
				timeScale: {
					timeVisible: true,
					secondsVisible: false,
				},
				rightPriceScale: {
					visible: true,
					scaleMargins: {
						top: 0.3,
						bottom: 0.25,
					},
				},
				grid: {
					vertLines: {
						color: 'rgba(197, 203, 206, 0)',
					},
					horzLines: {
						color: 'rgba(197, 203, 206, 0)',
					},
				}
			})

			chart.timeScale().fitContent();



			const newSeries = chart.addAreaSeries(
			{ 
				lineColor, 
				topColor: areaTopColor, 
				bottomColor: areaBottomColor,
				priceLineVisible: false ,
				lineType: 2,
			});

			newSeries.setData(data);
			const interval = setInterval(() => {
				updateData(id,type, newSeries)
			}, 10000)

			return () => {
				clearInterval(interval)
				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div className={className} ref={chartContainerRef}>
			{
				data.length == 0 &&
				<p className="w-full h-full flex justify-center items-center">No se han podido obtener datos del sensor</p>
			}
		</div>
	)		
};