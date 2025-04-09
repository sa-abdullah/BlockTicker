import Logo from '../assets/logo2.png'
import { FaLinkedin, FaFacebook, FaXTwitter, FaWhatsapp, FaDiscord } from 'react-icons/fa6';

const Footer = () => {

    return (
        <div className="w-screen h-auto flex flex-col lg:flex-row justify-center p-5 gap-10 text-lg border-t-1">
            <div>
                <div className="w-[30%] max-w-sm flex items-center gap-1 text-2xl font-bold mb-10"><img src={Logo} alt="" className="w-[35px]" /> BlockTicker</div>
                Blockticker delivers comprehensive insights into the cryptocurrency market, offering more than just price tracking. Along with monitoring trading volume and market capitalization, Blockticker provides deep analysis of community engagement, open-source development activity, major industry events, and critical on-chain metrics. By combining these data points, Blockticker empowers users with a holistic view of the evolving crypto landscape.
            </div>
            <div className="w-full lg:w-[70%] flex flex-col md:flex-row justify-between lg:justify-center gap-10 lg:gap-20">
                <div className="flex flex-col gap-4">
                    <h3 className="font-semibold text-xl">Resources</h3>
                    <a href="https://salaudeenabdu.hashnode.dev/" target="_blank">My Articles</a>
                    <p>Crypto News</p>
                    <p>Donations</p>
                    <p>Bitcoin</p>
                </div>
                <div className="flex lg:flex-col gap-3 items-center text-2xl md:self-end">
                    <h3 className="hidden lg:block font-semibold text-xl">Community</h3>
                    <a href="https://x.com/AbdullahBytes" target="_blank"><FaXTwitter /></a>
                    <a href="https://www.linkedin.com/in/salaudeenabdul/" target="_blank"><FaLinkedin /></a>
                    <a href="https://api.whatsapp.com/send?phone=2348088629556" target="_blank"><FaWhatsapp /></a>
                    <a href="https://discord.com/users/el___guapo" target="_blank"><FaDiscord /></a>
                    <a href="https://facebook.com" target="_blank"><FaFacebook /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer