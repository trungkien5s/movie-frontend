import React from "react";

const LayoutAuthentication = ({ children, title }) => {
    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Background Image Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{
                    backgroundImage: `url(/anhbia.jpg)`
                }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40" />

            {/* Header */}
            <div className="relative z-10 px-8 py-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-red-600 text-4xl font-bold">Mê Phim</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)]">
                <div className="w-full max-w-md">
                    {/* Form Container */}
                    <div className="bg-black bg-opacity-75 px-16 py-12 rounded-md">
                        <h2 className="text-white text-3xl font-bold mb-8">{title}</h2>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayoutAuthentication;