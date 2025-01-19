import { createContext, useContext, useEffect } from 'react';
import { Titlebar, type TitlebarProps } from './titlebar/components';
import menuItems from './titlebar/menus';
import './styles.css';

interface WindowContext {
  titlebar: TitlebarProps;
}

interface WindowContextProviderProps {
  children: React.ReactNode;
  titlebar?: TitlebarProps;
}

const WindowContext = createContext<WindowContext | undefined>(undefined);

export const WindowContextProvider = ({ children, titlebar }: WindowContextProviderProps) => {
  const defaultTitlebar: TitlebarProps = {
    title: 'Electron React App',
    iconUrl: 'something.icon',
    centered: false,
    menuItems,
  };

  titlebar = { ...defaultTitlebar, ...titlebar };

  useEffect(() => {
    // Add class to parent element
    const parent = document.querySelector('.window-content')?.parentElement;
    if (parent) {
      parent.classList.add('window-frame');
    }
  }, []);

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
