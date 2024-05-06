// import React, { useState, useEffect, useRef } from 'react';
// import 'bootstrap/js/dist/dropdown'
// import 'bootstrap/js/dist/collapse'
// import { faCog } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link, useNavigate } from "react-router-dom";

// function Nav({ Toggle, setCurrentComponent, session }) {
//   const [showManageWorkspace, setShowManageWorkspace] = useState(false); // State to track if Manage Workspace dropdown is open
//   // const [workspaceName, setWorkspaceName] = useState(''); // State to store workspace name
//   const workspaceRef = useRef(null); // Ref to the workspace dropdown
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));

//   const handleLogout = () => {
//     localStorage.removeItem('user');  // Remove user info from localStorage
//     navigate('/login');  // Optionally navigate the user to the login page
// };
  

//   useEffect(() => {
//     // Function to handle clicks outside the workspace dropdown
//     const handleClickOutside = (event) => {
//       if (workspaceRef.current && !workspaceRef.current.contains(event.target)) {
//         setShowManageWorkspace(false);
//       }
//     };

//     // Add event listener for clicks outside the dropdown
//     document.addEventListener('mousedown', handleClickOutside);

//     return () => {
//       // Remove event listener when component unmounts
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     // Toggle dropdown
//     setShowManageWorkspace(!showManageWorkspace);
//   };

//   const handleManageWorkspaceClick = () => {
//     setCurrentComponent('ManageWorkspace'); // Set current component to ManageWorkspace
//   };

//   const isLoggedIn = session; // Replace with your logic to check if the user is logged in

//   const renderUserDropdown = () => {
//     if (isLoggedIn) {
//       return (
//         <div className="user-avatar" onClick={toggleDropdown}>
//           <img src={session.user.profile_image_url || 'url_for_static_filename'} alt="User profile" />
//           <div className="dropdown-content" id="userDropdown">
//             <p>{session.user.email}</p>
//             <a href="url_for_logout">Logout</a>
//           </div>
//         </div>
//       );
//     } else {
//       return (<div>
//         {user ? (
//             // If user is logged in, show the user's name and a logout button
//             <div>
//                 <span>{user.user.email}</span>
//                 <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
//                     Logout
//                 </button>
//             </div>
//         ) : (
//             // If user is not logged in, show a Sign In link styled as a button
//             <Link
//                 to="/login"
//                 className="ud-btn btn-white add-joining"
//                 style={{ marginLeft: '30px', marginTop: '5px' }}
//             >
//                 Sign In
//             </Link>
//         )}
//     </div>
//       );
//     }
//   };
//   const workspaceName = user && user.userData && user.userData.workspace ? user.userData.workspace : "";

//   return (
//     <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
//       <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle} style={{ color: 'black' }}></i>
//       <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
//         <i className='bi bi-justify'></i>
//       </button>
//       <div className="collapse navbar-collapse" id="collapsibleNavId">
//       <ul className="navbar-nav me-auto mt-2 mt-lg-0"></ul>
//       <div className="ms-auto" style={{ marginRight: '1rem' }}>
//         <ul className="navbar-nav mt-2 mt-lg-0">
//           <li className="nav-item dropdown">
//             <a className="nav-link dropdown-toggle text-black" href="#" id="dropdownId" onClick={toggleDropdown}>
//               {workspaceName}
//             </a>
//             <div ref={workspaceRef} className={`dropdown-menu${showManageWorkspace ? ' show' : ''}`} aria-labelledby="dropdownId">
//               <a className="dropdown-item" href="#">{workspaceName}</a>
//               <a className="dropdown-item" href="#" onClick={handleManageWorkspaceClick}>
//                 <FontAwesomeIcon icon={faCog}/> Manage Workspace
//               </a>
//             </div>
//           </li>
//           {renderUserDropdown()}
//         </ul>
//       </div>
//     </div>
//     </nav>
//   );
// }

// export default Nav;

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from "react-router-dom";
 
function Nav({ Toggle, setCurrentComponent, session }) {
  const [showManageWorkspace, setShowManageWorkspace] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const workspaceRef = useRef(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
 
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (workspaceRef.current && !workspaceRef.current.contains(event.target)) {
        setShowManageWorkspace(false);
      }
    };
 
    document.addEventListener('mousedown', handleClickOutside);
 
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
 
  const toggleDropdown = () => {
    setShowManageWorkspace(!showManageWorkspace);
  };
 
  const handleManageWorkspaceClick = () => {
    setCurrentComponent('ManageWorkspace');
  };
 
  const isLoggedIn = session;
 
  const renderUserDropdown = () => {
    if (isLoggedIn) {
      return (
        <div className="user-avatar" style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
          <img src={session.user.profile_image_url || 'url_for_static_filename'} alt="User profile" style={{ borderRadius: '50%', marginRight: '5px' }} />
          <div className="dropdown-content" id="userDropdown">
            <p style={{ margin: '0', padding: '0' }}>{session.user.email}</p>
            <a href="url_for_logout" onClick={handleLogout} style={{ margin: '0', padding: '0' }}>Logout</a>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {user ? (
            <div style={{ marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
              <span style={{ margin: '0', padding: '0' }}>{user.user.email}</span>
              <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="ud-btn btn-white add-joining" style={{ marginLeft: '30px', marginTop: '5px', padding: '8px 12px' }}>Sign In</Link>
          )}
        </div>
      );
    }
  };
 
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle} style={{ color: 'black' }}></i>
      <button className="navbar-toggler d-lg-none" type="button" style={{ color: 'black' }} data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
        <i className='bi bi-justify'></i>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
        </ul>
        <div className="ms-auto d-flex align-items-center" style={{ marginRight: '1rem' }}>
          <ul className="navbar-nav mr-3">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-black" href="#" id="dropdownId" onClick={toggleDropdown}>
                Workspace
              </a>
              <div ref={workspaceRef} className={`dropdown-menu${showManageWorkspace ? ' show' : ''}`} aria-labelledby="dropdownId">
                <a className="dropdown-item" href="#">Orange Star</a>
                <a className="dropdown-item" href="#" onClick={handleManageWorkspaceClick}>
                  <FontAwesomeIcon icon={faCog}/> Manage Workspace
                </a>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              {renderUserDropdown()}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
 
export default Nav;