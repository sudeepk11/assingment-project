import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({children}:Props) => {
  return (
    <main>
      <Toaster/>
      {children}
    </main>
  )
}

export default RootLayout