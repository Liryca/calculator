import Culc from "./Calc/Culc";
import { useEffect,useState } from "react";
import data from './data/data.json';
import config from './data/config.json';
import Total from "./Total/Total";
import Basket from "./Basket/Basket";


function App() {

  const [userForm, setUserForm] = useState({});
  const [basket, setBasket] = useState([]);
  const [showBasket, setShowBasket] = useState(false);

  const [userData, setUserData] = useState({
    width:5,
    length:5,
    strength: 'Легкая' ,
    material: 'Лист-1 0.5 ширина 1.8м',
    tube:"Труба 20х20",
    

  });

console.log(basket)


  function handleBasketOpen(e) {
    e.stopPropagation();
    setShowBasket(!showBasket);
  }





  useEffect(() => {
    setUserForm((prev) => {
      return {
        ...prev,
        list: data.filter(i => i.type === 'list'),
        configWidth: config.filter(i => i.type === 'size' && i.key === 'width'),
        configLength: config.filter(i => i.type === 'size' && i.key === 'length'),
        configStrength: config.filter(i => i.type === 'frame'),
        pipe:data.filter(i=>i.type==='pipe')
      }
    })
  }, [])

  return (
    <div className="app">
     
      <div onClick={handleBasketOpen} className="app__basket">Корзина :<span> {basket.length}</span> </div>
      <Culc userData = {userData} setUserData={setUserData} userForm={userForm}/>
      <Total userData={userData} setBasket={setBasket}/>
      <Basket closeBasket={handleBasketOpen} showBasket={showBasket} basket={basket} />
    </div>
  );
}

export default App;
