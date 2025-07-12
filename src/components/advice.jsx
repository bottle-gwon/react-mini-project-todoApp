import { useEffect, useState } from "react";

const useFetch = (url) =>{
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setData(res)
          setIsLoading(false)
        });
      
    }, [url]);
  return [isLoading, data]
}


const Advice = () =>{
  const [isLoading, data] = 
  useFetch("https://korean-advice-open-api.vercel.app/api/advice")
  return <>
    {data && (
      <>
        <div className='advice'>{data.message}</div>
        <div className='advice'>-{data.author}-</div>
      </>
    )}
  </>
}

export default Advice