
// import React from 'react';
// import { Link } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import HomeIcon from '@mui/icons-material/Home';
// import LeaderboardIcon from '@mui/icons-material/Leaderboard';
// import LogoutIcon from '@mui/icons-material/Logout';
// import LoginIcon from '@mui/icons-material/Login';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import Logout from './Logout';

// export const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
//     return (
//         <AppBar sx={{ bgcolor: 'black' }}>
//             <Toolbar>
//                 <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: 'white' }}>
//                     Banana Bash
//                 </Typography>
//                 {!isLoggedIn ? (
//                     <>
//                         <IconButton color="error" component={Link} to="/login">
//                             <LoginIcon />
//                         </IconButton>
//                         <IconButton color="success" component={Link} to="/signup">
//                             <PersonAddIcon />
//                         </IconButton>
//                     </>
//                 ) : (
//                     <>
//                         <IconButton color="primary" component={Link} to="/leaderboard">
//                             <LeaderboardIcon />
//                         </IconButton>
//                         <IconButton color="primary" component={Link} to="/home">
//                             <HomeIcon />
//                         </IconButton>
//                         <IconButton color="inherit" onClick={() => setIsLoggedIn(false)}>
//                             <LogoutIcon />
//                         </IconButton>
//                     </>
//                 )}
//             </Toolbar>
//         </AppBar>
//     );
// };
// import React from 'react';
// import { Link } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import HomeIcon from '@mui/icons-material/Home';
// import LeaderboardIcon from '@mui/icons-material/Leaderboard';
// import LogoutIcon from '@mui/icons-material/Logout';

// export const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
//     const iconStyles = {
//         fontSize: '2rem',
//         color: '#228B22',
//         '&:hover': {
//             color: '#228B22', // Lighter green on hover
//         },
//     };
    

//     return (
//         <AppBar sx={{ bgcolor: 'black' }}>
//             <Toolbar>
//                 <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: 'white' }}>
//                     Banana Bash
//                 </Typography>
//                 {!isLoggedIn ? (
//                     <>
                       
//                     </>
//                 ) : (
//                     <>
//                         <IconButton component={Link} to="/home">
//                             <HomeIcon sx={iconStyles} />
//                         </IconButton>
//                         <IconButton component={Link} to="/leaderboard">
//                             <LeaderboardIcon sx={iconStyles} />
//                         </IconButton>
//                         <IconButton onClick={() => setIsLoggedIn(false)}>
//                             <LogoutIcon sx={iconStyles} />
//                         </IconButton>
//                     </>
//                 )}
//             </Toolbar>
//         </AppBar>
//     );
// };
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Logout from './Logout';

export const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const iconStyles = {
        fontSize: '2rem',
        color: 'white', 
        '&:hover': {
            color: '#dcdcdc', 
        },
    };

    return (
        <AppBar sx={{ bgcolor: 'black' }}>
            <Toolbar>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                    Banana Bash
                </Typography>
                {isLoggedIn ? (
                    <>
                        <IconButton component={Link} to="/home">
                            <HomeIcon sx={iconStyles} />
                        </IconButton>
                        <IconButton component={Link} to="/leaderboard">
                            <LeaderboardIcon sx={iconStyles} />
                        </IconButton>
                        {/* Use the existing Logout component */}
                        <Logout setIsLoggedIn={setIsLoggedIn} />
                    </>
                ) : null}
            </Toolbar>
        </AppBar>
    );
};
