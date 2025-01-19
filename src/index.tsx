import { createContext, useContext, useEffect } from 'react';
import { Titlebar, TitlebarProps } from './titlebar';
import './styles.css';

interface WindowContextProps {
  titlebar: TitlebarProps;
}

const WindowContext = createContext<WindowContextProps | undefined>(undefined);

export const WindowContextProvider = ({ children }: { children: React.ReactNode }) => {
  const titlebar = {
    title: 'Electron Window',
    iconUrl: 'something.icon',
    centered: false,
  };

  useEffect(() => {
    // Add class to parent element
    const parent = document.querySelector('.window-content')?.parentElement;
    if (parent) {
      parent.classList.add('window-frame');
    }
  }, [])

  return (
    <WindowContext value={{ titlebar }}>
      <Titlebar />
      <WindowContent>{children}</WindowContent>
    </WindowContext>
  );
};

const WindowContent = ({ children }: { children: React.ReactNode }) => {
  return <div className='window-content'>{children}</div>;
};

export const useWindowContext = () => {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error('useWindowContext must be used within a WindowContextProvider');
  }
  return context;
};
