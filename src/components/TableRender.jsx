import { Sparklines, SparklinesLine, SparklinesSpots} from 'react-sparklines'
import { useCrypto } from "../components/ChartContext";
import { useNavigate } from 'react-router-dom'


const CryptoTable = ({ tableData }) => {
    const { getCaretIcon, sparkColor, colorChange } = useCrypto();
    
    const navigate = useNavigate()
// const formatter = new Intl.NumberFormat("en-US", {
        //   notation: "compact",
        //           compactDisplay: "long"
        // })
    
        // const trendPrice = (data, id) => {
        //   const coin = data.find((coin) => coin.id === id) 
        //   // console.log("trendPrice Lookup:", { id, coin })
        //   return coin ? coin.priceChange24h.toFixed(2) : ""
        // };

    return (
        <table className="min-w-full border-separate border-spacing-1 table-auto">
            <thead className="bg-gray-800 text-white text-center">
              <tr>
                <th className="sticky left-0 min-w-[60px] bg-blue-900 z-20 whitespace-nowrap">Rank</th>
                <th className="min-w-[200px] lg:min-w-fit sticky left-[60px] bg-blue-900 z-10 whitespace-nowrap">Name</th>
                <th className="min-w-[150px] lg:min-w-fit bg-blue-900 whitespace-nowrap">Price</th>
                <th className="min-w-[150px] lg:min-w-fit bg-blue-900 whitespace-nowrap">24h Price %</th>
                <th className="min-w-[150px] lg:min-w-fit bg-blue-900 whitespace-nowrap">Last 7 Days</th>
                <th className="min-w-[150px] lg:min-w-fit bg-blue-900 whitespace-nowrap">Market Cap</th>
                <th className="min-w-[150px] lg:min-w-fit bg-blue-900 whitespace-nowrap">Available Supply</th>
                <th className="min-w-[150px] lg:min-w-fit bg-blue-900 whitespace-nowrap">Volume (24Hr)</th>
                <th className="min-w-[150px] lg:min-w-fit bg-blue-900 whitespace-nowrap">Last Updated</th>
              </tr>
            </thead>
            <tbody className="text-center hover:bg-red-500">
              {
                tableData ? (
                  tableData?.slice(0, 100).map((coin) => (
                    <tr onClick={() => navigate(`/detail/${coin.id}`)} className="bg-gray-100 cursor-pointer" key={coin.id}>
                      <td className="sticky left-0 min-w-[60px] z-20">{coin?.marketCapRank}</td>
                      <td className="align-middle h-full min-w-[200px] lg:min-w-fit sticky left-[60px] z-10">
                        <div className="flex space-x-4 min-w-[100px]">
                          <img src={coin?.image} alt={coin?.name} className="w-6 h-6"/> 
                          <span>{coin?.name.length > 20 ? coin?.name.slice(0, 20) + "..." : coin?.name}</span>
                          <span className="text-gray-600">{coin?.symbol?.toUpperCase()}</span>
                        </div>
                      </td>
                      <td className="min-w-[150px] lg:min-w-fit"><p>{coin?.curPrice?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p></td>
                      <td className="align-center min-w-[150px] lg:min-w-fit" style={{color:colorChange(coin?.priceChange24h)}}>
                        <div className="flex justify-center items-center gap-2">
                          <span>{getCaretIcon(coin?.priceChange24h)}</span><span>{Math.abs(coin?.priceChange24h?.toFixed(1))}%</span>
                        </div>
                      </td>
                      <td className="min-w-[150px] lg:min-w-fit">
                        <Sparklines data={Array.isArray(coin?.sparkline7D.price) ? coin?.sparkline7D.price : []} width={100} height={30} margin={5} >
                          <SparklinesLine color={sparkColor(coin)} style={{ fill: "url(#gradient)" }}/>
                          <SparklinesSpots />
                        </Sparklines>
                      </td>
                      <td className="min-w-[150px] lg:min-w-fit">{coin?.marketCap?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
                      <td className="min-w-[150px] lg:min-w-fit">{coin?.circulatingSupply?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
                      <td className="min-w-[150px] lg:min-w-fit">{coin?.totalVol?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
                      <td className="min-w-[150px] lg:min-w-fit">{Math.ceil((new Date() - new Date(coin?.lastUpdated))/ 60000)} Min</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-4 font-semibold">Loading...</td>
                  </tr>
                )
              }

            </tbody>
        </table>
    )
}

export default CryptoTable