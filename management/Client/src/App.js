import "./App.css";
import Customer from "./components/Customer";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHeader from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import CustomerAdd from "./components/comtomerAdd";

import CircularProgress from "@material-ui/core/CircularProgress";

import { withStyles, WithStyles } from "@material-ui/core"; //css적용해주는 라이브러리
import React, { Component, useEffect, useState } from "react";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },

  table: {
    minWidth: 1080,
  },

  progress: {
    margin: theme.spacing(2),
  },
});

function App(props) {
  let [customers, setCustomers] = useState();
  let [error, setError] = useState();
  let [completed, setCompleted] = useState(0);

  let progress = () => {
    setCompleted((completed) => (completed >= 100 ? 0 : completed + 1));
  };

  const stateReFresh = () => {
    setCustomers();
    setCompleted(0);

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

  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHeader>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>설정</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers ? (
              customers.map((user) => {
                return (
                  <Customer
                    stateReFresh={stateReFresh}
                    key={user.id} //키값을 설정하라고 오류가 뜨기때문에 유니크한 id를 넣어주면 된다.
                    id={user.id}
                    image={user.image}
                    name={user.name}
                    birthday={user.birthday}
                    gender={user.gender}
                    job={user.job}
                  />
                );
              })
            ) : (
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

      <CustomerAdd stateReFresh={stateReFresh}></CustomerAdd>
    </div>
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
