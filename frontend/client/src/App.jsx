import "./index.css";
import ContactBar from "./components/ContactoBar";
import Header from "./components/Header";
import Home from './components/Home';
import ServicesSection from './components/Servicios';
import AboutSection from './components/Nosotros';
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div>
        <ContactBar />
        <Header />
        <Home />
        <ServicesSection />
        <AboutSection />
        <Footer />
      </div>
    </>
  );
}

export default App;
