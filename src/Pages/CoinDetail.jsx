import Header from '../components/Header'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { useCrypto } from '../components/ChartContext'
import PriceRangeSlider from '../components/PriceRangeSlider'
import "../Styles/App.css"
import Axios from 'axios'
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from 'react'
import CryptoSparkline from '../components/CryptoSpark'
import { TopDetail, MidDetail, GeneralDetail } from '../components/DetailInfo'
import RollingDisplay from '../components/RollingDisplay'



export const CoinInfo = () => {
    const [info, setInfo] = useState()
    const [chartData, setChartData] = useState()
    const { cryptoData, getCaretIcon, colorChange } = useCrypto()
    const { id } = useParams()
    const [days, setDays] = useState(7)
    const [chartState, setChartState] = useState(null)
    const [active, setActive] = useState("prices")
    const [styleInt, setStyleInt] = useState(7)
    
    const DISPLAY_API = `https://api.coingecko.com/api/v3/coins/${id}`

    const CHART_API = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`;
    const FetchInfo = async () => {

        try {
            const res = await Axios.get(DISPLAY_API)
            console.log(res.data)
            console.log(typeof res.data)
            setInfo({
                    id: res?.data?.id, 
                    name: res?.data?.name, 
                    image: res?.data?.image?.small,  
                    symbol:res?.data?.symbol, 
                    marketCapUSD: res?.data?.market_data?.market_cap.usd,
                    marketCapRank: res?.data?.market_data?.market_cap_rank,  
                    currPriceUSD: res?.data?.market_data?.current_price.usd,  
                    priceChange24h: res?.data?.market_data?.price_change_percentage_24h,  
                    priceChange7d: res?.data?.market_data?.price_change_percentage_7d,  
                    priceChange30d: res?.data?.market_data?.price_change_percentage_30d,  
                    low24h: res?.data?.market_data?.low_24h.usd,  
                    high24h: res?.data?.market_data?.high_24h.usd, 
                    fdvUSD: res?.data?.market_data?.fully_diluted_valuation.usd, 
                    fdvRatio: res?.data?.market_data.market_cap_fdv_ratio,
                    totalVolUSD: res?.data?.market_data?.total_volume.usd,
                    circulateSupply: res?.data?.market_data?.circulating_supply,
                    totalSupply: res?.data?.market_data?.total_supply,
                    maxSupply: res?.data?.market_data?.max_supply,
                    maxSupplyInfinite: res?.data?.market_data?.max_supply_infinite, 
                    homepage: res?.data?.links?.homepage, 
                    site: res?.data?.links?.blockchain_site,
                    subReddit: res?.data?.links?.subreddit_url,
                    facebook: res?.data?.links?.facebook_username, 
                    twitter: res?.data?.links?.twitter_screen_name, 
                    forumURL: res?.data?.links?.official_forum_url, 
                    github: res?.data?.links?.repos_url?.github, 
                    bitbucket: res?.data?.links?.repos_url?.bitbucket, 
                    categories: res?.data?.categories,
                    athChangePercent: res?.data?.market_data.ath_change_percentage.usd,
                    ath: res?.data?.market_data.ath.usd, 
                    atlChangePercent: res?.data?.market_data.atl_change_percentage.usd, 
                    atl: res?.data?.market_data.atl.usd, 
                    description: res?.data?.description?.en
            })

        } catch(err) {
            console.error("Info Error:", err)
        }

        try {
            const { data } = await Axios.get(CHART_API)
            setChartData(data)
      
          } catch (error) {
            console.error("Error fetching history data", error)
          }
    }

    console.log(info)

    useEffect(() => {
        FetchInfo()
        if (chartData?.prices) {
            setChartState(chartData.prices)
        }

        const interval = setInterval(FetchInfo, 6000)
        return () => clearInterval(interval)
    }, [chartData, days])

    console.log(chartData)

    const handleChart = (key) => {
        if (chartData) { 
            setChartState(chartData[key])
            setActive(key)
        }
    }

    const handleDaysChange = (newDays) => {
        setDays(newDays)
        setStyleInt(newDays)
    }

    console.log(info)
    console.log(chartData)

    console.log(cryptoData)
    console.log(id)

    return (

        <>
            <Header />
            <RollingDisplay cryptoData={cryptoData}/>
            {<div className=" flex-col lg:flex-row w-full p-4 hidden lg:flex">
                <div className="w-full lg:w-[35%] flex flex-col gap-5">
                    {
                        info?.name ? 
                        (
                            <div className="flex items-center gap-3">
                                <img className="w-15"src={info?.image} alt="" />
                                <p className="text-xl font-semibold">{info?.name}</p>
                                <p className="text-base">{info?.symbol?.toUpperCase()} Price</p>
                                <span className="border-1 p-1 rounded-lg">#{info?.marketCapRank}</span>
                            </div>
                        ) : ""
                    }
                    {
                        info?.currPriceUSD ? 
                        (
                            <div className="flex gap-5">
                                <span className="text-5xl font-semibold">${info?.currPriceUSD}</span>
                                <span className="text-2xl font-semibold text-black flex items-center" style={{color:colorChange(info?.priceChange24h)}}>
                                    {getCaretIcon(info?.priceChange24h)}
                                    {Math.abs(info?.priceChange24h.toFixed(2))}% 
                                </span>
                            </div>
                        ) : ""
                    }
                    {(info?.low24h && info?.high24h) ? (<PriceRangeSlider low={Number(info?.low24h) || 0} high={Number(info?.high24h)|| 100} current={Number(info?.currPriceUSD) || 50} />) : (<p>Loading...</p>)}
                    <ul className="max-w-lg">
                        <TopDetail info={info} />        
                    </ul>
                    <div>
                        <p className="text-2xl font-semibold px-5 my-5">Info</p>
                        <ul className="max-w-lg">
                            <MidDetail info={info} />     
                        </ul>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold px-5 my-5">{info?.name} Historical Price</p>
                        <ul className="max-w-lg">
                            <GeneralDetail info={info}/>
                        </ul>
                    </div>
                </div>
                <div className="w-full lg:w-[65%]">
                    <h2 className="text-4xl text-green-800 text-center my-5 font-semibold">{info?.name} Market Overview</h2>
                    <div className="my-5 flex justify-between border-t-1 px-2">
                        <div className="flex gap-3 mb-2 pt-2 justify-center">
                            {chartData?.prices ? <button type="button" className={`px-4 py-2 rounded-lg ${active === "prices" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`} onClick={() => handleChart("prices") }>Prices</button> : ""}  
                            {chartData?.market_caps ? <button type="button" className={`px-4 py-2 rounded-lg ${active === "market_caps" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`} onClick={() => handleChart("market_caps")}>Market Cap</button> : ""}
                            {chartData?.total_volumes ? <button type="button" className={`px-4 py-2 rounded-lg ${active === "total_volumes" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`} onClick={() => handleChart("total_volumes")}>Total Volume</button> : ""}
                        </div>
                        <div className="flex gap-3 mb-2 pt-2 justify-center">
                            <button type="button" className={`px-4 py-2 rounded-lg ${styleInt === 7 ? "bg-red-800 text-white" : "bg-gray-200 text-black"}`} onClick={() => {handleDaysChange(7)  ? handleDaysChange(7)  : "Loading..."}}>Last 7 Days</button>  
                            <button type="button" className={`px-4 py-2 rounded-lg ${styleInt === 14 ? "bg-red-800 text-white" : "bg-gray-200 text-black"}`} onClick={() => {handleDaysChange(14) ? handleDaysChange(14) : "Loading..."}}>Last 14 Days</button>
                            <button type="button" className={`px-4 py-2 rounded-lg ${styleInt === 30 ? "bg-red-800 text-white" : "bg-gray-200 text-black"}`} onClick={() => {handleDaysChange(30) ? handleDaysChange(30) : "Loading..."}}>Last 30 Days</button>
                        </div>
                    </div>
                    <div className="h-[100vh] bg-yellow-100">
                        {chartData?.prices ? (<CryptoSparkline prices={chartState} />) : <p className="flex items-center justify-center">Loading...</p>}
                    </div>
                    {
                        info?.description ? 
                        (
                            <div className="max-h-full">
                                <h2 className="text-4xl text-green-800 text-center my-10 font-semibold">About {info?.name}</h2>
                                <div className="prose prose-lg max-w-full text-gray-800">
                                    <MarkdownRenderer content={info?.description}/>
                                </div>
                            </div>
                        ) : ""
                    }
                </div>
            </div>}

            {<div className="flex lg:hidden flex-col w-[100vw] p-4 gap-10">
                <div className="w-full flex flex-col">
                    {
                        info?.name ? 
                        (
                            <div className="flex items-center gap-3 mb-10">
                                <img className="w-15"src={info?.image} alt="" />
                                <p className="text-xl font-semibold">{info?.name}</p>
                                <p className="text-base">{info?.symbol?.toUpperCase()} Price</p>
                                <span className="border-1 p-1 rounded-lg">#{info?.marketCapRank}</span>
                            </div>
                        ) : ""
                    }
                    {
                        info?.currPriceUSD ? 
                        (
                            <div className="flex gap-4">
                                <span className="text-5xl font-semibold">${info?.currPriceUSD}</span>
                                <span className="text-2xl font-semibold text-black flex items-center" style={{color:colorChange(info?.priceChange24h)}}>
                                    {getCaretIcon(info?.priceChange24h)}
                                    {Math.abs(info?.priceChange24h.toFixed(2))}% 
                                </span>
                            </div>
                        ) : ""
                    }
                    {(info?.low24h && info?.high24h) ? (<PriceRangeSlider low={Number(info?.low24h) || 0} high={Number(info?.high24h)|| 100} current={Number(info?.currPriceUSD) || 50} />) : (<p>Loading...</p>)}
                </div>
                <div className="w-full">
                    <h2 className="text-2xl text-green-800 my-5 font-semibold">{info?.name} Market Overview</h2>
                    <div className="my-5 flex-col md:flex-row justify-between border-t-1 px-2">
                        <div className="flex gap-3 mb-2 pt-2">
                            {chartData?.prices ? <button type="button" className={`px-4 py-2 text-sm md:text-base rounded-lg ${active === "prices" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`} onClick={() => handleChart("prices") }>Prices</button> : ""}  
                            {chartData?.market_caps ? <button type="button" className={`px-4 py-2 text-sm md:text-base rounded-lg ${active === "market_caps" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`} onClick={() => handleChart("market_caps")}>Market Cap</button> : ""}
                            {chartData?.total_volumes ? <button type="button" className={`px-4 py-2 text-sm md:text-base rounded-lg ${active === "total_volumes" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`} onClick={() => handleChart("total_volumes")}>Total Volume</button> : ""}
                        </div>
                        <div className="flex gap-3 mb-2 pt-2">
                            <button type="button" className={`px-4 py-2 text-sm md:text-base rounded-lg ${styleInt === 7 ? "bg-red-800 text-white" : "bg-gray-200 text-black"}`} onClick={() => {handleDaysChange(7)  ? handleDaysChange(7)  : "Loading..."}}>7 Days</button>  
                            <button type="button" className={`px-4 py-2 text-sm md:text-base rounded-lg ${styleInt === 14 ? "bg-red-800 text-white" : "bg-gray-200 text-black"}`} onClick={() => {handleDaysChange(14) ? handleDaysChange(14) : "Loading..."}}>14 Days</button>
                            <button type="button" className={`px-4 py-2 text-sm md:text-base rounded-lg ${styleInt === 30 ? "bg-red-800 text-white" : "bg-gray-200 text-black"}`} onClick={() => {handleDaysChange(30) ? handleDaysChange(30) : "Loading..."}}>30 Days</button>
                        </div>
                    </div>
                    <div className="h-[50vh] bg-yellow-100">
                        {chartData?.prices ? (<CryptoSparkline prices={chartState} />) : <p className="flex items-center justify-center">Loading...</p>}
                    </div>
                </div>
                <div className="w-full flex flex-col gap-5">
                    <ul className="max-w-lg">
                        <TopDetail info={info} />        
                    </ul>
                    <div>
                        <p className="text-2xl font-semibold px-5 my-5">Info</p>
                        <ul className="max-w-lg">
                            <MidDetail info={info} />     
                        </ul>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold px-5 my-5">{info?.name} Historical Price</p>
                        <ul className="max-w-lg">
                            <GeneralDetail info={info}/>
                        </ul>
                    </div>
                </div>
                <div className="w-full">
                    {
                        info?.description ? 
                        (
                            <div className="max-h-full ">
                                <h2 className="text-2xl text-green-800 text-center font-semibold">About {info?.name}</h2>
                                <div className="prose prose-lg max-w-full text-gray-800">
                                    <MarkdownRenderer content={info?.description}/>
                                </div>
                            </div>
                        ) : ""
                    }
                </div>
            </div>}
            <Footer />
        </>
        
    )
}


// const LoadingSpinner = () => {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
// };
  



const MarkdownRenderer = ({ content }) => {
  return <ReactMarkdown>{content}</ReactMarkdown>;
};






