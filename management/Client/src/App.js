"use strict";

import logo from "./logo.svg";
import "./App.css";
import Customer from "./components/Customer";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHeader from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

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
});

function App(props) {
  let [customers, setCustomers] = useState();
  let [error, setError] = useState();

  useEffect(() => {
    // const response = fetch("/api/customers");

    fetch("/api/customers")
      .then((response) => response.json())
      .then((customers) => {
        setCustomers(customers);
      })
      .catch((error) => setError(error));
  }, []);

  const { classes } = props;

  return (
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers
            ? customers.map((user) => {
                return (
                  <Customer
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
            : ""}
        </TableBody>
      </Table>
    </Paper>

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
