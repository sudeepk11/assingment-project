
import LoginForm from '../../../components/LoginForm'
import SideImage from '../../../components/SideImage'
import {images} from '../../../constants'
const Login = () => {
  return (
    <div className="min-h-screen bg-bgPurple flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-lg flex w-full max-w-4xl">
      <SideImage image={images.loginSideImage}/>
      <LoginForm />
    </div>
  </div>
  )
}

export default Login