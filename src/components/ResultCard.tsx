import React, { useState, useEffect } from 'react';
import { SimResult } from '../data/results';
import { trackResultClick } from '../utils/tracking';

interface ResultCardProps {
  result: SimResult;
  onOpen: (result: SimResult) => void;
  isDark?: boolean;
  persona?: string;
}

const PlatformIcon: React.FC<{ platform: string; isDark?: boolean }> = ({ platform, isDark }) => {
  const [imgError, setImgError] = React.useState(false);

  const iconStyle: React.CSSProperties = { 
    width: '28px', 
    height: '28px', 
    flexShrink: 0, 
    borderRadius: '50%', 
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDark ? '#303134' : '#f1f3f4',
    border: isDark ? '1px solid #3c4043' : '1px solid #dfe1e5'
  };
  
  if (platform === 'LinkedIn') {
    return (
      <div style={{...iconStyle, backgroundColor: '#0077b5', border: 'none'}}>
        <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </div>
    );
  }
  if (platform === 'Facebook') {
    return (
      <div style={{...iconStyle, backgroundColor: '#1877f2', border: 'none'}}>
        <svg viewBox="0 0 24 24" fill="#fff" width="18" height="18">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </div>
    );
  }
  if (platform === 'Instagram') {
    return (
      <div style={{...iconStyle, background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', border: 'none'}}>
        <svg viewBox="0 0 24 24" fill="#fff" width="16" height="16">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-5.838 2.435-5.838 5.838s2.435 5.838 5.838 5.838 5.838-2.435 5.838-5.838-2.435-5.838-5.838-5.838zm0 9.513c-2.03 0-3.675-1.645-3.675-3.675 0-2.03 1.645-3.675 3.675-3.675 2.03 0 3.675 1.645 3.675 3.675 0 2.03-1.645 3.675-3.675 3.675zm4.961-10.405c0 .731-.592 1.323-1.322 1.323s-1.322-.592-1.322-1.323.592-1.323 1.322-1.323 1.322.592 1.322 1.323z"/>
        </svg>
      </div>
    );
  }
  if (platform === 'Arab Journals Platform') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAtFBMVEVHcEwJIgAIHgMAAB0NJQclJyoWKBAQJggKHgYIHgMNIgUdIhEJJgADDQD59vQ+sVE4m0X///8BAADW2t07o0oNIgAFEwDj5eU9qk7J0NURMgkgTx3++vdAt1ScoKVkZWbt7+4ZPRIcChwmXSUURxjk6OsrcC81iz0xfzhVVlorZiz/6TqorLCQk5i8vr9DwFjv9PypjBq7pjjizjdwdH1YQiZ4WSZ+bRGBhIogRyPOvDXhxRLNqxazAAAADnRSTlMA6Zn+Tv0SKrDMff1k9cWeChYAAAI4SURBVDiNbZNnY6sgFIbdMxGKgAghda/s1XX///+6GNu0Tfp+gKM8egbnaNq3PH/afV/7Q4ZOy9wdLYeXVPfujl0qBGBzbSQcHQNRUuvHsaOjDjBI7KJwNbuwKWSgpcS5AXrTAChFYZ4OnlusTDOXEAwduf2fAAyxmF8+1KF/PLwczUq9kOTTi0UUgFHgmafLx4u5MleFbSCIQU6CKf6hlLjyNHWwKk4vx+Pr6WIZOZZlM+VCIWhJGLhG+O/1cFgVajVdK6Qdw/TqgasAc9Tb9luy32+P+3227O3eDqVyMhvrVjIwFOcnpSiK6rNaRzuxC4AbVVOXC9mgdRJNSp6frvsiztAgS+5qDmGwQdt08QDY75CpYrk5wADF90BUZ88NA8LSPFWEFiXxPZAlmwoA7qsYobqE+gGI0q0q1qBrMwFg12ePQJwiCMpgBED1Vt9noYAY4RFwKJRoHWePQF1ATMc0BaTbNLoHVJ79IMae8LoWxV8h/ALOAvrXu9ihOq6jRZRl2WIEsixaLJSLZSVm134K+32cjorjNO4nM03rpEb69bpnaLNdr5ejNut0ud9sJnu5tqeGcfk755Rz5BseQiGaqy2vaFVV4WfPeTnctUx2Y/84jorbaCRod7C6DZBOEMMY02CmPrFm1hxiyBC5dbVm5JIp8VxwXeciJ1g9SfFjAg1K8hIDAHal2EkA8JAT+nv6vIqp912LYdspkomHAQ4o4dRHmCFfZUSDP+bbVZNrkLk3WV/6D48iRgYQ7EMPAAAAAElFTkSuQmCC" 
          alt="Arab Journals Platform" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'University of Rochester Medical Center' || platform === 'University of Rochester') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAq1BMVEX////v8PPf4ex8hqaIdiudhzN+ia3tySL/2ir/4Cf40yz/2Cv/3Sj/3yeCjbDwzCBdWlSVhUikkkQ4QVfJrT6slkTcvTaxm0KbikdlYFKKfUt1bU7BpkDTtzeMf0n/4iaHj6xWU0tMTlb/5CV3bk9+dE2BdkygjUdsZlDjwjTNsDwmNFpfXVLsyTHDqD8QKVvFytohOHMAAF9JW5GTgDaTnLtPSUADHlYsP3UKUwoMAAABHklEQVR4AaTRBbLCMBRA0aKxF6Cu9EGqCR+X/e/s21jTYZTb8dO482GT6ajJAGfzhdV8NsAloYxyQSlwyQGArIa43rieH4RRnLhpFiY2Ei8v8m0ebLPYjd1yhIgSAaVkfx9auNun/ymV/rffWWtW/wUBsgoR1/aG8qxuWjcoWNkFfURsbKpYYxMUYNThC9+gbIOCuZ7q9Aj7Y2d0bU6sDNXJ2EhMkXXFscyq+HA4wwiBArC+iFNxPB6phStNBRx9fdTaJ0CpHp7zsgBmlOBlnghlJCwuzqArTxopG9c7Utkk/Gq/9s2rhIByE4OoutvEsfVqGNUqYYKZq2X/3R8oY0XxcXfe9HxBFMHr6bzt8jNzXV1zA5yJ0MKCkYH2AAAdOx9g9PAY2AAAAABJRU5ErkJggg==" 
          alt="University of Rochester" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'Japanese Inter Systems') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAVFBMVEVHcEwYrJ8YqZ4YqZ4ZIoMYnJsYqZ4YqZ4YrJ8YqZ4Yqp4YqZ4aCn8aCn8aB34aCn8aCn8aCn8aCn8aBn4YqZ4aB34aBX4YqZ4aCn8aCn8aCn8aCn+TKJxuAAAAHHRSTlMAN4F3FAyW/02GJ9eW4iX/pfXvPnJiW6zEhHeyZLzjYwAAANJJREFUeAG1z0d2gDAMBNDBtugw9Hr/e8bPVoiTTfrfSBpwwz/KjHVIiDUZVF54JR5l4eW6rgjwiHNcW6WD/vwstXGooeo4mzBI6BvAtV3XCtCEQN72aQQ9OQxkD2nSUyACYOzgdZPOkdjKVFZm9vB6zrKEIL4qyFYi4KbXLQEptJ3p4DnOpUaCRbsdPOAdI3aNLKpC1T3H85zY14WqgPoV3DBNg0uCL1qPKTg2fORGXnNwcXR4R9jhcVCQuokEb6R4IrESiZ53mxjokDimdw78pxcg4w1Np2SoyQAAAABJRU5ErkJggg==" 
          alt="Japanese Inter Systems" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'U.S. Department of State') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAABO1BMVEVHcEz//FP/9l+ypYaqnIPCs4jJvI2ekoX//z+mmIG9sIj/627q2IT/7GjKu4X953Ly4Yv55HCoklf///87Lj0CAEcuIUBPQjkiFUTq6eje3+Hv8PD09ff6+vsaCUPQ0t5iVTa8vMHl4t5aSjhGOT5sud5waHna2tlhOxZgWn1aNhNFPWsiGFjFxNHLvnmSiIGdgW1qRykwJFBDNDerqL5+e5CZlrC4qF1aVHi/t6vd1btgNwTV0MtSQloXDFdVTnGNeVByUjvKw7N7XUmDbVhYMgTG0smdnZ+TkZ2Kr5lVrtamw9Fwr82+sXshLJdtY2LOeoS2g2mwrK2uoJRSYnBsZoeRl4s1LWO0oUCFts5fqs3pkInogn7qhH1XOiPLkHmehTikxbMrglEyc0wUczxilHWQuc7RyaEjZUBnHwUlAAAAE3RSTlMAKDTg7ci2/Rj810qGQdBYbmP5a1gDSwAAAlFJREFUKJFlk4VuG0EQhi+myzkOaRaOyec7MzPHdgxhUJip7fs/QddO6irtSCuN5pNm/535l+P+xMpWyC8IgWBkhfs31sJuWiTz6LrhzW9oNVQnyDQpoUikiNQ3Vv8yX6AbRYikKtXqtF4smXpaWF/exmPHJBUZNEmSQC1f4aiY+6KrAURLKQNA8fZv9j0VtKkY1YXPzqEioikVAOQfe7G9fZllZT2a3p3O1udQTNfqlQtDXvNhaLHXgshSqi7lxzEDl6xlazWVU+YPBGlmpN204gGmY3uhgloD0UrrNt43bvwBhkr/NDxSCi6+O20hhnAHKt0aDWkA3vMNvYaTUAUrgb4UJY7DI1Xjw+HNQOG+PaoBDfUQCqGAc5v2immD4pXogLhzVbzvaTyR0NIENRgAtgnFjAx4IE+dHoZ3t3AQ2MBQbFC5DH2igZPz/rdDpn+WSLB+0T+kXUg9mr2m4lW6mjo6NOK1mQ5ImU0cUAE0Q62uxtrDUKu6cnJyf53WFbzlW8ckkMsqdQYszeXj8UiX+6v7s/PVchczmFBE5H2BAQrSjvvz4k6fjp4e7hNGrblxNFdigbAhfGjmPM3p/7/eh5vpAXHvv9Zw0uEPLPDVIntCe9NC8VTZ4cT2RlmmtCuWT2thcrSzulC4CXMVhWxrLUswpkHFTc+Fw2r1NUZxYAxbIsZbFOE/FfJvTldLFUrM7L82MkGMutLQ3GdylCYqJqWeVKSmQW4peMdQ72CKG0RBAmJsW98Hdjb/rdIkHE0UnR9W//5/mVSDDA8+w7+Jal34FTX2qgIgSaAAAAAElFTkSuQmCC" 
          alt="State Dept" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'Carleton College') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFdklEQVR4Ab2XA5RkSwyGe3eP1rY19rNt+72xtbZt27Zt27Zt292dV9/OVJ/BbSxzTjXuTf1/kkqlUiZ7IiJZFi7ekm3lqq1ZUv+XvHPnfuKqtXunDR+95GjnHtPutWg7Thj8Hj5myVHeoYMuc5gLBlimZ5HzF65l3bh5T9ZUYt9NWw6Nbtlu/K2f/24jfu9Ws5b1jJbiFcOlaIUwBr+FZ7xDB13mMBcMsMB0ifzK1ZvZUolz7T94pm/D5iMt/u9Vl8LlQqVYxXBLOa8YcyW/eGtl/wRxSx385hnv0CmidP3fqyYNm4+yHDh0pi9YNmxHcvPWPU3uNW3mugMff9NQCpb+z1zWK+aJW0CCIo2Xir5xDgc66DKnYOlgMxjTZq07AKaNw0iuXb+tyd/rP2TeDeWNlKgU8cQ9MNFqQITHeJ42AmnfY4QwFwywwATbxpVWVOLo9fbpN3je9WIVw6S8d6wZ4IzEAONlafcoKVI+VC1NiBRTeVBG5QD6vEePZ3zzDCwwwYbDxomYzRad5bmnzFi7F2uZkNEj/kPM+kL8wZf1JSyuu8RX6yv/RHSWNz+qhTFSqGwIuhKV2JNvqeCTsixggg0HXDbu7n1mPg3HwcNn+3z0dQPC/hirM3pNluNVQvW+su/Aabl+444cO3FBVJLJqdOX5dbte7J1+xH5Pbi99Ow3S06eusQcGwaYYMMBF5yaG+8D6zUZbilYJtiq1i0TeYnKEeL3TlVZumKnICPHLpP3v6gnZb2ipaRbpKD39S/NZe2G/aIFY1imtJEEGw644DRpURNH+L9bTdhGaclJsJKK/MOv6suJkxcFqVl/iOQo/IeU8UjxThMUrxQuhVX4tZHrNx4Q5mbcOXDABaf2vkyzNmOvsbZsn7Rrjod4fvjoOUHmLtjMthSPoMRMwB7KOwg/+76xIBs3H8SoTHpwwAUn3KZ79x4m/PBHK5QtlRVp2tCTbJOnrxEtwVFdhGzWmW60QwqVCZaVa/bI7r0nqZKZDIADrh/+bCVwm5av2jXV752n4bekKSYkjPz4Z2sxWyyCnDl7VXmepLI6VkUnzqEBtRsOFQwoZmAAAy44FfcU07DRSw6TrZTSdEBlg2XoqMWiZdnKXQCSF4bkDAwD6+1PakvztuP4bWgsXLyD29Sp+9S7HCYZtx57du/+U6Jl1PjleKfD79CI8t4xgrGV7OjARX7AbcLSomk8I/mwLuiDmnLjxl3R0mfgXLaQuAckoufMCIeR4h2cLdqNE0MD2L8fqkr34MEjsVqtgqiikWqABn7+YTNAcWdaAh0BSqs6uZ4zAvEaz/kSGCQhg9otlFwtYyasIDFdzgGc0gnoKAkNt6HeBYOGLRAtqt0Sg2Q12mIqf2pwQNndBXBR4OA2LETs3VKqxn/+fRO5r/IAuXzlFlWRyOCBITl1Il/Jf6Vl+/FUT1VLiIKTQmSvFBMFajsnm5ZaqsDkVwRebyanA8ZLynMp90jhwFENh+zYdYxilskAOKiwivMq3A4PI0ZpBTp34RZBzp67Ku98WkfylvhHVMuVLl8KqDMCQzZuOSSIakqJIgY4PowcHcdMBpyTb/SE5YJcvXabZlOoEyQbBxYRSazRT86dvyaXLt+UJ0/MqhSfcOk4dtqQ6K6GsHEYaQ8fP34iFy/dICoq5HdUjtxUhWW8kLzV6w6iWcF45w2JKy0ZoSUnKK8UkLfVMoSrdqxu4+FCf/BHSHsOKbwTvsH4/IcmKcb7OmnJnqUpxQielfGIkqLlQyHEY+4LEPMeYyFm/Ymc86b0edpyCCinEDLwsJLB/cB5W+7SxST4dVxMjK9mXKu4XnHNKvI6rmYv63La4vkvpy5ez8ekXM85zxkvcj3/HySDgocJ/0ogAAAAAElFTkSuQmCC" 
          alt="Carleton" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'The Most Influential Indian Muslims of 2025') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAe1BMVEVHcExa4ubeQEPaR0zjMTLkJSbhLC/nISLiLC3dQUPZQkPgMTPkMTLgMDLkLi/FUVbIUlXmKyzpHh+vnqeMqLLjMjPqExO/aW7YMzTjNzrhOjzcLS/YTlHhLCzjKSungoDFYGLcKy3fOjzpHh/lJia6U1feLy/iQ0TTLjKdj9J4AAAAKXRSTlMABY1Vyf+f7K+BaqXckv8wO77/Dgrn/xx1ob2HYvbsEiV6sfL4SdGZWWpQe40AAAERSURBVHgBYoACQJ/zgMUwEAVQ9MV20jY29r/CnpqTOzj4lGSFPaqmGyaWLU4wJHTNcT1E/ABQ/BARDSByEPLihDQzYXfGwUkRSXzg6MUBAtkJIPUD3li5wg2FyYVsBO9NzTIOuVCqmpuT0XgVQNvlvg1uCWAbWsBD2Kt+blda3Xck/sBF4fGhPTmj5ilHqoibuONTooW6OzGcuJDCwuSLGeEWlZZycYoHiW8a7nSYuSCIFb4dNVAybigWtCNvOr9ZeJPGmVbyxor41AXWe0LRhHyzTZ7kjF/dxMPQSPyhtVzQrg1/5Q4Xq6+n/KfdfgkRxwOINkSSGGDtETJ1QN0QizvwJcQsE9VhT+yq7Gr/LXAGEIgOVakqQEAAAAAASUVORK5CYII=" 
          alt="Influential Muslims" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'Amnesty International USA') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAA21BMVEX+8wH+8wP+8wD+8wL89AP/+ADv7Bv48RX/+wPVzhpcWiialB+vqx85Ow/TyylqYhQwJg3v5iZTTRzj4BX/9wC6tiKJhTDW1SF3cyBaVxu0tB/KxRxBPRf//xDj2B03PCClnyG6uBlnaBv//QikpB2IfyBkXiGwqCZBRCN7eiBiYBeNih1eXRulmxd2cijPzBJ+fRj46xkAAAwsKBlsbyCdmyE9NhKMiCZLSxFlYipYVy4bFxstLxEAAAAAABEbEQ4vMBqimy9pYBuzuDFqaiuSkikRGRAxMiiPjjMKrUF1AAABsklEQVR4AW2Qh2KjMAxAkbDABDIcG+IeDVmM7J3uvf//i87kZlu8radt/T8A0AareiAjx0WoRADcq/kEWEWBgnqjye0qQ2S8JdpSVTAbgKkw6nAArIAWcV07+cERq/KJw9Nu0uu7AN8sEQZ8OEpSN+P4zQ5RJXm/GPcdAPxuWcS58NIRAatwOxFT7s3ifkUbECA2Cc0dYAwrOssXy1rKEeCTRzTI+GVEzGUAYAR/jAEJSBFTSgFxxYk450jKMl1G6uhRthoswrgv9bCxXqdar51sg1hCf+vu/ObUz3Vj6wT7Q+cs9s8vCCwDR81Lr3151Txcj73tTGxX3QsptiH9yvLmKpjm+6Yf3Xq3Ccg750J278XRK24eDsv5rD+dhdvO3eBx2PZOk+6dg6WhLQbuIEzkYCUGMk2TfkDhRgVuCW10pUxiL06kkBu58txYiE1nsykhoJzUoqfoebk8eQm0fp3so6viLYjVL3jem836gV6e785f/EAfovfX93NP4RG+FotDkH0cHmfnh8cwraWpLiK9QdsCYKZxTBGZbZatGJHiCpgFpoGGIphhg328sXwaZsFPDeIowOlwGVwAAAAASUVORK5CYII=" 
          alt="Amnesty International" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'George Mason University') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff'}}>
        <img 
          src="data:image/webp;base64,UklGRsYAAABXRUJQVlA4ILoAAAAwAwCdASoQABAAAsBMJbACdEf/2QkSmjxZxdUZDl/uEZMwAP74QFVX4aan10wAL8LMAoUfXwYg9C3UgbsHOjZhASY3kkc5sSH9Uv4T7M6GP1LFCIlOzHrwW3/co2Y/kpExLUXxx+IfPEDq7l5edW4zIAWRA+w973mo8vajKyPIgGQu12Aq3xPKtDmJQfomDZMKEVcWcKMP1tySPY6dwVsQYT/0Xod6ynOc3DqDXs+5a3P9blrys+QAAAA=" 
          alt="GMU" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'DC.gov') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAM0lEQVR4AWP4TyKgh4bW1v8MYBIG8IswAFlQBAP4RRggWpGl8YiQ5wcGEhCNNYxoP5AIAMbUHWN1n/uoAAAAAElFTkSuQmCC" 
          alt="DC.gov" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'The George Washington University' || platform === 'GWU Medicine') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/webp;base64,UklGRpgBAABXRUJQVlA4IIwBAACQCACdASogABsAPtEutFooIagoGAEAGglsAJ0ygzM1g7HgRwKfyxVH909R7PR9FewIMs7uah206j27PfVohMCz5NL2jSa/x3sni5nJAAD+1RbuaL1WJbfz8NJtqQS2cSY/6tFh8hlWm33EySdm6c9FgAF7G4Pb3zcEmmsUgOoms07Z0YjYDGfHmkc6pCpq2XPSNv2K0izqsLAhoXj1lHtXUt/lsKef0qhhGWvdNev/yVV+zniPnTbKomu0Ocrfx//Q8nJj5tDqvMLTq++dkEf4v/6065ncNqnECOz8m6x9PcGeGL/x3wazagNgv/wrOx1cpCxKivL3KPoS28ubQJe0m7EY+6+B2bxyVI3CMJyU7C4GC4ae4Zesus5aJup+VM2BeCXbtcG8nr65vTetBedF/FTdogyvgmlNli3hJisVGTOTAl3CRW48DPbcoO2UYtM+Rcu8L+8zl9nkkzAK5u+pLKFqH++of3788IpgYYGedTj2fXaI/LgtO49nnPuUR8OtoQBDMjcIrTekAAA=" 
          alt="GWU" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'The Org') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/webp;base64,UklGRpwAAABXRUJQVlA4IJAAAABQBACdASocABwAPtE4tFooIigoGAEAGglpAAPkDln8BsUwb44SuLj8OBAAAP7+hvF/9yl/inzH13v4P8/9Rr/w8qsviQV5QofttjGE3T/7Lv+mro/5pbdeLC0ef80vk7/kogp/4/35A+PkgpXrSQUyWHr/6Mm+8F2I8u8dPO8K3D9bWrltqHP2DfTDXRBAAAA=" 
          alt="The Org" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'WordPress.com') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/webp;base64,UklGRlwBAABXRUJQVlA4IFABAABQBwCdASocABwAPtE+tFooIigoFAEAGglsAJ0yhHAZACaPSVWeKz5j1Br9VQ7NSIEiCdBHY70MK+DngaVvm9TsS+gAAP5u2Gid7SrHB2Y8c3K3KYRaMLNZMdWnUOu+bsQV9Bo9QTLmzoNNyMwjKi4ji+Zgl54/BHGfcWJKxrXltOrbf/EOW6CPrt59cfJWz/2K3qKmS5aN/+WMuUgcVqEhWQkQ2/UMfNBVcpDnbaUtX2vr4LHCYquNdWz+Psv5Nvq+GhyOW27AEEvspOkX98/8aMdZ7YFZCdQ8YzcIPSU8bQEzwGjBYhjpNT/VqaK/eXq5cqKIERKto9eT+84jJH3QP3/5/qiVOmrUi6buzp/f8ASpJJ3ysZeAB8IgBPCIEgO39l/IH1wta/7pFzlf+Vzz1/BfokC+3T+SkaqsAjU2iy+zvlzi85wnv8GtdulgAAA=" 
          alt="WordPress" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'Council of the District of Columbia') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/webp;base64,UklGRmgBAABXRUJQVlA4IFwBAABQBwCdASocABwAPtE+tFooIigoFAEAGglpAAgQSAD6Ks2NEB65vRV/YAOL/N/TgeNdHZC4iDEGrExtO2l6kEEHj7AAAP72E+A24oxy2A/moWsgzRZZzRWCNYh6zXagPozBXoxkCs9Z2PfXoOAYP6DC8HLgYRhz8zsB4+tlINKdcYTAVNl60YmaGOHfkw2AnmtbT90F4g2DJ/1jMbPqFG9XM8cyBg562rsWD8zXl/LhkTfQhfFHX8HPOY4BahvHhg09wrLSAY2gkc0gnLrCzzVPzJ+6ZSEx9Y2o83+6mDDedL0PquOpkW1jwfazV4Eac1dcMTH+KV/o+/yzTHc1ChVMd6LsSA6ooQ81qplPUWJMymWGvQQKx8exgsWR8YL/z+W3WuIXHzbfVfit10OermNhac0mb2jbDid02zN+vr2qZMrCTuDukkPEjBe9yXBUCpoH/yvICwBYvL1wAAA=" 
          alt="DCCouncil" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'X') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/webp;base64,UklGRiQBAABXRUJQVlA4IBgBAAAwBgCdASocABwAPtE+tFooIigoFAEAGglpAAUQIYL/yvKz8/Bhz3fLTb2tybRfKvutX9ozg16dEb6AAP724VJUHADPDAQZ0wvQAkO9FvndaykE6yy0fbS28/Hiw3nri4SuPLyVj8Vwc23wNeKgSxCgPqBCnTO06a2MHlBtLuFtdTYuDgvg2mjYojR1cRxK3Ior+tINFNhawlpcYGtw8m02/2jBbngfFf8PeTs7C0ikGbK2gVT3omeL9QjJximQ+Jh8Q/xZvYd+m8TTMV4SnnXcAqPUHESyTKwfnqKik+CDiYa9s3tc1I3jH6OGnk0M5jIh2wFAXeXFHkd9IVXfLUZ7zkxk+bcpPUH6L4ACCz1wQgZ4exPQAAAA" 
          alt="X" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'The University of Texas Medical Branch') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/webp;base64,UklGRhwBAABXRUJQVlA4IBABAAAQBgCdASocABwAPtEwtFooIigoGAEAGglsAHgzzgA9B7QncJXekKSf1sUpR7ahdLJZoW7WqR2WVAAA/vYRFBpQC/TRK8ngJWHf7IRLoxiucQBHxOTt7rIhsL9ILvCmsX0TacMnbwbeG0Qm+5ZL15OX7GABKAe58Hdu/dMe8lAAnavNVMhdDV+74jayyo5b86S0wX/vidsQhmIS1DQvijZgrRK7AB3C/gbWgWCw5KHwAQoEoez5ZgluktVLkntY4wNSUuO57p5L6dEE6LUQYTuejF/pogPcMC9LjM0xehOf89YBz/TzQ5WWPCTbFZlrAgbwM+dFuA+WViP5O8QvJZTzdVrU/McfyK/fBaVlSnuAAA==" 
          alt="UTMB" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'The Virginia Department of Agriculture and Consumer Services') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAAAQAgCdASoQABAAAsBMJbACdADL7En+yksAAP3hylKTC1bz44cE5wzfplPQeCNpXz7Zi0zRdNWs8VwOI85EvDNtGagenbCdYgdAlOywGZPGj+M4c7KfieL07V1Y4GsLVdosQT1C+562e522ipt4//jCJBEna/+IM40/v7EvSg2EXAOx1IArUHAAAAA=" 
          alt="VDACS" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'unrwa usa') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/webp;base64,UklGRugAAABXRUJQVlA4INwAAAAQBgCdASocABwAPtE+tFooIigoFAEAGglsAJ0v1pwGKBwABBEBf6kTdPtK6uANerSKygmPCpsWGyAA/vYGHVHU6izSqB0KwpoHiIFN5qTuuToZxtwms/cXVXY93uwV8flPUIXpgwLXRS6AzXbKpzskdofvRRBokE41LcEsTTKMUhy70qLZHx8GKTJfHvthN9wJfZiFJqxivWBVvR9FBRWzCjvhFpxKSs2JB9lyI7HCMctRjt5z1QtL5hBv2zyl63cq6nzyjCSSyKomKwdiBn0KunSw5YHZOvrmAAAA" 
          alt="UNRWA" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'Virginia Commonwealth University') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/webp;base64,UklGRjABAABXRUJQVlA4ICQBAACQBgCdASocABwAPrUurVanIacnG/DgFolsAMD8izwOABLAG8ek+gemVnm0o9IR8W1Prgd9V3iUjtDlsGmAAP75vPLJoAmsddxkQELFnntf9NeeQAlAzsPfqwShwZuGg5r0fAfQFn9ePNN61lj/j/bm+JR+QjnX1tstRkaD/AL/X4lHcrltVU4oTq57Y6pLMs51kLhfJfBm1Fc8N7C6tSZ/lV7xkseEL6uEqyDv6U/+PMHTHnJzD6TqSN9Hdn7xGId+P/0/5ofvsmS6+4Pb//n/iX/jvhZLPmyhPVS/l8vy8V6kYUAfTO5tuyLqoy5Gu1Qei+JzzoVCgPcr972LsiCFa8+64w51wlZjddKfbQf/9md03y8F8WctBQgHVWbUUa3fEAAA" 
          alt="VCU" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  if (platform === 'Jefferson Digital Commons') {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACMUlEQVR4AZTRA2wsUBAF0I3V8Nu2bdtmbdt216xt27ZtGzFq49b2QzxnRABA+CDNLDv7TQfnfxviIo8ZrghScUOcjdty1nig6oTHOp54ZhKIF9QIvLZIxHvHLDAym92nY2eAd+K0stMfNTCNXFiB3JGzWYFEziCUpBrPBeC1MKnsxBsVTCPn5pBLMwgNNyQ4uL0CeUmLBDGmfBF4KWBSdvSFPFYjRFwRWhsxjShcBBz8kuRJtqFEskM4keoUSaS7xhAZ7nFEplcikeWbQmT5pxIfK9h0LUVMgnIWga38tyq2LUsrMfTN2B7wSsGyZb6dO/I2MPBMXgT+iFNib75Xbrn1Sa3l1jfNFj22H2sl8FKK1TI9k6tziK5r/CLw5ItG2d7LfNh3XRD7b4tAXMfOZ2nw+Pg44akote3CH6OFweo6x7osAO/+6GXtucCNeeT2F/Wmnt4BrnmgsqHjyoWv2kPnvutiHqF5J1MXAB1TV8aus/8wg1yZRX5IUJPj0ks/BsTm8jzhNa4/8XZqxZ80MI/E5lT9WABKyhuv7T37b2QW4VlA9t8WxYEHEjj0RBpHXyhgHplqp71vcJhr2RbUDR05O0/9Gd8MOflOdSwsuWhykVB9CAO+//jJnpzXv0JUNfw/LkMUnPJ+TV+xpxymByMd/P79h3nyrI1FioYJHxCGxEMCNqDi3o5DF/yBMcIIixmcCenZi7eSPVPX1joFVpwLTGzdv2TtgZQvX79zYVMLAKDKYGwx1CvIAAAAAElFTkSuQmCC" 
          alt="Jefferson Digital" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>
    );
  }
  
  // Automated logo detection using domain mapping
  const domainMap: Record<string, string> = {
    'IEEE Xplore': 'ieee.org',
    'Council of the District of Columbia': 'dccouncil.gov',
    'The University of Texas Medical Branch': 'utmb.edu',
    'The Virginia Department of Agriculture and Consumer Services': 'virginia.gov',
    'dcappeals.gov': 'dc.gov',
    'unrwa usa': 'unrwausa.org',
    'Arab Journals Platform': 'aaru.edu.jo',
    'Jefferson Digital Commons': 'jefferson.edu',
    'Virginia Commonwealth University': 'vcu.edu',
    'GitHub': 'github.com',
    'Medium': 'medium.com',
    'YouTube': 'youtube.com',
    'Pinterest': 'pinterest.com',
    'Reddit': 'reddit.com',
    'Quora': 'quora.com',
    'Stack Overflow': 'stackoverflow.com',
    'Instagram': 'instagram.com',
    'Twitter': 'twitter.com',
    'X': 'twitter.com',
    'Olympics.com': 'olympics.com',
    'Wikipedia': 'wikipedia.org',
    'ESPN': 'espn.com',
    'BaylorProud': 'baylor.edu',
    'The Guardian': 'theguardian.com',
    'Britannica': 'britannica.com',
    'worldathletics.org': 'worldathletics.org',
    'Harvard University': 'harvard.edu',
    'Foster School of Business': 'uw.edu',
    'Missouri House of Representatives': 'mo.gov',
    'South Carolina Legislature': 'sc.gov',
    'UFC Stats': 'ufc.com',
    'Team USA': 'teamusa.org',
    'Congress.gov': 'congress.gov',
    'Pro-Football-Reference.com': 'sports-reference.com',
    'University of North Alabama Athletics': 'una.edu',
    'Louisiana House of Representatives': 'la.gov',
    'Getty Images': 'gettyimages.com',
    'Laureus Sport': 'laureus.com',
    'About.me': 'about.me',
    'Linktree': 'linktr.ee',
    'Carrd': 'carrd.co',
    'Notion': 'notion.so',
    'Obsidian Publish': 'obsidian.md',
    'GitLab': 'gitlab.com',
    'Bitbucket': 'bitbucket.org',
    'CodePen': 'codepen.io',
    'Glitch': 'glitch.com',
    'Dev.to': 'dev.to',
    'Hashnode': 'hashnode.com',
    'Substack': 'substack.com',
    'Ghost': 'ghost.org',
    'WordPress': 'wordpress.org',
    'Google Sites': 'google.com',
    'Calendly': 'calendly.com',
    'Zoom': 'zoom.us',
    'Mailchimp': 'mailchimp.com',
    'TinyLetter': 'tinyletter.com',
    'OpenHub': 'openhub.net',
    'SourceForge': 'sourceforge.net',
    'Plunker': 'plnkr.co',
    'JSFiddle': 'jsfiddle.net',
    'Replit': 'replit.com',
    'Apartments.com': 'apartments.com',
    'EquityApartments.com': 'equityapartments.com',
    'Greystar': 'greystar.com',
    'Wardman Park': 'wardmanpark.com',
    'Yelp': 'yelp.com',
    'American University': 'american.edu',
    'Centers for Medicare & Medicaid Services | CMS (.gov)': 'cms.gov',
    'Freedom House': 'freedomhouse.org',
    'MDPI': 'mdpi.com',
    'World Bank': 'worldbank.org',
    'University of Rochester Medical Center': 'urmc.rochester.edu',
    'Doximity': 'doximity.com',
    'Reuters': 'reuters.com',
    'Justia': 'justia.com',
    'Justia Law': 'justia.com',
    'FindLaw': 'findlaw.com',
    'Avvo': 'avvo.com',
    'Super Lawyers': 'superlawyers.com',
    'Martindale-Hubbell': 'martindale.com',
    'Best Lawyers USA': 'bestlawyers.com',
    'LawyerReferral.com': 'lawyerreferral.com',
    'TrustLink Attorney Reviews': 'trustlink.org',
    'Whitepages': 'whitepages.com',
    'White Pages': 'whitepages.com',
    'PeopleSearchNow': 'peoplesearchnow.com',
    'Spokeo': 'spokeo.com',
    'USPhonebook': 'usphonebook.com',
    'Yale Alumni Directory': 'yale.edu',
    'Lafayette College Athletics': 'goleopards.com',
    'Lafayette College Football': 'goleopards.com',
    'Elite Prospects': 'eliteprospects.com',
    'Oswego State Athletics': 'oswegolakers.com',
    'SUNY Oswego Athletics Records': 'oswegolakers.com',
    'Road-Results.com': 'road-results.com',
    'Running USA Race Results': 'runningusa.org',
    'UltraSignUp': 'ultrasignup.com',
    'RaceRaves': 'raceraves.com',
    'Strava': 'strava.com',
    'New Jersey High School Sports': 'njschoolsports.com',
    'Rock Harbor Covenant Church': 'rockharboronline.com',
    'Rock Harbor Church Sermons': 'rockharboronline.com',
    'Mission Springs': 'missionsprings.com',
    'Mission Springs Staff Directory': 'missionsprings.com',
    'Evangelical Covenant Church Directory': 'covchurch.org',
    'CARLI Digital Collections': 'carli.illinois.edu',
    'Ohio Turfgrass Foundation': 'ohioturfgrass.org',
    'Ohio Turfgrass Foundation Events': 'ohioturfgrass.org',
    'GCSAA Member Database': 'gcsaa.org',
    'Swagelok Company': 'swagelok.com',
    'Deer Rock Knives': 'etsy.com',
    'Etsy Shop': 'etsy.com',
    'Craft and Hobby Association': 'craftandhobby.org',
    'Vimeo': 'vimeo.com',
    'Meetup': 'meetup.com',
    'Google Scholar': 'scholar.google.com',
    'Crunchbase': 'crunchbase.com',
    'Eventbrite': 'eventbrite.com',
    'Indeed': 'indeed.com',
    'Careerbuilder': 'careerbuilder.com',
    'SportsRecruits': 'sportsrecruits.com',
    'Goodreads': 'goodreads.com',
    'Connecticut Bar Association': 'ctbar.org',
    'Connecticut Bar Journal': 'ctbar.org',
    'Connecticut Business Database': 'ct.gov',
    'Indiana Secretary of State': 'in.gov',
    'Ohio Residents Database': 'ohioresidentdatabase.com',
    'Legal 500': 'legal500.com',
    'Howard, Kohn, Sprague & FitzGerald, LLP': 'hksflaw.com',
    'Farringdon Chambers': 'farringdon-law.co.uk',
    'Kennedy Funeral Home': 'kennedyfh.com',
    'AHA Journals': 'ahajournals.org',
    'Better Business Bureau': 'bbb.org',
    'Chamber of Commerce': 'uschamber.com',
    'Nextdoor': 'nextdoor.com',
    'Patch': 'patch.com',
    'Realtor.com': 'realtor.com',
    'Zillow': 'zillow.com',
    'ResearchGate': 'researchgate.net',
    'SSRN - Social Science Research Network': 'ssrn.com',
    'National Bar Association': 'nationalbar.org',
    'American Bar Association': 'americanbar.org',
    'ABA Legal Technology Network': 'americanbar.org',
    'General Counsel Forum': 'generalcounsel.com',
    'District of Columbia Bar Association': 'dcbar.org',
    'Bar Association of the District of Columbia': 'dcbar.org',
    'Estate Planning Council of DC': 'epcdc.org',
    'Howard University School of Law': 'law.howard.edu',
    'Georgetown University': 'georgetown.edu',
    'BNI - Business Network International': 'bni.com',
    'Muckrack': 'muckrack.com',
    'Nonprofit Board Directory': 'boardsource.org',
    'Nonprofit Board Directory - DC Leaders': 'boardsource.org',
    'Nonprofit Directory': 'boardsource.org',
    'Community Organization': 'idealist.org',
    'Community Services': 'idealist.org',
    'Community News': 'patch.com',
    'Local News': 'patch.com',
    'Local News - DCist': 'dcist.com',
    'Local Community News': 'patch.com',
    'Business Directory': 'bbb.org',
    'Business Journal': 'bizjournals.com',
    'Business News': 'bizjournals.com',
    'Business Publications': 'bizjournals.com',
    'Business Networking': 'bni.com',
    'Professional Directory': 'linkedin.com',
    'Professional Network': 'linkedin.com',
    'Professional Networks': 'linkedin.com',
    'Professional Services': 'thumbtack.com',
    'Educational Directory': 'niche.com',
    'Alumni Directory': 'alumnifire.com',
    'Alumni Network': 'alumnifire.com',
    'University Alumni': 'alumnifire.com',
    'University Research Profile': 'researchgate.net',
    'Church Directory': 'churchfinder.com',
    'News': 'news.google.com',
    'Local Business Profile': 'yelp.com',
    'Real Estate Broker Directory - DC Property Professionals': 'realtor.com',
    'Real Estate Listings': 'realtor.com',
    'Public Health Association': 'apha.org',
    'Conference Speaker - Legal Tech Summit 2024': 'legaltechsummit.com',
    'Sports and Recreation': 'active.com',
    'TED Talks': 'ted.com',
    'IMDb': 'imdb.com',
    'TikTok': 'tiktok.com',
    'Spotify': 'spotify.com',
    'WebMD': 'webmd.com',
    'CNN': 'cnn.com',
    'Yahoo': 'yahoo.com',
    'Amazon.com': 'amazon.com',
    'Apple Music': 'apple.com',
    'AllMusic': 'allmusic.com',
    'SoundCloud': 'soundcloud.com',
    'Discogs': 'discogs.com',
    'iHeart': 'iheart.com',
    'BET': 'bet.com',
    'Essence': 'essence.com',
    'People.com': 'people.com',
    'New York Post': 'nypost.com',
    'Washington Post': 'washingtonpost.com',
    'Healthgrades': 'healthgrades.com',
    'Ballotpedia': 'ballotpedia.org',
    'Famous Birthdays': 'famousbirthdays.com',
    'ThriftBooks': 'thriftbooks.com',
    'Rover': 'rover.com',
    'Zola': 'zola.com',
    'Crate & Barrel': 'crateandbarrel.com',
    'Homes.com': 'homes.com',
    'Rent.com': 'rent.com',
    'Apartment List': 'apartmentlist.com',
    'ApartmentFinder.com': 'apartmentfinder.com',
    'Apartments and Homes For Rent - ApartmentHomeLiving.com': 'apartmenthomeliving.com',
    'Dignity Memorial': 'dignitymemorial.com',
    'Tribute Archive': 'tributearchive.com',
    'Flanner Buchanan': 'flannerbuchanan.com',
    'National Institutes of Health (NIH) | (.gov)': 'nih.gov',
    'National Academies of Sciences, Engineering, and Medicine': 'nationalacademies.org',
    'National Association of Personnel Services': 'naps360.org',
    'The Virginia Department of Agriculture and Consumer Services (.gov)': 'vdacs.virginia.gov',
    'SLC.gov': 'slc.gov',
    'Department of Justice (.gov)': 'justice.gov',
    'Congressman Mike Johnson (.gov)': 'mikejohnson.house.gov',
    'Kentucky Court of Justice (.gov)': 'courts.ky.gov',
    'VR Nevada (.gov)': 'detr.nv.gov',
    'speaker.gov': 'speaker.gov',
    'Axis Sports Medicine': 'axissportsmedicine.com',
    'Bennett & Bloom Eye Centers': 'bennettandbloom.com',
    'Dr Leonardo': 'drleonardo.com',
    'Meredith Model & Talent Agency': 'meredithmodels.com',
    'Barbizon Modeling & Talent Agency': 'barbizon.com',
    'Men Stopping Violence': 'menstoppingviolence.org',
    'Delaware Valley Ornithological Club (DVOC)': 'dvoc.org',
    'Smith LaCien': 'smithlacien.com',
    'Morgan Lewis': 'morganlewis.com',
    'Elite Orthopedics & Spine': 'eliteorthospine.com',
    'CHRISTUS Health': 'christushealth.org',
    'Samaritan Wellness': 'samaritanwellness.com',
    'Legacy Health': 'legacyhealth.org',
    'McLaren Health': 'mclaren.org',
    'Stony Brook Medicine': 'stonybrookmedicine.edu',
    'Sentara': 'sentara.com',
    'CCM Magazine': 'ccmmagazine.com',
    'Cave Dweller Music': 'cavedwellermusic.com',
    'New Release Today': 'newreleasetoday.com',
    'Playback.fm': 'playback.fm',
    'The Shorty Awards': 'shortyawards.com',
    'The Work As Meditation': 'theworkasmeditation.com',
    'laurelbox': 'laurelbox.com',
    'FOX 32 Chicago': 'fox32chicago.com',
    'FOX 8 News': 'fox8.com',
    'KTVZ': 'ktvz.com',
    'WAFF': 'waff.com',
    'InsideNoVa.com': 'insidenova.com',
    'Hoodline': 'hoodline.com',
    'TeachDFW': 'teachdfw.org',
    'Iowa State University': 'iastate.edu',
    'Duke University': 'duke.edu',
    'Duke Global Health Institute': 'globalhealth.duke.edu',
    'University of Maryland': 'umd.edu',
    'California Golden Bears Athletics': 'calbears.com',
    'Louisiana Ragin\' Cajuns': 'ragincajuns.com',
    'Marquette University Athletics': 'gomarquette.com',
    'Pitt Panthers': 'pittsburghpanthers.com',
    'UCF Athletics': 'ucfknights.com',
    'Washington State University Athletics': 'wsucougars.com',
    'USA Basketball': 'usab.com',
    '247Sports': '247sports.com',
    'Spotrac.com': 'spotrac.com',
    'USL Spokane': 'uslchampionship.com',
    'NFL.com': 'nfl.com',
    'Panthers.com': 'panthers.com',
    'Commanders Media Center': 'commanders.com',
    'DC Power Football Club': 'dcpowerfc.com',
    'Monumental Sports Network Official Online Store': 'monumentalsportsnetwork.com',
    'U.S. Olympic & Paralympic Museum': 'usopm.org',
    'USA Track & Field': 'usatf.org',
    'Todd Smith - Author': 'toddsmith.net',
    'Todd Smith Consulting': 'toddsmithconsulting.com',
    'Todd Smith Fitness': 'toddsmithfitness.com',
    'Todd Smith Mediation': 'toddsmithmediation.com',
    'Geoffrey Todd Smith': 'geoffreytoddsmith.com',
    'toddcsmith.com': 'toddcsmith.com',
    'tsutigers.com': 'tsutigers.com',
    'Emily S. Smith Author': 'emilysmith.com',
    'Emily Smith Law': 'emilysmithlaw.com',
    'EMILY J. SMITH': 'emilysmith.com',
    'emilyelizabethsmith.com': 'emilyelizabethsmith.com',
    'emilyesfahanismith.com': 'emilyesfahanismith.com',
    'emilysmith.org': 'emilysmith.org',
    'emilysmithmusic.com': 'emilysmithmusic.com',
    'thisiskeisha.com': 'thisiskeisha.com',
    'Berkshire Hathaway HomeServices': 'bhhs.com',
    'Milken Institute School of Public Health': 'publichealth.gwu.edu',
    'Fulton Grace': 'fultongrace.com',
    'Greenville County': 'greenvillecounty.org',
    'Minneapolis Institute of Art': 'artsmia.org',
    'NYCLU': 'nyclu.org',
    'Project Equity': 'project-equity.org',
    'Conscious Capitalism': 'consciouscapitalism.org',
    'Atlantic Fellows': 'atlanticfellows.org',
    'Twitter/X': 'x.com',
    'GW Law': 'law.gwu.edu',
    'LegiStorm': 'legistorm.com',
    'MJ Performance': 'mjperformance.com',
    'Key Technology': 'key.net',
    'Amtrak': 'amtrak.com',
    'Amtrak Vacations': 'amtrakvacations.com',
    'Roaming Hunger - Food Truck': 'roaminghunger.com',
    'Royal Funeral Home, Inc.': 'royalfh.com',
    'The University of Arizona': 'arizona.edu',
    'Thomas Jefferson University': 'jefferson.edu',
    'Topps Ripped': 'topps.com',
    'Zephyr Apartments Seattle': 'zephyrseattle.com',
    'Zephyr Seattle': 'zephyrseattle.com',
    'Zephyr Van': 'zephyrvan.com',
    'Zephyr Ventilation': 'zephyronline.com',
    'seattlezephyr.com': 'seattlezephyr.com',
    'zephyrlibertylake.com': 'zephyrlibertylake.com',
    'r/V Zephyr': 'reddit.com',
    'jeffersontrojansdc.org': 'jeffersontrojansdc.org',
    'mjblue.com': 'mjblue.com',
    'vitalogycraft.com': 'vitalogycraft.com',
    'AL.com': 'al.com',
    'KWKT - FOX 44': 'kwkt.com',
  };

  if (domainMap[platform]) {
    return (
      <div style={{...iconStyle, backgroundColor: '#fff', border: '1px solid #dfe1e5'}}>
        {imgError ? (
          <span style={{ color: isDark ? '#fff' : '#5f6368', fontSize: '11px', fontWeight: 'bold' }}>{platform.charAt(0)}</span>
        ) : (
          <img 
            src={`https://logo.clearbit.com/${domainMap[platform]}`} 
            alt={platform} 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            onError={() => setImgError(true)}
          />
        )}
      </div>
    );
  }
  // Default icon
  return (
    <div style={{...iconStyle}}>
      <span style={{ color: isDark ? '#fff' : '#5f6368', fontSize: '11px', fontWeight: 'bold' }}>{platform.charAt(0)}</span>
    </div>
  );
};

export const ResultCard: React.FC<ResultCardProps> = ({ result, onOpen, isDark, persona = 'greg' }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const followerCount = result.followers || '';
  
  const textColor = isDark ? '#bdc1c6' : '#4d5156';
  const titleColor = isDark ? '#8ab4f8' : '#1a0dab';
  const urlColor = isDark ? '#e8eaed' : '#202124';
  const subTextColorVal = isDark ? '#9aa0a6' : '#70757a';

  // Format the URL for display
  const formatUrl = (url: string) => {
    return `https://${url.replace(/ › /g, '/')}`;
  };

  return (
    <div className="g" style={{ marginBottom: '24px', maxWidth: '652px', width: '100%' }}>
      {/* Platform and Ellipsis Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
          <div style={{ flexShrink: 0 }}>
            <PlatformIcon platform={result.platform} isDark={isDark} />
          </div>
          <div style={{ 
            fontSize: '14px', 
            color: urlColor,
            lineHeight: '20px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontWeight: 400, color: '#202124' }}>{result.platform}</span>
              {(result.platform === 'LinkedIn' || result.platform === 'Facebook') && result.displayName.split(' - ')[0] && (
                <span style={{ color: subTextColorVal }}> · {result.displayName.split(' - ')[0]}</span>
              )}
            </div>
            <div style={{ color: subTextColorVal, fontSize: '12px', lineHeight: '16px' }}>
              {formatUrl(result.urlLike)}
            </div>
          </div>
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: subTextColorVal }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      {/* Followers line if applicable */}
      {followerCount && (
        <div style={{ color: subTextColorVal, fontSize: '12px', marginLeft: '0', marginTop: '-2px', marginBottom: '2px' }}>
          {followerCount} followers
        </div>
      )}

      {/* Title */}
      <h3 style={{ margin: '4px 0 0 0', padding: 0 }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            // Always track clicks for analytics
            trackResultClick(result.id, result.platform, result.displayName, persona);
            // Only open modal for Facebook and LinkedIn
            if (result.platform === 'LinkedIn' || result.platform === 'Facebook') {
              onOpen(result);
            }
          }}
          style={{
            fontSize: '20px',
            lineHeight: '26px',
            fontWeight: 400,
            color: titleColor,
            textDecoration: 'none',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
        >
          {result.displayName}
        </a>
      </h3>

      {/* Content Area with optional Side Image */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '16px', marginTop: '2px', marginLeft: '0' }}>
        <div style={{ flex: 1, order: isMobile ? 2 : 1 }}>
          {/* Info Row: Location, Role, Company */}
          {result.currentRole && (
            <div style={{
              color: textColor,
              lineHeight: '22px',
              fontSize: '14px',
              marginTop: '2px'
            }}>
              {result.location && (
                <span>{result.location} · </span>
              )}
              <span>{result.currentRole} · {result.currentCompany || result.platform}</span>
            </div>
          )}

          {/* Snippet */}
          <div style={{
            color: textColor,
            lineHeight: '22px',
            fontSize: '14px',
            marginTop: '2px'
          }}>
            {result.snippet}
            {result.snippet.length > 140 && (
              <a href="#" style={{ color: titleColor, marginLeft: '4px' }} onClick={(e) => e.preventDefault()}>Read more</a>
            )}
          </div>
        </div>

        {/* Side Thumbnail */}
        {result.sideImageUrl && (
          <div style={{ 
            flexShrink: 0, 
            width: isMobile ? '100%' : '104px', 
            height: isMobile ? '200px' : '104px', 
            borderRadius: '8px', 
            overflow: 'hidden',
            border: `1px solid ${isDark ? '#3c4043' : '#dfe1e5'}`,
            order: isMobile ? 1 : 2
          }}>
            <img 
              src={result.sideImageUrl} 
              alt="" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        )}
      </div>

      {/* Missing note */}
      {result.missingNote && (
        <div style={{
          fontSize: '14px',
          color: textColor,
          marginTop: '8px',
          marginLeft: '0',
          lineHeight: '20px'
        }}>
          <span>Missing: </span>
          <span style={{ textDecoration: 'line-through' }}>{result.missingNote.split(' | ')[0].replace('Missing: ', '')}</span>
          <span> | Show results with: </span>
          <span style={{ color: titleColor, textDecoration: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>{result.missingNote.split('with: ')[1]}</span>
        </div>
      )}
    </div>
  );
};
