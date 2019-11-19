import React from 'react';

function Home() {
    return (
        <div>
            Welcome to <strong>JBoard</strong>. <p/>
            Current time: {new Date().toLocaleString('sk-SK')}
        </div>
    );
}

export default Home;