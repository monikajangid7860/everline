import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="group mt-16 w-100 px-10 py-4 rounded-full border-2 text-sm tracking-widest relative overflow-hidden">
          <span className="relative z-10 w-40">START </span>
          <span className="absolute inset-0 bg-[#] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
        </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
   height: 3em;
   width: 8em;
   border: none;
   border-radius: 10em;
   background: #383c36;
   font-size: 17px;
   color: #FFFFFF;
   font-family: inherit;
   font-weight: 500;
  }

  button:hover {
   animation: shake3856 0.3s linear infinite both;
  }

  @keyframes shake3856 {
   0% {
    -webkit-transform: translate(0);
    transform: translate(0);
   }

   20% {
    -webkit-transform: translate(-2px, 2px);
    transform: translate(-2px, 2px);
   }

   40% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
   }

   60% {
    -webkit-transform: translate(2px, 2px);
    transform: translate(2px, 2px);
   }

   80% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
   }

   100% {
    -webkit-transform: translate(0);
    transform: translate(0);
   }
  }`;

export default Button;
