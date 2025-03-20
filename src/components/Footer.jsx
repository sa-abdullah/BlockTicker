import Logo from '../assets/logo2.png'

const Footer = () => {

    return (
        <div className="w-screen h-auto flex justify-center p-10 gap-50 text-lg border-t-1">
            <div>
                <div className="w-[30%] max-w-sm flex items-center gap-1 text-2xl font-bold mb-10"><img src={Logo} alt="" className="w-[35px]" /> BlockTicker</div>
                Blockticker delivers comprehensive insights into the cryptocurrency market, offering more than just price tracking. Along with monitoring trading volume and market capitalization, Blockticker provides deep analysis of community engagement, open-source development activity, major industry events, and critical on-chain metrics. By combining these data points, Blockticker empowers users with a holistic view of the evolving crypto landscape.
            </div>
            <div className="w-[70%] flex gap-20">
                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-xl">Resources</h3>
                    <a href="https://salaudeenabdu.hashnode.dev/" target="_blank">My Articles</a>
                    <p>Crypto News</p>
                    <p>Donations</p>
                    <p>Bitcoin</p>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-xl">Community</h3>
                    <a href="https://x.com/AbdullahBytes" target="_blank">Twitter</a>
                    <a href="https://www.linkedin.com/in/salaudeenabdul/" target="_blank">Linkedin</a>
                    
                    <p>Whatsapp</p>
                    <p>Discord</p>
                </div>
            </div>
        </div>
    )
}

export default Footer