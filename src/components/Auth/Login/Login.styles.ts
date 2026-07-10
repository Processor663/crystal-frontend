import styled from "styled-components";

export const Wrapper = styled.div`
  .cv-signin-page {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 3em 0;
  }

  .cv-signin-card {
    width: 100%;
    max-width: 460px;
    background: #12101f;
    border: 1px solid #211e35;
    border-radius: 24px;
    padding: 2.5em 2.25em;
    margin-top: 2em;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
  }

  .cv-signin-header {
    text-align: center;
    margin-bottom: 2em;
  }

  .cv-signin-title {
    font-family: Georgia, "Times New Roman", serif;
    font-weight: 700;
    font-size: clamp(1.5rem, 4vw, 2rem);
    color: #fbfaff;
    margin: 0 0 0.1em;
  }

  .cv-signin-subtitle {
    color: #8b87a8;
  }

  .cv-signin-form .ant-form-item-label > label {
    color: #b3aec8;
    font-weight: 500;
  }

  .cv-signin-form .ant-input,
  .cv-signin-form .ant-input-affix-wrapper {
    background: #141227;
    border-color: #2c2942;
  }

  .cv-signin-form .ant-input-affix-wrapper .ant-input {
    background: transparent;
  }

  .cv-password-label-row {
    /* background-color: red; */
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: space-between; */
    /* width: 100%; */
  }

  .cv-row-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2em 0;
  }

  .cv-forgot-link {
    color: #8b7bf7;
    font-weight: 500;
  }

  .cv-submit-item {
    margin-bottom: 1.25em;
  }

  .cv-submit-item .ant-btn {
    background: #7c6ff0;
    border: none !important;
    /* font-size: 16px; */
  }

  .cv-submit-item .ant-btn:hover {
    background: #8f83f5 !important;
  }

  .cv-divider {
    position: relative;
    text-align: center;
    margin: 1.25em 0;
  }

  .cv-divider::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #211e35;
  }

  .cv-divider span {
    position: relative;
    background: #12101f;
    padding: 0 14px;
    color: #6f6b8a;
    font-size: 13px;
  }

  .cv-signup-line {
    text-align: center;
    color: #8b87a8;
    font-size: 14px;
    margin: 0;
  }

  .cv-signup-line a {
    color: #8b7bf7;
    font-weight: 600;
    margin-left: 0.2em;
  }

  @media screen and (max-width: 480px) {
    .cv-signin-page {
      padding: 0 1em;
    }

    .cv-signin-card {
      border-radius: 10px;
    }
  }
`;
