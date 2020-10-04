import React, { useEffect, useState } from 'react';
import { Input, Row } from '../styled/styled';
import WidgetButton from './WidgetButton';
import { encodeQueryData } from '../utils/params';

type queryData = {
  api: string;
  event: string;
  hexColor: string;
  darkTheme: string;
  keepShopping: string;
};

interface WidgetPanelProps {
  eventSlug: string;
  apiUrl: string;
}

const WidgetPanel: React.FC<WidgetPanelProps> = ({ eventSlug, apiUrl }) => {
  const [hex, setHex] = useState<string>('#dd3333');
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [keepShopping, setKeepShopping] = useState<boolean>(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dt = urlParams.get('darkTheme');
    const ks = urlParams.get('keepShopping');
    const hx = urlParams.get('hexColor');
    dt && setDarkTheme(dt === 'true');
    ks && setKeepShopping(ks === 'true');
    hx && setHex(hx);
  }, []);

  useEffect(() => {
    if (!apiUrl || !eventSlug) return;
    const params: queryData = {
      api: apiUrl,
      event: eventSlug,
      hexColor: hex,
      darkTheme: darkTheme.toString(),
      keepShopping: keepShopping.toString(),
    };
    window.history.replaceState(null, null, '?' + encodeQueryData(params));
  }, [apiUrl, eventSlug, darkTheme, keepShopping, hex]);

  return (
    <>
      <Row style={{ alignItems: 'center' }}>
        <label>Hex Code</label>
        <Input
          placeholder="#dd3333"
          value={hex}
          style={{ maxWidth: '65px', height: '23px', marginRight: '20px', marginLeft: '6px' }}
          onChange={(e) => setHex(e.target.value)}
          maxLength={7}
        />
        <label>Dark Theme</label>
        <input
          type="checkbox"
          checked={darkTheme}
          onChange={() => setDarkTheme(!darkTheme)}
          style={{ cursor: 'pointer', marginRight: '20px' }}
        ></input>
        <label>Keep Shopping</label>
        <input
          type="checkbox"
          checked={keepShopping}
          onChange={() => setKeepShopping(!keepShopping)}
          style={{ cursor: 'pointer' }}
        ></input>
      </Row>
      <br />
      <Row>
        <WidgetButton
          eventSlug={eventSlug}
          hex={hex}
          darkTheme={darkTheme}
          keepShopping={keepShopping}
          type="eventPurchaseWidget"
        />
        <WidgetButton
          eventSlug={eventSlug}
          hex={hex}
          darkTheme={darkTheme}
          keepShopping={keepShopping}
          type="checkoutWidget"
        />
      </Row>
    </>
  );
};
export default WidgetPanel;
