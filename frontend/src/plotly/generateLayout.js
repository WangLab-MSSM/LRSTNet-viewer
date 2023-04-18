import xAxis from './xAxis'
import yAxis from './yAxis'

export function generateLayout(data) {
  const yAxisLabels = data.map(el => el.y).flat()
  const height = yAxisLabels.length * 35
  return {
            xaxis: xAxis(),
            yaxis: yAxis(),
            autosize: true,
            margin: {
                l: Math.max(...yAxisLabels.map(y => y.length)) * 20,
                r: 20,
            },
            width: 600,
            height: height < 600 ? 600 : height,
            showlegend: true,
            legend: {
                traceorder: 'normal',
                bgcolor: '#E2E2E2',
                bordercolor: '#FFFFFF',
                borderwidth: 2,
                orientation: "h",
            },
        };
}