import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState} from 'react';
import { getTemperatureValues } from '../../lib/devicesUtils';

export const ChartComponent = props => {
	const {
		id,
        className,
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
    const fetchDeviceData = async (id) => {
		let newData = await getTemperatureValues(id)
        if (newData !== undefined) {
            //Ordenar los datos por fecha
            newData = newData.sort((a, b) => {
                return a.time - b.time
            })
            setData(newData)
        }
    }

	useEffect(() => {
		fetchDeviceData(id)
	}, [id])

	useEffect(
		() => {
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
		<div className={className}
			ref={chartContainerRef}
		>
			{
				data.length == 0 &&
				<p className="w-full h-full flex justify-center items-center">No hay datos de la temperatura</p>
			}
		</div>
	);
};