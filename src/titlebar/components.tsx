import { useEffect, useRef } from 'react';
import { useWindowContext } from '..';
import type { TitlebarMenu, TitlebarMenuItem } from './menus';
import { TitlebarContextProvider, useTitlebarContext } from './provider';

export interface TitlebarProps {
  title: string;
  centered?: boolean;
  iconUrl?: string;
  menuItems?: TitlebarMenu[];
}

export const Titlebar = () => {
  const { title, iconUrl } = useWindowContext().titlebar;

  return (
    <TitlebarContextProvider>
      <div className='window-titlebar'>
        <div className='window-titlebar-icon'>{iconUrl}</div>
        <div className='window-titlebar-title'>{title}</div>
        <TitlebarMenu />
        <TitlebarControls />
      </div>
    </TitlebarContextProvider>
  );
};

const TitlebarMenu = () => {
  const { menuItems } = useWindowContext().titlebar;

  return (
    <div className='window-titlebar-menu'>
      {menuItems?.map((menu, index) => (
        <TitlebarMenuItem key={index} menu={menu} index={index} />
      ))}
    </div>
  );
};

const TitlebarMenuItem = ({ menu, index }: { menu: TitlebarMenu; index: number }) => {
  const { activeMenuIndex, setActiveMenuIndex } = useTitlebarContext();
  const menuItemRef = useRef<HTMLDivElement | null>(null);

  const togglePopup = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if the current menu item is the active one
    if (activeMenuIndex === index) {
      menuItemRef.current?.classList.remove('active');
      setActiveMenuIndex(null);
    }
    // If the menu item is not active, activate it
    else if (!menuItemRef.current?.classList.contains('active')) {
      setActiveMenuIndex(index);
      menuItemRef.current?.classList.add('active');
    }
  };

  const handleMouseOver = () => {
    if (activeMenuIndex != null) {
      setActiveMenuIndex(index);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuItemRef.current &&
      !menuItemRef.current.contains(event.target as Node) &&
      menuItemRef.current.classList.contains('active')
    ) {
      setActiveMenuIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (activeMenuIndex !== index) {
      menuItemRef.current?.classList.remove('active');
    } else {
      menuItemRef.current?.classList.add('active');
    }
  }, [activeMenuIndex]);

  return (
    <div className='titlebar-menuItem' ref={menuItemRef}>
      <div
        className='menuItem-label'
        onClick={(e) => togglePopup(e)}
        onMouseOver={handleMouseOver}
        onMouseDown={(e) => e.preventDefault()}
      >
        {menu.name}
      </div>
      {activeMenuIndex === index && <div className='menuItem-popup'>This is good name</div>}
    </div>
  );
};

const TitlebarControls = () => {
  return <div className='window-titlebar-controls'>_ [] X</div>;
};
