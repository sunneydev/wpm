import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="h-96 w-96 bg-red-500">mew</div>
    </div>
  );
}

export default App;
