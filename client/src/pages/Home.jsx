// frontend/src/Home.js
import React, { useState } from "react";
import axios from "axios";
import { FiExternalLink, FiCopy, FiShare2, FiCheckCircle } from "react-icons/fi";

function Home() {
    const [url, setUrl] = useState("");
    const [password, setPassword] = useState("");
    const [linkPassword, setLinkPassword] = useState("");
    const [retrievedUrl, setRetrievedUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeSlide, setActiveSlide] = useState("store");
    const [copied, setCopied] = useState(false);

    const saveLink = async () => {
        if (!url || !password) {
            setError("Please provide both URL and password.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const res = await axios.post("https://linkset.onrender.com/api/link", { url, password });
            alert(`Link saved, It will Expire within 10 mins`);
            setUrl("");
            setPassword("");
        } catch (err) {
            console.error(err);
            setError("Error saving link");
        }
        setLoading(false);
    };

    const getLink = async () => {
        if (!linkPassword) {
            setError("Please provide password to retrieve link.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const res = await axios.post("https://linkset.onrender.com/api/link/get", { password: linkPassword });
            setRetrievedUrl(res.data.url);
            setLinkPassword("");
        } catch (err) {
            alert("Link expired or Invalid Password")
            setError(err.response?.data?.error || "Error retrieving link");
            setRetrievedUrl("");
        }
        setLoading(false);
    };

    const handleGoToUrl = () => {
        if (retrievedUrl) window.open(retrievedUrl, "_blank");
    };

    const handleCopyUrl = () => {
        if (retrievedUrl) {
            navigator.clipboard.writeText(retrievedUrl)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 3000);
                })
                .catch(() => alert("Failed to copy link."));
        }
    };

    const handleShareUrl = () => {
        if (retrievedUrl && navigator.share) {
            navigator.share({
                title: "Secure Link",
                url: retrievedUrl
            }).catch(() => alert("Share not supported"));
        } else {
            alert("Share not supported on this browser");
        }
    };

    return (
        <div className="h-screen flex flex-col items-center pt-12 md:pt-4  bg-gray-100 p-4 font-inter overflow-hidden">
            <h1 className="text-3xl md:text-4xl font-bold text-center my-4 mb-6 xl:my-6 xl:mt-16 ">Secure Link Store</h1>

            {/* Slide selector */}
            <div className="flex space-x-2 mb-6">
                <button
                    onClick={() => setActiveSlide("store")}
                    className={`px-6 py-2 rounded-2xl font-semibold transition-colors duration-300 border-2 shadow-md cursor-pointer
                        ${activeSlide === "store"
                            ? "bg-blue-600 border-blue-600 text-white shadow-gray-400"
                            : "bg-gray-200 text-gray-700 border-gray-200 hover:bg-gray-300 hover:text-gray-900"
                        }`}
                >
                    Store Link
                </button>

                <button
                    onClick={() => setActiveSlide("get")}
                    className={`px-6 py-2 rounded-2xl font-semibold transition-colors duration-300 border-2 shadow-md cursor-pointer
                        ${activeSlide === "get"
                            ? "bg-green-600 text-white border-green-600 shadow-gray-400"
                            : "bg-gray-200 text-gray-700 border-gray-200 hover:bg-gray-300 hover:text-gray-900"
                        }`}
                >
                    Get Link
                </button>
            </div>

            {/* Card container */}
            <div className="relative w-full max-w-lg">
                {/* Store Slide */}
                <div
                    className={`absolute w-full transition-all duration-500 ease-in-out
                        ${activeSlide === "store" ? "opacity-100 translate-x-0 z-10" : "opacity-0 -translate-x-full z-0"}`}
                >
                    <div className="flex flex-col space-y-3 p-8 bg-white rounded-3xl shadow-lg">
                        <h2 className="text-xl font-semibold">Save Link</h2>
                        <input
                            type="text"
                            placeholder="URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                        />
                        <input
                            type="text"
                            placeholder="6-digit password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                            maxLength={6}
                        />
                        <button
                            onClick={saveLink}
                            disabled={loading}
                            className={`p-3 rounded-2xl text-white font-semibold transition-colors duration-300 shadow-md cursor-pointer
                                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {loading ? "Processing..." : "Save Link"}
                        </button>
                    </div>
                </div>

                {/* Get Slide */}
                <div
                    className={`absolute w-full transition-all duration-500 ease-in-out
                        ${activeSlide === "get" ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-full z-0"}`}
                >
                    <div className="flex flex-col space-y-3 p-8 bg-white rounded-3xl shadow-lg">
                        <h2 className="text-xl font-semibold">Retrieve Link</h2>
                        <input
                            type="text"
                            placeholder="Password"
                            value={linkPassword}
                            onChange={(e) => setLinkPassword(e.target.value)}
                            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            disabled={loading}
                            maxLength={6}
                        />
                        <button
                            onClick={getLink}
                            disabled={loading}
                            className={`p-3 rounded-2xl text-white font-semibold transition-colors duration-300 shadow-md cursor-pointer
                                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                        >
                            {loading ? "Processing..." : "Get Link"}
                        </button>

                        {retrievedUrl && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                                <p className="text-blue-600 truncate break-words md:flex-1  overflow-hidden ">{retrievedUrl}</p>
                                <div className="flex space-x-2 items-center text-lg">
                                    <button
                                        onClick={handleGoToUrl}
                                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                                        title="Go to URL"
                                    >
                                        <FiExternalLink />
                                    </button>
                                    <button
                                        onClick={handleCopyUrl}
                                        className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center cursor-pointer"
                                        title="Copy URL"
                                    >
                                        {copied ? <FiCheckCircle className="text-green-600" /> : <FiCopy />}
                                    </button>
                                    <button
                                        onClick={handleShareUrl}
                                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
                                        title="Share URL"
                                    >
                                        <FiShare2 />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}

            <div className="absolute bottom-4 flex space-x-1 text-gray-700 text-sm md:text-lg">
                <span>Developed By</span>
                <h1 className="text-black font-medium">Thinakaran Manokaran</h1>
                <a href="#" className="underline">[Portfolio]</a>
            </div>
        </div>
    );
}

export default Home;
