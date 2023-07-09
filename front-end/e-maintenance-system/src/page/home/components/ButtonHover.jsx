import {
    Button,
    ClickAwayListener,
    Grow,
    Menu,
    MenuItem,
    Paper,
    Popper,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
const useStyles = makeStyles((theme) => ({
    btnCus: {
        textDecoration: "none",
        textTransform: "none",
        fontSize: 17,
    },
    btnCusSelect: {
        color: "#6a994e",
        textTransform: "none",
        fontSize: "1rem",
    },
    btnCusUnSelect: {
        color: "#343a40",
        textTransform: "none",
        fontSize: "1rem",
        lineHeight: 1.75,
    },
    textBtn: {
        padding: 0,
    },
}));
export default function ButtonHover(props) {
    const classes = useStyles();
    const anchorRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);

    // function handleClick(event) {
    //     if (anchorEl !== event.currentTarget) {
    //         setAnchorEl(event.currentTarget);
    //     }
    // }
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    function handleClose(event) {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    }
    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    const Children = props.children;

    return (
        <div className={props.classContainer}>
            <Button
                ref={anchorRef}
                aria-owns={open ? "menu-service" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={classes.btnCus}
                classes={{
                    label: props.selected
                        ? classes.btnCusSelect
                        : classes.btnCusUnSelect,
                    text: classes.textBtn,
                }}
            >
                {props.title}
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom"
                                    ? "center top"
                                    : "center bottom",
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <Children
                                    open={open}
                                    handleClose={handleClose}
                                    handleListKeyDown={handleListKeyDown}
                                />
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}
