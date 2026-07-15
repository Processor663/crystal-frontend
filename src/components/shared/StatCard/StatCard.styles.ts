import styled from "styled-components";

export const Wrapper = styled.div`
position: relative;

  .half-circle {
    clip-path: circle(39.5% at 98% 0);
    position: absolute;
    top: 0;
    right: 0;
    /* background-color: red; */
    width: 150px;
    height: 150px;
    opacity: 0.4;
  }
`;