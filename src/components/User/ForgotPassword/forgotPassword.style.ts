import styled from "styled-components";

export const Wrapper = styled.div`
  .app-container {
    background-color: #14171f;
    border: 1px solid #2a2f42;
    border-radius: 24px;
  }

  .app-form-input {
    padding: 0.6rem;
    border: 1px solid #2a2f42;
  }

  .app-form-input::placeholder {
    color: #6b7280;
  }

  .app-form-input,
  .app-form-input:hover,
  .app-form-input:focus {
    border-color: #2a2f42;
    background: #1c2030 !important;
    color: #6b7280 !important;
  }
`;
