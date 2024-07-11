
import Form from '../../../components/SignUpForm'
import SideImage from '../../../components/SideImage'
import {images} from '../../../constants'
const SignUp = () => {
  return (
    <div className="min-h-screen bg-bgPurple flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-lg flex w-full max-w-4xl">
      <SideImage image={images.loginSideImage}/>
      <Form />
    </div>
  </div>
  )
}

export default SignUp