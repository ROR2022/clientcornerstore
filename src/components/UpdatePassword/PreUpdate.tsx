import {useState} from 'react'
import ConfirmEmail from '../ConfirmEmail/ConfirmEmail'
import UpdatePassword from '../UpdatePassword/UpdatePassword'

const PreUpdate = () => {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [emailUser, setEmailUser] = useState('');
  return (
    <div>
        {!isConfirmed ? <ConfirmEmail isConfirmed={isConfirmed} setEmailUser={setEmailUser} setIsConfirmed={setIsConfirmed} /> : <UpdatePassword emailUser={emailUser} />}
    </div>
  )
}

export default PreUpdate