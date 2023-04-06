/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */

// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import Tabs from '@mui/material/Tabs';
// import Typography from '@mui/material/Typography';
// import PropTypes from 'prop-types';
// import * as React from 'react';
// import { MdOutlineManageAccounts } from 'react-icons/md';
// import Accounts from '../../components/Settings/Accounts/Accounts';

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`vertical-tabpanel-${index}`}
//             aria-labelledby={`vertical-tab-${index}`}
//             className="w-full"
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3 }}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//     return {
//         id: `vertical-tab-${index}`,
//         'aria-controls': `vertical-tabpanel-${index}`,
//     };
// }

// export default function Settings() {
//     const [value, setValue] = React.useState(0);

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     return (
//         <div className="box">
//             <div className="mb-5">
//                 <h1 className="text-2xl">Settings</h1>
//             </div>
//             <div>
//                 <Box
//                     sx={{
//                         flexGrow: 1,
//                         bgcolor: 'background.paper',
//                         display: 'flex',
//                         height: '80vh',
//                     }}
//                 >
//                     <Tabs
//                         orientation="vertical"
//                         value={value}
//                         onChange={handleChange}
//                         aria-label="Vertical tabs example"
//                         sx={{ borderRight: 1, borderColor: 'divider' }}
//                     >
//                         <Tab
//                             label={
//                                 <div className="flex items-center justify-center gap-x-2">
//                                     <MdOutlineManageAccounts className="text-xl" /> Accounts
//                                 </div>
//                             }
//                             {...a11yProps(0)}
//                         />
//                         <Tab label="Item Two" {...a11yProps(1)} />
//                         <Tab label="Item Three" {...a11yProps(2)} />
//                         <Tab label="Item Four" {...a11yProps(3)} />
//                         <Tab label="Item Five" {...a11yProps(4)} />
//                         <Tab label="Item Six" {...a11yProps(5)} />
//                         <Tab label="Item Seven" {...a11yProps(6)} />
//                     </Tabs>
//                     <TabPanel value={value} index={0}>
//                         <Accounts />
//                     </TabPanel>
//                     <TabPanel value={value} index={1}>
//                         Item Two
//                     </TabPanel>
//                     <TabPanel value={value} index={2}>
//                         Item Three
//                     </TabPanel>
//                     <TabPanel value={value} index={3}>
//                         Item Four
//                     </TabPanel>
//                     <TabPanel value={value} index={4}>
//                         Item Five
//                     </TabPanel>
//                     <TabPanel value={value} index={5}>
//                         Item Six
//                     </TabPanel>
//                     <TabPanel value={value} index={6}>
//                         Item Seven
//                     </TabPanel>
//                 </Box>
//             </div>
//         </div>
//     );
// }

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import Accounts from '../../components/Settings/Accounts/Accounts';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    aria-label="basic tabs example"
                >
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Accounts />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </Box>
    );
}
