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

            const sortTrending = foundTrending.sort((a, b) => {
                const aIndex = crypTrend.coins.findIndex((trend) => trend.item.id === a.id)
                const bIndex = crypTrend.coins.findIndex((trend) => trend.item.id === b.id)
                return aIndex - bIndex
            })

            console.log("Trending:", sortTrending);
            setTrending(sortTrending);
        }

    }, [crypTrend, cryptoData])

    if (!crypTrend || !crypTrend?.coins || cryptoData?.length === 0) {
        console.log("crypTrend or cryptoData or its properties are undefined")
    }

    
    return (
        <>
          <Header />
          <div className="px-5 lg:px-10 w-full my-5">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-1 lg:mt-5 mb-5">Top Trending Cryptocurrencies Today</h1>
            {trending ? 
                (
                    <p>
                        Discover the top trending cryptocurrencies on CoinGecko. This list is sorted by coins that are most searched for in the last 3 hours. <span>{trending[0]?.name}, {trending[1]?.name} and {trending[2]?.name}</span> are the top 3 trending crypto now. In the past 24 hours, the price of {trending[0]?.name} changed by {trending[0]?.price_change_percentage_24h?.toFixed(2)}%, {trending[1]?.name} price changed by {trending[1]?.price_change_percentage_24h?.toFixed(2)}%, and {trending[2]?.name} price changed by {trending[2]?.price_change_percentage_24h?.toFixed(2)}%.
                    </p>
                ): ""
            }
          </div>
          <div className="max-h-auto py-10 px-0 lg:px-10 text-base cursor-pointer overflow-x-auto">
              <CryptoTable tableData={trending} />
          </div>
          <Footer />
        </>
    )
}