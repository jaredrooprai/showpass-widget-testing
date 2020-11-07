import React, { useEffect, useState } from 'react';
import { Input, Row, ButtonSpacer } from '../styled';
import WidgetButton from './WidgetButton';

type queryData = {
  api: string;
  event: string;
  hex: string;
  ['theme-dark']: string;
  ['keep-shopping']: string;
};

const encodeQueryData = (data: queryData): String => {
  const ret = [];
  for (let d in data) ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
};

interface WidgetPanelProps {
  eventSlug: string;
  apiUrl: string;
}

const WidgetPanel: React.FC<WidgetPanelProps> = ({ eventSlug, apiUrl }) => {
  const [hex, setHex] = useState<string>('#dd3333');
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [keepShopping, setKeepShopping] = useState<boolean>(false);
  const [venue, setVenue] = useState<string>('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dt = urlParams.get('theme-dark');
    const ks = urlParams.get('keep-shopping');
    const hx = urlParams.get('hex');
    dt && setDarkTheme(dt === 'true');
    ks && setKeepShopping(ks === 'true');
    hx && setHex(hx);
  }, []);

  useEffect(() => {
    if (!apiUrl || !eventSlug) return;
    const params: queryData = {
      api: apiUrl,
      event: eventSlug,
      hex: hex,
      ['theme-dark']: darkTheme.toString(),
      ['keep-shopping']: keepShopping.toString(),
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
      <div style={{ height: '20px' }}></div>
      <Row>
        <WidgetButton
          id={eventSlug}
          hex={hex}
          darkTheme={darkTheme}
          keepShopping={keepShopping}
          type="eventPurchaseWidget"
        />
        <ButtonSpacer />
        <WidgetButton
          id={eventSlug}
          hex={hex}
          darkTheme={darkTheme}
          keepShopping={keepShopping}
          type="checkoutWidget"
        />
      </Row>
      <Row style={{ alignItems: 'center', marginTop: '50px' }}>
        <label>Venue</label>
        <Input
          placeholder="e.g.: 213"
          value={venue}
          style={{ maxWidth: '65px', height: '23px', marginRight: '20px', marginLeft: '6px' }}
          onChange={(e) => setVenue(e.target.value)}
          maxLength={7}
        />
        <WidgetButton
          disabled={!venue}
          id={venue}
          hex={hex}
          darkTheme={darkTheme}
          keepShopping={keepShopping}
          type="calendarWidget"
        />
      </Row>
    </>
  );
};

export default WidgetPanel;
