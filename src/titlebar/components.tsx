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
      {activeMenuIndex === index && <TitlebarMenuPopup menu={menu} />}
    </div>
  );
};

const TitlebarMenuPopup = ({ menu }: { menu: TitlebarMenu }) => {
  return (
    <div className='menuItem-popup'>
      {menu.items.map((item, index) => (
        <TitlebarMenuPopupItem key={index} item={item} />
      ))}
    </div>
  );
};

const TitlebarMenuPopupItem = ({ item }: { item: TitlebarMenuItem }) => {
  const { setActiveMenuIndex } = useTitlebarContext();

  function handleAction() {
    (window as any).api.invoke(item.action, ...(item.actionParams ? item.actionParams : []));
    setActiveMenuIndex(null);
  }

  return (
    <div className='menuItem-popupItem' onClick={handleAction}>
      <div>{item.name}</div>
    </div>
  );
};

const TitlebarControls = () => {
  const closePath =
    'M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z';
  const maximizePath = 'M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z';
  const minimizePath = 'M 0,5 10,5 10,6 0,6 Z';

  return (
    <div className='window-titlebar-controls'>
      <TitlebarControlButton label='minimize' svgPath={minimizePath} />
      <TitlebarControlButton label='maximize' svgPath={maximizePath} />
      <TitlebarControlButton label='close' svgPath={closePath} />
    </div>
  );
};

const TitlebarControlButton = ({ svgPath, label }: { svgPath: string; label: string }) => {
  const handleAction = () => {
    switch (label) {
      case 'minimize':
        (window as any).api.invoke('window-minimize');
        break;
      case 'maximize':
        (window as any).api.invoke('window-maximize-toggle');
        break;
      case 'close':
        (window as any).api.invoke('window-close');
        break;
    }
  };

  return (
    <div aria-label={label} className='titlebar-controlButton' onClick={handleAction}>
      <svg width='10' height='10'>
        <path fill='currentColor' d={svgPath} />
      </svg>
    </div>
  );
};
