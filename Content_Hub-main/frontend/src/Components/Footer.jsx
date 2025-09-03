export default function Footer() {
    return (
        <footer>
            {/* Top Banner */}
            <div className="bg-[white] text-center py-6 ">
                <h2 className="text-2xl font-bold">Stay informed with the latest updates and news.</h2>
                <div className="flex justify-center items-center mt-2">
                    <p className="text-md text-gray-1000">CEO, Industry Insights</p>
                </div>
            </div>

         
            <div className="container mx-auto px-10 py-10 grid grid-cols-6 gap-6 text-gray-800 bg-[#f5f5f5]">
                
               
                <div className="col-span-2">
                    <h3 className="font-bold text-xl">CONTENTHUB</h3>
                    <p className="text-md text-gray-600 mt-2">Your go-to platform for news and content.</p>
                    <p className="mt-7 font-bold">Follow us:</p>
                    <div className="flex space-x-3 mt-2">
                        <img src="https://cdn-icons-png.flaticon.com/512/1384/1384031.png" alt="Instagram" className="w-5 h-5" />
                        <img src="https://cdn-icons-png.flaticon.com/512/733/733635.png" alt="Twitter" className="w-5 h-5" />
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="w-5 h-5" />
                    </div>
                </div>

               
                <div>
                    <h4 className="text-lg font-bold">Sports</h4>
                    <ul className="text-md text-gray-600 space-y-1 mt-2">
                        <li>Technology</li>
                        <li>Content</li>
                        <li>Enterprise</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold">About us</h4>
                    <ul className="text-md text-gray-900 space-y-1 mt-2">
                        <li>Connect</li>
                        <li>Job</li>
                        <li>Latest</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold">Resources</h4>
                    <ul className="text-md text-gray-600 space-y-1 mt-2">
                        <li>Read our blog</li>
                        <li>Knowledge</li>
                        <li>Sales</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold">Get</h4>
                    <ul className="text-md text-gray-600 space-y-1 mt-2">
                        <li>Live chat</li>
                        <li>Share your</li>
                        <li>Contact us</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
