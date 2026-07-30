import React from "react";
import styled from "styled-components";

const Card = () => {
  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="inner" style={{ "--quantity": 10 }}>
          {colors.map((color, index) => (
            <div
              key={index}
              className="card"
              style={{
                "--index": index,
                "--color-card": color,
              }}
            >
              <div className="img" />
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const colors = [
  "142, 249, 252",
  "142, 252, 204",
  "142, 252, 157",
  "215, 252, 142",
  "252, 252, 142",
  "252, 208, 142",
  "252, 142, 142",
  "252, 142, 239",
  "204, 142, 252",
  "142, 202, 252",
];

const StyledWrapper = styled.div`
  .wrapper {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .inner {
    --w: 100px;
    --h: 150px;
    --translateZ: calc(var(--w) * 2);
    --rotateX: -15deg;
    --perspective: 1000px;

    position: relative;
    width: var(--w);
    height: var(--h);

    transform-style: preserve-3d;
    animation: rotating 20s linear infinite;
  }

  @keyframes rotating {
    from {
      transform: perspective(var(--perspective))
        rotateX(var(--rotateX))
        rotateY(0deg);
    }
    to {
      transform: perspective(var(--perspective))
        rotateX(var(--rotateX))
        rotateY(360deg);
    }
  }

  .card {
    position: absolute;
    inset: 0;
    border-radius: 12px;
    border: 2px solid rgba(var(--color-card), 0.9);

    transform: rotateY(calc(360deg / var(--quantity) * var(--index)))
      translateZ(var(--translateZ));
  }

  .img {
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(var(--color-card), 0.2),
      rgba(var(--color-card), 0.7),
      rgba(var(--color-card), 1)
    );
    background-image: url('https://plus.unsplash.com/premium_photo-1712844228387-227d61f358ae?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZhc2hpb24lMjB2aW50YWdlfGVufDB8fDB8fHww');
    background-size: cover;
    background-position: center;
  }
`;

export default Card;
