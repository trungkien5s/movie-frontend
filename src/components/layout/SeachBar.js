import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleClear = () => {
        setSearchValue('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            console.log('Searching for:', searchValue);
            // Thêm logic tìm kiếm của bạn ở đây
        }
    };

    return (
        <div className="flex-1 max-w-md mx-4 lg:mx-8">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />

                <input
                    type="text"
                    placeholder="Tìm kiếm phim, diễn viên..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit(e);
                        }
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`
            w-full pl-10 pr-10 py-2 
            bg-gray-700 border border-white-700 rounded-lg
            text-white placeholder-white-400 
            transition-colors duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-white-500 focus:border-white-500
            hover:border-white-600
            ${isFocused ? 'border-white-500' : ''}
          `}
                />

                {searchValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;