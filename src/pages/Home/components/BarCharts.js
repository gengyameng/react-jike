// 柱状图组件
import { createRef, useEffect } from 'react'
import * as echarts from 'echarts';


const BarChart = ({title}) => {
  const chartRef= createRef(null)
  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: ['Angular', 'Vue', 'React']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [30, 110,  130],
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);
  }, [])
  return (
    <>
      <div ref={chartRef}  style={{ width: '500px', height: '400px'}}>
      </div>
    </>
  )
}

export default BarChart