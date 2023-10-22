import {useState, ChangeEvent, FormEvent} from 'react'
import {E164, ec164} from './CountryDialingCodes'

function App() {
  const [numberTel, setNumberTel] = useState('');
  const [nameTel, setNameTel] = useState('');
  const [codeTel, setCodeTel] = useState('');
  const [error, setError] = useState('');

  const onSubmitTel = (event: FormEvent <HTMLFormElement>) => {
    event.preventDefault();
  };

  const onChangeTel = (event: ChangeEvent <HTMLInputElement>)  => {
    if ((event.target.value.replace(/[^0-9]/g,"")).length == event.target.value.length){
      setNumberTel(event.target.value);
      setError('')
    } else {
      setError(
        'You entered your phone number incorrectly!!!')
      setNumberTel('');
    }
  };

  const telE164 = () => {
    if (numberTel !== ''){
      let arrayCode: ec164 = [];

      for (let i = 0; i < E164.length; i++) {
        const tel: string = numberTel.substring(0, E164[i].code.length);
      
        if (tel === E164[i].code){
          arrayCode.push(E164[i]);
        }
      }

      arrayCode.sort((x, y) => x.code.length - y.code.length)

      setNameTel(arrayCode[arrayCode.length-1].name);
      setCodeTel(arrayCode[arrayCode.length-1].code);
    }
  };

  return (
<div>
  <form onSubmit={onSubmitTel}>
    <p className='error'>{error}</p>
    <p className='font'>
      + <input type="tel" maxLength={15} onChange={onChangeTel}/>
        <button className='button' onClick={telE164}>Parse</button>
    </p>
    <p className='font'>Number: +{numberTel}</p>
    <p className='font'>Country: {nameTel}</p>
    <p className='font'>Prefix: {codeTel}</p>
  </form>
</div>
  )
}

export default App
