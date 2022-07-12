import logo from "./logo.svg";
import "./App.css";
import Customer from "./components/Customer";

export const customers = [
  {
    id: 1,
    image: "https://placeimg.com/64/64/any/1",
    name: "홍길동",
    birthday: "991112",
    gender: "남자",
    job: "nothing",
  },
  {
    id: 2,
    image: "https://placeimg.com/64/64/any/2",
    name: "남",
    birthday: "770707",
    gender: "남자",
    job: "nothing",
  },
  {
    id: 3,
    image: "https://placeimg.com/64/64/any/3",
    name: "박",
    birthday: "880808",
    gender: "남자",
    job: "nothing",
  },
];

function App() {
  return (
    <div>
      {customers.map((user) => {
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
      })}
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

export default App;
