import { Timeline } from "./Timeline";

export default function App() {
  return (
    <div className="flex flex-col h-dvh bg-gray-900 text-white">
      <div className="p-10 flex-grow">
        <h1 className="text-2xl mb-4 text-gray-50">Phase Timeline Challenge</h1>
        <p className="text-gray-300">Please follow the instructions in the README.md.</p>
      </div>
      <Timeline />
    </div>
  );
}
