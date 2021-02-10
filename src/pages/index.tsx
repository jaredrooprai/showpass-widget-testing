import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Col, Row, Button, Input, Container, ButtonSpacer } from '../styled';
import { Global, css } from '@emotion/core';
import WidgetPanel from '../components/WidgetPanel';

declare global {
  interface Window {
    __shwps: any;
    showpass: any;
  }
}

const HomePage = () => {
  const [apiUrl, setApiUrl] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [venueSlug, setVenueSlug] = useState<string>('');

  const { data: venueData, isLoading, refetch } = useQuery(
    ['venue', apiUrl, venueSlug],
    () => axios.get(`https://${apiUrl}/api/public/venues/${venueSlug}/`),
    {
      enabled: false,
    }
  );

  // create button
  const clickCreate = (): void => {
    if (!userInput) return;
    const parsedInput = userInput.split('/');
    setApiUrl(parsedInput[2]);
    setVenueSlug(parsedInput[4]);
  };

  // get current url params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('venue');
    const api = urlParams.get('api');
    if (slug && api) {
      setVenueSlug(slug);
      setApiUrl(api);
      setUserInput(`https://${api}/o/${slug}/`);
    }
  }, []);

  // set page title
  useEffect(() => {
    refetch();
    if (!venueSlug.length) {
      document.title = 'widget-testing';
      return;
    }
    document.title = 'widget-testing | ' + venueSlug;
  }, [venueSlug]);

  // when api url changes
  useEffect((): void => {
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

  return (
    <>
      <Global
        styles={css`
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
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
              placeholder={'https://beta.showpass.com/o/rocket-rodeo/'}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <ButtonSpacer />
            <Button onClick={clickCreate}>Create</Button>
          </Row>
          {isLoading && apiUrl && <p>loading...</p>}
          {venueData && (
            <>
              <div style={{ height: '40px' }}></div>
              <WidgetPanel
                venueSlug={venueData.data.slug}
                venueId={venueData.data.id}
                apiUrl={apiUrl}
              />
            </>
          )}
        </Col>
      </Container>
    </>
  );
};

export default HomePage;
