import Header from '../components/Header'
import { useCrypto } from '../components/ChartContext' 
import "../Styles/App.css";
import RollingDisplay from '../components/RollingDisplay'
import Footer from '../components/Footer'





export const CryptoNews = () => {
    const { news, cryptoData } = useCrypto()
    console.log(news)
    
    function formatDate(dateString) {
    
        const date = new Date(dateString);
    
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }

    
    return (
        <>
            <Header />
            { 
            cryptoData ? 
            <RollingDisplay />
            : ""}
            <div className='p-4'>
                <h1 className="text-4xl font-bold mb-4">Latest Crypto News</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {news && news?.articles?.map((post, index) => (
                        <a href={post.url} className={`border p-4 rounded-lg flex flex-col justify-between shadow ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`} key={index}>
                            <img src={post.image} alt={post.title} className={`w-full h-48 obejct-cover rounded mb-5 ${index === 0 ? 'h-auto' : 'h-auto'}`} />
                            <h2 className={`font-semibold mb-5 capitalize text-green-800 ${index === 0 ? 'text-6xl leading-17 px-2 py-6' : 'text-xl'}`}>{post.title}</h2>
                            <p className="mb-2">{post.description}</p>
                            <div className="flex justify-between">
                                <a href={post.source.url} className="text-green-600 hover:text-green-800 font-semibold">{post.source.name}</a>
                                <p>{formatDate((post.publishedAt))}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            <Footer />
        </>

    )
}