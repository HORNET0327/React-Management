import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CustomerDelete from "./CustomerDelete";

function Customer(props) {
  return (
    <TableRow>
      <TableCell> {props.id}</TableCell>
      <TableCell>
        <img src={props.image} alt="profile"></img>
      </TableCell>
      <TableCell>{props.name} </TableCell>
      <TableCell>{props.birthday} </TableCell>
      <TableCell>{props.gender} </TableCell>
      <TableCell>{props.job} </TableCell>
      <TableCell>
        <CustomerDelete stateReFresh={props.stateReFresh} id={props.id} />
      </TableCell>
    </TableRow>

    // <div>
    //   <CustomerProfile id={props.id} image={props.image} name={props.name} />
    //   <CustomerInfo
    //     birthday={props.birthday}
    //     gender={props.gender}
    //     job={props.job}
    //   />
    // </div>
  );
}

function CustomerProfile(props) {
  return (
    <div>
      <img src={props.image} alt="profile" />
      <h2>
        {props.name} ({props.id})
      </h2>
    </div>
  );
}

function CustomerInfo(props) {
  return (
    <div>
      <p> {props.birthday}</p>
      <p> {props.gender}</p>
      <p> {props.job}</p>
    </div>
  );
}
export default Customer;
