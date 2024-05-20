import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import { getSensorLast24hValuesHum, getSensorLast24hValuesSoilHum, getSensorLast24hValuesSoilTemp, getSensorLast24hValuesTemp } from '../../lib/sensorsUtils';
import { getCookie } from 'cookies-next';

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
						: []
        if (newData !== undefined) {
            //Ordenar los datos por fecha
            newData = newData.sort((a, b) => {
                return a.time - b.time
            })
            setData(newData)
        }
    }

    useEffect(() => {
        const token = getCookie('token');
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

			chart.timeScale().fitContent()



			const newSeries = chart.addAreaSeries(
			{ 
				lineColor, 
				topColor: areaTopColor, 
				bottomColor: areaBottomColor,
				priceLineVisible: false ,
				lineType: 2
			});

			newSeries.setData(data);

			return () => {
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