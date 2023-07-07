import React, {useState, useEffect} from 'react'

const AnimatedBackgroundByRicchKidd44 = () => {
    const [bubbles, setBubbles] = useState([]);

    useEffect(() => {
      const newBubbles = [];
      for (let i = 0; i < 20; i++) {
        let style = {
          animationDuration: Math.random() * 15 + 10 + 's',
          animationDelay: Math.random() * 2 + 's',
          left: Math.random() * 100 + '%',
        };
        newBubbles.push(<div className="bubble" style={style} key={i}></div>);
      }
      setBubbles(newBubbles);
    }, []);
  
    return (
    <div className='animated-bg'>
      {bubbles}
    </div>
  )
}

export default AnimatedBackgroundByRicchKidd44
