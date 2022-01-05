import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PollIcon from '@mui/icons-material/Poll';
import AddIcon from '@mui/icons-material/Add';
import CheckSurveys from "./CheckSurveys";
import CreateSurvey from "./CreateSurvey";
import {useState} from "react";

const drawerWidth = 240;

export default function AdminDrawer() {
    const [activeView, setActiveView] = useState('dashboard');

    const displayView = () => {
        switch (activeView) {
            case 'checkSurveys':
                return <CheckSurveys />;
            default:
                return <CreateSurvey />
        }
    };

    const handleViewChangeClick = (view: string) => {
        setActiveView(view);
    };
    
    return (
        <Box display="flex">
            <CssBaseline />
            <AppBar 
                position="fixed" 
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Admin panel
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem 
                            button
                            onClick={() => handleViewChangeClick('createSurvey')}
                        >
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Create Survey" />
                        </ListItem>
                        <ListItem 
                            button
                            onClick={() => handleViewChangeClick('checkSurveys')}
                        >
                            <ListItemIcon>
                                <PollIcon />
                            </ListItemIcon>
                            <ListItemText primary=" Check Surveys" />
                        </ListItem>
                    </List>
                    <Divider />
                </Box>
            </Drawer>
            <Box 
                component="main" 
                sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {displayView()}
            </Box>
        </Box>
    );
}