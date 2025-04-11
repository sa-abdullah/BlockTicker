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
                <div className={`grid grid-cols-1 md:grid-cols-2 grid-rows-3 gap-x-7 gap-y-3 h-[100vh]`}>
                    {news?.slice(0, 4)?.map((post, index) => (
                        <a href={post?.url} target="_blank" className={`flex flex-col lg:flex-row w-full gap-2 border hover:border-black p-4 rounded-lg h-full ${index === 0 ? 'lg:row-span-3 items-stretch lg:flex-col' : 'hidden lg:flex'}`} key={index}>
                            <div className={`w-[65%] flex flex-col justify-between ${index === 0 ? 'w-full h-[50%] order-2' : ''}`}>
                                <h2 className={`font-semibold capitalize text-green-800 text-2xl`}>{post?.title}</h2>
                                {/* <p className={`${index === 0 ? 'block mb-2' : 'hidden'}`}>{post?.description?.length > 150 ? post?.description?.slice(0, 150) + '...' : post?.description}</p> */}
                                <div className="">
                                    <a href={post?.source?.url} className="text-green-600 hover:text-green-800 font-semibold">{post?.source?.name}</a>
                                    <p>{setTime((post?.publishedAt))}</p>
                                </div>
                            </div>
                            <img src={post?.urlToImage} alt={post?.title} className={`w-[35%] h-[70%] object-cover rounded-lg mb-5 ${index === 0 ? 'h-[50%] order-1 w-full' : ''}`}/>
                        </a>
                    ))}
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-auto mt-5 lg:mt-14">
                    {news?.slice(4)?.map((post, index) => (
                        <a href={post?.url} target="_blank" className={`border p-4 rounded-lg flex flex-col gap-2 max-h-fit border-1 hover:border-black ${index === 0 ? '' : ''}`} key={index}>
                            <img src={post?.urlToImage ? post?.urlToImage : placeholder} alt={post?.title} className={`w-full h-[50%] object-cover rounded mb-5 ${index === 0 ? 'h-auto' : 'h-auto'}`} />
                            <div className='h-[50%] flex flex-col justify-between'>
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