import Head from 'next/head';

const SmartLookScript = () => {
    return (
        <Head>
            <script
                type="text/javascript"
    dangerouslySetInnerHTML={{
        __html: `
            window.smartlook||(function(d) {
            var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
            var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
            c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
            })(document);
            smartlook('init', '9c6b38e1822ea7da42559a2eb5ee97234df6358f', { region: 'eu' });    
          `,
    }}
    />
    </Head>
);
};

export default SmartLookScript;
