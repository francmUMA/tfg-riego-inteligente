import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = props => {
	const {
		data,
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
				width: 500,
				height: 250,
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
				priceLineVisible: false 
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
		/>
	);
};