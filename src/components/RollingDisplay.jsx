import { useCrypto } from "./ChartContext"


const RollingDisplay = ({ cryptoData }) => {
    const { colorChange, getCaretIcon } = useCrypto()


    return (
        <div className="overflow-hidden whitespace-nowrap bg-gray-200 py-2">
            <div className="marquee">
              <span className="text-lg font-bold flex gap-20">
                {
                    cryptoData?.slice(0, 10).map((coin) => (
                        <span className="text-lg font-bold flex" key={coin?.id}>
                            {coin?.name}
                            <span className="flex items-center px-2" style={{color:colorChange(coin?.priceChange24h)}}>
                                {getCaretIcon(coin?.priceChange24h)}
                                {Math.abs(coin?.priceChange24h.toFixed(1))}%
                            </span>
                        </span>
                    ))
                }
              </span>
            </div>
        </div>
    )
}

export default RollingDisplay