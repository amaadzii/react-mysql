import React from 'react';
import { AppBar, Button, Toolbar, Typography, makeStyles, fade } from "@material-ui/core";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(1),
        edge: 'start',
    },
    white: {
        color: '#FFFFFF',
    },
    space: {
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '60%',
        [theme.breakpoints.down('md')]: {
            marginLeft: theme.spacing(3),
            width: '40%',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        width: '100%',
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
    },
}));


const Header = () => {
    const classes = useStyles();

    const isAuthenticated = useSelector(store => store.authenticated);
    const userType = useSelector(store => store.userType);

    let logIn = null;
    let signUp = null;
    let admin = null;
    let cart = null;
    let myProfile = null;

    if (isAuthenticated) {
        if (userType === 'admin') {
            admin =
                <Link to='admin'>
                    <Button variant={'paragraph'} className={classes.white}> Admin </Button>
                </Link>
        }
        else {
            cart =
                <Link to='/cart'>
                    <Button variant={'paragraph'} className={classes.white}> Cart </Button>
                </Link>
        }

        logIn = null;
        signUp = null;
    }
    else {
        logIn =
            <Link to='/login'>
                <Button variant={'paragraph'} className={classes.white}> Log In </Button>
            </Link>;
        signUp =
            <Link to='signup'>
                <Button variant={'paragraph'} className={classes.white}> Sign Up </Button>
            </Link>;
    }

    return (
        <>
            <AppBar position='fixed'>
                <Toolbar>
                    <Link to='/'>
                        <Button className={classes.white}>
                            <LocalHospitalIcon className={classes.menuButton} />
                            <Typography variant={'h6'}>APOTEK JAKARTA </Typography>
                        </Button>
                    </Link>

                    <div className={classes.root} />

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            fullWidth
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>

                    <div className={classes.root} />
                    {admin}

                    {signUp}
                    {logIn}

                    {cart}
                    {myProfile}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header;