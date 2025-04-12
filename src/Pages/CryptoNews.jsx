import Header from '../components/Header'
import { useCrypto } from '../components/ChartContext' 
import "../Styles/App.css";
import RollingDisplay from '../components/RollingDisplay'
import Footer from '../components/Footer'
import placeholder from '../assets/placeholderImg.jpg'





export const CryptoNews = () => {
    const { news, cryptoData } = useCrypto()
    console.log(news)

    const setTime = (dateString) => {
        const now = new Date();
        const diffInTime = now - dateString
        
        const diffInMins = Math.floor(diffInTime / (1000 * 60))
        const diffInHours = Math.floor(diffInTime / (1000 * 60 * 60))
        // const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24))
        
        if (diffInMins < 60) {
            return `${diffInMins} minutes ago`
        } else if (diffInHours < 24) {
            return `${diffInHours} hours ago`
        } else {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date)
        }
    }
    

    
    return (
        <>
            <Header />
            { 
            cryptoData ? 
            <RollingDisplay cryptoData={cryptoData} />
            : ""}
            <div className='p-4'>
                <h1 className="text-2xl font-bold mb-4">Latest Crypto News</h1>
                <div className={`grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 gap-x-7 gap-y-7 lg:gap-y-3 h-fit`}>
                    {news?.slice(0, 4)?.map((post, index) => (
                        <a href={post?.url} target="_blank" className={`flex gap-2 h-fit lg:h-auto border hover:border-black p-4 rounded-lg ${index === 0 ? 'flex-col h-fit lg:h-auto lg:row-span-3' : ''}`} key={index}>
                            <div className={`w-[65%] flex flex-col justify-between ${index === 0 ? 'w-full h-[50%] order-2' : ''}`}>
                                <h2 className={`font-semibold capitalize text-green-800 text-lg md:text-xl lg:text-2xl`}>{post?.title}</h2>
                                <p className={`${index === 0 ? 'block mb-2' : 'hidden'}`}>{post?.description}</p>
                                <div className="">
                                    <a href={post?.source?.url} className="text-green-600 hover:text-green-800 font-semibold">{post?.source?.name}</a>
                                    <p>{setTime((post?.publishedAt))}</p>
                                </div>
                            </div>
                            <img src={post?.urlToImage} alt={post?.title} className={`object-cover rounded-lg mb-5 ${index === 0 ? 'w-[35%] h-[50%] order-1 w-full' : 'w-[30%] h-fit'}`}/>
                        </a>
                    ))}
                </div>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 h-auto mt-10 mb-20 lg:mt-14">
                    {news?.slice(4)?.map((post, index) => (
                        <a href={post?.url} target="_blank" className={`border p-4 rounded-lg flex flex-col gap-2 min-h-[400px] border-1 hover:border-black`} key={index}>
                            <img src={post?.urlToImage ? post?.urlToImage : placeholder} alt={post?.title} className={`w-full object-contain rounded mb-5`} />
                            <div className='h-[40%] flex flex-col justify-between'>
                                <h2 className={`font-semibold mb-5 capitalize text-green-800 text-xl`}>{post?.title}</h2>
                                <p className="mb-2 hidden lg:block">{post?.description?.length > 150 ? post?.description?.slice(0, 150) + '...' : post?.description}</p>
                                <div className="flex justify-between">
                                    <a href={post?.source?.url} className="text-green-600 hover:text-green-800 font-semibold">{post?.source?.name}</a>
                                    <p>{setTime((post?.publishedAt))}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            <Footer />
        </>

    )
}