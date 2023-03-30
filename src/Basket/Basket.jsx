import React,{useState , useEffect} from 'react';
import close from './close.png';
import './Basket.scss';


const Basket = ({ showBasket, closeBasket, basket }) => {

    const [sum,setSum] = useState(0);

useEffect(()=>{
    if(basket.length){
       for(let i of basket){
        setSum((prev)=>prev+i.sum)
       }
    }
},[basket])



    return (
        <div className={showBasket ? 'basket active' : 'basket'}>
            <div className='basket__title'>
                <p>Ваша корзина</p>
                <img className='basket__close' onClick={closeBasket} src={close} alt="close" />
            </div>
            <table className={showBasket ? 'basket__table active' : 'basket__table'}>
                {basket.length!==0&&
                     <tbody>
                    {basket.map((item,index) => {
                        return <tr key={item.sum} className='table__row'>
                            <td  className='table__column'>{item.name}</td>
                            <td className='table__column'>{item.sum}</td>
                            <td  className='table__column'>{item.amount}</td>
                            <td  className='table__column'>{item.unit}</td>
                        </tr>
                    })}
                    <tr><td>Итого: {sum}</td></tr>
                </tbody>
                }
            </table>
        </div>
    );
};

export default Basket;