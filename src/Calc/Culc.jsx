import React from 'react';
import './Calc.scss'

const Culc = ({userData,setUserData, userForm,}) => {

    function chooseElemForm(name, e) {
        setUserData((prev) => {
            return {
                ...prev,
                [name]: e.target.value
            }
        })
    }

    if (!Object.keys(userForm).length) {
        return
    }

    return (
        <div className='calculate'>
            <h1 className='calculate__title'>Калькулятор расчета каркаса с покрытием листов:</h1>
            <label className='calculate__column'>Выберите тип покрытия
                <select
                    value={userData.material}
                    onChange={(e) => chooseElemForm('material', e)}
                    className='calculate__material'>
                    {userForm.list.map((item, index) => <option key={index}>{item.name}</option>)}
                </select>
            </label>
                <label className='calculate__column'>Выберите тип трубы
                <select
                    value={userData.pipe}
                    onChange={(e) => chooseElemForm('tube', e)}
                    className='calculate__material'>
                    {userForm.pipe.map((item, index) => <option key={index}>{item.name}</option>)}
                </select>
            </label>
            <label className='calculate__column'>Выберите прочность покрытия
                <select
                    value={userData.strength}
                    onChange={(e) => chooseElemForm('strength', e)}
                    className='calculate__strength'>
                    {userForm.configStrength.map(item => <option key={item.step}>{item.name}</option>)}
                </select>
            </label>

            {userForm.configWidth.map((item, index) => <label key={index} className='calculate__column' >Ширина
                <input
                    value={userData.width}
                    onChange={(e) => chooseElemForm('width', e)}
                    type="number"
                    placeholder={item.min}
                    step={item.step}
                     min={item.min}
                    max={item.max} />
            </label>)}
            {userForm.configLength.map((item, index) => <label key={index} className='calculate__column'>Длинна
                <input value={userData.length}
                    onChange={(e) => chooseElemForm('length', e)}
                    type="number"
                    placeholder={item.min}
                    step={item.step}
                    min={item.min}
                    max={item.max} />
            </label>)}
        </div>
    );
};

export default Culc;
