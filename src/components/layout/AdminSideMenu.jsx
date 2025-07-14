import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';

const AdminSideMenu = ({ title, url, children, isOpen, onToggle,  }) => {

  return (

    <div className={`accordian ${isOpen ? "active" : ""}`}>

        {url?(<Link to={url}>
      <div className={`accordian-header ${isOpen ? "active" : ""}`} onClick={onToggle}>
        {title}
      </div>
      </Link>):( <div className={`accordian-header ${isOpen ? "active" : ""}`} onClick={onToggle}>
        {title}
    
        <span className={`material-symbols-outlined ${isOpen ? "active" : ""}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </span>
        
      </div>)}     
                                
    
      {isOpen && (
        <>
        <div className="accordian-content">
        
          {children}
        </div>
        <div className="accordian-content">
          
        </div>
        </>
      )}
    </div>  
  )
}

export default AdminSideMenu;