import React from "react";

const Restart: React.FC<{
  visible: boolean;
  onRestart: () => void;
}> = ({ visible, onRestart }) => (
  <div className={`right-0 absolute ${!visible && "invisible"}`}>
    <button
      className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onRestart}
    >
      Restart
    </button>
  </div>
);

export default Restart;
