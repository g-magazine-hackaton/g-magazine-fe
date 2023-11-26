import { css } from '@emotion/react';

const globalStyle = css`
  body {
    color: #111;
    font-size: 14px;
    line-height: 1.5;
    overflow-x: hidden;
    overflow-y: auto;
  }

  body::-webkit-scrollbar {
    display: none;
  }

  blockquote,
  body,
  dd,
  dl,
  dt,
  fieldset,
  figure,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  html,
  iframe,
  legend,
  li,
  ol,
  p,
  pre,
  textarea,
  button,
  ul {
    padding: 0;
    margin: 0;
  }

  article,
  aside,
  figure,
  footer,
  header,
  hgroup,
  section {
    display: block;
  }

  section {
    padding: 6rem 0.4rem;
    text-align: center;
  }

  ul {
    list-style: none;
  }

  img {
    object-fit: cover;
  }

  a {
    text-decoration: unset;
    color: #111;
  }

  a:visited {
    color: #111;
  }

  * {
    // font-family: 'KoPubDotumMedium';
  }
`;

export default globalStyle;
