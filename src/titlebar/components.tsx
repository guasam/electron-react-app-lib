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

  const togglePopup = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveMenuIndex(activeMenuIndex === index ? null : index);
  };

  const handleMouseOver = () => activeMenuIndex != null && setActiveMenuIndex(index);

  return (
    <div className='titlebar-menuItem'>
      <div className='menuItem-label' onClick={(e) => togglePopup(e)} onMouseOver={handleMouseOver}>
        {menu.name}
      </div>
      {activeMenuIndex === index && <div className='menuItem-popup'>This is good name</div>}
    </div>
  );
};

const TitlebarControls = () => {
  return <div className='window-titlebar-controls'>_ [] X</div>;
};
