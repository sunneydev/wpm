const Input: React.FC<{
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}> = ({ onKeyDown }) => (
  <input
    type="text"
    onKeyDown={onKeyDown}
    className="w-1/3 outline-none float-none py-2 px-3 rounded-xl font-medium text-white bg-[#3b3b3b] text-2xl"
  />
);

export default Input;
