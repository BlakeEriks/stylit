// head
import Head from "next/head";

const MetaTags = () => {
  return (
    <Head>
      <title>stylit - Repository of 100s of Styled HTML Components</title>
      <meta name="description" content="Browse, Create and Save styled html elements for your future projects!" />
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💄</text></svg>" />

      <meta
        name="keywords"
        content="codechef, codepen, code geass, codecademy, codeforces, codeblocks, codeigniter, codecanyon, code blocks, code m, code compare, code of conduct, code 8, code chef, code alignment in visual studio, styled mac, styled font awesome, styled meaning, styled html, styled element, styled html element, styled component, styled button, styled card, component styles, html styles, css styles, hover style, focus style, stylit, style it, styleit, blake eriks, blakeeriks, be_lockay, styled github, html github, component styles, customize styles, browse styles, browse elements, browse components, css styles, beautiful styles, ready styles, html, css, element, component, developer styles, developer html, dev components, code hashnode, hashnode stylit, stylit by blakeeriks, stylit by blake eriks, code blake eriks, blake styles, component blake"
      />

      <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💄</text></svg>" />

      {/* Primary Meta Tags */}
      <meta
        name="title"
        content="💄stylit - Repository of 100s of Styled HTML Components"
      />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://stylit.netlify.app/" />
      <meta
        property="twitter:title"
        content="💄stylit - Repository of 100s of Styled HTML Components"
      />
      <meta
        property="twitter:description"
        content="Browse, Create and Save styled HTML elements for your future projects!"
      />
      <meta
        property="twitter:image"
        content="https://i.imgur.com/nbbO5W4.jpg"
      />
    </Head>
  );
};

export default MetaTags;