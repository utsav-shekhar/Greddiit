import { Link, useLocation } from "react-router-dom";
import { IconButton, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CreateIcon from '@mui/icons-material/Create';

const Navbar = () => {
    let location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">GREDDIIT</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/Profile/Home"? "active": ""}`} aria-current="page" to="/Profile/Home">
                                <Tooltip title="Home">
                                    <IconButton>
                                        <HomeIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/Profile"? "active": ""}`} to="/Profile">
                                <Tooltip title="Profile">
                                    <IconButton>
                                        <PersonIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </li>
                       
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/Profile/Savedposts"? "active": ""}`} to="/Profile/Savedposts">
                                <Tooltip title="Saved posts">
                                    <IconButton>
                                        <ForumIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/Profile/subgreddiits"? "active": ""}`} to="/Profile/subgreddiits">
                                <Tooltip title="My subgreddiits">
                                    <IconButton>
                                        <ForumIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </li>
                        

                    </ul>
                    <form className="d-flex"> 
                        <Link className="btn btn-primary mx-1" to="/" role="button">
                            <Tooltip title="Login">
                                <IconButton>
                                    <LockOpenIcon />
                                </IconButton>
                            </Tooltip>
                        </Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button">
                            <Tooltip title="Signup">
                                <IconButton>
                                    <CreateIcon />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
