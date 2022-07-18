import "./App.css";
import Customer from "./components/Customer";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHeader from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import CustomerAdd from "./components/CustomerAdd";

import CircularProgress from "@material-ui/core/CircularProgress";

import { withStyles } from "@material-ui/core"; //css적용해주는 라이브러리

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import React, { Component, useEffect, useState } from "react";

const styles = (theme) => ({
  root: {
    width: "100%",
    // marginTop: theme.spacing(3),
    // overflowX: "auto",
    // minWidth: 1080,
    minWidth: 1080,
  },

  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    marginLeft: 18,
    marginRight: 18,
  },

  tableHead: {
    fontSize: "1.2rem",
  },
  // table: {
  //   minWidth: 1080,
  // },

  progress: {
    margin: theme.spacing(2),
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function App(props) {
  let [customers, setCustomers] = useState();
  let [error, setError] = useState();
  let [completed, setCompleted] = useState(0);

  let [searchKeyword, setsearchKeyword] = useState("");

  let progress = () => {
    setCompleted((completed) => (completed >= 100 ? 0 : completed + 1));
  };

  const stateReFresh = () => {
    setCustomers();
    setCompleted(0);
    setsearchKeyword("");
    fetch("/api/customers")
      .then((response) => response.json())
      .then((customers) => {
        setCustomers(customers);
      })
      .catch((error) => setError(error));
  };

  useEffect(() => {
    // const response = fetch("/api/customers");

    let timer = setInterval(progress, 100);

    // const timer = setInterval(() => {
    //   setCompleted((completed) => (completed >= 100 ? 0 : completed + 1));
    // }, 80);

    // callApi()
    //   .then((customers) => {
    //     setCustomers(customers);
    //   })
    //   .catch((error) => setError(error));
    stateReFresh();

    // return () => {
    //   clearInterval(timer);
    // };
  }, []);

  // let callApi = async () => {
  //   const response = await fetch("/api/customers");
  //   const body = await response.json();
  //   return body;
  // };

  const handleValueChange = (e) => {
    // let nextState = {};
    // nextState[e.target.name] = e.target.value;

    setsearchKeyword(e.target.value);
  };

  const filteredComponents = (data) => {
    data = data.filter((c) => {
      return c.name.indexOf(searchKeyword) > -1;
    });

    return data.map((user) => {
      return (
        <Customer
          sta
          teReFresh={stateReFresh}
          key={user.id} //키값을 설정하라고 오류가 뜨기때문에 유니크한 id를 넣어주면 된다.
          id={user.id}
          image={user.image}
          name={user.name}
          birthday={user.birthday}
          gender={user.gender}
          job={user.job}
        />
      );
    });
  };
  const { classes } = props;
  const cellList = [
    "번호",
    "프로필 이미지",
    "이름",
    "생년월일",
    "성별",
    "직업",
    "설정",
  ];
  return (
    //<div className={classes.root}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            고객 관리 시스템
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="검색하기"
              inputProps={{ "aria-label": "search" }}
              name="searchKeyword"
              value={searchKeyword || ""}
              onChange={handleValueChange}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <div className={classes.menu}>
        <CustomerAdd stateReFresh={stateReFresh}></CustomerAdd>
      </div>
      <Paper className={classes.paper}>
        <Table>
          <TableHeader>
            <TableRow>
              {cellList.map((c) => {
                return <TableCell className={classes.tableHead}>{c}</TableCell>;
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers ? (
              filteredComponents(customers)
            ) : (
              // (
              //   customers.map((user) => {
              //     return (
              //       <Customer
              //         stateReFresh={stateReFresh}
              //         key={user.id} //키값을 설정하라고 오류가 뜨기때문에 유니크한 id를 넣어주면 된다.
              //         id={user.id}
              //         image={user.image}
              //         name={user.name}
              //         birthday={user.birthday}
              //         gender={user.gender}
              //         job={user.job}
              //       />
              //     );
              //  })

              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress
                    className={classes.progress}
                    variant="determinate"
                    value={completed}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
    //</div>
    // <Customer
    //   id={customers[0].id}
    //   image={customers[0].image}
    //   name={customers[0].name}
    //   birthday={customers[0].birthday}
    //   gender={customers[0].gender}
    //   job={customers[0].job}
    // />
  );
}

// export default App;
export default withStyles(styles)(App);
