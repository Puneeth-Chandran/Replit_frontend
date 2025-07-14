import React, { useState } from 'react';  // ✅ Added `useState` import
import { useNavigate } from 'react-router-dom';

const MobileSearch = () => {
    const [keyword, setKeyword] = useState("");  // ✅ Now `useState` is defined properly
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/products?keyword=${encodeURIComponent(keyword)}`); // ✅ Encode keyword properly
        } else {
            navigate('/products');
        }
    };

    return (
        <form className="mobile-search" onSubmit={submitHandler}>
            <label htmlFor="mobile-search" className="sr-only">Search</label>
            <input
                type="search"
                className="form-control"
                name="mobile-search"
                id="mobile-search"
                placeholder="Search in..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                required
            />
            <button className="btn btn-primary" type="submit">
                <i className="bi bi-search"></i>
            </button>
        </form>
    );
};

export default MobileSearch;
