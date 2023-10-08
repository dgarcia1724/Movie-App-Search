import { useState } from "react";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? "dark" : ""}>
      {/* body */}
      <div className="h-screen w-screen bg-lightModeOffWhite">
        {/* container */}
        <div className="mx-auto container bg-red-300">
          <Header />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="font-bold text-[26px] tracking-[0]">devfinder</h1>
      <button className="flex items-center justify-center gap-4">
        <span className="font-bold text-[13px] tracking-[2.5px]">DARK</span>
        <img src="src\github-user-search-app\starter-code\assets\icon-moon.svg" />
      </button>
    </header>
  );
}
