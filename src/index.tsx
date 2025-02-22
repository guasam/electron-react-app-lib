import { createContext, useContext, useEffect } from 'react';
import { Titlebar, type TitlebarProps } from './titlebar/components';
import { menuItems } from './menus';
import './styles.css';
import { TitlebarContextProvider } from './titlebar/provider';

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
    titleCentered: false,
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
      <TitlebarContextProvider>
        <Titlebar />
      </TitlebarContextProvider>
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
