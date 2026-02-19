import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App(props) {
    return (
        <>
            <CustomCursor />
            <Loader />
            <Navbar />
            {props.children}
            <Footer />
        </>
    );
}
