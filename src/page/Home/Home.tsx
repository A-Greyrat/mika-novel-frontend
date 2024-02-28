import Header from "../../component/header/Header.tsx";
import Footer from "../../component/footer/Footer.tsx";


const Home = () => {
    return (<>
            <Header/>
            <div style={{
                height: '100vh',
            }}>Home</div>
            <Footer/>
        </>
    );
}

export default Home;