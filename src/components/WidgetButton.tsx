import React from 'react';
import { Button } from '../styled';

interface WidgetButtonProps {
  id: string;
  hex: string;
  darkTheme: boolean;
  keepShopping: boolean;
  type: string;
  disabled?: boolean;
  label: string;
}

const WidgetButton: React.FC<WidgetButtonProps> = (props) => {
  const { id, hex, darkTheme, keepShopping, type, label, ...other } = props;
  return (
    <Button
      {...other}
      onClick={() =>
        window.showpass.tickets[type](id, {
          'theme-primary': hex,
          'theme-dark': darkTheme,
          'keep-shopping': keepShopping,
        })
      }
    >
      {label}
    </Button>
  );
};

export default WidgetButton;
