import React, {useEffect} from 'react'
import AdminLayout from './AdminLayout'
import { useGetMeQuery } from '../../redux/api/userApi'
import { useSelector } from 'react-redux';
import { useLazyLogoutQuery } from '../../redux/api/authApi';
import { Link } from 'react-router-dom';

const AdminHeader = () => {

   useGetMeQuery();
    const [logout] = useLazyLogoutQuery();

    let loggedOut= false;

   const {user} = useSelector((state) => state.auth);

   const logoutHandler = async () => {
    try {
        await logout().unwrap();
        window.location.href = '/admin-belcab';
        loggedOut = true;
        window.location.reload();
    } catch (error) {
        console.error('Logout failed: ', error);
    }
}

  return (
    <div className='admin-panel'>
    <div className='pageWrapper'>
    <div className="page-main-header">
    <div className="main-header-right row">
        <div className="main-header-left d-lg-none w-auto">
            <div className="logo-wrapper">
                {/* <a href="index-2.html">
                    <img className="blur-up lazyloaded d-block d-lg-none"
                        src="assets/images/dashboard/multikart-logo-black.png" alt=""/>
                </a> */}
            </div>
        </div>
        {/* <div className="mobile-sidebar w-auto">
            <div className="media-body text-end switch-sm">
                <label className="switch">
                    <a href="javascript:void(0)">
                        <i id="sidebar-toggle" data-feather="align-left"></i>
                    </a>
                </label>
            </div>
        </div> */}
        <div className="nav-right col">
            <ul className="nav-menus">
                <li>
                    <form className="form-inline search-form">
                        <div className="form-group">
                            <input className="form-control-plaintext" type="search" placeholder="Search.."/>
                            <span className="d-sm-none mobile-search">
                                <i className='bi bi-search'></i>
                            </span>
                        </div>
                    </form>
                </li>
                {/* <li>
                    <a className="text-dark" href="#!" onClick="javascript:toggleFullScreen()">
                        <i data-feather="maximize-2"></i>
                    </a>
                </li> */}

                {/* <li className="onhover-dropdown">
                    <i data-feather="bell"></i>
                    <span className="badge badge-pill badge-primary pull-right notification-badge">3</span>
                    <span className="dot"></span>
                    <ul className="notification-dropdown onhover-show-div p-0">
                        <li>Notification <span className="badge badge-pill badge-primary pull-right">3</span></li>
                        <li>
                            <div className="media">
                                <div className="media-body">
                                    <h6 className="mt-0">
                                        <span>
                                            <i className="shopping-color" data-feather="shopping-bag"></i>
                                        </span>Your order ready for Ship..!
                                    </h6>
                                    <p className="mb-0">Lorem ipsum dolor sit amet, consectetuer.</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="media">
                                <div className="media-body">
                                    <h6 className="mt-0 txt-success">
                                        <span>
                                            <i className="download-color font-success" data-feather="download"></i>
                                        </span>Download Complete
                                    </h6>
                                    <p className="mb-0">Lorem ipsum dolor sit amet, consectetuer.</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="media">
                                <div className="media-body">
                                    <h6 className="mt-0 txt-danger">
                                        <span>
                                            <i className="alert-color font-danger" data-feather="alert-circle"></i>
                                        </span>250 MB trash files
                                    </h6>
                                    <p className="mb-0">Lorem ipsum dolor sit amet, consectetuer.</p>
                                </div>
                            </div>
                        </li>
                        <li className="txt-dark"><a href="javascript:void(0)">All</a> notification</li>
                    </ul>
                </li> */}
                {/* <li>
                    <a href="javascript:void(0)">
                        <i className="right_side_toggle" data-feather="message-square"></i>
                        <span className="dot"></span>
                    </a>
                </li> */}
                {user?(
                    <li className="onhover-dropdown">
                    <div className="media align-items-center">
                    <h6>Hi, {user?.name}</h6>
                        <div className="dotted-animation">
                            <span className="animate-circle"></span>
                            <span className="main-circle"></span>
                        </div>
                    </div>
                    <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                        <li>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                                <i className="bi bi-person"></i>&nbsp;Edit Profile
                            </a>
                        </li>
                        {/* <li>
                            <a href="javascript:void(0)">
                                <i data-feather="mail"></i>Inbox
                            </a>
                        </li> */}
                        {/* <li>
                            <a href="javascript:void(0)">
                                <i data-feather="lock"></i>Lock Screen
                            </a>
                        </li> */}
                        {/* <li>
                            <a href="javascript:void(0)">
                                <i data-feather="settings"></i>Settings
                            </a>
                        </li> */}
                        <li>
                            <Link to="/admin-belcab" onClick={logoutHandler}>
                                <i className="bi bi-box-arrow-right"></i>&nbsp;Logout
                            </Link>
                        </li>
                    </ul>
                </li>
                ):(null)}
                
            </ul>
            <div className="d-lg-none mobile-toggle pull-right">
                <i className='bi bi-list'></i>
            </div>
        </div>
    </div>
</div>
<div className="page-body-wrapper">
<AdminLayout/>
</div>
</div>
</div>
  )
}

export default AdminHeader