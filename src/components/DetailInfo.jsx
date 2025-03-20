import { useState } from 'react'
import { DiBitbucket } from "react-icons/di"
import { FaChevronDown, FaFacebook, FaXTwitter, FaRedditAlien, FaMagnifyingGlass, FaGithub, FaInfo, FaInfinity } from 'react-icons/fa6'
import { useCrypto } from "./ChartContext"


const TopDetail = ({ info }) => {

    return (
        <>
            {
                info?.marketCapUSD ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">Market Cap 
                            <FaInfo className="text-sm"/>
                        </span> 
                        <span>${info?.marketCapUSD}</span>
                    </div>
                ) : ""
            }    
            {
                info?.fdvUSD ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">Fully Diluted Valuation 
                            <FaInfo className="text-sm"/>
                        </span> 
                        <span>${info?.fdvUSD}</span>
                    </div>
                ) : ""
            }    
            {
                info?.fdvRatio ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">FDV Ratio 
                            <FaInfo className="text-sm"/>
                        </span> 
                        <span>{info?.fdvRatio}</span>
                    </div>
                ) : ""
            }    
            {
                info?.totalVolUSD ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">24 Hour Trading Vol 
                            <FaInfo className="text-sm"/>
                        </span> 
                        <span>${info?.totalVolUSD}</span>
                    </div>
                ) : ""
            }    
            {
                info?.circulateSupply ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">Circulating Supply 
                            <FaInfo className="text-sm"/>
                        </span> 
                        <span>{info?.circulateSupply.toFixed(1)}</span>
                    </div>
                ) : ""
            }    
            {
                info?.totalSupply ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">Total Supply 
                            <FaInfo className="text-sm"/>
                        </span> 
                        <span>{info?.totalSupply.toFixed(1)}</span>
                    </div>
                ) : ""
            }    
            {info?.maxSupply !== null || info?.maxSupplyInfinite ? 
                (<div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                    <span className="flex gap-1 font-semibold items-center text-md">Max Supply <FaInfo className="text-sm"/></span> 
                    <span>
                        {info?.maxSupplyInfinite ? 
                            <FaInfinity/> : 
                            info?.maxSupply
                        }
                    </span>
                </div>) : ""
            }
        </>
    )
}




const MidDetail = ({ info }) => {
    
    const wallets = [
        ["Ledger", "https://shop.ledger.com/"], 
        ["Trezor", "https://trezor.io/"], 
        ["Safepal", "https://www.safepal.com/en/store/"], 
        ["Ellipal", "https://www.ellipal.com/"]
    ]

    const cleanURL = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.(com|org))/
        const match = url.match(regex)
        return match ? match[1] : null;
    }

    const exURL = (urls) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+)\./;
        return urls
            .map((url) => {
                const match = url.match(regex)
                return match ? [match[1], url] : [];
            })
            .filter(Boolean)
    }

    return (
        <>
            {
                info?.homepage?.length ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">Website </span> 
                        {info?.homepage?.length ? (<a href={info?.homepage[0]} target="_blank" className="py-2 px-3 rounded-lg bg-gray-100 hover:bg-gray-300">{cleanURL(info?.homepage[0])}</a>) : (<span>N/A</span>)}
                    </div>
                ) : ""
            } 
            {
                info?.site ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">Explorers </span>
                        <div className="rounded-lg bg-gray-100 flex items-center text-base">
                            {info?.site ? <a href={exURL((info?.site) || [])[0][1]} target="_blank" className="py-2 px-3 hover:bg-gray-300 rounded-lg capitalize">{exURL((info?.site) || [])[0][0]}</a> : "Loading"}
                            <hr className="border-l-3 border-gray-400 h-full" />
                            <DropdownCaret vals={exURL((info?.site) || [])} />
                        </div> 
                    </div>
                ) : ""
            }
            {
                info?.site && wallets ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">Wallets </span>
                        <div className="rounded-lg bg-gray-100 flex items-center text-base">
                            {wallets ? <a href={wallets[0][1]} target="_blank" className="py-2 px-3 hover:bg-gray-300 rounded-lg capitalize">{wallets[0][0]}</a> : "Loading"}
                            <hr className="border-l-3 border-gray-400 h-full" />
                            <DropdownCaret vals={wallets} />
                        </div> 
                    </div>
                ) : ""
            }
            {
                info?.links ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">Community </span>
                        <div className="rounded-lg flex items-center text-base gap-2">
                            {info?.subReddit ? <a href={info?.subReddit} target="_blank" className="py-2 px-3 bg-gray-100 hover:bg-gray-300 rounded-lg capitalize flex items-center gap-1"><FaRedditAlien /> Reddit</a> : ""}
                            {info?.facebook ? <a href={`https://www.facebook.com/${info?.facebook}`} target="_blank" className="py-2 px-3 bg-gray-100 hover:bg-gray-300 rounded-lg capitalize flex items-center gap-1"><FaFacebook /> Facebook</a> : ""}
                            {info?.twitter ? <a href={`https://twitter.com/${info?.twitter}`} target="_blank" className="py-2 px-3 bg-gray-100 hover:bg-gray-300 rounded-lg capitalize flex items-center gap-1"><FaXTwitter /> Twitter</a> : ""}
                        </div> 
                    </div>
                ) : ""
            }
            {
                info?.forumURL.length ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">Search on </span>
                        <div className="rounded-lg flex items-center text-base gap-2">
                            <a href={info?.forumURL[0]} target="_blank" className="py-2 px-3 bg-gray-100 hover:bg-gray-300 rounded-lg capitalize flex items-center gap-1"><FaMagnifyingGlass /> Forum</a> 
                        </div> 
                    </div>
                )
                : ""
            }
            {
                (info?.forumURL?.length || info?.links?.repos_url?.bitbucket?.length) ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">Source code </span>
                        <div className="rounded-lg flex items-center text-base gap-2">
                            {info?.links?.repos_url.github.length ? <a href={info?.links?.repos_url.github[0]} target="_blank" className="py-2 px-3 bg-gray-100 hover:bg-gray-300 rounded-lg capitalize flex items-center gap-1"><FaGithub /> Github</a> : ""}
                            {info?.links?.repos_url.bitbucket.length ? <a href={info?.links?.repos_url.bitbucket[0]} target="_blank" className="py-2 px-3 bg-gray-100 hover:bg-gray-300 rounded-lg capitalize flex items-center gap-1"><DiBitbucket /> BitBucket</a> : ""}
                        </div> 
                    </div>
                )
                : ""
            }
            {
                info?.categories.length ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">Categories </span>
                        <div className="rounded-lg bg-gray-100 flex items-center text-base">
                            <div className="py-2 px-3 hover:bg-gray-300 rounded-lg capitalize flex gap-1"><span>{info?.categories.length}</span> categories</div>
                            <hr className="border-l-3 border-gray-400 h-full" />
                            <DropdownCaret vals={info?.categories} />
                        </div> 
                    </div>
                ) 
                : ""
            }
        </>
    )
}



const GeneralDetail = ({ info }) => {
    const { colorChange, getCaretIcon } = useCrypto()

    return (
        <>
            {
                info?.low24h ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">24h Range</span> 
                        <span>${info?.low24h.toFixed(2)} - ${info?.high24h.toFixed(2)}</span>
                    </div>
                ) : ""
            }
            {
                info?.priceChange7d ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">7d Change in %</span> 
                        <span className="flex items-center" style={{color:colorChange(info?.priceChange7d ? info?.priceChange7d : "black")}}>
                            {Math.abs(info?.priceChange7d).toFixed(2)}% 
                            {getCaretIcon(info?.priceChange7d)}
                        </span>
                    </div>
                ) : ""
            }
            {
                info?.priceChange30d ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">30d Change in %</span> 
                        <span className="flex items-center" style={{color:colorChange(info?.priceChange30d)}}>
                            {Math.abs(info?.priceChange30d).toFixed(2)}% 
                            {getCaretIcon(info?.priceChange30d)}
                        </span>
                    </div>
                ) : ""
            }
            {
                info?.athChangePercent ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">
                            All-Time High
                        </span> 
                        <span className="flex items-center gap-4">
                            ${Math.round(info?.ath)}
                            <span className="flex items-center" style={{color:colorChange(info?.athChangePercent)}}>
                                {Math.abs(info?.athChangePercent.toFixed(1))}%
                                {getCaretIcon(info?.athChangePercent.usd)}
                            </span>
                        </span>
                    </div>
                ) : ""
            }
            {
                info?.atlChangePercent ? 
                (
                    <div className="flex justify-between border-b-2 border-gray-300 py-5 text-gray-700 px-5">
                        <span className="flex gap-1 font-semibold items-center text-md">
                            All-Time Low
                        </span> 
                        <span className="flex items-center gap-4">
                            ${Math.round(info?.atl)}
                            <span className="flex items-center" style={{color:colorChange(info?.atlChangePercent)}}>
                                {Math.abs(info?.atlChangePercent.toFixed(1))}%
                                {getCaretIcon(info?.atlChangePercent)}
                            </span>
                        </span>
                    </div>
                ) : ""
            }
        </>
    )
}


const DropdownCaret = ({ vals }) => {
    const [isOpen, setIsOpen] = useState(false)

    const safeVals = Array.isArray(vals) ? vals : [];
    const formattedVals = safeVals.every((item) => Array.isArray(item)) ? safeVals : safeVals.map(name => [name, "#"])
        

    return (
        <details className="cursor-pointer relative py-2 px-3 w-full hover:bg-gray-300" onToggle={(e) => setIsOpen(e.target.open)}>
            <summary className="list-none"><FaChevronDown className={`transition-transform duration-300 hover:text-red-600 ${isOpen ? 'rotate-180 text-green-700' : ""}`}/></summary>
            <ul className="w-[300px] absolute top-11 border-1 right-0 rounded-lg bg-gray-100 flex flex-col gap-1 items-center">
                {formattedVals.map(([name, url], index) => (
                    <li key={index} className="w-full py-2 px-3 rounded-lg bg-gray-100 hover:bg-gray-300 flex gap-1 items-center"><a href={url} target="_blank">{name}</a></li>
                ))}
            </ul>
        </details>
    )
}




export { MidDetail, TopDetail, GeneralDetail } 



