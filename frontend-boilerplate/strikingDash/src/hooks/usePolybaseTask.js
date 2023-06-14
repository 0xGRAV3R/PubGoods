import { getTasks } from '../config/database/polybase'

const { useState } = require('react');
const { useEffect } = require('react');

const usePolybaseTask = () => {
  const [data, setData] = useState({});

  useEffect(async () => {
    console.log('usePolybaseTask')
    getTasks().then((data)=>setData(data))


    // if (ref.current) {
    //   const { data } = ref.current.chartInstance;
    //   setChartData(data);
    // }
  }, []);

  return { data: data.data };
};

export default usePolybaseTask;
