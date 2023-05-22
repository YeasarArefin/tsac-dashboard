import MenuIcon from '@mui/icons-material/Menu';
import { ListItemButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';
import * as React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { RiDashboardLine, RiSettings5Line } from 'react-icons/ri';
import { TbFileInvoice } from 'react-icons/tb';
import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../utils/hooks/useAuth';
import Dropdown from '../UI/Dropdown';

const drawerWidth = 270;

function Shell(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { user, userInfo } = useAuth();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // let menus;

    // if (userInfo?.role === 'admin') {
    //     menus = [
    //         {
    //             name: 'dashboard',
    //             icon: <RiDashboardLine />,
    //             path: '/',
    //         },
    //         {
    //             name: 'teachers',
    //             icon: <Ri4KFill />,
    //             path: '/teachers',
    //         },
    //         {
    //             name: 'settings',
    //             icon: <RiSettings5Line />,
    //             path: '/settings',
    //         },
    //     ];
    // } else if (userInfo?.role === 'teacher') {
    //     menus = [
    //         {
    //             name: 'teachers',
    //             icon: <Ri4KFill />,
    //             path: '/teachers',
    //         },
    //     ];
    // } else if (userInfo?.role === 'student') {
    //     menus = [
    //         {
    //             name: 'dashboard',
    //             icon: <RiDashboardLine />,
    //             path: '/',
    //         },
    //     ];
    // }

    const menus = [
        {
            name: 'dashboard',
            icon: <RiDashboardLine />,
            path: '/',
        },
        {
            name: 'teachers',
            icon: <FaChalkboardTeacher />,
            path: '/teachers',
        },
        {
            name: 'students',
            icon: <HiOutlineUserGroup />,
            path: '/students',
        },
        {
            name: 'create invoice',
            icon: <AiOutlinePlus />,
            path: '/create-invoice',
        },
        {
            name: 'invoice list',
            icon: <TbFileInvoice />,
            path: '/list-invoice',
        },
        {
            name: 'create expenditure',
            icon: <AiOutlinePlus />,
            path: '/create-expenditure',
        },
        {
            name: 'expenditure list',
            icon: <TbFileInvoice />,
            path: '/list-expenditure',
        },
        {
            name: 'settings',
            icon: <RiSettings5Line />,
            path: '/settings',
        },
    ];

    const drawer = (
        <div>
            <Toolbar className="justify-center">
                <h1 className="logo_font text-3xl">TSAC</h1>
            </Toolbar>
            <List className="px-5 flex flex-col">
                {userInfo?.role
                    ? menus.map(({ icon, path, name }) => {
                          return (
                              <NavLink
                                  key={path}
                                  to={path}
                                  className={({ isActive }) =>
                                      isActive ? 'bg-blue-600 text-white rounded-lg' : ''
                                  }
                              >
                                  <ListItemButton className="flex gap-x-4 rounded-lg">
                                      <div className="text-xl">{icon}</div>
                                      <ListItemText
                                          primary={name}
                                          className="capitalize font-bold"
                                      />
                                  </ListItemButton>
                              </NavLink>
                          );
                      })
                    : [...Array(5).keys()].map((item, index) => (
                          <div
                              key={item}
                              className="bg-blue-100 h-12 mb-5 rounded-lg animate-pulse"
                          />
                      ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
                className="bg-white shadow-lg print:hidden"
            >
                <Toolbar className="justify-between sm:justify-end">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon className="text-blue-600" />
                    </IconButton>
                    <div className="flex items-center font-semibold justify-end text-blue-600 gap-x-3">
                        {userInfo?.role ? (
                            <div className="flex gap-x-2">
                                <h1 className="capitalize">{userInfo.role}</h1> :
                                <h1 className="w-[60px] sm:w-full overflow-hidden text-ellipsis">
                                    {user.email}
                                </h1>
                            </div>
                        ) : (
                            <div className="h-2 w-[270px] bg-blue-300 rounded-full" />
                        )}

                        <Dropdown />
                    </div>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <div className="mt-24 p-2 w-full lg:w-10/12 lg:p-0 mx-auto">
                <Outlet />
            </div>
        </Box>
    );
}

Shell.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    // eslint-disable-next-line react/require-default-props
    window: PropTypes.func,
};

export default Shell;
