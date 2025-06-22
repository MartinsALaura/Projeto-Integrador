import { createGlobalStyle } from 'styled-components';

const Reset = createGlobalStyle`
  /* Reset box-sizing */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Reset HTML e body */
  html {
    scroll-behavior: smooth;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Reset formulários */
  input, button, textarea, select {
    font: inherit;
  }

  /* Reset botões */
  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  /* Reset links */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* Reset listas */
  ul, ol {
    list-style: none;
  }

  /* Reset headings */
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  /* Reset imagens */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  /* Reset tabelas */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`

export default Reset;