import React from 'react';

function Home({boards}) {
    return (
        boards && <div>
            There are <strong>{boards.length}</strong> boards active. <p/>
            Current time: {new Date().toLocaleString('sk-SK')}
        </div>
    );
}

export default Home;