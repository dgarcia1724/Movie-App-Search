import { useEffect, useState } from "react";

const KEY = "4fefc778";

export default function App() {
  const [query, setQuery] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [userData, setUserData] = useState([]);

  const [searchClicked, setSearchClicked] = useState(false);

  function handleToggleDarkMode() {
    setIsDark((is) => !is);
  }

  function handleSearchClicked() {
    setSearchClicked(true);
  }

  useEffect(
    function () {
      async function fetchUser() {
        setSearchClicked(false);
        try {
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!response.ok) throw new Error("Failed to fetch");

          const data = await response.json();
          if (data.Response === "False") throw new Error("Movie not found");

          console.log(data);
          setUserData(data.Search);
        } catch (err) {
          console.error(err.message);
        }
      }
      if (searchClicked) fetchUser();
    },
    [query, searchClicked]
  );

  return (
    <div className={isDark ? "dark" : ""}>
      {/* body */}
      <div className="h-screen w-screen bg-lightModeOffWhite dark:bg-darkModeBlack dark:text-darkModeWhite">
        {/* container */}
        <div className="mx-auto container ">
          <Header onToggleDarkMode={handleToggleDarkMode} isDark={isDark} />
          <Search
            query={query}
            setQuery={setQuery}
            onSearchClicked={handleSearchClicked}
          />
          <ProfileSection userData={userData} />
          <MovieList userData={userData} />
        </div>
      </div>
    </div>
  );
}

function Header({ onToggleDarkMode, isDark }) {
  return (
    <header className="pt-[31px] mb-[36px] flex items-center justify-between">
      <h1 className="font-bold text-[26px] tracking-[0]">devfinder</h1>
      <button
        onClick={onToggleDarkMode}
        className="flex items-center justify-center gap-4"
      >
        {isDark ? (
          <>
            <span className="font-bold text-[13px] tracking-[2.5px]">
              LIGHT
            </span>
            <img
              src="src\github-user-search-app\starter-code\assets\icon-sun.svg"
              alt="sun"
            />
          </>
        ) : (
          <>
            <span className="font-bold text-[13px] tracking-[2.5px]">DARK</span>
            <img
              src="src\github-user-search-app\starter-code\assets\icon-moon.svg"
              alt="moon"
            />
          </>
        )}
      </button>
    </header>
  );
}

function Search({ query, setQuery, onSearchClicked }) {
  return (
    <div className="relative drop-shadow-md">
      <input
        className="mb-4 w-full py-[18px] pl-[45px] rounded-xl font-normal text-[13px] tracking-[0] dark:bg-darkModeNavy"
        type="text"
        placeholder="Search GitHub username…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <img
        className="absolute top-[20px] left-4"
        src="src\github-user-search-app\starter-code\assets\icon-search.svg"
        alt="search-icon"
      />
      <button
        onClick={onSearchClicked}
        className="py-[12px] pl-[18px] pr-[14px] bg-blue text-white rounded-lg 
      font-bold text-[14px] tracking-[0] absolute top-[7px] right-[7px]"
      >
        Search
      </button>
    </div>
  );
}

function ProfileSection({ userData }) {
  const dateString = userData.created_at;
  const date = new Date(dateString);

  // Define options for formatting the date
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  // Format the date according to the options
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div className="pt-[32px] px-[24px] pb-[48px] bg-white rounded-lg drop-shadow-md dark:bg-darkModeNavy">
      <header className="mb-[33px] flex gap-[19px]">
        <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
          <img src={userData.avatar_url} />
        </div>
        <div>
          <h1 className="font-bold text-[16px] tracking-[0px]">
            {userData.login}
          </h1>
          <p className="mb-[6px] font-normal text-[13px] tracking-[0] text-blue">
            @{userData.login}
          </p>
          <p className="font-normal text-[13px] tracking-[0]">
            Joined {formattedDate}
          </p>
        </div>
      </header>
      <p className="mb-[23px]">
        {userData.blog ? userData.blog : "This profile has no bio"}
      </p>
      {/* Repos Followers Following */}
      <section
        className="mb-[24px] py-[18px] px-[14px] flex items-center 
      justify-between bg-lightModeOffWhite rounded-lg dark:bg-darkModeBlack"
      >
        <div className="flex flex-col items-center gap-2">
          <h2>Repos</h2>
          <p>{userData.public_repos}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2>Followers</h2>
          <p>{userData.followers}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2>Following</h2>
          <p>{userData.following}</p>
        </div>
      </section>

      {/* Bottom Part */}
      <section className="space-y-4 font-normal text-[13px] break-all">
        <div className="flex items-center gap-[19px]">
          <img
            src="src\github-user-search-app\starter-code\assets\icon-location.svg"
            alt="location-icon"
          />
          <span>
            {userData.location ? userData.location : "Location not available"}
          </span>
        </div>
        <div className=" flex items-center gap-[19px] ">
          <img
            src="src\github-user-search-app\starter-code\assets\icon-website.svg"
            alt="website-icon"
          />
          <span>
            {userData.html_url ? userData.html_url : "Website not available"}
          </span>
        </div>
        <div className="flex items-center gap-[19px]">
          <img
            src="src\github-user-search-app\starter-code\assets\icon-twitter.svg"
            alt="twitter-icon"
          />
          <span>
            {userData.twitter_username
              ? userData.twitter_username
              : "Twitter not available"}
          </span>
        </div>
        <div className="flex items-center gap-[19px]">
          <img
            src="src\github-user-search-app\starter-code\assets\icon-company.svg"
            alt="company-icon"
          />
          <span>
            {userData.company ? userData.company : "Company not available"}
          </span>
        </div>
      </section>
    </div>
  );
}

function MovieList({ userData }) {
  return (
    <ul>
      {userData.map((movie) => {
        return <Movie movie={movie} key={movie.imdbID} />;
      })}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li>
      <h4>{movie.Title}</h4>
    </li>
  );
}
