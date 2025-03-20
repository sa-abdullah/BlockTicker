import { useCrypto } from "../components/ChartContext"
import { useEffect, useState } from "react"
import CryptoTable from '../components/TableRender'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const TrendingCrypto = () => {
    const { crypTrend, cryptoData } = useCrypto()
    const [trending, setTrending] = useState()

    useEffect(() => {
        if (crypTrend && crypTrend?.coins && cryptoData?.length > 0) {
            console.log("CrypTrend:", crypTrend);
            console.log("CryptoData:", cryptoData.slice(0, 10));

            const foundTrending = cryptoData?.filter((coin) => crypTrend?.coins?.some((trend) => trend?.item?.id === coin?.id))

            console.log("Trending:", foundTrending);
            setTrending(foundTrending);
        }

    }, [crypTrend, cryptoData])

    if (!crypTrend || !crypTrend.coins || cryptoData.length === 0) {
        console.log("crypTrend or cryptoData or its properties are undefined");
        return <div>Loading...</div>; 
    }

    
    return (
        <>
          <Header />
          <div className="px-10 w-full mb-5">
            <h1 className="text-4xl font-semibold mt-10 mb-5">Top Trending Cryptocurrencies Today</h1>
            {trending &&<p>Discover the top trending cryptocurrencies on CoinGecko. This list is sorted by coins that are most searched for in the last 3 hours. <span>{trending[0]?.name}, {trending[1]?.name} and {trending[2]?.name}</span> are the top 3 trending crypto now. In the past 24 hours, the price of {trending[0].name} changed by {trending[0].price_change_percentage_24h.toFixed(2)}%, {trending[1].name} price changed by {trending[1].price_change_percentage_24h.toFixed(2)}%, and {trending[2].name} price changed by {trending[2].price_change_percentage_24h.toFixed(2)}%.
            </p>}
          </div>
          <div className="min-w-[100vw] max-h-[80vh] flex flex-col items-center gap-4 p-10 text-base overflow-scroll cursor-pointer">
              <CryptoTable tableData={trending} />
          </div>
          <Footer />
        </>
    )
}