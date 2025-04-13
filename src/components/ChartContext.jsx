import Axios from "axios";
import { useState, useContext, createContext, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'


const API_URL = "https://api.coingecko.com/api/v3/coins/markets";

const TREND_URL = "https://api.coingecko.com/api/v3/search/trending"

const GLOBAL_URL = "https://api.coingecko.com/api/v3/global"

const CryptoContext = createContext()

export const CryptoProvider = ({children}) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [crypTrend, setCrypTrend] = useState({ coins: []})
  const [globalData, setGlobalData] = useState()
  const [news, setNews] = useState([])


  const FetchCrypto = async () => {
    

    try {

      const res = await Axios.get(API_URL, {
          params : {
              vs_currency: "usd", 
              // per_page: 10, 
              order: "market_cap_desc",
              // page: 1, 
              sparkline: true, 
          }
  
      });
      setCryptoData(
        res?.data?.map(({ id, name, symbol, image, current_price, market_cap, price_change_percentage_24h, market_cap_rank, circulating_supply, total_volume, last_updated, sparkline_in_7d }) => ({
          id,
          name,
          symbol,
          image,
          curPrice: current_price,
          marketCap: market_cap,
          marketCapRank: market_cap_rank,
          priceChange24h: price_change_percentage_24h,
          sparkline7D: sparkline_in_7d,
          circulatingSupply: circulating_supply, 
          totalVol: total_volume,
          lastUpdated: last_updated
        }))
      )
      console.log(cryptoData) 
  
    } catch (error) {
      console.error("Error fetching crypto rate:", error);
    }


    try {
      const resTrend = await Axios.get(TREND_URL, {
  
        params : {
          per_page: 2, 
          page: 1
        }
  
      });
      setCrypTrend(resTrend.data)
  
    } catch (err) {
      console.error("Error fetching trend data:", err)
    }


    try {
      const resGlobal = await Axios.get(GLOBAL_URL, {
        params : {
          sparkline: true
        }
  
      })
      setGlobalData({
          totalMarketCap: resGlobal.data.data.total_market_cap.usd,
          marketCapChange: resGlobal.data.data.market_cap_change_percentage_24h_usd,
          totalVolume: resGlobal.data.data.total_volume.usd,
      })
  
    } catch (err) {
  
      console.error("Error fetching global data:", err)
    }

    try {
      const CRYPTO_NEWS_API = `http://localhost:5000/api/news`
      const resNews = await Axios.get(CRYPTO_NEWS_API)
      setNews(resNews?.data?.articles)

    } catch (error) {
        console.error("Error fetching news data:", error);
    }

  };

  useEffect(() => {
    FetchCrypto()
    const interval = setInterval(FetchCrypto, 60000)
    return () => clearInterval(interval)
  }, []);


  const getCaretIcon = (change) => {
      return change > 0 ? <FaCaretUp /> : <FaCaretDown />
    }
  const sparkColor = (coin) => {
    const sparkPrice = coin?.sparkline7D?.price
    if (!sparkPrice || sparkPrice.length < 2) return "gray";
    return sparkPrice[sparkPrice?.length - 1] > sparkPrice[0] ? "green" : "red"
  }
  const colorChange = (val) => val > 0 ? "green" : "red";

  const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  };

  return (
    <CryptoContext.Provider value={{ cryptoData, crypTrend, globalData, news, getCaretIcon, sparkColor, colorChange, LoadingSpinner }}>
      {children}
    </CryptoContext.Provider>
  )
}

export const useCrypto = () => useContext(CryptoContext)