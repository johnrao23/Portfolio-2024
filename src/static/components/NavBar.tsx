import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import AvatarButton from './AvatarButton';

// Icons
function CloseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path
        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
        fill="none"
      />
    </svg>
  )
}

function MoonIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AvatarContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10',
      )}
      {...props}
    />
  )
}

// Navigation items
function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <li>
      <Link
        to={href}
        className={clsx(
          'relative block px-3 py-2 transition',
          isActive ? 'text-teal-500 dark:text-teal-400' : 'hover:text-teal-500 dark:hover:text-teal-400'
        )}
      >
        {children}
      </Link>
    </li>
  );
}

function DesktopNavigation() {
  return (
    <nav>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <NavItem href="/static/about">About</NavItem>
        <NavItem href="/static">Projects</NavItem>
        <NavItem href="/static">Experience</NavItem>
        <NavItem href="/static">Skills</NavItem>
        <NavItem href="/static">Hobbies</NavItem>
      </ul>
    </nav>
  );
}

function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)}>
        <ChevronDownIcon className="w-6 h-6" />
      </button>
      {isOpen && (
        <ul className="flex flex-col items-center">
          <NavItem href="/static/about">About</NavItem>
          <NavItem href="/static">Projects</NavItem>
          <NavItem href="/static">Experience</NavItem>
          <NavItem href="/static">Skills</NavItem>
          <NavItem href="/static">Hobbies</NavItem>
        </ul>
      )}
    </div>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <button onClick={toggleTheme} className="w-10 h-10 flex justify-center items-center">
      {theme === 'light' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
    </button>
  );
}

const NavBar = () => {
  const isHomePage = useLocation().pathname === '/static';

  return (
    <header className="...">
      <div className="container mx-auto flex justify-between items-center p-4">
        <AvatarContainer>
          <AvatarButton />
        </AvatarContainer>
        <MobileNavigation />
        <DesktopNavigation />
        <ThemeToggle />
      </div>
    </header>
  );
}

export default NavBar;
