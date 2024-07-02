import React from 'react';
import Navbar from '../components/header.jsx';
import Footer from '../components/footer.jsx';

const Homepage = () => {
    return (
        <div>
            <Navbar />
            <main className="pt-20"> {/* Adjust pt-20 based on the height of your navbar */}
                <h1>Welcome to the Homepage</h1>
                {/* Add your homepage content here */}
            </main>
            <Footer />
        </div>
    );
}

export default Homepage;
