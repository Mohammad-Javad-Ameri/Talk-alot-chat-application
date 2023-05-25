import hero from "../assets/hero.jpg"
import logo from "../assets/logo1.png"
import Header from "../components/Navbar/Header"
import Footer from "../components/Footer"
export default function Home(){
    return(
        <div className="">
            <Header />
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={hero} alt="hero" className="2xl:max-w-sm rounded-lg shadow-2xl" />
    <div>
        <div  className="flex items-center">
        <img src={logo} alt="logo" className="w-36 max-2xl:w-24 " />
      <h1 className="text-5xl max-2xl:text-3xl font-bold">Talk A Lot!</h1>
      </div>
      <p className="py-6">Talk A Lot is a fast, secure, and intuitive chat app that lets you connect with anyone, anywhere. With group chats, staying in touch has never been easier. Join our users and start chatting today!</p>
      <button className="btn btn-outline btn-warning">Get Started</button>
    </div>
  </div>
</div>
<Footer/>
</div>
    )
}