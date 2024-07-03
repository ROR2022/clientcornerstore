import {useState} from 'react'
import SignUp from './SignUp'
import ConfirmEmail from '../ConfirmEmail/ConfirmEmail'

const PreSignUp = () => {
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [emailUser, setEmailUser] = useState('')
  return (
    <div>
        {isConfirmed ? <SignUp emailUser={emailUser} /> : <ConfirmEmail isConfirmed={isConfirmed} setIsConfirmed={setIsConfirmed} setEmailUser={setEmailUser} />}
    </div>
  )
}

export default PreSignUp