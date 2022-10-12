import React, { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

const Buttons = ({ value }) => {
    const { calc, setCalc } = useContext(CalcContext)

    //when user clicks dot
    const dotClick = () => {
        setCalc({
            ...calc,
            num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
        })
    }

    //when user clicks C
    const resetClick = () => {
        setCalc({
            sign: '',
            num: 0,
            res: 0
        })
    }

    //when user clicks number
    const handleClickButton = () => {
        const numberString = value.toString();

        let numberValue;
        if(numberString === '0' && calc.num === 0) {
            numberValue = "0"
        } else {
            numberValue = Number(calc.num + numberString)
        }
        setCalc({
            ...calc,
            num: numberValue
        })
    }

    //when user clicks any sign
    const signClick = () => {
        setCalc({
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0
        })
    }

    //when user clicks the equal button
    const equalsClick = () => {
        
        if(calc.res && calc.num) {

            const math = (a, b, sign) => {
                const result = {
                    '+': (a, b) => a + b,
                    '-': (a, b) => a - b,
                    'X': (a, b) => a * b,
                    '/': (a, b) => a / b,
                }
                return result[sign](a, b);
            }
    
            setCalc({
                res: math(calc.res, calc.num, calc.sign), 
                sign: '',
                num: 0
            })
        }

    }

    //when user clicks the percent button
    const percentClick = () => {
        setCalc({
            num: (calc.num / 100),
            res: (calc.res / 100),
            sign: ''
        })
    }


    // user clicks 
    const togglePlusMinus = () => {
        setCalc({
            num: calc.num ? calc.num * -1 : 0,
            res: calc.res ? calc.res * -1 : 0,
            sign: ''
        })
    }

    const handleClick = () => {
        const results = {
            '.': dotClick,
            'C': resetClick,
            '/': signClick,
            '+': signClick,
            '-': signClick,
            'X': signClick,
            '=': equalsClick,
            '%': percentClick,
            '+-': togglePlusMinus
        }
        if(results[value]) {
            return results[value]()
        } else {
            return handleClickButton()
        }
    }

    const className = {
        '0': 'zero',
        'X': 'opt',
        '+': 'opt',
        '-': 'opt',
        '/': 'opt',
        'C': 'special',
        '%': 'special',
        '+-': 'special',
    }

    return(
        <button onClick={handleClick} className={`${className[value]} button`}>{value}</button> //className[value]
    )
}

export default Buttons;