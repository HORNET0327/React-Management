import React, { useEffect, useState } from "react";
import post from "axios";

function CustomerAdd(props) {
  const [userForm, setuserForm] = useState({
    userName: "",
    birthday: "",
    gender: "",
    job: "",
    fileName: "",
  });

  const [userFile, setuserFile] = useState();

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
    console.log(e.target.files[0]);
    console.log(e.target.value);

    const eFile = e.target.files[0];
    console.log(eFile);
    setuserFile(e.target.files[0]);
    setuserForm({ ...userForm, file: e.target.files[0] });
    setuserForm({ ...userForm, fileName: e.target.value });

    console.log(userFile);
    console.log(userForm.file);
    console.log(userForm.fileName);
  };

  const handleValueChange = (e) => {
    setuserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>고객추가</h1>
      프로필 이미지:{" "}
      <input
        type="file"
        name="file"
        file={userForm.file}
        value={userForm.fileName || ""}
        onChange={handleFileChange}
        // onClick={(e) => {
        //   e.target.value = null;
        // }}
      />
      <br />
      이름:{" "}
      <input
        type="text"
        name="userName"
        value={userForm.userName || ""}
        onChange={handleValueChange}
        // onChange={(e) => {
        //   setuserForm({ ...userForm, [e.target.name]: e.target.value });
        // }}
      />
      <br />
      생년월일:{" "}
      <input
        type="text"
        name="birthday"
        value={userForm.birthday || ""}
        onChange={handleValueChange}
        // onChange={(e) => {
        //   setuserForm({ ...userForm, [e.target.name]: e.target.value });
        // }}
      />
      <br />
      성별:{" "}
      <input
        type="text"
        name="gender"
        value={userForm.gender || ""}
        onChange={handleValueChange}
        // onChange={(e) => {
        //   setuserForm({ ...userForm, [e.target.name]: e.target.value });
        // }}
      />
      <br />
      직업:{" "}
      <input
        type="text"
        name="job"
        value={userForm.job || ""}
        onChange={handleValueChange}

        // onChange={(e) => {
        //   setuserForm({ ...userForm, [e.target.name]: e.target.value });
        // }}
      />
      <br />
      <button type="submit">추가하기</button>
    </form>
  );
}

export default CustomerAdd;
