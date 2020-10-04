import React, { useEffect, useState } from 'react';
import WidgetPanel from '../components/WidgetPanel';
import { Col, Row, Button, Input, Container } from '../styled/styled';
import { Global, css } from '@emotion/core';
import { encodeQueryData } from '../utils/params';

declare global {
  interface Window {
    __shwps: any;
    showpass: any;
  }
}

const Home = () => {
  const [apiUrl, setApiUrl] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [eventSlug, setEventSlug] = useState<string>('');

  useEffect(() => {
    if (!apiUrl) return;
    (function (window: Window, document, src) {
      let config = window.__shwps;
      config = function () {
        config.c(arguments);
      };
      config.q = [];
      config.c = function (args) {
        config.q.push(args);
      };
      window.__shwps = config;

      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = src;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    })(window, document, `https://${apiUrl}/static/dist/sdk.js`);
  }, [apiUrl]);

  useEffect(() => {
    if (eventSlug.length <= 0) {
      document.title = 'widget-testing';
      return;
    }
    document.title = 'widget-testing | ' + eventSlug;
  }, [eventSlug]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('event');
    const api = urlParams.get('api');
    if (slug && api) {
      setEventSlug(slug);
      setApiUrl(api);
    }
  }, []);

  const clickInput = (): void => {
    if (!userInput) return;
    const parsedInput = userInput.split('/');
    setApiUrl(parsedInput[2]);
    setEventSlug(parsedInput[3]);
    window.history.replaceState(null, null, '?' + encodeQueryData({ event: parsedInput[3], api: parsedInput[2] }));
  };

  return (
    <>
      <Global
        styles={css`
          body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
          }
        `}
      />
      <Container>
        <Col>
          <h2>Widget Testing Tool</h2>
        </Col>
        <Col>
          <Row>
            <Input
              placeholder={'https://local.showpass.com:9000/showpass-christmas-party/'}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <Button onClick={clickInput}>Create</Button>
          </Row>
          {eventSlug && (
            <>
              <br />
              <br />
              <br />
              <WidgetPanel eventSlug={eventSlug} />
            </>
          )}
        </Col>
      </Container>
    </>
  );
};

export default Home;
