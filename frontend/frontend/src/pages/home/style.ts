import styled from 'styled-components';
import {
  colors
} from "../../styles/colors";

export const Container = styled.div`
  header {
    height: 20vh;
    background-color: ${colors.gray700};
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      height: 5rem;
      margin-top: 2rem;
      margin-bottom: 4rem;
    }
  }
  section {
    display: flex;
    width: 70vw;
    margin-bottom: 1.5rem;
    gap: 0.6rem;
    margin-bottom: 2.4rem;
    input {
      flex: 1;
      width: 2rem;
      background-color: ${colors.gray500};
      padding: 2rem;
      color: ${colors.gray300};
      border: ${colors.gray500};
      border-radius: 0.6rem;
      font-size: 1.6rem;
    }
    > button {
      background-color: ${colors.blueDark};
      padding: 1rem;
      color: ${colors.gray100};
      border: 0.1rem solid ${colors.blueDark};
      border-radius: 0.6rem;
      width: 9rem;
      font-weight: bold;
      font-size: 1.4rem;
    }
  }
  img {
    height: 8rem;
  }
  .background {
    background-color: ${colors.background2};
    height: 100vh;
  }
  .content {
    display: flex;
    justify-content: center;
    height: 100vh;
    padding: 0rem;
    margin: 0rem;
    position: relative;
    top: -3rem;

  }
  .align-content {
    display: flex;
    flex-direction: column;
    width: 70vw;
  }
  .tarefas-numeros {
    display: flex;
    justify-content: space-between;
    font-weight: bold;

  }
  .numero-redondo {
    background-color: ${colors.gray400};
    border: 0.1rem solid ${colors.gray400};
    border-radius: 100%;
    width: 2.4rem;
    height: 2.4rem;
    padding: 0.6rem;
    margin-left: 0.5rem;
    color: white;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tarefa-com-numero {
    display: flex;
    align-items: center;

    .tarefas-criadas {
      color: ${colors.blue};
      font-size: 1.6rem;
    }
    .tarefas-concluidas {
      color: ${colors.purple};
      font-size: 1.6rem;
    }
  }
  .card {
    border: 0.1rem solid ${colors.gray500};
    padding: 1.5rem;
    background-color: ${colors.gray500};
    border-radius: 0.5rem;
    color: white;
    display: flex;
    align-items: center;
    margin-top: 1.6rem;
    gap: 1rem;
    .card-content {
      display: flex;
      width: 100vw;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 4rem;
      > h4 {    
        font-size: 1.6rem;
      }
      > p {
        font-size: 1.4rem;
        font-weight: 300;
      }
      > span {
        font-size: 1.2rem;
        font-weight: 300;
      }
      .titulo-description {
        display: flex;
        width: 15rem;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem 0rem;
        h4 {
          font-size: 1.8rem;
        }
        p {
          font-size: 1.2rem;
        }
      }
      .paginacao {
        color: red;
        font-size: 1rem;
      }

    }
    .button-circle {
      background-color: ${colors.gray600};
      border: 0.1rem solid ${colors.blue};
      border-radius: 100%;
      margin-right: 0.8rem;
      width: 4.2rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .button-inner-circle {
      background-color: ${colors.purpleDark};
      border-radius: 100%;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    > button {
      background-color: transparent;
      color: white;
      border: none;
    }
  }
  .botao-criar-tarefa {
    background-color: ${colors.purple};
    padding: 1rem;
    color: ${colors.gray100};
    border: 0.1rem solid ${colors.blueDark};
    border-radius: 0.6rem;
    width: 9rem;
    font-weight: bold;
    font-size: 1.4rem;
  }
  .span-date {
    font-size: 1.2rem;
  }
  .section-paginacao {
    width: 70vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    padding: 2rem 0rem;


    .paginas {
      color: white;
      font-size: 2rem;
    }
  }
`;

export const FormModal = styled.form`
  background-color: ${colors.gray400};
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  color: white;

  label {
    font-size: 1.6rem;
  }
  input {
    flex: 1;
    background-color: ${colors.gray500};
    padding: 1rem;
    color: ${colors.gray300};
    border: ${colors.gray500};
    border-radius: 0.6rem;
  };
  button {
    background-color: ${colors.blueDark};
    padding: 1rem;
    color: ${colors.gray100};
    border: 0.1rem solid ${colors.blueDark};
    border-radius: 0.6rem;
    width: 100%;
    font-weight: bold;
  }
  h2 {
    color: white;
  }
`;