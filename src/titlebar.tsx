import { useWindowContext } from '.';
import menuItems from './titlebarMenuItems';

export interface TitlebarProps {
  title: string;
  centered: boolean;
  iconUrl: string;
}

export const Titlebar = () => {
  const { title, iconUrl } = useWindowContext().titlebar;

  return (
    <div className='window-titlebar'>
      <div className='window-titlebar-icon'>{iconUrl}</div>
      <div className='window-titlebar-title'>{title}</div>
      <div className='window-titlebar-menu'>{menuItems.length}</div>
      <div className='window-titlebar-controls'>_ [] X</div>
    </div>
  );
};
