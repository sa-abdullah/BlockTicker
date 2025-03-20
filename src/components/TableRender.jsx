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
        <table className="w-full border-separate border-spacing-1 overflow-scroll">
            <thead className="bg-gray-800 text-white text-center">
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Price</th>
                <th>24h Price %</th>
                <th>Last 7 Days</th>
                <th>Market Cap</th>
                <th>Available Supply</th>
                <th>Volume (24Hr)</th>
                <td>Last Updated</td>
              </tr>
            </thead>
            <tbody className="text-center">
              {
                tableData ? (
                  tableData?.slice(0, 100).map((coin) => (
                    <tr onClick={() => navigate(`/detail/${coin.id}`)} className="bg-gray-100 cursor-pointer" key={coin.id}>
                      <td className="font-bold">{coin?.marketCapRank}</td>
                      <td className="flex items-center gap-2">
                        <img src={coin?.image} alt={coin?.name} className="w-6 h-6"/> 
                        {coin?.name}
                        <p className="text-gray-600">{coin?.symbol?.toUpperCase()}</p>
                      </td>
                      <td>{coin?.curPrice?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
                      <td style={{color:colorChange(coin?.priceChange24h)}} className="flex gap-2 items-center">
                        {getCaretIcon(coin?.priceChange24h)}
                        {Math.abs(coin?.priceChange24h?.toFixed(1))}%</td>
                      <td>
                        <Sparklines data={Array.isArray(coin?.sparkline7D.price) ? coin?.sparkline7D.price : []} width={100} height={30} margin={5} >
                          <SparklinesLine color={sparkColor(coin)} style={{ fill: "url(#gradient)" }}/>
                          <SparklinesSpots />
                        </Sparklines>
                      </td>
                      <td>{coin?.marketCap?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
                      <td>{coin?.circulatingSupply?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
                      <td>{coin?.totalVol?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
                      <td>{Math.ceil((new Date() - new Date(coin?.lastUpdated))/ 60000)} Min</td>

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