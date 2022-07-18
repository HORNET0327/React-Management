import React, { useEffect, useState } from "react";
import post from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  hidden: {
    display: "none",
  },
});
function CustomerAdd(props) {
  const [userForm, setuserForm] = useState({
    userName: "",
    birthday: "",
    gender: "",
    job: "",
    fileName: "",
  });

  const [userFile, setuserFile] = useState();
  const [userAddOpen, setuserAddOpen] = useState(false);

  //   const [submitting, setSubmitting] = useState(false);

  //   useEffect(() => {
  //     if (submitting) {
  //       console.log("잘들어옴");
  //     }
  //     // console.log("올려줘");

  //     setSubmitting(false);
  //   }, [submitting]);

  //   useEffect(() => {});

  const handleFormSubmit = (e) => {
    // setSubmitting(true);
    e.preventDefault();

    addCustomer()
      .then((response) => {
        console.log(response.data);

        props.stateReFresh();

        setuserFile();
        setuserForm("");
      })
      .then((error) => {
        console.log(error);
      });
  };

  const addCustomer = async () => {
    let url = "/api/customers";

    console.log(userFile);
    // console.log(userForm.file);
    console.log(userForm.userName);
    console.log(userForm.birthday);
    console.log(userForm.gender);
    console.log(userForm.job);

    let formData = new FormData();
    // formData.append("image", userForm.file);
    formData.append("image", userFile);
    formData.append("name", userForm.userName);
    formData.append("birthday", userForm.birthday);
    formData.append("gender", userForm.gender);
    formData.append("job", userForm.job);

    let config = {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    };
    console.log(formData);

    return post.post(url, formData, config);
  };

  let handleFileChange = (e) => {
    setuserFile(e.target.files[0]);
    setuserForm({ ...userForm, fileName: e.target.value });
  };

  const handleValueChange = (e) => {
    setuserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setuserAddOpen(true);
  };

  const handleClickClose = () => {
    setuserFile();
    setuserForm("");
    setuserAddOpen(false);
  };

  const { classes } = props;
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        고객 추가하기
      </Button>
      <Dialog open={userAddOpen} onClose={handleClickClose}>
        <DialogTitle>고객 추가</DialogTitle>{" "}
        <DialogContent>
          <input
            className={classes.hidden}
            accept="image/*"
            id="raised-button-file"
            type="file"
            // name="file"
            file={userForm.file}
            value={userForm.fileName || ""}
            onChange={handleFileChange}
            // onClick={(e) => {
            //   e.target.value = null;
            // }}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              name="file"
            >
              {userForm.fileName === undefined
                ? "프로필 이미지 선택"
                : userForm.fileName}
            </Button>
          </label>
          <br />
          <TextField
            label="이름"
            type="text"
            name="userName"
            value={userForm.userName || ""}
            onChange={handleValueChange}
            // onChange={(e) => {
            //   setuserForm({ ...userForm, [e.target.name]: e.target.value });
            // }}
          />
          <br />

          <TextField
            label="생년월일"
            type="text"
            name="birthday"
            value={userForm.birthday || ""}
            onChange={handleValueChange}
            // onChange={(e) => {
            //   setuserForm({ ...userForm, [e.target.name]: e.target.value });
            // }}
          />
          <br />

          <TextField
            label="성별"
            type="text"
            name="gender"
            value={userForm.gender || ""}
            onChange={handleValueChange}
            // onChange={(e) => {
            //   setuserForm({ ...userForm, [e.target.name]: e.target.value });
            // }}
          />
          <br />

          <TextField
            label="직업"
            type="text"
            name="job"
            value={userForm.job || ""}
            onChange={handleValueChange}

            // onChange={(e) => {
            //   setuserForm({ ...userForm, [e.target.name]: e.target.value });
            // }}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            추가
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClickClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>

    // <form onSubmit={handleFormSubmit}>
    //   <h1>고객추가</h1>
    //   프로필 이미지:{" "}
    //   <input
    //     type="file"
    //     name="file"
    //     file={userForm.file}
    //     value={userForm.fileName || ""}
    //     onChange={handleFileChange}
    //     // onClick={(e) => {
    //     //   e.target.value = null;
    //     // }}
    //   />
    //   <br />
    //   이름:{" "}
    //   <input
    //     type="text"
    //     name="userName"
    //     value={userForm.userName || ""}
    //     onChange={handleValueChange}
    //     // onChange={(e) => {
    //     //   setuserForm({ ...userForm, [e.target.name]: e.target.value });
    //     // }}
    //   />
    //   <br />
    //   생년월일:{" "}
    //   <input
    //     type="text"
    //     name="birthday"
    //     value={userForm.birthday || ""}
    //     onChange={handleValueChange}
    //     // onChange={(e) => {
    //     //   setuserForm({ ...userForm, [e.target.name]: e.target.value });
    //     // }}
    //   />
    //   <br />
    //   성별:{" "}
    //   <input
    //     type="text"
    //     name="gender"
    //     value={userForm.gender || ""}
    //     onChange={handleValueChange}
    //     // onChange={(e) => {
    //     //   setuserForm({ ...userForm, [e.target.name]: e.target.value });
    //     // }}
    //   />
    //   <br />
    //   직업:{" "}
    //   <input
    //     type="text"
    //     name="job"
    //     value={userForm.job || ""}
    //     onChange={handleValueChange}

    //     // onChange={(e) => {
    //     //   setuserForm({ ...userForm, [e.target.name]: e.target.value });
    //     // }}
    //   />
    //   <br />
    //   <button type="submit">추가하기</button>
    // </form>
  );
}

export default withStyles(styles)(CustomerAdd);
