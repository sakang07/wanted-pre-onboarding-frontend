import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'Pretendard';
    font-weight: 900;
    font-display: swap;
    src: url('asset/font/woff2-subset/Pretendard-Black.subset.woff2') format('woff2'), url('asset/font/woff-subset/Pretendard-Black.subset.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 800;
    font-display: swap;
    src: url('asset/font/woff2-subset/Pretendard-ExtraBold.subset.woff2') format('woff2'), url('asset/font/woff-subset/Pretendard-ExtraBold.subset.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-display: swap;
    src: url('asset/font/woff2-subset/Pretendard-Bold.subset.woff2') format('woff2'), url('asset/font/woff-subset/Pretendard-Bold.subset.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-display: swap;
    src: url('asset/font/woff2-subset/Pretendard-SemiBold.subset.woff2') format('woff2'), url('asset/font/woff-subset/Pretendard-SemiBold.subset.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-display: swap;
    src: url('asset/font/woff2-subset/Pretendard-Medium.subset.woff2') format('woff2'), url('asset/font/woff-subset/Pretendard-Medium.subset.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src: url('asset/font/woff2-subset/Pretendard-Regular.subset.woff2') format('woff2'), url('asset/font/woff-subset/Pretendard-Regular.subset.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    font-display: swap;
    src: url('asset/font/woff2-subset/Pretendard-Light.subset.woff2') format('woff2'), url('asset/font/woff-subset/Pretendard-Light.subset.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 200;
    font-display: swap;
    src: url('asset/font/woff2-subset/Pretendard-ExtraLight.subset.woff2') format('woff2'), url('asset/font/woff-subset/Pretendard-ExtraLight.subset.woff') format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 100;
    font-display: swap;
    src: url('asset/font/woff2-subset/Pretendard-Thin.subset.woff2') format('woff2'), url('asset/font/woff-subset/Pretendard-Thin.subset.woff') format('woff');
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #efefef;
    font-size: 14px;
    letter-spacing: -0.2px;
    color: #1f2123;
  }
  
  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
