import React from 'react';

export function App() {
  return (
    <div className="min-h-screen" >
      <h1 className="text-3xl text-center font-bold py-5 text-blue-600">RANT</h1>
      <img src="/assets/rant-logo.png" alt="RANT Logo" />
     <div className="container mx-auto text-center">
       <div className="flex justify-center space-x-5">
        <p className="font-bold"><a href="https://react.org">React</a></p>
        <p className="font-bold"><a href="https://ant.design">Antd</a></p>
        <p className="font-bold"><a href="https://nestjs.com">Nest</a></p>
        <p className="font-bold"><a href="https://tailwindcss.com">Tailwind CSS</a></p>
       </div>
       <div className="">
         Get Started by cloning/forking &nbsp;
         <a href="http://www.github.com/rabira-hierpa/rant">this repo</a>
       </div>
     </div>
     </div>
  );
}

export default App;
