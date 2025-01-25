# Electron React App Library

## Introduction

Custom library for Electron React App, used for creating custom window, custom titlebar & file menus in Electron desktop apps.

## Features

- Custom Electron Window
- Custom Window Titlebar
- Window Titlebar Menu Items
- Dark/Light Mode

## Requirements

- Node.js (>= 18.x)
- bun / npm / yarn / pnpm
- Electron (>= 34.x)
- React (>= 19.x)

<br />

## Main Components

### Titlebar

- **File**: `src/titlebar/components.tsx`
- **Description**: Renders the custom title bar for the application, including window controls (minimize, maximize, close) and a menu bar.
- **Extension**: Add more menu items or customize the appearance. Modify the `TitlebarProps` interface to include additional properties if needed.

### WindowContextProvider

- **File**: `src/index.tsx`
- **Description**: Provides context for the window, including title bar properties and menu items.
- **Extension**: Add more context values or modify the default title bar properties.

### TitlebarContextProvider

- **File**: `src/titlebar/provider.tsx`
- **Description**: Provides context for the title bar, including the active menu index and visibility state.
- **Extension**: Add more state values or context methods.

<br />

## How to Extend

### Adding More Menu Items

Modify the `menuItems` array in `src/menus.ts` to include additional menu items in the titlebar.

Example:

```ts
export const menuItems: TitlebarMenu[] = [
  // Existing menu items
  {
    name: 'Help',
    items: [
      {
        name: 'About',
        action: 'web-open-url',
        actionParams: ['https://example.com/about'],
      },
    ],
  },
];
```

<br />

### Override the stylesheet

This project uses CSS variables to define various styles used in window, titlebar, menus etc. Its easy to override these styles in your own CSS. Below are the steps to customize the styles using CSS variables.

Example for dark mode:

```css
:root {
  --window-c-background: #1c1c1c;
  --window-c-titlebar-background: #1c1c1c;
  --window-c-text: #fff;
  /* Add more variables as needed */
}
```

Example for light mode:

```css
:root.light {
  --window-c-background: #fff;
  --window-c-titlebar-background: #f0f0f0;
  --window-c-text: #000000c8;
  /* Add more variables as needed */
}
```
