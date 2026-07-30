import React from 'react';
import styled from 'styled-components';

const Card = () => {
  return (
    <StyledWrapper>
      <div>
        <p className="browser-warning">
          If this looks wonky to you it's because this browser doesn't support the CSS
          property 'aspect-ratio'.
        </p>
        <div className="stack">
          <div className="card">
            <div className="image" />
            
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  img {
    display: block;
    max-width: 60%;
  }

  .stack {
    width: 55%;
    max-width: 400px;
    transition: 0.25s ease;
    &:hover {
      transform: rotate(5deg);
      .card:before {
        transform: translatey(-2%) rotate(-4deg);
      }
      .card:after {
        transform: translatey(2%) rotate(4deg);
      }
    }
  }

  .card {
    aspect-ratio: 3 / 2;
    border: 4px solid;
    background-color: #FA51A2;
    position: relative;
    transition: 0.15s ease;
    cursor: pointer;
    padding: 5% 5% 15% 5%;
    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      border: 4px solid;
      background-color: #FA51A2;
      transform-origin: center center;
      z-index: -1;
      transition: 0.15s ease;
      top: 0;
      left: 0;
    }

    &:before {
      transform: translatey(-2%) rotate(-6deg);
    }

    &:after {
      transform: translatey(2%) rotate(6deg);
    }
  }
  .image {
    width: 100%;
    border: 4px solid;
    background-color: #eee;
    aspect-ratio: 1 / 1;
    position: relative;
    background-image: url('https://plus.unsplash.com/premium_photo-1712844228387-227d61f358ae?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZhc2hpb24lMjB2aW50YWdlfGVufDB8fDB8fHww');
    background-size: cover;
    background-position: center;
    margin-bottom: 1em;
  }

  .browser-warning {
    margin-bottom: 4rem;
  }

  @supports (aspect-ratio: 1 / 1) {
    .browser-warning {
      display: none;
    }
  }`;

export default Card;
