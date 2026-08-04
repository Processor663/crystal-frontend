import styled from "styled-components";

export const Wrapper = styled.div`
  .app-form-input {
    border-radius: 10px;
    padding: 0.6rem;
    border: 1px solid #2a2f42;
    color: #fff !important;
  }

  .app-form-input,
  .app-form-input:hover,
  .app-form-input:focus {
    border-color: #2a2f42;
    background: #1c2030 !important;
    color: #fff !important;
  }

  .ant-input-password-icon {
    color: #fff;
  }

  .ant-input-password-icon:hover {
    color: #9a8cff;
  }

  .ant-input::placeholder,
  .ant-input-textarea textarea::placeholder {
    color: #6b7280 !important;
  }

  .ant-input-data-count {
    margin-top: 1rem !important;
    color: #ffffff !important;
  }
`;
