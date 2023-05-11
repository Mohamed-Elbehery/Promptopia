"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <header className="w-full">
      <nav className="flex-between mb-16 pt-3">
        {/* Logo */}
        <Link href={"/"} className="flex gap-2 flex-center">
          <Image
            src={"/assets/images/logo.svg"}
            alt="Promptopia Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <h1 className="logo_text">Promptopia</h1>
        </Link>
        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href={"/create-prompt"} className="black_btn">
                Create Post
              </Link>
              <button onClick={signOut} className="outline_btn">
                Sign Out
              </button>
              <Link href={"/profile"}>
                {/* User Image */}
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
              {/* User Image */}
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                onClick={() => setToggleDropdown((prev) => !prev)}
              />
              {toggleDropdown && (
                <div className="dropdown">
                  <button
                    href={"/"}
                    className="w-full orange_gradient font-bold"
                  >
                    Hello, {session?.user.name.split(" ")[0]}
                  </button>
                  <Link
                    href={"/profile"}
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(() => false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href={"/create-prompt"}
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(() => false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    onClick={() => {
                      setToggleDropdown(() => false);
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
