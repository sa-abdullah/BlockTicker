import Header from "../components/Header";
import CryptoTable from "../components/TableRender"
import { useCrypto } from "../components/ChartContext";
import { Link } from 'react-router-dom'
import "../Styles/App.css";
import Footer from '../components/Footer'

const App = () => {
  const { cryptoData, crypTrend, globalData, news, colorChange, getCaretIcon } = useCrypto()

    const formatter = new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "long"
    })

    const trendPrice = (data, id) => {
      const coin = data.find((coin) => coin.id === id) 
      return coin ? coin?.priceChange24h.toFixed(2) : ""
    };


    console.log(cryptoData)

  return (
    <>
      <Header />
      <div className="py-10 box-border w-full">
        <div className="px-10 w-full">
          <h1 className="text-4xl font-semibold mt-10 mb-5">Cryptocurrency Prices By Market Cap</h1>
          {globalData && 
          <p>
            The global cryptocurrency market cap today is <span>{formatter.format(globalData?.totalMarketCap)}</span>, a change of 
            <span className="text-md text-black inline-flex items-center mx-1" style={{color:colorChange(globalData?.marketCapChange)}}>
              {getCaretIcon(globalData?.marketCapChange)}
              {globalData?.marketCapChange.toFixed(2)}%
            </span>in the last 24 hours.
          </p>
          }
          <div className="flex w-full h-[40vh] gap-2 my-10">
            <div className="w-1/3 h-[100%] flex flex-col justify-between">
              <div className="h-[49%] w-full border-3 border-gray-200 rounded-3xl p-6">
                {(!globalData?.totalMarketCap || !globalData?.marketCapChange)
                ? `Loading...`
                : (
                  <p className="flex flex-col text-xl w-full font-semibold">
                    <span className="text-2xl">
                      {Math.round(globalData?.totalMarketCap).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </span>
                    <span className="text-gray-400 flex gap-2 items-center">Market Cap
                      <span className="text-md text-black flex items-center" style={{color:colorChange(globalData?.marketCapChange)}}>
                        {getCaretIcon(globalData?.marketCapChange)}
                        {Math.abs(globalData?.marketCapChange.toFixed(2))}%
                      </span>
                    </span>
                  </p>
                )}
              </div>
              <div className="h-[49%] w-full border-3 border-gray-200 rounded-3xl p-6">
                {(!globalData?.totalVolume)
                  ? `Loading...`
                  : (
                    <p className="flex flex-col text-xl w-1/2 font-semibold">
                      <span className="text-2xl">
                        {Math.round(globalData?.totalVolume).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </span>
                      <span className="text-gray-400 flex gap-2 items-center">24h Trading Volume</span>
                    </p>
                )}
              </div>
            </div>
            <div className="w-1/3 h-[100%] border-3 border-gray-200 rounded-3xl p-3">
              <p className="flex justify-between text-xl font-semibold mb-5">&#128293; Trending <Link to="/trending" className="text-base font-normal hover:text-green-800 cursor-pointer">View More &gt;</Link></p>
              <table className="w-full">
                <tbody className="w-full">
                  {
                    crypTrend?.coins?.slice(0, 3).map((coin) => (
                      <tr className="w-full justify-between" key={coin.item.coin_id}>
                        <td className="">
                          <Link to="/detail/:id" className="flex gap-2 items-center">
                            <img src={coin.item.thumb} alt="" className="w-7"/>
                            {coin.item.name}
                          </Link>
                        </td>
                        <td>${coin.item.data.price.toFixed(2)}
                          <span className="inline-flex items-center mx-1" style={{color: colorChange(trendPrice(cryptoData, coin.item.id))}}>
                            {getCaretIcon(trendPrice(cryptoData, coin.item.id))}
                            {Math.round(trendPrice(cryptoData, coin.item.id))}%
                          </span>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <div className="w-1/3 h-[100%] border-3 border-gray-200 rounded-3xl p-3">
              <p className="flex justify-between text-xl font-semibold mb-5">&#128640; News Today <Link to="/news" className="text-base font-normal hover:text-green-800 cursor-pointer">View More &gt;</Link></p>
              <table className="w-full">
                <tbody className="w-full">
                  {
                    news?.articles?.slice(0, 3).map((article, index) => (
                      <tr className="w-full justify-between" key={index}>
                        <td className="renderNews text-md font-semibold">{article.title.length > 45 ? article.title.slice(0, 45) + "..." : article.title}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="min-w-[100vw] max-h-auto flex flex-col items-center gap-4 p-10 text-base overflow-none cursor-pointer">
          <CryptoTable tableData={cryptoData} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
